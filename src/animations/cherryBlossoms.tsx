import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.15,
  colors: ['#ffb7b2', '#ffdac1', '#e2f0cb', '#ff9aa2'],
  minSize: 8,
  maxSize: 18,
  speed: 1.5,
  wind: 2.0,
  glow: false,
};

export function cherryBlossoms(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const petals: any[] = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * (canvas.width + 200) - 100,
      y: -size * 2,
      size,
      speedY: (1 + Math.random()) * opts.speed,
      speedX: (Math.random() - 0.5) + opts.wind,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.05 + Math.random() * 0.05,
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
      p.x += p.speedX + Math.sin(time * 0.05 + p.flip) * 1.5;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      const scaleY = Math.abs(Math.sin(p.flip));

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, scaleY);

      if (opts.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size;
      }
      ctx.fillStyle = p.color;
      
      // Draw sakura petal shape
      ctx.beginPath();
      ctx.moveTo(0, p.size * -0.5);
      ctx.bezierCurveTo(p.size * 0.6, p.size * -0.8, p.size * 0.8, p.size * 0.4, 0, p.size * 0.6);
      ctx.bezierCurveTo(p.size * -0.8, p.size * 0.4, p.size * -0.6, p.size * -0.8, 0, p.size * -0.5);
      // Small indent at top
      ctx.lineTo(0, p.size * -0.3);
      ctx.fill();
      
      ctx.restore();

      if (p.y > canvas.height + p.size * 2 || p.x > canvas.width + p.size * 2) {
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
