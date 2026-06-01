import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.5,
  colors: ['#00ff9f', '#00b8ff', '#001eff', '#bd00ff', '#d600ff'],
  speed: 1.0,
  glow: true,
};

export function auroraBorealis(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  let time = 0;

  function animate() {
    if (!running) return;
    time += 0.01 * opts.speed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'screen';
    
    // Draw 3 layers of aurora
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      
      const yOffset = canvas.height * 0.3 + layer * 100;
      
      for (let x = 0; x <= canvas.width; x += 20) {
        // Multi-frequency wave function for organic fluid movement
        const wave1 = Math.sin(x * 0.005 + time * 2 + layer) * 50;
        const wave2 = Math.cos(x * 0.01 - time * 1.5) * 40;
        const wave3 = Math.sin(x * 0.002 + time) * 100;
        
        const y = yOffset + wave1 + wave2 + wave3;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Complete the shape downwards to fill it
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      // Create vertical gradient
      const grad = ctx.createLinearGradient(0, yOffset - 100, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      
      const c1 = opts.colors[(layer * 2) % opts.colors.length];
      const c2 = opts.colors[(layer * 2 + 1) % opts.colors.length];
      
      grad.addColorStop(0.2, c1);
      grad.addColorStop(0.8, c2);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      
      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.3 * opts.density * 2;
      ctx.fill();
    }
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
