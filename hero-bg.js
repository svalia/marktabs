/* hero-bg.js — full-viewport hand-drawn # field reactive to mouse */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-bg-canvas');
  if (!canvas) return;
  const wrap = canvas.parentElement; // .hero-bg, fixed/full-viewport

  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  let marks = [];
  const mouse = { x: -9999, y: -9999, active: false };

  const buildHashSvg = (color) => (
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-2 -3 36 38'>" +
    "<g fill='" + color + "'>" +
    "<path d='M 11.10 4.65 C 11.65 4.40 12.40 4.55 12.85 4.95 C 13.20 5.65 13.25 6.45 13.10 7.20 C 12.65 9.05 12.35 10.95 12.05 12.85 C 11.85 14.55 11.60 16.25 11.45 17.95 C 11.25 19.95 11.00 21.95 10.75 23.95 C 10.50 25.65 10.15 27.35 9.75 29.05 C 9.55 29.75 9.30 30.40 8.85 30.95 C 8.55 31.10 8.10 30.95 7.95 30.65 C 7.95 29.85 8.20 29.10 8.45 28.35 C 8.95 25.95 9.30 23.50 9.65 21.10 C 10.05 18.30 10.45 15.50 10.85 12.70 C 11.10 10.55 11.30 8.40 11.40 6.25 C 11.35 5.70 11.20 5.20 11.10 4.65 Z'/>" +
    "<path d='M 24.20 1.70 C 24.85 1.55 25.55 1.95 25.75 2.55 C 25.85 3.65 25.50 4.70 25.15 5.70 C 24.65 7.65 24.10 9.60 23.65 11.55 C 23.05 14.25 22.45 16.95 21.90 19.65 C 21.35 22.30 20.80 24.95 20.20 27.55 C 19.70 29.65 19.10 31.75 18.30 33.75 C 18.00 33.95 17.55 33.85 17.45 33.55 C 17.45 32.85 17.65 32.20 17.85 31.55 C 18.40 28.95 18.95 26.35 19.50 23.75 C 20.15 20.65 20.85 17.55 21.55 14.45 C 22.20 11.55 22.85 8.65 23.45 5.75 C 23.70 4.40 23.95 3.05 24.20 1.70 Z'/>" +
    "<path d='M 3.85 12.10 C 4.40 11.75 5.05 11.65 5.65 11.85 C 7.85 11.45 10.05 11.30 12.25 11.10 C 15.65 11.00 19.05 11.30 22.45 11.65 C 24.85 11.75 27.25 11.65 29.65 12.05 C 30.45 12.20 31.25 12.25 31.95 12.65 C 32.20 12.95 32.30 13.40 32.10 13.75 C 31.75 14.20 31.20 14.35 30.65 14.30 C 27.45 13.85 24.25 14.15 21.05 13.90 C 17.35 13.55 13.65 13.15 9.95 13.30 C 7.65 13.45 5.40 13.85 3.10 13.75 C 2.75 13.55 2.65 13.10 2.85 12.80 C 3.15 12.45 3.50 12.25 3.85 12.10 Z'/>" +
    "<path d='M 4.65 20.55 C 5.40 20.05 6.30 19.90 7.10 20.05 C 9.85 20.65 12.65 21.00 15.45 21.25 C 19.15 21.55 22.85 21.65 26.55 22.20 C 28.35 22.45 30.15 22.55 31.95 22.95 C 32.30 23.20 32.50 23.65 32.30 24.05 C 32.05 24.50 31.55 24.70 31.05 24.60 C 27.35 24.10 23.65 23.85 19.95 23.65 C 15.55 23.40 11.15 23.30 6.75 22.65 C 5.65 22.45 4.55 22.35 3.50 21.95 C 3.25 21.65 3.30 21.20 3.55 20.95 C 3.95 20.75 4.30 20.65 4.65 20.55 Z'/>" +
    "</g></svg>"
  );

  const stampInk = new Image();
  const stampAccent = new Image();
  let stampInkReady = false, stampAccentReady = false;
  const tryDraw = () => { if (stampInkReady && stampAccentReady) wakeUp(); };
  stampInk.onload    = () => { stampInkReady = true;    tryDraw(); };
  stampAccent.onload = () => { stampAccentReady = true; tryDraw(); };
  stampInk.src    = 'data:image/svg+xml;utf8,' + encodeURIComponent(buildHashSvg('#0a0a0a'));
  stampAccent.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(buildHashSvg('#d97757'));

  function pseudo(n) {
    const v = (Math.sin(n * 12.9898) * 43758.5453);
    return v - Math.floor(v);
  }

  function layout() {
    // Measure the wrapper (which is fixed/100vw x 100vh) instead of
    // trusting window.innerWidth/innerHeight, which can be stale or
    // reflect a different viewport during early layout.
    const rect = wrap.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    marks = [];
    const cell = 64;
    const cols = Math.ceil(W / cell) + 2;
    const rows = Math.ceil(H / cell) + 2;
    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = c * cell - cell * 0.5;
        const baseY = r * cell - cell * 0.5;
        const jx = pseudo(id * 13 + 1) * cell * 0.55;
        const jy = pseudo(id * 17 + 7) * cell * 0.55;
        const size = 14 + pseudo(id * 19 + 3) * 18;
        const baseAlpha = 0.10 + pseudo(id * 23 + 5) * 0.10;
        const rot = (pseudo(id * 29 + 11) - 0.5) * 0.5;
        marks.push({
          x: baseX + jx, y: baseY + jy,
          size, baseAlpha, rot,
          alpha: baseAlpha, curRot: rot, curScale: 1, curInfluence: 0,
        });
        id++;
      }
    }
  }

  function onMove(e) {
    let cx, cy;
    if (e.touches && e.touches[0]) {
      cx = e.touches[0].clientX; cy = e.touches[0].clientY;
    } else {
      cx = e.clientX; cy = e.clientY;
    }
    mouse.x = cx;
    mouse.y = cy;
    mouse.active = true;
    wakeUp();
  }
  function onLeave() {
    mouse.active = false;
    mouse.x = -9999; mouse.y = -9999;
    wakeUp();
  }

  function draw() {
    if (!stampInkReady || !stampAccentReady) return false;
    ctx.clearRect(0, 0, W, H);

    const radius = 220;
    const radius2 = radius * radius;
    let stillAnimating = false;

    for (let i = 0; i < marks.length; i++) {
      const m = marks[i];

      let influence = 0;
      if (mouse.active) {
        const dx = m.x - mouse.x;
        const dy = m.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < radius2) {
          const d = Math.sqrt(d2);
          influence = 1 - (d / radius);
          influence = influence * influence;
        }
      }

      const targetAlpha = m.baseAlpha + influence * 0.55;
      const targetScale = 1 + influence * 0.5;
      const targetRot   = m.rot + influence * 0.5;

      m.alpha        += (targetAlpha - m.alpha)        * 0.25;
      m.curScale     += (targetScale - m.curScale)     * 0.25;
      m.curRot       += (targetRot   - m.curRot)       * 0.25;
      m.curInfluence += (influence   - m.curInfluence) * 0.25;

      if (Math.abs(targetAlpha - m.alpha) > 0.002 ||
          Math.abs(targetScale - m.curScale) > 0.002 ||
          Math.abs(influence - m.curInfluence) > 0.002) {
        stillAnimating = true;
      }

      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.curRot);
      const s = m.size * m.curScale;
      const inf = m.curInfluence;

      const inkAlpha = Math.min(0.85, m.alpha) * (1 - inf);
      if (inkAlpha > 0.005) {
        ctx.globalAlpha = inkAlpha;
        ctx.drawImage(stampInk, -s / 2, -s / 2, s, s);
      }
      const accentAlpha = Math.min(0.95, 0.3 + m.alpha * 1.2) * inf;
      if (accentAlpha > 0.005) {
        ctx.globalAlpha = accentAlpha;
        ctx.drawImage(stampAccent, -s / 2, -s / 2, s, s);
      }
      ctx.restore();
    }

    return stillAnimating;
  }

  let raf;
  function tick() {
    const stillAnimating = draw();
    if (stillAnimating || mouse.active) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  function wakeUp() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function start() {
    layout();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
    // Re-layout aggressively for the first second to catch late-arriving
    // size changes (iframe parent resize, font loads, URL-bar collapse).
    let n = 0;
    const id = setInterval(() => {
      const r = wrap.getBoundingClientRect();
      if (Math.round(r.width) !== W || Math.round(r.height) !== H) {
        layout();
      }
      if (++n > 30) clearInterval(id); // ~3s @ 100ms
    }, 100);
  }

  window.addEventListener('resize', () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    layout(); wakeUp();
  }, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      layout(); wakeUp();
    });
    ro.observe(wrap);
  }

  // Listen on document so the cursor highlights the # field anywhere
  // on the page (not just over the hero element).
  document.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend', onLeave);

  start();
})();
