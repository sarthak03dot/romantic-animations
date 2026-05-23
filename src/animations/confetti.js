import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.18,
  colors: ['#ff6b8a','#ff4d6d','#ffd6ff','#e7c6ff','#c77dff','#48cae4','#ffe66d','#06d6a0'],
  minSize: 6,
  maxSize: 14,
  minSpeed: 1.5,
  maxSpeed: 4,
  gravity: 0.06,
  drag: 0.99,
  shapes: ['rect', 'circle', 'ribbon'],
};

export function confetti(canvas, userOptions = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d');
  const pieces = [];
  let running = true;

  function createPiece() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    const speed = opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed);
    return {
      x: Math.random() * canvas.width,
      y: -size * 2,
      w: size,
      h: size * (0.4 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 3,
      vy: speed,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      alpha: 0.8 + Math.random() * 0.2,
      shape: opts.shapes[Math.floor(Math.random() * opts.shapes.length)],
    };
  }

  function drawPiece(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.strokeStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'ribbon') {
      ctx.beginPath();
      ctx.moveTo(-p.w / 2, 0);
      ctx.quadraticCurveTo(0, -p.h, p.w / 2, 0);
      ctx.quadraticCurveTo(0, p.h, -p.w / 2, 0);
      ctx.fill();
    } else {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  }

  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) pieces.push(createPiece());

    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.vy += opts.gravity;
      p.vx *= opts.drag;
      p.vy *= opts.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      drawPiece(p);

      if (p.y > canvas.height + 20) pieces.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
