import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  count: 20,          // hearts per burst
  minSize: 8,
  maxSize: 20,
  minSpeed: 2,
  maxSpeed: 7,
  gravity: 0.08,
  decay: 0.018,
  colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#ff4d6d'],
  glow: true,
  symbols: ['heart'], // 'heart' | 'star' | 'sparkle'
};

function drawSymbol(ctx, type, cx, cy, r, color, alpha, glow) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, alpha);
  if (glow) { ctx.shadowColor = color; ctx.shadowBlur = r * 2; }
  ctx.fillStyle = color;

  if (type === 'star') {
    // 5-point star
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const outer = (Math.PI / 2) + (i * 2 * Math.PI) / 5;
      const inner = outer + Math.PI / 5;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(outer), cy - r * Math.sin(outer));
      else ctx.lineTo(cx + r * Math.cos(outer), cy - r * Math.sin(outer));
      ctx.lineTo(cx + (r * 0.4) * Math.cos(inner), cy - (r * 0.4) * Math.sin(inner));
    }
    ctx.closePath();
    ctx.fill();
  } else if (type === 'sparkle') {
    // 4-point sparkle
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.ellipse(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5, r * 0.18, r * 0.7, a, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // heart
    ctx.beginPath();
    ctx.moveTo(cx, cy + r * 0.3);
    ctx.bezierCurveTo(cx - r * 1.1, cy - r * 0.5, cx - r * 1.6, cy + r * 0.5, cx, cy + r * 1.4);
    ctx.bezierCurveTo(cx + r * 1.6, cy + r * 0.5, cx + r * 1.1, cy - r * 0.5, cx, cy + r * 0.3);
    ctx.fill();
  }
  ctx.restore();
}

export function heartBurst(canvas, userOptions = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d');
  const particles = [];
  let running = true;

  function spawnBurst(x, y) {
    for (let i = 0; i < opts.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed);
      particles.push({
        x, y,
        size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: opts.decay * (0.8 + Math.random() * 0.4),
        color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
        symbol: opts.symbols[Math.floor(Math.random() * opts.symbols.length)],
      });
    }
  }

  const onClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    spawnBurst(e.clientX - rect.left, e.clientY - rect.top);
  };
  const onTouch = (e) => {
    const rect = canvas.getBoundingClientRect();
    Array.from(e.changedTouches).forEach((t) => spawnBurst(t.clientX - rect.left, t.clientY - rect.top));
  };

  window.addEventListener('click', onClick);
  window.addEventListener('touchend', onTouch, { passive: true });

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += opts.gravity;     // gravity
      p.alpha -= p.decay;
      drawSymbol(ctx, p.symbol, p.x, p.y, p.size, p.color, p.alpha, opts.glow);
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    window.removeEventListener('click', onClick);
    window.removeEventListener('touchend', onTouch);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
