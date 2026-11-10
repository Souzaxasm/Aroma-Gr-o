/* ===== Aroma & Grão — main.js ===== */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Preferências de acessibilidade ---------- */
  let fontPct = parseInt(store.get('ag-font') || '100', 10);
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    const dark = t === 'dark';
    ['theme-btn', 'theme-btn2'].forEach(id => {
      const b = document.getElementById(id);
      if (!b) return;
      b.setAttribute('aria-pressed', String(dark));
      if (id === 'theme-btn') { b.textContent = dark ? '☀️' : '🌙'; b.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro'); }
      else b.textContent = dark ? 'Modo claro' : 'Modo escuro';
    });
    store.set('ag-theme', t);
  }
  function applyFont() {
    root.style.fontSize = fontPct + '%';
    const s = document.getElementById('font-status');
    if (s) s.textContent = 'Tamanho da fonte: ' + fontPct + '%';
    store.set('ag-font', String(fontPct));
  }
  function applyContrast(on) {
    if (on) root.setAttribute('data-contrast', 'high'); else root.removeAttribute('data-contrast');
    const b = document.getElementById('contrast-btn');
    if (b) b.setAttribute('aria-pressed', String(on));
    store.set('ag-contrast', on ? '1' : '0');
  }
  const prefersDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(store.get('ag-theme') || (prefersDark ? 'dark' : 'light'));
  applyFont();
  applyContrast(store.get('ag-contrast') === '1');

  const toggleTheme = () => applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  ['theme-btn', 'theme-btn2'].forEach(id => { const b = document.getElementById(id); if (b) b.addEventListener('click', toggleTheme); });
  const fp = $('#font-plus'), fm = $('#font-minus'), cb = $('#contrast-btn'), rb = $('#reset-btn');
  if (fp) fp.addEventListener('click', () => { fontPct = Math.min(150, fontPct + 10); applyFont(); });
  if (fm) fm.addEventListener('click', () => { fontPct = Math.max(80, fontPct - 10); applyFont(); });
  if (cb) cb.addEventListener('click', () => applyContrast(!root.hasAttribute('data-contrast')));
  if (rb) rb.addEventListener('click', () => { fontPct = 100; applyFont(); applyContrast(false); applyTheme('light'); });

  const ab = $('#a11y-btn'), panel = $('#a11y-panel');
  if (ab && panel) {
    const setPanel = open => { panel.hidden = !open; ab.setAttribute('aria-expanded', String(open)); };
    ab.addEventListener('click', () => setPanel(panel.hidden));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { setPanel(false); ab.focus(); } });
  }

  /* ---------- Abas (ARIA) + pesquisa ---------- */
  const tabs = $$('[role="tab"]');
  function selectTab(tab) {
    tabs.forEach(t => {
      const sel = t === tab;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).classList.toggle('hidden', !sel);
    });
    filter();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); n.focus(); selectTab(n); }
    });
  });
  const busca = $('#busca');
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function filter() {
    if (!busca) return;
    const q = norm(busca.value.trim());
    const status = $('#busca-status'), none = $('#sem-resultado');
    if (!q) {
      $$('.searchable').forEach(c => c.classList.remove('hidden'));
      none.classList.add('hidden'); status.textContent = ''; return;
    }
    // com termo digitado, procura em todas as abas e abre a primeira com resultado
    let total = 0, firstTab = null;
    tabs.forEach(t => {
      const p = document.getElementById(t.getAttribute('aria-controls'));
      let n = 0;
      $$('.searchable', p).forEach(c => {
        const hit = norm(c.textContent).includes(q);
        c.classList.toggle('hidden', !hit);
        if (hit) n++;
      });
      total += n;
      if (n && !firstTab) firstTab = t;
    });
    const current = tabs.find(t => t.getAttribute('aria-selected') === 'true');
    const curPanel = document.getElementById(current.getAttribute('aria-controls'));
    if (!$$('.searchable:not(.hidden)', curPanel).length && firstTab) {
      tabs.forEach(t => {
        const sel = t === firstTab;
        t.setAttribute('aria-selected', String(sel)); t.tabIndex = sel ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).classList.toggle('hidden', !sel);
      });
    }
    none.classList.toggle('hidden', total > 0);
    status.textContent = total + (total === 1 ? ' resultado encontrado.' : ' resultados encontrados.');
  }
  if (busca) busca.addEventListener('input', filter);

  /* ---------- Carrossel ---------- */
  const slides = $('#slides');
  if (slides) {
    const items = $$('.slide', slides), dots = $('#dots');
    let idx = 0, timer = null, playing = true;
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot'; d.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
      d.addEventListener('click', () => go(i)); dots.appendChild(d);
    });
    function go(i) {
      idx = (i + items.length) % items.length;
      slides.style.transform = 'translateX(' + (-idx * 100) + '%)';
      $$('.dot', dots).forEach((d, k) => d.setAttribute('aria-current', String(k === idx)));
    }
    function start() { stop(); timer = setInterval(() => go(idx + 1), 5000); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    $('#prev').addEventListener('click', () => go(idx - 1));
    $('#next').addEventListener('click', () => go(idx + 1));
    const play = $('#play');
    play.addEventListener('click', () => {
      playing = !playing;
      play.setAttribute('aria-pressed', String(!playing));
      play.textContent = playing ? '⏸ Pausar rotação' : '▶ Retomar rotação';
      playing ? start() : stop();
    });
    const car = slides.parentElement;
    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', () => { if (playing) start(); });
    car.addEventListener('focusin', stop);
    car.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(idx - 1); if (e.key === 'ArrowRight') go(idx + 1); });
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { playing = false; play.setAttribute('aria-pressed', 'true'); play.textContent = '▶ Retomar rotação'; }
    go(0); if (playing) start();
  }

  /* ---------- Validação de formulários ---------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(input, msg) {
    const e = document.getElementById(input.getAttribute('aria-describedby'));
    if (e) e.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function wire(formId, okId, rules, okMsg) {
    const f = document.getElementById(formId);
    if (!f) return;
    f.addEventListener('submit', ev => {
      ev.preventDefault();
      let first = null, valid = true;
      rules.forEach(([id, check]) => {
        const el = document.getElementById(id);
        const ok = setErr(el, check(el.value.trim()));
        if (!ok && !first) first = el;
        valid = valid && ok;
      });
      const out = document.getElementById(okId);
      if (valid) { out.textContent = okMsg; f.reset(); }
      else { out.textContent = ''; first.focus(); }
    });
  }
  wire('form-contato', 'ok-contato', [
    ['nome', v => v.length < 3 ? 'Informe seu nome (mínimo 3 caracteres).' : ''],
    ['email', v => !emailRe.test(v) ? 'Informe um e-mail válido, como nome@exemplo.com.' : ''],
    ['msg', v => v.length < 10 ? 'Escreva uma mensagem com pelo menos 10 caracteres.' : '']
  ], 'Mensagem enviada! Responderemos em até 2 dias úteis. (demonstração)');
  wire('form-login', 'ok-login', [
    ['l-email', v => !emailRe.test(v) ? 'Informe um e-mail válido.' : ''],
    ['l-senha', v => v.length < 6 ? 'A senha deve ter pelo menos 6 caracteres.' : '']
  ], 'Login realizado com sucesso! (demonstração)');
  const mostrar = $('#mostrar');
  if (mostrar) mostrar.addEventListener('change', () => { $('#l-senha').type = mostrar.checked ? 'text' : 'password'; });
})();
