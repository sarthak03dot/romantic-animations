import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.2, // controls number of flakes
  colors: ['#ffffff', '#e0f7fa'],
  minSize: 1,
  maxSize: 4,
  speed: 1.0,
  wind: 0.5,
  glow: false,
};

export function snowStorm(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  const numFlakes = Math.round(opts.density * 500) + 50;
  const flakes: any[] = [];

  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height, // pre-populate screen
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      speedY: (0.5 + Math.random() * 1.5) * opts.speed,
      speedX: opts.wind + (Math.random() - 0.5) * 0.5,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
    });
  }

  let time = 0;

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.speedY;
      f.x += f.speedX + Math.sin(time * f.swaySpeed + f.swayPhase) * 0.5;

      // Wrap around
      if (f.y > canvas.height + f.size) {
        f.y = -f.size;
        f.x = Math.random() * canvas.width;
      }
      if (f.x > canvas.width + f.size) f.x = -f.size;
      else if (f.x < -f.size) f.x = canvas.width + f.size;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      if (opts.glow) {
        ctx.shadowColor = f.color;
        ctx.shadowBlur = f.size * 2;
      }
      ctx.globalAlpha = 0.8;
      ctx.fill();
    }
    
    ctx.globalAlpha = 1.0;
    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
