import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  count: 0.12,       // hearts spawned per frame (probability)
  minSize: 14,
  maxSize: 32,
  minSpeed: 0.8,
  maxSpeed: 2.4,
  colors: ['#ff6b8a', '#ff4d6d', '#ff85a1', '#ffc2d1', '#ff0a54', '#ff477e'],
  wobble: true,      // horizontal sine drift
  glow: true,
};

/**
 * Draw a proper heart shape centred at (cx, cy) with given radius.
 */
function drawHeartShape(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha: number = 1, glow: boolean = false) {
  ctx.save();
  ctx.globalAlpha = alpha;
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = r * 1.2;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.3);
  // left lobe
  ctx.bezierCurveTo(cx - r * 1.1, cy - r * 0.5, cx - r * 1.6, cy + r * 0.5, cx, cy + r * 1.4);
  // right lobe
  ctx.bezierCurveTo(cx + r * 1.6, cy + r * 0.5, cx + r * 1.1, cy - r * 0.5, cx, cy + r * 0.3);
  ctx.fill();
  ctx.restore();
}

export function floatingHearts(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const hearts: any[] = [];
  let running = true;
  let frame = 0;

  function createHeart() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + size * 2,
      size,
      speed: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      alpha: 0.7 + Math.random() * 0.3,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmount: 0.5 + Math.random() * 1.5,
    };
  }

  function animate() {
    if (!running) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.count) hearts.push(createHeart());

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.y -= h.speed;
      h.wobbleOffset += h.wobbleSpeed;
      const xOffset = opts.wobble ? Math.sin(h.wobbleOffset) * h.wobbleAmount * h.size * 0.5 : 0;

      // Fade out near top
      const fadeAlpha = Math.min(h.alpha, h.y / (canvas.height * 0.2));
      if (fadeAlpha <= 0 || h.y < -h.size * 3) {
        hearts.splice(i, 1);
        continue;
      }

      drawHeartShape(ctx, h.x + xOffset, h.y, h.size, h.color, Math.max(0, fadeAlpha), opts.glow);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
