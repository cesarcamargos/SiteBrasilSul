/* BrasilSul 3.0 — efeitos discretos. Todo o conteúdo continua disponível sem este script. */
(() => {
  'use strict';
  const root = document.documentElement;
  const KEY = 'brasilsul-motion';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  let preference = null;
  try { preference = localStorage.getItem(KEY); } catch { /* armazenamento indisponível */ }
  let enabled = !reduced.matches && preference !== 'off';
  let observer;

  try {
    /* ---- Preferência de movimento (controle no rodapé) ---- */
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'efeitos-toggle';
    const footerBottom = $('.footer-bottom');
    if (footerBottom) {
      const holder = document.createElement('span');
      holder.append(toggle);
      footerBottom.append(holder);
    }
    const apply = () => {
      root.classList.toggle('fx', enabled);
      toggle.textContent = reduced.matches ? 'Efeitos visuais reduzidos pelo dispositivo' : (enabled ? 'Pausar efeitos visuais' : 'Ativar efeitos visuais');
      toggle.disabled = reduced.matches;
      if (!enabled) $$('.rv').forEach(element => element.classList.add('is-in'));
    };
    toggle.addEventListener('click', () => {
      enabled = !enabled && !reduced.matches;
      preference = enabled ? 'on' : 'off';
      try { localStorage.setItem(KEY, preference); } catch { /* opcional */ }
      apply();
    });
    reduced.addEventListener('change', () => { enabled = !reduced.matches && preference !== 'off'; apply(); });

    /* ---- Entrada ao rolar ---- */
    const groups = [
      '.fabricantes', '.bloco-cabeca', '.frente', '.complementos', '.sobre-texto', '.sobre-linha',
      '.compromissos li', '.etapas', '.leituras a', '.fecho',
      '.service-section-title', '.secao-cabeca', '.problem-item', '.delivery-row', '.scope-row', '.passo',
      '.item-numerado', '.beneficio', '.comp-linha', '.prazo-linha', '.mapa-linha', '.exigencia-item',
      '.post-item', '.faq details', '.cta-faixa', '.info-item', '.vitrine-numeros > *'
    ];
    const targets = $$(groups.join(','));
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      }, { threshold: .08, rootMargin: '0px 0px -6% 0px' });
      const viewport = window.innerHeight;
      targets.forEach(element => {
        const siblings = element.parentElement ? [...element.parentElement.children].filter(node => node.classList.contains('rv') || targets.includes(node)) : [];
        const order = Math.min(Math.max(siblings.indexOf(element), 0), 5);
        element.style.setProperty('--rv-d', (order * 70) + 'ms');
        element.classList.add('rv');
        if (!enabled || element.getBoundingClientRect().top < viewport * .92) element.classList.add('is-in');
        else observer.observe(element);
      });
    }
    /* Quem navega pelo teclado nunca foca algo ainda oculto. */
    document.addEventListener('focusin', event => {
      const hidden = event.target.closest?.('.rv:not(.is-in)');
      if (hidden) { hidden.style.setProperty('--rv-d', '0ms'); hidden.classList.add('is-in'); }
    });

    /* ---- Cabeçalho e retorno ao início ---- */
    const header = $('.header');
    const top = document.createElement('button');
    top.type = 'button';
    top.className = 'topo';
    top.setAttribute('aria-label', 'Voltar ao início');
    top.innerHTML = '<span aria-hidden="true">↑</span>';
    top.tabIndex = -1;
    document.body.append(top);
    top.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: enabled ? 'smooth' : 'instant' });
      $('.brand')?.focus({ preventScroll: true });
    });
    let frame = 0;
    const onScroll = () => {
      frame = 0;
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 12);
      const show = y > window.innerHeight * .9;
      top.classList.toggle('is-on', show);
      top.tabIndex = show ? 0 : -1;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(onScroll); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);

    /* ---- Navegação da página de serviço acompanha a leitura ---- */
    const spyLinks = $$('.service-nav a[href^="#"]');
    if (spyLinks.length && 'IntersectionObserver' in window) {
      const byId = new Map(spyLinks.map(link => [link.getAttribute('href').slice(1), link]));
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach(link => link.removeAttribute('aria-current'));
          byId.get(entry.target.id)?.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-25% 0px -65% 0px' });
      /* Observa todas as seções: fora das que estão no menu, nenhum item fica marcado. */
      $$('main section').forEach(section => spy.observe(section));
    }

    /* ---- Hora de Florianópolis: relógio no rodapé e tom do céu na capa ---- */
    const clockTargets = $$('[data-hora-floripa]');
    const location = $('.footer-location');
    let footerClock;
    if (location) {
      footerClock = document.createElement('span');
      footerClock.className = 'footer-hora';
      location.after(footerClock);
    }
    const formatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    const tick = () => {
      const time = formatter.format(new Date());
      const hour = Number(time.slice(0, 2));
      root.dataset.periodo = hour >= 5 && hour < 9 ? 'manha' : hour >= 9 && hour < 16 ? 'dia' : hour >= 16 && hour < 19 ? 'entardecer' : 'noite';
      clockTargets.forEach(element => { element.textContent = 'Florianópolis, ' + time; });
      if (footerClock) footerClock.textContent = 'Agora em Florianópolis: ' + time;
    };
    tick();
    setInterval(() => { if (!document.hidden) tick(); }, 30000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

    $$('[data-ano-atual]').forEach(element => { element.textContent = String(new Date().getFullYear()); });

    apply();
    onScroll();
  } catch (error) {
    root.classList.remove('fx');
    observer?.disconnect();
    $$('.rv').forEach(element => element.classList.add('is-in'));
    console.warn('Os efeitos visuais não foram ativados; a página continua disponível.', error);
  }
})();
