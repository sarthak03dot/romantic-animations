const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'animations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (let file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // export function NAME(canvas, userOptions = {})
  content = content.replace(/export function (\w+)\(canvas, userOptions = \{\}\) \{/, 'export function $1(canvas: HTMLCanvasElement, userOptions: Record<string, any> = {}) {');
  
  // const items = [];
  content = content.replace(/const (\w+) = \[\];/g, 'const $1: any[] = [];');
  
  // function name(e)
  content = content.replace(/function (\w+)\(e\)/g, 'function $1(e: any)');
  content = content.replace(/\(e\) =>/g, '(e: any) =>');
  content = content.replace(/\(t\) =>/g, '(t: any) =>');
  
  // specific draw functions in fireworks, heartburst, hearttrail, etc.
  content = content.replace(/function burst\(x, y, color\)/g, 'function burst(x: number, y: number, color: string)');
  content = content.replace(/function drawPiece\(p\)/g, 'function drawPiece(p: any)');
  content = content.replace(/function drawSymbol\(ctx, type, cx, cy, r, color, alpha, glow\)/g, 'function drawSymbol(ctx: CanvasRenderingContext2D, type: string, cx: number, cy: number, r: number, color: string, alpha: number, glow: boolean)');
  content = content.replace(/function drawHeartShape\(ctx, cx, cy, r, color, alpha = 1, glow = false\)/g, 'function drawHeartShape(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha: number = 1, glow: boolean = false)');
  content = content.replace(/function drawHeart\(ctx, cx, cy, r, color, alpha, glow\)/g, 'function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha: number, glow: boolean)');
  content = content.replace(/function addHeart\(x, y\)/g, 'function addHeart(x: number, y: number)');
  content = content.replace(/function spawnBurst\(x, y\)/g, 'function spawnBurst(x: number, y: number)');
  content = content.replace(/function drawStar\(s\)/g, 'function drawStar(s: any)');

  fs.writeFileSync(filePath, content, 'utf-8');
}

// Engine.tsx
const enginePath = path.join(__dirname, 'src', 'core', 'engine.tsx');
let engineContent = fs.readFileSync(enginePath, 'utf-8');
engineContent = engineContent.replace(/export function initCanvas\(containerIdOrEl, userOptions = \{\}\) \{/, 'export function initCanvas(containerIdOrEl: string | HTMLElement, userOptions: Record<string, any> = {}) {');
engineContent = engineContent.replace(/export function mergeOptions\(defaults, userOptions = \{\}\) \{/, 'export function mergeOptions(defaults: Record<string, any>, userOptions: Record<string, any> = {}) {');
fs.writeFileSync(enginePath, engineContent, 'utf-8');

// index.tsx
const indexPath = path.join(__dirname, 'src', 'index.tsx');
let indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent.replace(/function _run\(containerId, animFn, options = \{\}\)/, 'function _run(containerId: string | HTMLElement, animFn: any, options: Record<string, any> = {})');
indexContent = indexContent.replace(/export function stopAnimation\(id\)/, 'export function stopAnimation(id: number)');
indexContent = indexContent.replace(/export function start(\w+)\(containerId, options = \{\}\)/g, 'export function start$1(containerId: string | HTMLElement, options: Record<string, any> = {})');
fs.writeFileSync(indexPath, indexContent, 'utf-8');

console.log('Types fixed');
