export function heartTrail(canvas) {
    const ctx = canvas.getContext("2d");
    const hearts = [];
  
    function createHeart(x, y) {
      return {
        x,
        y,
        size: 8 + Math.random() * 5,
        alpha: 1,
        decay: 0.02
      };
    }
  
    function drawHeart(h) {
      ctx.fillStyle = `rgba(255, 105, 180, ${h.alpha})`;
      ctx.beginPath();
      ctx.moveTo(h.x, h.y);
      ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size, h.x + h.size, h.y + h.size / 3, h.x, h.y + h.size);
      ctx.bezierCurveTo(h.x - h.size, h.y + h.size / 3, h.x - h.size / 2, h.y - h.size, h.x, h.y);
      ctx.fill();
    }
  
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      hearts.push(createHeart(e.clientX - rect.left, e.clientY - rect.top));
    });
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        drawHeart(hearts[i]);
        hearts[i].alpha -= hearts[i].decay;
        if (hearts[i].alpha <= 0) hearts.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  