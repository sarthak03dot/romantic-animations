import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.02,
  minSpeed: 10,
  maxSpeed: 25,
  colors: ['#ffffff', '#e7c6ff', '#48cae4', '#ffe66d'],
  glow: true,
};

export function shootingStars(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const stars: any[] = [];
  let running = true;

  function createStar() {
    return {
      x: Math.random() * canvas.width * 1.5,
      y: -50,
      length: 50 + Math.random() * 100,
      thickness: 1 + Math.random() * 2,
      speed: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // Roughly 45 degrees
      opacity: 1,
    };
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) {
      stars.push(createStar());
    }

    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      const vx = -Math.cos(s.angle) * s.speed;
      const vy = Math.sin(s.angle) * s.speed;
      
      s.x += vx;
      s.y += vy;
      s.opacity -= 0.01;

      ctx.save();
      ctx.globalAlpha = Math.max(0, s.opacity);
      if (opts.glow) {
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.thickness * 4;
      }
      
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - vx * (s.length / s.speed), s.y - vy * (s.length / s.speed));
      grad.addColorStop(0, s.color);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.thickness;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - vx * (s.length / s.speed), s.y - vy * (s.length / s.speed));
      ctx.stroke();
      ctx.restore();

      if (s.opacity <= 0 || s.x < -100 || s.y > canvas.height + 100) {
        stars.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
