const I = {
  zIndex: 0
};
function k(o, a = {}) {
  const n = Object.assign({}, I, a), e = typeof o == "string" ? document.getElementById(o) : o;
  if (!e)
    throw new Error(
      `[romantic-animations] Container "${o}" not found in the DOM.`
    );
  const r = e.querySelector("canvas[data-ra]");
  r && r.remove();
  const h = document.createElement("canvas");
  h.setAttribute("data-ra", "1"), h.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: ${n.zIndex};
  `;
  const d = () => {
    h.width = window.innerWidth, h.height = window.innerHeight;
  };
  d(), e.style.position = e.style.position || "relative", e.appendChild(h);
  const c = new ResizeObserver(d);
  c.observe(e);
  const l = h.getContext("2d");
  function i() {
    c.disconnect(), h.remove();
  }
  return { canvas: h, ctx: l, options: n, destroy: i };
}
function p(o, a = {}) {
  return Object.assign({}, o, a);
}
const B = {
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
function D(o, a, n, e, r, h = 1, d = !1) {
  o.save(), o.globalAlpha = h, d && (o.shadowColor = r, o.shadowBlur = e * 1.2), o.fillStyle = r, o.beginPath(), o.moveTo(a, n + e * 0.3), o.bezierCurveTo(a - e * 1.1, n - e * 0.5, a - e * 1.6, n + e * 0.5, a, n + e * 1.4), o.bezierCurveTo(a + e * 1.6, n + e * 0.5, a + e * 1.1, n - e * 0.5, a, n + e * 0.3), o.fill(), o.restore();
}
function L(o, a = {}) {
  const n = p(B, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    const l = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: o.height + l * 2,
      size: l,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0.7 + Math.random() * 0.3,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmount: 0.5 + Math.random() * 1.5
    };
  }
  function c() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height), Math.random() < n.count && r.push(d());
      for (let l = r.length - 1; l >= 0; l--) {
        const i = r[l];
        i.y -= i.speed, i.wobbleOffset += i.wobbleSpeed;
        const t = n.wobble ? Math.sin(i.wobbleOffset) * i.wobbleAmount * i.size * 0.5 : 0, s = Math.min(i.alpha, i.y / (o.height * 0.2));
        if (s <= 0 || i.y < -i.size * 3) {
          r.splice(l, 1);
          continue;
        }
        D(e, i.x + t, i.y, i.size, i.color, Math.max(0, s), n.glow);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const E = {
  minSize: 6,
  maxSize: 16,
  decay: 0.025,
  colors: ["#ff6b8a", "#ff4d6d", "#ff85a1", "#ffc2d1", "#c9184a"],
  glow: !0
};
function q(o, a, n, e, r, h, d) {
  o.save(), o.globalAlpha = Math.max(0, h), d && (o.shadowColor = r, o.shadowBlur = e * 2), o.fillStyle = r, o.beginPath(), o.moveTo(a, n + e * 0.3), o.bezierCurveTo(a - e * 1.1, n - e * 0.5, a - e * 1.6, n + e * 0.5, a, n + e * 1.4), o.bezierCurveTo(a + e * 1.6, n + e * 0.5, a + e * 1.1, n - e * 0.5, a, n + e * 0.3), o.fill(), o.restore();
}
function Y(o, a = {}) {
  const n = p(E, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d(t, s) {
    r.push({
      x: t,
      y: s,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: 0.9 + Math.random() * 0.1,
      decay: n.decay * (0.8 + Math.random() * 0.4),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      vy: -(0.3 + Math.random() * 0.6)
      // drift upward
    });
  }
  const c = (t) => {
    const s = o.getBoundingClientRect();
    d(t.clientX - s.left, t.clientY - s.top);
  }, l = (t) => {
    const s = o.getBoundingClientRect();
    Array.from(t.touches).forEach((f) => {
      d(f.clientX - s.left, f.clientY - s.top);
    });
  };
  window.addEventListener("mousemove", c), window.addEventListener("touchmove", l, { passive: !0 });
  function i() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height);
      for (let t = r.length - 1; t >= 0; t--) {
        const s = r[t];
        s.y += s.vy, q(e, s.x, s.y, s.size, s.color, s.alpha, n.glow), s.alpha -= s.decay, s.alpha <= 0 && r.splice(t, 1);
      }
      requestAnimationFrame(i);
    }
  }
  return i(), function() {
    h = !1, window.removeEventListener("mousemove", c), window.removeEventListener("touchmove", l), e.clearRect(0, 0, o.width, o.height);
  };
}
const $ = {
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
function O(o, a, n, e, r, h, d, c) {
  if (o.save(), o.globalAlpha = Math.max(0, d), c && (o.shadowColor = h, o.shadowBlur = r * 2), o.fillStyle = h, a === "star") {
    o.beginPath();
    for (let l = 0; l < 5; l++) {
      const i = Math.PI / 2 + l * 2 * Math.PI / 5, t = i + Math.PI / 5;
      l === 0 ? o.moveTo(n + r * Math.cos(i), e - r * Math.sin(i)) : o.lineTo(n + r * Math.cos(i), e - r * Math.sin(i)), o.lineTo(n + r * 0.4 * Math.cos(t), e - r * 0.4 * Math.sin(t));
    }
    o.closePath(), o.fill();
  } else if (a === "sparkle")
    for (let l = 0; l < 4; l++) {
      const i = l * Math.PI / 2;
      o.beginPath(), o.ellipse(n + Math.cos(i) * r * 0.5, e + Math.sin(i) * r * 0.5, r * 0.18, r * 0.7, i, 0, Math.PI * 2), o.fill();
    }
  else
    o.beginPath(), o.moveTo(n, e + r * 0.3), o.bezierCurveTo(n - r * 1.1, e - r * 0.5, n - r * 1.6, e + r * 0.5, n, e + r * 1.4), o.bezierCurveTo(n + r * 1.6, e + r * 0.5, n + r * 1.1, e - r * 0.5, n, e + r * 0.3), o.fill();
  o.restore();
}
function U(o, a = {}) {
  const n = p($, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d(t, s) {
    for (let f = 0; f < n.count; f++) {
      const m = Math.random() * Math.PI * 2, u = n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed);
      r.push({
        x: t,
        y: s,
        size: n.minSize + Math.random() * (n.maxSize - n.minSize),
        vx: Math.cos(m) * u,
        vy: Math.sin(m) * u,
        alpha: 1,
        decay: n.decay * (0.8 + Math.random() * 0.4),
        color: n.colors[Math.floor(Math.random() * n.colors.length)],
        symbol: n.symbols[Math.floor(Math.random() * n.symbols.length)]
      });
    }
  }
  const c = (t) => {
    const s = o.getBoundingClientRect();
    d(t.clientX - s.left, t.clientY - s.top);
  }, l = (t) => {
    const s = o.getBoundingClientRect();
    Array.from(t.changedTouches).forEach((f) => d(f.clientX - s.left, f.clientY - s.top));
  };
  window.addEventListener("click", c), window.addEventListener("touchend", l, { passive: !0 });
  function i() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height);
      for (let t = r.length - 1; t >= 0; t--) {
        const s = r[t];
        s.x += s.vx, s.y += s.vy, s.vy += n.gravity, s.alpha -= s.decay, O(e, s.symbol, s.x, s.y, s.size, s.color, s.alpha, n.glow), s.alpha <= 0 && r.splice(t, 1);
      }
      requestAnimationFrame(i);
    }
  }
  return i(), function() {
    h = !1, window.removeEventListener("click", c), window.removeEventListener("touchend", l), e.clearRect(0, 0, o.width, o.height);
  };
}
const X = {
  count: 80,
  // number of sparkles alive at once
  minSize: 2,
  maxSize: 6,
  speed: 0.5,
  twinkleSpeed: 0.04,
  colors: ["#fff", "#ffe4e8", "#ffb3c1", "#ff85a1", "#ffd6ff", "#e7c6ff"],
  glow: !0
};
function H(o, a = {}) {
  const n = p(X, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    return {
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: Math.random(),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: n.twinkleSpeed * (0.5 + Math.random()),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed
    };
  }
  for (let i = 0; i < n.count; i++) r.push(d());
  function c(i) {
    e.save(), e.globalAlpha = Math.max(0, Math.min(1, i.alpha)), n.glow && (e.shadowColor = i.color, e.shadowBlur = i.size * 3), e.fillStyle = i.color;
    const t = i.size;
    e.beginPath();
    for (let s = 0; s < 4; s++) {
      const f = s * Math.PI / 2;
      e.ellipse(
        i.x + Math.cos(f) * t * 0.35,
        i.y + Math.sin(f) * t * 0.35,
        t * 0.15,
        t * 0.7,
        f,
        0,
        Math.PI * 2
      );
    }
    e.fill(), e.beginPath(), e.arc(i.x, i.y, t * 0.2, 0, Math.PI * 2), e.fill(), e.restore();
  }
  function l() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height);
      for (let i = 0; i < r.length; i++) {
        const t = r[i];
        t.x += t.vx, t.y += t.vy, t.alpha += t.alphaDir * t.twinkleSpeed, t.alpha >= 1 ? (t.alpha = 1, t.alphaDir = -1) : t.alpha <= 0 && (t.alpha = 0, t.alphaDir = 1), t.x < -10 && (t.x = o.width + 10), t.x > o.width + 10 && (t.x = -10), t.y < -10 && (t.y = o.height + 10), t.y > o.height + 10 && (t.y = -10), c(t);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const W = {
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
function j(o, a = {}) {
  const n = p(W, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    const l = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: -l * 2,
      size: l,
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
    if (h) {
      e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(d());
      for (let l = r.length - 1; l >= 0; l--) {
        const i = r[l];
        i.y += i.speed, i.wobble += i.wobbleSpeed;
        const t = Math.sin(i.wobble) * i.size * 0.3;
        e.save(), e.globalAlpha = i.alpha * n.opacity, e.font = `${i.size}px serif`, e.fillStyle = i.color, n.glow && (e.shadowColor = i.color, e.shadowBlur = i.size * 0.8), e.translate(i.x + t, i.y), e.rotate(i.angle), e.fillText(i.symbol, 0, 0), e.restore(), i.y > o.height + i.size * 2 && r.splice(l, 1);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const G = {
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
function _(o, a = {}) {
  const n = p(G, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize), t = n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed);
    return {
      x: Math.random() * o.width,
      y: -i * 2,
      w: i,
      h: i * (0.4 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 3,
      vy: t,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.15,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0.8 + Math.random() * 0.2,
      shape: n.shapes[Math.floor(Math.random() * n.shapes.length)]
    };
  }
  function c(i) {
    e.save(), e.globalAlpha = i.alpha, e.fillStyle = i.color, e.strokeStyle = i.color, e.translate(i.x, i.y), e.rotate(i.angle), i.shape === "circle" ? (e.beginPath(), e.ellipse(0, 0, i.w / 2, i.h / 2, 0, 0, Math.PI * 2), e.fill()) : i.shape === "ribbon" ? (e.beginPath(), e.moveTo(-i.w / 2, 0), e.quadraticCurveTo(0, -i.h, i.w / 2, 0), e.quadraticCurveTo(0, i.h, -i.w / 2, 0), e.fill()) : e.fillRect(-i.w / 2, -i.h / 2, i.w, i.h), e.restore();
  }
  function l() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(d());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.vy += n.gravity, t.vx *= n.drag, t.vy *= n.drag, t.x += t.vx, t.y += t.vy, t.angle += t.spin, c(t), t.y > o.height + 20 && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const N = {
  interval: 1200,
  // ms between auto-launches
  trailLength: 28,
  particleCount: 80,
  colors: ["#ff6b8a", "#ff4d6d", "#ffd6ff", "#e7c6ff", "#ffe66d", "#06d6a0", "#48cae4", "#ffffff"],
  gravity: 0.09,
  decay: 0.014,
  glow: !0
};
function Z(o, a = {}) {
  const n = p(N, a), e = o.getContext("2d");
  let r = !0;
  const h = [], d = [];
  function c() {
    const s = o.width * (0.2 + Math.random() * 0.6), f = o.height * (0.1 + Math.random() * 0.4), m = 8 + Math.random() * 5, u = n.colors[Math.floor(Math.random() * n.colors.length)];
    h.push({ x: s, y: o.height, vy: -Math.abs(m), targetY: f, trail: [], color: u });
  }
  function l(s, f, m) {
    for (let u = 0; u < n.particleCount; u++) {
      const z = Math.random() * Math.PI * 2, w = 1 + Math.random() * 5;
      d.push({
        x: s,
        y: f,
        vx: Math.cos(z) * w,
        vy: Math.sin(z) * w,
        alpha: 1,
        decay: n.decay * (0.7 + Math.random() * 0.6),
        size: 2 + Math.random() * 3,
        color: m
      });
    }
  }
  const i = setInterval(() => {
    r && c();
  }, n.interval);
  c();
  function t() {
    if (r) {
      e.clearRect(0, 0, o.width, o.height);
      for (let s = h.length - 1; s >= 0; s--) {
        const f = h[s];
        f.y += f.vy, f.trail.push({ x: f.x, y: f.y }), f.trail.length > n.trailLength && f.trail.shift();
        for (let m = 0; m < f.trail.length; m++) {
          const u = m / f.trail.length * 0.8;
          e.save(), e.globalAlpha = u, n.glow && (e.shadowColor = f.color, e.shadowBlur = 6), e.fillStyle = f.color, e.beginPath(), e.arc(f.trail[m].x, f.trail[m].y, 2.5 * (m / f.trail.length), 0, Math.PI * 2), e.fill(), e.restore();
        }
        f.y <= f.targetY && (l(f.x, f.y, f.color), h.splice(s, 1));
      }
      for (let s = d.length - 1; s >= 0; s--) {
        const f = d[s];
        f.x += f.vx, f.y += f.vy, f.vy += n.gravity, f.alpha -= f.decay, e.save(), e.globalAlpha = Math.max(0, f.alpha), n.glow && (e.shadowColor = f.color, e.shadowBlur = f.size * 2), e.fillStyle = f.color, e.beginPath(), e.arc(f.x, f.y, f.size, 0, Math.PI * 2), e.fill(), e.restore(), f.alpha <= 0 && d.splice(s, 1);
      }
      requestAnimationFrame(t);
    }
  }
  return t(), function() {
    r = !1, clearInterval(i), e.clearRect(0, 0, o.width, o.height);
  };
}
const J = {
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
function K(o, a = {}) {
  const n = p(J, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d(l = !1) {
    return {
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      alpha: 0.3 + Math.random() * 0.7,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: 8e-3 + Math.random() * 0.015,
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed,
      color: n.colors[Math.floor(Math.random() * n.colors.length)]
    };
  }
  for (let l = 0; l < n.starCount; l++) r.push(d(!0));
  function c() {
    if (h) {
      if (e.clearRect(0, 0, o.width, o.height), n.connectDist > 0)
        for (let l = 0; l < r.length; l++)
          for (let i = l + 1; i < r.length; i++) {
            const t = r[l].x - r[i].x, s = r[l].y - r[i].y, f = Math.sqrt(t * t + s * s);
            f < n.connectDist && (e.save(), e.globalAlpha = n.connectOpacity * (1 - f / n.connectDist), e.strokeStyle = "#ffffff", e.lineWidth = 0.5, e.beginPath(), e.moveTo(r[l].x, r[l].y), e.lineTo(r[i].x, r[i].y), e.stroke(), e.restore());
          }
      for (let l = 0; l < r.length; l++) {
        const i = r[l];
        i.x += i.vx, i.y += i.vy, n.twinkle && (i.alpha += i.alphaDir * i.twinkleSpeed, i.alpha >= 1 && (i.alpha = 1, i.alphaDir = -1), i.alpha <= 0.1 && (i.alpha = 0.1, i.alphaDir = 1)), i.x < -5 && (i.x = o.width + 5), i.x > o.width + 5 && (i.x = -5), i.y < -5 && (i.y = o.height + 5), i.y > o.height + 5 && (i.y = -5), e.save(), e.globalAlpha = i.alpha, e.shadowColor = i.color, e.shadowBlur = i.size * 3, e.fillStyle = i.color, e.beginPath(), e.arc(i.x, i.y, i.size, 0, Math.PI * 2), e.fill(), e.restore();
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const Q = {
  density: 0.05,
  // Spawn probability per frame
  colors: ["#c77dff", "#ff85a1", "#ffc2d1", "#48cae4", "#e7c6ff", "#fbb1bd"],
  minSize: 10,
  maxSize: 22,
  minSpeed: 0.8,
  maxSpeed: 2.2,
  glow: !0
};
function V(o, a = {}) {
  const n = p(Q, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: -i * 2,
      y: o.height * 0.1 + Math.random() * (o.height * 0.8),
      size: i,
      speed: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0,
      flapSpeed: 0.1 + Math.random() * 0.15,
      flapOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      wobbleOffset: Math.random() * Math.PI * 2
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.x += t.speed, t.y += Math.sin(d * t.wobbleSpeed + t.wobbleOffset) * 1.5, t.alpha < 1 && t.x < o.width / 2 && (t.alpha += 0.02);
        const s = Math.abs(Math.sin(d * t.flapSpeed + t.flapOffset));
        e.save(), e.globalAlpha = Math.min(1, t.alpha), e.translate(t.x, t.y), e.rotate(-0.1 - s * 0.1), n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 1.5), e.fillStyle = t.color, e.beginPath(), e.ellipse(-t.size * 0.2, 0, t.size * 0.4 * s, t.size * 0.5, 0.3, 0, Math.PI * 2), e.fill(), e.beginPath(), e.ellipse(t.size * 0.3 * s, -t.size * 0.1, t.size * 0.5 * s, t.size * 0.6, -0.2, 0, Math.PI * 2), e.fill(), e.restore(), t.x > o.width + t.size * 2 && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const v = {
  particleCount: 150,
  minSize: 1,
  maxSize: 4,
  colors: ["#ffd6ff", "#e7c6ff", "#c77dff", "#ffb3c1", "#ffffff"],
  speed: 0.8,
  glow: !0
};
function ee(o, a = {}) {
  const n = p(v, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    return {
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      angle: Math.random() * Math.PI * 2,
      orbitRadius: 20 + Math.random() * 80,
      orbitSpeed: (0.01 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1),
      centerX: Math.random() * o.width,
      centerY: o.height + 50,
      // Start below and move up
      upwardSpeed: n.speed + Math.random() * 1.5,
      alpha: 0
    };
  }
  for (let i = 0; i < n.particleCount; i++)
    r.push(c()), r[i].centerY = Math.random() * o.height, r[i].alpha = Math.random();
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height);
      for (let i = 0; i < r.length; i++) {
        const t = r[i];
        t.angle += t.orbitSpeed, t.centerY -= t.upwardSpeed, t.x = t.centerX + Math.cos(t.angle) * t.orbitRadius + Math.sin(d * 0.01 + t.angle) * 30, t.y = t.centerY + Math.sin(t.angle) * (t.orbitRadius * 0.5), t.alpha < 1 && t.centerY > 0 && (t.alpha += 0.01), t.y < -50 && (Object.assign(t, c()), t.centerY = o.height + 50, t.centerX = Math.random() * o.width), e.save(), e.globalAlpha = t.alpha, n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 3), e.fillStyle = t.color, e.beginPath(), e.arc(t.x, t.y, t.size, 0, Math.PI * 2), e.fill(), e.restore();
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const te = {
  orbCount: 15,
  minSize: 50,
  maxSize: 150,
  colors: ["#ff4d6d", "#c77dff", "#48cae4", "#ffe66d"],
  speed: 0.5,
  glow: !0
};
function oe(o, a = {}) {
  const n = p(te, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    const l = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      size: l,
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      alpha: 0
    };
  }
  for (let l = 0; l < n.orbCount; l++) {
    const i = d();
    i.alpha = Math.random() * 0.5 + 0.1, r.push(i);
  }
  function c() {
    if (h) {
      e.clearRect(0, 0, o.width, o.height);
      for (let l = 0; l < r.length; l++) {
        const i = r[l];
        i.x += i.vx, i.y += i.vy, i.x < -i.size && (i.x = o.width + i.size), i.x > o.width + i.size && (i.x = -i.size), i.y < -i.size && (i.y = o.height + i.size), i.y > o.height + i.size && (i.y = -i.size), e.save(), e.globalAlpha = i.alpha, e.globalCompositeOperation = "screen";
        const t = e.createRadialGradient(i.x, i.y, 0, i.x, i.y, i.size);
        t.addColorStop(0, i.color), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.beginPath(), e.arc(i.x, i.y, i.size, 0, Math.PI * 2), e.fill(), e.restore();
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const ie = {
  density: 0.02,
  minSpeed: 10,
  maxSpeed: 25,
  colors: ["#ffffff", "#e7c6ff", "#48cae4", "#ffe66d"],
  glow: !0
};
function ne(o, a = {}) {
  const n = p(ie, a), e = o.getContext("2d"), r = [];
  let h = !0;
  function d() {
    return {
      x: Math.random() * o.width * 1.5,
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
    if (h) {
      e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(d());
      for (let l = r.length - 1; l >= 0; l--) {
        const i = r[l], t = -Math.cos(i.angle) * i.speed, s = Math.sin(i.angle) * i.speed;
        i.x += t, i.y += s, i.opacity -= 0.01, e.save(), e.globalAlpha = Math.max(0, i.opacity), n.glow && (e.shadowColor = i.color, e.shadowBlur = i.thickness * 4);
        const f = e.createLinearGradient(i.x, i.y, i.x - t * (i.length / i.speed), i.y - s * (i.length / i.speed));
        f.addColorStop(0, i.color), f.addColorStop(1, "rgba(255,255,255,0)"), e.strokeStyle = f, e.lineWidth = i.thickness, e.lineCap = "round", e.beginPath(), e.moveTo(i.x, i.y), e.lineTo(i.x - t * (i.length / i.speed), i.y - s * (i.length / i.speed)), e.stroke(), e.restore(), (i.opacity <= 0 || i.x < -100 || i.y > o.height + 100) && r.splice(l, 1);
      }
      requestAnimationFrame(c);
    }
  }
  return c(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const re = {
  density: 0.08,
  colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd"],
  minSize: 15,
  maxSize: 30,
  minSpeed: 0.8,
  maxSpeed: 2,
  glow: !0
};
function ae(o, a = {}) {
  const n = p(re, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: -i * 2,
      size: i,
      speedY: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      speedX: (Math.random() - 0.5) * 1.5,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      flipSpeed: 0.02 + Math.random() * 0.04,
      flipPhase: Math.random() * Math.PI * 2
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.y += t.speedY, t.x += t.speedX + Math.sin(d * 0.02 + t.flipPhase) * 0.5, t.rotation += t.rotationSpeed;
        const s = Math.sin(d * t.flipSpeed + t.flipPhase);
        e.save(), e.translate(t.x, t.y), e.rotate(t.rotation), e.scale(1, Math.abs(s)), n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size), e.fillStyle = t.color, e.beginPath(), e.moveTo(0, t.size * -0.5), e.bezierCurveTo(t.size * 0.5, t.size * -0.5, t.size * 0.8, t.size * 0.2, 0, t.size * 0.5), e.bezierCurveTo(t.size * -0.8, t.size * 0.2, t.size * -0.5, t.size * -0.5, 0, t.size * -0.5), e.fill(), e.restore(), t.y > o.height + t.size * 2 && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const le = {
  density: 0.02,
  colors: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#ff9f1c"],
  minSize: 30,
  maxSize: 60,
  minSpeed: 0.5,
  maxSpeed: 1.5,
  glow: !1
};
function se(o, a = {}) {
  const n = p(le, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: o.height + i * 3,
      size: i,
      speedY: n.minSpeed + Math.random() * (n.maxSpeed - n.minSpeed),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      swaySpeed: 0.01 + Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.y -= t.speedY;
        const s = Math.sin(d * t.swaySpeed + t.swayOffset) * (t.size * 0.5);
        e.save(), e.translate(t.x + s, t.y), n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 0.5), e.beginPath(), e.moveTo(0, t.size), e.bezierCurveTo(t.size * 0.2, t.size * 1.5, t.size * -0.2, t.size * 2, 0, t.size * 3), e.strokeStyle = "rgba(255, 255, 255, 0.4)", e.lineWidth = 1.5, e.stroke(), e.fillStyle = t.color, e.beginPath(), e.moveTo(-t.size * 0.1, t.size * 1.1), e.lineTo(t.size * 0.1, t.size * 1.1), e.lineTo(0, t.size * 0.95), e.fill(), e.beginPath(), e.moveTo(0, t.size), e.bezierCurveTo(t.size * 1.1, t.size * 0.8, t.size * 1.1, -t.size, 0, -t.size), e.bezierCurveTo(-t.size * 1.1, -t.size, -t.size * 1.1, t.size * 0.8, 0, t.size), e.fill(), e.beginPath(), e.ellipse(-t.size * 0.3, -t.size * 0.4, t.size * 0.1, t.size * 0.2, -0.3, 0, Math.PI * 2), e.fillStyle = "rgba(255, 255, 255, 0.3)", e.fill(), e.restore(), t.y < -t.size * 4 && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const he = {
  density: 0.1,
  // controls number of nodes
  colors: ["#00f0ff", "#00b4d8", "#90e0ef"],
  speed: 1,
  minSize: 1,
  maxSize: 3,
  glow: !0
};
function de(o, a = {}) {
  const n = p(he, a), e = o.getContext("2d");
  let r = !0, h = 0;
  const d = [], c = Math.round(n.density * 300) + 50, l = Math.min(o.width, o.height) * 0.4, i = Math.PI * (3 - Math.sqrt(5));
  for (let s = 0; s < c; s++) {
    const f = 1 - s / (c - 1) * 2, m = Math.sqrt(1 - f * f), u = i * s, z = Math.cos(u) * m, w = Math.sin(u) * m;
    d.push({
      x: z,
      y: f,
      z: w,
      baseX: z,
      baseY: f,
      baseZ: w,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      color: n.colors[Math.floor(Math.random() * n.colors.length)]
    });
  }
  function t() {
    if (!r) return;
    h += 0.01 * n.speed, e.clearRect(0, 0, o.width, o.height);
    const s = o.width / 2, f = o.height / 2, m = Math.cos(h), u = Math.sin(h), z = 0.4, w = Math.cos(z), C = Math.sin(z), x = [];
    for (let S = 0; S < d.length; S++) {
      const M = d[S];
      let y = M.baseX * m - M.baseZ * u, b = M.baseZ * m + M.baseX * u, T = M.baseY, A = y, R = T * w - b * C, F = b * w + T * C;
      x.push({
        x: s + A * l,
        y: f + R * l,
        z: F,
        orig: M
      });
    }
    x.sort((S, M) => S.z - M.z);
    for (let S = 0; S < x.length; S++) {
      const M = x[S], y = Math.max(0.1, (M.z + 1) / 2);
      e.beginPath(), e.arc(M.x, M.y, M.orig.size * y, 0, Math.PI * 2), e.fillStyle = M.orig.color, e.globalAlpha = y, n.glow && (e.shadowBlur = 10 * y, e.shadowColor = M.orig.color), e.fill();
    }
    e.globalAlpha = 0.15, e.lineWidth = 1, e.shadowBlur = 0;
    for (let S = 0; S < x.length; S++) {
      const M = x[S];
      if (!(M.z < 0))
        for (let y = S + 1; y < x.length; y++) {
          const b = x[y];
          if (b.z < 0) continue;
          (M.x - b.x) ** 2 + (M.y - b.y) ** 2 + (M.z * l - b.z * l) ** 2 < (l * 0.4) ** 2 && (e.beginPath(), e.moveTo(M.x, M.y), e.lineTo(b.x, b.y), e.strokeStyle = M.orig.color, e.stroke());
        }
    }
    e.globalAlpha = 1, requestAnimationFrame(t);
  }
  return t(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const fe = {
  density: 0.15,
  colors: ["#ffb7b2", "#ffdac1", "#e2f0cb", "#ff9aa2"],
  minSize: 8,
  maxSize: 18,
  speed: 1.5,
  wind: 2,
  glow: !1
};
function ce(o, a = {}) {
  const n = p(fe, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * (o.width + 200) - 100,
      y: -i * 2,
      size: i,
      speedY: (1 + Math.random()) * n.speed,
      speedX: Math.random() - 0.5 + n.wind,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.05 + Math.random() * 0.05
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.y += t.speedY, t.x += t.speedX + Math.sin(d * 0.05 + t.flip) * 1.5, t.rotation += t.rotationSpeed, t.flip += t.flipSpeed;
        const s = Math.abs(Math.sin(t.flip));
        e.save(), e.translate(t.x, t.y), e.rotate(t.rotation), e.scale(1, s), n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size), e.fillStyle = t.color, e.beginPath(), e.moveTo(0, t.size * -0.5), e.bezierCurveTo(t.size * 0.6, t.size * -0.8, t.size * 0.8, t.size * 0.4, 0, t.size * 0.6), e.bezierCurveTo(t.size * -0.8, t.size * 0.4, t.size * -0.6, t.size * -0.8, 0, t.size * -0.5), e.lineTo(0, t.size * -0.3), e.fill(), e.restore(), (t.y > o.height + t.size * 2 || t.x > o.width + t.size * 2) && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const me = {
  density: 0.05,
  colors: ["#e9ff70", "#d4ff00", "#f9f871"],
  minSize: 2,
  maxSize: 6,
  speed: 1,
  glow: !0
};
function ue(o, a = {}) {
  const n = p(me, a), e = o.getContext("2d");
  let r = !0;
  const h = Math.round(n.density * 200) + 20, d = [];
  for (let i = 0; i < h; i++)
    d.push({
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      vx: (Math.random() - 0.5) * n.speed,
      vy: (Math.random() - 0.5) * n.speed,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      blinkPhase: Math.random() * Math.PI * 2,
      blinkSpeed: 0.02 + Math.random() * 0.03,
      roamPhase: Math.random() * Math.PI * 2
    });
  let c = 0;
  function l() {
    if (r) {
      c++, e.clearRect(0, 0, o.width, o.height);
      for (let i = 0; i < d.length; i++) {
        const t = d[i];
        t.vx += Math.sin(c * 0.01 + t.roamPhase) * 0.05, t.vy += Math.cos(c * 0.015 + t.roamPhase) * 0.05;
        const s = n.speed * 2;
        t.vx = Math.max(-s, Math.min(s, t.vx)), t.vy = Math.max(-s, Math.min(s, t.vy)), t.x += t.vx, t.y += t.vy, t.x < -20 && (t.x = o.width + 20), t.x > o.width + 20 && (t.x = -20), t.y < -20 && (t.y = o.height + 20), t.y > o.height + 20 && (t.y = -20);
        const f = (Math.sin(c * t.blinkSpeed + t.blinkPhase) + 1) / 2;
        e.save(), e.globalAlpha = f, e.fillStyle = t.color, n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 3), e.beginPath(), e.arc(t.x, t.y, t.size, 0, Math.PI * 2), e.fill(), e.restore();
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const pe = {
  density: 0.2,
  // controls number of flakes
  colors: ["#ffffff", "#e0f7fa"],
  minSize: 1,
  maxSize: 4,
  speed: 1,
  wind: 0.5,
  glow: !1
};
function ge(o, a = {}) {
  const n = p(pe, a), e = o.getContext("2d");
  let r = !0;
  const h = Math.round(n.density * 500) + 50, d = [];
  for (let i = 0; i < h; i++)
    d.push({
      x: Math.random() * o.width,
      y: Math.random() * o.height,
      // pre-populate screen
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      speedY: (0.5 + Math.random() * 1.5) * n.speed,
      speedX: n.wind + (Math.random() - 0.5) * 0.5,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02
    });
  let c = 0;
  function l() {
    if (r) {
      c++, e.clearRect(0, 0, o.width, o.height);
      for (let i = 0; i < d.length; i++) {
        const t = d[i];
        t.y += t.speedY, t.x += t.speedX + Math.sin(c * t.swaySpeed + t.swayPhase) * 0.5, t.y > o.height + t.size && (t.y = -t.size, t.x = Math.random() * o.width), t.x > o.width + t.size ? t.x = -t.size : t.x < -t.size && (t.x = o.width + t.size), e.beginPath(), e.arc(t.x, t.y, t.size, 0, Math.PI * 2), e.fillStyle = t.color, n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 2), e.globalAlpha = 0.8, e.fill();
      }
      e.globalAlpha = 1, requestAnimationFrame(l);
    }
  }
  return l(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const Me = {
  density: 0.1,
  // fraction of columns
  colors: ["#0f0", "#00ff41"],
  minSize: 14,
  // font size
  maxSize: 22,
  speed: 1,
  glow: !0
};
function ze(o, a = {}) {
  const n = p(Me, a), e = o.getContext("2d");
  let r = !0;
  const h = (n.minSize + n.maxSize) / 2, d = Math.floor(o.width / h), c = [], l = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""'#&_(),.;:?!\\|{}<>[]^~`;
  for (let t = 0; t < d; t++)
    c[t] = Math.random() * -100;
  function i() {
    if (r) {
      e.fillStyle = "rgba(0, 0, 0, 0.1)", e.fillRect(0, 0, o.width, o.height), e.font = `${h}px monospace`;
      for (let t = 0; t < c.length; t++) {
        if (Math.random() > n.density && c[t] < 0) continue;
        const s = l.charAt(Math.floor(Math.random() * l.length)), f = n.colors[Math.floor(Math.random() * n.colors.length)];
        e.fillStyle = f, n.glow ? (e.shadowBlur = 5, e.shadowColor = f) : e.shadowBlur = 0, e.fillText(s, t * h, c[t] * h), c[t] * h > o.height && Math.random() > 0.95 && (c[t] = 0), c[t] += n.speed * 0.5;
      }
      setTimeout(() => {
        r && requestAnimationFrame(i);
      }, 50);
    }
  }
  return i(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const we = {
  density: 0.1,
  colors: ["#e76f51", "#f4a261", "#e9c46a", "#d62828"],
  minSize: 10,
  maxSize: 25,
  speed: 1.5,
  glow: !1
};
function Se(o, a = {}) {
  const n = p(we, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * (o.width + 200) - 100,
      y: -i * 2,
      size: i,
      speedY: (0.8 + Math.random() * 1.5) * n.speed,
      speedX: (Math.random() - 0.5) * 2,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      flipPhase: Math.random() * Math.PI * 2,
      flipSpeed: 0.05 + Math.random() * 0.05
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.y += t.speedY, t.x += t.speedX + Math.sin(d * 0.03 + t.flipPhase) * 2, t.rotation += t.rotationSpeed;
        const s = Math.sin(d * t.flipSpeed + t.flipPhase);
        e.save(), e.translate(t.x, t.y), e.rotate(t.rotation), e.scale(1, Math.max(0.1, Math.abs(s))), n.glow && (e.shadowColor = t.color, e.shadowBlur = t.size * 0.5), e.fillStyle = t.color, e.beginPath(), e.moveTo(0, t.size * -0.6), e.bezierCurveTo(t.size * 0.5, t.size * -0.5, t.size * 0.6, t.size * 0.2, 0, t.size * 0.6), e.bezierCurveTo(t.size * -0.6, t.size * 0.2, t.size * -0.5, t.size * -0.5, 0, t.size * -0.6), e.fill(), e.beginPath(), e.moveTo(0, t.size * 0.5), e.lineTo(0, t.size * 0.8), e.strokeStyle = "#3e2723", e.lineWidth = Math.max(1, t.size * 0.05), e.stroke(), e.restore(), (t.y > o.height + t.size * 2 || t.x > o.width + t.size * 2) && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const ye = {
  density: 0.05,
  colors: ["rgba(255,255,255,0.4)", "rgba(230,240,255,0.5)", "rgba(255,230,250,0.5)"],
  minSize: 10,
  maxSize: 35,
  speed: 1,
  glow: !1
};
function be(o, a = {}) {
  const n = p(ye, a), e = o.getContext("2d"), r = [];
  let h = !0, d = 0;
  function c() {
    const i = n.minSize + Math.random() * (n.maxSize - n.minSize);
    return {
      x: Math.random() * o.width,
      y: o.height + i * 2,
      size: i,
      speedY: (0.5 + Math.random()) * n.speed,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobblePhase: Math.random() * Math.PI * 2,
      color: n.colors[Math.floor(Math.random() * n.colors.length)],
      highlightPhase: Math.random() * Math.PI * 2
    };
  }
  function l() {
    if (h) {
      d++, e.clearRect(0, 0, o.width, o.height), Math.random() < n.density && r.push(c());
      for (let i = r.length - 1; i >= 0; i--) {
        const t = r[i];
        t.y -= t.speedY;
        const s = Math.sin(d * t.wobbleSpeed + t.wobblePhase) * (t.size * 0.3), f = Math.cos(d * t.wobbleSpeed * 1.5 + t.wobblePhase) * (t.size * 0.1);
        e.save(), e.translate(t.x + s, t.y + f), n.glow && (e.shadowColor = "#fff", e.shadowBlur = t.size * 0.5), e.beginPath(), e.arc(0, 0, t.size, 0, Math.PI * 2), e.fillStyle = t.color, e.fill(), e.strokeStyle = "rgba(255, 255, 255, 0.6)", e.lineWidth = 1, e.stroke();
        const m = -t.size * 0.3, u = -t.size * 0.3;
        e.beginPath(), e.ellipse(m, u, t.size * 0.4, t.size * 0.2, -Math.PI / 4, 0, Math.PI * 2), e.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(d * 0.05 + t.highlightPhase) * 0.2})`, e.fill(), e.beginPath(), e.arc(t.size * 0.4, t.size * 0.4, t.size * 0.2, 0, Math.PI * 2), e.fillStyle = "rgba(255, 255, 255, 0.15)", e.fill(), e.restore(), t.y < -t.size * 3 && r.splice(i, 1);
      }
      requestAnimationFrame(l);
    }
  }
  return l(), function() {
    h = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const xe = {
  density: 0.15,
  colors: ["#c77dff", "#7b2cbf", "#e0aaff", "#9d4edd", "#ffffff"],
  minSize: 1,
  maxSize: 3,
  speed: 1,
  glow: !0
};
function Pe(o, a = {}) {
  const n = p(xe, a), e = o.getContext("2d");
  let r = !0;
  const h = [], d = Math.round(n.density * 500) + 100, c = o.width / 2, l = o.height / 2, i = Math.max(o.width, o.height) * 0.7;
  function t() {
    return {
      angle: Math.random() * Math.PI * 2,
      r: i,
      size: n.minSize + Math.random() * (n.maxSize - n.minSize),
      speed: (1 + Math.random() * 2) * n.speed,
      color: n.colors[Math.floor(Math.random() * n.colors.length)]
    };
  }
  for (let f = 0; f < d; f++) {
    const m = t();
    m.r = Math.random() * i, h.push(m);
  }
  function s() {
    if (r) {
      e.fillStyle = "rgba(0, 0, 0, 0.2)", e.fillRect(0, 0, o.width, o.height);
      for (let f = 0; f < h.length; f++) {
        const m = h[f];
        m.r -= m.speed * (1 + (i - m.r) / i), m.angle += 0.02 + (i - m.r) / i * 0.1 * n.speed, m.r < 10 && (m.r = i, m.angle = Math.random() * Math.PI * 2);
        const u = c + Math.cos(m.angle) * m.r, z = l + Math.sin(m.angle) * m.r;
        e.beginPath(), e.arc(u, z, m.size, 0, Math.PI * 2), e.fillStyle = m.color, n.glow && (e.shadowColor = m.color, e.shadowBlur = m.size * 2), e.fill();
      }
      e.beginPath(), e.arc(c, l, 15, 0, Math.PI * 2), e.fillStyle = "#000", e.shadowBlur = 30, e.shadowColor = "#5a189a", e.fill(), e.shadowBlur = 0, requestAnimationFrame(s);
    }
  }
  return s(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const Ce = {
  density: 0.5,
  colors: ["#00ff9f", "#00b8ff", "#001eff", "#bd00ff", "#d600ff"],
  speed: 1,
  glow: !0
};
function Te(o, a = {}) {
  const n = p(Ce, a), e = o.getContext("2d");
  let r = !0, h = 0;
  function d() {
    if (r) {
      h += 0.01 * n.speed, e.clearRect(0, 0, o.width, o.height), e.globalCompositeOperation = "screen";
      for (let c = 0; c < 3; c++) {
        e.beginPath();
        const l = o.height * 0.3 + c * 100;
        for (let f = 0; f <= o.width; f += 20) {
          const m = Math.sin(f * 5e-3 + h * 2 + c) * 50, u = Math.cos(f * 0.01 - h * 1.5) * 40, z = Math.sin(f * 2e-3 + h) * 100, w = l + m + u + z;
          f === 0 ? e.moveTo(f, w) : e.lineTo(f, w);
        }
        e.lineTo(o.width, o.height), e.lineTo(0, o.height), e.closePath();
        const i = e.createLinearGradient(0, l - 100, 0, o.height);
        i.addColorStop(0, "rgba(0,0,0,0)");
        const t = n.colors[c * 2 % n.colors.length], s = n.colors[(c * 2 + 1) % n.colors.length];
        i.addColorStop(0.2, t), i.addColorStop(0.8, s), i.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = i, e.globalAlpha = 0.3 * n.density * 2, e.fill();
      }
      e.globalCompositeOperation = "source-over", e.globalAlpha = 1, requestAnimationFrame(d);
    }
  }
  return d(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const Ae = {
  density: 0.1,
  // controls flare sizes
  colors: ["rgba(255, 230, 200, 0.8)", "rgba(200, 220, 255, 0.6)"],
  speed: 1,
  glow: !0
};
function Re(o, a = {}) {
  const n = p(Ae, a), e = o.getContext("2d");
  let r = !0, h = 0;
  const d = { x: o.width * 0.2, y: o.height * 0.2 }, c = [
    { scale: 0.5, dist: 0.2, color: "rgba(0, 255, 100, 0.1)" },
    { scale: 1.2, dist: -0.4, color: "rgba(200, 100, 255, 0.15)" },
    { scale: 0.3, dist: 0.8, color: "rgba(255, 255, 255, 0.2)" },
    { scale: 0.8, dist: -1.2, color: "rgba(100, 200, 255, 0.1)" },
    { scale: 2, dist: 1.5, color: "rgba(255, 100, 50, 0.05)" },
    { scale: 0.1, dist: 1.1, color: "rgba(255, 255, 255, 0.4)" }
  ];
  function l() {
    if (!r) return;
    h += 0.01 * n.speed, e.clearRect(0, 0, o.width, o.height), e.globalCompositeOperation = "screen", d.x = o.width / 2 + Math.cos(h * 0.5) * (o.width * 0.4), d.y = o.height / 2 + Math.sin(h * 0.3) * (o.height * 0.4);
    const i = o.width / 2, t = o.height / 2, s = e.createRadialGradient(d.x, d.y, 0, d.x, d.y, 200 * n.density * 10);
    s.addColorStop(0, "#ffffff"), s.addColorStop(0.1, n.colors[0]), s.addColorStop(1, "rgba(0,0,0,0)"), e.beginPath(), e.arc(d.x, d.y, 1e3, 0, Math.PI * 2), e.fillStyle = s, e.fill(), e.beginPath(), e.ellipse(d.x, d.y, o.width, 4, 0, 0, Math.PI * 2), e.fillStyle = n.colors[1], e.fill();
    const f = i - d.x, m = t - d.y;
    for (const u of c) {
      const z = i + f * u.dist, w = t + m * u.dist, C = 100 * u.scale * n.density * 10;
      e.beginPath(), e.arc(z, w, C, 0, Math.PI * 2), e.fillStyle = u.color, e.fill(), u.scale > 0.5 && (e.beginPath(), e.arc(z, w, C * 1.2, 0, Math.PI * 2), e.strokeStyle = u.color, e.lineWidth = 2, e.stroke());
    }
    e.globalCompositeOperation = "source-over", requestAnimationFrame(l);
  }
  return l(), function() {
    r = !1, e.clearRect(0, 0, o.width, o.height);
  };
}
const P = /* @__PURE__ */ new Map();
let Fe = 0;
function g(o, a, n = {}) {
  const { canvas: e, destroy: r } = k(o, n), h = a(e, n), d = ++Fe;
  return P.set(d, { destroy: r, stop: h }), d;
}
function Ie(o) {
  if (P.has(o)) {
    const a = P.get(o);
    typeof a.stop == "function" && a.stop(), a.destroy(), P.delete(o);
  }
}
function ke() {
  P.forEach((o) => {
    typeof o.stop == "function" && o.stop(), o.destroy();
  }), P.clear();
}
function Be(o, a = {}) {
  return g(o, L, a);
}
function De(o, a = {}) {
  return g(o, Y, a);
}
function Le(o, a = {}) {
  return g(o, U, a);
}
function Ee(o, a = {}) {
  return g(o, H, a);
}
function qe(o, a = {}) {
  return g(o, j, a);
}
function Ye(o, a = {}) {
  return g(o, _, a);
}
function $e(o, a = {}) {
  return g(o, Z, a);
}
function Oe(o, a = {}) {
  return g(o, K, a);
}
function Ue(o, a = {}) {
  return g(o, V, a);
}
function Xe(o, a = {}) {
  return g(o, ee, a);
}
function He(o, a = {}) {
  return g(o, oe, a);
}
function We(o, a = {}) {
  return g(o, ne, a);
}
function je(o, a = {}) {
  return g(o, ae, a);
}
function Ge(o, a = {}) {
  return g(o, se, a);
}
function _e(o, a = {}) {
  return g(o, de, a);
}
function Ne(o, a = {}) {
  return g(o, ce, a);
}
function Ze(o, a = {}) {
  return g(o, ue, a);
}
function Je(o, a = {}) {
  return g(o, ge, a);
}
function Ke(o, a = {}) {
  return g(o, ze, a);
}
function Qe(o, a = {}) {
  return g(o, Se, a);
}
function Ve(o, a = {}) {
  return g(o, be, a);
}
function ve(o, a = {}) {
  return g(o, Pe, a);
}
function et(o, a = {}) {
  return g(o, Te, a);
}
function tt(o, a = {}) {
  return g(o, Re, a);
}
const ot = {
  startFloatingHearts: Be,
  startHeartTrail: De,
  startHeartBurst: Le,
  startSparkles: Ee,
  startLoveRain: qe,
  startConfetti: Ye,
  startFireworks: $e,
  startStarField: Oe,
  startButterflies: Ue,
  startMagicDust: Xe,
  startFloatingOrbs: He,
  startShootingStars: We,
  startRosePetals: je,
  startFloatingBalloons: Ge,
  startGlobeMovement: _e,
  startCherryBlossoms: Ne,
  startFireflies: Ze,
  startSnowStorm: Je,
  startMatrixRain: Ke,
  startAutumnLeaves: Qe,
  startBubbles: Ve,
  startBlackHole: ve,
  startAuroraBorealis: et,
  startLensFlares: tt,
  stopAnimation: Ie,
  stopAll: ke
};
export {
  ot as default,
  et as startAuroraBorealis,
  Qe as startAutumnLeaves,
  ve as startBlackHole,
  Ve as startBubbles,
  Ue as startButterflies,
  Ne as startCherryBlossoms,
  Ye as startConfetti,
  Ze as startFireflies,
  $e as startFireworks,
  Ge as startFloatingBalloons,
  Be as startFloatingHearts,
  He as startFloatingOrbs,
  _e as startGlobeMovement,
  Le as startHeartBurst,
  De as startHeartTrail,
  tt as startLensFlares,
  qe as startLoveRain,
  Xe as startMagicDust,
  Ke as startMatrixRain,
  je as startRosePetals,
  We as startShootingStars,
  Je as startSnowStorm,
  Ee as startSparkles,
  Oe as startStarField,
  ke as stopAll,
  Ie as stopAnimation
};
//# sourceMappingURL=romantic-animations.es.js.map
