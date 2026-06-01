import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.02,
  colors: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c', '#ff9f1c'],
  minSize: 30,
  maxSize: 60,
  minSpeed: 0.5,
  maxSpeed: 1.5,
  glow: false,
};

export function floatingBalloons(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const balloons: any[] = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + size * 3,
      size,
      speedY: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      swaySpeed: 0.01 + Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
    };
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) balloons.push(spawn());

    for (let i = balloons.length - 1; i >= 0; i--) {
      const b = balloons[i];
      b.y -= b.speedY; // rise up
      
      const sway = Math.sin(time * b.swaySpeed + b.swayOffset) * (b.size * 0.5);

      ctx.save();
      ctx.translate(b.x + sway, b.y);

      if (opts.glow) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.size * 0.5;
      }
      
      // Draw balloon string
      ctx.beginPath();
      ctx.moveTo(0, b.size);
      ctx.bezierCurveTo(b.size * 0.2, b.size * 1.5, b.size * -0.2, b.size * 2, 0, b.size * 3);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw balloon knot
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.moveTo(-b.size * 0.1, b.size * 1.1);
      ctx.lineTo(b.size * 0.1, b.size * 1.1);
      ctx.lineTo(0, b.size * 0.95);
      ctx.fill();

      // Draw balloon body
      ctx.beginPath();
      // Ellipse for balloon shape (wider at top, narrower at bottom)
      ctx.moveTo(0, b.size);
      ctx.bezierCurveTo(b.size * 1.1, b.size * 0.8, b.size * 1.1, -b.size, 0, -b.size);
      ctx.bezierCurveTo(-b.size * 1.1, -b.size, -b.size * 1.1, b.size * 0.8, 0, b.size);
      ctx.fill();

      // Draw highlight
      ctx.beginPath();
      ctx.ellipse(-b.size * 0.3, -b.size * 0.4, b.size * 0.1, b.size * 0.2, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();

      ctx.restore();

      if (b.y < -b.size * 4) {
        balloons.splice(i, 1);
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
