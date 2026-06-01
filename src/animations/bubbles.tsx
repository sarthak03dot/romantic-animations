import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.05,
  colors: ['rgba(255,255,255,0.4)', 'rgba(230,240,255,0.5)', 'rgba(255,230,250,0.5)'],
  minSize: 10,
  maxSize: 35,
  speed: 1.0,
  glow: false,
};

export function bubbles(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const arr: any[] = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + size * 2,
      size,
      speedY: (0.5 + Math.random()) * opts.speed,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobblePhase: Math.random() * Math.PI * 2,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      highlightPhase: Math.random() * Math.PI * 2,
    };
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) arr.push(spawn());

    for (let i = arr.length - 1; i >= 0; i--) {
      const b = arr[i];
      b.y -= b.speedY; // float up
      
      const wobbleX = Math.sin(time * b.wobbleSpeed + b.wobblePhase) * (b.size * 0.3);
      const wobbleY = Math.cos(time * b.wobbleSpeed * 1.5 + b.wobblePhase) * (b.size * 0.1);

      ctx.save();
      ctx.translate(b.x + wobbleX, b.y + wobbleY);

      if (opts.glow) {
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = b.size * 0.5;
      }
      
      // Main bubble body
      ctx.beginPath();
      ctx.arc(0, 0, b.size, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Iridescent highlight
      const hX = -b.size * 0.3;
      const hY = -b.size * 0.3;
      ctx.beginPath();
      ctx.ellipse(hX, hY, b.size * 0.4, b.size * 0.2, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time * 0.05 + b.highlightPhase) * 0.2})`;
      ctx.fill();
      
      // Bottom highlight reflection
      ctx.beginPath();
      ctx.arc(b.size * 0.4, b.size * 0.4, b.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();

      ctx.restore();

      if (b.y < -b.size * 3) {
        arr.splice(i, 1);
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
