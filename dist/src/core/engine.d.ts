/**
 * romantic-animations — core engine
 * Handles canvas creation, sizing, resize observation, and cleanup.
 */
/**
 * Initialises a canvas inside the given container element.
 *
 * @param {string|HTMLElement} containerIdOrEl  – element id OR element reference
 * @param {object}             userOptions      – optional overrides
 * @returns {{ canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
 *             options: object, destroy: Function }}
 */
export declare function initCanvas(containerIdOrEl: string | HTMLElement, userOptions?: Record<string, any>): {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    options: {
        zIndex: number;
    } & Record<string, any>;
    destroy: () => void;
};
/**
 * Merge user options with animation-specific defaults.
 */
export declare function mergeOptions(defaults: Record<string, any>, userOptions?: Record<string, any>): Record<string, any>;
