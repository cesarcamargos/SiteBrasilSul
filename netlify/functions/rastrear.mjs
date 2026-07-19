// Function de rastreamento de campanha por e-mail.
// GET  /r/{token}  -> registra "clique" no Apps Script e redireciona (302) para a página de destino.
// POST (do snippet da página) -> encaminha "visita" / "engajamento" ao Apps Script.
// Stateless: não conhece os clientes; o cruzamento token -> cliente é feito na planilha.
// Nunca armazena IP. Falha no registro nunca bloqueia o redirect.

const TOKEN_RE = /^[A-Za-z0-9]{8,32}$/;

async function registrar(evento, token, req) {
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
        campanha: process.env.CAMPANHA || 'cartorios',
        ts: new Date().toISOString(),
        userAgent: req.headers.get('user-agent') || '',
        referer: req.headers.get('referer') || ''
      }),
      signal: controle.signal
    });
  } catch (erro) {
    console.error('rastrear: falha ao registrar evento', evento, String(erro));
  } finally {
    clearTimeout(timer);
  }
}

export default async (req) => {
  try {
    if (req.method === 'POST') {
      let corpo = {};
      try { corpo = await req.json(); } catch {}
      const token = String(corpo.token || '');
      const evento = String(corpo.evento || '');
      if (TOKEN_RE.test(token) && (evento === 'visita' || evento === 'engajamento')) {
        await registrar(evento, token, req);
      }
      return new Response(null, { status: 204 });
    }

    // No rewrite do Netlify a function recebe a URL original (/r/{token}),
    // sem a query acrescentada pela regra; por isso o token também é lido do caminho.
    const u = new URL(req.url);
    let bruto = u.searchParams.get('token') || '';
    if (!bruto) {
      const m = u.pathname.match(/^\/r\/([^/]+)/);
      if (m) bruto = decodeURIComponent(m[1]);
    }
    const valido = TOKEN_RE.test(bruto);
    const tokenSeguro = valido ? bruto : bruto.replace(/[^A-Za-z0-9]/g, '').slice(0, 32);
    await registrar(valido ? 'clique' : 'token_invalido', tokenSeguro, req);

    const destino = valido
      ? `${process.env.URL_DESTINO || 'https://www.brasilsul.net.br/cartorios.html'}?t=${bruto}`
      : (process.env.URL_HOME || 'https://www.brasilsul.net.br/');
    return new Response(null, {
      status: 302,
      headers: { Location: destino, 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (erro) {
    console.error('rastrear: erro inesperado', String(erro));
    return new Response(null, {
      status: 302,
      headers: {
        Location: process.env.URL_HOME || 'https://www.brasilsul.net.br/',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
};
