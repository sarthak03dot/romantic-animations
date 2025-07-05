export function floatingHearts(canvas) {
    const ctx = canvas.getContext("2d");
    const hearts = [];
  
    function createHeart() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 20 + Math.random() * 10,
        speed: 1 + Math.random() * 2,
      };
    }
  
    function drawHeart(h) {
      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.moveTo(h.x, h.y);
      ctx.bezierCurveTo(h.x + h.size / 2, h.y - h.size, h.x + h.size, h.y + h.size / 3, h.x, h.y + h.size);
      ctx.bezierCurveTo(h.x - h.size, h.y + h.size / 3, h.x - h.size / 2, h.y - h.size, h.x, h.y);
      ctx.fill();
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.1) hearts.push(createHeart());
      for (let i = 0; i < hearts.length; i++) {
        hearts[i].y -= hearts[i].speed;
        drawHeart(hearts[i]);
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  