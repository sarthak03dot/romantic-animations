import { mergeOptions } from '../core/engine.js';

const DEFAULTS = {
  density: 0.1, // controls number of nodes
  colors: ['#00f0ff', '#00b4d8', '#90e0ef'],
  speed: 1.0,
  minSize: 1,
  maxSize: 3,
  glow: true,
};

export function globeMovement(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {
  const opts = mergeOptions(DEFAULTS, userOptions);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  let running = true;
  let time = 0;
  
  const nodes: any[] = [];
  const numNodes = Math.round(opts.density * 300) + 50;
  const radius = Math.min(canvas.width, canvas.height) * 0.4;
  
  // Distribute nodes evenly on a sphere using Fibonacci spiral
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < numNodes; i++) {
    const y = 1 - (i / (numNodes - 1)) * 2; 
    const radiusAtY = Math.sqrt(1 - y * y); 
    const theta = phi * i; 

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    nodes.push({
      x, y, z,
      baseX: x, baseY: y, baseZ: z,
      size: opts.minSize + Math.random() * (opts.maxSize - opts.minSize),
      color: opts.colors[Math.floor(Math.random() * opts.colors.length)]
    });
  }

  function animate() {
    if (!running) return;
    time += 0.01 * opts.speed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Rotation matrices
    const cosT = Math.cos(time);
    const sinT = Math.sin(time);
    
    // Tilt the globe slightly
    const tilt = 0.4;
    const cosTilt = Math.cos(tilt);
    const sinTilt = Math.sin(tilt);

    // Project and draw
    const projectedNodes = [];
    
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      
      // Rotate around Y axis
      let rx = n.baseX * cosT - n.baseZ * sinT;
      let rz = n.baseZ * cosT + n.baseX * sinT;
      let ry = n.baseY;
      
      // Tilt around X axis
      let fx = rx;
      let fy = ry * cosTilt - rz * sinTilt;
      let fz = rz * cosTilt + ry * sinTilt;
      
      projectedNodes.push({
        x: cx + fx * radius,
        y: cy + fy * radius,
        z: fz,
        orig: n
      });
    }
    
    // Sort by Z index for proper 3D rendering (back to front)
    projectedNodes.sort((a, b) => a.z - b.z);
    
    for (let i = 0; i < projectedNodes.length; i++) {
      const p = projectedNodes[i];
      
      // Depth fading
      const alpha = Math.max(0.1, (p.z + 1) / 2);
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.orig.size * alpha, 0, Math.PI * 2);
      ctx.fillStyle = p.orig.color;
      ctx.globalAlpha = alpha;
      
      if (opts.glow) {
        ctx.shadowBlur = 10 * alpha;
        ctx.shadowColor = p.orig.color;
      }
      ctx.fill();
    }
    
    // Draw lines between close nodes in the front hemisphere
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
    
    for (let i = 0; i < projectedNodes.length; i++) {
      const p1 = projectedNodes[i];
      if (p1.z < 0) continue; // Only draw lines for front-facing nodes
      
      for (let j = i + 1; j < projectedNodes.length; j++) {
        const p2 = projectedNodes[j];
        if (p2.z < 0) continue;
        
        const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z * radius - p2.z * radius) ** 2;
        
        if (distSq < (radius * 0.4) ** 2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.orig.color;
          ctx.stroke();
        }
      }
    }
    
    ctx.globalAlpha = 1.0;
    
    requestAnimationFrame(animate);
  }

  animate();

  return function stop() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
