import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.1, // controls flare sizes
  colors: ['rgba(255, 230, 200, 0.8)', 'rgba(200, 220, 255, 0.6)'],
  speed: 1.0,
  glow: true,
};

export function lensFlares(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  let time = 0;

  // Flare parameters
  const mainFlare = { x: canvas.width * 0.2, y: canvas.height * 0.2 };
  
  // Ghost reflections along the line through center
  const ghosts = [
    { scale: 0.5, dist: 0.2, color: 'rgba(0, 255, 100, 0.1)' },
    { scale: 1.2, dist: -0.4, color: 'rgba(200, 100, 255, 0.15)' },
    { scale: 0.3, dist: 0.8, color: 'rgba(255, 255, 255, 0.2)' },
    { scale: 0.8, dist: -1.2, color: 'rgba(100, 200, 255, 0.1)' },
    { scale: 2.0, dist: 1.5, color: 'rgba(255, 100, 50, 0.05)' },
    { scale: 0.1, dist: 1.1, color: 'rgba(255, 255, 255, 0.4)' },
  ];

  function animate() {
    if (!running) return;
    time += 0.01 * opts.speed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'screen';
    
    // Move main flare organically
    mainFlare.x = canvas.width / 2 + Math.cos(time * 0.5) * (canvas.width * 0.4);
    mainFlare.y = canvas.height / 2 + Math.sin(time * 0.3) * (canvas.height * 0.4);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Draw main bright flare
    const mainGrad = ctx.createRadialGradient(mainFlare.x, mainFlare.y, 0, mainFlare.x, mainFlare.y, 200 * opts.density * 10);
    mainGrad.addColorStop(0, '#ffffff');
    mainGrad.addColorStop(0.1, opts.colors[0]);
    mainGrad.addColorStop(1, 'rgba(0,0,0,0)');
    
    ctx.beginPath();
    ctx.arc(mainFlare.x, mainFlare.y, 1000, 0, Math.PI * 2);
    ctx.fillStyle = mainGrad;
    ctx.fill();

    // Draw anamorphic horizontal streak
    ctx.beginPath();
    ctx.ellipse(mainFlare.x, mainFlare.y, canvas.width, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = opts.colors[1];
    ctx.fill();

    // Draw ghosts along the axis through center
    const dx = cx - mainFlare.x;
    const dy = cy - mainFlare.y;

    for (const g of ghosts) {
      const gx = cx + dx * g.dist;
      const gy = cy + dy * g.dist;
      const size = 100 * g.scale * opts.density * 10;
      
      ctx.beginPath();
      ctx.arc(gx, gy, size, 0, Math.PI * 2);
      ctx.fillStyle = g.color;
      ctx.fill();
      
      // Add rings to some ghosts
      if (g.scale > 0.5) {
        ctx.beginPath();
        ctx.arc(gx, gy, size * 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = g.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
