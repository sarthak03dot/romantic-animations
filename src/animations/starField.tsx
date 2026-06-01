import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  starCount: 120,
  speed: 0.4,
  colors: ['#ffffff', '#ffe4e8', '#ffc2d1', '#e7c6ff', '#a2d2ff'],
  minSize: 1,
  maxSize: 3.5,
  twinkle: true,
  connectDist: 100,     // draw faint lines between close stars
  connectOpacity: 0.08,
};

export function starField(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const stars: any[] = [];
  let running = true;

  function createStar(randomY = false) {
    return {
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : Math.random() * canvas.height,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      alpha: 0.3 + Math.random() * 0.7,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: 0.008 + Math.random() * 0.015,
      vx: (Math.random() - 0.5) * opts.speed,
      vy: (Math.random() - 0.5) * opts.speed,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
    };
  }

  for (let i = 0; i < opts.starCount; i++) stars.push(createStar(true));

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    if (opts.connectDist > 0) {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < opts.connectDist) {
            ctx.save();
            ctx.globalAlpha = opts.connectOpacity * (1 - dist / opts.connectDist);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    // Draw stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;

      if (opts.twinkle) {
        s.alpha += s.alphaDir * s.twinkleSpeed;
        if (s.alpha >= 1) { s.alpha = 1; s.alphaDir = -1; }
        if (s.alpha <= 0.1) { s.alpha = 0.1; s.alphaDir = 1; }
      }

      // Wrap
      if (s.x < -5) s.x = canvas.width + 5;
      if (s.x > canvas.width + 5) s.x = -5;
      if (s.y < -5) s.y = canvas.height + 5;
      if (s.y > canvas.height + 5) s.y = -5;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = s.size * 3;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
