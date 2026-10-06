/* BrasilSul — formulário de cotação (melhoria progressiva)
   Sem JavaScript o formulário continua funcionando por POST normal (action/method).
   Aqui: pré-seleção da solução por ?solucao=<chave>, validação, estados de envio
   e confirmação somente após a aceitação real do provedor. */
(function () {
  'use strict';

  var form = document.querySelector('form[data-lead]');
  if (!form) return;

  var CHAVES = {
    'microsoft-365': 'Microsoft 365',
    'copilot': 'Copilot para Microsoft 365',
    'adobe-creative-cloud': 'Adobe Creative Cloud',
    'adobe-acrobat': 'Adobe Acrobat',
    'azure-foundry': 'IA no Azure / Microsoft Foundry',
    'backup-veeam': 'Backup Veeam',
    'seguranca-endpoints': 'Segurança de endpoints (Kaspersky / Bitdefender)',
    'migracao-microsoft-365': 'Migração Microsoft 365',
    'licenciamento': 'Consultoria de licenciamento',
    'vmware': 'VMware',
    'autodesk': 'Autodesk',
    'teamviewer': 'TeamViewer',
    'cartorios': 'Soluções de TI para cartórios',
    'outro': 'Outro produto ou necessidade'
  };

  var select = form.querySelector('#produto');
  var mensagem = form.querySelector('#mensagem');
  var botao = form.querySelector('button[type="submit"]');
  var status = form.querySelector('#form-status');
  var rotuloBotao = botao ? botao.textContent : '';
  var iniciou = false;
  var enviando = false;

  function evento(nome, params) {
    try { if (window.bsTrack) window.bsTrack(nome, params || {}); } catch (e) {}
  }

  /* ---- Pré-seleção por URL: só aceita chaves conhecidas ---- */
  try {
    var chave = new URLSearchParams(window.location.search).get('solucao');
    if (chave && Object.prototype.hasOwnProperty.call(CHAVES, chave) && select) {
      var rotulo = CHAVES[chave];
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].getAttribute('data-chave') === chave) {
          select.selectedIndex = i;
          break;
        }
      }
      if (select.value !== rotulo && select.selectedIndex <= 0) select.selectedIndex = 0;
    }
  } catch (e) {}

  /* ---- Mensagem obrigatória só quando "Outro" ---- */
  function ajustarMensagem() {
    if (!select || !mensagem) return;
    var outro = select.options[select.selectedIndex] &&
      select.options[select.selectedIndex].getAttribute('data-chave') === 'outro';
    mensagem.required = !!outro;
    var rot = form.querySelector('label[for="mensagem"]');
    if (rot) rot.textContent = outro ? 'Conte o que sua empresa precisa *' : 'Detalhes do pedido';
  }
  if (select) select.addEventListener('change', ajustarMensagem);
  ajustarMensagem();

  form.addEventListener('focusin', function () {
    if (iniciou) return;
    iniciou = true;
    evento('quote_form_start', { solution: chaveAtual() });
  });

  function chaveAtual() {
    var o = select && select.options[select.selectedIndex];
    return (o && o.getAttribute('data-chave')) || '';
  }

  function mostrar(tipo, texto) {
    if (!status) return;
    status.className = 'form-status ' + tipo;
    status.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
    status.textContent = texto;
    status.hidden = false;
  }

  function marcarInvalidos() {
    var invalidos = form.querySelectorAll(':invalid');
    var primeiro = null;
    form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
    invalidos.forEach(function (el) {
      el.setAttribute('aria-invalid', 'true');
      if (!primeiro) primeiro = el;
    });
    return primeiro;
  }

  form.addEventListener('submit', function (ev) {
    if (!window.fetch || !window.FormData) return; /* fallback: POST normal */
    ev.preventDefault();
    if (enviando) return;

    var invalido = !form.checkValidity() ? marcarInvalidos() : null;
    if (invalido) {
      mostrar('erro', 'Revise os campos destacados e tente novamente.');
      evento('quote_form_error', { error_code: 'validation' });
      invalido.focus();
      return;
    }

    enviando = true;
    botao.disabled = true;
    botao.textContent = 'Enviando pedido…';
    if (status) status.hidden = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (resp) {
      if (!resp.ok) throw new Error('http_' + resp.status);
      return resp.json().catch(function () { return {}; });
    }).then(function (dados) {
      if (dados && dados.error) throw new Error('provider');
      evento('generate_lead', { solution: chaveAtual() });
      form.reset();
      ajustarMensagem();
      mostrar('ok', 'Pedido recebido. Nossa equipe vai analisar sua solicitação e entrar em contato.');
      if (status) status.focus();
    }).catch(function (err) {
      evento('quote_form_error', { error_code: String(err && err.message || 'network').slice(0, 20) });
      mostrar('erro', 'Não foi possível concluir o envio. Seus dados continuam no formulário. Tente novamente ou fale conosco pelo WhatsApp.');
      if (status) status.focus();
    }).then(function () {
      enviando = false;
      botao.disabled = false;
      botao.textContent = rotuloBotao;
    });
  });
})();
