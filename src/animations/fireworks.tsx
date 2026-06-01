import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  interval: 1200,       // ms between auto-launches
  trailLength: 28,
  particleCount: 80,
  colors: ['#ff6b8a','#ff4d6d','#ffd6ff','#e7c6ff','#ffe66d','#06d6a0','#48cae4','#ffffff'],
  gravity: 0.09,
  decay: 0.014,
  glow: true,
};

export function fireworks(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;

  const rockets: any[] = [];    // { x, y, vx, vy, trail[], color }
  const particles: any[] = [];  // burst particles

  function launchRocket() {
    const x = canvas.width * (0.2 + Math.random() * 0.6);
    const targetY = canvas.height * (0.1 + Math.random() * 0.4);
    const speed = 8 + Math.random() * 5;
    const color = opts.colors[Math.floor(Math.random() * opts.colors.length)];
    rockets.push({ x, y: canvas.height, vy: -Math.abs(speed), targetY, trail: [], color });
  }

  function burst(x: number, y: number, color: string) {
    for (let i = 0; i < opts.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: opts.decay * (0.7 + Math.random() * 0.6),
        size: 2 + Math.random() * 3,
        color,
      });
    }
  }

  // Auto-launch interval
  const iv = setInterval(() => { if (running) launchRocket(); }, opts.interval);
  launchRocket(); // fire one immediately

  function animate() {
    if (!running) return;

    // Clear canvas instead of using a solid fill to keep background transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy;
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > opts.trailLength) r.trail.shift();

      // Draw trail
      for (let t = 0; t < r.trail.length; t++) {
        const alpha = (t / r.trail.length) * 0.8;
        ctx.save();
        ctx.globalAlpha = alpha;
        if (opts.glow) { ctx.shadowColor = r.color; ctx.shadowBlur = 6; }
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.trail[t].x, r.trail[t].y, 2.5 * (t / r.trail.length), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (r.y <= r.targetY) {
        burst(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    }

    // Draw burst particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += opts.gravity;
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      if (opts.glow) { ctx.shadowColor = p.color; ctx.shadowBlur = p.size * 2; }
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (p.alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    clearInterval(iv);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
