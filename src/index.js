/**
 * romantic-animations v2.0.0
 * ───────────────────────────────────────────────────────
 * A rich collection of canvas-based romantic & celebratory
 * animations for the web.
 *
 * Usage (ESM):
 *   import { startFloatingHearts, stopAll } from '@sarthak03dot/romantic-animations';
 *   startFloatingHearts('my-container');
 *
 * Usage (UMD / CDN):
 *   <script src="...romantic-animations.umd.js"></script>
 *   <script>
 *     RomanticAnimations.startFloatingHearts('my-container');
 *   </script>
 * ───────────────────────────────────────────────────────
 */

import { initCanvas } from './core/engine.js';
import { floatingHearts } from './animations/floatingHearts.js';
import { heartTrail }     from './animations/heartTrail.js';
import { heartBurst }     from './animations/heartBurst.js';
import { sparkles }       from './animations/sparkles.js';
import { loveRain }       from './animations/loveRain.js';
import { confetti }       from './animations/confetti.js';
import { fireworks }      from './animations/fireworks.js';
import { starField }      from './animations/starField.js';
import { butterflies }    from './animations/butterfly.js';
import { magicDust }      from './animations/magicDust.js';
import { floatingOrbs }   from './animations/floatingOrbs.js';
import { shootingStars }  from './animations/shootingStars.js';

// Track active sessions so stopAll() can clean up everything
const _sessions = new Map(); // containerId → { destroy, stop }
let _sessionId = 0;

/**
 * Internal helper — boots a canvas and starts an animation fn.
 * Returns a numeric session id that can be passed to stopAnimation().
 *
 * @param {string|HTMLElement} containerId
 * @param {Function}           animFn       – the animation factory
 * @param {object}             options      – user options forwarded to the animation
 * @returns {number}  session id
 */
function _run(containerId, animFn, options = {}) {
  const { canvas, destroy } = initCanvas(containerId, options);
  const stop = animFn(canvas, options);
  const id = ++_sessionId;
  _sessions.set(id, { destroy, stop });
  return id;
}

/**
 * Stop a single animation by its session id.
 * @param {number} id – returned by a start* call
 */
export function stopAnimation(id) {
  if (_sessions.has(id)) {
    const s = _sessions.get(id);
    if (typeof s.stop === 'function') s.stop();
    s.destroy();
    _sessions.delete(id);
  }
}

/**
 * Stop every running animation and clean up all canvases.
 */
export function stopAll() {
  _sessions.forEach((s) => {
    if (typeof s.stop === 'function') s.stop();
    s.destroy();
  });
  _sessions.clear();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Floating hearts rising from the bottom.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.count=0.12]     – spawn probability per frame (0–1)
 * @param {number}   [options.minSize=14]
 * @param {number}   [options.maxSize=32]
 * @param {number}   [options.minSpeed=0.8]
 * @param {number}   [options.maxSpeed=2.4]
 * @param {string[]} [options.colors]
 * @param {boolean}  [options.wobble=true]    – sine-wave horizontal drift
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startFloatingHearts(containerId, options = {}) {
  return _run(containerId, floatingHearts, options);
}

/**
 * Heart trail that follows the cursor / touch.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.minSize=6]
 * @param {number}   [options.maxSize=16]
 * @param {number}   [options.decay=0.025]
 * @param {string[]} [options.colors]
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startHeartTrail(containerId, options = {}) {
  return _run(containerId, heartTrail, options);
}

/**
 * Heart burst on click / tap.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.count=20]       – particles per burst
 * @param {string[]} [options.symbols]        – 'heart' | 'star' | 'sparkle'
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startHeartBurst(containerId, options = {}) {
  return _run(containerId, heartBurst, options);
}

/**
 * Twinkling sparkle stars.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.count=80]
 * @param {number}   [options.speed=0.5]
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startSparkles(containerId, options = {}) {
  return _run(containerId, sparkles, options);
}

/**
 * Rain of love emojis / symbols drifting downward.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.density=0.15]
 * @param {string[]} [options.symbols]        – array of strings / emoji
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startLoveRain(containerId, options = {}) {
  return _run(containerId, loveRain, options);
}

/**
 * Colourful confetti raining down.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.density=0.18]
 * @param {string[]} [options.colors]
 * @param {string[]} [options.shapes]         – 'rect' | 'circle' | 'ribbon'
 * @returns {number} session id
 */
export function startConfetti(containerId, options = {}) {
  return _run(containerId, confetti, options);
}

/**
 * Fireworks that auto-launch on an interval.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.interval=1200]  – ms between launches
 * @param {number}   [options.particleCount=80]
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export function startFireworks(containerId, options = {}) {
  return _run(containerId, fireworks, options);
}

/**
 * Drifting star field with optional constellation lines.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.starCount=120]
 * @param {number}   [options.speed=0.4]
 * @param {boolean}  [options.twinkle=true]
 * @param {number}   [options.connectDist=100] – set to 0 to disable lines
 * @returns {number} session id
 */
export function startStarField(containerId, options = {}) {
  return _run(containerId, starField, options);
}

export function startButterflies(containerId, options = {}) {
  return _run(containerId, butterflies, options);
}

export function startMagicDust(containerId, options = {}) {
  return _run(containerId, magicDust, options);
}

export function startFloatingOrbs(containerId, options = {}) {
  return _run(containerId, floatingOrbs, options);
}

export function startShootingStars(containerId, options = {}) {
  return _run(containerId, shootingStars, options);
}

// ─── Default export (convenient for UMD / CDN namespace) ──────────────────────
export default {
  startFloatingHearts,
  startHeartTrail,
  startHeartBurst,
  startSparkles,
  startLoveRain,
  startConfetti,
  startFireworks,
  startStarField,
  startButterflies,
  startMagicDust,
  startFloatingOrbs,
  startShootingStars,
  stopAnimation,
  stopAll,
};
