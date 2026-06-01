import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  minSize: 6,
  maxSize: 16,
  decay: 0.025,
  colors: ['#ff6b8a', '#ff4d6d', '#ff85a1', '#ffc2d1', '#c9184a'],
  glow: true,
};

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha: number, glow: boolean) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, alpha);
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = r * 2;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.3);
  ctx.bezierCurveTo(cx - r * 1.1, cy - r * 0.5, cx - r * 1.6, cy + r * 0.5, cx, cy + r * 1.4);
  ctx.bezierCurveTo(cx + r * 1.6, cy + r * 0.5, cx + r * 1.1, cy - r * 0.5, cx, cy + r * 0.3);
  ctx.fill();
  ctx.restore();
}

export function heartTrail(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const hearts: any[] = [];
  let running = true;

  function addHeart(x: number, y: number) {
    hearts.push({
      x,
      y,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      alpha: 0.9 + Math.random() * 0.1,
      decay: opts.decay * (0.8 + Math.random() * 0.4),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      vy: -(0.3 + Math.random() * 0.6), // drift upward
    });
  }

  // Mouse support
  const onMouseMove = (e: any) => {
    const rect = canvas.getBoundingClientRect();
    addHeart(e.clientX - rect.left, e.clientY - rect.top);
  };

  // Touch support
  const onTouchMove = (e: any) => {
    const rect = canvas.getBoundingClientRect();
    Array.from(e.touches).forEach((t: any) => {
      addHeart(t.clientX - rect.left, t.clientY - rect.top);
    });
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y += h.vy;
      drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, opts.glow);
      h.alpha -= h.decay;
      if (h.alpha <= 0) hearts.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
