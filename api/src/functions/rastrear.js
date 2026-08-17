// Function de rastreamento de campanha por e-mail (Azure Functions v4 / Static Web Apps).
// GET  /r/{token}  -> registra "clique" no Apps Script e redireciona (302) para a página de destino.
// POST /api/rastrear (do snippet da página) -> encaminha "visita" / "engajamento" ao Apps Script.
// Stateless: não conhece os clientes; o cruzamento token -> cliente é feito na planilha.
// Nunca armazena IP. Falha no registro nunca bloqueia o redirect.

const { app } = require('@azure/functions');

const TOKEN_RE = /^[A-Za-z0-9-]{3,40}$/;

async function registrar(evento, token, request, detalhe) {
  const url = process.env.APPS_SCRIPT_URL;
  const segredo = process.env.RASTREIO_SEGREDO;
  if (!url || !segredo) {
    console.error('rastrear: APPS_SCRIPT_URL ou RASTREIO_SEGREDO não configurados');
    return;
  }
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), 2500);
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        segredo,
        token,
        evento,
        detalhe: detalhe || '',
        campanha: process.env.CAMPANHA || 'cartorios',
        ts: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || '',
        referer: request.headers.get('referer') || ''
      }),
      signal: controle.signal
    });
  } catch (erro) {
    console.error('rastrear: falha ao registrar evento', evento, String(erro));
  } finally {
    clearTimeout(timer);
  }
}

app.http('rastrear', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      if (request.method === 'POST') {
        let corpo = {};
        try { corpo = await request.json(); } catch {}
        const token = String(corpo.token || '');
        const evento = String(corpo.evento || '');
        const permitidos = ['visita', 'engajamento', 'cta', 'tempo_pagina'];
        if (TOKEN_RE.test(token) && permitidos.includes(evento)) {
          const detalhe = typeof corpo.detalhe === 'string' ? corpo.detalhe.slice(0, 100) : '';
          await registrar(evento, token, request, detalhe);
        }
        return { status: 204 };
      }

      // O acesso público é /r/{token}; o staticwebapp.config.json reescreve isso
      // para /api/rastrear preservando a URL original no cabeçalho abaixo (padrão
      // do Azure Static Web Apps para rewrites de API).
      const original = request.headers.get('x-ms-original-url');
      const u = original ? new URL(original) : new URL(request.url);
      let bruto = u.searchParams.get('token') || '';
      if (!bruto) {
        const m = u.pathname.match(/^\/r\/([^/]+)/);
        if (m) bruto = decodeURIComponent(m[1]);
      }
      const valido = TOKEN_RE.test(bruto);
      const tokenSeguro = valido ? bruto : bruto.replace(/[^A-Za-z0-9-]/g, '').slice(0, 40);
      await registrar(valido ? 'clique' : 'token_invalido', tokenSeguro, request);

      const destino = valido
        ? `${process.env.URL_DESTINO || 'https://brasilsul.net.br/cartorios.html'}?t=${bruto}`
        : (process.env.URL_HOME || 'https://brasilsul.net.br/');

      return {
        status: 302,
        headers: { Location: destino, 'Cache-Control': 'no-store, max-age=0' }
      };
    } catch (erro) {
      context.error('rastrear: erro inesperado', String(erro));
      return {
        status: 302,
        headers: {
          Location: process.env.URL_HOME || 'https://brasilsul.net.br/',
          'Cache-Control': 'no-store, max-age=0'
        }
      };
    }
  }
});
