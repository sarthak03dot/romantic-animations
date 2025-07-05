export function initCanvas(containerId) {
    const container = document.getElementById(containerId);
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    return canvas;
  }
  