import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.08,
  colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'],
  minSize: 15,
  maxSize: 30,
  minSpeed: 0.8,
  maxSpeed: 2.0,
  glow: true,
};

export function rosePetals(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const petals: any[] = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: -size * 2,
      size,
      speedY: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      speedX: (Math.random() - 0.5) * 1.5,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      flipSpeed: 0.02 + Math.random() * 0.04,
      flipPhase: Math.random() * Math.PI * 2,
    };
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) petals.push(spawn());

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(time * 0.02 + p.flipPhase) * 0.5;
      p.rotation += p.rotationSpeed;
      
      const flip = Math.sin(time * p.flipSpeed + p.flipPhase);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.abs(flip)); // 3D flip effect

      if (opts.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size;
      }
      ctx.fillStyle = p.color;
      
      // Draw petal shape
      ctx.beginPath();
      ctx.moveTo(0, p.size * -0.5);
      ctx.bezierCurveTo(p.size * 0.5, p.size * -0.5, p.size * 0.8, p.size * 0.2, 0, p.size * 0.5);
      ctx.bezierCurveTo(p.size * -0.8, p.size * 0.2, p.size * -0.5, p.size * -0.5, 0, p.size * -0.5);
      ctx.fill();
      ctx.restore();

      if (p.y > canvas.height + p.size * 2) {
        petals.splice(i, 1);
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
