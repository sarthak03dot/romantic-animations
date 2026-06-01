import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.15,
  colors: ['#c77dff', '#7b2cbf', '#e0aaff', '#9d4edd', '#ffffff'],
  minSize: 1,
  maxSize: 3,
  speed: 1.0,
  glow: true,
};

export function blackHole(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  
  const particles: any[] = [];
  const maxParticles = Math.round(opts.density * 500) + 100;
  
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const maxRadius = Math.max(canvas.width, canvas.height) * 0.7;

  function spawn() {
    const angle = Math.random() * Math.PI * 2;
    const r = maxRadius;
    return {
      angle,
      r,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      speed: (1 + Math.random() * 2) * opts.speed,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
    };
  }

  for (let i = 0; i < maxParticles; i++) {
    const p = spawn();
    p.r = Math.random() * maxRadius; // pre-populate scattered
    particles.push(p);
  }

  let time = 0;

  function animate() {
    if (!running) return;
    time++;
    
    // Draw semi-transparent black for motion blur trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Spiraling inward
      p.r -= p.speed * (1 + (maxRadius - p.r) / maxRadius);
      p.angle += 0.02 + (maxRadius - p.r) / maxRadius * 0.1 * opts.speed;

      if (p.r < 10) {
        // Reset to edge
        p.r = maxRadius;
        p.angle = Math.random() * Math.PI * 2;
      }

      const x = cx + Math.cos(p.angle) * p.r;
      const y = cy + Math.sin(p.angle) * p.r;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      
      if (opts.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
      }
      ctx.fill();
    }
    
    // Draw center event horizon
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#5a189a';
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
