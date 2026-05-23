export interface AnimationOptions {
  count?: number;
  density?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  speed?: number;
  colors?: string[];
  glow?: boolean;
  wobble?: boolean;
  interval?: number;
  particleCount?: number;
  starCount?: number;
  twinkle?: boolean;
  connectDist?: number;
  decay?: number;
  symbols?: string[];
  shapes?: string[];
}

export declare function startFloatingHearts(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startHeartTrail(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startHeartBurst(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startSparkles(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startLoveRain(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startConfetti(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startFireworks(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startStarField(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startButterflies(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startMagicDust(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startFloatingOrbs(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function startShootingStars(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;

export declare function stopAnimation(id: number): void;
export declare function stopAll(): void;

declare const RomanticAnimations: {
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
  stopAnimation: typeof stopAnimation;
  stopAll: typeof stopAll;
};

export default RomanticAnimations;