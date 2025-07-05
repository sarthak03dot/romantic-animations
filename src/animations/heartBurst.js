export function heartBurst(canvas) {
    const ctx = canvas.getContext("2d");
    const bursts = [];
  
    function createHeart(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      return {
        x,
        y,
        size: 10 + Math.random() * 5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.02
      };
    }
  
    function drawHeart(h) {
      ctx.fillStyle = `rgba(255, 20, 147, ${h.alpha})`;
      ctx.beginPath();
      ctx.moveTo(h.x, h.y);
      ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size, h.x + h.size, h.y + h.size / 3, h.x, h.y + h.size);
      ctx.bezierCurveTo(h.x - h.size, h.y + h.size / 3, h.x - h.size / 2, h.y - h.size, h.x, h.y);
      ctx.fill();
    }
  
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const burst = [];
      for (let i = 0; i < 20; i++) {
        burst.push(createHeart(e.clientX - rect.left, e.clientY - rect.top));
      }
      bursts.push(burst);
    });
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        for (let i = burst.length - 1; i >= 0; i--) {
          const h = burst[i];
          h.x += h.vx;
          h.y += h.vy;
          h.alpha -= h.decay;
          drawHeart(h);
          if (h.alpha <= 0) burst.splice(i, 1);
        }
        if (burst.length === 0) bursts.splice(b, 1);
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  