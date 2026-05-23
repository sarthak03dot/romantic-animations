# 💖 Romantic Animations v1.2.7

<p align="center">
  <b>A premium, lightweight, zero-dependency JavaScript canvas particle library for gorgeous romantic & celebratory effects.</b>
</p>

<p align="center">
  Perfect for Valentine's Day, weddings, anniversaries, landing pages, or any celebratory web application needing high-quality hardware-accelerated visual particle overlays.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sarthak03dot/romantic-animations">
    <img src="https://img.shields.io/npm/v/@sarthak03dot/romantic-animations.svg" alt="NPM Version" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
  <a href="https://sarthak03dot.github.io/romantic-animations/">
    <img src="https://img.shields.io/badge/Demo-Interactive%20Showcase-ff4d6d.svg" alt="Interactive Showcase" />
  </a>
</p>

---

## Live Demo

[![Live Demo](https://img.shields.io/badge/🚀-Try%20Live%20Demo-ff4d6d?style=for-the-badge)](https://sarthak03dot.github.io/romantic-animations/)

---

## Gallery & Screenshots

<div align="center">
  <h3>✨ Floating Hearts & Live Tweaks</h3>
  <img src="https://raw.githubusercontent.com/sarthak03dot/romantic-animations/main/docs/screenshots/demo1.png" width="100%" />

  <h3>🎆 Starry Fireworks Celebration</h3>
  <img src="https://raw.githubusercontent.com/sarthak03dot/romantic-animations/main/docs/screenshots/demo2.png" width="100%" />

  <h3>📚 Integrated Live Customizer & Developer Portal</h3>
  <img src="https://raw.githubusercontent.com/sarthak03dot/romantic-animations/main/docs/screenshots/demo3.png" width="100%" />
</div>

---

## 🚀 Key Features

* 🚀 **High Performance & Zero Dependencies**: Built directly on raw HTML5 `<canvas>` API with optimal mathematical loop calculations (`requestAnimationFrame`), keeping your bundle size extremely small.
* 🌓 **Responsive Dual-Theme Customizer**: Fully styled and responsive landing page that seamlessly toggles between a neon-drenched **Dark Mode** and a clean, high-contrast **Light Mode** for accessibility.
* 📱 **Touch & Mobile Optimizations**: Fully responsive drawer nav overlays, click-burst triggers for tapping screens, and custom mobile menu structures.
* 📚 **Collapsible Developer Portal**: Hash-routed playground switcher containing dynamic CDN, Vanilla, React, and Next.js SSR setups.

---
## 📦 Installation

To begin adding romantic canvas overlays to your codebase:

```bash
# Using npm
npm install @sarthak03dot/romantic-animations

# Using pnpm
pnpm add @sarthak03dot/romantic-animations

# Using yarn
yarn add @sarthak03dot/romantic-animations
```

--- 

## ✨ Available Animations & API reference

Each animation function returns a unique **`sessionId`** string. Keep this reference to stop or update the animation loops when pages change.

### 1. `startFloatingHearts(container, options)`
Rises hearts from the bottom edge of the container that drift sideways via a sinusoidal wave.
* **Best for**: Romantic background ambient atmosphere.
* **Special options**:
  * `count`: Particle spawning density multiplier (`0.01` to `1.0`, default `0.15`).

### 2. `startHeartTrail(container, options)`
Leaves a beautiful floating heart trail trailing directly behind the mouse pointer or fingertip touches.
* **Best for**: High-user-interaction sections.
* **Special options**:
  * `maxSize`: Tail sizing bounds.

### 3. `startHeartBurst(container, options)`
Spawns explosive, colorful shockwaves of hearts, stars, or sparkles radiating outwards from a click/tap coordinate.
* **Best for**: Interactive buttons, click rewards, and anniversary triggers.

### 4. `startSparkles(container, options)`
Twinkling 4-point cross sparkles that gently float down, simulating glowing fairy dust.
* **Best for**: Mystical theme overlays.

### 5. `startLoveRain(container, options)`
A falling downpour of romantic emojis (`💖`, `💕`, `🌸`, etc.) and hearts drifting on wind vectors.
* **Best for**: Wedding banners and celebration announcements.

### 6. `startConfetti(container, options)`
Celebration ribbons and flakes launched from the screen edges falling under the influence of gravity, rotational twist, and drag.
* **Best for**: Checkout success, checkout completions, or birthday triggers.

### 7. `startFireworks(container, options)`
Auto-firing rockets launching upwards, leaving trail paths before bursting into colorful star coordinate arrays.
* **Best for**: Festivities and new-year celebrations.

### 8. `startStarField(container, options)`
An interactive warp speed stellar coordinate system drawing sleek geometric line links to nearby stars.
* **Best for**: Interactive hero pages.

### 9. `startButterflies(container, options)`
Wing-flapping glowing butterfly paths that hover organically with realistic flight drift algorithms.
* **Best for**: Spring-time landing themes.

### 10. `startMagicDust(container, options)`
Swirling trails of glittering particles that drift slowly on the screen.

### 11. `startFloatingOrbs(container, options)`
Large, soft bokeh globes bouncing gently off the screen boundaries.

### 12. `startShootingStars(container, options)`
Cosmic meteor streaks flashing randomly across the dark skyline.

---

## 💻 Integration Guides

### 1. Vanilla JavaScript ESM Setup
Ensure your container is structured to overlap the viewport properly:

```html
<!-- Main Overlay Wrapper -->
<div id="romantic-canvas-container" style="position: fixed; inset: 0; pointer-events: none; z-index: 9999;"></div>

<script type="module">
  import { startFloatingHearts } from '@sarthak03dot/romantic-animations';

  // Spawn romantic drifting hearts
  const sessionId = startFloatingHearts('romantic-canvas-container', {
    count: 0.2,
    minSize: 10,
    maxSize: 30,
    colors: ['#ff4d6d', '#ff85a1', '#e8c1a0'],
    glow: true
  });
</script>
```

---

### 2. React Components (Zero-Leak Hooks)
Always clean up your active canvas sessions when components unmount to prevent memory leaks in single-page apps:

```jsx
import React, { useEffect, useRef } from 'react';
import { startConfetti, stopAnimation } from '@sarthak03dot/romantic-animations';

export const ConfettiCelebration = () => {
  const containerRef = useRef(null);
  const sessionRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      sessionRef.current = startConfetti(containerRef.current, {
        count: 0.35,
        colors: ['#ff4d6d', '#ff85a1', '#c77dff', '#48cae4']
      });
    }

    // Stop active canvas loops immediately on unmount
    return () => {
      if (sessionRef.current) {
        stopAnimation(sessionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
};
```

---

### 3. Next.js Client Integrations (SSR Protection)
Canvas rendering references the global browser `window` object. Guard imports using a client-side execution block:

```jsx
'use client';

import React, { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    // Dynamic import inside useEffect to safely isolate client-only UMD scripts
    import('@sarthak03dot/romantic-animations').then((lib) => {
      lib.startShootingStars('shooting-stars-overlay', {
        speed: 2.5,
        count: 0.15
      });
    });
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0b0c10' }}>
      <div 
        id="shooting-stars-overlay" 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10
        }} 
      />
    </div>
  );
}
```

---

### 4. Direct Browser UMD CDN Script Integration
Excellent for quick testing inside simple HTML static assets:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Romantic Page</title>
</head>
<body>
  <!-- Canvas overlay -->
  <div id="overlay-container" style="position: fixed; inset: 0; pointer-events: none; z-index: 9999;"></div>

  <!-- UMD script loading -->
  <script src="https://cdn.jsdelivr.net/npm/@sarthak03dot/romantic-animations@1.2.0/dist/romantic-animations.umd.js"></script>

  <script>
    // Access via global window namespace
    RomanticAnimations.startSparkles('overlay-container', {
      count: 0.25,
      glow: true
    });
  </script>
</body>
</html>
```

---

## ⚙️ Configuration Properties

The second parameter supports rich custom tokens:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `count` | `Number` | `0.2` | Particle spawn density rate (range: `0.01` to `1.0`). |
| `minSize` | `Number` | `10` | Minimum particle rendering size in pixels. |
| `maxSize` | `Number` | `30` | Maximum particle rendering size in pixels. |
| `colors` | `Array` | `['#ff4d6d']` | List of color hex/rgb strings chosen randomly for particles. |
| `glow` | `Boolean` | `true` | Enables/disables radial neon drop shadows. |
| `speed` | `Number` | `1.5` | Particle speed modifier multiplier. |

---

## 🧹 Session Management & Lifecycle Cleansing

Stop active loops cleanly with the lifecycle triggers:

```javascript
import { startFloatingHearts, stopAnimation, stopAll } from '@sarthak03dot/romantic-animations';

// Start session
const session = startFloatingHearts('canvas-wrapper');

// Clean up just this single session
stopAnimation(session);

// Clean up all running canvas loops on the page at once
stopAll();
```

---

## 🤝 Contributing & Running Locally

We welcome bug fixes, enhancement requests, and brand new canvas effect implementations!

1. **Fork the Repository** and clone it.
2. Install all dev packages:
   ```bash
   npm install
   ```
3. Boot the local development server:
   ```bash
   npm run dev
   ```
4. Write your gorgeous animation source codes inside `src/animations/` and wire them into the global entry inside `src/index.js`.
5. Run the production build validation:
   ```bash
   npm run build
   npm run build:demo
   ```
6. Submit a **Pull Request** detailing your upgrades!

---

## 🧑‍💻 Author

**Sarthak Singh 👋**  
* Passionate front-end developer crafting interactive canvas web experiences.
* **Email**: [sarthak03december@gmail.com](mailto:sarthak03december@gmail.com)
* **GitHub**: [@sarthak03dot](https://github.com/sarthak03dot)

---

## 📄 License

This repository is licensed under the [MIT License](LICENSE).
