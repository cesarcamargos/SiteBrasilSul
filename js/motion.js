/* All content remains available without this enhancement. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let enabled = !reduced.matches;
  let preference = null;
  let frame = 0;
  let observer;
  let liveAnimations = [];
  const cleanups = [];
  const managedAnimations = new Set();
  const animate = (element, keyframes, options) => {
    if (!enabled || !element || typeof element.animate !== 'function') return null;
    const animation = element.animate(keyframes, options);
    managedAnimations.add(animation);
    const release = () => managedAnimations.delete(animation);
    animation.addEventListener('finish', release, { once: true });
    animation.addEventListener('cancel', release, { once: true });
    return animation;
  };
  try {
    try { preference = localStorage.getItem('brasilsul-motion'); } catch { /* Storage may be unavailable in local previews. */ }
    enabled = preference !== 'off' && !reduced.matches;
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);
    const controls = document.createElement('div');
    controls.className = 'motion-controls';
    const toggle = document.createElement('button');
    toggle.className = 'motion-toggle';
    toggle.type = 'button';
    toggle.innerHTML = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 4v12M13 4v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><span>Efeitos ativos</span>';
    controls.append(toggle);
    document.body.append(controls);
    const backTop = document.createElement('button');
    backTop.type = 'button';
    backTop.className = 'back-top';
    backTop.setAttribute('aria-label', 'Voltar ao início');
    backTop.innerHTML = '<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.9155"/></svg><span aria-hidden="true">↑</span>';
    backTop.tabIndex = -1;
    document.body.append(backTop);
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: enabled ? 'smooth' : 'instant' });
      const start = $('.brand');
      if (start) start.focus({ preventScroll: true });
    });
    const applyPreference = () => {
      root.classList.toggle('motion-enabled', enabled);
      root.classList.toggle('motion-paused', !enabled);
      root.dataset.motion = enabled ? 'on' : 'off';
      toggle.setAttribute('aria-pressed', String(!enabled));
      toggle.setAttribute('aria-label', enabled ? 'Pausar animações' : 'Ativar animações');
      toggle.querySelector('span').textContent = enabled ? 'Efeitos ativos' : 'Efeitos pausados';
      toggle.disabled = reduced.matches;
      toggle.title = reduced.matches ? 'A preferência do dispositivo é reduzir movimentos.' : (enabled ? 'Pausar os efeitos visuais' : 'Ativar os efeitos visuais');
      if (!enabled) {
        managedAnimations.forEach(animation => animation.cancel());
        $$('.reveal').forEach(element => element.classList.add('is-visible'));
      }
      schedule();
    };
    toggle.addEventListener('click', () => {
      enabled = !enabled && !reduced.matches;
      preference = enabled ? 'on' : 'off';
      try { localStorage.setItem('brasilsul-motion', preference); } catch { /* Optional persistence. */ }
      applyPreference();
    });
    reduced.addEventListener('change', () => {
      enabled = !reduced.matches && preference !== 'off';
      applyPreference();
    });
    const headings = $$('.hero-copy h1, .section-head h2, .about-copy h2, .final-cta h2');
    headings.forEach(heading => {
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      let index = 0;
      nodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(word => {
          if (!word || /^\s+$/.test(word)) { fragment.append(document.createTextNode(word)); return; }
          const span = document.createElement('span');
          span.className = 'motion-word';
          span.textContent = word;
          span.style.setProperty('--word-index', String(Math.min(index++, 14)));
          fragment.append(span);
        });
        node.replaceWith(fragment);
      });
    });
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: .06, rootMargin: '0px 0px -35px 0px' });
      const reveal = (element, delay = 0, direction = 'up') => {
        if (!element) return;
        element.style.setProperty('--reveal-delay', delay + 'ms');
        element.dataset.reveal = direction;
        const box = element.getBoundingClientRect();
        element.classList.add('reveal');
        if (!enabled || box.top < window.innerHeight * .9) element.classList.add('is-visible');
        else observer.observe(element);
      };
      $$('.section-head').forEach(element => reveal(element));
      $$('.solution-card').forEach((element, index) => reveal(element, (index % 3) * 110));
      $$('.steps article').forEach((element, index) => reveal(element, (index % 4) * 95));
      $$('.resource-grid>a').forEach((element, index) => reveal(element, (index % 3) * 105));
      $$('.other-solutions, .about-copy, .final-cta>*, .footer-main>div').forEach((element, index) => reveal(element, (index % 3) * 60));
      reveal($('.about-art'), 0, 'left');
    }
    const makerList = $('.makers>.maker-list');
    if (makerList) {
      const viewport = document.createElement('div');
      viewport.className = 'makers-viewport';
      const track = document.createElement('div');
      track.className = 'maker-track';
      makerList.replaceWith(viewport);
      viewport.append(track);
      const duplicate = makerList.cloneNode(true);
      duplicate.setAttribute('aria-hidden', 'true');
      track.append(makerList, duplicate);
    }
    const hero = $('.hero');
    const windowPanel = $('.solution-window');
    const about = $('.about-art');
    const finalCta = $('.final-cta');
    const steps = $$('.steps article');
    const sections = $$('#solucoes, #sobre, #como-funciona, #conteudos');
    const navLinks = $$('.header nav>a[href^="#"]');
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const height = window.innerHeight;
      const fullHeight = Math.max(0, root.scrollHeight - height);
      const reading = fullHeight > 0 ? clamp(y / fullHeight) : 0;
      progress.style.transform = 'scaleX(' + reading.toFixed(4) + ')';
      backTop.style.setProperty('--reading-offset', String(100 - reading * 100));
      const showBackTop = y > height * .8;
      backTop.classList.toggle('is-visible', showBackTop);
      backTop.tabIndex = showBackTop ? 0 : -1;
      $('.header')?.classList.toggle('is-scrolled', y > 20);
      let currentSection = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < height * .42 && rect.bottom > 100) currentSection = '#' + section.id;
      });
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentSection) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      if (hero) {
        const box = hero.getBoundingClientRect();
        hero.classList.toggle('motion-awake', box.bottom > 0 && box.top < height);
        if (box.bottom > -100 && box.top < height) {
          const mobile = window.innerWidth <= 600;
          const drift = enabled ? clamp(-box.top * (mobile ? .055 : .12), -20, mobile ? 35 : 85) : 0;
          hero.style.setProperty('--hero-drift', drift.toFixed(2) + 'px');
          hero.style.setProperty('--copy-drift', (enabled ? clamp(-box.top * .045, -8, 35) : 0).toFixed(2) + 'px');
          if (windowPanel) {
            const panelBox = windowPanel.getBoundingClientRect();
            const phase = enabled ? clamp((height * .94 - panelBox.top) / (height * .65)) : 1;
            windowPanel.style.setProperty('--window-lift', ((1 - phase) * (mobile ? 9 : 22)).toFixed(2) + 'px');
            windowPanel.style.setProperty('--window-angle', ((1 - phase) * 8).toFixed(2) + 'deg');
            windowPanel.style.setProperty('--window-scale', (.96 + phase * .04).toFixed(4));
          }
        }
      }
      const makers = $('.makers');
      if (makers) { const rect = makers.getBoundingClientRect(); makers.classList.toggle('motion-awake', rect.bottom > 0 && rect.top < height); }
      if (about) {
        const box = about.getBoundingClientRect();
        if (box.bottom > 0 && box.top < height) {
          const phase = enabled ? clamp((height * .5 - (box.top + box.height * .5)) / height, -.6, .6) : 0;
          about.style.setProperty('--sun-drift', (phase * -70).toFixed(2) + 'px');
          about.style.setProperty('--land-drift', (phase * 38).toFixed(2) + 'px');
          about.style.setProperty('--year-drift', (phase * -15).toFixed(2) + 'px');
        }
      }
      steps.forEach(step => {
        const fill = clamp((height * .87 - step.getBoundingClientRect().top) / (height * .32));
        step.style.setProperty('--step-fill', fill.toFixed(3));
        step.classList.toggle('is-step-active', fill > .45);
      });
      if (finalCta) {
        const rect = finalCta.getBoundingClientRect();
        if (rect.top < height && rect.bottom > 0) finalCta.style.setProperty('--cta-drift', (enabled ? clamp((height - rect.top) / height) * 75 : 0).toFixed(2) + 'px');
      }
    };
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);
    document.fonts?.ready.then(schedule);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
    document.addEventListener('brasilsul:productchange', () => {
      liveAnimations.forEach(animation => animation?.cancel());
      liveAnimations = [];
      if (!enabled) return;
      $$('.panel-text>*').forEach((element, index) => {
        liveAnimations.push(animate(element, [{ opacity: 0, transform: 'translateY(14px)', filter: 'blur(3px)' }, { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' }], { duration: 600, delay: index * 40, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
      });
      liveAnimations.push(animate($('.art-core'), [{ opacity: .25, scale: '.78', rotate: '-9deg' }, { opacity: 1, scale: '1', rotate: '0deg' }], { duration: 750, easing: 'cubic-bezier(.16,1,.3,1)' }));
      $$('.floating-tile').forEach((element, index) => liveAnimations.push(animate(element, [{ opacity: 0, scale: '.7' }, { opacity: 1, scale: '1' }], { duration: 550, delay: index * 45, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' })));
      schedule();
    });
    $$('.solution-card').forEach(card => {
      let rect;
      let pointerFrame = 0;
      let point = null;
      const reset = () => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg');
      };
      card.addEventListener('pointerenter', () => { rect = card.getBoundingClientRect(); });
      card.addEventListener('pointermove', event => {
        if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
        point = { x: event.clientX, y: event.clientY };
        if (pointerFrame) return;
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          rect ||= card.getBoundingClientRect();
          const x = clamp((point.x - rect.left) / rect.width);
          const y = clamp((point.y - rect.top) / rect.height);
          card.style.setProperty('--tilt-x', ((.5 - y) * 5).toFixed(2) + 'deg');
          card.style.setProperty('--tilt-y', ((x - .5) * 5).toFixed(2) + 'deg');
          card.style.setProperty('--light-x', (x * 100).toFixed(1) + '%');
          card.style.setProperty('--light-y', (y * 100).toFixed(1) + '%');
        });
      }, { passive: true });
      card.addEventListener('pointerleave', reset);
      cleanups.push(reset);
    });
    if (hero) {
      let heroFrame = 0;
      let point;
      hero.addEventListener('pointermove', event => {
        if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
        point = { x: event.clientX, y: event.clientY };
        if (heroFrame) return;
        heroFrame = requestAnimationFrame(() => {
          heroFrame = 0;
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty('--hero-x', ((point.x - rect.left) / rect.width * 100).toFixed(1) + '%');
          hero.style.setProperty('--hero-y', ((point.y - rect.top) / rect.height * 100).toFixed(1) + '%');
        });
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { hero.style.removeProperty('--hero-x'); hero.style.removeProperty('--hero-y'); });
    }
    $$('.btn').forEach(button => {
      let pointerFrame = 0;
      let point;
      const reset = () => {
        if (pointerFrame) cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        button.style.setProperty('--magnet-x', '0px'); button.style.setProperty('--magnet-y', '0px');
      };
      button.addEventListener('pointermove', event => {
        if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
        point = { x: event.clientX, y: event.clientY };
        if (pointerFrame) return;
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          const rect = button.getBoundingClientRect();
          button.style.setProperty('--magnet-x', (clamp((point.x - rect.left) / rect.width) * 6 - 3).toFixed(1) + 'px');
          button.style.setProperty('--magnet-y', (clamp((point.y - rect.top) / rect.height) * 5 - 2.5).toFixed(1) + 'px');
        });
      }, { passive: true });
      button.addEventListener('pointerleave', reset);
      button.addEventListener('blur', reset);
      button.addEventListener('pointerdown', event => {
        if (!enabled) return;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.setAttribute('aria-hidden', 'true');
        ripple.style.setProperty('--ripple-x', (event.clientX - rect.left) + 'px');
        ripple.style.setProperty('--ripple-y', (event.clientY - rect.top) + 'px');
        button.append(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        setTimeout(() => ripple.remove(), 900);
      });
      cleanups.push(reset);
    });
    // A keyboard visitor must never focus an item that is waiting to be revealed.
    document.addEventListener('focusin', event => {
      const reveal = event.target.closest?.('.reveal');
      if (reveal) { reveal.style.setProperty('--reveal-delay', '0ms'); reveal.classList.add('is-visible'); }
    });
    applyPreference();
    window.addEventListener('pagehide', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      cleanups.forEach(cleanup => cleanup());
    });
  } catch (error) {
    root.classList.remove('motion-enabled');
    root.classList.add('motion-paused');
    observer?.disconnect();
    managedAnimations.forEach(animation => animation.cancel());
    console.warn('Os efeitos visuais não foram ativados; a página continua disponível.', error);
  }
})();
