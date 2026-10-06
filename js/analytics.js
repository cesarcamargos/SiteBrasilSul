/* BrasilSul — contrato de eventos de medição (DESATIVADO por padrão)
   Nada é enviado enquanto window.BRASILSUL_ANALYTICS não for definido com uma
   configuração válida, por exemplo:
     window.BRASILSUL_ANALYTICS = { send: function (nome, params) { ... } };
   O envio real (GA4 etc.) depende de propriedade, consentimento e política de
   privacidade aprovados — ver docs/PENDENCIAS-COMERCIAIS.md.
   Nunca registrar nome, e-mail, telefone, CNPJ, mensagem ou token individual. */
(function () {
  'use strict';

  var PERMITIDOS = ['solution', 'placement', 'page_path', 'campaign_source', 'device_category', 'error_code'];
  var EVENTOS = ['view_solution', 'quote_cta_click', 'quote_form_start', 'quote_form_error', 'generate_lead', 'whatsapp_click'];
  var enviados = {};

  function limpar(params) {
    var saida = {};
    PERMITIDOS.forEach(function (k) {
      if (params && params[k] != null) saida[k] = String(params[k]).slice(0, 80);
    });
    saida.page_path = window.location.pathname; /* sem query string nem hash */
    return saida;
  }

  window.bsTrack = function (nome, params) {
    var cfg = window.BRASILSUL_ANALYTICS;
    if (!cfg || typeof cfg.send !== 'function') return;
    if (EVENTOS.indexOf(nome) === -1) return;
    var dados = limpar(params);
    var chave = nome + '|' + dados.solution;
    if (nome === 'generate_lead') {
      var agora = Date.now();
      if (enviados[chave] && agora - enviados[chave] < 5000) return; /* evita duplicidade */
      enviados[chave] = agora;
    }
    try { cfg.send(nome, dados); } catch (e) {}
  };

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('wa.me/') > -1) {
      window.bsTrack('whatsapp_click', { placement: a.className.indexOf('whats-flutuante') > -1 ? 'flutuante' : 'pagina' });
    } else if (/contato\.html/.test(href)) {
      var m = href.match(/solucao=([a-z0-9-]+)/);
      window.bsTrack('quote_cta_click', { solution: m ? m[1] : '' });
    }
  });
})();
