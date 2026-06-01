import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.1, // fraction of columns
  colors: ['#0f0', '#00ff41'],
  minSize: 14, // font size
  maxSize: 22,
  speed: 1.0,
  glow: true,
};

export function matrixRain(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  
  const fontSize = (opts.minSize + opts.maxSize) / 2;
  const columns = Math.floor(canvas.width / fontSize);
  const drops: number[] = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';

  for (let i = 0; i < columns; i++) {
    // initialize drops randomly above screen
    drops[i] = Math.random() * -100;
  }

  function animate() {
    if (!running) return;
    
    // Slight trail effect by painting black with low opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      // Only render density% of columns
      if (Math.random() > opts.density && drops[i] < 0) continue;

      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      const color = opts.colors[Math.floor(Math.random() * opts.colors.length)];
      
      ctx.fillStyle = color;
      if (opts.glow) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i] += opts.speed * 0.5;
    }
    
    // Matrix rain shouldn't run every frame to look authentic (60fps is too fast)
    setTimeout(() => {
      if (running) requestAnimationFrame(animate);
    }, 50);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
