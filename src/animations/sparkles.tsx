import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  count: 80,           // number of sparkles alive at once
  minSize: 2,
  maxSize: 6,
  speed: 0.5,
  twinkleSpeed: 0.04,
  colors: ['#fff', '#ffe4e8', '#ffb3c1', '#ff85a1', '#ffd6ff', '#e7c6ff'],
  glow: true,
};

export function sparkles(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const stars: any[] = [];
  let running = true;

  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: opts.twinkleSpeed * (0.5 + Math.random()),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      vx: (Math.random() - 0.5) * opts.speed,
      vy: (Math.random() - 0.5) * opts.speed,
    };
  }

  // Populate initial stars
  for (let i = 0; i < opts.count; i++) stars.push(createStar());

  function drawStar(s: any) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
    if (opts.glow) { ctx.shadowColor = s.color; ctx.shadowBlur = s.size * 3; }
    ctx.fillStyle = s.color;

    // Cross / sparkle shape
    const r = s.size;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.ellipse(
        s.x + Math.cos(a) * r * 0.35,
        s.y + Math.sin(a) * r * 0.35,
        r * 0.15, r * 0.7, a, 0, Math.PI * 2
      );
    }
    ctx.fill();

    // Tiny centre dot
    ctx.beginPath();
    ctx.arc(s.x, s.y, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha += s.alphaDir * s.twinkleSpeed;

      if (s.alpha >= 1) { s.alpha = 1; s.alphaDir = -1; }
      else if (s.alpha <= 0) { s.alpha = 0; s.alphaDir = 1; }

      // Wrap edges
      if (s.x < -10) s.x = canvas.width + 10;
      if (s.x > canvas.width + 10) s.x = -10;
      if (s.y < -10) s.y = canvas.height + 10;
      if (s.y > canvas.height + 10) s.y = -10;

      drawStar(s);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
