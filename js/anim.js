/* BrasilSul — animações progressivas (~2 KB)
   Sem este arquivo, ou com "reduzir movimento" ativo, o site fica 100% visível e funcional. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('anima');

  /* ---- Reveal ao rolar, escalonado por grupo ---- */
  var alvos = document.querySelectorAll(
    '.secao-cabeca, .secao-cabeca-full, .item-numerado, .beneficio, .passo, .vitrine-numeros .numero,' +
    '.destaque-ia, .cta-faixa, .faq details, .info-item, .painel-borda,' +
    '.sobre-grid > div, .formulario, .comp-linha, .post-item, .exigencia-item, .prazo-linha, .mapa-linha, .diagnostico-form'
  );
  var grupos = new Map();
  alvos.forEach(function (el) {
    el.classList.add('reveal');
    var pai = el.parentElement;
    var i = grupos.get(pai) || 0;
    el.style.setProperty('--atraso', Math.min(i * 60, 360) + 'ms');
    grupos.set(pai, i + 1);
  });

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
        io.unobserve(e.target);
        if (e.target.matches('.vitrine-numeros .numero')) contar(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  alvos.forEach(function (el) { io.observe(el); });

  /* ---- Contadores animados ---- */
  function contar(numero) {
    var alvo = numero.querySelector('strong');
    if (!alvo || alvo.dataset.contado) return;
    alvo.dataset.contado = '1';
    var texto = alvo.textContent.trim();
    var valor = parseInt(texto.replace(/\D/g, ''), 10);
    if (!valor) return;
    var formatar = texto.indexOf('.') > -1
      ? function (n) { return n.toLocaleString('pt-BR'); }
      : function (n) { return String(n); };
    var inicio = null, duracao = 1100;
    function passo(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / duracao, 1);
      p = 1 - Math.pow(1 - p, 3);
      alvo.textContent = formatar(Math.round(valor * p));
      if (p < 1) requestAnimationFrame(passo);
      else alvo.textContent = texto;
    }
    requestAnimationFrame(passo);
  }

  /* ---- Marquee infinito de logos ---- */
  var lista = document.querySelector('.marcas .marcas-lista');
  if (lista) {
    var marquee = document.createElement('div');
    marquee.className = 'marquee';
    var trilho = document.createElement('div');
    trilho.className = 'marquee-trilho';
    lista.parentNode.insertBefore(marquee, lista);
    trilho.appendChild(lista);
    var copia = lista.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    trilho.appendChild(copia);
    marquee.appendChild(trilho);
  }

  /* ---- Barra de progresso de leitura ---- */
  if (document.body.scrollHeight > window.innerHeight * 2.5) {
    var barra = document.createElement('div');
    barra.className = 'progresso';
    barra.setAttribute('aria-hidden', 'true');
    document.body.appendChild(barra);
  }
})();

/* ---- Aviso de cookies (discreto, decisão salva localmente) ---- */
(function () {
  'use strict';
  try {
    if (localStorage.getItem('brasilsul_cookies') === 'ok') return;
  } catch (e) { return; }

  var prefixo = window.location.pathname.indexOf('/blog/') > -1 ? '..' : '.';

  var aviso = document.createElement('div');
  aviso.className = 'aviso-cookies';
  aviso.setAttribute('role', 'region');
  aviso.setAttribute('aria-label', 'Aviso de cookies');
  aviso.innerHTML =
    '<span>Usamos cookies essenciais para o funcionamento do site. ' +
    '<a href="' + prefixo + '/privacidade.html">Saiba mais</a></span>' +
    '<span class="botoes">' +
    '<button type="button" class="aceitar">Aceitar</button>' +
    '</span>';
  document.body.appendChild(aviso);

  requestAnimationFrame(function () {
    setTimeout(function () { aviso.classList.add('visivel'); }, 400);
  });

  aviso.querySelector('.aceitar').addEventListener('click', function () {
    try { localStorage.setItem('brasilsul_cookies', 'ok'); } catch (e) {}
    aviso.classList.remove('visivel');
    setTimeout(function () { aviso.remove(); }, 400);
  });
})();
