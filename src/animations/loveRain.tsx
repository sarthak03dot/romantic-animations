import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.15,       // probability of a new drop per frame
  symbols: ['❤', '💕', '✨', '💖', '💗', '⭐', '×'],
  minSize: 12,
  maxSize: 28,
  minSpeed: 1,
  maxSpeed: 3.5,
  colors: ['#ff6b8a', '#ff4d6d', '#ffc2d1', '#ff85a1', '#ff0a54', '#a2d2ff'],
  opacity: 0.85,
  glow: true,
};

export function loveRain(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const drops: any[] = [];
  let running = true;

  function createDrop() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: -size * 2,
      size,
      speed: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      symbol: opts.symbols[Math.floor(Math.random() * opts.symbols.length)],
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      alpha: 0.4 + Math.random() * 0.6,
      angle: (Math.random() - 0.5) * 0.4,      // slight tilt
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
    };
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) drops.push(createDrop());

    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      d.y += d.speed;
      d.wobble += d.wobbleSpeed;
      const xOff = Math.sin(d.wobble) * d.size * 0.3;

      ctx.save();
      ctx.globalAlpha = d.alpha * opts.opacity;
      ctx.font = `${d.size}px serif`;
      ctx.fillStyle = d.color;
      if (opts.glow) { ctx.shadowColor = d.color; ctx.shadowBlur = d.size * 0.8; }
      ctx.translate(d.x + xOff, d.y);
      ctx.rotate(d.angle);
      ctx.fillText(d.symbol, 0, 0);
      ctx.restore();

      if (d.y > canvas.height + d.size * 2) drops.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
