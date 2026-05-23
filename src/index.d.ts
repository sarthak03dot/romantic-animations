export interface AnimationOptions {
  density?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  colors?: string[];
  zIndex?: number;
  pointerEvents?: boolean;
}

export declare function startFloatingHearts(
  container?: HTMLElement,
  options?: AnimationOptions
): number;

export declare function startConfetti(
  container?: HTMLElement,
  options?: AnimationOptions
): number;

export declare function startFireworks(
  container?: HTMLElement,
  options?: AnimationOptions
): number;

export declare function stopAnimation(id: number): void;