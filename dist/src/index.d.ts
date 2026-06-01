/**
 * romantic-animations v2.0.2
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
/**
 * Stop a single animation by its session id.
 * @param {number} id – returned by a start* call
 */
export declare function stopAnimation(id: number): void;
/**
 * Stop every running animation and clean up all canvases.
 */
export declare function stopAll(): void;
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
export declare function startFloatingHearts(containerId: string | HTMLElement, options?: Record<string, any>): number;
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
export declare function startHeartTrail(containerId: string | HTMLElement, options?: Record<string, any>): number;
/**
 * Heart burst on click / tap.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.count=20]       – particles per burst
 * @param {string[]} [options.symbols]        – 'heart' | 'star' | 'sparkle'
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export declare function startHeartBurst(containerId: string | HTMLElement, options?: Record<string, any>): number;
/**
 * Twinkling sparkle stars.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.count=80]
 * @param {number}   [options.speed=0.5]
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export declare function startSparkles(containerId: string | HTMLElement, options?: Record<string, any>): number;
/**
 * Rain of love emojis / symbols drifting downward.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.density=0.15]
 * @param {string[]} [options.symbols]        – array of strings / emoji
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export declare function startLoveRain(containerId: string | HTMLElement, options?: Record<string, any>): number;
/**
 * Colourful confetti raining down.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.density=0.18]
 * @param {string[]} [options.colors]
 * @param {string[]} [options.shapes]         – 'rect' | 'circle' | 'ribbon'
 * @returns {number} session id
 */
export declare function startConfetti(containerId: string | HTMLElement, options?: Record<string, any>): number;
/**
 * Fireworks that auto-launch on an interval.
 * @param {string|HTMLElement} containerId
 * @param {object} [options]
 * @param {number}   [options.interval=1200]  – ms between launches
 * @param {number}   [options.particleCount=80]
 * @param {boolean}  [options.glow=true]
 * @returns {number} session id
 */
export declare function startFireworks(containerId: string | HTMLElement, options?: Record<string, any>): number;
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
export declare function startStarField(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startButterflies(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startMagicDust(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startFloatingOrbs(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startShootingStars(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startRosePetals(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startFloatingBalloons(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startGlobeMovement(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startCherryBlossoms(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startFireflies(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startSnowStorm(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startMatrixRain(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startAutumnLeaves(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startBubbles(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startBlackHole(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startAuroraBorealis(containerId: string | HTMLElement, options?: Record<string, any>): number;
export declare function startLensFlares(containerId: string | HTMLElement, options?: Record<string, any>): number;
declare const _default: {
    startFloatingHearts: typeof startFloatingHearts;
    startHeartTrail: typeof startHeartTrail;
    startHeartBurst: typeof startHeartBurst;
    startSparkles: typeof startSparkles;
    startLoveRain: typeof startLoveRain;
    startConfetti: typeof startConfetti;
    startFireworks: typeof startFireworks;
    startStarField: typeof startStarField;
    startButterflies: typeof startButterflies;
    startMagicDust: typeof startMagicDust;
    startFloatingOrbs: typeof startFloatingOrbs;
    startShootingStars: typeof startShootingStars;
    startRosePetals: typeof startRosePetals;
    startFloatingBalloons: typeof startFloatingBalloons;
    startGlobeMovement: typeof startGlobeMovement;
    startCherryBlossoms: typeof startCherryBlossoms;
    startFireflies: typeof startFireflies;
    startSnowStorm: typeof startSnowStorm;
    startMatrixRain: typeof startMatrixRain;
    startAutumnLeaves: typeof startAutumnLeaves;
    startBubbles: typeof startBubbles;
    startBlackHole: typeof startBlackHole;
    startAuroraBorealis: typeof startAuroraBorealis;
    startLensFlares: typeof startLensFlares;
    stopAnimation: typeof stopAnimation;
    stopAll: typeof stopAll;
};
export default _default;
