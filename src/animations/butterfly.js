import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.05,        // Spawn probability per frame
  colors: ['#c77dff', '#ff85a1', '#ffc2d1', '#48cae4', '#e7c6ff', '#fbb1bd'],
  minSize: 10,
  maxSize: 22,
  minSpeed: 0.8,
  maxSpeed: 2.2,
  glow: true,
};

export function butterflies(canvas, userOptions = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d');
  const items = [];
  let running = true;
  let time = 0;

  function spawn() {
    const size = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
    return {
      x: -size * 2,
      y: canvas.height * 0.1 + Math.random() * (canvas.height * 0.8),
      size,
      speed: opts.minSpeed + Math.random() * (opts.maxSpeed - opts.minSpeed),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)],
      alpha: 0,
      flapSpeed: 0.1 + Math.random() * 0.15,
      flapOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleOffset: Math.random() * Math.PI * 2,
    };
  }

  function animate() {
    if (!running) return;
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < opts.density) items.push(spawn());

    for (let i = items.length - 1; i >= 0; i--) {
      const b = items[i];
      b.x += b.speed;
      b.y += Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * 1.5;
      
      // Fade in smoothly
      if (b.alpha < 1 && b.x < canvas.width / 2) b.alpha += 0.02;
      
      // Flapping wing calculation
      const wingSpread = Math.abs(Math.sin(time * b.flapSpeed + b.flapOffset));

      ctx.save();
      ctx.globalAlpha = Math.min(1, b.alpha);
      ctx.translate(b.x, b.y);
      // Slight tilt upwards
      ctx.rotate(-0.1 - (wingSpread * 0.1));
      
      if (opts.glow) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.size * 1.5;
      }
      ctx.fillStyle = b.color;
      
      // Draw wings
      ctx.beginPath();
      // Left/back wing (narrower based on wingSpread)
      ctx.ellipse(-b.size * 0.2, 0, b.size * 0.4 * wingSpread, b.size * 0.5, 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      // Right/front wing
      ctx.ellipse(b.size * 0.3 * wingSpread, -b.size * 0.1, b.size * 0.5 * wingSpread, b.size * 0.6, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (b.x > canvas.width + b.size * 2) {
        items.splice(i, 1);
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
