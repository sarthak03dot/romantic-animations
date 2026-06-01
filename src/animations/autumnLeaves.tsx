import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.1,
  colors: ['#e76f51', '#f4a261', '#e9c46a', '#d62828'],
  minSize: 10,
  maxSize: 25,
  speed: 1.5,
  glow: false,
};

export function autumnLeaves(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const leaves: any[] = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * (canvas.width + 200) - 100,
      y: -size * 2,
      size,
      speedY: (0.8 + Math.random() * 1.5) * opts.speed,
      speedX: (Math.random() - 0.5) * 2,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      flipPhase: Math.random() * Math.PI * 2,
      flipSpeed: 0.05 + Math.random() * 0.05,
    };
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) leaves.push(spawn());

    for (let i = leaves.length - 1; i >= 0; i--) {
      const l = leaves[i];
      l.y += l.speedY;
      l.x += l.speedX + Math.sin(time * 0.03 + l.flipPhase) * 2;
      l.rotation += l.rotationSpeed;
      
      const flip = Math.sin(time * l.flipSpeed + l.flipPhase);

      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rotation);
      ctx.scale(1, Math.max(0.1, Math.abs(flip)));

      if (opts.glow) {
        ctx.shadowColor = l.color;
        ctx.shadowBlur = l.size * 0.5;
      }
      ctx.fillStyle = l.color;
      
      // Draw leaf shape
      ctx.beginPath();
      ctx.moveTo(0, l.size * -0.6);
      ctx.bezierCurveTo(l.size * 0.5, l.size * -0.5, l.size * 0.6, l.size * 0.2, 0, l.size * 0.6);
      ctx.bezierCurveTo(l.size * -0.6, l.size * 0.2, l.size * -0.5, l.size * -0.5, 0, l.size * -0.6);
      ctx.fill();

      // Draw leaf stem
      ctx.beginPath();
      ctx.moveTo(0, l.size * 0.5);
      ctx.lineTo(0, l.size * 0.8);
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = Math.max(1, l.size * 0.05);
      ctx.stroke();

      ctx.restore();

      if (l.y > canvas.height + l.size * 2 || l.x > canvas.width + l.size * 2) {
        leaves.splice(i, 1);
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
