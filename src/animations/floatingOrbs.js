import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  orbCount: 15,
  minSize: 50,
  maxSize: 150,
  colors: ['#ff4d6d', '#c77dff', '#48cae4', '#ffe66d'],
  speed: 0.5,
  glow: true,
};

export function floatingOrbs(canvas, userOptions = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d');
  const orbs = [];
  let running = true;

  function createOrb() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size,
      vx: (Math.random() - 0.5) * opts.speed,
      vy: (Math.random() - 0.5) * opts.speed,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      alpha: 0,
    };
  }

  for (let i = 0; i < opts.orbCount; i++) {
    const orb = createOrb();
    orb.alpha = Math.random() * 0.5 + 0.1;
    orbs.push(orb);
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < orbs.length; i++) {
      const b = orbs[i];
      b.x += b.vx;
      b.y += b.vy;

      // Bounce off walls
      if (b.x < -b.size) b.x = canvas.width + b.size;
      if (b.x > canvas.width + b.size) b.x = -b.size;
      if (b.y < -b.size) b.y = canvas.height + b.size;
      if (b.y > canvas.height + b.size) b.y = -b.size;

      ctx.save();
      ctx.globalAlpha = b.alpha;
      ctx.globalCompositeOperation = 'screen';
      
      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.size);
      gradient.addColorStop(0, b.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = gradient;
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
