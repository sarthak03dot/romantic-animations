const y = {
  zIndex: 0
};
function b(e, l = {}) {
  const n = Object.assign({}, y, l), o = typeof e == "string" ? document.getElementById(e) : e;
  if (!o)
    throw new Error(
      `[romantic-animations] Container "${e}" not found in the DOM.`
    );
  const a = o.querySelector("canvas[data-ra]");
  a && a.remove();
  const f = document.createElement("canvas");
  f.setAttribute("data-ra", "1"), f.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: ${n.zIndex};
  `;
  const d = () => {
    f.width = window.innerWidth, f.height = window.innerHeight;
  };
  d(), o.style.position = o.style.position || "relative", o.appendChild(f);
  const c = new ResizeObserver(d);
  c.observe(o);
  const r = f.getContext("2d");
  function t() {
    c.disconnect(), f.remove();
  }
  return { canvas: f, ctx: r, options: n, destroy: t };
}
function u(e, l = {}) {
  return Object.assign({}, e, l);
}
const z = {
  count: 0.12,
  // hearts spawned per frame (probability)
  minSize: 14,
  maxSize: 32,
  minSpeed: 0.8,
  maxSpeed: 2.4,
  colors: ["#ff6b8a", "#ff4d6d", "#ff85a1", "#ffc2d1", "#ff0a54", "#ff477e"],
  wobble: !0,
  // horizontal sine drift
  glow: !0
};
function x(e, l, n, o, a, f = 1, d = !1) {
  e.save(), e.globalAlpha = f, d && (e.shadowColor = a, e.shadowBlur = o * 1.2), e.fillStyle = a, e.beginPath(), e.moveTo(l, n + o * 0.3), e.bezierCurveTo(l - o * 1.1, n - o * 0.5, l - o * 1.6, n + o * 0.5, l, n + o * 1.4), e.bezierCurveTo(l + o * 1.6, n + o * 0.5, l + o * 1.1, n - o * 0.5, l, n + o * 0.3), e.fill(), e.restore();
}
function C(e, l = {}) {
  const n = u(z, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    const r = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * e.width,
      y: e.height + r * 2,
      size: r,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0.7 + Math.random() * 0.3,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmount: 0.5 + Math.random() * 1.5
    };
  }
  function c() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height), Math.random() < n.count && a.push(d());
      for (let r = a.length - 1; r >= 0; r--) {
        const t = a[r];
        t.y -= t.speed, t.wobbleOffset += t.wobbleSpeed;
        const i = n.wobble ? Math.sin(t.wobbleOffset) * t.wobbleAmount * t.size * 0.5 : 0, h = Math.min(t.alpha, t.y / (e.height * 0.2));
        if (h <= 0 || t.y < -t.size * 3) {
          a.splice(r, 1);
          continue;
        }
        x(o, t.x + i, t.y, t.size, t.color, Math.max(0, h), n.glow);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const A = {
  minSize: 6,
  maxSize: 16,
  decay: 0.025,
  colors: ["#ff6b8a", "#ff4d6d", "#ff85a1", "#ffc2d1", "#c9184a"],
  glow: !0
};
function P(e, l, n, o, a, f, d) {
  e.save(), e.globalAlpha = Math.max(0, f), d && (e.shadowColor = a, e.shadowBlur = o * 2), e.fillStyle = a, e.beginPath(), e.moveTo(l, n + o * 0.3), e.bezierCurveTo(l - o * 1.1, n - o * 0.5, l - o * 1.6, n + o * 0.5, l, n + o * 1.4), e.bezierCurveTo(l + o * 1.6, n + o * 0.5, l + o * 1.1, n - o * 0.5, l, n + o * 0.3), e.fill(), e.restore();
}
function T(e, l = {}) {
  const n = u(A, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d(i, h) {
    a.push({
      x: i,
      y: h,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: 0.9 + Math.random() * 0.1,
      decay: n.decay * (0.8 + Math.random() * 0.4),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      vy: -(0.3 + Math.random() * 0.6)
      // drift upward
    });
  }
  const c = (i) => {
    const h = e.getBoundingClientRect();
    d(i.clientX - h.left, i.clientY - h.top);
  }, r = (i) => {
    const h = e.getBoundingClientRect();
    Array.from(i.touches).forEach((s) => {
      d(s.clientX - h.left, s.clientY - h.top);
    });
  };
  window.addEventListener("mousemove", c), window.addEventListener("touchmove", r, { passive: !0 });
  function t() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height);
      for (let i = a.length - 1; i >= 0; i--) {
        const h = a[i];
        h.y += h.vy, P(o, h.x, h.y, h.size, h.color, h.alpha, n.glow), h.alpha -= h.decay, h.alpha <= 0 && a.splice(i, 1);
      }
      requestAnimationFrame(t);
    }
  }
  return t(), function() {
    f = !1, window.removeEventListener("mousemove", c), window.removeEventListener("touchmove", r), o.clearRect(0, 0, e.width, e.height);
  };
}
const R = {
  count: 20,
  // hearts per burst
  minSize: 8,
  maxSize: 20,
  minSpeed: 2,
  maxSpeed: 7,
  gravity: 0.08,
  decay: 0.018,
  colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#ff4d6d"],
  glow: !0,
  symbols: ["heart"]
  // 'heart' | 'star' | 'sparkle'
};
function D(e, l, n, o, a, f, d, c) {
  if (e.save(), e.globalAlpha = Math.max(0, d), c && (e.shadowColor = f, e.shadowBlur = a * 2), e.fillStyle = f, l === "star") {
    e.beginPath();
    for (let r = 0; r < 5; r++) {
      const t = Math.PI / 2 + r * 2 * Math.PI / 5, i = t + Math.PI / 5;
      r === 0 ? e.moveTo(n + a * Math.cos(t), o - a * Math.sin(t)) : e.lineTo(n + a * Math.cos(t), o - a * Math.sin(t)), e.lineTo(n + a * 0.4 * Math.cos(i), o - a * 0.4 * Math.sin(i));
    }
    e.closePath(), e.fill();
  } else if (l === "sparkle")
    for (let r = 0; r < 4; r++) {
      const t = r * Math.PI / 2;
      e.beginPath(), e.ellipse(n + Math.cos(t) * a * 0.5, o + Math.sin(t) * a * 0.5, a * 0.18, a * 0.7, t, 0, Math.PI * 2), e.fill();
    }
  else
    e.beginPath(), e.moveTo(n, o + a * 0.3), e.bezierCurveTo(n - a * 1.1, o - a * 0.5, n - a * 1.6, o + a * 0.5, n, o + a * 1.4), e.bezierCurveTo(n + a * 1.6, o + a * 0.5, n + a * 1.1, o - a * 0.5, n, o + a * 0.3), e.fill();
  e.restore();
}
function F(e, l = {}) {
  const n = u(R, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d(i, h) {
    for (let s = 0; s < n.count; s++) {
      const m = Math.random() * Math.PI * 2, g = n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed);
      a.push({
        x: i,
        y: h,
        size: n.minSize + Math.random() * (n.maxSize - n.minSize),
        vx: Math.cos(m) * g,
        vy: Math.sin(m) * g,
        alpha: 1,
        decay: n.decay * (0.8 + Math.random() * 0.4),
        color: n.colors[Math.floor(Math.random() * n.colors.length)],
        symbol: n.symbols[Math.floor(Math.random() * n.symbols.length)]
      });
    }
  }
  const c = (i) => {
    const h = e.getBoundingClientRect();
    d(i.clientX - h.left, i.clientY - h.top);
  }, r = (i) => {
    const h = e.getBoundingClientRect();
    Array.from(i.changedTouches).forEach((s) => d(s.clientX - h.left, s.clientY - h.top));
  };
  window.addEventListener("click", c), window.addEventListener("touchend", r, { passive: !0 });
  function t() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height);
      for (let i = a.length - 1; i >= 0; i--) {
        const h = a[i];
        h.x += h.vx, h.y += h.vy, h.vy += n.gravity, h.alpha -= h.decay, D(o, h.symbol, h.x, h.y, h.size, h.color, h.alpha, n.glow), h.alpha <= 0 && a.splice(i, 1);
      }
      requestAnimationFrame(t);
    }
  }
  return t(), function() {
    f = !1, window.removeEventListener("click", c), window.removeEventListener("touchend", r), o.clearRect(0, 0, e.width, e.height);
  };
}
const I = {
  count: 80,
  // number of sparkles alive at once
  minSize: 2,
  maxSize: 6,
  speed: 0.5,
  twinkleSpeed: 0.04,
  colors: ["#fff", "#ffe4e8", "#ffb3c1", "#ff85a1", "#ffd6ff", "#e7c6ff"],
  glow: !0
};
function k(e, l = {}) {
  const n = u(I, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    return {
      x: Math.random() * e.width,
      y: Math.random() * e.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: n.twinkleSpeed * (0.5 + Math.random()),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed
    };
  }
  for (let t = 0; t < n.count; t++) a.push(d());
  function c(t) {
    o.save(), o.globalAlpha = Math.max(0, Math.min(1, t.alpha)), n.glow && (o.shadowColor = t.color, o.shadowBlur = t.size * 3), o.fillStyle = t.color;
    const i = t.size;
    o.beginPath();
    for (let h = 0; h < 4; h++) {
      const s = h * Math.PI / 2;
      o.ellipse(
        t.x + Math.cos(s) * i * 0.35,
        t.y + Math.sin(s) * i * 0.35,
        i * 0.15,
        i * 0.7,
        s,
        0,
        Math.PI * 2
      );
    }
    o.fill(), o.beginPath(), o.arc(t.x, t.y, i * 0.2, 0, Math.PI * 2), o.fill(), o.restore();
  }
  function r() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height);
      for (let t = 0; t < a.length; t++) {
        const i = a[t];
        i.x += i.vx, i.y += i.vy, i.alpha += i.alphaDir * i.twinkleSpeed, i.alpha >= 1 ? (i.alpha = 1, i.alphaDir = -1) : i.alpha <= 0 && (i.alpha = 0, i.alphaDir = 1), i.x < -10 && (i.x = e.width + 10), i.x > e.width + 10 && (i.x = -10), i.y < -10 && (i.y = e.height + 10), i.y > e.height + 10 && (i.y = -10), c(i);
      }
      requestAnimationFrame(r);
    }
  }
  return r(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const L = {
  density: 0.15,
  // probability of a new drop per frame
  symbols: ["❤", "💕", "✨", "💖", "💗", "⭐", "×"],
  minSize: 12,
  maxSize: 28,
  minSpeed: 1,
  maxSpeed: 3.5,
  colors: ["#ff6b8a", "#ff4d6d", "#ffc2d1", "#ff85a1", "#ff0a54", "#a2d2ff"],
  opacity: 0.85,
  glow: !0
};
function E(e, l = {}) {
  const n = u(L, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    const r = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * e.width,
      y: -r * 2,
      size: r,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      symbol: n.symbols[Math.floor(Math.random() * n.symbols.length)],
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0.4 + Math.random() * 0.6,
      angle: (Math.random() - 0.5) * 0.4,
      // slight tilt
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02
    };
  }
  function c() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height), Math.random() < n.density && a.push(d());
      for (let r = a.length - 1; r >= 0; r--) {
        const t = a[r];
        t.y += t.speed, t.wobble += t.wobbleSpeed;
        const i = Math.sin(t.wobble) * t.size * 0.3;
        o.save(), o.globalAlpha = t.alpha * n.opacity, o.font = `${t.size}px serif`, o.fillStyle = t.color, n.glow && (o.shadowColor = t.color, o.shadowBlur = t.size * 0.8), o.translate(t.x + i, t.y), o.rotate(t.angle), o.fillText(t.symbol, 0, 0), o.restore(), t.y > e.height + t.size * 2 && a.splice(r, 1);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const B = {
  density: 0.18,
  colors: ["#ff6b8a", "#ff4d6d", "#ffd6ff", "#e7c6ff", "#c77dff", "#48cae4", "#ffe66d", "#06d6a0"],
  minSize: 6,
  maxSize: 14,
  minSpeed: 1.5,
  maxSpeed: 4,
  gravity: 0.06,
  drag: 0.99,
  shapes: ["rect", "circle", "ribbon"]
};
function O(e, l = {}) {
  const n = u(B, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    const t = n.minSize + Math.random() * (n.maxSize - n.minSize), i = n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed);
    return {
      x: Math.random() * e.width,
      y: -t * 2,
      w: t,
      h: t * (0.4 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 3,
      vy: i,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0.8 + Math.random() * 0.2,
      shape: n.shapes[Math.floor(Math.random() * n.shapes.length)]
    };
  }
  function c(t) {
    o.save(), o.globalAlpha = t.alpha, o.fillStyle = t.color, o.strokeStyle = t.color, o.translate(t.x, t.y), o.rotate(t.angle), t.shape === "circle" ? (o.beginPath(), o.ellipse(0, 0, t.w / 2, t.h / 2, 0, 0, Math.PI * 2), o.fill()) : t.shape === "ribbon" ? (o.beginPath(), o.moveTo(-t.w / 2, 0), o.quadraticCurveTo(0, -t.h, t.w / 2, 0), o.quadraticCurveTo(0, t.h, -t.w / 2, 0), o.fill()) : o.fillRect(-t.w / 2, -t.h / 2, t.w, t.h), o.restore();
  }
  function r() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height), Math.random() < n.density && a.push(d());
      for (let t = a.length - 1; t >= 0; t--) {
        const i = a[t];
        i.vy += n.gravity, i.vx *= n.drag, i.vy *= n.drag, i.x += i.vx, i.y += i.vy, i.angle += i.spin, c(i), i.y > e.height + 20 && a.splice(t, 1);
      }
      requestAnimationFrame(r);
    }
  }
  return r(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const q = {
  interval: 1200,
  // ms between auto-launches
  trailLength: 28,
  particleCount: 80,
  colors: ["#ff6b8a", "#ff4d6d", "#ffd6ff", "#e7c6ff", "#ffe66d", "#06d6a0", "#48cae4", "#ffffff"],
  gravity: 0.09,
  decay: 0.014,
  glow: !0
};
function v(e, l = {}) {
  const n = u(q, l), o = e.getContext("2d");
  let a = !0;
  const f = [], d = [];
  function c() {
    const h = e.width * (0.2 + Math.random() * 0.6), s = e.height * (0.1 + Math.random() * 0.4);
    s - e.height;
    const m = 8 + Math.random() * 5, g = n.colors[Math.floor(Math.random() * n.colors.length)];
    f.push({ x: h, y: e.height, vy: -Math.abs(m), targetY: s, trail: [], color: g });
  }
  function r(h, s, m) {
    for (let g = 0; g < n.particleCount; g++) {
      const w = Math.random() * Math.PI * 2, S = 1 + Math.random() * 5;
      d.push({
        x: h,
        y: s,
        vx: Math.cos(w) * S,
        vy: Math.sin(w) * S,
        alpha: 1,
        decay: n.decay * (0.7 + Math.random() * 0.6),
        size: 2 + Math.random() * 3,
        color: m
      });
    }
  }
  const t = setInterval(() => {
    a && c();
  }, n.interval);
  c();
  function i() {
    if (a) {
      o.clearRect(0, 0, e.width, e.height);
      for (let h = f.length - 1; h >= 0; h--) {
        const s = f[h];
        s.y += s.vy, s.trail.push({ x: s.x, y: s.y }), s.trail.length > n.trailLength && s.trail.shift();
        for (let m = 0; m < s.trail.length; m++) {
          const g = m / s.trail.length * 0.8;
          o.save(), o.globalAlpha = g, n.glow && (o.shadowColor = s.color, o.shadowBlur = 6), o.fillStyle = s.color, o.beginPath(), o.arc(s.trail[m].x, s.trail[m].y, 2.5 * (m / s.trail.length), 0, Math.PI * 2), o.fill(), o.restore();
        }
        s.y <= s.targetY && (r(s.x, s.y, s.color), f.splice(h, 1));
      }
      for (let h = d.length - 1; h >= 0; h--) {
        const s = d[h];
        s.x += s.vx, s.y += s.vy, s.vy += n.gravity, s.alpha -= s.decay, o.save(), o.globalAlpha = Math.max(0, s.alpha), n.glow && (o.shadowColor = s.color, o.shadowBlur = s.size * 2), o.fillStyle = s.color, o.beginPath(), o.arc(s.x, s.y, s.size, 0, Math.PI * 2), o.fill(), o.restore(), s.alpha <= 0 && d.splice(h, 1);
      }
      requestAnimationFrame(i);
    }
  }
  return i(), function() {
    a = !1, clearInterval(t), o.clearRect(0, 0, e.width, e.height);
  };
}
const $ = {
  starCount: 120,
  speed: 0.4,
  colors: ["#ffffff", "#ffe4e8", "#ffc2d1", "#e7c6ff", "#a2d2ff"],
  minSize: 1,
  maxSize: 3.5,
  twinkle: !0,
  connectDist: 100,
  // draw faint lines between close stars
  connectOpacity: 0.08
};
function U(e, l = {}) {
  const n = u($, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d(r = !1) {
    return {
      x: Math.random() * e.width,
      y: Math.random() * e.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: 0.3 + Math.random() * 0.7,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: 8e-3 + Math.random() * 0.015,
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed,
      color: n.colors[Math.floor(Math.random() * n.colors.length)]
    };
  }
  for (let r = 0; r < n.starCount; r++) a.push(d(!0));
  function c() {
    if (f) {
      if (o.clearRect(0, 0, e.width, e.height), n.connectDist > 0)
        for (let r = 0; r < a.length; r++)
          for (let t = r + 1; t < a.length; t++) {
            const i = a[r].x - a[t].x, h = a[r].y - a[t].y, s = Math.sqrt(i * i + h * h);
            s < n.connectDist && (o.save(), o.globalAlpha = n.connectOpacity * (1 - s / n.connectDist), o.strokeStyle = "#ffffff", o.lineWidth = 0.5, o.beginPath(), o.moveTo(a[r].x, a[r].y), o.lineTo(a[t].x, a[t].y), o.stroke(), o.restore());
          }
      for (let r = 0; r < a.length; r++) {
        const t = a[r];
        t.x += t.vx, t.y += t.vy, n.twinkle && (t.alpha += t.alphaDir * t.twinkleSpeed, t.alpha >= 1 && (t.alpha = 1, t.alphaDir = -1), t.alpha <= 0.1 && (t.alpha = 0.1, t.alphaDir = 1)), t.x < -5 && (t.x = e.width + 5), t.x > e.width + 5 && (t.x = -5), t.y < -5 && (t.y = e.height + 5), t.y > e.height + 5 && (t.y = -5), o.save(), o.globalAlpha = t.alpha, o.shadowColor = t.color, o.shadowBlur = t.size * 3, o.fillStyle = t.color, o.beginPath(), o.arc(t.x, t.y, t.size, 0, Math.PI * 2), o.fill(), o.restore();
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const Y = {
  density: 0.05,
  // Spawn probability per frame
  colors: ["#c77dff", "#ff85a1", "#ffc2d1", "#48cae4", "#e7c6ff", "#fbb1bd"],
  minSize: 10,
  maxSize: 22,
  minSpeed: 0.8,
  maxSpeed: 2.2,
  glow: !0
};
function H(e, l = {}) {
  const n = u(Y, l), o = e.getContext("2d"), a = [];
  let f = !0, d = 0;
  function c() {
    const t = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: -t * 2,
      y: e.height * 0.1 + Math.random() * (e.height * 0.8),
      size: t,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0,
      flapSpeed: 0.1 + Math.random() * 0.15,
      flapOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleOffset: Math.random() * Math.PI * 2
    };
  }
  function r() {
    if (f) {
      d++, o.clearRect(0, 0, e.width, e.height), Math.random() < n.density && a.push(c());
      for (let t = a.length - 1; t >= 0; t--) {
        const i = a[t];
        i.x += i.speed, i.y += Math.sin(d * i.wobbleSpeed + i.wobbleOffset) * 1.5, i.alpha < 1 && i.x < e.width / 2 && (i.alpha += 0.02);
        const h = Math.abs(Math.sin(d * i.flapSpeed + i.flapOffset));
        o.save(), o.globalAlpha = Math.min(1, i.alpha), o.translate(i.x, i.y), o.rotate(-0.1 - h * 0.1), n.glow && (o.shadowColor = i.color, o.shadowBlur = i.size * 1.5), o.fillStyle = i.color, o.beginPath(), o.ellipse(-i.size * 0.2, 0, i.size * 0.4 * h, i.size * 0.5, 0.3, 0, Math.PI * 2), o.fill(), o.beginPath(), o.ellipse(i.size * 0.3 * h, -i.size * 0.1, i.size * 0.5 * h, i.size * 0.6, -0.2, 0, Math.PI * 2), o.fill(), o.restore(), i.x > e.width + i.size * 2 && a.splice(t, 1);
      }
      requestAnimationFrame(r);
    }
  }
  return r(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const X = {
  particleCount: 150,
  minSize: 1,
  maxSize: 4,
  colors: ["#ffd6ff", "#e7c6ff", "#c77dff", "#ffb3c1", "#ffffff"],
  speed: 0.8,
  glow: !0
};
function j(e, l = {}) {
  const n = u(X, l), o = e.getContext("2d"), a = [];
  let f = !0, d = 0;
  function c() {
    return {
      x: Math.random() * e.width,
      y: Math.random() * e.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      angle: Math.random() * Math.PI * 2,
      orbitRadius: 20 + Math.random() * 80,
      orbitSpeed: (0.01 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1),
      centerX: Math.random() * e.width,
      centerY: e.height + 50,
      // Start below and move up
      upwardSpeed: n.speed + Math.random() * 1.5,
      alpha: 0
    };
  }
  for (let t = 0; t < n.particleCount; t++)
    a.push(c()), a[t].centerY = Math.random() * e.height, a[t].alpha = Math.random();
  function r() {
    if (f) {
      d++, o.clearRect(0, 0, e.width, e.height);
      for (let t = 0; t < a.length; t++) {
        const i = a[t];
        i.angle += i.orbitSpeed, i.centerY -= i.upwardSpeed, i.x = i.centerX + Math.cos(i.angle) * i.orbitRadius + Math.sin(d * 0.01 + i.angle) * 30, i.y = i.centerY + Math.sin(i.angle) * (i.orbitRadius * 0.5), i.alpha < 1 && i.centerY > 0 && (i.alpha += 0.01), i.y < -50 && (Object.assign(i, c()), i.centerY = e.height + 50, i.centerX = Math.random() * e.width), o.save(), o.globalAlpha = i.alpha, n.glow && (o.shadowColor = i.color, o.shadowBlur = i.size * 3), o.fillStyle = i.color, o.beginPath(), o.arc(i.x, i.y, i.size, 0, Math.PI * 2), o.fill(), o.restore();
      }
      requestAnimationFrame(r);
    }
  }
  return r(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const _ = {
  orbCount: 15,
  minSize: 50,
  maxSize: 150,
  colors: ["#ff4d6d", "#c77dff", "#48cae4", "#ffe66d"],
  speed: 0.5,
  glow: !0
};
function W(e, l = {}) {
  const n = u(_, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    const r = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * e.width,
      y: Math.random() * e.height,
      size: r,
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0
    };
  }
  for (let r = 0; r < n.orbCount; r++) {
    const t = d();
    t.alpha = Math.random() * 0.5 + 0.1, a.push(t);
  }
  function c() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height);
      for (let r = 0; r < a.length; r++) {
        const t = a[r];
        t.x += t.vx, t.y += t.vy, t.x < -t.size && (t.x = e.width + t.size), t.x > e.width + t.size && (t.x = -t.size), t.y < -t.size && (t.y = e.height + t.size), t.y > e.height + t.size && (t.y = -t.size), o.save(), o.globalAlpha = t.alpha, o.globalCompositeOperation = "screen";
        const i = o.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size);
        i.addColorStop(0, t.color), i.addColorStop(1, "rgba(0,0,0,0)"), o.fillStyle = i, o.beginPath(), o.arc(t.x, t.y, t.size, 0, Math.PI * 2), o.fill(), o.restore();
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const G = {
  density: 0.02,
  minSpeed: 10,
  maxSpeed: 25,
  colors: ["#ffffff", "#e7c6ff", "#48cae4", "#ffe66d"],
  glow: !0
};
function N(e, l = {}) {
  const n = u(G, l), o = e.getContext("2d"), a = [];
  let f = !0;
  function d() {
    return {
      x: Math.random() * e.width * 1.5,
      y: -50,
      length: 50 + Math.random() * 100,
      thickness: 1 + Math.random() * 2,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      // Roughly 45 degrees
      opacity: 1
    };
  }
  function c() {
    if (f) {
      o.clearRect(0, 0, e.width, e.height), Math.random() < n.density && a.push(d());
      for (let r = a.length - 1; r >= 0; r--) {
        const t = a[r], i = -Math.cos(t.angle) * t.speed, h = Math.sin(t.angle) * t.speed;
        t.x += i, t.y += h, t.opacity -= 0.01, o.save(), o.globalAlpha = Math.max(0, t.opacity), n.glow && (o.shadowColor = t.color, o.shadowBlur = t.thickness * 4);
        const s = o.createLinearGradient(t.x, t.y, t.x - i * (t.length / t.speed), t.y - h * (t.length / t.speed));
        s.addColorStop(0, t.color), s.addColorStop(1, "rgba(255,255,255,0)"), o.strokeStyle = s, o.lineWidth = t.thickness, o.lineCap = "round", o.beginPath(), o.moveTo(t.x, t.y), o.lineTo(t.x - i * (t.length / t.speed), t.y - h * (t.length / t.speed)), o.stroke(), o.restore(), (t.opacity <= 0 || t.x < -100 || t.y > e.height + 100) && a.splice(r, 1);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    f = !1, o.clearRect(0, 0, e.width, e.height);
  };
}
const M = /* @__PURE__ */ new Map();
let J = 0;
function p(e, l, n = {}) {
  const { canvas: o, destroy: a } = b(e, n), f = l(o, n), d = ++J;
  return M.set(d, { destroy: a, stop: f }), d;
}
function K(e) {
  if (M.has(e)) {
    const l = M.get(e);
    typeof l.stop == "function" && l.stop(), l.destroy(), M.delete(e);
  }
}
function Q() {
  M.forEach((e) => {
    typeof e.stop == "function" && e.stop(), e.destroy();
  }), M.clear();
}
function V(e, l = {}) {
  return p(e, C, l);
}
function Z(e, l = {}) {
  return p(e, T, l);
}
function tt(e, l = {}) {
  return p(e, F, l);
}
function et(e, l = {}) {
  return p(e, k, l);
}
function ot(e, l = {}) {
  return p(e, E, l);
}
function nt(e, l = {}) {
  return p(e, O, l);
}
function it(e, l = {}) {
  return p(e, v, l);
}
function at(e, l = {}) {
  return p(e, U, l);
}
function rt(e, l = {}) {
  return p(e, H, l);
}
function lt(e, l = {}) {
  return p(e, j, l);
}
function ht(e, l = {}) {
  return p(e, W, l);
}
function st(e, l = {}) {
  return p(e, N, l);
}
const ft = {
  startFloatingHearts: V,
  startHeartTrail: Z,
  startHeartBurst: tt,
  startSparkles: et,
  startLoveRain: ot,
  startConfetti: nt,
  startFireworks: it,
  startStarField: at,
  startButterflies: rt,
  startMagicDust: lt,
  startFloatingOrbs: ht,
  startShootingStars: st,
  stopAnimation: K,
  stopAll: Q
};
export {
  ft as default,
  rt as startButterflies,
  nt as startConfetti,
  it as startFireworks,
  V as startFloatingHearts,
  ht as startFloatingOrbs,
  tt as startHeartBurst,
  Z as startHeartTrail,
  ot as startLoveRain,
  lt as startMagicDust,
  st as startShootingStars,
  et as startSparkles,
  at as startStarField,
  Q as stopAll,
  K as stopAnimation
};
//# sourceMappingURL=romantic-animations.es.js.map
