/**
 * romantic-animations — core engine
 * Handles canvas creation, sizing, resize observation, and cleanup.
 */

const DEFAULT_OPTIONS = {
  zIndex: 0,
};

/**
 * Initialises a canvas inside the given container element.
 *
 * @param {string|HTMLElement} containerIdOrEl  – element id OR element reference
 * @param {object}             userOptions      – optional overrides
 * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
 *             options: object, destroy: Function }}
 */
export function initCanvas(containerIdOrEl, userOptions = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS, userOptions);

  const container =
    typeof containerIdOrEl === 'string'
      ? document.getElementById(containerIdOrEl)
      : containerIdOrEl;

  if (!container) {
    throw new Error(
      `[romantic-animations] Container "${containerIdOrEl}" not found in the DOM.`
    );
  }

  // Remove any pre-existing canvas we created (clean slate when re-triggering)
  const old = container.querySelector('canvas[data-ra]');
  if (old) old.remove();

  const canvas = document.createElement('canvas');
  canvas.setAttribute('data-ra', '1');
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: ${options.zIndex};
  `;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();

  container.style.position = container.style.position || 'relative';
  container.appendChild(canvas);

  // Keep canvas sized to container
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const ctx = canvas.getContext('2d');

  /** Tear-down helper – call the returned destroy() to stop & clean up */
  function destroy() {
    ro.disconnect();
    canvas.remove();
  }

  return { canvas, ctx, options, destroy };
}

/**
 * Merge user options with animation-specific defaults.
 */
export function mergeOptions(defaults, userOptions = {}) {
  return Object.assign({}, defaults, userOptions);
}
