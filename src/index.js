import { initCanvas } from "./core/engine.js";
import { floatingHearts } from "./animations/floatingHearts.js";
import { heartTrail } from "./animations/heartTrail.js";
import { heartBurst } from "./animations/heartBurst.js";

export function startFloatingHearts(containerId = 'body') {
  const canvas = initCanvas(containerId);
  floatingHearts(canvas);
}

export function startHeartTrail(containerId = 'body') {
  const canvas = initCanvas(containerId);
  heartTrail(canvas);
}

export function startHeartBurst(containerId = 'body') {
  const canvas = initCanvas(containerId);
  heartBurst(canvas);
}
