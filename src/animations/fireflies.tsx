import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.05,
  colors: ['#e9ff70', '#d4ff00', '#f9f871'],
  minSize: 2,
  maxSize: 6,
  speed: 1.0,
  glow: true,
};

export function fireflies(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  const numBugs = Math.round(opts.density * 200) + 20;
  const bugs: any[] = [];

  for (let i = 0; i < numBugs; i++) {
    bugs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * opts.speed,
      vy: (Math.random() - 0.5) * opts.speed,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      blinkPhase: Math.random() * Math.PI * 2,
      blinkSpeed: 0.02 + Math.random() * 0.03,
      roamPhase: Math.random() * Math.PI * 2,
    });
  }

  let time = 0;

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bugs.length; i++) {
      const b = bugs[i];
      
      // Organic wandering
      b.vx += Math.sin(time * 0.01 + b.roamPhase) * 0.05;
      b.vy += Math.cos(time * 0.015 + b.roamPhase) * 0.05;
      
      // Speed limit
      const speedLimit = opts.speed * 2;
      b.vx = Math.max(-speedLimit, Math.min(speedLimit, b.vx));
      b.vy = Math.max(-speedLimit, Math.min(speedLimit, b.vy));

      b.x += b.vx;
      b.y += b.vy;

      // Wrap around edges
      if (b.x < -20) b.x = canvas.width + 20;
      if (b.x > canvas.width + 20) b.x = -20;
      if (b.y < -20) b.y = canvas.height + 20;
      if (b.y > canvas.height + 20) b.y = -20;

      const opacity = (Math.sin(time * b.blinkSpeed + b.blinkPhase) + 1) / 2; // 0 to 1

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = b.color;
      if (opts.glow) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.size * 3;
      }
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
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
