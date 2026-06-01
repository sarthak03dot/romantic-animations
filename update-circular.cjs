const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the CSS for navbar
// Let's remove the old nav{} or .navbar{} CSS if it exists.
// I will just append the new CSS to the end of the <style> block.
const newCss = `
      /* Circular Scroll Nav Styles */
      .circular-nav-wrapper {
        position: relative;
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: 20px 0;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 20px;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        border: 1px solid rgba(255,255,255,0.05);
      }
      .sun-button {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle, #ffea00, #ff9100);
        box-shadow: 0 0 40px #ff9100, inset 0 0 20px rgba(255,255,255,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        color: #fff;
        font-weight: 900;
        font-size: 1.1rem;
        cursor: pointer;
        text-align: center;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        transition: transform 0.2s;
        user-select: none;
      }
      .sun-button:hover {
        transform: scale(1.1);
        box-shadow: 0 0 60px #ff9100, inset 0 0 20px rgba(255,255,255,0.8);
      }
      .circular-navbar {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none; /* Let wheel events pass to wrapper */
      }
      .circular-navbar .tab {
        position: absolute;
        top: 50%;
        left: 50%;
        pointer-events: auto; /* Buttons should be clickable */
        white-space: nowrap;
        background: rgba(20, 20, 30, 0.8);
        border: 1px solid rgba(255,255,255,0.1);
        padding: 10px 15px;
        border-radius: 30px;
        color: #ccc;
        font-weight: bold;
        transition: background 0.3s, color 0.3s;
        cursor: pointer;
      }
      .circular-navbar .tab:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      .circular-navbar .tab.active {
        background: var(--pink);
        color: #fff;
        border-color: #fff;
        box-shadow: 0 0 15px var(--pink);
      }
`;

html = html.replace(/(<\/style>)/, `${newCss}\n$1`);

// 2. Replace the HTML structure
// Find the <nav class="navbar"> ... </nav> block
// We will wrap it.
const oldNavMatch = html.match(/(<nav class="navbar">[\s\S]*?<\/nav>)/);
if (oldNavMatch) {
  let navHtml = oldNavMatch[1];
  // Replace <nav class="navbar"> with <div id="circular-navbar" class="circular-navbar">
  navHtml = navHtml.replace('<nav class="navbar">', '<div id="circular-navbar" class="circular-navbar">');
  navHtml = navHtml.replace('</nav>', '</div>');

  const wrapperHtml = `
          <div class="circular-nav-wrapper" id="circular-nav-wrapper">
            <div class="sun-button" onclick="togglePlay()" title="Click to Play/Pause">☀️<br>PLAY</div>
            ${navHtml}
          </div>
  `;
  html = html.replace(oldNavMatch[0], wrapperHtml);
}

// 3. Add the JS for circular scrolling
const jsCode = `
      // Circular Scroll Nav Logic
      document.addEventListener("DOMContentLoaded", () => {
        const wrapper = document.getElementById('circular-nav-wrapper');
        const navbar = document.getElementById('circular-navbar');
        if(!wrapper || !navbar) return;

        const tabs = Array.from(navbar.querySelectorAll('.tab'));
        const radius = 240; // distance from center
        const total = tabs.length;
        let currentRotation = 0;

        function updatePositions() {
          navbar.style.transform = \`rotate(\${currentRotation}deg)\`;
          tabs.forEach((tab, i) => {
            const baseAngle = (i / total) * 360;
            // Counter-rotate the individual tabs so text stays upright
            tab.style.transform = \`translate(-50%, -50%) rotate(\${baseAngle}deg) translate(\${radius}px) rotate(-\${baseAngle + currentRotation}deg)\`;
          });
        }

        updatePositions(); // Initial layout

        wrapper.addEventListener('wheel', (e) => {
          e.preventDefault();
          // Scroll up = negative delta, Scroll down = positive delta
          currentRotation += e.deltaY * 0.15;
          updatePositions();
        }, { passive: false });

        // Optional Drag Support
        let isDragging = false;
        let startY = 0;
        let startRotation = 0;

        wrapper.addEventListener('mousedown', (e) => {
          isDragging = true;
          startY = e.clientY;
          startRotation = currentRotation;
          wrapper.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
          isDragging = false;
          wrapper.style.cursor = 'default';
        });

        window.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          const deltaY = e.clientY - startY;
          currentRotation = startRotation - deltaY * 0.5;
          updatePositions();
        });
      });
`;

html = html.replace(/(<\/script>\s*<\/body>)/, `${jsCode}\n$1`);

// 4. In CSS, we should remove display: grid from .navbar if it existed in the previous step,
// actually the previous step modified .navbar? The user showed the horizontal scrolling navbar which is .navbar.
// We can just rely on the new .circular-nav-wrapper styling.

fs.writeFileSync('index.html', html);
console.log('Circular Scrollbar updated!');
