const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Sidebar Tabs
const newTabs = `            <button id="tab-startGlobeMovement" class="tab" onclick="switchEffect('startGlobeMovement')">🌐 Globe</button>
            <button id="tab-startCherryBlossoms" class="tab" onclick="switchEffect('startCherryBlossoms')">🌸 Sakura</button>
            <button id="tab-startFireflies" class="tab" onclick="switchEffect('startFireflies')">🐛 Fireflies</button>
            <button id="tab-startSnowStorm" class="tab" onclick="switchEffect('startSnowStorm')">❄️ Snow Storm</button>
            <button id="tab-startMatrixRain" class="tab" onclick="switchEffect('startMatrixRain')">💻 Matrix</button>
            <button id="tab-startAutumnLeaves" class="tab" onclick="switchEffect('startAutumnLeaves')">🍂 Autumn</button>
            <button id="tab-startBubbles" class="tab" onclick="switchEffect('startBubbles')">🫧 Bubbles</button>
            <button id="tab-startBlackHole" class="tab" onclick="switchEffect('startBlackHole')">🕳️ Black Hole</button>
            <button id="tab-startAuroraBorealis" class="tab" onclick="switchEffect('startAuroraBorealis')">🌌 Aurora</button>
            <button id="tab-startLensFlares" class="tab" onclick="switchEffect('startLensFlares')">✨ Flares</button>`;

html = html.replace(
  /(\s*<button\s+id="tab-startFloatingBalloons"[\s\S]*?<\/button>)/,
  `$1\n${newTabs}`
);

// 2. Docs Nav
const newDocsNav = `
                <li class="docs-sidebar-item" data-page-id="api-globe-movement" onclick="showDocPage('api-globe-movement', 'API Reference', 'startGlobeMovement')">startGlobeMovement</li>
                <li class="docs-sidebar-item" data-page-id="api-cherry-blossoms" onclick="showDocPage('api-cherry-blossoms', 'API Reference', 'startCherryBlossoms')">startCherryBlossoms</li>
                <li class="docs-sidebar-item" data-page-id="api-fireflies" onclick="showDocPage('api-fireflies', 'API Reference', 'startFireflies')">startFireflies</li>
                <li class="docs-sidebar-item" data-page-id="api-snow-storm" onclick="showDocPage('api-snow-storm', 'API Reference', 'startSnowStorm')">startSnowStorm</li>
                <li class="docs-sidebar-item" data-page-id="api-matrix-rain" onclick="showDocPage('api-matrix-rain', 'API Reference', 'startMatrixRain')">startMatrixRain</li>
                <li class="docs-sidebar-item" data-page-id="api-autumn-leaves" onclick="showDocPage('api-autumn-leaves', 'API Reference', 'startAutumnLeaves')">startAutumnLeaves</li>
                <li class="docs-sidebar-item" data-page-id="api-bubbles" onclick="showDocPage('api-bubbles', 'API Reference', 'startBubbles')">startBubbles</li>
                <li class="docs-sidebar-item" data-page-id="api-black-hole" onclick="showDocPage('api-black-hole', 'API Reference', 'startBlackHole')">startBlackHole</li>
                <li class="docs-sidebar-item" data-page-id="api-aurora" onclick="showDocPage('api-aurora', 'API Reference', 'startAuroraBorealis')">startAuroraBorealis</li>
                <li class="docs-sidebar-item" data-page-id="api-lens-flares" onclick="showDocPage('api-lens-flares', 'API Reference', 'startLensFlares')">startLensFlares</li>`;

html = html.replace(
  /(\s*<li[\s\S]*?startFloatingBalloons[\s\S]*?<\/li>)/,
  `$1\n${newDocsNav}`
);

// 3. activeEffectTitleMap
const newTitles = `
          startGlobeMovement: "Globe Movement",
          startCherryBlossoms: "Cherry Blossoms",
          startFireflies: "Fireflies",
          startSnowStorm: "Snow Storm",
          startMatrixRain: "Matrix Rain",
          startAutumnLeaves: "Autumn Leaves",
          startBubbles: "Soap Bubbles",
          startBlackHole: "Cosmic Black Hole",
          startAuroraBorealis: "Aurora Borealis",
          startLensFlares: "Cinematic Flares",`;

html = html.replace(
  /(\s*startFloatingBalloons:\s*"Floating Balloons",)/,
  `$1${newTitles}`
);

// 4. Params Update
const newParams = ` else if (window.activeEffect === 'startGlobeMovement') {
          opt.density = density * 0.1;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startCherryBlossoms') {
          opt.density = density * 0.15;
          opt.speed = speedVal * 1.5;
        } else if (window.activeEffect === 'startFireflies') {
          opt.density = density * 0.05;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startSnowStorm') {
          opt.density = density * 0.2;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startMatrixRain') {
          opt.density = density * 0.1;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startAutumnLeaves') {
          opt.density = density * 0.1;
          opt.speed = speedVal * 1.5;
        } else if (window.activeEffect === 'startBubbles') {
          opt.density = density * 0.05;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startBlackHole') {
          opt.density = density * 0.15;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startAuroraBorealis') {
          opt.density = density * 0.5;
          opt.speed = speedVal * 1.0;
        } else if (window.activeEffect === 'startLensFlares') {
          opt.density = density * 0.1;
          opt.speed = speedVal * 1.0;
        }`;

html = html.replace(
  /(\s*\} else if \(window\.activeEffect === "startFloatingBalloons"\) \{[\s\S]*?\})/,
  `$1${newParams}`
);

// 5. Options Array
const newOptionsArr = `
        { id: "api-globe-movement", category: "API Reference", label: "startGlobeMovement" },
        { id: "api-cherry-blossoms", category: "API Reference", label: "startCherryBlossoms" },
        { id: "api-fireflies", category: "API Reference", label: "startFireflies" },
        { id: "api-snow-storm", category: "API Reference", label: "startSnowStorm" },
        { id: "api-matrix-rain", category: "API Reference", label: "startMatrixRain" },
        { id: "api-autumn-leaves", category: "API Reference", label: "startAutumnLeaves" },
        { id: "api-bubbles", category: "API Reference", label: "startBubbles" },
        { id: "api-black-hole", category: "API Reference", label: "startBlackHole" },
        { id: "api-aurora", category: "API Reference", label: "startAuroraBorealis" },
        { id: "api-lens-flares", category: "API Reference", label: "startLensFlares" },`;

html = html.replace(
  /(\{\s*id:\s*"api-floating-balloons"[\s\S]*?\})/,
  `$1,${newOptionsArr}`
);

// 6. Docs Pages
const newDocPages = `
            <div class="doc-page" id="doc-page-api-globe-movement">
              <h3>🌐 startGlobeMovement</h3><p>3D Math projected particle globe</p>
              <div class="docs-code-container">startGlobeMovement(container, { density: 0.1 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-cherry-blossoms">
              <h3>🌸 startCherryBlossoms</h3><p>Sakura petals falling with wind</p>
              <div class="docs-code-container">startCherryBlossoms(container, { density: 0.15 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-fireflies">
              <h3>🐛 startFireflies</h3><p>Organically wandering glowing orbs</p>
              <div class="docs-code-container">startFireflies(container, { density: 0.05 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-snow-storm">
              <h3>❄️ startSnowStorm</h3><p>Winter snow falling gently</p>
              <div class="docs-code-container">startSnowStorm(container, { density: 0.2 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-matrix-rain">
              <h3>💻 startMatrixRain</h3><p>Digital green rain</p>
              <div class="docs-code-container">startMatrixRain(container, { density: 0.1 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-autumn-leaves">
              <h3>🍂 startAutumnLeaves</h3><p>Autumn orange leaves spinning</p>
              <div class="docs-code-container">startAutumnLeaves(container, { density: 0.1 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-bubbles">
              <h3>🫧 startBubbles</h3><p>Soap bubbles floating upwards</p>
              <div class="docs-code-container">startBubbles(container, { density: 0.05 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-black-hole">
              <h3>🕳️ startBlackHole</h3><p>Spiraling cosmic gravity well</p>
              <div class="docs-code-container">startBlackHole(container, { density: 0.15 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-aurora">
              <h3>🌌 startAuroraBorealis</h3><p>Waving light bands</p>
              <div class="docs-code-container">startAuroraBorealis(container, { density: 0.5 });</div>
            </div>
            <div class="doc-page" id="doc-page-api-lens-flares">
              <h3>✨ startLensFlares</h3><p>Cinematic anamorphic light flares</p>
              <div class="docs-code-container">startLensFlares(container, { density: 0.1 });</div>
            </div>
`;

html = html.replace(
  /(<div class="doc-page" id="doc-page-api-floating-balloons">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/,
  `$1\n${newDocPages}`
);

// Add FPS Counter HTML to the header logo area
html = html.replace(
  /(<div class="header-logo">[\s\S]*?<\/div>)/,
  `$1\n        <div id="fps-counter" style="margin-left: 20px; font-family: monospace; font-size: 12px; color: var(--pink); border: 1px solid var(--border-color); padding: 4px 8px; border-radius: 4px; background: rgba(0,0,0,0.5);">FPS: 60</div>`
);

// Add FPS Counter Script at the end of the script block
html = html.replace(
  /(<\/script>\s*<\/body>)/,
  `
      // FPS Counter
      let fpsFrames = 0;
      let lastFpsTime = performance.now();
      const fpsEl = document.getElementById('fps-counter');
      function fpsLoop(now) {
        fpsFrames++;
        if (now - lastFpsTime >= 1000) {
          if(fpsEl) fpsEl.textContent = 'FPS: ' + fpsFrames;
          fpsFrames = 0;
          lastFpsTime = now;
        }
        requestAnimationFrame(fpsLoop);
      }
      requestAnimationFrame(fpsLoop);
    $1`
);

// Change Sidebar to have a Grid styling (Dashboard Look)
// The sidebar has class="sidebar" and its buttons have class="tab".
// Let's modify the css block for .sidebar to have a better look.
html = html.replace(
  /(\.sidebar\s*\{\s*background:.*?;\s*border:.*?;\s*border-radius:.*?;)/,
  `$1
        /* Dashboard glass styling */
        backdrop-filter: blur(40px);
        -webkit-backdrop-filter: blur(40px);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        border: 1px solid rgba(255, 255, 255, 0.05);
  `
);

// Let's modify nav layout to be a grid of buttons
html = html.replace(
  /(nav\s*\{\s*display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*8px;\s*\})/,
  `nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }`
);

fs.writeFileSync('index.html', html);
console.log('UI Updated');
