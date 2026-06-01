const fs = require('fs');
let readme = fs.readFileSync('README.md', 'utf8');

const newDocs = `
### 15. \`startGlobeMovement(container, options)\` 🌐

A breathtaking 3D math-projected rotating particle globe made of glowing nodes and interconnecting lines.

### 16. \`startCherryBlossoms(container, options)\` 🌸

Simulates delicate pink sakura petals blowing rapidly across the screen with wind physics and 3D flipping.

### 17. \`startFireflies(container, options)\` 🐛

Organically wandering glowing yellow-green orbs that pulse their opacity to simulate bioluminescence.

### 18. \`startSnowStorm(container, options)\` ❄️

Parallax layers of falling snowflakes with varying speeds and gentle wind sway.

### 19. \`startMatrixRain(container, options)\` 💻

A stylized digital green hacker rain effect falling down the screen.

### 20. \`startAutumnLeaves(container, options)\` 🍂

Orange and red autumn leaves that spin and sway heavily as they fall.

### 21. \`startBubbles(container, options)\` 🫧

Soap bubbles with iridescent highlight reflections that wobble as they float upwards.

### 22. \`startBlackHole(container, options)\` 🕳️

A cosmic gravity well where glowing star particles spawn at the edges and spiral inwards rapidly.

### 23. \`startAuroraBorealis(container, options)\` 🌌

Multi-frequency wave functions drawing smooth, glowing vertical curtains of light across the night sky.

### 24. \`startLensFlares(container, options)\` ✨

Cinematic anamorphic light flares and ghost reflections that drift organically across the screen.
`;

// Append to the end of the API section.
// The easiest way is to just find startFloatingBalloons section and append it.
readme = readme.replace(
  /(### 14\. `startFloatingBalloons[\s\S]*?\n\n)/,
  `$1${newDocs}\n\n`
);

fs.writeFileSync('README.md', readme);
console.log('README Updated');
