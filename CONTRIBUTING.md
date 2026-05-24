# Contributing to Romantic Animations 💖

First off, thank you for considering contributing to **Romantic Animations**! 🚀

This project is an open-source JavaScript animation library focused on beautiful romantic and celebratory canvas effects for modern web applications.

Whether you're fixing bugs, improving performance, enhancing documentation, adding new animations, or suggesting ideas — contributions are always welcome.

---

## Ways to Contribute

You can contribute in many ways:

- 🐛 Fix bugs
- ⚡ Improve performance
- ✨ Add new animation effects
- 📘 Improve documentation
- 🧠 Enhance TypeScript typings
- 🧪 Add tests
- 🌐 Improve framework integrations (React / Next.js / Vue / Angular)
- 🎨 Improve demo site / developer experience
- 💡 Suggest new features
- 📝 Improve examples and usage guides

---

## Getting Started

### 1. Fork the Repository

Click the **Fork** button on GitHub.

---

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/romantic-animations.git
cd romantic-animations
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Development

For library development:

```bash
npm run dev
```

For demo build:

```bash
npm run build:demo
```

For production build:

```bash
npm run build
```

---

## Project Structure

```txt
romantic-animations/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── src/
│   ├── animations/
│   │   ├── floatingHearts.js
│   │   ├── heartTrail.js
│   │   ├── heartBurst.js
│   │   ├── sparkles.js
│   │   ├── loveRain.js
│   │   ├── confetti.js
│   │   ├── fireworks.js
│   │   ├── starField.js
│   │   ├── butterfly.js
│   │   ├── magicDust.js
│   │   ├── floatingOrbs.js
│   │   └── shootingStars.js
│   │
│   ├── core/
│   │   └── engine.js
│   │
│   ├── index.js
│   └── index.d.ts
│
├── dist/
├── demo-dist/
├── docs/
│   └── screenshots/
│
├── README.md
├── CONTRIBUTING.md
├── package.json
├── vite.config.js
└── vite.demo.config.js
```

---

## Development Guidelines

### Code Style

Please follow these principles:

- Write clean, readable, maintainable code
- Use meaningful variable and function names
- Keep modules focused and reusable
- Match the existing code style
- Avoid unnecessary dependencies
- Preserve the zero-dependency philosophy where possible

---

## Branch Naming Convention

Please create feature branches instead of working directly on `main`.

### Feature Branches

```txt
feat/add-snowfall-animation
feat/improve-fireworks-rendering
feat/add-vue-example
```

---

### Bug Fix Branches

```txt
fix/stop-animation-memory-leak
fix/canvas-cleanup-issue
fix/nextjs-ssr-error
```

---

### Bug Investigation Branches

```txt
bug/fireworks-not-rendering
bug/typescript-export-issue
bug/mobile-touch-event-glitch
```

---

### Documentation Branches

```txt
docs/update-readme
docs/add-react-example
docs/improve-installation-guide
```

---

### Refactor Branches

```txt
refactor/animation-engine-cleanup
refactor/session-manager
refactor/render-loop-optimization
```

---

### Performance Branches

```txt
perf/reduce-canvas-repaints
perf/particle-optimization
```

---

### Testing Branches

```txt
test/add-animation-unit-tests
test/confetti-behavior-tests
```

---

### Maintenance Branches

```txt
chore/update-dependencies
chore/github-actions-cleanup
chore/project-structure-cleanup
```

---

## Recommended Workflow

Always start from the latest main branch:

```bash
git checkout main
git pull origin main
```

Create a new branch:

```bash
git checkout -b feat/add-new-animation
```

Make your changes.

Commit:

```bash
git add .
git commit -m "feat: add snowfall animation"
```

Push:

```bash
git push origin feat/add-new-animation
```

Then open a Pull Request to:

```txt
main
```

---

## Adding a New Animation

If you're adding a new animation:

### 1. Create the animation file

Inside:

```txt
src/animations/
```

Example:

```txt
src/animations/snowfall.js
```

---

### 2. Export it from the public API

Update:

```txt
src/index.js
```

Example:

```javascript
export function startSnowfall(containerId, options = {}) {
  return _run(containerId, snowfall, options);
}
```

---

### 3. Add TypeScript definitions

Update:

```txt
src/index.d.ts
```

Example:

```typescript
export declare function startSnowfall(
  containerId: string | HTMLElement,
  options?: AnimationOptions
): number;
```

---

### 4. Update Documentation

If applicable:

- Add README usage examples
- Add screenshots / GIFs
- Add demo showcase integration

---

## Commit Message Convention

Please follow conventional commit standards.

### Feature

```txt
feat: add snowfall animation
```

### Bug Fix

```txt
fix: resolve canvas cleanup issue
```

### Documentation

```txt
docs: improve README installation guide
```

### Refactor

```txt
refactor: simplify animation lifecycle manager
```

### Performance

```txt
perf: optimize particle rendering loop
```

### Testing

```txt
test: add confetti behavior tests
```

### Maintenance

```txt
chore: update github workflow
```

---

## Pull Request Guidelines

Before opening a PR:

Run:

```bash
npm run build
npm run build:demo
```

Ensure:

- project builds successfully
- no broken exports
- typings remain correct
- demo still works

---

### Documentation Updates

If your change affects usage:

Please also update:

- README.md
- TypeScript definitions
- examples
- demo

---

### Keep PRs Focused

Good PR examples:

- one bug fix
- one feature
- one performance improvement

Avoid giant mixed PRs.

---

## Bug Reports

When reporting issues, include:

- OS / Browser
- framework used
- reproduction steps
- expected behavior
- actual behavior
- screenshots if helpful

Example:

```txt
Browser: Chrome
Framework: React + Vite
Issue: stopAnimation() does not remove canvas
Steps:
1. Start animation
2. Stop animation
3. Canvas remains in DOM
```

---

## Feature Requests

Feature suggestions are welcome.

Please explain:

- use case
- expected behavior
- why it helps users
- optional implementation idea

---

## TypeScript Support

This package is written in JavaScript but supports TypeScript consumers.

If you modify public exports:

Please update:

```txt
src/index.d.ts
```

to keep typings accurate.

---

## Code Review Expectations

Pull requests may be reviewed for:

- code quality
- maintainability
- performance impact
- API consistency
- compatibility
- documentation completeness

Constructive feedback is part of the process 💖

---

## Questions?

If you're unsure:

- open an issue
- start a discussion
- ask before implementing major changes

---

## Code of Conduct

Please be respectful, constructive, and collaborative.

This project aims to be welcoming to developers of all experience levels.

---

## Thank You 💖

Every contribution matters.

Whether it's code, docs, bug reports, ideas, or feedback — thank you for helping improve **Romantic Animations** 🚀