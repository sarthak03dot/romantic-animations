import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  particleCount: 150,
  minSize: 1,
  maxSize: 4,
  colors: ['#ffd6ff', '#e7c6ff', '#c77dff', '#ffb3c1', '#ffffff'],
  speed: 0.8,
  glow: true,
};

export function magicDust(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const dusts: any[] = [];
  let running = true;
  let time = 0;

  function createDust() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      angle: Math.random() * Math.PI * 2,
      orbitRadius: 20 + Math.random() * 80,
      orbitSpeed: (0.01 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1),
      centerX: Math.random() * canvas.width,
      centerY: canvas.height + 50, // Start below and move up
      upwardSpeed: opts.speed + Math.random() * 1.5,
      alpha: 0,
    };
  }

  for (let i = 0; i < opts.particleCount; i++) {
    dusts.push(createDust());
    // Scatter initial positions so they aren't all at the bottom
    dusts[i].centerY = Math.random() * canvas.height;
    dusts[i].alpha = Math.random();
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dusts.length; i++) {
      const d = dusts[i];
      d.angle += d.orbitSpeed;
      d.centerY -= d.upwardSpeed;

      // Swirling calculation
      d.x = d.centerX + Math.cos(d.angle) * d.orbitRadius + Math.sin(time * 0.01 + d.angle) * 30;
      d.y = d.centerY + Math.sin(d.angle) * (d.orbitRadius * 0.5);

      if (d.alpha < 1 && d.centerY > 0) d.alpha += 0.01;

      // Reset when they reach top
      if (d.y < -50) {
        Object.assign(d, createDust());
        d.centerY = canvas.height + 50;
        d.centerX = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.globalAlpha = d.alpha;
      if (opts.glow) {
        ctx.shadowColor = d.color;
        ctx.shadowBlur = d.size * 3;
      }
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
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
