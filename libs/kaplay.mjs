/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.37.0.
 * Original file: /npm/kaplay@3001.0.9/dist/kaplay.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e = Object.defineProperty,
  t = (t, s) => e(t, "name", { value: s, configurable: !0 }),
  s = (() => {
    for (var e = new Uint8Array(128), t = 0; t < 64; t++)
      e[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : 4 * t - 205] = t;
    return (t) => {
      for (
        var s = t.length,
          r = new Uint8Array(
            ((3 * (s - ("=" == t[s - 1]) - ("=" == t[s - 2]))) / 4) | 0
          ),
          n = 0,
          i = 0;
        n < s;

      ) {
        var a = e[t.charCodeAt(n++)],
          o = e[t.charCodeAt(n++)],
          l = e[t.charCodeAt(n++)],
          h = e[t.charCodeAt(n++)];
        (r[i++] = (a << 2) | (o >> 4)),
          (r[i++] = (o << 4) | (l >> 2)),
          (r[i++] = (l << 6) | h);
      }
      return r;
    };
  })(),
  r = class e {
    static {
      t(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, t, s) {
      (this.r = l(e, 0, 255)), (this.g = l(t, 0, 255)), (this.b = l(s, 0, 255));
    }
    static fromArray(t) {
      return new e(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if ("number" == typeof t)
        return new e((t >> 16) & 255, (t >> 8) & 255, 255 & t);
      if ("string" == typeof t) {
        let s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        if (!s) throw new Error("Invalid hex color format");
        return new e(
          parseInt(s[1], 16),
          parseInt(s[2], 16),
          parseInt(s[3], 16)
        );
      }
      throw new Error("Invalid hex color format");
    }
    static fromHSL(s, r, n) {
      if (0 == r) return new e(255 * n, 255 * n, 255 * n);
      let i = t(
          (e, t, s) => (
            s < 0 && (s += 1),
            s > 1 && (s -= 1),
            s < 1 / 6
              ? e + 6 * (t - e) * s
              : s < 0.5
              ? t
              : s < 2 / 3
              ? e + (t - e) * (2 / 3 - s) * 6
              : e
          ),
          "hue2rgb"
        ),
        a = n < 0.5 ? n * (1 + r) : n + r - n * r,
        o = 2 * n - a,
        l = i(o, a, s + 1 / 3),
        h = i(o, a, s),
        u = i(o, a, s - 1 / 3);
      return new e(
        Math.round(255 * l),
        Math.round(255 * h),
        Math.round(255 * u)
      );
    }
    static RED = new e(255, 0, 0);
    static GREEN = new e(0, 255, 0);
    static BLUE = new e(0, 0, 255);
    static YELLOW = new e(255, 255, 0);
    static MAGENTA = new e(255, 0, 255);
    static CYAN = new e(0, 255, 255);
    static WHITE = new e(255, 255, 255);
    static BLACK = new e(0, 0, 0);
    clone() {
      return new e(this.r, this.g, this.b);
    }
    lighten(t) {
      return new e(this.r + t, this.g + t, this.b + t);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new e(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new e(
        (this.r * t.r) / 255,
        (this.g * t.g) / 255,
        (this.b * t.b) / 255
      );
    }
    lerp(t, s) {
      return new e(h(this.r, t.r, s), h(this.g, t.g, s), h(this.b, t.b, s));
    }
    toHSL() {
      let e = this.r / 255,
        t = this.g / 255,
        s = this.b / 255,
        r = Math.max(e, t, s),
        n = Math.min(e, t, s),
        i = (r + n) / 2,
        a = i,
        o = i;
      if (r == n) i = a = 0;
      else {
        let l = r - n;
        switch (((a = o > 0.5 ? l / (2 - r - n) : l / (r + n)), r)) {
          case e:
            i = (t - s) / l + (t < s ? 6 : 0);
            break;
          case t:
            i = (s - e) / l + 2;
            break;
          case s:
            i = (e - t) / l + 4;
        }
        i /= 6;
      }
      return [i, a, o];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return (
        "#" +
        ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
          .toString(16)
          .slice(1)
      );
    }
    toArray() {
      return [this.r, this.g, this.b];
    }
  };
function n(...e) {
  if (0 === e.length) return new r(255, 255, 255);
  if (1 === e.length) {
    if (e[0] instanceof r) return e[0].clone();
    if ("string" == typeof e[0]) return r.fromHex(e[0]);
    if (Array.isArray(e[0]) && 3 === e[0].length) return r.fromArray(e[0]);
  } else if (2 === e.length) {
    if (e[0] instanceof r) return e[0].clone();
  } else if (3 === e.length || 4 === e.length) return new r(e[0], e[1], e[2]);
  throw new Error("Invalid color arguments");
}
t(n, "rgb");
var i = t((e, t, s) => r.fromHSL(e, t, s), "hsl2rgb");
function a(e) {
  return (e * Math.PI) / 180;
}
function o(e) {
  return (180 * e) / Math.PI;
}
function l(e, t, s) {
  return t > s ? l(e, s, t) : Math.min(Math.max(e, t), s);
}
function h(e, t, s) {
  if ("number" == typeof e && "number" == typeof t) return e + (t - e) * s;
  if (e instanceof c && t instanceof c) return e.lerp(t, s);
  if (e instanceof r && t instanceof r) return e.lerp(t, s);
  throw new Error(
    `Bad value for lerp(): ${e}, ${t}. Only number, Vec2 and Color is supported.`
  );
}
function u(e, t, s, r, n) {
  return r + ((e - t) / (s - t)) * (n - r);
}
function d(e, t, s, r, n) {
  return l(u(e, t, s, r, n), r, n);
}
t(a, "deg2rad"),
  t(o, "rad2deg"),
  t(l, "clamp"),
  t(h, "lerp"),
  t(u, "map"),
  t(d, "mapc");
var c = class e {
  static {
    t(this, "Vec2");
  }
  x = 0;
  y = 0;
  constructor(e = 0, t = e) {
    (this.x = e), (this.y = t);
  }
  static fromAngle(t) {
    let s = a(t);
    return new e(Math.cos(s), Math.sin(s));
  }
  static fromArray(t) {
    return new e(t[0], t[1]);
  }
  static ZERO = new e(0, 0);
  static ONE = new e(1, 1);
  static LEFT = new e(-1, 0);
  static RIGHT = new e(1, 0);
  static UP = new e(0, -1);
  static DOWN = new e(0, 1);
  clone() {
    return new e(this.x, this.y);
  }
  add(...t) {
    let s = f(...t);
    return new e(this.x + s.x, this.y + s.y);
  }
  sub(...t) {
    let s = f(...t);
    return new e(this.x - s.x, this.y - s.y);
  }
  scale(...t) {
    let s = f(...t);
    return new e(this.x * s.x, this.y * s.y);
  }
  dist(...e) {
    let t = f(...e);
    return this.sub(t).len();
  }
  sdist(...e) {
    let t = f(...e);
    return this.sub(t).slen();
  }
  static sdist(e, t) {
    let s = e.x - t.x,
      r = e.y - t.y;
    return s * s + r * r;
  }
  len() {
    return Math.sqrt(this.dot(this));
  }
  slen() {
    return this.dot(this);
  }
  unit() {
    let t = this.len();
    return 0 === t ? new e(0) : this.scale(1 / t);
  }
  normal() {
    return new e(this.y, -this.x);
  }
  reflect(e) {
    return this.sub(e.scale(2 * this.dot(e)));
  }
  project(e) {
    return e.scale(e.dot(this) / e.len());
  }
  reject(e) {
    return this.sub(this.project(e));
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  static dot(e, t) {
    return e.x * e.x + e.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  static cross(e, t) {
    return e.x * t.y - e.y * t.x;
  }
  angle(...e) {
    let t = f(...e);
    return o(Math.atan2(this.y - t.y, this.x - t.x));
  }
  angleBetween(...e) {
    let t = f(...e);
    return o(Math.atan2(this.cross(t), this.dot(t)));
  }
  lerp(t, s) {
    return new e(h(this.x, t.x, s), h(this.y, t.y, s));
  }
  slerp(e, t) {
    let s = this.dot(e),
      r = this.cross(e),
      n = Math.atan2(r, s);
    return this.scale(Math.sin((1 - t) * n))
      .add(e.scale(Math.sin(t * n)))
      .scale(1 / r);
  }
  isZero() {
    return 0 === this.x && 0 === this.y;
  }
  toFixed(t) {
    return new e(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
  }
  transform(e) {
    return e.multVec2(this);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y;
  }
  bbox() {
    return new ce(this, 0, 0);
  }
  toString() {
    return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
  toArray() {
    return [this.x, this.y];
  }
};
function f(...e) {
  if (1 === e.length) {
    if (e[0] instanceof c) return new c(e[0].x, e[0].y);
    if (Array.isArray(e[0]) && 2 === e[0].length) return new c(...e[0]);
  }
  return new c(...e);
}
t(f, "vec2");
var p = class e {
  static {
    t(this, "Quad");
  }
  x = 0;
  y = 0;
  w = 1;
  h = 1;
  constructor(e, t, s, r) {
    (this.x = e), (this.y = t), (this.w = s), (this.h = r);
  }
  scale(t) {
    return new e(
      this.x + this.w * t.x,
      this.y + this.h * t.y,
      this.w * t.w,
      this.h * t.h
    );
  }
  pos() {
    return new c(this.x, this.y);
  }
  clone() {
    return new e(this.x, this.y, this.w, this.h);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
  }
  toString() {
    return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
  }
};
function g(e, t, s, r) {
  return new p(e, t, s, r);
}
t(g, "quad");
var m = class e {
    static {
      t(this, "Mat2");
    }
    a;
    b;
    c;
    d;
    constructor(e, t, s, r) {
      (this.a = e), (this.b = t), (this.c = s), (this.d = r);
    }
    mul(t) {
      return new e(
        this.a * t.a + this.b * t.c,
        this.a * t.b + this.b * t.d,
        this.c * t.a + this.d * t.c,
        this.c * t.b + this.d * t.d
      );
    }
    transform(e) {
      return f(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let t = this.det;
      return new e(this.d / t, -this.b / t, -this.c / t, this.a / t);
    }
    get transpose() {
      return new e(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2,
        t = this.det;
      return [e + Math.sqrt(e * e - t), e - Math.sqrt(e * e - t)];
    }
    eigenvectors(e, t) {
      return 0 != this.c
        ? [
            [e - this.d, this.c],
            [t - this.d, this.c],
          ]
        : 0 != this.b
        ? [
            [this.b, e - this.a],
            [this.b, t - this.a],
          ]
        : Math.abs(this.transform(f(1, 0)).x - e) < Number.EPSILON
        ? [
            [1, 0],
            [0, 1],
          ]
        : [
            [0, 1],
            [1, 0],
          ];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(t) {
      let s = Math.cos(t),
        r = Math.sin(t);
      return new e(s, r, -r, s);
    }
    static scale(t, s) {
      return new e(t, 0, 0, s);
    }
  },
  w = class e {
    static {
      t(this, "Mat3");
    }
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, t, s, r, n, i, a, o, l) {
      (this.m11 = e),
        (this.m12 = t),
        (this.m13 = s),
        (this.m21 = r),
        (this.m22 = n),
        (this.m23 = i),
        (this.m31 = a),
        (this.m32 = o),
        (this.m33 = l);
    }
    static fromMat2(t) {
      return new e(t.a, t.b, 0, t.c, t.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new m(this.m11, this.m12, this.m21, this.m22);
    }
    mul(t) {
      return new e(
        this.m11 * t.m11 + this.m12 * t.m21 + this.m13 * t.m31,
        this.m11 * t.m12 + this.m12 * t.m22 + this.m13 * t.m32,
        this.m11 * t.m13 + this.m12 * t.m23 + this.m13 * t.m33,
        this.m21 * t.m11 + this.m22 * t.m21 + this.m23 * t.m31,
        this.m21 * t.m12 + this.m22 * t.m22 + this.m23 * t.m32,
        this.m21 * t.m13 + this.m22 * t.m23 + this.m23 * t.m33,
        this.m31 * t.m11 + this.m32 * t.m21 + this.m33 * t.m31,
        this.m31 * t.m12 + this.m32 * t.m22 + this.m33 * t.m32,
        this.m31 * t.m13 + this.m32 * t.m23 + this.m33 * t.m33
      );
    }
    get det() {
      return (
        this.m11 * this.m22 * this.m33 +
        this.m12 * this.m23 * this.m31 +
        this.m13 * this.m21 * this.m32 -
        this.m13 * this.m22 * this.m31 -
        this.m12 * this.m21 * this.m33 -
        this.m11 * this.m23 * this.m32
      );
    }
    rotate(e) {
      let t = Math.cos(e),
        s = Math.sin(e),
        r = this.m11,
        n = this.m12;
      return (
        (this.m11 = t * this.m11 + s * this.m21),
        (this.m12 = t * this.m12 + s * this.m22),
        (this.m21 = t * this.m21 - s * r),
        (this.m22 = t * this.m22 - s * n),
        this
      );
    }
    scale(e, t) {
      return (
        (this.m11 *= e), (this.m12 *= e), (this.m21 *= t), (this.m22 *= t), this
      );
    }
    get inverse() {
      let t = this.det;
      return new e(
        (this.m22 * this.m33 - this.m23 * this.m32) / t,
        (this.m13 * this.m32 - this.m12 * this.m33) / t,
        (this.m12 * this.m23 - this.m13 * this.m22) / t,
        (this.m23 * this.m31 - this.m21 * this.m33) / t,
        (this.m11 * this.m33 - this.m13 * this.m31) / t,
        (this.m13 * this.m21 - this.m11 * this.m23) / t,
        (this.m21 * this.m32 - this.m22 * this.m31) / t,
        (this.m12 * this.m31 - this.m11 * this.m32) / t,
        (this.m11 * this.m22 - this.m12 * this.m21) / t
      );
    }
    get transpose() {
      return new e(
        this.m11,
        this.m21,
        this.m31,
        this.m12,
        this.m22,
        this.m32,
        this.m13,
        this.m23,
        this.m33
      );
    }
  },
  y = class e {
    static {
      t(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(t) {
      return new e([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new e([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = a(-t);
      let s = Math.cos(t),
        r = Math.sin(t);
      return new e([1, 0, 0, 0, 0, s, -r, 0, 0, r, s, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = a(-t);
      let s = Math.cos(t),
        r = Math.sin(t);
      return new e([s, 0, r, 0, 0, 1, 0, 0, -r, 0, s, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = a(-t);
      let s = Math.cos(t),
        r = Math.sin(t);
      return new e([s, -r, 0, 0, r, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return (
        (this.m[12] += this.m[0] * e.x + this.m[4] * e.y),
        (this.m[13] += this.m[1] * e.x + this.m[5] * e.y),
        (this.m[14] += this.m[2] * e.x + this.m[6] * e.y),
        (this.m[15] += this.m[3] * e.x + this.m[7] * e.y),
        this
      );
    }
    scale(e) {
      return (
        (this.m[0] *= e.x),
        (this.m[4] *= e.y),
        (this.m[1] *= e.x),
        (this.m[5] *= e.y),
        (this.m[2] *= e.x),
        (this.m[6] *= e.y),
        (this.m[3] *= e.x),
        (this.m[7] *= e.y),
        this
      );
    }
    rotate(e) {
      e = a(-e);
      let t = Math.cos(e),
        s = Math.sin(e),
        r = this.m[0],
        n = this.m[1],
        i = this.m[4],
        o = this.m[5];
      return (
        (this.m[0] = r * t + n * s),
        (this.m[1] = -r * s + n * t),
        (this.m[4] = i * t + o * s),
        (this.m[5] = -i * s + o * t),
        this
      );
    }
    mult(t) {
      let s = [];
      for (let e = 0; e < 4; e++)
        for (let r = 0; r < 4; r++)
          s[4 * e + r] =
            this.m[0 + r] * t.m[4 * e + 0] +
            this.m[4 + r] * t.m[4 * e + 1] +
            this.m[8 + r] * t.m[4 * e + 2] +
            this.m[12 + r] * t.m[4 * e + 3];
      return new e(s);
    }
    multVec2(e) {
      return new c(
        e.x * this.m[0] + e.y * this.m[4] + this.m[12],
        e.x * this.m[1] + e.y * this.m[5] + this.m[13]
      );
    }
    getTranslation() {
      return new c(this.m[12], this.m[13]);
    }
    getScale() {
      if (0 != this.m[0] || 0 != this.m[1]) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new c(t, e / t);
      }
      if (0 != this.m[4] || 0 != this.m[5]) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new c(e / t, t);
      }
      return new c(0, 0);
    }
    getRotation() {
      if (0 != this.m[0] || 0 != this.m[1]) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return o(
          this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e)
        );
      }
      if (0 != this.m[4] || 0 != this.m[5]) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return o(
          Math.PI / 2 -
            (this.m[5] > 0
              ? Math.acos(-this.m[4] / e)
              : -Math.acos(this.m[4] / e))
        );
      }
      return 0;
    }
    getSkew() {
      if (0 != this.m[0] || 0 != this.m[1]) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new c(
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
          0
        );
      }
      if (0 != this.m[4] || 0 != this.m[5]) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new c(
          0,
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e)
        );
      }
      return new c(0, 0);
    }
    invert() {
      let t = [],
        s = this.m[10] * this.m[15] - this.m[14] * this.m[11],
        r = this.m[9] * this.m[15] - this.m[13] * this.m[11],
        n = this.m[9] * this.m[14] - this.m[13] * this.m[10],
        i = this.m[8] * this.m[15] - this.m[12] * this.m[11],
        a = this.m[8] * this.m[14] - this.m[12] * this.m[10],
        o = this.m[8] * this.m[13] - this.m[12] * this.m[9],
        l = this.m[6] * this.m[15] - this.m[14] * this.m[7],
        h = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        u = this.m[5] * this.m[14] - this.m[13] * this.m[6],
        d = this.m[4] * this.m[15] - this.m[12] * this.m[7],
        c = this.m[4] * this.m[14] - this.m[12] * this.m[6],
        f = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        p = this.m[4] * this.m[13] - this.m[12] * this.m[5],
        g = this.m[6] * this.m[11] - this.m[10] * this.m[7],
        m = this.m[5] * this.m[11] - this.m[9] * this.m[7],
        w = this.m[5] * this.m[10] - this.m[9] * this.m[6],
        y = this.m[4] * this.m[11] - this.m[8] * this.m[7],
        A = this.m[4] * this.m[10] - this.m[8] * this.m[6],
        x = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      (t[0] = this.m[5] * s - this.m[6] * r + this.m[7] * n),
        (t[4] = -(this.m[4] * s - this.m[6] * i + this.m[7] * a)),
        (t[8] = this.m[4] * r - this.m[5] * i + this.m[7] * o),
        (t[12] = -(this.m[4] * n - this.m[5] * a + this.m[6] * o)),
        (t[1] = -(this.m[1] * s - this.m[2] * r + this.m[3] * n)),
        (t[5] = this.m[0] * s - this.m[2] * i + this.m[3] * a),
        (t[9] = -(this.m[0] * r - this.m[1] * i + this.m[3] * o)),
        (t[13] = this.m[0] * n - this.m[1] * a + this.m[2] * o),
        (t[2] = this.m[1] * l - this.m[2] * h + this.m[3] * u),
        (t[6] = -(this.m[0] * l - this.m[2] * d + this.m[3] * c)),
        (t[10] = this.m[0] * f - this.m[1] * d + this.m[3] * p),
        (t[14] = -(this.m[0] * u - this.m[1] * c + this.m[2] * p)),
        (t[3] = -(this.m[1] * g - this.m[2] * m + this.m[3] * w)),
        (t[7] = this.m[0] * g - this.m[2] * y + this.m[3] * A),
        (t[11] = -(this.m[0] * m - this.m[1] * y + this.m[3] * x)),
        (t[15] = this.m[0] * w - this.m[1] * A + this.m[2] * x);
      let v =
        this.m[0] * t[0] +
        this.m[1] * t[4] +
        this.m[2] * t[8] +
        this.m[3] * t[12];
      for (let e = 0; e < 4; e++)
        for (let s = 0; s < 4; s++) t[4 * e + s] *= 1 / v;
      return new e(t);
    }
    clone() {
      return new e([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
function A(e, t, s, r = (e) => -Math.cos(e)) {
  return e + ((r(s) + 1) / 2) * (t - e);
}
t(A, "wave");
var x = 2147483648,
  v = class {
    static {
      t(this, "RNG");
    }
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return (this.seed = (1103515245 * this.seed + 12345) % x), this.seed / x;
    }
    genNumber(e, t) {
      return e + this.gen() * (t - e);
    }
    genVec2(e, t) {
      return new c(this.genNumber(e.x, t.x), this.genNumber(e.y, t.y));
    }
    genColor(e, t) {
      return new r(
        this.genNumber(e.r, t.r),
        this.genNumber(e.g, t.g),
        this.genNumber(e.b, t.b)
      );
    }
    genAny(...e) {
      if (0 === e.length) return this.gen();
      if (1 === e.length) {
        if ("number" == typeof e[0]) return this.genNumber(0, e[0]);
        if (e[0] instanceof c) return this.genVec2(f(0, 0), e[0]);
        if (e[0] instanceof r) return this.genColor(n(0, 0, 0), e[0]);
      } else if (2 === e.length) {
        if ("number" == typeof e[0] && "number" == typeof e[1])
          return this.genNumber(e[0], e[1]);
        if (e[0] instanceof c && e[1] instanceof c)
          return this.genVec2(e[0], e[1]);
        if (e[0] instanceof r && e[1] instanceof r)
          return this.genColor(e[0], e[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  },
  b = new v(Date.now());
function E(e) {
  return null != e && (b.seed = e), b.seed;
}
function M(...e) {
  return b.genAny(...e);
}
function S(...e) {
  return Math.floor(M(...(e.length > 0 ? e : [2])));
}
function q(e) {
  return M() <= e;
}
function B(e) {
  for (let t = e.length - 1; t > 0; t--) {
    let s = Math.floor(Math.random() * (t + 1));
    [e[t], e[s]] = [e[s], e[t]];
  }
  return e;
}
function R(e, t) {
  return e.length <= t ? e.slice() : B(e.slice()).slice(0, t);
}
function C(e) {
  return e[S(e.length)];
}
function P(e, t) {
  return (
    e.pos.x + e.width > t.pos.x &&
    e.pos.x < t.pos.x + t.width &&
    e.pos.y + e.height > t.pos.y &&
    e.pos.y < t.pos.y + t.height
  );
}
function I(e, t) {
  if (
    (e.p1.x === e.p2.x && e.p1.y === e.p2.y) ||
    (t.p1.x === t.p2.x && t.p1.y === t.p2.y)
  )
    return null;
  let s =
    (t.p2.y - t.p1.y) * (e.p2.x - e.p1.x) -
    (t.p2.x - t.p1.x) * (e.p2.y - e.p1.y);
  if (0 === s) return null;
  let r =
      ((t.p2.x - t.p1.x) * (e.p1.y - t.p1.y) -
        (t.p2.y - t.p1.y) * (e.p1.x - t.p1.x)) /
      s,
    n =
      ((e.p2.x - e.p1.x) * (e.p1.y - t.p1.y) -
        (e.p2.y - e.p1.y) * (e.p1.x - t.p1.x)) /
      s;
  return r < 0 || r > 1 || n < 0 || n > 1 ? null : r;
}
function k(e, t) {
  let s = I(e, t);
  return s
    ? f(e.p1.x + s * (e.p2.x - e.p1.x), e.p1.y + s * (e.p2.y - e.p1.y))
    : null;
}
function F(e, t) {
  let s = t.p2.sub(t.p1),
    r = Number.NEGATIVE_INFINITY,
    n = Number.POSITIVE_INFINITY;
  if (0 != s.x) {
    let i = (e.pos.x - t.p1.x) / s.x,
      a = (e.pos.x + e.width - t.p1.x) / s.x;
    (r = Math.max(r, Math.min(i, a))), (n = Math.min(n, Math.max(i, a)));
  }
  if (0 != s.y) {
    let i = (e.pos.y - t.p1.y) / s.y,
      a = (e.pos.y + e.height - t.p1.y) / s.y;
    (r = Math.max(r, Math.min(i, a))), (n = Math.min(n, Math.max(i, a)));
  }
  return n >= r && n >= 0 && r <= 1;
}
function T(e, t) {
  return (
    t.x > e.pos.x &&
    t.x < e.pos.x + e.width &&
    t.y > e.pos.y &&
    t.y < e.pos.y + e.height
  );
}
function D(e, t) {
  return (
    f(
      Math.max(e.pos.x, Math.min(t.center.x, e.pos.x + e.width)),
      Math.max(e.pos.y, Math.min(t.center.y, e.pos.y + e.height))
    ).sdist(t.center) <=
    t.radius * t.radius
  );
}
function O(e, t) {
  return V(t, new me(e.points()));
}
function U(e, t) {
  let s = t.sub(e.p1),
    r = e.p2.sub(e.p1);
  if (Math.abs(s.cross(r)) > Number.EPSILON) return !1;
  let n = s.dot(r) / r.dot(r);
  return n >= 0 && n <= 1;
}
function L(e, t) {
  let s = e.p2.sub(e.p1),
    r = s.dot(s),
    n = e.p1.sub(t.center),
    i = 2 * s.dot(n),
    a = i * i - 4 * r * (n.dot(n) - t.radius * t.radius);
  if (r <= Number.EPSILON || a < 0) return !1;
  if (0 == a) {
    let e = -i / (2 * r);
    if (e >= 0 && e <= 1) return !0;
  } else {
    let e = (-i + Math.sqrt(a)) / (2 * r),
      t = (-i - Math.sqrt(a)) / (2 * r);
    if ((e >= 0 && e <= 1) || (t >= 0 && t <= 1)) return !0;
  }
  return H(t, e.p1);
}
function N(e, t) {
  if (K(t, e.p1) || K(t, e.p2)) return !0;
  for (let s = 0; s < t.pts.length; s++) {
    let r = t.pts[s],
      n = t.pts[(s + 1) % t.pts.length];
    if (k(e, new de(r, n))) return !0;
  }
  return !1;
}
function H(e, t) {
  return e.center.sdist(t) < e.radius * e.radius;
}
function G(e, t) {
  return (
    e.center.sdist(t.center) < (e.radius + t.radius) * (e.radius + t.radius)
  );
}
function j(e, t) {
  let s = t.pts[t.pts.length - 1];
  for (let r of t.pts) {
    if (L(new de(s, r), e)) return !0;
    s = r;
  }
  return !!H(e, t.pts[0]) || K(t, e.center);
}
function V(e, t) {
  for (let s = 0; s < e.pts.length; s++)
    if (N(new de(e.pts[s], e.pts[(s + 1) % e.pts.length]), t)) return !0;
  return !(!e.pts.some((e) => K(t, e)) && !t.pts.some((t) => K(e, t)));
}
function K(e, t) {
  let s = !1,
    r = e.pts;
  for (let e = 0, n = r.length - 1; e < r.length; n = e++)
    r[e].y > t.y != r[n].y > t.y &&
      t.x < ((r[n].x - r[e].x) * (t.y - r[e].y)) / (r[n].y - r[e].y) + r[e].x &&
      (s = !s);
  return s;
}
function Y(e, t) {
  t = t.sub(e.center);
  let s = a(e.angle),
    r = Math.cos(s),
    n = Math.sin(s),
    i = t.x * r + t.y * n,
    o = -t.x * n + t.y * r;
  return (
    (i * i) / (e.radiusX * e.radiusX) + (o * o) / (e.radiusY * e.radiusY) < 1
  );
}
function Q(e, t) {
  let s = t.center.sub(e.center),
    r = a(e.angle),
    n = Math.cos(r),
    i = Math.sin(r),
    o = s.x * n + s.y * i,
    l = -s.x * i + s.y * n;
  return Y(new pe(f(), e.radiusX + t.radius, e.radiusY + t.radius, 0), f(o, l));
}
function z(e, t) {
  let s = e.toMat2().inverse;
  return L(
    (t = new de(
      s.transform(t.p1.sub(e.center)),
      s.transform(t.p2.sub(e.center))
    )),
    new fe(f(), 1)
  );
}
function X(e, t) {
  if (e.radiusX === e.radiusY) return Q(t, new fe(e.center, e.radiusX));
  if (t.radiusX === t.radiusY) return Q(e, new fe(t.center, t.radiusX));
  let s = new w(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1),
    r = new w(1 / t.radiusX ** 2, 0, 0, 0, 1 / t.radiusY ** 2, 0, 0, 0, -1),
    n = e.center.x,
    i = e.center.y,
    o = t.center.x,
    l = t.center.y,
    h = a(e.angle),
    u = a(t.angle),
    d = new w(
      Math.cos(h),
      -Math.sin(h),
      n,
      Math.sin(h),
      Math.cos(h),
      i,
      0,
      0,
      1
    ),
    c = new w(
      Math.cos(u),
      -Math.sin(u),
      o,
      Math.sin(u),
      Math.cos(u),
      l,
      0,
      0,
      1
    ),
    f = d.inverse,
    p = c.inverse,
    g = f.transpose.mul(s).mul(f),
    m = p.transpose.mul(r).mul(p),
    y = g.m11,
    A = g.m12,
    x = g.m13,
    v = g.m21,
    b = g.m22,
    E = g.m23,
    M = g.m31,
    S = g.m32,
    q = g.m33,
    B = m.m11,
    R = m.m12,
    C = m.m13,
    P = m.m21,
    I = m.m22,
    k = m.m23,
    F = m.m31,
    T = m.m32,
    D = m.m33,
    O = y * b * q - y * E * S - A * v * q + A * E * M + x * v * S - x * b * M,
    U =
      (y * b * D -
        y * E * T -
        y * S * k +
        y * q * I -
        A * v * D +
        A * E * F +
        A * M * k -
        A * q * P +
        x * v * T -
        x * b * F -
        x * M * I +
        x * S * P +
        v * S * C -
        v * q * R -
        b * M * C +
        b * q * B +
        E * M * R -
        E * S * B) /
      O,
    L =
      (y * I * D -
        y * k * T -
        A * P * D +
        A * k * F +
        x * P * T -
        x * I * F -
        v * R * D +
        v * C * T +
        b * B * D -
        b * C * F -
        E * B * T +
        E * R * F +
        M * R * k -
        M * C * I -
        S * B * k +
        S * C * P +
        q * B * I -
        q * R * P) /
      O,
    N =
      (B * I * D - B * k * T - R * P * D + R * k * F + C * P * T - C * I * F) /
      O;
  if (U >= 0) {
    return !(
      -3 * L + U ** 2 > 0 &&
      3 * U * N + L * U ** 2 - 4 * L ** 2 < 0 &&
      -27 * N ** 2 +
        18 * N * U * L +
        U ** 2 * L ** 2 -
        4 * U ** 3 * N -
        4 * L ** 3 >
        0
    );
  }
  return !(
    -3 * L + U ** 2 > 0 &&
    -27 * N ** 2 +
      18 * N * U * L +
      U ** 2 * L ** 2 -
      4 * U ** 3 * N -
      4 * L ** 3 >
      0
  );
}
function W(e, t) {
  return J(e, new me(t.points()));
}
function J(e, t) {
  let s = e.toMat2().inverse;
  return (
    (t = new me(t.pts.map((t) => s.transform(t.sub(e.center))))),
    j(new fe(f(), 1), t)
  );
}
function Z(e, t) {
  return e.x === t.x && e.y === t.y;
}
function _(e, t) {
  return t instanceof c
    ? Z(t, e.pt)
    : t instanceof fe
    ? H(t, e.pt)
    : t instanceof de
    ? U(t, e.pt)
    : t instanceof ce
    ? T(t, e.pt)
    : t instanceof me
    ? K(t, e.pt)
    : t instanceof pe && Y(t, e.pt);
}
function $(e, t) {
  return t instanceof c
    ? U(e, t)
    : t instanceof fe
    ? L(e, t)
    : t instanceof de
    ? null != k(e, t)
    : t instanceof ce
    ? F(t, e)
    : t instanceof me
    ? N(e, t)
    : t instanceof pe && z(t, e);
}
function ee(e, t) {
  return t instanceof c
    ? H(e, t)
    : t instanceof fe
    ? G(e, t)
    : t instanceof de
    ? L(t, e)
    : t instanceof ce
    ? D(t, e)
    : t instanceof me
    ? j(e, t)
    : t instanceof pe && Q(t, e);
}
function te(e, t) {
  return t instanceof c
    ? T(e, t)
    : t instanceof fe
    ? D(e, t)
    : t instanceof de
    ? F(e, t)
    : t instanceof ce
    ? P(e, t)
    : t instanceof me
    ? O(e, t)
    : t instanceof pe && W(t, e);
}
function se(e, t) {
  return t instanceof c
    ? K(e, t)
    : t instanceof fe
    ? j(t, e)
    : t instanceof de
    ? N(t, e)
    : t instanceof ce
    ? O(t, e)
    : t instanceof me
    ? V(t, e)
    : t instanceof pe && J(t, e);
}
function re(e, t) {
  return t instanceof c
    ? Y(e, t)
    : t instanceof fe
    ? Q(e, t)
    : t instanceof de
    ? z(e, t)
    : t instanceof ce
    ? W(e, t)
    : t instanceof me
    ? J(e, t)
    : t instanceof pe && X(t, e);
}
function ne(e, t, s) {
  let r = e,
    n = s.p1,
    i = t,
    a = s.p2.sub(n),
    o = i.cross(a);
  if (Math.abs(o) < Number.EPSILON) return null;
  let l = n.sub(r),
    h = l.cross(a) / o;
  if (h <= 0 || h >= 1) return null;
  let u = l.cross(i) / o;
  if (u <= 0 || u >= 1) return null;
  let d = a.normal().unit();
  return (
    t.dot(d) > 0 && ((d.x *= -1), (d.y *= -1)),
    { point: r.add(i.scale(h)), normal: d, fraction: h }
  );
}
function ie(e, t, s) {
  let r,
    n = Number.NEGATIVE_INFINITY,
    i = Number.POSITIVE_INFINITY;
  if (0 != e.x) {
    let a = (s.pos.x - e.x) / t.x,
      o = (s.pos.x + s.width - e.x) / t.x;
    (r = f(-Math.sign(t.x), 0)),
      (n = Math.max(n, Math.min(a, o))),
      (i = Math.min(i, Math.max(a, o)));
  }
  if (0 != e.y) {
    let a = (s.pos.y - e.y) / t.y,
      o = (s.pos.y + s.height - e.y) / t.y;
    Math.min(a, o) > n && (r = f(0, -Math.sign(t.y))),
      (n = Math.max(n, Math.min(a, o))),
      (i = Math.min(i, Math.max(a, o)));
  }
  return i >= n && n >= 0 && n <= 1
    ? { point: e.add(t.scale(n)), normal: r, fraction: n }
    : null;
}
function ae(e, t, s) {
  let r = e,
    n = s.center,
    i = t,
    a = i.dot(i),
    o = r.sub(n),
    l = 2 * i.dot(o),
    h = l * l - 4 * a * (o.dot(o) - s.radius * s.radius);
  if (a <= Number.EPSILON || h < 0) return null;
  if (0 == h) {
    let e = -l / (2 * a);
    if (e >= 0 && e <= 1) {
      let t = r.add(i.scale(e));
      return { point: t, normal: t.sub(n), fraction: e };
    }
  } else {
    let e = (-l + Math.sqrt(h)) / (2 * a),
      t = (-l - Math.sqrt(h)) / (2 * a),
      s = null;
    if (
      (e >= 0 && e <= 1 && (s = e),
      t >= 0 && t <= 1 && (s = Math.min(t, s ?? t)),
      null != s)
    ) {
      let e = r.add(i.scale(s));
      return { point: e, normal: e.sub(n).unit(), fraction: s };
    }
  }
  return null;
}
function oe(e, t, s) {
  let r = s.pts,
    n = null,
    i = r[r.length - 1];
  for (let s = 0; s < r.length; s++) {
    let a = r[s],
      o = ne(e, t, new de(i, a));
    o && (!n || n.fraction > o.fraction) && (n = o), (i = a);
  }
  return n;
}
function le(e, t, s) {
  let r = s.toMat2(),
    n = r.inverse,
    i = ae(n.transform(e.sub(s.center)), n.transform(t), new fe(f(), 1));
  if (i) {
    let n = m.rotation(a(-s.angle)),
      o = m.scale(s.radiusX, s.radiusY).transform(i.point),
      l = r.transform(i.point).add(s.center),
      h = l.dist(e) / t.len();
    return {
      point: l,
      normal: n.transform(f(s.radiusY ** 2 * o.x, s.radiusX ** 2 * o.y)).unit(),
      fraction: h,
    };
  }
  return i;
}
function he(e, t, s, r = 64) {
  let n = e,
    i = t.len(),
    a = t.scale(1 / i),
    o = 0,
    l = f(Math.floor(e.x), Math.floor(e.y)),
    h = f(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1),
    u = f(Math.abs(1 / a.x), Math.abs(1 / a.y)),
    d = f(
      h.x > 0 ? l.x + 1 - e.x : e.x - l.x,
      h.y > 0 ? l.y + 1 - e.y : e.y - l.y
    ),
    c = f(u.x < 1 / 0 ? u.x * d.x : 1 / 0, u.y < 1 / 0 ? u.y * d.y : 1 / 0),
    p = -1;
  for (; o <= r; ) {
    let e = s(l);
    if (!0 === e)
      return {
        point: n.add(a.scale(o)),
        normal: f(0 === p ? -h.x : 0, 1 === p ? -h.y : 0),
        fraction: o / i,
        gridPos: l,
      };
    if (e) return e;
    c.x < c.y
      ? ((l.x += h.x), (o = c.x), (c.x += u.x), (p = 0))
      : ((l.y += h.y), (o = c.y), (c.y += u.y), (p = 1));
  }
  return null;
}
t(E, "randSeed"),
  t(M, "rand"),
  t(S, "randi"),
  t(q, "chance"),
  t(B, "shuffle"),
  t(R, "chooseMultiple"),
  t(C, "choose"),
  t(P, "testRectRect"),
  t(I, "testLineLineT"),
  t(k, "testLineLine"),
  t(F, "testRectLine"),
  t(T, "testRectPoint"),
  t(D, "testRectCircle"),
  t(O, "testRectPolygon"),
  t(U, "testLinePoint"),
  t(L, "testLineCircle"),
  t(N, "testLinePolygon"),
  t(H, "testCirclePoint"),
  t(G, "testCircleCircle"),
  t(j, "testCirclePolygon"),
  t(V, "testPolygonPolygon"),
  t(K, "testPolygonPoint"),
  t(Y, "testEllipsePoint"),
  t(Q, "testEllipseCircle"),
  t(z, "testEllipseLine"),
  t(X, "testEllipseEllipse"),
  t(W, "testEllipseRect"),
  t(J, "testEllipsePolygon"),
  t(Z, "testPointPoint"),
  t(_, "testPointShape"),
  t($, "testLineShape"),
  t(ee, "testCircleShape"),
  t(te, "testRectShape"),
  t(se, "testPolygonShape"),
  t(re, "testEllipseShape"),
  t(ne, "raycastLine"),
  t(ie, "raycastRect"),
  t(ae, "raycastCircle"),
  t(oe, "raycastPolygon"),
  t(le, "raycastEllipse"),
  t(he, "raycastGrid");
var ue = class e {
    static {
      t(this, "Point");
    }
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(t) {
      return new e(t.multVec2(this.pt));
    }
    bbox() {
      return new ce(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new e(this.pt);
    }
    collides(e) {
      return _(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, t) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  },
  de = class e {
    static {
      t(this, "Line");
    }
    p1;
    p2;
    constructor(e, t) {
      (this.p1 = e.clone()), (this.p2 = t.clone());
    }
    transform(t) {
      return new e(t.multVec2(this.p1), t.multVec2(this.p2));
    }
    bbox() {
      return ce.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new e(this.p1, this.p2);
    }
    collides(e) {
      return $(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, t) {
      return ne(e, t, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(M(1)));
    }
  },
  ce = class e {
    static {
      t(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(e, t, s) {
      (this.pos = e.clone()), (this.width = t), (this.height = s);
    }
    static fromPoints(t, s) {
      return new e(t.clone(), s.x - t.x, s.y - t.y);
    }
    center() {
      return new c(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [
        this.pos,
        this.pos.add(this.width, 0),
        this.pos.add(this.width, this.height),
        this.pos.add(0, this.height),
      ];
    }
    transform(e) {
      return new me(this.points().map((t) => e.multVec2(t)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new e(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let t = this.pos,
        s = this.pos.add(this.width, this.height),
        r = Math.max(t.x - e.x, 0, e.x - s.x),
        n = Math.max(t.y - e.y, 0, e.y - s.y);
      return r * r + n * n;
    }
    collides(e) {
      return te(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, t) {
      return ie(e, t, this);
    }
    random() {
      return this.pos.add(M(this.width), M(this.height));
    }
  },
  fe = class e {
    static {
      t(this, "Circle");
    }
    center;
    radius;
    constructor(e, t) {
      (this.center = e.clone()), (this.radius = t);
    }
    transform(e) {
      return new pe(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return ce.fromPoints(
        this.center.sub(f(this.radius)),
        this.center.add(f(this.radius))
      );
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new e(this.center, this.radius);
    }
    collides(e) {
      return ee(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, t) {
      return ae(e, t, this);
    }
    random() {
      return this.center.add(c.fromAngle(M(360)).scale(M(this.radius)));
    }
  },
  pe = class e {
    static {
      t(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, t, s, r = 0) {
      (this.center = e.clone()),
        (this.radiusX = t),
        (this.radiusY = s),
        (this.angle = r);
    }
    static fromMat2(t) {
      let s = t.inverse,
        r = s.transpose.mul(s),
        [n, i] = r.eigenvalues,
        [a, l] = r.eigenvectors(n, i),
        [h, u] = [1 / Math.sqrt(n), 1 / Math.sqrt(i)];
      return h > u
        ? new e(f(), h, u, o(Math.atan2(-a[1], a[0])))
        : new e(f(), u, h, o(Math.atan2(-l[1], l[0])));
    }
    toMat2() {
      let e = a(this.angle),
        t = Math.cos(e),
        s = Math.sin(e);
      return new m(
        t * this.radiusX,
        -s * this.radiusY,
        s * this.radiusX,
        t * this.radiusY
      );
    }
    transform(t) {
      if (0 == this.angle && 0 == t.getRotation())
        return new e(
          t.multVec2(this.center),
          t.m[0] * this.radiusX,
          t.m[5] * this.radiusY
        );
      {
        let s = this.toMat2(),
          r = t.getRotation(),
          n = t.getScale();
        s = w.fromMat2(s).scale(n.x, n.y).rotate(r).toMat2();
        let i = e.fromMat2(s);
        return (i.center = t.multVec2(this.center)), i;
      }
    }
    bbox() {
      if (0 == this.angle)
        return ce.fromPoints(
          this.center.sub(f(this.radiusX, this.radiusY)),
          this.center.add(f(this.radiusX, this.radiusY))
        );
      {
        let e = a(this.angle),
          t = Math.cos(e),
          s = Math.sin(e),
          r = this.radiusX * t,
          n = this.radiusX * s,
          i = this.radiusY * s,
          o = this.radiusY * t,
          l = Math.sqrt(r * r + i * i),
          h = Math.sqrt(n * n + o * o);
        return ce.fromPoints(
          this.center.sub(f(l, h)),
          this.center.add(f(l, h))
        );
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new e(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return re(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let t = a(this.angle),
        s = Math.cos(t),
        r = Math.sin(t),
        n = e.x * s + e.y * r,
        i = -e.x * r + e.y * s;
      return (
        (n * n) / (this.radiusX * this.radiusX) +
          (i * i) / (this.radiusY * this.radiusY) <
        1
      );
    }
    raycast(e, t) {
      return le(e, t, this);
    }
    random() {
      return this.center;
    }
  };
function ge(e, t, s, r) {
  let n = t.sub(e),
    i = r.sub(s),
    a = n.cross(i);
  return (a < 1e-5 && a > -1e-5) ||
    ((a = s.sub(e).cross(i) / a), a < 0 || a > 1)
    ? null
    : e.add(n.scale(a));
}
t(ge, "segmentLineIntersection");
var me = class e {
  static {
    t(this, "Polygon");
  }
  pts;
  constructor(e) {
    if (e.length < 3)
      throw new Error("Polygons should have at least 3 vertices");
    this.pts = e;
  }
  transform(t) {
    return new e(this.pts.map((e) => t.multVec2(e)));
  }
  bbox() {
    let e = f(Number.MAX_VALUE),
      t = f(-Number.MAX_VALUE);
    for (let s of this.pts)
      (e.x = Math.min(e.x, s.x)),
        (t.x = Math.max(t.x, s.x)),
        (e.y = Math.min(e.y, s.y)),
        (t.y = Math.max(t.y, s.y));
    return ce.fromPoints(e, t);
  }
  area() {
    let e = 0,
      t = this.pts.length;
    for (let s = 0; s < t; s++) {
      let r = this.pts[s],
        n = this.pts[(s + 1) % t];
      (e += r.x * n.y * 0.5), (e -= n.x * r.y * 0.5);
    }
    return Math.abs(e);
  }
  clone() {
    return new e(this.pts.map((e) => e.clone()));
  }
  collides(e) {
    return se(this, e);
  }
  contains(e) {
    return this.collides(e);
  }
  raycast(e, t) {
    return oe(e, t, this);
  }
  random() {
    return f();
  }
  cut(t, s) {
    new de(t, s);
    let r = [],
      n = [],
      i = s.sub(t),
      a = this.pts[this.pts.length - 1],
      o = a.sub(t),
      l = i.cross(o) > 0;
    return (
      this.pts.forEach((e) => {
        o = e.sub(t);
        let h = i.cross(o) > 0;
        if (l != h) {
          let i = ge(a, e, t, s);
          r.push(i), n.push(i), (l = h);
        }
        (h ? r : n).push(e), (a = e);
      }),
      [r.length ? new e(r) : null, n.length ? new e(n) : null]
    );
  }
};
function we(e, t, s, r) {
  let n = r * r,
    i = 1 - r,
    a = i * i;
  return e
    .scale(a)
    .add(t.scale(2 * i * r))
    .add(s.scale(n));
}
function ye(e, t, s, r) {
  let n = 1 - r;
  return t
    .sub(e)
    .scale(2 * n)
    .add(s.sub(t).scale(2 * r));
}
function Ae(e, t, s, r) {
  return s.sub(t.scale(2)).add(e).scale(2);
}
function xe(e, t, s, r, n) {
  let i = n * n,
    a = i * n,
    o = 1 - n,
    l = o * o,
    h = l * o;
  return e
    .scale(h)
    .add(t.scale(3 * l * n))
    .add(s.scale(3 * o * i))
    .add(r.scale(a));
}
function ve(e, t, s, r, n) {
  let i = n * n,
    a = 1 - n,
    o = a * a;
  return t
    .sub(e)
    .scale(3 * o)
    .add(s.sub(t).scale(6 * a * n))
    .add(r.sub(s).scale(3 * i));
}
function be(e, t, s, r, n) {
  let i = 1 - n;
  return s
    .sub(t.scale(2))
    .add(e)
    .scale(6 * i)
    .add(
      r
        .sub(s.scale(2))
        .add(t)
        .scale(6 * n)
    );
}
function Ee(e, t, s, r, n) {
  let i = ((2 - n) * n - 1) * n * 0.5,
    a = 0.5 * ((3 * n - 5) * n * n + 2),
    o = ((-3 * n + 4) * n + 1) * n * 0.5,
    l = (n - 1) * n * n * 0.5;
  return e.scale(i).add(t.scale(a)).add(s.scale(o)).add(r.scale(l));
}
function Me(e, t, s, r, n) {
  let i = 0.5 * ((-3 * n + 4) * n - 1),
    a = (9 * n - 10) * n * 0.5,
    o = 0.5 * ((-9 * n + 8) * n + 1),
    l = (3 * n - 2) * n * 0.5;
  return e.scale(i).add(t.scale(a)).add(s.scale(o)).add(r.scale(l));
}
function Se(e) {
  let t = qe(e),
    s = t(1);
  return (r) => {
    let n = t(r * s, !0);
    return e(n);
  };
}
function qe(e, t = 10, s = 10) {
  let r = [0],
    n = [0],
    i = 1 / (t - 1) / s,
    a = 0,
    o = e(0),
    l = 0;
  for (let h = 1; h < t; h++) {
    for (let t = 0; t < s; t++) {
      l += i;
      let t = e(l),
        s = t.dist(o);
      (a += s), (o = t);
    }
    (r[h] = a), (n[h] = l);
  }
  return (
    (n[t - 1] = 1),
    (e, s = !1) => {
      if (s) {
        let t = e;
        if (t <= 0) return 0;
        if (t >= a) return 1;
        let s = 0;
        for (; r[s + 1] < t; ) s++;
        let i = n[s],
          o = n[s + 1],
          l = r[s];
        return i + (o - i) * ((t - l) / (r[s + 1] - l));
      }
      {
        if (e <= 0) return 0;
        if (e >= 1) return r[t - 1];
        let s = 0;
        for (; n[s + 1] < e; ) s++;
        let i = n[s],
          a = n[s + 1],
          o = r[s];
        return o + (r[s + 1] - o) * ((e - i) / (a - i));
      }
    }
  );
}
function Be(e, t, s, r) {
  let n = 2 * e + t - 2 * r + s,
    i = -3 * e + 3 * r - 2 * t - s,
    a = t,
    o = e;
  return (e) => {
    let t = e * e;
    return n * (t * e) + i * t + a * e + o;
  };
}
function Re(e, t, s, r, n, i = Be) {
  let a = i(t.x, (1 - n) * (s.x - e.x), (1 - n) * (r.x - t.x), s.x),
    o = i(t.y, (1 - n) * (s.y - e.y), (1 - n) * (r.y - t.y), s.y);
  return (e) => new c(a(e), o(e));
}
function Ce(e, t, s, r, n = Be) {
  return Re(e, t, s, r, 0.5, n);
}
function Pe(e, t, s, r, n = Be) {
  return Ce(r.add(e.sub(t).scale(6)), e, r, e.add(r.sub(s).scale(6)), n);
}
function Ie(e, t, s, r, n, i, a, o = Be) {
  let l = o(
      t.x,
      0.5 * (1 - n) * (1 + a) * (1 + i) * (t.x - e.x) +
        0.5 * (1 - n) * (1 - a) * (1 - i) * (s.x - t.x),
      0.5 * (1 - n) * (1 + a) * (1 - i) * (s.x - t.x) +
        0.5 * (1 - n) * (1 - a) * (1 + i) * (r.x - s.x),
      s.x
    ),
    h = o(
      t.y,
      0.5 * (1 - n) * (1 + a) * (1 + i) * (t.y - e.y) +
        0.5 * (1 - n) * (1 - a) * (1 - i) * (s.y - t.y),
      0.5 * (1 - n) * (1 + a) * (1 - i) * (s.y - t.y) +
        0.5 * (1 - n) * (1 - a) * (1 + i) * (r.y - s.y),
      s.y
    );
  return (e) => new c(l(e), h(e));
}
function ke(e, t, s, r) {
  let n = 2 * e + t - 2 * r + s,
    i = -3 * e + 3 * r - 2 * t + s,
    a = t;
  return (e) => 3 * n * (e * e) + 2 * i * e + a;
}
function Fe(e) {
  return 0 <= e && e <= 1;
}
function Te(e, t) {
  return Math.abs(e - t) <= Number.EPSILON;
}
function De(e) {
  return e < 0 ? -Math.pow(-e, 1 / 3) : Math.pow(e, 1 / 3);
}
function Oe(e, t, s, r) {
  let n = 3 * e - 6 * t + 3 * s,
    i = -3 * e + 3 * t,
    a = e,
    o = 3 * t - e - 3 * s + r;
  if (Te(o, 0)) {
    if (Te(n, 0)) return Te(i, 0) ? [] : [-a / i].filter(Fe);
    let e = Math.sqrt(i * i - 4 * n * a),
      t = 2 * n;
    return [(e - i) / t, (-i - e) / t].filter(Fe);
  }
  (n /= o), (i /= o), (a /= o);
  let l = (3 * i - n * n) / 3,
    h = l / 3,
    u = (2 * n * n * n - 9 * n * i + 27 * a) / 27,
    d = u / 2,
    c = d * d + h * h * h;
  if (c < 0) {
    let e = -l / 3,
      t = e * e * e,
      s = Math.sqrt(t),
      r = -u / (2 * s),
      i = r < -1 ? -1 : r > 1 ? 1 : r,
      a = Math.acos(i),
      o = 2 * De(s);
    return [
      o * Math.cos(a / 3) - n / 3,
      o * Math.cos((a + 2 * Math.PI) / 3) - n / 3,
      o * Math.cos((a + 4 * Math.PI) / 3) - n / 3,
    ].filter(Fe);
  }
  if (0 === c) {
    let e = d < 0 ? De(-d) : -De(d);
    return [2 * e - n / 3, -e - n / 3].filter(Fe);
  }
  let f = Math.sqrt(c);
  return [De(f - d) - De(f + d) - n / 3].filter(Fe);
}
function Ue(e, t, s, r, n) {
  let i = Oe(e.x - n, t.x - n, s.x - n, r.x - n);
  return i.length > 0 ? xe(e, t, s, r, i[0]).y : NaN;
}
function Le(e) {
  if (!e || 0 == e.length)
    throw new Error("Need at least one point for easingLinear.");
  let t = e.length;
  return (s) => {
    if (s <= 0 || 1 == e.length || s <= e[0].x) return e[0].y;
    for (let r = 0; r < t; r++)
      if (e[r].x >= s) return u(s, e[r - 1].x, e[r].x, e[r - 1].y, e[r].y);
    return e[e.length - 1].y;
  };
}
function Ne(e, t) {
  return (s) => Ue(f(0, 0), e, t, f(1, 1), s);
}
function He(e, t = "jump-end") {
  let s = 1 / e,
    r = 1 / (e + ("jump-end" == t || "jump-both" == t ? 1 : 0)),
    n = "jump-start" == t || "jump-both" == t ? r : 0;
  return (e) => {
    let t = Math.floor(e / s);
    return n + t * r;
  };
}
function Ge(e, t) {
  let s = Number.MAX_VALUE,
    r = { normal: f(0), distance: 0 };
  for (let n of [e, t])
    for (let i = 0; i < n.pts.length; i++) {
      let a = n.pts[i],
        o = n.pts[(i + 1) % n.pts.length].sub(a).normal().unit(),
        l = Number.MAX_VALUE,
        h = -Number.MAX_VALUE;
      for (let t = 0; t < e.pts.length; t++) {
        let s = e.pts[t].dot(o);
        (l = Math.min(l, s)), (h = Math.max(h, s));
      }
      let u = Number.MAX_VALUE,
        d = -Number.MAX_VALUE;
      for (let e = 0; e < t.pts.length; e++) {
        let s = t.pts[e].dot(o);
        (u = Math.min(u, s)), (d = Math.max(d, s));
      }
      let c = Math.min(h, d) - Math.max(l, u);
      if (c < 0) return null;
      if (c < Math.abs(s)) {
        let e = d - l,
          t = u - h;
        (s = Math.abs(e) < Math.abs(t) ? e : t),
          (r.normal = o),
          (r.distance = s);
      }
    }
  return r;
}
function je(e, t, s) {
  return (t.x - e.x) * (s.y - e.y) - (t.y - e.y) * (s.x - e.x) >= 0;
}
function Ve(e) {
  let t = 0,
    s = e[e.length - 1];
  for (let r = 0; r < e.length; r++)
    (t += (e[r].x - s.x) * (e[r].y + s.y)), (s = e[r]);
  return t < 0;
}
function Ke(e, t, s, r) {
  let n = r.x - s.x,
    i = r.y - s.y;
  return (
    (n * (e.y - s.y) - i * (e.x - s.x)) * (n * (t.y - s.y) - i * (t.x - s.x)) >=
    0
  );
}
function Ye(e, t, s, r) {
  return Ke(e, t, s, r) && Ke(e, s, t, r) && Ke(e, r, t, s);
}
function Qe(e, t, s, r) {
  for (let n of e)
    if (n !== t && n !== s && n !== r && Ye(n, t, s, r)) return !0;
  return !1;
}
function ze(e, t, s, r) {
  return je(e, t, s) && !Qe(r, e, t, s);
}
function Xe(e) {
  if (e.length < 3) return [];
  if (3 == e.length) return [e];
  let t = [],
    s = [],
    r = 0;
  for (let n = 0; n < e.length; n++) {
    let i = e[r],
      a = e[n];
    a.x < i.x || (a.x == i.x && (a.y, i.y)), (t[n] = n + 1), (s[n] = n - 1);
  }
  (t[t.length - 1] = 0), (s[0] = s.length - 1), Ve(e) || ([t, s] = [s, t]);
  let n = [];
  for (let r = 0; r < e.length; ++r) je(e[s[r]], e[r], e[t[r]]) || n.push(e[r]);
  let i,
    a,
    o = [],
    l = e.length,
    h = 1,
    u = 0;
  for (; l > 3; ) {
    (i = t[h]), (a = s[h]);
    let r = e[a],
      d = e[h],
      c = e[i];
    if (ze(r, d, c, n))
      o.push([r, d, c]),
        (t[a] = i),
        (s[i] = a),
        n.splice(n.indexOf(d), 1),
        --l,
        (u = 0);
    else if (++u > l) return [];
    h = i;
  }
  return (i = t[h]), (a = s[h]), o.push([e[a], e[h], e[i]]), o;
}
function We(e) {
  if (e.length < 3) return !1;
  let t = e.length - 2,
    s = e.length - 1,
    r = 0,
    n = e[s].sub(e[t]),
    i = e[r].sub(e[s]),
    a = n.cross(i);
  for (; r + 1 < e.length; )
    if (
      ((t = s),
      (s = r),
      r++,
      (n = e[s].sub(e[t])),
      (i = e[r].sub(e[s])),
      n.cross(i) * a < 0)
    )
      return !1;
  return !0;
}
t(we, "evaluateQuadratic"),
  t(ye, "evaluateQuadraticFirstDerivative"),
  t(Ae, "evaluateQuadraticSecondDerivative"),
  t(xe, "evaluateBezier"),
  t(ve, "evaluateBezierFirstDerivative"),
  t(be, "evaluateBezierSecondDerivative"),
  t(Ee, "evaluateCatmullRom"),
  t(Me, "evaluateCatmullRomFirstDerivative"),
  t(Se, "normalizedCurve"),
  t(qe, "curveLengthApproximation"),
  t(Be, "hermite"),
  t(Re, "cardinal"),
  t(Ce, "catmullRom"),
  t(Pe, "bezier"),
  t(Ie, "kochanekBartels"),
  t(ke, "hermiteFirstDerivative"),
  t(Fe, "inZeroOneDomain"),
  t(Te, "approximately"),
  t(De, "cubeRoot"),
  t(Oe, "getCubicRoots"),
  t(Ue, "cubicBezierYforX"),
  t(Le, "easingLinear"),
  t(Ne, "easingCubicBezier"),
  t(He, "easingSteps"),
  t(Ge, "sat"),
  t(je, "isOrientedCcw"),
  t(Ve, "isOrientedCcwPolygon"),
  t(Ke, "onSameSide"),
  t(Ye, "pointInTriangle"),
  t(Qe, "someInTriangle"),
  t(ze, "isEar"),
  t(Xe, "triangulate"),
  t(We, "isConvex");
var Je =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  Ze = "topleft",
  _e = "monospace",
  $e = "linear",
  et = [
    { name: "a_pos", size: 2 },
    { name: "a_uv", size: 2 },
    { name: "a_color", size: 4 },
  ],
  tt = 8192 * et.reduce((e, t) => e + t.size, 0),
  st =
    "\nattribute vec2 a_pos;\nattribute vec2 a_uv;\nattribute vec4 a_color;\n\nvarying vec2 v_pos;\nvarying vec2 v_uv;\nvarying vec4 v_color;\n\nvec4 def_vert() {\n\treturn vec4(a_pos, 0.0, 1.0);\n}\n\n{{user}}\n\nvoid main() {\n\tvec4 pos = vert(a_pos, a_uv, a_color);\n\tv_pos = a_pos;\n\tv_uv = a_uv;\n\tv_color = a_color;\n\tgl_Position = pos;\n}\n",
  rt =
    "\nprecision mediump float;\n\nvarying vec2 v_pos;\nvarying vec2 v_uv;\nvarying vec4 v_color;\n\nuniform sampler2D u_tex;\n\nvec4 def_frag() {\n\tvec4 texColor = texture2D(u_tex, v_uv);\n\treturn vec4((v_color.rgb * texColor.rgb), texColor.a) * v_color.a;\n}\n\n{{user}}\n\nvoid main() {\n\tgl_FragColor = frag(v_pos, v_uv, v_color, u_tex);\n\tif (gl_FragColor.a == 0.0) {\n\t\tdiscard;\n\t}\n}\n",
  nt =
    "\nvec4 vert(vec2 pos, vec2 uv, vec4 color) {\n\treturn def_vert();\n}\n",
  it =
    "\nvec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {\n\treturn def_frag();\n}\n",
  at = new Set(["id", "require"]),
  ot = new Set([
    "add",
    "fixedUpdate",
    "update",
    "draw",
    "destroy",
    "inspect",
    "drawInspect",
  ]),
  lt = Symbol.for("kaplay.cancel"),
  ht = class extends Map {
    static {
      t(this, "Registry");
    }
    lastID = 0;
    push(e) {
      let t = this.lastID;
      return this.set(t, e), this.lastID++, t;
    }
    pushd(e) {
      let t = this.push(e);
      return () => this.delete(t);
    }
  },
  ut = class e {
    static {
      t(this, "KEventController");
    }
    paused = !1;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(s) {
      let r = new e(() => s.forEach((e) => e.cancel()));
      return (
        Object.defineProperty(r, "paused", {
          get: t(() => s[0].paused, "get"),
          set: t((e) => s.forEach((t) => (t.paused = e)), "set"),
        }),
        (r.paused = !1),
        r
      );
    }
    static replace(e, s) {
      return (
        (e.cancel = () => s.cancel()),
        (s.paused = e.paused),
        Object.defineProperty(e, "paused", {
          get: t(() => s.paused, "get"),
          set: t((e) => (s.paused = e), "set"),
        }),
        e
      );
    }
  },
  dt = class {
    static {
      t(this, "KEvent");
    }
    cancellers = new WeakMap();
    handlers = new ht();
    add(e) {
      function s(...t) {
        if (!n.paused) return e(...t);
      }
      t(s, "handler");
      let r = this.handlers.pushd(s),
        n = new ut(r);
      return this.cancellers.set(s, r), n;
    }
    addOnce(e) {
      let t = this.add((...s) => {
        t.cancel(), e(...s);
      });
      return t;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((t) => {
        let s;
        t(...e) === lt && (s = this.cancellers.get(t)) && s();
      });
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  },
  ct = class {
    static {
      t(this, "KEventHandler");
    }
    handlers = {};
    registers = {};
    on(e, t) {
      return (
        this.handlers[e] || (this.handlers[e] = new dt()),
        this.handlers[e].add(t)
      );
    }
    onOnce(e, t) {
      let s = this.on(e, (...e) => {
        s.cancel(), t(...e);
      });
      return s;
    }
    next(e) {
      return new Promise((t) => {
        this.onOnce(e, (...e) => t(e[0]));
      });
    }
    trigger(e, ...t) {
      this.handlers[e] && this.handlers[e].trigger(...t);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  },
  ft = t((e) => e[0] instanceof r, "arrayIsColor"),
  pt = t((e) => e[0] instanceof c, "arrayIsVec2"),
  gt = t((e) => "number" == typeof e[0], "arrayIsNumber"),
  mt = class {
    static {
      t(this, "BinaryHeap");
    }
    _items;
    _compareFn;
    constructor(e = (e, t) => e < t) {
      (this._compareFn = e), (this._items = []);
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (0 === this._items.length) return null;
      let e = this._items[0],
        t = this._items.pop();
      return (
        0 !== this._items.length && ((this._items[0] = t), this.moveDown(0)), e
      );
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let t = Math.floor((e - 1) / 2);
        if (
          !this._compareFn(this._items[e], this._items[t]) &&
          this._items[e] >= this._items[t]
        )
          break;
        this.swap(e, t), (e = t);
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let t = 2 * e + 1;
        if (
          (t < this._items.length - 1 &&
            !this._compareFn(this._items[t], this._items[t + 1]) &&
            ++t,
          this._compareFn(this._items[e], this._items[t]))
        )
          break;
        this.swap(e, t), (e = t);
      }
    }
    swap(e, t) {
      [this._items[e], this._items[t]] = [this._items[t], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  };
function wt(e) {
  let t = window.atob(e),
    s = t.length,
    r = new Uint8Array(s);
  for (let e = 0; e < s; e++) r[e] = t.charCodeAt(e);
  return r.buffer;
}
function yt(e) {
  return wt(e.split(",")[1]);
}
function At(e, t) {
  let s = document.createElement("a");
  (s.href = t), (s.download = e), s.click();
}
function xt(e, t) {
  At(e, "data:text/plain;charset=utf-8," + t);
}
function vt(e, t) {
  xt(e, JSON.stringify(t));
}
function bt(e, t) {
  let s = URL.createObjectURL(t);
  At(e, s), URL.revokeObjectURL(s);
}
t(wt, "base64ToArrayBuffer"),
  t(yt, "dataURLToArrayBuffer"),
  t(At, "download"),
  t(xt, "downloadText"),
  t(vt, "downloadJSON"),
  t(bt, "downloadBlob");
var Et = t((e) => e.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
  Mt = t((e) => e.split(".").slice(0, -1).join("."), "getFileName");
function St(e, t) {
  if (e === t) return !0;
  let s = typeof e,
    r = typeof t;
  if (s !== r) return !1;
  if ("object" === s && "object" === r && null !== e && null !== t) {
    if (Array.isArray(e) !== Array.isArray(t)) return !1;
    let s = Object.keys(e),
      r = Object.keys(t);
    if (s.length !== r.length) return !1;
    for (let r of s) {
      if (!St(e[r], t[r])) return !1;
    }
    return !0;
  }
  return !1;
}
t(St, "deepEq");
var qt = new Set(),
  Bt = t(
    (e) => (e instanceof Error ? e.message : String(e)),
    "getErrorMessage"
  );
function Rt(e) {
  qt.has(e) || (qt.add(e), console.warn(e));
}
function Ct(e, t) {
  Rt(`${e} is deprecated. Use ${t} instead.`);
}
function Pt(e, t) {
  return Number(e.toFixed(t));
}
function It(e, t) {
  return (...s) => {
    let r = s.length;
    return r === e.length ? e(...s) : r === t.length ? t(...s) : void 0;
  };
}
t(Rt, "warn"), t(Ct, "deprecateMsg"), t(Pt, "toFixed"), t(It, "overload2");
var kt = Object.freeze([
  776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520,
]);
function Ft(e) {
  if ("string" != typeof e)
    throw new TypeError("string cannot be undefined or null");
  let t = [],
    s = 0,
    r = 0;
  for (; s < e.length; )
    (r += Tt(s + r, e)),
      jt(e[s + r]) && r++,
      Nt(e[s + r]) && r++,
      Ht(e[s + r]) && r++,
      Vt(e[s + r]) ? r++ : (t.push(e.substring(s, s + r)), (s += r), (r = 0));
  return t;
}
function Tt(e, t) {
  let s = t[e];
  if (!Dt(s) || e === t.length - 1) return 1;
  let r = s + t[e + 1],
    n = t.substring(e + 2, e + 5);
  return Ot(r) && Ot(n)
    ? 4
    : Ut(r) && Gt(n)
    ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2
    : Lt(n)
    ? 4
    : 2;
}
function Dt(e) {
  return e && Yt(e[0].charCodeAt(0), 55296, 56319);
}
function Ot(e) {
  return Yt(Kt(e), 127462, 127487);
}
function Ut(e) {
  return Yt(Kt(e), 127988, 127988);
}
function Lt(e) {
  return Yt(Kt(e), 127995, 127999);
}
function Nt(e) {
  return "string" == typeof e && Yt(e.charCodeAt(0), 65024, 65039);
}
function Ht(e) {
  return "string" == typeof e && Yt(e.charCodeAt(0), 8400, 8447);
}
function Gt(e) {
  let t = e.codePointAt(0);
  return "string" == typeof e && "number" == typeof t && Yt(t, 917504, 917631);
}
function jt(e) {
  return "string" == typeof e && kt.includes(e.charCodeAt(0));
}
function Vt(e) {
  return "string" == typeof e && 8205 === e.charCodeAt(0);
}
function Kt(e) {
  return ((e.charCodeAt(0) - 55296) << 10) + (e.charCodeAt(1) - 56320) + 65536;
}
function Yt(e, t, s) {
  return e >= t && e <= s;
}
t(Ft, "runes"),
  t(Tt, "nextUnits"),
  t(Dt, "isFirstOfSurrogatePair"),
  t(Ot, "isRegionalIndicator"),
  t(Ut, "isSubdivisionFlag"),
  t(Lt, "isFitzpatrickModifier"),
  t(Nt, "isVariationSelector"),
  t(Ht, "isDiacriticalMark"),
  t(Gt, "isSupplementarySpecialpurposePlane"),
  t(jt, "isGrapheme"),
  t(Vt, "isZeroWidthJoiner"),
  t(Kt, "codePointFromSurrogatePair"),
  t(Yt, "betweenInclusive");
var Qt,
  zt = t(
    (e, t) => (Array.isArray(e) ? e?.includes(t) : e === t),
    "isEqOrIncludes"
  ),
  Xt = t(
    (e, t) => (Array.isArray(t) ? t.some((t) => e.has(t)) : e.has(t)),
    "setHasOrIncludes"
  ),
  Wt = t((e, t, s) => {
    e.has(t) ? e.get(t)?.push(s) : e.set(t, [s]);
  }, "mapAddOrPush"),
  Jt = (() => {
    let e = 0;
    return () => e++;
  })(),
  Zt = t(() => Qt.lastInputDevice, "getLastInputDeviceType"),
  _t = t(() => {
    let e = Qt.buttons;
    for (let t in e) {
      let s = e[t].keyboard && [e[t].keyboard].flat(),
        r = e[t].keyboardCode && [e[t].keyboardCode].flat(),
        n = e[t].gamepad && [e[t].gamepad].flat(),
        i = e[t].mouse && [e[t].mouse].flat();
      s &&
        s.forEach((e) => {
          Wt(Qt.buttonsByKey, e, t);
        }),
        r &&
          r.forEach((e) => {
            Wt(Qt.buttonsByKeyCode, e, t);
          }),
        n &&
          n.forEach((e) => {
            Wt(Qt.buttonsByGamepad, e, t);
          }),
        i &&
          i.forEach((e) => {
            Wt(Qt.buttonsByMouse, e, t);
          });
    }
  }, "parseButtonBindings"),
  $t = class {
    static {
      t(this, "ButtonState");
    }
    pressed = new Set([]);
    pressedRepeat = new Set([]);
    released = new Set([]);
    down = new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  },
  es = class {
    static {
      t(this, "GamepadState");
    }
    buttonState = new $t();
    stickState = new Map();
  },
  ts = class {
    static {
      t(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e),
        (this.timer += e),
        this.timer >= 1 &&
          ((this.timer = 0),
          (this.fps = Math.round(
            1 / (this.dts.reduce((e, t) => e + t) / this.dts.length)
          )),
          (this.dts = []));
    }
  },
  ss = {
    "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "select",
        10: "lstick",
        16: "start",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "start",
        10: "lstick",
        16: "select",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    default: {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
  },
  rs = t((e) => {
    let t = e.buttons ?? {};
    return {
      canvas: e.canvas,
      buttons: t,
      buttonsByKey: new Map(),
      buttonsByMouse: new Map(),
      buttonsByGamepad: new Map(),
      buttonsByKeyCode: new Map(),
      loopID: null,
      stopped: !1,
      dt: 0,
      fixedDt: 0.02,
      restDt: 0,
      time: 0,
      realTime: 0,
      fpsCounter: new ts(),
      timeScale: 1,
      skipTime: !1,
      isHidden: !1,
      numFrames: 0,
      mousePos: new c(0),
      mouseDeltaPos: new c(0),
      keyState: new $t(),
      mouseState: new $t(),
      mergedGamepadState: new es(),
      gamepadStates: new Map(),
      lastInputDevice: null,
      buttonState: new $t(),
      gamepads: [],
      charInputted: [],
      isMouseMoved: !1,
      lastWidth: e.canvas.offsetWidth,
      lastHeight: e.canvas.offsetHeight,
      events: new ct(),
    };
  }, "initAppState"),
  ns = t((e) => {
    if (!e.canvas) throw new Error("Please provide a canvas");
    let s = rs(e);
    function r() {
      return s.dt * s.timeScale;
    }
    function n() {
      return s.fixedDt * s.timeScale;
    }
    function i() {
      return s.restDt * s.timeScale;
    }
    function a() {
      return s.isHidden;
    }
    function o() {
      return s.time;
    }
    function l() {
      return s.fpsCounter.fps;
    }
    function h() {
      return s.numFrames;
    }
    function d() {
      return s.canvas.toDataURL();
    }
    function p(e) {
      s.canvas.style.cursor = e;
    }
    function g() {
      return s.canvas.style.cursor;
    }
    function m(e) {
      if (e)
        try {
          let e = s.canvas.requestPointerLock();
          e.catch && e.catch((e) => console.error(e));
        } catch (e) {
          console.error(e);
        }
      else document.exitPointerLock();
    }
    function w() {
      return !!document.pointerLockElement;
    }
    function y(e) {
      e.requestFullscreen
        ? e.requestFullscreen()
        : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
    }
    function A() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    function x(e = !0) {
      e ? y(s.canvas) : A();
    }
    function v() {
      return (
        document.fullscreenElement === s.canvas ||
        document.webkitFullscreenElement === s.canvas
      );
    }
    function b() {
      s.stopped = !0;
      let e = Object.entries(Me),
        t = Object.entries(Se),
        r = Object.entries(qe);
      for (let [t, r] of e) s.canvas.removeEventListener(t, r);
      for (let [e, s] of t) document.removeEventListener(e, s);
      for (let [e, t] of r) window.removeEventListener(e, t);
      Ie.disconnect();
    }
    function E(n, i) {
      null !== s.loopID && cancelAnimationFrame(s.loopID);
      let a = 0,
        o = 0,
        l = t((t) => {
          if (s.stopped) return;
          if ("visible" !== document.visibilityState)
            return void (s.loopID = requestAnimationFrame(l));
          let h = t / 1e3,
            u = Math.min(h - s.realTime, 0.25),
            d = e.maxFPS ? 1 / e.maxFPS : 0;
          if (((s.realTime = h), (o += u), o > d)) {
            if (!s.skipTime) {
              for (a += o, s.dt = s.fixedDt, s.restDt = 0; a > s.fixedDt; )
                (a -= s.fixedDt), a < s.fixedDt && (s.restDt = a), n();
              (s.restDt = a),
                (s.dt = o),
                (s.time += r()),
                s.fpsCounter.tick(s.dt);
            }
            (o = 0), (s.skipTime = !1), s.numFrames++, i(Ae, xe);
          }
          s.loopID = requestAnimationFrame(l);
        }, "frame");
      l(0);
    }
    function M() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    function S() {
      return s.mousePos.clone();
    }
    function q() {
      return s.mouseDeltaPos.clone();
    }
    function B(e = "left") {
      return s.mouseState.pressed.has(e);
    }
    function R(e = "left") {
      return s.mouseState.down.has(e);
    }
    function C(e = "left") {
      return s.mouseState.released.has(e);
    }
    function P() {
      return s.isMouseMoved;
    }
    function I(e) {
      return void 0 === e
        ? s.keyState.pressed.size > 0
        : Xt(s.keyState.pressed, e);
    }
    function k(e) {
      return void 0 === e
        ? s.keyState.pressedRepeat.size > 0
        : Xt(s.keyState.pressedRepeat, e);
    }
    function F(e) {
      return void 0 === e ? s.keyState.down.size > 0 : Xt(s.keyState.down, e);
    }
    function T(e) {
      return void 0 === e
        ? s.keyState.released.size > 0
        : Xt(s.keyState.released, e);
    }
    function D(e) {
      return void 0 === e
        ? s.mergedGamepadState.buttonState.pressed.size > 0
        : Xt(s.mergedGamepadState.buttonState.pressed, e);
    }
    function O(e) {
      return void 0 === e
        ? s.mergedGamepadState.buttonState.down.size > 0
        : Xt(s.mergedGamepadState.buttonState.down, e);
    }
    function U(e) {
      return void 0 === e
        ? s.mergedGamepadState.buttonState.released.size > 0
        : Xt(s.mergedGamepadState.buttonState.released, e);
    }
    function L(e) {
      return void 0 === e
        ? s.buttonState.pressed.size > 0
        : Xt(s.buttonState.pressed, e);
    }
    function N(e) {
      return void 0 === e
        ? s.buttonState.down.size > 0
        : Xt(s.buttonState.down, e);
    }
    function H(e) {
      return void 0 === e
        ? s.buttonState.released.size > 0
        : Xt(s.buttonState.released, e);
    }
    function G(e) {
      return s.buttons?.[e];
    }
    function j(e, t) {
      s.buttons[e] = { ...s.buttons[e], ...t };
    }
    function V(e) {
      s.buttonState.press(e), s.events.trigger("buttonPress", e);
    }
    function K(e) {
      s.buttonState.release(e), s.events.trigger("buttonRelease", e);
    }
    function Y(e) {
      return s.events.on("resize", e);
    }
    (Qt = s),
      _t(),
      t(r, "dt"),
      t(n, "fixedDt"),
      t(i, "restDt"),
      t(a, "isHidden"),
      t(o, "time"),
      t(l, "fps"),
      t(h, "numFrames"),
      t(d, "screenshot"),
      t(p, "setCursor"),
      t(g, "getCursor"),
      t(m, "setCursorLocked"),
      t(w, "isCursorLocked"),
      t(y, "enterFullscreen"),
      t(A, "exitFullscreen"),
      t(x, "setFullscreen"),
      t(v, "isFullscreen"),
      t(b, "quit"),
      t(E, "run"),
      t(M, "isTouchscreen"),
      t(S, "mousePos"),
      t(q, "mouseDeltaPos"),
      t(B, "isMousePressed"),
      t(R, "isMouseDown"),
      t(C, "isMouseReleased"),
      t(P, "isMouseMoved"),
      t(I, "isKeyPressed"),
      t(k, "isKeyPressedRepeat"),
      t(F, "isKeyDown"),
      t(T, "isKeyReleased"),
      t(D, "isGamepadButtonPressed"),
      t(O, "isGamepadButtonDown"),
      t(U, "isGamepadButtonReleased"),
      t(L, "isButtonPressed"),
      t(N, "isButtonDown"),
      t(H, "isButtonReleased"),
      t(G, "getButton"),
      t(j, "setButton"),
      t(V, "pressButton"),
      t(K, "releaseButton"),
      t(Y, "onResize");
    let Q = It(
        (e) => s.events.on("keyDown", e),
        (e, t) => s.events.on("keyDown", (s) => zt(e, s) && t(s))
      ),
      z = It(
        (e) => s.events.on("keyPress", (t) => e(t)),
        (e, t) => s.events.on("keyPress", (s) => zt(e, s) && t(s))
      ),
      X = It(
        (e) => s.events.on("keyPressRepeat", e),
        (e, t) => s.events.on("keyPressRepeat", (s) => zt(e, s) && t(s))
      ),
      W = It(
        (e) => s.events.on("keyRelease", e),
        (e, t) => s.events.on("keyRelease", (s) => zt(e, s) && t(s))
      ),
      J = It(
        (e) => s.events.on("mouseDown", (t) => e(t)),
        (e, t) => s.events.on("mouseDown", (s) => zt(e, s) && t(s))
      ),
      Z = It(
        (e) => s.events.on("mousePress", (t) => e(t)),
        (e, t) => s.events.on("mousePress", (s) => zt(e, s) && t(s))
      ),
      _ = It(
        (e) => s.events.on("mouseRelease", (t) => e(t)),
        (e, t) => s.events.on("mouseRelease", (s) => s === e && t(s))
      );
    function $(e) {
      return s.events.on("mouseMove", () => e(S(), q()));
    }
    function ee(e) {
      return s.events.on("charInput", e);
    }
    function te(e) {
      return s.events.on("touchStart", e);
    }
    function se(e) {
      return s.events.on("touchMove", e);
    }
    function re(e) {
      return s.events.on("touchEnd", e);
    }
    function ne(e) {
      return s.events.on("scroll", e);
    }
    function ie(e) {
      return s.events.on("hide", e);
    }
    function ae(e) {
      return s.events.on("show", e);
    }
    t($, "onMouseMove"),
      t(ee, "onCharInput"),
      t(te, "onTouchStart"),
      t(se, "onTouchMove"),
      t(re, "onTouchEnd"),
      t(ne, "onScroll"),
      t(ie, "onHide"),
      t(ae, "onShow");
    let oe = It(
        (e) => s.events.on("gamepadButtonPress", (t, s) => e(t, s)),
        (e, t) =>
          s.events.on("gamepadButtonPress", (s, r) => zt(e, s) && t(s, r))
      ),
      le = It(
        (e) => s.events.on("gamepadButtonDown", (t, s) => e(t, s)),
        (e, t) =>
          s.events.on("gamepadButtonDown", (s, r) => zt(e, s) && t(s, r))
      ),
      he = It(
        (e) => s.events.on("gamepadButtonRelease", (t, s) => e(t, s)),
        (e, t) =>
          s.events.on("gamepadButtonRelease", (s, r) => zt(e, s) && t(s, r))
      );
    function ue(e, t) {
      return s.events.on("gamepadStick", (s, r, n) => s === e && t(r, n));
    }
    function de(e) {
      s.events.on("gamepadConnect", e);
    }
    function ce(e) {
      s.events.on("gamepadDisconnect", e);
    }
    function fe(e) {
      return s.mergedGamepadState.stickState.get(e) || new c(0);
    }
    function pe() {
      return [...s.charInputted];
    }
    function ge() {
      return [...s.gamepads];
    }
    t(ue, "onGamepadStick"),
      t(de, "onGamepadConnect"),
      t(ce, "onGamepadDisconnect"),
      t(fe, "getGamepadStick"),
      t(pe, "charInputted"),
      t(ge, "getGamepads");
    let me = It(
        (e) => s.events.on("buttonPress", (t) => e(t)),
        (e, t) => s.events.on("buttonPress", (s) => zt(e, s) && t(s))
      ),
      we = It(
        (e) => s.events.on("buttonDown", (t) => e(t)),
        (e, t) => s.events.on("buttonDown", (s) => zt(e, s) && t(s))
      ),
      ye = It(
        (e) => s.events.on("buttonRelease", (t) => e(t)),
        (e, t) => s.events.on("buttonRelease", (s) => zt(e, s) && t(s))
      );
    function Ae() {
      s.events.trigger("input"),
        s.keyState.down.forEach((e) => s.events.trigger("keyDown", e)),
        s.mouseState.down.forEach((e) => s.events.trigger("mouseDown", e)),
        s.buttonState.down.forEach((e) => {
          s.events.trigger("buttonDown", e);
        }),
        Ee();
    }
    function xe() {
      s.keyState.update(),
        s.mouseState.update(),
        s.buttonState.update(),
        s.mergedGamepadState.buttonState.update(),
        s.mergedGamepadState.stickState.forEach((e, t) => {
          s.mergedGamepadState.stickState.set(t, new c(0));
        }),
        (s.charInputted = []),
        (s.isMouseMoved = !1),
        (s.mouseDeltaPos = new c(0)),
        s.gamepadStates.forEach((e) => {
          e.buttonState.update(),
            e.stickState.forEach((t, s) => {
              e.stickState.set(s, new c(0));
            });
        });
    }
    function ve(e) {
      let r = {
        index: e.index,
        isPressed: t(
          (t) => s.gamepadStates.get(e.index)?.buttonState.pressed.has(t) || !1,
          "isPressed"
        ),
        isDown: t(
          (t) => s.gamepadStates.get(e.index)?.buttonState.down.has(t) || !1,
          "isDown"
        ),
        isReleased: t(
          (t) =>
            s.gamepadStates.get(e.index)?.buttonState.released.has(t) || !1,
          "isReleased"
        ),
        getStick: t(
          (t) => s.gamepadStates.get(e.index)?.stickState.get(t) || f(),
          "getStick"
        ),
      };
      return (
        s.gamepads.push(r),
        s.gamepadStates.set(e.index, {
          buttonState: new $t(),
          stickState: new Map([
            ["left", new c(0)],
            ["right", new c(0)],
          ]),
        }),
        r
      );
    }
    function be(e) {
      (s.gamepads = s.gamepads.filter((t) => t.index !== e.index)),
        s.gamepadStates.delete(e.index);
    }
    function Ee() {
      for (let e of navigator.getGamepads())
        e && !s.gamepadStates.has(e.index) && ve(e);
      for (let t of s.gamepads) {
        let r = navigator.getGamepads()[t.index];
        if (!r) continue;
        let n = (e.gamepads ?? {})[r.id] || ss[r.id] || ss.default,
          i = s.gamepadStates.get(t.index);
        if (i) {
          for (let e = 0; e < r.buttons.length; e++) {
            let a = n.buttons[e],
              o = r.buttons[e],
              l = s.buttonsByGamepad.has(a);
            if (o.pressed) {
              if (i.buttonState.down.has(a)) {
                s.events.trigger("gamepadButtonDown", a, t);
                continue;
              }
              (s.lastInputDevice = "gamepad"),
                l &&
                  s.buttonsByGamepad.get(a)?.forEach((e) => {
                    s.buttonState.press(e), s.events.trigger("buttonPress", e);
                  }),
                s.mergedGamepadState.buttonState.press(a),
                i.buttonState.press(a),
                s.events.trigger("gamepadButtonPress", a, t);
            } else
              i.buttonState.down.has(a) &&
                (l &&
                  s.buttonsByGamepad.get(a)?.forEach((e) => {
                    s.buttonState.release(e),
                      s.events.trigger("buttonRelease", e);
                  }),
                s.mergedGamepadState.buttonState.release(a),
                i.buttonState.release(a),
                s.events.trigger("gamepadButtonRelease", a, t));
          }
          for (let e in n.sticks) {
            let a = n.sticks[e];
            if (!a) continue;
            let o = new c(r.axes[a.x], r.axes[a.y]);
            i.stickState.set(e, o),
              s.mergedGamepadState.stickState.set(e, o),
              s.events.trigger("gamepadStick", e, o, t);
          }
        }
      }
    }
    t(Ae, "processInput"),
      t(xe, "resetInput"),
      t(ve, "registerGamepad"),
      t(be, "removeGamepad"),
      t(Ee, "processGamepad");
    let Me = {},
      Se = {},
      qe = {},
      Be = e.pixelDensity || 1;
    Me.mousemove = (e) => {
      let t = new c(e.offsetX, e.offsetY),
        r = new c(e.movementX, e.movementY);
      if (v()) {
        let r = s.canvas.width / Be,
          n = s.canvas.height / Be,
          i = window.innerWidth,
          a = window.innerHeight;
        if (i / a > r / n) {
          let s = a / n,
            o = (i - r * s) / 2;
          (t.x = u(e.offsetX - o, 0, r * s, 0, r)),
            (t.y = u(e.offsetY, 0, n * s, 0, n));
        } else {
          let s = i / r,
            o = (a - n * s) / 2;
          (t.x = u(e.offsetX, 0, r * s, 0, r)),
            (t.y = u(e.offsetY - o, 0, n * s, 0, n));
        }
      }
      s.events.onOnce("input", () => {
        (s.isMouseMoved = !0),
          (s.mousePos = t),
          (s.mouseDeltaPos = r),
          s.events.trigger("mouseMove");
      });
    };
    let Re = ["left", "middle", "right", "back", "forward"];
    (Me.mousedown = (e) => {
      s.events.onOnce("input", () => {
        let t = Re[e.button];
        t &&
          ((s.lastInputDevice = "mouse"),
          s.buttonsByMouse.has(t) &&
            s.buttonsByMouse.get(t)?.forEach((e) => {
              s.buttonState.press(e), s.events.trigger("buttonPress", e);
            }),
          s.mouseState.press(t),
          s.events.trigger("mousePress", t));
      });
    }),
      (Me.mouseup = (e) => {
        s.events.onOnce("input", () => {
          let t = Re[e.button];
          t &&
            (s.buttonsByMouse.has(t) &&
              s.buttonsByMouse.get(t)?.forEach((e) => {
                s.buttonState.release(e), s.events.trigger("buttonRelease", e);
              }),
            s.mouseState.release(t),
            s.events.trigger("mouseRelease", t));
        });
      });
    let Ce = new Set([
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ]),
      Pe = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        " ": "space",
      };
    (Me.keydown = (e) => {
      Ce.has(e.key) && e.preventDefault(),
        s.events.onOnce("input", () => {
          let t = Pe[e.key] || e.key.toLowerCase(),
            r = e.code;
          if (void 0 === t) throw new Error(`Unknown key: ${e.key}`);
          1 === t.length
            ? (s.events.trigger("charInput", t), s.charInputted.push(t))
            : "space" === t &&
              (s.events.trigger("charInput", " "), s.charInputted.push(" ")),
            e.repeat
              ? (s.keyState.pressRepeat(t),
                s.events.trigger("keyPressRepeat", t))
              : ((s.lastInputDevice = "keyboard"),
                s.buttonsByKey.has(t) &&
                  s.buttonsByKey.get(t)?.forEach((e) => {
                    s.buttonState.press(e), s.events.trigger("buttonPress", e);
                  }),
                s.buttonsByKeyCode.has(r) &&
                  s.buttonsByKeyCode.get(r)?.forEach((e) => {
                    s.buttonState.press(e), s.events.trigger("buttonPress", e);
                  }),
                s.keyState.press(t),
                s.events.trigger("keyPressRepeat", t),
                s.events.trigger("keyPress", t));
        });
    }),
      (Me.keyup = (e) => {
        s.events.onOnce("input", () => {
          let t = Pe[e.key] || e.key.toLowerCase(),
            r = e.code;
          s.buttonsByKey.has(t) &&
            s.buttonsByKey.get(t)?.forEach((e) => {
              s.buttonState.release(e), s.events.trigger("buttonRelease", e);
            }),
            s.buttonsByKeyCode.has(r) &&
              s.buttonsByKeyCode.get(r)?.forEach((e) => {
                s.buttonState.release(e), s.events.trigger("buttonRelease", e);
              }),
            s.keyState.release(t),
            s.events.trigger("keyRelease", t);
        });
      }),
      (Me.touchstart = (t) => {
        t.preventDefault(),
          s.events.onOnce("input", () => {
            let r = [...t.changedTouches],
              n = s.canvas.getBoundingClientRect();
            !1 !== e.touchToMouse &&
              ((s.mousePos = new c(r[0].clientX - n.x, r[0].clientY - n.y)),
              (s.lastInputDevice = "mouse"),
              s.buttonsByMouse.has("left") &&
                s.buttonsByMouse.get("left")?.forEach((e) => {
                  s.buttonState.press(e), s.events.trigger("buttonPress", e);
                }),
              s.mouseState.press("left"),
              s.events.trigger("mousePress", "left")),
              r.forEach((e) => {
                s.events.trigger(
                  "touchStart",
                  new c(e.clientX - n.x, e.clientY - n.y),
                  e
                );
              });
          });
      }),
      (Me.touchmove = (t) => {
        t.preventDefault(),
          s.events.onOnce("input", () => {
            let r = [...t.changedTouches],
              n = s.canvas.getBoundingClientRect();
            if (!1 !== e.touchToMouse) {
              let e = s.mousePos;
              (s.mousePos = new c(r[0].clientX - n.x, r[0].clientY - n.y)),
                (s.mouseDeltaPos = s.mousePos.sub(e)),
                s.events.trigger("mouseMove");
            }
            r.forEach((e) => {
              s.events.trigger(
                "touchMove",
                new c(e.clientX - n.x, e.clientY - n.y),
                e
              );
            });
          });
      }),
      (Me.touchend = (t) => {
        s.events.onOnce("input", () => {
          let r = [...t.changedTouches],
            n = s.canvas.getBoundingClientRect();
          !1 !== e.touchToMouse &&
            ((s.mousePos = new c(r[0].clientX - n.x, r[0].clientY - n.y)),
            (s.mouseDeltaPos = new c(0, 0)),
            s.buttonsByMouse.has("left") &&
              s.buttonsByMouse.get("left")?.forEach((e) => {
                s.buttonState.release(e), s.events.trigger("buttonRelease", e);
              }),
            s.mouseState.release("left"),
            s.events.trigger("mouseRelease", "left")),
            r.forEach((e) => {
              s.events.trigger(
                "touchEnd",
                new c(e.clientX - n.x, e.clientY - n.y),
                e
              );
            });
        });
      }),
      (Me.touchcancel = (t) => {
        s.events.onOnce("input", () => {
          let r = [...t.changedTouches],
            n = s.canvas.getBoundingClientRect();
          !1 !== e.touchToMouse &&
            ((s.mousePos = new c(r[0].clientX - n.x, r[0].clientY - n.y)),
            s.mouseState.release("left"),
            s.events.trigger("mouseRelease", "left")),
            r.forEach((e) => {
              s.events.trigger(
                "touchEnd",
                new c(e.clientX - n.x, e.clientY - n.y),
                e
              );
            });
        });
      }),
      (Me.wheel = (e) => {
        e.preventDefault(),
          s.events.onOnce("input", () => {
            s.events.trigger("scroll", new c(e.deltaX, e.deltaY));
          });
      }),
      (Me.contextmenu = (e) => e.preventDefault()),
      (Se.visibilitychange = () => {
        "visible" === document.visibilityState
          ? ((s.skipTime = !0), (s.isHidden = !1), s.events.trigger("show"))
          : ((s.isHidden = !0), s.events.trigger("hide"));
      }),
      (qe.gamepadconnected = (e) => {
        let t = ve(e.gamepad);
        s.events.onOnce("input", () => {
          s.events.trigger("gamepadConnect", t);
        });
      }),
      (qe.gamepaddisconnected = (e) => {
        let t = ge().filter((t) => t.index === e.gamepad.index)[0];
        be(e.gamepad),
          s.events.onOnce("input", () => {
            s.events.trigger("gamepadDisconnect", t);
          });
      });
    for (let [e, t] of Object.entries(Me)) s.canvas.addEventListener(e, t);
    for (let [e, t] of Object.entries(Se)) document.addEventListener(e, t);
    for (let [e, t] of Object.entries(qe)) window.addEventListener(e, t);
    let Ie = new ResizeObserver((e) => {
      for (let t of e)
        if (t.target === s.canvas) {
          if (
            s.lastWidth === s.canvas.offsetWidth &&
            s.lastHeight === s.canvas.offsetHeight
          )
            return;
          (s.lastWidth = s.canvas.offsetWidth),
            (s.lastHeight = s.canvas.offsetHeight),
            s.events.onOnce("input", () => {
              s.events.trigger("resize");
            });
        }
    });
    return (
      Ie.observe(s.canvas),
      {
        state: s,
        dt: r,
        fixedDt: n,
        restDt: i,
        time: o,
        run: E,
        canvas: s.canvas,
        fps: l,
        numFrames: h,
        quit: b,
        isHidden: a,
        setFullscreen: x,
        isFullscreen: v,
        setCursor: p,
        screenshot: d,
        getGamepads: ge,
        getCursor: g,
        setCursorLocked: m,
        isCursorLocked: w,
        isTouchscreen: M,
        mousePos: S,
        mouseDeltaPos: q,
        isKeyDown: F,
        isKeyPressed: I,
        isKeyPressedRepeat: k,
        isKeyReleased: T,
        isMouseDown: R,
        isMousePressed: B,
        isMouseReleased: C,
        isMouseMoved: P,
        isGamepadButtonPressed: D,
        isGamepadButtonDown: O,
        isGamepadButtonReleased: U,
        getGamepadStick: fe,
        isButtonPressed: L,
        isButtonDown: N,
        isButtonReleased: H,
        setButton: j,
        getButton: G,
        pressButton: V,
        releaseButton: K,
        charInputted: pe,
        onResize: Y,
        onKeyDown: Q,
        onKeyPress: z,
        onKeyPressRepeat: X,
        onKeyRelease: W,
        onMouseDown: J,
        onMousePress: Z,
        onMouseRelease: _,
        onMouseMove: $,
        onCharInput: ee,
        onTouchStart: te,
        onTouchMove: se,
        onTouchEnd: re,
        onScroll: ne,
        onHide: ie,
        onShow: ae,
        onGamepadButtonDown: le,
        onGamepadButtonPress: oe,
        onGamepadButtonRelease: he,
        onGamepadStick: ue,
        onGamepadConnect: de,
        onGamepadDisconnect: ce,
        onButtonPress: me,
        onButtonDown: we,
        onButtonRelease: ye,
        getLastInputDeviceType: Zt,
        events: s.events,
      }
    );
  }, "initApp");
function is() {
  return Va.app.dt();
}
function as() {
  return Va.app.fixedDt();
}
function os() {
  return Va.app.restDt();
}
t(is, "dt"), t(as, "fixedDt"), t(os, "restDt");
var ls = new c(-1, -1),
  hs = new c(0, -1),
  us = new c(1, -1),
  ds = new c(-1, 0),
  cs = new c(0, 0),
  fs = new c(1, 0),
  ps = new c(-1, 1),
  gs = new c(0, 1),
  ms = new c(1, 1);
function ws(e) {
  switch (e) {
    case "topleft":
      return ls;
    case "top":
      return hs;
    case "topright":
      return us;
    case "left":
      return ds;
    case "center":
      return cs;
    case "right":
      return fs;
    case "botleft":
      return ps;
    case "bot":
      return gs;
    case "botright":
      return ms;
    default:
      return e;
  }
}
function ys(e) {
  switch (e) {
    case "left":
    default:
      return 0;
    case "center":
      return 0.5;
    case "right":
      return 1;
  }
}
function As(e) {
  return e.createBuffer(1, 1, 44100);
}
t(ws, "anchorPt"), t(ys, "alignPt"), t(As, "createEmptyAudioBuffer");
var xs = 2.5949095,
  vs = 2.70158,
  bs = (2 * Math.PI) / 3,
  Es = (2 * Math.PI) / 4.5,
  Ms = {
    linear: t((e) => e, "linear"),
    easeInSine: t((e) => 1 - Math.cos((e * Math.PI) / 2), "easeInSine"),
    easeOutSine: t((e) => Math.sin((e * Math.PI) / 2), "easeOutSine"),
    easeInOutSine: t((e) => -(Math.cos(Math.PI * e) - 1) / 2, "easeInOutSine"),
    easeInQuad: t((e) => e * e, "easeInQuad"),
    easeOutQuad: t((e) => 1 - (1 - e) * (1 - e), "easeOutQuad"),
    easeInOutQuad: t(
      (e) => (e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2),
      "easeInOutQuad"
    ),
    easeInCubic: t((e) => e * e * e, "easeInCubic"),
    easeOutCubic: t((e) => 1 - Math.pow(1 - e, 3), "easeOutCubic"),
    easeInOutCubic: t(
      (e) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2),
      "easeInOutCubic"
    ),
    easeInQuart: t((e) => e * e * e * e, "easeInQuart"),
    easeOutQuart: t((e) => 1 - Math.pow(1 - e, 4), "easeOutQuart"),
    easeInOutQuart: t(
      (e) => (e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2),
      "easeInOutQuart"
    ),
    easeInQuint: t((e) => e * e * e * e * e, "easeInQuint"),
    easeOutQuint: t((e) => 1 - Math.pow(1 - e, 5), "easeOutQuint"),
    easeInOutQuint: t(
      (e) =>
        e < 0.5 ? 16 * e * e * e * e * e : 1 - Math.pow(-2 * e + 2, 5) / 2,
      "easeInOutQuint"
    ),
    easeInExpo: t(
      (e) => (0 === e ? 0 : Math.pow(2, 10 * e - 10)),
      "easeInExpo"
    ),
    easeOutExpo: t(
      (e) => (1 === e ? 1 : 1 - Math.pow(2, -10 * e)),
      "easeOutExpo"
    ),
    easeInOutExpo: t(
      (e) =>
        0 === e
          ? 0
          : 1 === e
          ? 1
          : e < 0.5
          ? Math.pow(2, 20 * e - 10) / 2
          : (2 - Math.pow(2, -20 * e + 10)) / 2,
      "easeInOutExpo"
    ),
    easeInCirc: t((e) => 1 - Math.sqrt(1 - Math.pow(e, 2)), "easeInCirc"),
    easeOutCirc: t((e) => Math.sqrt(1 - Math.pow(e - 1, 2)), "easeOutCirc"),
    easeInOutCirc: t(
      (e) =>
        e < 0.5
          ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2
          : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2,
      "easeInOutCirc"
    ),
    easeInBack: t((e) => vs * e * e * e - 1.70158 * e * e, "easeInBack"),
    easeOutBack: t(
      (e) => 1 + vs * Math.pow(e - 1, 3) + 1.70158 * Math.pow(e - 1, 2),
      "easeOutBack"
    ),
    easeInOutBack: t(
      (e) =>
        e < 0.5
          ? (Math.pow(2 * e, 2) * (7.189819 * e - xs)) / 2
          : (Math.pow(2 * e - 2, 2) * ((xs + 1) * (2 * e - 2) + xs) + 2) / 2,
      "easeInOutBack"
    ),
    easeInElastic: t(
      (e) =>
        0 === e
          ? 0
          : 1 === e
          ? 1
          : -Math.pow(2, 10 * e - 10) * Math.sin((10 * e - 10.75) * bs),
      "easeInElastic"
    ),
    easeOutElastic: t(
      (e) =>
        0 === e
          ? 0
          : 1 === e
          ? 1
          : Math.pow(2, -10 * e) * Math.sin((10 * e - 0.75) * bs) + 1,
      "easeOutElastic"
    ),
    easeInOutElastic: t(
      (e) =>
        0 === e
          ? 0
          : 1 === e
          ? 1
          : e < 0.5
          ? (-Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * Es)) / 2
          : (Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * Es)) / 2 +
            1,
      "easeInOutElastic"
    ),
    easeInBounce: t((e) => 1 - Ms.easeOutBounce(1 - e), "easeInBounce"),
    easeOutBounce: t(
      (e) =>
        e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375,
      "easeOutBounce"
    ),
    easeInOutBounce: t(
      (e) =>
        e < 0.5
          ? (1 - Ms.easeOutBounce(1 - 2 * e)) / 2
          : (1 + Ms.easeOutBounce(2 * e - 1)) / 2,
      "easeInOutBounce"
    ),
  },
  Ss = Ms;
function qs(e, t, s) {
  let r = [],
    n = t;
  for (r.push(n); n !== e; ) {
    if (((n = s.get(n)), null == n)) return null;
    r.push(n);
  }
  return r.reverse();
}
function Bs(e, t, s) {
  let r = new mt((e, t) => e.cost < t.cost);
  r.insert({ cost: 0, node: t });
  let n = new Map();
  n.set(t, t);
  let i = new Map();
  for (i.set(t, 0); 0 !== r.length; ) {
    let t = r.remove()?.node;
    if (t === s) break;
    let a = e.getNeighbours(t);
    for (let o of a) {
      let a = (i.get(t) || 0) + e.getCost(t, o) + e.getHeuristic(o, s);
      (!i.has(o) || a < i.get(o)) &&
        (i.set(o, a), r.insert({ cost: a, node: o }), n.set(o, t));
    }
  }
  return qs(t, s, n);
}
t(qs, "buildPath"), t(Bs, "aStarSearch");
var Rs = class {
    static {
      t(this, "NavEdge");
    }
    a;
    b;
    polygon;
    constructor(e, t, s) {
      (this.a = e), (this.b = t), (this.polygon = new WeakRef(s));
    }
    isLeft(e, t) {
      return (
        (this.b.x - this.a.x) * (t - this.a.y) -
        (e - this.a.x) * (this.b.y - this.a.y)
      );
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  },
  Cs = class {
    static {
      t(this, "NavPolygon");
    }
    _edges;
    _centroid;
    _id;
    constructor(e) {
      this._id = e;
    }
    get id() {
      return this._id;
    }
    set edges(e) {
      this._edges = e;
      let t = 0,
        s = 0,
        r = 0;
      for (let e of this._edges) {
        e.polygon = new WeakRef(this);
        let n = e.a.x * e.b.y - e.a.y * e.b.x;
        (t += (e.a.x + e.b.x) * n), (s += (e.a.y + e.b.y) * n), (r += n);
      }
      (r /= 2), (this._centroid = f(t / (6 * r), s / (6 * r)));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(e) {
      let t = !1;
      for (let s of this.edges)
        s.b.y > e.y != s.a.y > e.y &&
          e.x < ((s.a.x - s.b.x) * (e.y - s.b.y)) / (s.a.y - s.b.y) + s.b.x &&
          (t = !t);
      return t;
    }
  },
  Ps = class {
    static {
      t(this, "NavMesh");
    }
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      (this._polygons = []), (this._pointCache = {}), (this._edgeCache = {});
    }
    _addPoint(e) {
      let t = this._pointCache[`${e.x}_${e.y}`];
      return t || ((t = e.clone()), (this._pointCache[`${e.x}_${e.y}`] = t), t);
    }
    _addEdge(e) {
      let t = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
      return (this._edgeCache[t] = e), e;
    }
    _findEdge(e, t) {
      let s = `${e.x}_${e.y}-${t.x}_${t.y}`;
      return this._edgeCache[s];
    }
    _findCommonEdge(e, t) {
      for (let s of e.edges) {
        let e = this._findEdge(s.b, s.a);
        if (e && e.polygon.deref().id === t.id) return e;
      }
      return null;
    }
    addPolygon(e) {
      let t = new Cs(this._polygons.length),
        s = e.map((s, r) => new Rs(s, e[(r + 1) % e.length], t));
      (t.edges = s), this._polygons.push(t);
      for (let e of t.edges) this._addEdge(e);
      return t;
    }
    addRect(e, t) {
      let s = this._addPoint(e),
        r = this._addPoint(e.add(t.x, 0)),
        n = this._addPoint(e.add(t)),
        i = this._addPoint(e.add(0, t.y));
      return this.addPolygon([s, r, n, i]);
    }
    _getLocation(e) {
      for (let t of this._polygons) if (t.contains(e)) return t;
      return null;
    }
    getNeighbours(e) {
      let t = [];
      for (let s of this._polygons[e].edges) {
        let e = this._findEdge(s.b, s.a);
        if (e) {
          let s = e.polygon.deref();
          s && t.push(s.id);
        }
      }
      return t;
    }
    getCost(e, t) {
      return 1;
    }
    getHeuristic(e, t) {
      let s = this._polygons[e],
        r = this._polygons[t],
        n = s.centroid.x - r.centroid.x,
        i = s.centroid.y - r.centroid.y;
      return Math.sqrt(n * n + i * i);
    }
    getPath(e, t) {
      return void 0 === e || void 0 === t
        ? []
        : e === t
        ? [e, t]
        : Bs(this, e, t);
    }
    getWaypointPath(e, t, s) {
      let r = s?.type || "centroids",
        n = this._getLocation(e),
        i = this._getLocation(t);
      if (void 0 === n || void 0 === i) return [];
      let a = this.getPath(n.id, i.id);
      if (!a) return [];
      if ("edges" === r) {
        let s = [];
        for (let e = 1; e < a.length; e++) {
          let t = this._polygons[a[e - 1]],
            r = this._polygons[a[e]],
            n = this._findCommonEdge(t, r);
          s.push(n.middle.add(r.centroid.sub(n.middle).unit().scale(4)));
        }
        return [e, ...s, t];
      }
      return [e, ...a.slice(1, -1).map((e) => this._polygons[e].centroid), t];
    }
  };
function Is(e) {
  let t = new y();
  return (
    e.pos && t.translate(e.pos),
    e.scale && t.scale(e.scale),
    e.angle && t.rotate(e.angle),
    e.parent ? t.mult(e.parent.transform) : t
  );
}
function ks(e) {
  return new c((e.x / Vs()) * 2 - 1, (-e.y / Ks()) * 2 + 1);
}
function Fs(e, t, s, r, n, i = 1) {
  (r = a(r % 360)), (n = a(n % 360)) <= r && (n += 2 * Math.PI);
  let o = [],
    l = Math.ceil(((n - r) / a(8)) * i),
    h = (n - r) / l,
    u = f(Math.cos(r), Math.sin(r)),
    d = f(Math.cos(h), Math.sin(h));
  for (let r = 0; r <= l; r++)
    o.push(e.add(t * u.x, s * u.y)),
      (u = f(u.x * d.x - u.y * d.y, u.x * d.y + u.y * d.x));
  return o;
}
function Ts(...e) {
  let t = n(...e),
    s = e[3] ?? 1;
  (Va.gfx.bgColor = t),
    (Va.gfx.bgAlpha = s),
    Va.gfx.ggl.gl.clearColor(t.r / 255, t.g / 255, t.b / 255, s);
}
function Ds() {
  return Va.gfx.bgColor?.clone?.() ?? null;
}
function Os(...e) {
  if (void 0 === e[0]) return;
  let t = f(...e);
  (0 === t.x && 0 === t.y) || Va.gfx.transform.translate(t);
}
function Us() {
  Va.gfx.transformStack.push(Va.gfx.transform.clone());
}
function Ls(e) {
  Va.gfx.transform = e.clone();
}
function Ns(...e) {
  if (void 0 === e[0]) return;
  let t = f(...e);
  (1 === t.x && 1 === t.y) || Va.gfx.transform.scale(t);
}
function Hs(e) {
  e && Va.gfx.transform.rotate(e);
}
function Gs() {
  Va.gfx.transformStack.length > 0 &&
    (Va.gfx.transform = Va.gfx.transformStack.pop());
}
function js() {
  Va.gfx.renderer.flush();
}
function Vs() {
  return Va.gfx.width;
}
function Ks() {
  return Va.gfx.height;
}
function Ys() {
  return (
    (Va.gfx.viewport.width + Va.gfx.viewport.height) /
    (Va.gfx.width + Va.gfx.height)
  );
}
function Qs(e) {
  return new c(
    (e.x * Va.gfx.viewport.width) / Va.gfx.width,
    (e.y * Va.gfx.viewport.height) / Va.gfx.height
  );
}
function zs(e) {
  return new c(
    ((e.x - Va.gfx.viewport.x) * Vs()) / Va.gfx.viewport.width,
    ((e.y - Va.gfx.viewport.y) * Ks()) / Va.gfx.viewport.height
  );
}
function Xs() {
  return zs(Va.app.mousePos());
}
function Ws() {
  return f(Vs() / 2, Ks() / 2);
}
t(Is, "calcTransform"),
  t(ks, "screen2ndc"),
  t(Fs, "getArcPts"),
  t(Ts, "setBackground"),
  t(Ds, "getBackground"),
  t(Os, "pushTranslate"),
  t(Us, "pushTransform"),
  t(Ls, "pushMatrix"),
  t(Ns, "pushScale"),
  t(Hs, "pushRotate"),
  t(Gs, "popTransform"),
  t(js, "flush"),
  t(Vs, "width"),
  t(Ks, "height"),
  t(Ys, "getViewportScale"),
  t(Qs, "contentToView"),
  t(zs, "windowToContent"),
  t(Xs, "mousePos"),
  t(Ws, "center");
var Js = class {
  static {
    t(this, "TexPacker");
  }
  lastTextureId = 0;
  textures = [];
  bigTextures = [];
  texturesPosition = new Map();
  canvas;
  c2d;
  x = 0;
  y = 0;
  curHeight = 0;
  gfx;
  padding;
  constructor(e, t, s, r) {
    (this.gfx = e),
      (this.canvas = document.createElement("canvas")),
      (this.canvas.width = t),
      (this.canvas.height = s),
      (this.textures = [Zr.fromImage(e, this.canvas)]),
      (this.bigTextures = []),
      (this.padding = r);
    let n = this.canvas.getContext("2d");
    if (!n) throw new Error("Failed to get 2d context");
    this.c2d = n;
  }
  add(e) {
    let t = e.width + 2 * this.padding,
      s = e.height + 2 * this.padding;
    if (t > this.canvas.width || s > this.canvas.height) {
      let t = Zr.fromImage(this.gfx, e);
      return this.bigTextures.push(t), [t, new p(0, 0, 1, 1), 0];
    }
    this.x + t > this.canvas.width &&
      ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
      this.y + s > this.canvas.height &&
        (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
        this.textures.push(Zr.fromImage(this.gfx, this.canvas)),
        (this.x = 0),
        (this.y = 0),
        (this.curHeight = 0));
    let r = this.textures[this.textures.length - 1],
      n = new c(this.x + this.padding, this.y + this.padding);
    return (
      (this.x += t),
      s > this.curHeight && (this.curHeight = s),
      e instanceof ImageData
        ? this.c2d.putImageData(e, n.x, n.y)
        : this.c2d.drawImage(e, n.x, n.y),
      r.update(this.canvas),
      this.texturesPosition.set(this.lastTextureId, {
        position: n,
        size: new c(e.width, e.height),
        texture: r,
      }),
      this.lastTextureId++,
      [
        r,
        new p(
          n.x / this.canvas.width,
          n.y / this.canvas.height,
          e.width / this.canvas.width,
          e.height / this.canvas.height
        ),
        this.lastTextureId - 1,
      ]
    );
  }
  free() {
    for (let e of this.textures) e.free();
    for (let e of this.bigTextures) e.free();
  }
};
function Zs(e) {
  return "string" != typeof e || Et(e) ? e : Va.assets.urlPrefix + e;
}
t(Zs, "fixURL");
var _s = class e {
    static {
      t(this, "Asset");
    }
    loaded = !1;
    data = null;
    error = null;
    onLoadEvents = new dt();
    onErrorEvents = new dt();
    onFinishEvents = new dt();
    constructor(e) {
      e.then((e) => {
        (this.loaded = !0), (this.data = e), this.onLoadEvents.trigger(e);
      })
        .catch((e) => {
          if (((this.error = e), !(this.onErrorEvents.numListeners() > 0)))
            throw e;
          this.onErrorEvents.trigger(e);
        })
        .finally(() => {
          this.onFinishEvents.trigger(), (this.loaded = !0);
        });
    }
    static loaded(t) {
      let s = new e(Promise.resolve(t));
      return (s.data = t), (s.loaded = !0), s;
    }
    onLoad(e) {
      return (
        this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this
      );
    }
    onError(e) {
      return (
        this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e),
        this
      );
    }
    onFinish(e) {
      return this.loaded ? e() : this.onFinishEvents.add(e), this;
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  },
  $s = class {
    static {
      t(this, "AssetBucket");
    }
    assets = new Map();
    lastUID = 0;
    add(e, t) {
      let s = e ?? this.lastUID++ + "",
        r = new _s(t);
      return this.assets.set(s, r), r;
    }
    addLoaded(e, t) {
      let s = e ?? this.lastUID++ + "",
        r = _s.loaded(t);
      return this.assets.set(s, r), r;
    }
    get(e) {
      return this.assets.get(e);
    }
    progress() {
      if (0 === this.assets.size) return 1;
      let e = 0;
      return (
        this.assets.forEach((t) => {
          t.loaded && e++;
        }),
        e / this.assets.size
      );
    }
    getFailedAssets() {
      return Array.from(this.assets.keys())
        .filter((e) => null !== this.assets.get(e).error)
        .map((e) => [e, this.assets.get(e)]);
    }
  };
function er(e) {
  return fetch(e).then((t) => {
    if (!t.ok) throw new Error(`Failed to fetch "${e}"`);
    return t;
  });
}
function tr(e) {
  return er(e).then((e) => e.json());
}
function sr(e) {
  return er(e).then((e) => e.text());
}
function rr(e) {
  return er(e).then((e) => e.arrayBuffer());
}
function nr(e) {
  return void 0 !== e && (Va.assets.urlPrefix = e), Va.assets.urlPrefix;
}
function ir(e, t) {
  return Va.assets.custom.add(e, tr(Zs(t)));
}
function ar(e) {
  let t = new Image();
  return (
    (t.crossOrigin = "anonymous"),
    (t.src = e),
    new Promise((s, r) => {
      (t.onload = () => s(t)),
        (t.onerror = () => r(new Error(`Failed to load image from "${e}"`)));
    })
  );
}
function or() {
  let e = [
    Va.assets.sprites,
    Va.assets.sounds,
    Va.assets.shaders,
    Va.assets.fonts,
    Va.assets.bitmapFonts,
    Va.assets.custom,
  ];
  return e.reduce((e, t) => e + t.progress(), 0) / e.length;
}
function lr() {
  return [
    Va.assets.sprites,
    Va.assets.sounds,
    Va.assets.shaders,
    Va.assets.fonts,
    Va.assets.bitmapFonts,
    Va.assets.custom,
  ].reduce((e, t) => e.concat(t.getFailedAssets()), []);
}
function hr(e) {
  return Va.assets.custom.get(e) ?? null;
}
function ur(e) {
  return Va.assets.custom.add(null, e);
}
t(er, "fetchURL"),
  t(tr, "fetchJSON"),
  t(sr, "fetchText"),
  t(rr, "fetchArrayBuffer"),
  t(nr, "loadRoot"),
  t(ir, "loadJSON"),
  t(ar, "loadImg"),
  t(or, "loadProgress"),
  t(lr, "getFailedAssets"),
  t(hr, "getAsset"),
  t(ur, "load");
var dr = t(
    (e, t) => ({
      urlPrefix: "",
      sprites: new $s(),
      fonts: new $s(),
      bitmapFonts: new $s(),
      sounds: new $s(),
      shaders: new $s(),
      custom: new $s(),
      music: {},
      packer: new Js(e, 2048, 2048, t),
      loaded: !1,
    }),
    "initAssets"
  ),
  cr = class e {
    static {
      t(this, "SpriteData");
    }
    tex;
    frames = [new p(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, t, s = {}, r = null) {
      (this.tex = e),
        t && (this.frames = t),
        (this.anims = s),
        (this.slice9 = r);
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(t, s = {}) {
      return "string" == typeof t
        ? e.fromURL(t, s)
        : Promise.resolve(e.fromImage(t, s));
    }
    static fromImage(t, s = {}) {
      let [r, n] = Va.assets.packer.add(t),
        i = s.frames
          ? s.frames.map(
              (e) =>
                new p(n.x + e.x * n.w, n.y + e.y * n.h, e.w * n.w, e.h * n.h)
            )
          : mr(s.sliceX || 1, s.sliceY || 1, n.x, n.y, n.w, n.h);
      return new e(r, i, s.anims, s.slice9);
    }
    static fromURL(t, s = {}) {
      return ar(t).then((t) => e.fromImage(t, s));
    }
  };
function fr(e) {
  if ("string" == typeof e) {
    let t = pr(e);
    if (t) return t;
    if (or() < 1) return null;
    throw new Error(`Sprite not found: ${e}`);
  }
  if (e instanceof cr) return _s.loaded(e);
  if (e instanceof _s) return e;
  throw new Error(`Invalid sprite: ${e}`);
}
function pr(e) {
  return Va.assets.sprites.get(e) ?? null;
}
function gr(e, t, s = { sliceX: 1, sliceY: 1, anims: {} }) {
  return (
    (t = Zs(t)),
    Array.isArray(t)
      ? t.some((e) => "string" == typeof e)
        ? Va.assets.sprites.add(
            e,
            Promise.all(
              t.map((e) => ("string" == typeof e ? ar(e) : Promise.resolve(e)))
            ).then((e) => wr(e, s))
          )
        : Va.assets.sprites.addLoaded(e, wr(t, s))
      : "string" == typeof t
      ? Va.assets.sprites.add(e, cr.from(t, s))
      : Va.assets.sprites.addLoaded(e, cr.fromImage(t, s))
  );
}
function mr(e = 1, t = 1, s = 0, r = 0, n = 1, i = 1) {
  let a = [],
    o = n / e,
    l = i / t;
  for (let n = 0; n < t; n++)
    for (let t = 0; t < e; t++) a.push(new p(s + t * o, r + n * l, o, l));
  return a;
}
function wr(e, t = {}) {
  let s = document.createElement("canvas"),
    r = e[0].width,
    n = e[0].height;
  (s.width = r * e.length), (s.height = n);
  let i = s.getContext("2d");
  if (!i) throw new Error("Failed to create canvas context");
  e.forEach((e, t) => {
    e instanceof ImageData
      ? i.putImageData(e, t * r, 0)
      : i.drawImage(e, t * r, 0);
  });
  let a = i.getImageData(0, 0, e.length * r, n);
  return cr.fromImage(a, { ...t, sliceX: e.length, sliceY: 1 });
}
function yr(e = "bean") {
  return gr(
    e,
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg=="
  );
}
function Ar(e, t, s) {
  (t = Zs(t)), (s = Zs(s)), "string" == typeof t && !s && (s = Mt(t) + ".json");
  let r = "string" == typeof s ? tr(s) : Promise.resolve(s);
  return Va.assets.sprites.add(
    e,
    r.then((e) => {
      let s = e.meta.size,
        r = e.frames.map(
          (e) =>
            new p(
              e.frame.x / s.w,
              e.frame.y / s.h,
              e.frame.w / s.w,
              e.frame.h / s.h
            )
        ),
        n = {};
      for (let t of e.meta.frameTags)
        t.from === t.to
          ? (n[t.name] = t.from)
          : (n[t.name] = {
              from: t.from,
              to: t.to,
              speed: 10,
              loop: !0,
              pingpong: "pingpong" === t.direction,
            });
      return cr.from(t, { frames: r, anims: n });
    })
  );
}
t(fr, "resolveSprite"),
  t(pr, "getSprite"),
  t(gr, "loadSprite"),
  t(mr, "slice"),
  t(wr, "createSpriteSheet"),
  t(yr, "loadBean"),
  t(Ar, "loadAseprite");
var xr = class {
  static {
    t(this, "FontData");
  }
  fontface;
  filter = $e;
  outline = null;
  size = 64;
  constructor(e, t = {}) {
    if (
      ((this.fontface = e),
      (this.filter = t.filter ?? $e),
      (this.size = t.size ?? 64),
      this.size > 256)
    )
      throw new Error("Max font size: 256");
    t.outline &&
      ((this.outline = { width: 1, color: n(0, 0, 0) }),
      "number" == typeof t.outline
        ? (this.outline.width = t.outline)
        : "object" == typeof t.outline &&
          (t.outline.width && (this.outline.width = t.outline.width),
          t.outline.color && (this.outline.color = t.outline.color)));
  }
};
function vr(e) {
  if (!e) return vr(Va.globalOpt.font ?? "monospace");
  if ("string" == typeof e) {
    let t = Sr(e),
      s = br(e);
    if (t) return t.data ?? t;
    if (s) return s.data ?? s;
    if (document.fonts.check(`64px ${e}`)) return e;
    if (or() < 1) return null;
    throw new Error(`Font not found: ${e}`);
  }
  return e instanceof _s && e.data ? e.data : e;
}
function br(e) {
  return Va.assets.fonts.get(e) ?? null;
}
function Er(e, t, s = {}) {
  let r = Zs(t),
    n = new FontFace(e, "string" == typeof t ? `url(${r})` : r);
  return (
    document.fonts.add(n),
    Va.assets.fonts.add(
      e,
      n
        .load()
        .catch((e) => {
          throw new Error(`Failed to load font from "${r}": ${e}`);
        })
        .then((e) => new xr(e, s))
    )
  );
}
function Mr(e, t, s, r) {
  let n = e.width / t,
    i = {},
    a = r.split("").entries();
  for (let [e, r] of a) i[r] = new p((e % n) * t, Math.floor(e / n) * s, t, s);
  return { tex: e, map: i, size: s };
}
function Sr(e) {
  return Va.assets.bitmapFonts.get(e) ?? null;
}
function qr(e, t, s, r, n = {}) {
  let i = Zs(t);
  return Va.assets.bitmapFonts.add(
    e,
    ar(i).then((e) => Mr(Zr.fromImage(Va.gfx.ggl, e, n), s, r, n.chars ?? Je))
  );
}
function Br(e, t) {
  return (
    (t = Zs(t)),
    Va.assets.sprites.add(
      e,
      new Promise(async (e) => {
        let s = "string" == typeof t ? await tr(t) : t,
          r = await Promise.all(s.frames.map(ar)),
          n = document.createElement("canvas");
        (n.width = s.width), (n.height = s.height * s.frames.length);
        let i = n.getContext("2d");
        if (!i) throw new Error("Failed to create canvas context");
        r.forEach((e, t) => {
          i.drawImage(e, 0, t * s.height);
        }),
          e(await gr(null, n, { sliceY: s.frames.length, anims: s.anims }));
      })
    )
  );
}
t(vr, "resolveFont"),
  t(br, "getFont"),
  t(Er, "loadFont"),
  t(Mr, "makeFont"),
  t(Sr, "getBitmapFont"),
  t(qr, "loadBitmapFont"),
  t(Br, "loadPedit");
var Rr = class {
  static {
    t(this, "Shader");
  }
  ctx;
  glProgram;
  constructor(e, t, s, r) {
    (this.ctx = e), e.onDestroy(() => this.free());
    let n = e.gl,
      i = n.createShader(n.VERTEX_SHADER),
      a = n.createShader(n.FRAGMENT_SHADER);
    if (!i || !a) throw new Error("Failed to create shader");
    n.shaderSource(i, t),
      n.shaderSource(a, s),
      n.compileShader(i),
      n.compileShader(a);
    let o = n.createProgram();
    if (
      ((this.glProgram = o),
      n.attachShader(o, i),
      n.attachShader(o, a),
      r.forEach((e, t) => n.bindAttribLocation(o, t, e)),
      n.linkProgram(o),
      !n.getProgramParameter(o, n.LINK_STATUS))
    ) {
      let e = n.getShaderInfoLog(i);
      if (e) throw new Error("VERTEX SHADER " + e);
      let t = n.getShaderInfoLog(a);
      if (t) throw new Error("FRAGMENT SHADER " + t);
    }
    n.deleteShader(i), n.deleteShader(a);
  }
  bind() {
    this.ctx.pushProgram(this.glProgram);
  }
  unbind() {
    this.ctx.popProgram();
  }
  send(e) {
    let t = this.ctx.gl;
    for (let s in e) {
      let n = e[s],
        i = t.getUniformLocation(this.glProgram, s);
      if ("number" == typeof n) t.uniform1f(i, n);
      else if (n instanceof y) t.uniformMatrix4fv(i, !1, new Float32Array(n.m));
      else if (n instanceof r) t.uniform3f(i, n.r, n.g, n.b);
      else if (n instanceof c) t.uniform2f(i, n.x, n.y);
      else {
        if (!Array.isArray(n)) throw new Error("Unsupported uniform data type");
        n[0],
          gt(n)
            ? t.uniform1fv(i, n)
            : pt(n)
            ? t.uniform2fv(i, n.map((e) => [e.x, e.y]).flat())
            : ft(n) && t.uniform3fv(i, n.map((e) => [e.r, e.g, e.b]).flat());
      }
    }
  }
  free() {
    this.ctx.gl.deleteProgram(this.glProgram);
  }
};
function Cr(e, t = nt, s = it) {
  let r = st.replace("{{user}}", t ?? nt),
    n = rt.replace("{{user}}", s ?? it);
  try {
    return new Rr(
      e,
      r,
      n,
      et.map((e) => e.name)
    );
  } catch (e) {
    let t = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
      s = Bt(e).match(t);
    if (!s?.groups) throw e;
    let r = Number(s.groups.line) - 14,
      n = s.groups.msg.trim(),
      i = s.groups.type.toLowerCase();
    throw new Error(`${i} shader line ${r}: ${n}`);
  }
}
function Pr(e) {
  if (!e) return Va.gfx.defShader;
  if ("string" == typeof e) {
    let t = Ir(e);
    if (t) return t.data ?? t;
    if (or() < 1) return null;
    throw new Error(`Shader not found: ${e}`);
  }
  return e instanceof _s && e.data ? e.data : e;
}
function Ir(e) {
  return Va.assets.shaders.get(e) ?? null;
}
function kr(e, t, s) {
  return Va.assets.shaders.addLoaded(e, Cr(Va.gfx.ggl, t, s));
}
function Fr(e, s, r) {
  (s = Zs(s)), (r = Zs(r));
  let n = t((e) => (e ? sr(e) : Promise.resolve(null)), "resolveUrl"),
    i = Promise.all([n(s), n(r)]).then(([e, t]) => Cr(Va.gfx.ggl, e, t));
  return Va.assets.shaders.add(e, i);
}
t(Cr, "makeShader"),
  t(Pr, "resolveShader"),
  t(Ir, "getShader"),
  t(kr, "loadShader"),
  t(Fr, "loadShaderURL");
var Tr = class e {
  static {
    t(this, "SoundData");
  }
  buf;
  constructor(e) {
    this.buf = e;
  }
  static fromArrayBuffer(t) {
    return new Promise((e, s) => Va.audio.ctx.decodeAudioData(t, e, s)).then(
      (t) => new e(t)
    );
  }
  static fromURL(t) {
    return Et(t)
      ? e.fromArrayBuffer(yt(t))
      : rr(t).then((t) => e.fromArrayBuffer(t));
  }
};
function Dr(e) {
  if ("string" == typeof e) {
    let t = Or(e);
    if (t) return t;
    if (or() < 1) return null;
    throw new Error(`Sound not found: ${e}`);
  }
  if (e instanceof Tr) return _s.loaded(e);
  if (e instanceof _s) return e;
  throw new Error(`Invalid sound: ${e}`);
}
function Or(e) {
  return Va.assets.sounds.get(e) ?? null;
}
function Ur(e, t) {
  return (
    (t = Zs(t)),
    Va.assets.sounds.add(
      e,
      "string" == typeof t ? Tr.fromURL(t) : Tr.fromArrayBuffer(t)
    )
  );
}
function Lr(e, t) {
  let s = Zs(t);
  return (new Audio(s).preload = "auto"), (Va.assets.music[e] = s);
}
function Nr(e, t) {
  return (
    (e = Zs(e)),
    ur(
      "string" == typeof t
        ? new Promise((s, r) => {
            tr(t).then((t) => {
              Nr(e, t).then(s).catch(r);
            });
          })
        : cr.from(e).then((e) => {
            let s = {};
            for (let r in t) {
              let n = t[r],
                i = e.frames[0],
                a = 2048 * i.w,
                o = 2048 * i.h,
                l = n.frames
                  ? n.frames.map(
                      (e) =>
                        new p(
                          i.x + ((n.x + e.x) / a) * i.w,
                          i.y + ((n.y + e.y) / o) * i.h,
                          (e.w / a) * i.w,
                          (e.h / o) * i.h
                        )
                    )
                  : mr(
                      n.sliceX || 1,
                      n.sliceY || 1,
                      i.x + (n.x / a) * i.w,
                      i.y + (n.y / o) * i.h,
                      (n.width / a) * i.w,
                      (n.height / o) * i.h
                    ),
                h = new cr(e.tex, l, n.anims);
              Va.assets.sprites.addLoaded(r, h), (s[r] = h);
            }
            return s;
          })
    )
  );
}
function Hr(e, t, s = !1, r, n, i = {}) {
  let a = r ?? Va.gfx.defTex,
    o = Pr(n ?? Va.gfx.defShader);
  if (!o || o instanceof _s) return;
  let l =
      Va.gfx.fixed || s
        ? Va.gfx.transform
        : Va.game.cam.transform.mult(Va.gfx.transform),
    h = [];
  for (let t of e) {
    let e = ks(l.multVec2(t.pos));
    h.push(
      e.x,
      e.y,
      t.uv.x,
      t.uv.y,
      t.color.r / 255,
      t.color.g / 255,
      t.color.b / 255,
      t.opacity
    );
  }
  Va.gfx.renderer.push(Va.gfx.ggl.gl.TRIANGLES, h, t, o, a, i);
}
function Gr(e) {
  if (!e.pts) throw new Error('drawPolygon() requires property "pts".');
  let t = e.pts.length;
  if (!(t < 3)) {
    if (
      (Us(), Os(e.pos), Ns(e.scale), Hs(e.angle), Os(e.offset), !1 !== e.fill)
    ) {
      let s,
        n = e.color ?? r.WHITE,
        i = e.pts.map((t, s) => ({
          pos: new c(t.x, t.y),
          uv: e.uv ? e.uv[s] : new c(0, 0),
          color: e.colors && e.colors[s] ? e.colors[s].mult(n) : n,
          opacity: e.opacity ?? 1,
        }));
      (s = e.triangulate
        ? Xe(e.pts)
            .map((t) => t.map((t) => e.pts.indexOf(t)))
            .flat()
        : [...Array(t - 2).keys()].map((e) => [0, e + 1, e + 2]).flat()),
        Hr(
          i,
          e.indices ?? s,
          e.fixed,
          e.uv ? e.tex : Va.gfx.defTex,
          e.shader,
          e.uniform ?? void 0
        );
    }
    e.outline &&
      Xr({
        pts: [...e.pts, e.pts[0]],
        radius: e.radius,
        width: e.outline.width,
        color: e.outline.color,
        join: e.outline.join,
        uniform: e.uniform,
        fixed: e.fixed,
        opacity: e.opacity ?? e.outline.opacity,
      }),
      Gs();
  }
}
function jr(e) {
  if (void 0 === e.radiusX || void 0 === e.radiusY)
    throw new Error(
      'drawEllipse() requires properties "radiusX" and "radiusY".'
    );
  if (0 === e.radiusX || 0 === e.radiusY) return;
  let t = e.start ?? 0,
    s = e.end ?? 360,
    r = ws(e.anchor ?? "center").scale(new c(-e.radiusX, -e.radiusY)),
    n = Fs(r, e.radiusX, e.radiusY, t, s, e.resolution);
  n.unshift(r);
  let i = Object.assign({}, e, {
    pts: n,
    radius: 0,
    ...(e.gradient
      ? { colors: [e.gradient[0], ...Array(n.length - 1).fill(e.gradient[1])] }
      : {}),
  });
  if (s - t >= 360 && e.outline)
    return (
      !1 !== e.fill && Gr(Object.assign({}, i, { outline: null })),
      void Gr(Object.assign({}, i, { pts: n.slice(1), fill: !1 }))
    );
  Gr(i);
}
function Vr(e) {
  if ("number" != typeof e.radius)
    throw new Error('drawCircle() requires property "radius".');
  0 !== e.radius &&
    jr(
      Object.assign({}, e, { radiusX: e.radius, radiusY: e.radius, angle: 0 })
    );
}
function Kr(e) {
  let { p1: t, p2: s } = e;
  if (!t || !s)
    throw new Error('drawLine() requires properties "p1" and "p2".');
  let n = e.width || 1,
    i = s
      .sub(t)
      .unit()
      .normal()
      .scale(0.5 * n);
  Hr(
    [t.sub(i), t.add(i), s.add(i), s.sub(i)].map((t) => ({
      pos: new c(t.x, t.y),
      uv: new c(0),
      color: e.color ?? r.WHITE,
      opacity: e.opacity ?? 1,
    })),
    [0, 1, 3, 1, 2, 3],
    e.fixed,
    Va.gfx.defTex,
    e.shader,
    e.uniform ?? void 0
  );
}
function Yr(e) {
  let t,
    s = e.pts,
    n = [],
    i = 0.5 * (e.width || 1),
    a = s[0] === s[s.length - 1] || s[0].eq(s[s.length - 1]),
    o = e.pos || f(0, 0);
  t = a ? s[0].sub(s[s.length - 2]) : s[1].sub(s[0]);
  let l,
    h = t.len(),
    u = t.normal().scale(-i / h),
    d = s[0];
  if (!a)
    switch (e.cap) {
      case "square": {
        let e = t.scale(-i / h);
        n.push(d.add(e).add(u)), n.push(d.add(e).sub(u));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = u.scale(-1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          n.push(d),
            n.push(d.sub(s)),
            (s = f(s.x * r - s.y * a, s.x * a + s.y * r));
      }
    }
  for (let e = 1; e < s.length; e++) {
    if (d === s[e] || d.eq(s[e])) continue;
    (l = d), (d = s[e]);
    let r = d.sub(l),
      a = r.len(),
      o = r.normal().scale(-i / a),
      c = t.cross(r);
    if (Math.abs(c) / (h * a) < 0.05) {
      n.push(l.add(u)),
        n.push(l.sub(u)),
        t.dot(r) < 0 && (n.push(l.sub(u)), n.push(l.add(u))),
        (t = r),
        (h = a),
        (u = o);
      continue;
    }
    let f = o.sub(u).cross(r) / c,
      p = u.add(t.scale(f));
    c > 0
      ? (n.push(l.add(p)), n.push(l.sub(u)), n.push(l.add(p)), n.push(l.sub(o)))
      : (n.push(l.add(u)),
        n.push(l.sub(p)),
        n.push(l.add(o)),
        n.push(l.sub(p))),
      (t = r),
      (h = a),
      (u = o);
  }
  if (!a)
    switch ((n.push(d.add(u)), n.push(d.sub(u)), e.cap)) {
      case "square": {
        let e = t.scale(i / h);
        n.push(d.add(e).add(u)), n.push(d.add(e).sub(u));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = u.scale(1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          (s = f(s.x * r - s.y * a, s.x * a + s.y * r)),
            n.push(d),
            n.push(d.sub(s));
      }
    }
  if (n.length < 4) return;
  let c = n.map((t) => ({
      pos: o.add(t),
      uv: f(),
      color: e.color || r.WHITE,
      opacity: e.opacity ?? 1,
    })),
    p = [],
    g = 0;
  for (let e = 0; e < n.length - 2; e += 2)
    (p[g++] = e + 1),
      (p[g++] = e),
      (p[g++] = e + 2),
      (p[g++] = e + 2),
      (p[g++] = e + 3),
      (p[g++] = e + 1);
  a &&
    ((p[g++] = n.length - 1),
    (p[g++] = n.length - 2),
    (p[g++] = 0),
    (p[g++] = 0),
    (p[g++] = 1),
    (p[g++] = n.length - 1)),
    Hr(c, p, e.fixed, Va.gfx.defTex, e.shader, e.uniform ?? void 0);
}
function Qr(e) {
  let t,
    s = e.pts,
    n = [],
    i = 0.5 * (e.width || 1),
    o = s[0] === s[s.length - 1] || s[0].eq(s[s.length - 1]),
    l = e.pos || f(0, 0);
  t = o ? s[0].sub(s[s.length - 2]) : s[1].sub(s[0]);
  let h,
    u = t.len(),
    d = t.normal().scale(-i / u),
    c = s[0];
  if (!o)
    switch (e.cap) {
      case "square": {
        let e = t.scale(-i / u);
        n.push(c.add(e).add(d)), n.push(c.add(e).sub(d));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = d.scale(-1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          n.push(c),
            n.push(c.sub(s)),
            (s = f(s.x * r - s.y * a, s.x * a + s.y * r));
      }
    }
  for (let e = 1; e < s.length; e++) {
    if (c === s[e] || c.eq(s[e])) continue;
    (h = c), (c = s[e]);
    let r = c.sub(h),
      o = r.len(),
      l = r.normal().scale(-i / o),
      p = t.cross(r);
    if (Math.abs(p) / (u * o) < 0.05) {
      n.push(h.add(d)),
        n.push(h.sub(d)),
        t.dot(r) < 0 && (n.push(h.sub(d)), n.push(h.add(d))),
        (t = r),
        (u = o),
        (d = l);
      continue;
    }
    let g = l.sub(d).cross(r) / p,
      m = d.add(t.scale(g));
    if (p > 0) {
      let e = h.add(m),
        t = Math.max(i, 10),
        s = a(d.angleBetween(l) / t),
        r = d,
        o = Math.cos(s),
        u = Math.sin(s);
      for (let s = 0; s < t; s++)
        n.push(e),
          n.push(h.sub(r)),
          (r = f(r.x * o - r.y * u, r.x * u + r.y * o));
    } else {
      let e = h.sub(m),
        t = Math.max(i, 10),
        s = a(d.angleBetween(l) / t),
        r = d,
        o = Math.cos(s),
        u = Math.sin(s);
      for (let s = 0; s < t; s++)
        n.push(h.add(r)),
          n.push(e),
          (r = f(r.x * o - r.y * u, r.x * u + r.y * o));
    }
    (t = r), (u = o), (d = l);
  }
  if (!o)
    switch ((n.push(c.add(d)), n.push(c.sub(d)), e.cap)) {
      case "square": {
        let e = t.scale(i / u);
        n.push(c.add(e).add(d)), n.push(c.add(e).sub(d));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = d.scale(1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          (s = f(s.x * r - s.y * a, s.x * a + s.y * r)),
            n.push(c),
            n.push(c.sub(s));
      }
    }
  if (n.length < 4) return;
  let p = n.map((t) => ({
      pos: l.add(t),
      uv: f(),
      color: e.color || r.WHITE,
      opacity: e.opacity ?? 1,
    })),
    g = [],
    m = 0;
  for (let e = 0; e < n.length - 2; e += 2)
    (g[m++] = e + 1),
      (g[m++] = e),
      (g[m++] = e + 2),
      (g[m++] = e + 2),
      (g[m++] = e + 3),
      (g[m++] = e + 1);
  o &&
    ((g[m++] = n.length - 1),
    (g[m++] = n.length - 2),
    (g[m++] = 0),
    (g[m++] = 0),
    (g[m++] = 1),
    (g[m++] = n.length - 1)),
    Hr(p, g, e.fixed, Va.gfx.defTex, e.shader, e.uniform ?? void 0);
}
function zr(e) {
  let t,
    s = e.pts,
    n = [],
    i = 0.5 * (e.width || 1),
    a = s[0] === s[s.length - 1] || s[0].eq(s[s.length - 1]),
    o = e.pos || f(0, 0);
  t = a ? s[0].sub(s[s.length - 2]) : s[1].sub(s[0]);
  let l,
    h = t.len(),
    u = t.normal().scale(-i / h),
    d = s[0];
  if (!a)
    switch (e.cap) {
      case "square": {
        let e = t.scale(-i / h);
        n.push(d.add(e).add(u)), n.push(d.add(e).sub(u));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = u.scale(-1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          n.push(d),
            n.push(d.sub(s)),
            (s = f(s.x * r - s.y * a, s.x * a + s.y * r));
      }
    }
  for (let e = 1; e < s.length; e++) {
    if (d === s[e] || d.eq(s[e])) continue;
    (l = d), (d = s[e]);
    let r = d.sub(l),
      a = r.len(),
      o = r.normal().scale(-i / a),
      c = t.cross(r);
    if (Math.abs(c) / (h * a) < 0.05) {
      n.push(l.add(u)),
        n.push(l.sub(u)),
        t.dot(r) < 0 && (n.push(l.sub(u)), n.push(l.add(u))),
        (t = r),
        (h = a),
        (u = o);
      continue;
    }
    let f = o.sub(u).cross(r) / c,
      p = u.add(t.scale(f));
    n.push(l.add(p)), n.push(l.sub(p)), (t = r), (h = a), (u = o);
  }
  if (!a)
    switch ((n.push(d.add(u)), n.push(d.sub(u)), e.cap)) {
      case "square": {
        let e = t.scale(i / h);
        n.push(d.add(e).add(u)), n.push(d.add(e).sub(u));
        break;
      }
      case "round": {
        let e = Math.max(i, 10),
          t = Math.PI / e,
          s = u.scale(1),
          r = Math.cos(t),
          a = Math.sin(t);
        for (let t = 0; t < e; t++)
          (s = f(s.x * r - s.y * a, s.x * a + s.y * r)),
            n.push(d),
            n.push(d.sub(s));
      }
    }
  if (n.length < 4) return;
  let c = n.map((t) => ({
      pos: o.add(t),
      uv: f(),
      color: e.color || r.WHITE,
      opacity: e.opacity ?? 1,
    })),
    p = [],
    g = 0;
  for (let e = 0; e < n.length - 2; e += 2)
    (p[g++] = e + 1),
      (p[g++] = e),
      (p[g++] = e + 2),
      (p[g++] = e + 2),
      (p[g++] = e + 3),
      (p[g++] = e + 1);
  a &&
    ((p[g++] = n.length - 1),
    (p[g++] = n.length - 2),
    (p[g++] = 0),
    (p[g++] = 0),
    (p[g++] = 1),
    (p[g++] = n.length - 1)),
    Hr(c, p, e.fixed, Va.gfx.defTex, e.shader, e.uniform ?? void 0);
}
function Xr(e) {
  let t = e.pts,
    s = e.width ?? 1;
  if (!t) throw new Error('drawLines() requires property "pts".');
  if (!(t.length < 2)) {
    if (t.length > 2)
      switch (e.join) {
        case "bevel":
          return Yr(e);
        case "round":
          return Qr(e);
        case "miter":
          return zr(e);
      }
    if (e.radius && t.length >= 3) {
      Kr(Object.assign({}, e, { p1: t[0], p2: t[1] }));
      for (let s = 1; s < t.length - 2; s++) {
        let r = t[s],
          n = t[s + 1];
        Kr(Object.assign({}, e, { p1: r, p2: n }));
      }
      Kr(Object.assign({}, e, { p1: t[t.length - 2], p2: t[t.length - 1] }));
    } else
      for (let r = 0; r < t.length - 1; r++)
        Kr(Object.assign({}, e, { p1: t[r], p2: t[r + 1] })),
          "none" !== e.join &&
            Vr(Object.assign({}, e, { pos: t[r], radius: s / 2 }));
  }
}
function Wr(e, t) {
  let s = t.segments ?? 16,
    r = [];
  for (let t = 0; t <= s; t++) r.push(e(t / s));
  Xr({
    pts: r,
    width: t.width || 1,
    pos: t.pos,
    color: t.color,
    opacity: t.opacity,
  });
}
function Jr(e) {
  Wr((t) => xe(e.pt1, e.pt2, e.pt3, e.pt4, t), e);
}
t(Dr, "resolveSound"),
  t(Or, "getSound"),
  t(Ur, "loadSound"),
  t(Lr, "loadMusic"),
  t(Nr, "loadSpriteAtlas"),
  t(Hr, "drawRaw"),
  t(Gr, "drawPolygon"),
  t(jr, "drawEllipse"),
  t(Vr, "drawCircle"),
  t(Kr, "drawLine"),
  t(Yr, "_drawLinesBevel"),
  t(Qr, "_drawLinesRound"),
  t(zr, "_drawLinesMiter"),
  t(Xr, "drawLines"),
  t(Wr, "drawCurve"),
  t(Jr, "drawBezier");
var Zr = class e {
    static {
      t(this, "Texture");
    }
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, t, s, r = {}) {
      this.ctx = e;
      let n = e.gl,
        i = e.gl.createTexture();
      if (!i) throw new Error("Failed to create texture");
      (this.glTex = i),
        e.onDestroy(() => this.free()),
        (this.width = t),
        (this.height = s);
      let a = { linear: n.LINEAR, nearest: n.NEAREST }[
          r.filter ?? e.opts.texFilter ?? "nearest"
        ],
        o = { repeat: n.REPEAT, clampToEdge: n.CLAMP_TO_EDGE }[
          r.wrap ?? "clampToEdge"
        ];
      this.bind(),
        t &&
          s &&
          n.texImage2D(
            n.TEXTURE_2D,
            0,
            n.RGBA,
            t,
            s,
            0,
            n.RGBA,
            n.UNSIGNED_BYTE,
            null
          ),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, a),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, a),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, o),
        n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, o),
        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        this.unbind();
    }
    static fromImage(t, s, r = {}) {
      let n = new e(t, s.width, s.height, r);
      return n.update(s), (n.src = s), n;
    }
    update(e, t = 0, s = 0) {
      let r = this.ctx.gl;
      this.bind(),
        r.texSubImage2D(r.TEXTURE_2D, 0, t, s, r.RGBA, r.UNSIGNED_BYTE, e),
        this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  },
  _r = class {
    static {
      t(this, "FrameBuffer");
    }
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(e, t, s, r = {}) {
      this.ctx = e;
      let n = e.gl;
      e.onDestroy(() => this.free()), (this.tex = new Zr(e, t, s, r));
      let i = n.createFramebuffer(),
        a = n.createRenderbuffer();
      if (!i || !a) throw new Error("Failed to create framebuffer");
      (this.glFramebuffer = i),
        (this.glRenderbuffer = a),
        this.bind(),
        n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, t, s),
        n.framebufferTexture2D(
          n.FRAMEBUFFER,
          n.COLOR_ATTACHMENT0,
          n.TEXTURE_2D,
          this.tex.glTex,
          0
        ),
        n.framebufferRenderbuffer(
          n.FRAMEBUFFER,
          n.DEPTH_STENCIL_ATTACHMENT,
          n.RENDERBUFFER,
          this.glRenderbuffer
        ),
        this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let e = this.ctx.gl,
        t = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(),
        e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, t),
        this.unbind();
      let s = 4 * this.width,
        r = new Uint8Array(s);
      for (let e = 0; e < ((this.height / 2) | 0); e++) {
        let n = e * s,
          i = (this.height - e - 1) * s;
        r.set(t.subarray(n, n + s)), t.copyWithin(n, i, i + s), t.set(r, i);
      }
      return new ImageData(t, this.width, this.height);
    }
    toDataURL() {
      let e = document.createElement("canvas"),
        t = e.getContext("2d");
      if (((e.width = this.width), (e.height = this.height), !t))
        throw new Error("Failed to get 2d context");
      return t.putImageData(this.toImageData(), 0, 0), e.toDataURL();
    }
    clear() {
      let e = this.ctx.gl;
      e.clear(e.COLOR_BUFFER_BIT);
    }
    draw(e) {
      this.bind(), e(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer),
        this.ctx.pushRenderbuffer(this.glRenderbuffer),
        this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(),
        this.ctx.popRenderbuffer(),
        this.ctx.popViewport();
    }
    free() {
      let e = this.ctx.gl;
      e.deleteFramebuffer(this.glFramebuffer),
        e.deleteRenderbuffer(this.glRenderbuffer),
        this.tex.free();
    }
  },
  $r = class {
    static {
      t(this, "BatchRenderer");
    }
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(e, t, s, r) {
      let n = e.gl;
      (this.vertexFormat = t),
        (this.ctx = e),
        (this.stride = t.reduce((e, t) => e + t.size, 0)),
        (this.maxVertices = s),
        (this.maxIndices = r);
      let i = n.createBuffer();
      if (!i) throw new Error("Failed to create vertex buffer");
      (this.glVBuf = i),
        e.pushArrayBuffer(this.glVBuf),
        n.bufferData(n.ARRAY_BUFFER, 4 * s, n.DYNAMIC_DRAW),
        e.popArrayBuffer(),
        (this.glIBuf = n.createBuffer()),
        e.pushElementArrayBuffer(this.glIBuf),
        n.bufferData(n.ELEMENT_ARRAY_BUFFER, 4 * r, n.DYNAMIC_DRAW),
        e.popElementArrayBuffer();
    }
    push(e, t, s, r, n = null, i = {}) {
      (e !== this.curPrimitive ||
        n !== this.curTex ||
        r !== this.curShader ||
        !St(this.curUniform, i) ||
        this.vqueue.length + t.length * this.stride > this.maxVertices ||
        this.iqueue.length + s.length > this.maxIndices) &&
        this.flush();
      let a = this.vqueue.length / this.stride;
      for (let e of t) this.vqueue.push(e);
      for (let e of s) this.iqueue.push(e + a);
      (this.curPrimitive = e),
        (this.curShader = r),
        (this.curTex = n),
        (this.curUniform = i);
    }
    flush() {
      if (
        !this.curPrimitive ||
        !this.curShader ||
        0 === this.vqueue.length ||
        0 === this.iqueue.length
      )
        return;
      let e = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf),
        e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
        this.ctx.pushElementArrayBuffer(this.glIBuf),
        e.bufferSubData(
          e.ELEMENT_ARRAY_BUFFER,
          0,
          new Uint16Array(this.iqueue)
        ),
        this.ctx.setVertexFormat(this.vertexFormat),
        this.curShader.bind(),
        this.curShader.send(this.curUniform),
        this.curTex?.bind(),
        e.drawElements(
          this.curPrimitive,
          this.iqueue.length,
          e.UNSIGNED_SHORT,
          0
        ),
        this.curTex?.unbind(),
        this.curShader.unbind(),
        this.ctx.popArrayBuffer(),
        this.ctx.popElementArrayBuffer(),
        (this.vqueue = []),
        (this.iqueue = []),
        this.numDraws++;
    }
    free() {
      let e = this.ctx.gl;
      e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
    }
  };
function en(e) {
  let s = [],
    r = t((t) => {
      s.push(t), e(t);
    }, "push"),
    n = t(() => {
      s.pop(), e(i() ?? null);
    }, "pop"),
    i = t(() => s[s.length - 1], "cur");
  return [r, n, i];
}
function tn(e, s = {}) {
  let r = [];
  function n(e) {
    r.push(e);
  }
  function i() {
    r.forEach((e) => e());
    let t = e.getExtension("WEBGL_lose_context");
    t && t.loseContext();
  }
  t(n, "onDestroy"), t(i, "destroy");
  let a = null;
  function o(t) {
    if (St(t, a)) return;
    a = t;
    let s = t.reduce((e, t) => e + t.size, 0);
    t.reduce(
      (t, r, n) => (
        e.vertexAttribPointer(n, r.size, e.FLOAT, !1, 4 * s, t),
        e.enableVertexAttribArray(n),
        t + 4 * r.size
      ),
      0
    );
  }
  t(o, "setVertexFormat");
  let [l, h] = en((t) => e.bindTexture(e.TEXTURE_2D, t)),
    [u, d] = en((t) => e.bindBuffer(e.ARRAY_BUFFER, t)),
    [c, f] = en((t) => e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t)),
    [p, g] = en((t) => e.bindFramebuffer(e.FRAMEBUFFER, t)),
    [m, w] = en((t) => e.bindRenderbuffer(e.RENDERBUFFER, t)),
    [y, A] = en((t) => {
      if (!t) return;
      let { x: s, y: r, w: n, h: i } = t;
      e.viewport(s, r, n, i);
    }),
    [x, v] = en((t) => e.useProgram(t));
  return (
    y({ x: 0, y: 0, w: e.drawingBufferWidth, h: e.drawingBufferHeight }),
    {
      gl: e,
      opts: s,
      onDestroy: n,
      destroy: i,
      pushTexture2D: l,
      popTexture2D: h,
      pushArrayBuffer: u,
      popArrayBuffer: d,
      pushElementArrayBuffer: c,
      popElementArrayBuffer: f,
      pushFramebuffer: p,
      popFramebuffer: g,
      pushRenderbuffer: m,
      popRenderbuffer: w,
      pushViewport: y,
      popViewport: A,
      pushProgram: x,
      popProgram: v,
      setVertexFormat: o,
    }
  );
}
t(en, "genStack"), t(tn, "initGfx");
var sn = {};
function rn(e, t) {
  t.override
    ? Object.assign(e, t)
    : (t.pos && (e.pos = e.pos.add(t.pos)),
      t.scale && (e.scale = e.scale.scale(f(t.scale))),
      t.angle && (e.angle += t.angle),
      t.color && 1 === e.ch.length && (e.color = e.color.mult(t.color)),
      null != t.opacity && (e.opacity *= t.opacity));
}
function nn(e) {
  let s = {},
    r = "",
    n = [],
    i = String(e),
    a = t((e) => {
      n.length > 0 && (s[r.length] = n.slice()), (r += e);
    }, "emit");
  for (; "" !== i; )
    if ("\\" !== i[0])
      if ("[" !== i[0]) a(i[0]), (i = i.slice(1));
      else {
        let e = /^\[(\/)?(\w+?)\]/.exec(i);
        if (!e) {
          a(i[0]), (i = i.slice(1));
          continue;
        }
        let [t, s, r] = e;
        if (void 0 !== s) {
          let e = n.pop();
          if (e !== r)
            throw void 0 !== e
              ? new Error(
                  `Styled text error: mismatched tags. Expected [/${e}], got [/${r}]`
                )
              : new Error(`Styled text error: stray end tag [/${r}]`);
        } else n.push(r);
        i = i.slice(t.length);
      }
    else {
      if (1 === i.length)
        throw new Error("Styled text error: \\ at end of string");
      a(i[1]), (i = i.slice(2));
    }
  if (n.length > 0) throw new Error(`Styled text error: unclosed tags ${n}`);
  return { charStyleMap: s, text: r };
}
function an(e) {
  if (void 0 === e.text)
    throw new Error('formatText() requires property "text".');
  let t = vr(e.font);
  if (!e.text || "" === e.text || t instanceof _s || !t)
    return { width: 0, height: 0, chars: [], opt: e, renderedText: "" };
  let { charStyleMap: s, text: n } = nn(e.text + ""),
    i = Ft(n);
  if (t instanceof xr || "string" == typeof t) {
    let e = t instanceof xr ? t.fontface.family : t,
      s =
        t instanceof xr
          ? { outline: t.outline, filter: t.filter }
          : { outline: null, filter: $e },
      r = sn[e] ?? {
        font: {
          tex: new Zr(Va.gfx.ggl, 2048, 2048, { filter: s.filter }),
          map: {},
          size: 64,
        },
        cursor: new c(0),
        maxHeight: 0,
        outline: s.outline,
      };
    sn[e] || (sn[e] = r), (t = r.font);
    for (let s of i)
      if (!r.font.map[s]) {
        let n = Va.fontCacheC2d;
        if (!n) throw new Error("fontCacheC2d is not defined.");
        if (!Va.fontCacheCanvas)
          throw new Error("fontCacheCanvas is not defined.");
        n.clearRect(0, 0, Va.fontCacheCanvas.width, Va.fontCacheCanvas.height),
          (n.font = `${t.size}px ${e}`),
          (n.textBaseline = "top"),
          (n.textAlign = "left"),
          (n.fillStyle = "#ffffff");
        let i = n.measureText(s),
          a = Math.ceil(i.width);
        if (!a) continue;
        let o =
          Math.ceil(Math.abs(i.actualBoundingBoxAscent)) +
          Math.ceil(Math.abs(i.actualBoundingBoxDescent));
        r.outline &&
          r.outline.width &&
          r.outline.color &&
          ((n.lineJoin = "round"),
          (n.lineWidth = 2 * r.outline.width),
          (n.strokeStyle = r.outline.color.toHex()),
          n.strokeText(s, r.outline.width, r.outline.width),
          (a += 2 * r.outline.width),
          (o += 3 * r.outline.width)),
          n.fillText(s, r.outline?.width ?? 0, r.outline?.width ?? 0);
        let l = n.getImageData(0, 0, a, o);
        if (
          r.cursor.x + a > 2048 &&
          ((r.cursor.x = 0),
          (r.cursor.y += r.maxHeight),
          (r.maxHeight = 0),
          r.cursor.y > 2048)
        )
          throw new Error("Font atlas exceeds character limit");
        t.tex.update(l, r.cursor.x, r.cursor.y),
          (t.map[s] = new p(r.cursor.x, r.cursor.y, a, o)),
          (r.cursor.x += a + 1),
          (r.maxHeight = Math.max(r.maxHeight, o));
      }
  }
  let a,
    o = e.size || t.size,
    l = f(e.scale ?? 1).scale(o / t.size),
    h = e.lineSpacing ?? 0,
    u = e.letterSpacing ?? 0,
    d = 0,
    g = 0,
    m = 0,
    w = [],
    y = [],
    A = 0,
    x = null,
    v = 0;
  for (; A < i.length; ) {
    let s = i[A];
    if ("\n" === s)
      (m += o + h),
        w.push({ width: d - u, chars: y }),
        (x = null),
        (v = 0),
        (d = 0),
        (y = []),
        (a = void 0);
    else {
      let n = t.map[s];
      if (n) {
        let b = n.w * l.x;
        e.width &&
          d + b > e.width &&
          ((m += o + h),
          null != x &&
            ((A -= y.length - x),
            (s = i[A]),
            (n = t.map[s]),
            (b = n.w * l.x),
            (y = y.slice(0, x - 1)),
            (d = v)),
          (x = null),
          (v = 0),
          w.push({ width: d - u, chars: y }),
          (d = a ?? 0),
          (y = [])),
          y.push({
            tex: t.tex,
            width: n.w,
            height: n.h,
            quad: new p(
              n.x / t.tex.width,
              n.y / t.tex.height,
              n.w / t.tex.width,
              n.h / t.tex.height
            ),
            ch: s,
            pos: new c(d, m),
            opacity: e.opacity ?? 1,
            color: e.color ?? r.WHITE,
            scale: f(l),
            angle: 0,
          }),
          " " === s && ((x = y.length), (v = d)),
          e.indentAll && void 0 === a && /\S/.test(s) && (a = d),
          (d += b),
          (g = Math.max(g, d)),
          (d += u);
      }
    }
    A++;
  }
  w.push({ width: d - u, chars: y }), (m += o), e.width && (g = e.width);
  let b = [];
  for (let r = 0; r < w.length; r++) {
    let n = (g - w[r].width) * ys(e.align ?? "left");
    for (let i of w[r].chars) {
      let a = t.map[i.ch],
        o = b.length + r;
      if (
        ((i.pos = i.pos.add(n, 0).add(a.w * l.x * 0.5, a.h * l.y * 0.5)),
        e.transform)
      ) {
        let t =
          "function" == typeof e.transform ? e.transform(o, i.ch) : e.transform;
        t && rn(i, t);
      }
      if (s[o]) {
        let t = s[o];
        for (let s of t) {
          let t = e.styles?.[s],
            r = "function" == typeof t ? t(o, i.ch) : t;
          r && rn(i, r);
        }
      }
      b.push(i);
    }
  }
  return { width: g, height: m, chars: b, opt: e, renderedText: n };
}
function on(e) {
  if (void 0 === e.width || void 0 === e.height)
    throw new Error('drawUVQuad() requires property "width" and "height".');
  if (e.width <= 0 || e.height <= 0) return;
  let t = e.width,
    s = e.height,
    r = ws(e.anchor || Ze).scale(new c(t, s).scale(-0.5)),
    i = e.quad || new p(0, 0, 1, 1),
    a = e.color || n(255, 255, 255),
    o = e.opacity ?? 1,
    l = e.tex ? 0.1 / e.tex.width : 0,
    h = e.tex ? 0.1 / e.tex.height : 0,
    u = i.x + l,
    d = i.y + h,
    f = i.w - 2 * l,
    g = i.h - 2 * h;
  Us(),
    Os(e.pos),
    Hs(e.angle),
    Ns(e.scale),
    Os(r),
    Hr(
      [
        {
          pos: new c(-t / 2, s / 2),
          uv: new c(e.flipX ? u + f : u, e.flipY ? d : d + g),
          color: a,
          opacity: o,
        },
        {
          pos: new c(-t / 2, -s / 2),
          uv: new c(e.flipX ? u + f : u, e.flipY ? d + g : d),
          color: a,
          opacity: o,
        },
        {
          pos: new c(t / 2, -s / 2),
          uv: new c(e.flipX ? u : u + f, e.flipY ? d + g : d),
          color: a,
          opacity: o,
        },
        {
          pos: new c(t / 2, s / 2),
          uv: new c(e.flipX ? u : u + f, e.flipY ? d : d + g),
          color: a,
          opacity: o,
        },
      ],
      [0, 1, 3, 1, 2, 3],
      e.fixed,
      e.tex,
      e.shader,
      e.uniform ?? void 0
    ),
    Gs();
}
function ln(e) {
  Us(),
    Os(e.opt.pos),
    Hs(e.opt.angle),
    Os(
      ws(e.opt.anchor ?? "topleft")
        .add(1, 1)
        .scale(e.width, e.height)
        .scale(-0.5)
    ),
    e.chars.forEach((t) => {
      on({
        tex: t.tex,
        width: t.width,
        height: t.height,
        pos: t.pos,
        scale: t.scale,
        angle: t.angle,
        color: t.color,
        opacity: t.opacity,
        quad: t.quad,
        anchor: "center",
        uniform: e.opt.uniform,
        shader: e.opt.shader,
        fixed: e.opt.fixed,
      });
    }),
    Gs();
}
function hn(e) {
  if (void 0 === e.width || void 0 === e.height)
    throw new Error('drawRect() requires property "width" and "height".');
  if (e.width <= 0 || e.height <= 0) return;
  let t = e.width,
    s = e.height,
    r = ws(e.anchor || Ze)
      .add(1, 1)
      .scale(new c(t, s).scale(-0.5)),
    n = [new c(0, 0), new c(t, 0), new c(t, s), new c(0, s)];
  if (e.radius) {
    let r = Math.min(t, s) / 2,
      i = Array.isArray(e.radius)
        ? e.radius.map((e) => Math.min(r, e))
        : new Array(4).fill(Math.min(r, e.radius));
    n = [
      new c(i[0], 0),
      ...(i[1] ? Fs(new c(t - i[1], i[1]), i[1], i[1], 270, 360) : [f(t, 0)]),
      ...(i[2] ? Fs(new c(t - i[2], s - i[2]), i[2], i[2], 0, 90) : [f(t, s)]),
      ...(i[3] ? Fs(new c(i[3], s - i[3]), i[3], i[3], 90, 180) : [f(0, s)]),
      ...(i[0] ? Fs(new c(i[0], i[0]), i[0], i[0], 180, 270) : []),
    ];
  }
  Gr(
    Object.assign({}, e, {
      offset: r,
      pts: n,
      ...(e.gradient
        ? {
            colors: e.horizontal
              ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]]
              : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]],
          }
        : {}),
    })
  );
}
function un(e) {
  js();
  let t = Va.gfx.width,
    s = Va.gfx.height;
  (Va.gfx.width = Va.gfx.viewport.width),
    (Va.gfx.height = Va.gfx.viewport.height),
    e(),
    js(),
    (Va.gfx.width = t),
    (Va.gfx.height = s);
}
function dn(e, t) {
  un(() => {
    let s = f(8);
    Us(), Os(e);
    let r = an({
        text: t,
        font: _e,
        size: 16,
        pos: s,
        color: n(255, 255, 255),
        fixed: !0,
      }),
      i = r.width + 2 * s.x,
      a = r.height + 2 * s.x;
    e.x + i >= Vs() && Os(f(-i, 0)),
      e.y + a >= Ks() && Os(f(0, -a)),
      hn({
        width: i,
        height: a,
        color: n(0, 0, 0),
        radius: 4,
        opacity: 0.8,
        fixed: !0,
      }),
      ln(r),
      Gs();
  });
}
function cn(e) {
  if (!e.p1 || !e.p2 || !e.p3)
    throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
  return Gr(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
}
function fn() {
  if (Va.debug.inspect) {
    let e = null;
    for (let t of Va.game.root.get("*", { recursive: !0 }))
      if (t.c("area") && t.isHovering()) {
        e = t;
        break;
      }
    if ((Va.game.root.drawInspect(), e)) {
      let t = [],
        s = e.inspect();
      for (let e in s) s[e] ? t.push(`${s[e]}`) : t.push(`${e}`);
      dn(Qs(Xs()), t.join("\n"));
    }
    dn(f(8), `FPS: ${Va.debug.fps()}`);
  }
  Va.debug.paused &&
    un(() => {
      Us(), Os(Vs(), 0), Os(-8, 8);
      hn({
        width: 32,
        height: 32,
        anchor: "topright",
        color: n(0, 0, 0),
        opacity: 0.8,
        radius: 4,
        fixed: !0,
      });
      for (let e = 1; e <= 2; e++)
        hn({
          width: 4,
          height: 19.2,
          anchor: "center",
          pos: f((-32 / 3) * e, 16),
          color: n(255, 255, 255),
          radius: 2,
          fixed: !0,
        });
      Gs();
    }),
    1 !== Va.debug.timeScale &&
      un(() => {
        Us(), Os(Vs(), Ks()), Os(-8, -8);
        let e = an({
          text: Va.debug.timeScale.toFixed(1),
          font: _e,
          size: 16,
          color: n(255, 255, 255),
          pos: f(-8),
          anchor: "botright",
          fixed: !0,
        });
        hn({
          width: e.width + 16 + 32,
          height: e.height + 16,
          anchor: "botright",
          color: n(0, 0, 0),
          opacity: 0.8,
          radius: 4,
          fixed: !0,
        });
        for (let t = 0; t < 2; t++) {
          let s = Va.debug.timeScale < 1;
          cn({
            p1: f(-e.width - 8 * (s ? 2 : 3.5), -8),
            p2: f(-e.width - 8 * (s ? 2 : 3.5), -8 - e.height),
            p3: f(-e.width - 8 * (s ? 3.5 : 2), -8 - e.height / 2),
            pos: f(8 * -t * 1 + (s ? -4 : 0), 0),
            color: n(255, 255, 255),
            fixed: !0,
          });
        }
        ln(e), Gs();
      }),
    Va.debug.curRecording &&
      un(() => {
        Us(),
          Os(0, Ks()),
          Os(24, -24),
          Vr({
            radius: 12,
            color: n(255, 0, 0),
            opacity: A(0, 1, 4 * Va.app.time()),
            fixed: !0,
          }),
          Gs();
      }),
    Va.debug.showLog &&
      Va.game.logs.length > 0 &&
      un(() => {
        Us(), Os(0, Ks()), Os(8, -8);
        let e = [];
        for (let t of Va.game.logs) {
          let s = "",
            r = t.msg instanceof Error ? "error" : "info";
          (s += `[time]${t.time.toFixed(2)}[/time]`),
            (s += " "),
            (s += `[${r}]${pn(t.msg)}[/${r}]`),
            e.push(s);
        }
        Va.game.logs = Va.game.logs.filter(
          (e) => Va.app.time() - e.time < (Va.globalOpt.logTime || 4)
        );
        let t = an({
          text: e.join("\n"),
          font: _e,
          pos: f(8, -8),
          anchor: "botleft",
          size: 16,
          width: 0.6 * Vs(),
          lineSpacing: 4,
          fixed: !0,
          styles: {
            time: { color: n(127, 127, 127) },
            info: { color: n(255, 255, 255) },
            error: { color: n(255, 0, 127) },
          },
        });
        hn({
          width: t.width + 16,
          height: t.height + 16,
          anchor: "botleft",
          color: n(0, 0, 0),
          radius: 4,
          opacity: 0.8,
          fixed: !0,
        }),
          ln(t),
          Gs();
      });
}
function pn(e, t = !1, s = new Set()) {
  if (s.has(e)) return "<recursive>";
  var r,
    n = "";
  return (
    t && "string" == typeof e && (e = JSON.stringify(e)),
    Array.isArray(e) &&
      ((n = [
        "[",
        e.map((t) => pn(t, !0, s.union(new Set([e])))).join(", "),
        "]",
      ].join("")),
      (e = n)),
    null === e
      ? "null"
      : ("object" == typeof e &&
          e.toString === Object.prototype.toString &&
          (e.constructor !== Object && (n += e.constructor.name + " "),
          (n += [
            "{",
            (r = Object.getOwnPropertyNames(e)
              .map(
                (t) =>
                  `${/^\w+$/.test(t) ? t : JSON.stringify(t)}: ${pn(
                    e[t],
                    !0,
                    s.union(new Set([e]))
                  )}`
              )
              .join(", "))
              ? ` ${r} `
              : "",
            "}",
          ].join("")),
          (e = n)),
        String(e).replaceAll(/(?<!\\)\[/g, "\\["))
  );
}
function gn() {
  let e = Va.game.cam,
    t = c.fromAngle(M(0, 360)).scale(e.shake);
  (e.shake = h(e.shake, 0, 5 * is())),
    (e.transform = new y()
      .translate(Ws())
      .scale(e.scale)
      .rotate(e.angle)
      .translate((e.pos ?? Ws()).scale(-1).add(t))),
    Va.game.root.draw(),
    js();
}
function mn() {
  let e = or();
  Va.game.events.numListeners("loading") > 0
    ? Va.game.events.trigger("loading", e)
    : un(() => {
        let t = Vs() / 2,
          s = f(Vs() / 2, Ks() / 2).sub(f(t / 2, 12));
        hn({ pos: f(0), width: Vs(), height: Ks(), color: n(0, 0, 0) }),
          hn({ pos: s, width: t, height: 24, fill: !1, outline: { width: 4 } }),
          hn({ pos: s, width: t * e, height: 24 });
      });
}
function wn(e, t, s) {
  let r = Va.gfx.ggl.gl;
  js(),
    r.clear(r.STENCIL_BUFFER_BIT),
    r.enable(r.STENCIL_TEST),
    r.stencilFunc(r.NEVER, 1, 255),
    r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE),
    t(),
    js(),
    r.stencilFunc(s, 1, 255),
    r.stencilOp(r.KEEP, r.KEEP, r.KEEP),
    e(),
    js(),
    r.disable(r.STENCIL_TEST);
}
function yn(e, t) {
  wn(e, t, Va.gfx.ggl.gl.EQUAL);
}
function An(e) {
  if (!e.tex) throw new Error('drawTexture() requires property "tex".');
  let s = e.quad ?? new p(0, 0, 1, 1),
    n = e.tex.width * s.w,
    i = e.tex.height * s.h,
    a = new c(1);
  if (e.tiled) {
    let a = ws(e.anchor || Ze);
    e.pos, a.x, e.width, e.pos, a.y, e.height;
    let o = (e.width || n) / n,
      l = (e.height || i) / i,
      h = Math.floor(o),
      u = Math.floor(l),
      d = o - h,
      f = l - u,
      g = (h + d ? 1 : 0) * (u + f ? 1 : 0),
      m = new Array(6 * g),
      w = new Array(4 * g),
      y = 0,
      A = t((t, s, n, i, o) => {
        (m[6 * y + 0] = 4 * y + 0),
          (m[6 * y + 1] = 4 * y + 1),
          (m[6 * y + 2] = 4 * y + 3),
          (m[6 * y + 3] = 4 * y + 1),
          (m[6 * y + 4] = 4 * y + 2),
          (m[6 * y + 5] = 4 * y + 3),
          (w[4 * y + 0] = {
            pos: new c(t - a.x, s - a.y),
            uv: new c(o.x, o.y),
            color: e.color || r.WHITE,
            opacity: e.opacity || 1,
          }),
          (w[4 * y + 1] = {
            pos: new c(t + n - a.x, s - a.y),
            uv: new c(o.x + o.w, o.y),
            color: e.color || r.WHITE,
            opacity: e.opacity || 1,
          }),
          (w[4 * y + 2] = {
            pos: new c(t + n - a.x, s + i - a.y),
            uv: new c(o.x + o.w, o.y + o.h),
            color: e.color || r.WHITE,
            opacity: e.opacity || 1,
          }),
          (w[4 * y + 3] = {
            pos: new c(t - a.x, s + i - a.y),
            uv: new c(o.x, o.y + o.h),
            color: e.color || r.WHITE,
            opacity: e.opacity || 1,
          }),
          y++;
      }, "addQuad");
    for (let e = 0; e < u; e++) {
      for (let t = 0; t < h; t++) A(t * n, e * i, n, i, s);
      d && A(h * n, e * i, n * d, i, new p(s.x, s.y, s.w * d, s.h));
    }
    if (f) {
      for (let e = 0; e < h; e++)
        A(e * n, u * i, n, i * f, new p(s.x, s.y, s.w, s.h * f));
      d && A(h * n, u * i, n * d, i * f, new p(s.x, s.y, s.w * d, s.h * f));
    }
    Hr(w, m, e.fixed, e.tex, e.shader, e.uniform ?? void 0);
  } else
    e.width && e.height
      ? ((a.x = e.width / n), (a.y = e.height / i))
      : e.width
      ? ((a.x = e.width / n), (a.y = a.x))
      : e.height && ((a.y = e.height / i), (a.x = a.y)),
      on(
        Object.assign({}, e, {
          scale: a.scale(e.scale || new c(1)),
          tex: e.tex,
          quad: s,
          width: n,
          height: i,
        })
      );
}
function xn(e) {
  if (!e.sprite) throw new Error('drawSprite() requires property "sprite"');
  let t = fr(e.sprite);
  if (!t || !t.data) return;
  let s = t.data.frames[e.frame ?? 0];
  if (!s) throw new Error(`Frame not found: ${e.frame ?? 0}`);
  An(
    Object.assign({}, e, {
      tex: t.data.tex,
      quad: s.scale(e.quad ?? new p(0, 0, 1, 1)),
    })
  );
}
function vn(e, t) {
  wn(e, t, Va.gfx.ggl.gl.NOTEQUAL);
}
function bn(e) {
  ln(an(e));
}
t(rn, "applyCharTransform"),
  t(nn, "compileStyledText"),
  t(an, "formatText"),
  t(on, "drawUVQuad"),
  t(ln, "drawFormattedText"),
  t(hn, "drawRect"),
  t(un, "drawUnscaled"),
  t(dn, "drawInspectText"),
  t(cn, "drawTriangle"),
  t(fn, "drawDebug"),
  t(pn, "prettyDebug"),
  t(gn, "drawFrame"),
  t(mn, "drawLoadScreen"),
  t(wn, "drawStenciled"),
  t(yn, "drawMasked"),
  t(An, "drawTexture"),
  t(xn, "drawSprite"),
  t(vn, "drawSubtracted"),
  t(bn, "drawText");
var En = t((e, t) => {
  let s = Cr(t, nt, it),
    r = e.pixelDensity ?? 1,
    i = e.scale ?? 1,
    { gl: a } = t,
    o = Zr.fromImage(
      t,
      new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
    ),
    l =
      e.width && e.height
        ? new _r(t, e.width * r * i, e.height * r * i)
        : new _r(t, a.drawingBufferWidth, a.drawingBufferHeight),
    h = null,
    u = 1;
  e.background &&
    ("string" == typeof e.background
      ? (h = n(e.background))
      : ((h = n(...e.background)), (u = e.background[3] ?? 1)),
    a.clearColor(h.r / 255, h.g / 255, h.b / 255, u ?? 1)),
    a.enable(a.BLEND),
    a.blendFuncSeparate(
      a.ONE,
      a.ONE_MINUS_SRC_ALPHA,
      a.ONE,
      a.ONE_MINUS_SRC_ALPHA
    );
  let d = new $r(t, et, tt, 12288),
    c = Zr.fromImage(
      t,
      new ImageData(
        new Uint8ClampedArray([
          128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128,
          128, 255,
        ]),
        2,
        2
      ),
      { wrap: "repeat", filter: "nearest" }
    );
  return {
    lastDrawCalls: 0,
    ggl: t,
    defShader: s,
    defTex: o,
    frameBuffer: l,
    postShader: null,
    postShaderUniform: null,
    renderer: d,
    transform: new y(),
    transformStack: [],
    bgTex: c,
    bgColor: h,
    bgAlpha: u,
    width: e.width ?? a.drawingBufferWidth / r / i,
    height: e.height ?? a.drawingBufferHeight / r / i,
    viewport: {
      x: 0,
      y: 0,
      width: a.drawingBufferWidth,
      height: a.drawingBufferHeight,
    },
    fixed: !1,
  };
}, "initAppGfx");
function Mn() {
  let e = Va.pixelDensity,
    t = Va.gfx.ggl.gl.drawingBufferWidth / e,
    s = Va.gfx.ggl.gl.drawingBufferHeight / e;
  if (Va.globalOpt.letterbox) {
    if (!Va.globalOpt.width || !Va.globalOpt.height)
      throw new Error("Letterboxing requires width and height defined.");
    let e = t / s,
      r = Va.globalOpt.width / Va.globalOpt.height;
    if (e > r) {
      let e = s * r,
        n = (t - e) / 2;
      Va.gfx.viewport = { x: n, y: 0, width: e, height: s };
    } else {
      let e = t / r,
        n = (s - e) / 2;
      Va.gfx.viewport = { x: 0, y: n, width: t, height: e };
    }
  } else {
    if (Va.globalOpt.stretch && (!Va.globalOpt.width || !Va.globalOpt.height))
      throw new Error("Stretching requires width and height defined.");
    Va.gfx.viewport = { x: 0, y: 0, width: t, height: s };
  }
}
function Sn(e) {
  return !!e.fixed || (!!e.parent && Sn(e.parent));
}
function qn(e) {
  return {
    color: e.color,
    opacity: e.opacity,
    anchor: e.anchor,
    outline: e.outline,
    shader: e.shader,
    uniform: e.uniform,
  };
}
function Bn(e, t = {}) {
  return {
    id: "circle",
    radius: e,
    draw() {
      Vr(Object.assign(qn(this), { radius: this.radius, fill: t.fill }));
    },
    renderArea() {
      return new ce(
        new c(this.anchor ? 0 : -this.radius),
        2 * this.radius,
        2 * this.radius
      );
    },
    inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    },
  };
}
function Rn(...e) {
  return {
    id: "color",
    color: n(...e),
    inspect() {
      return `color: ${this.color.toString()}`;
    },
  };
}
function Cn(e) {
  return {
    add() {
      this.canvas = e;
    },
  };
}
function Pn(e = 1) {
  let t,
    s = 0,
    r = !1;
  return {
    require: ["opacity"],
    add() {
      (t = this.opacity), (this.opacity = 0);
    },
    update() {
      r ||
        ((s += is()),
        (this.opacity = u(s, 0, e, 0, t)),
        s >= e && ((this.opacity = t), (r = !0)));
    },
  };
}
function In(e = "intersect") {
  return { id: "mask", mask: e };
}
function kn(e) {
  return {
    id: "opacity",
    opacity: e ?? 1,
    fadeIn(e = 1, t = Va.k.easings.linear) {
      return Va.game.root.tween(
        0,
        this.opacity,
        e,
        (e) => (this.opacity = e),
        t
      );
    },
    fadeOut(e = 1, t = Va.k.easings.linear) {
      return Va.game.root.tween(
        this.opacity,
        0,
        e,
        (e) => (this.opacity = e),
        t
      );
    },
    inspect() {
      return `opacity: ${Pt(this.opacity, 1)}`;
    },
  };
}
function Fn(e = 1, t = n(0, 0, 0), s = 1, r = "miter", i = 10, a = "butt") {
  return {
    id: "outline",
    outline: { width: e, color: t, opacity: s, join: r, miterLimit: i, cap: a },
    inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    },
  };
}
t(Mn, "updateViewport"),
  t(Sn, "isFixed"),
  t(qn, "getRenderProps"),
  t(Bn, "circle"),
  t(Rn, "color"),
  t(Cn, "drawon"),
  t(Pn, "fadeIn"),
  t(In, "mask"),
  t(kn, "opacity"),
  t(Fn, "outline");
var Tn = class {
  static {
    t(this, "Particle");
  }
  pos = f(0);
  vel = f(0);
  acc = f(0);
  angle = 0;
  angularVelocity = 0;
  damping = 0;
  t;
  lt = null;
  gc;
  constructor() {
    (this.t = 0), (this.gc = !0);
  }
  get progress() {
    return this.lt ? this.t / this.lt : this.t;
  }
};
function Dn(e, s) {
  let i = s.lifetime,
    a = [],
    o = e.colors || [r.WHITE],
    l = e.opacities || [1],
    d = e.quads || [new p(0, 0, 1, 1)],
    g = e.scales || [1],
    m = e.lifeTime,
    w = s.direction,
    y = s.spread,
    A = e.speed || [0, 0],
    x = e.angle || [0, 0],
    v = e.angularVelocity || [0, 0],
    b = e.acceleration || [f(0), f(0)],
    E = e.damping || [0, 0],
    S = [],
    q = new Array(e.max),
    B = 0,
    R = 0;
  for (let t = 0; t < e.max; t++) {
    (S[6 * t + 0] = 4 * t + 0),
      (S[6 * t + 1] = 4 * t + 1),
      (S[6 * t + 2] = 4 * t + 3),
      (S[6 * t + 3] = 4 * t + 1),
      (S[6 * t + 4] = 4 * t + 2),
      (S[6 * t + 5] = 4 * t + 3);
    for (let e = 0; e < 4; e++)
      q[4 * t + e] = {
        pos: new c(0, 0),
        uv: new c(0, 0),
        color: n(255, 255, 255),
        opacity: 1,
      };
    a[t] = new Tn();
  }
  let C = new dt();
  function P(t = 0) {
    for (; t < e.max; ) {
      if (a[t].gc) return t;
      t++;
    }
    return null;
  }
  return (
    t(P, "nextFree"),
    {
      id: "particles",
      emit(e) {
        let t = 0;
        for (let r = 0; r < e; r++) {
          if (((t = P(t)), null == t)) return;
          let e = M(w - y, w + y),
            r = c.fromAngle(e).scale(M(A[0], A[1])),
            n = M(x[0], x[1]),
            i = M(v[0], v[1]),
            o = f(M(b[0].x, b[1].x), M(b[0].y, b[1].y)),
            l = M(E[0], E[1]),
            h = m ? M(m[0], m[1]) : null,
            u = s.shape ? s.shape.random() : f(),
            d = a[t];
          (d.lt = h),
            (d.pos = u),
            (d.vel = r),
            (d.acc = o),
            (d.angle = n),
            (d.angularVelocity = i),
            (d.damping = l),
            (d.angularVelocity = i),
            (d.gc = !1);
        }
        B += e;
      },
      update() {
        if (void 0 !== i && i <= 0) return;
        let t = is();
        for (let e of a)
          if (!e.gc) {
            if (((e.t += t), e.lt && e.t >= e.lt)) {
              (e.gc = !0), B--;
              continue;
            }
            (e.vel = e.vel.add(e.acc.scale(t)).scale(1 - e.damping * t)),
              (e.pos = e.pos.add(e.vel.scale(t))),
              (e.angle += e.angularVelocity * t);
          }
        for (
          void 0 !== i && ((i -= t), i <= 0 && C.trigger()), R += t;
          B < e.max && s.rate && R > s.rate;

        )
          this.emit(1), B++, (R -= s.rate);
      },
      draw() {
        if (!(void 0 !== i && i <= 0)) {
          for (let t = 0; t < a.length; t++) {
            let s = a[t];
            if (s.gc) continue;
            let r = s.progress,
              n = Math.floor(s.progress * o.length),
              i =
                n < o.length - 1
                  ? h(
                      o[n],
                      o[n + 1],
                      u(r, n / o.length, (n + 1) / o.length, 0, 1)
                    )
                  : o[n],
              c = Math.floor(s.progress * l.length),
              f =
                c < l.length - 1
                  ? h(
                      l[c],
                      l[c + 1],
                      u(r, c / l.length, (c + 1) / l.length, 0, 1)
                    )
                  : l[c],
              p = Math.floor(s.progress * d.length),
              m = d[p],
              w = Math.floor(s.progress * g.length),
              y = g[w],
              A = Math.cos((s.angle * Math.PI) / 180),
              x = Math.sin((s.angle * Math.PI) / 180),
              v = ((e.texture ? e.texture.width : 10) * m.w) / 2,
              b = ((e.texture ? e.texture.height : 10) * m.h) / 2,
              E = 4 * t,
              M = q[E];
            (M.pos.x = s.pos.x + -v * y * A - -b * y * x),
              (M.pos.y = s.pos.y + -v * y * x + -b * y * A),
              (M.uv.x = m.x),
              (M.uv.y = m.y),
              (M.color.r = i.r),
              (M.color.g = i.g),
              (M.color.b = i.b),
              (M.opacity = f),
              (M = q[E + 1]),
              (M.pos.x = s.pos.x + v * y * A - -b * y * x),
              (M.pos.y = s.pos.y + v * y * x + -b * y * A),
              (M.uv.x = m.x + m.w),
              (M.uv.y = m.y),
              (M.color.r = i.r),
              (M.color.g = i.g),
              (M.color.b = i.b),
              (M.opacity = f),
              (M = q[E + 2]),
              (M.pos.x = s.pos.x + v * y * A - b * y * x),
              (M.pos.y = s.pos.y + v * y * x + b * y * A),
              (M.uv.x = m.x + m.w),
              (M.uv.y = m.y + m.h),
              (M.color.r = i.r),
              (M.color.g = i.g),
              (M.color.b = i.b),
              (M.opacity = f),
              (M = q[E + 3]),
              (M.pos.x = s.pos.x + -v * y * A - b * y * x),
              (M.pos.y = s.pos.y + -v * y * x + b * y * A),
              (M.uv.x = m.x),
              (M.uv.y = m.y + m.h),
              (M.color.r = i.r),
              (M.color.g = i.g),
              (M.color.b = i.b),
              (M.opacity = f);
          }
          Hr(q, S, this.fixed, e.texture, this.shader, this.uniform);
        }
      },
      onEnd: (e) => C.add(e),
      inspect: () => `count: ${B}/${e.max}`,
    }
  );
}
function On(e, t = {}) {
  if (e.length < 3)
    throw new Error(
      `Polygon's need more than two points, ${e.length} points provided`
    );
  return {
    id: "polygon",
    pts: e,
    colors: t.colors,
    uv: t.uv,
    tex: t.tex,
    radius: t.radius,
    draw() {
      Gr(
        Object.assign(qn(this), {
          pts: this.pts,
          colors: this.colors,
          uv: this.uv,
          tex: this.tex,
          radius: this.radius,
          fill: t.fill,
          triangulate: t.triangulate,
        })
      );
    },
    renderArea() {
      return new me(this.pts);
    },
    inspect() {
      return `polygon: ${this.pts.map((e) => `[${e.x},${e.y}]`).join(",")}`;
    },
  };
}
function Un(e, t, s) {
  let r;
  return (
    Va.game.root.get("area").forEach((n) => {
      if (s && s.some((e) => n.is(e))) return;
      let i = n.worldArea().raycast(e, t);
      i &&
        (r
          ? i.fraction < r.fraction && ((r = i), (r.object = n))
          : ((r = i), (r.object = n)));
    }),
    r
  );
}
function Ln(e, t, s = {}) {
  return {
    id: "rect",
    width: e,
    height: t,
    radius: s.radius || 0,
    draw() {
      hn(
        Object.assign(qn(this), {
          width: this.width,
          height: this.height,
          radius: this.radius,
          fill: s.fill,
        })
      );
    },
    renderArea() {
      return new ce(f(0), this.width, this.height);
    },
    inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    },
  };
}
function Nn(e, t) {
  return {
    id: "shader",
    shader: e,
    ...("function" == typeof t
      ? {
          uniform: t(),
          update() {
            this.uniform = t();
          },
        }
      : { uniform: t }),
    inspect: () => `shader: ${e}`,
  };
}
function Hn(e, s) {
  if (!s.tileWidth || !s.tileHeight)
    throw new Error("Must provide tileWidth and tileHeight.");
  let r = Va.game.root.add([Na(s.pos ?? f(0))]),
    n = e.length,
    i = 0,
    a = null,
    o = null,
    l = null,
    h = null,
    u = t((e) => e.x + e.y * i, "tile2Hash"),
    d = t((e) => f(Math.floor(e % i), Math.floor(e / i)), "hash2Tile"),
    c = t(() => {
      a = [];
      for (let e of r.children) p(e);
    }, "createSpatialMap"),
    p = t((e) => {
      let t = u(e.tilePos);
      a[t] ? a[t].push(e) : (a[t] = [e]);
    }, "insertIntoSpatialMap"),
    g = t((e) => {
      let t = u(e.tilePos);
      if (a[t]) {
        let s = a[t].indexOf(e);
        s >= 0 && a[t].splice(s, 1);
      }
    }, "removeFromSpatialMap"),
    m = t(() => {
      let e = !1;
      for (let t of r.children) {
        let s = r.pos2Tile(t.pos);
        (t.tilePos.x != s.x || t.tilePos.y != s.y) &&
          ((e = !0), g(t), (t.tilePos.x = s.x), (t.tilePos.y = s.y), p(t));
      }
      e && r.trigger("spatialMapChanged");
    }, "updateSpatialMap"),
    w = t(() => {
      let e = r.getSpatialMap(),
        t = r.numRows() * r.numColumns();
      o ? (o.length = t) : (o = new Array(t)), o.fill(1, 0, t);
      for (let t = 0; t < e.length; t++) {
        let s = e[t];
        if (s) {
          let e = 0;
          for (let t of s) {
            if (t.isObstacle) {
              e = 1 / 0;
              break;
            }
            e += t.cost;
          }
          o[t] = e || 1;
        }
      }
    }, "createCostMap"),
    y = t(() => {
      let e = r.getSpatialMap(),
        t = r.numRows() * r.numColumns();
      l ? (l.length = t) : (l = new Array(t)), l.fill(15, 0, t);
      for (let t = 0; t < e.length; t++) {
        let s = e[t];
        if (s) {
          let e = s.length,
            r = 15;
          for (let t = 0; t < e; t++) r |= s[t].edgeMask;
          l[t] = r;
        }
      }
    }, "createEdgeMap"),
    A = t(() => {
      let e = r.numRows() * r.numColumns(),
        s = t((e, t) => {
          let s = [];
          for (s.push(e); s.length > 0; ) {
            let e = s.pop();
            b(e).forEach((e) => {
              h[e] < 0 && ((h[e] = t), s.push(e));
            });
          }
        }, "traverse");
      h ? (h.length = e) : (h = new Array(e)), h.fill(-1, 0, e);
      let n = 0;
      for (let e = 0; e < o.length; e++) h[e] >= 0 || s(e, n), n++;
    }, "createConnectivityMap"),
    x = t((e, t) => o[t], "getCost"),
    v = t((e, t) => {
      let s = d(e),
        r = d(t);
      return s.dist(r);
    }, "getHeuristic"),
    b = t((e, t) => {
      let s = [],
        r = Math.floor(e % i),
        a = r > 0 && 1 & l[e] && o[e - 1] !== 1 / 0,
        h = e >= i && 2 & l[e] && o[e - i] !== 1 / 0,
        u = r < i - 1 && 4 & l[e] && o[e + 1] !== 1 / 0,
        d = e < i * n - i - 1 && 8 & l[e] && o[e + i] !== 1 / 0;
      return (
        t
          ? (a &&
              (h && s.push(e - i - 1), s.push(e - 1), d && s.push(e + i - 1)),
            h && s.push(e - i),
            u &&
              (h && s.push(e - i + 1), s.push(e + 1), d && s.push(e + i + 1)),
            d && s.push(e + i))
          : (a && s.push(e - 1),
            h && s.push(e - i),
            u && s.push(e + 1),
            d && s.push(e + i)),
        s
      );
    }, "getNeighbours"),
    E = {
      id: "level",
      tileWidth: () => s.tileWidth,
      tileHeight: () => s.tileHeight,
      spawn(e, ...t) {
        let n = f(...t),
          i = (() => {
            if ("string" != typeof e) {
              if (Array.isArray(e)) return e;
              throw new Error("Expected a symbol or a component list");
            }
            if (s.tiles[e]) {
              if ("function" != typeof s.tiles[e])
                throw new Error(
                  "Level symbol def must be a function returning a component list"
                );
              return s.tiles[e](n);
            }
            if (s.wildcardTile) return s.wildcardTile(e, n);
          })();
        if (!i) return null;
        let o = !1,
          l = !1;
        for (let e of i)
          "tile" === e.id && (l = !0), "pos" === e.id && (o = !0);
        o || i.push(Na(this.tile2Pos(n))), l || i.push(aa());
        let h = r.add(i);
        return (
          o && (h.tilePosOffset = h.pos.clone()),
          (h.tilePos = n),
          (h.transform = Is(h)),
          a &&
            (p(h),
            this.trigger("spatialMapChanged"),
            this.trigger("navigationMapInvalid")),
          h
        );
      },
      numColumns: () => i,
      numRows: () => n,
      levelWidth() {
        return i * this.tileWidth();
      },
      levelHeight() {
        return n * this.tileHeight();
      },
      tile2Pos(...e) {
        return f(...e).scale(this.tileWidth(), this.tileHeight());
      },
      pos2Tile(...e) {
        let t = f(...e);
        return f(
          Math.floor(t.x / this.tileWidth()),
          Math.floor(t.y / this.tileHeight())
        );
      },
      getSpatialMap: () => (a || c(), a),
      removeFromSpatialMap: g,
      insertIntoSpatialMap: p,
      onSpatialMapChanged(e) {
        return this.on("spatialMapChanged", e);
      },
      onNavigationMapInvalid(e) {
        return this.on("navigationMapInvalid", e);
      },
      getAt(e) {
        a || c();
        let t = u(e);
        return a[t] || [];
      },
      raycast(e, t) {
        let s = this.toWorld(e),
          r = this.toWorld(e.add(t)).sub(s),
          n = 1 / this.tileWidth(),
          i = he(
            e.scale(n),
            t,
            (e) => {
              let t = this.getAt(e);
              if (t.some((e) => e.isObstacle)) return !0;
              let i = null;
              for (let e of t)
                if (e.has("area")) {
                  let t = e.worldArea().raycast(s, r);
                  t &&
                    (i
                      ? t.fraction < i.fraction && ((i = t), (i.object = e))
                      : ((i = t), (i.object = e)));
                }
              return i && (i.point = this.fromWorld(i.point).scale(n)), i || !1;
            },
            64
          );
        return i && (i.point = i.point.scale(this.tileWidth())), i;
      },
      update() {
        a && m();
      },
      invalidateNavigationMap() {
        (o = null), (l = null), (h = null);
      },
      onNavigationMapChanged(e) {
        return this.on("navigationMapChanged", e);
      },
      getTilePath(e, t, s = {}) {
        if (
          (o || w(),
          l || y(),
          h || A(),
          e.x < 0 ||
            e.x >= i ||
            e.y < 0 ||
            e.y >= n ||
            t.x < 0 ||
            t.x >= i ||
            t.y < 0 ||
            t.y >= n)
        )
          return null;
        let r = u(e),
          a = u(t);
        if (o[a] === 1 / 0) return null;
        if (r === a) return [];
        if (-1 != h[r] && h[r] !== h[a]) return null;
        let c = new mt((e, t) => e.cost < t.cost);
        c.insert({ cost: 0, node: r });
        let f = new Map();
        f.set(r, r);
        let p = new Map();
        for (p.set(r, 0); 0 !== c.length; ) {
          let e = c.remove()?.node;
          if (e === a) break;
          let t = b(e, s.allowDiagonals);
          for (let s of t) {
            let t = (p.get(e) || 0) + x(e, s) + v(s, a);
            (!p.has(s) || t < p.get(s)) &&
              (p.set(s, t), c.insert({ cost: t, node: s }), f.set(s, e));
          }
        }
        let g = [],
          m = a,
          E = d(m);
        for (g.push(E); m !== r; ) {
          let e = f.get(m);
          if (void 0 === e) throw new Error("Bug in pathfinding algorithm");
          m = e;
          let t = d(m);
          g.push(t);
        }
        return g.reverse();
      },
      getPath(e, t, s = {}) {
        let r = this.tileWidth(),
          n = this.tileHeight(),
          i = this.getTilePath(this.pos2Tile(e), this.pos2Tile(t), s);
        return i
          ? [
              e,
              ...i.slice(1, -1).map((e) => e.scale(r, n).add(r / 2, n / 2)),
              t,
            ]
          : null;
      },
    };
  return (
    r.use(E),
    r.onNavigationMapInvalid(() => {
      r.invalidateNavigationMap(), r.trigger("navigationMapChanged");
    }),
    e.forEach((e, t) => {
      let s = e.split("");
      (i = Math.max(s.length, i)),
        s.forEach((e, s) => {
          r.spawn(e, f(s, t));
        });
    }),
    r
  );
}
function Gn(e, t, s) {
  return (
    Va.game.objEvents.registers[e] ||
      (Va.game.objEvents.registers[e] = new ht()),
    Va.game.objEvents.on(e, (e, ...r) => {
      e.is(t) && s(e, ...r);
    })
  );
}
t(Dn, "particles"),
  t(On, "polygon"),
  t(Un, "raycast"),
  t(Ln, "rect"),
  t(Nn, "shader"),
  t(Hn, "addLevel"),
  t(Gn, "on");
var jn = t((e, t, ...s) => {
    for (let s of Va.game.root.children) s.is(t) && s.trigger(e);
  }, "trigger"),
  Vn = It(
    (e) => {
      let s = Va.game.root.add([{ fixedUpdate: e }]);
      return {
        get paused() {
          return s.paused;
        },
        set paused(e) {
          s.paused = e;
        },
        cancel: t(() => s.destroy(), "cancel"),
      };
    },
    (e, t) => Gn("fixedUpdate", e, t)
  ),
  Kn = It(
    (e) => {
      let s = Va.game.root.add([{ update: e }]);
      return {
        get paused() {
          return s.paused;
        },
        set paused(e) {
          s.paused = e;
        },
        cancel: t(() => s.destroy(), "cancel"),
      };
    },
    (e, t) => Gn("update", e, t)
  ),
  Yn = It(
    (e) => {
      let s = Va.game.root.add([{ draw: e }]);
      return {
        get paused() {
          return s.hidden;
        },
        set paused(e) {
          s.hidden = e;
        },
        cancel: t(() => s.destroy(), "cancel"),
      };
    },
    (e, t) => Gn("draw", e, t)
  ),
  Qn = It(
    (e) => Va.game.events.on("add", e),
    (e, t) => Gn("add", e, t)
  ),
  zn = It(
    (e) => Va.game.events.on("destroy", e),
    (e, t) => Gn("destroy", e, t)
  ),
  Xn = It(
    (e) => Va.game.events.on("use", e),
    (e, t) => Gn("use", e, t)
  ),
  Wn = It(
    (e) => Va.game.events.on("unuse", e),
    (e, t) => Gn("unuse", e, t)
  ),
  Jn = It(
    (e) => Va.game.events.on("tag", e),
    (e, t) => Gn("tag", e, t)
  ),
  Zn = It(
    (e) => Va.game.events.on("untag", e),
    (e, t) => Gn("untag", e, t)
  );
function _n(e, t, s) {
  return Gn("collide", e, (e, r, n) => r.is(t) && s(e, r, n));
}
function $n(e, t, s) {
  return Gn("collideUpdate", e, (e, r, n) => r.is(t) && s(e, r, n));
}
function ei(e, t, s) {
  return Gn("collideEnd", e, (e, r, n) => r.is(t) && s(e, r, n));
}
function ti(e, t) {
  Va.game.root.get(e, { recursive: !0 }).forEach(t),
    Qn(e, t),
    Jn((s, r) => {
      r === e && t(s);
    });
}
t(_n, "onCollide"),
  t($n, "onCollideUpdate"),
  t(ei, "onCollideEnd"),
  t(ti, "forAllCurrentAndFuture");
var si = It(
  (e) => Va.app.onMousePress(e),
  (e, t) => {
    let s = [];
    return (
      ti(e, (e) => {
        if (!e.area)
          throw new Error(
            "onClick() requires the object to have area() component"
          );
        s.push(e.onClick(() => t(e)));
      }),
      ut.join(s)
    );
  }
);
function ri(e, t) {
  let s = [];
  return (
    ti(e, (e) => {
      if (!e.area)
        throw new Error(
          "onHover() requires the object to have area() component"
        );
      s.push(e.onHover(() => t(e)));
    }),
    ut.join(s)
  );
}
function ni(e, t) {
  let s = [];
  return (
    ti(e, (e) => {
      if (!e.area)
        throw new Error(
          "onHoverUpdate() requires the object to have area() component"
        );
      s.push(e.onHoverUpdate(() => t(e)));
    }),
    ut.join(s)
  );
}
function ii(e, t) {
  let s = [];
  return (
    ti(e, (e) => {
      if (!e.area)
        throw new Error(
          "onHoverEnd() requires the object to have area() component"
        );
      s.push(e.onHoverEnd(() => t(e)));
    }),
    ut.join(s)
  );
}
function ai(e) {
  Va.game.events.on("loading", e);
}
function oi(e) {
  Va.app.onResize(e);
}
function li(e) {
  Va.game.events.on("error", e);
}
function hi(e) {
  Va.assets.loaded ? e() : Va.game.events.on("load", e);
}
function ui(e) {
  if (!Va.assets.loaded) return Va.game.events.on("loadError", e);
  lr().forEach((t) => e(...t));
}
function di(...e) {
  Va.game.cam.pos = f(...e);
}
function ci() {
  return Va.game.cam.pos ? Va.game.cam.pos.clone() : Ws();
}
function fi(...e) {
  Va.game.cam.scale = f(...e);
}
function pi() {
  return Va.game.cam.scale.clone();
}
function gi(e) {
  Va.game.cam.angle = e;
}
function mi() {
  return Va.game.cam.angle;
}
function wi() {
  return Va.game.cam.transform.clone();
}
function yi(e = n(255, 255, 255), t = 1) {
  let s = Va.game.root.add([
      Ln(Vs(), Ks()),
      Rn(e),
      kn(1),
      { id: "fixed", fixed: !0 },
    ]),
    r = s.fadeOut(t);
  return r.onEnd(() => zi(s)), r;
}
function Ai() {
  return Va.game.cam.transform.clone();
}
function xi(e = 12) {
  Va.game.cam.shake += e;
}
function vi(e) {
  return Va.game.cam.transform.multVec2(e);
}
function bi(e) {
  return Va.game.cam.transform.invert().multVec2(e);
}
function Ei(...e) {
  return Ct("camPos", "setCamPos / getCamPos"), e.length > 0 && di(...e), ci();
}
function Mi(...e) {
  return (
    Ct("camScale", "setCamScale / getCamScale"), e.length > 0 && fi(...e), pi()
  );
}
function Si(e) {
  return Ct("camRot", "setCamRot / getCamRot"), void 0 !== e && gi(e), mi();
}
function qi(e = n(255, 255, 255), t = 1) {
  return Ct("camFlash", "flash"), yi(e, t);
}
function Bi(e = []) {
  let s = new Map(),
    r = [],
    n = {},
    i = new ct(),
    a = [],
    o = new Set("*"),
    l = Va.globalOpt.tagsAsComponents,
    h = null,
    u = !1,
    d = {
      id: Jt(),
      hidden: !1,
      transform: new y(),
      children: [],
      parent: null,
      set paused(e) {
        if (e !== u) {
          u = e;
          for (let t of a) t.paused = e;
        }
      },
      get paused() {
        return u;
      },
      get tags() {
        return Array.from(o);
      },
      add(e) {
        let t = Array.isArray(e) ? Bi(e) : e;
        if (t.parent)
          throw new Error("Cannot add a game obj that already has a parent.");
        return (
          (t.parent = this),
          (t.transform = Is(t)),
          this.children.push(t),
          t.trigger("add", t),
          Va.game.events.trigger("add", t),
          t
        );
      },
      readd(e) {
        let t = this.children.indexOf(e);
        return (
          -1 !== t && (this.children.splice(t, 1), this.children.push(e)), e
        );
      },
      remove(e) {
        let s = this.children.indexOf(e);
        if (-1 !== s) {
          (e.parent = null), this.children.splice(s, 1);
          let r = t((e) => {
            e.trigger("destroy"),
              Va.game.events.trigger("destroy", e),
              e.children.forEach((e) => r(e));
          }, "trigger");
          r(e);
        }
      },
      removeAll(e) {
        if (e) this.get(e).forEach((e) => this.remove(e));
        else for (let e of [...this.children]) this.remove(e);
      },
      fixedUpdate() {
        this.paused ||
          (this.children.forEach((e) => e.fixedUpdate()),
          this.trigger("fixedUpdate"));
      },
      update() {
        this.paused ||
          (this.children.forEach((e) => e.update()), this.trigger("update"));
      },
      draw() {
        if (this.hidden) return;
        this.canvas && (js(), this.canvas.bind());
        let e = Va.gfx.fixed;
        this.fixed && (Va.gfx.fixed = !0),
          Us(),
          Os(this.pos),
          Ns(this.scale),
          Hs(this.angle);
        let t = this.children.sort(
          (e, t) =>
            (e.layerIndex ?? Va.game.defaultLayerIndex) -
              (t.layerIndex ?? Va.game.defaultLayerIndex) ||
            (e.z ?? 0) - (t.z ?? 0)
        );
        if (this.mask) {
          let e = { intersect: Va.k.drawMasked, subtract: Va.k.drawSubtracted }[
            this.mask
          ];
          if (!e) throw new Error(`Invalid mask func: "${this.mask}"`);
          e(
            () => {
              t.forEach((e) => e.draw());
            },
            () => {
              this.trigger("draw");
            }
          );
        } else this.trigger("draw"), t.forEach((e) => e.draw());
        Gs(), (Va.gfx.fixed = e), this.canvas && (js(), this.canvas.unbind());
      },
      drawInspect() {
        this.hidden ||
          (Us(),
          Os(this.pos),
          Ns(this.scale),
          Hs(this.angle),
          this.children.forEach((e) => e.drawInspect()),
          this.trigger("drawInspect"),
          Gs());
      },
      use(e) {
        if ("string" == typeof e) return o.add(e);
        if (!e || "object" != typeof e)
          throw new Error(
            `You can only pass a component or a string to .use(), you passed a "${typeof e}"`
          );
        let i = [];
        e.id
          ? (this.unuse(e.id),
            (n[e.id] = []),
            (i = n[e.id]),
            s.set(e.id, e),
            l && o.add(e.id))
          : r.push(e);
        for (let r in e) {
          if (at.has(r)) continue;
          let n = Object.getOwnPropertyDescriptor(e, r);
          if (n)
            if (
              ("function" == typeof n.value && (e[r] = e[r].bind(this)),
              n.set && Object.defineProperty(e, r, { set: n.set.bind(this) }),
              n.get && Object.defineProperty(e, r, { get: n.get.bind(this) }),
              ot.has(r))
            ) {
              let s =
                "add" === r
                  ? () => {
                      (h = t((e) => i.push(e), "onCurCompCleanup")),
                        e[r]?.(),
                        (h = null);
                    }
                  : e[r];
              i.push(this.on(r, s).cancel);
            } else {
              if (void 0 !== this[r]) {
                let t = s.values().find((e) => void 0 !== e[r])?.id;
                throw new Error(
                  `Duplicate component property: "${r}" while adding component "${e.id}"` +
                    (t ? ` (originally added by "${t}")` : "")
                );
              }
              Object.defineProperty(this, r, {
                get: t(() => e[r], "get"),
                set: t((t) => (e[r] = t), "set"),
                configurable: !0,
                enumerable: !0,
              }),
                i.push(() => delete this[r]);
            }
        }
        let a = t(() => {
          if (e.require)
            for (let t of e.require)
              if (!this.c(t))
                throw new Error(
                  `Component "${e.id}" requires component "${t}"`
                );
        }, "checkDeps");
        e.destroy && i.push(e.destroy.bind(this)),
          this.exists()
            ? (a(),
              e.add &&
                ((h = t((e) => i.push(e), "onCurCompCleanup")),
                e.add.call(this),
                (h = null)),
              e.id &&
                (this.trigger("use", e.id),
                Va.game.events.trigger("use", this, e.id)))
            : e.require && i.push(this.on("add", a).cancel);
      },
      unuse(e) {
        if (s.has(e)) {
          for (let t of s.values())
            if (t.require && t.require.includes(e))
              throw new Error(
                `Can't unuse. Component "${t.id}" requires component "${e}"`
              );
          s.delete(e),
            this.trigger("unuse", e),
            Va.game.events.trigger("unuse", this, e);
        } else l && o.has(e) && o.delete(e);
        n[e] && (n[e].forEach((e) => e()), delete n[e]);
      },
      c: (e) => s.get(e) ?? null,
      get(e, s = {}) {
        let r = t(
            (e, t) =>
              "comps" === s.only
                ? e.has(t)
                : "tags" === s.only
                ? e.is(t)
                : e.is(t) || e.has(t),
            "checkTagsOrComps"
          ),
          n = s.recursive
            ? this.children.flatMap(
                t(function e(t) {
                  return [t, ...t.children.flatMap(e)];
                }, "recurse")
              )
            : this.children;
        if (((n = n.filter((t) => !e || r(t, e))), s.liveUpdate)) {
          let i = t(
              (e) => (s.recursive ? this.isAncestorOf(e) : e.parent === this),
              "isChild"
            ),
            a = [];
          a.push(
            Va.k.onAdd((t) => {
              i(t) && r(t, e) && n.push(t);
            })
          ),
            a.push(
              Va.k.onDestroy((t) => {
                if (i(t) && r(t, e)) {
                  let e = n.findIndex((e) => e.id === t.id);
                  -1 !== e && n.splice(e, 1);
                }
              })
            ),
            this.onDestroy(() => {
              for (let e of a) e.cancel();
            });
        }
        return n;
      },
      query(e) {
        let s = e.hierarchy || "children",
          r = e.include,
          n = e.exclude,
          i = [];
        switch (s) {
          case "children":
            i = this.children;
            break;
          case "siblings":
            i = this.parent
              ? this.parent.children.filter((e) => e !== this)
              : [];
            break;
          case "ancestors":
            let e = this.parent;
            for (; e; ) i.push(e), (e = e.parent);
            break;
          case "descendants":
            i = this.children.flatMap(
              t(function e(t) {
                return [t, ...t.children.flatMap(e)];
              }, "recurse")
            );
        }
        if (
          (r &&
            (i =
              "and" !== (e.includeOp || "and") && Array.isArray(e.include)
                ? i.filter((t) => e.include.some((e) => t.is(e)))
                : i.filter((e) => e.is(r))),
          n &&
            (i =
              "and" !== (e.includeOp || "and") && Array.isArray(e.include)
                ? i.filter((t) => !e.exclude.some((e) => t.is(e)))
                : i.filter((e) => !e.is(n))),
          !0 === e.visible && (i = i.filter((e) => e.visible)),
          e.distance)
        ) {
          if (!this.pos)
            throw Error("Can't do a distance query from an object without pos");
          let t = e.distanceOp || "near",
            s = e.distance * e.distance;
          i =
            "near" === t
              ? i.filter((e) => e.pos && this.pos.sdist(e.pos) <= s)
              : i.filter((e) => e.pos && this.pos.sdist(e.pos) > s);
        }
        return e.name && (i = i.filter((t) => t.name === e.name)), i;
      },
      isAncestorOf(e) {
        return !!e.parent && (e.parent === this || this.isAncestorOf(e.parent));
      },
      exists() {
        return Va.game.root.isAncestorOf(this);
      },
      is: (e, t = "and") =>
        Array.isArray(e)
          ? "and" === t
            ? e.every((e) => o.has(e))
            : e.some((e) => o.has(e))
          : o.has(e),
      tag(e) {
        if (Array.isArray(e))
          for (let t of e)
            o.add(t),
              this.trigger("tag", t),
              Va.game.events.trigger("tag", this, t);
        else
          o.add(e),
            this.trigger("tag", e),
            Va.game.events.trigger("tag", this, e);
      },
      untag(e) {
        if (Array.isArray(e))
          for (let t of e)
            o.delete(t),
              this.trigger("untag", t),
              Va.game.events.trigger("untag", this, t);
        else
          o.delete(e),
            this.trigger("untag", e),
            Va.game.events.trigger("untag", this, e);
      },
      has: (e, t = "and") =>
        Array.isArray(e)
          ? "and" === t
            ? e.every((e) => s.has(e))
            : e.some((e) => s.has(e))
          : s.has(e),
      on(e, t) {
        let s = i.on(e, t.bind(this));
        return h && h(() => s.cancel()), s;
      },
      trigger(e, ...t) {
        i.trigger(e, ...t), Va.game.objEvents.trigger(e, this, ...t);
      },
      destroy() {
        this.parent && this.parent.remove(this);
      },
      inspect() {
        let e = {};
        for (let [t, r] of s) e[t] = r.inspect?.() ?? null;
        for (let [t, s] of r.entries())
          if (s.inspect) e[t] = s.inspect();
          else
            for (let [t, r] of Object.entries(s))
              "function" != typeof r && (e[t] = `${t}: ${r}`);
        return e;
      },
      onAdd(e) {
        return this.on("add", e);
      },
      onFixedUpdate(e) {
        return this.on("fixedUpdate", e);
      },
      onUpdate(e) {
        return this.on("update", e);
      },
      onDraw(e) {
        return this.on("draw", e);
      },
      onDestroy(e) {
        return this.on("destroy", e);
      },
      onUse(e) {
        return this.on("use", e);
      },
      onUnuse(e) {
        return this.on("unuse", e);
      },
      clearEvents() {
        i.clear();
      },
    },
    c = [
      "onKeyPress",
      "onKeyPressRepeat",
      "onKeyDown",
      "onKeyRelease",
      "onMousePress",
      "onMouseDown",
      "onMouseRelease",
      "onMouseMove",
      "onCharInput",
      "onMouseMove",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onScroll",
      "onGamepadButtonPress",
      "onGamepadButtonDown",
      "onGamepadButtonRelease",
      "onGamepadStick",
      "onButtonPress",
      "onButtonDown",
      "onButtonRelease",
    ];
  for (let e of c)
    d[e] = (...t) => {
      let s = Va.app[e]?.(...t);
      return (
        a.push(s),
        d.onDestroy(() => s.cancel()),
        d.on("sceneEnter", () => {
          a.splice(a.indexOf(s), 1);
          let r = Va.app[e]?.(...t);
          ut.replace(s, r), a.push(s);
        }),
        s
      );
    };
  for (let t of e) d.use(t);
  return d;
}
t(ri, "onHover"),
  t(ni, "onHoverUpdate"),
  t(ii, "onHoverEnd"),
  t(ai, "onLoading"),
  t(oi, "onResize"),
  t(li, "onError"),
  t(hi, "onLoad"),
  t(ui, "onLoadError"),
  t(di, "setCamPos"),
  t(ci, "getCamPos"),
  t(fi, "setCamScale"),
  t(pi, "getCamScale"),
  t(gi, "setCamRot"),
  t(mi, "getCamRot"),
  t(wi, "getCamTransform"),
  t(yi, "flash"),
  t(Ai, "camTransform"),
  t(xi, "shake"),
  t(vi, "toScreen"),
  t(bi, "toWorld"),
  t(Ei, "camPos"),
  t(Mi, "camScale"),
  t(Si, "camRot"),
  t(qi, "camFlash"),
  t(Bi, "make");
var Ri = t(
  () => ({
    events: new ct(),
    objEvents: new ct(),
    root: Bi([]),
    gravity: null,
    scenes: {},
    currentScene: null,
    layers: null,
    defaultLayerIndex: 0,
    logs: [],
    cam: { pos: null, scale: new c(1), angle: 0, shake: 0, transform: new y() },
  }),
  "initGame"
);
function Ci(e) {
  Va.game.gravity = e ? (Va.game.gravity || f(0, 1)).unit().scale(e) : null;
}
function Pi() {
  return Va.game.gravity ? Va.game.gravity.len() : 0;
}
function Ii(e) {
  Va.game.gravity = e.unit().scale(Va.game.gravity ? Va.game.gravity.len() : 1);
}
function ki() {
  return Va.game.gravity ? Va.game.gravity.unit() : f(0, 1);
}
t(Ci, "setGravity"),
  t(Pi, "getGravity"),
  t(Ii, "setGravityDirection"),
  t(ki, "getGravityDirection");
var Fi = s(
    "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"
  ),
  Ti = t(
    () =>
      (() => {
        let e = new (window.AudioContext || window.webkitAudioContext)(),
          t = e.createGain();
        t.connect(e.destination);
        let s = new Tr(As(e));
        return (
          e
            .decodeAudioData(Fi.buffer.slice(0))
            .then((e) => {
              s.buf = e;
            })
            .catch((e) => {
              console.error("Failed to load burp: ", e);
            }),
          { ctx: e, masterNode: t, burpSnd: s }
        );
      })(),
    "initAudio"
  );
function Di(e, s = {}) {
  let r = new dt(),
    n = new Audio(e);
  function i() {
    Va.debug.paused ||
      (Va.app.isHidden() && !Va.globalOpt.backgroundAudio) ||
      Va.audio.ctx.resume();
  }
  function a() {
    i(), n.play();
  }
  return (
    (n.crossOrigin = "anonymous"),
    (n.loop = !!s.loop),
    Va.audio.ctx.createMediaElementSource(n).connect(Va.audio.masterNode),
    t(i, "resumeAudioCtx"),
    t(a, "play"),
    s.paused || a(),
    (n.onended = () => r.trigger()),
    {
      play() {
        a();
      },
      seek(e) {
        n.currentTime = e;
      },
      stop() {
        n.pause(), this.seek(0);
      },
      set loop(e) {
        n.loop = e;
      },
      get loop() {
        return n.loop;
      },
      set paused(e) {
        e ? n.pause() : a();
      },
      get paused() {
        return n.paused;
      },
      time: () => n.currentTime,
      duration: () => n.duration,
      set volume(e) {
        n.volume = l(e, 0, 1);
      },
      get volume() {
        return n.volume;
      },
      set speed(e) {
        n.playbackRate = Math.max(e, 0);
      },
      get speed() {
        return n.playbackRate;
      },
      set detune(e) {},
      get detune() {
        return 0;
      },
      onEnd: (e) => r.add(e),
      then(e) {
        return this.onEnd(e);
      },
    }
  );
}
function Oi(e, s = {}) {
  if ("string" == typeof e && Va.assets.music[e])
    return Di(Va.assets.music[e], s);
  let r = Va.audio.ctx,
    n = s.paused ?? !1,
    i = r.createBufferSource(),
    a = new dt(),
    o = r.createGain(),
    l = r.createStereoPanner(),
    h = s.seek ?? 0,
    u = 0,
    d = 0,
    c = !1;
  (i.loop = !!s.loop),
    (i.detune.value = s.detune ?? 0),
    (i.playbackRate.value = s.speed ?? 1),
    i.connect(l),
    (i.onended = () => {
      g() >= (i.buffer?.duration ?? Number.POSITIVE_INFINITY) && a.trigger();
    }),
    (l.pan.value = s.pan ?? 0),
    l.connect(o),
    o.connect(Va.audio.masterNode),
    (o.gain.value = s.volume ?? 1);
  let f = t((e) => {
      (i.buffer = e.buf), n || ((u = r.currentTime), i.start(0, h), (c = !0));
    }, "start"),
    p = Dr(e);
  p instanceof _s && p.onLoad(f);
  let g = t(() => {
      if (!i.buffer) return 0;
      let e = n ? d - u : r.currentTime - u,
        t = i.buffer.duration;
      return i.loop ? e % t : Math.min(e, t);
    }, "getTime"),
    m = t((e) => {
      let t = r.createBufferSource();
      return (
        (t.buffer = e.buffer),
        (t.loop = e.loop),
        (t.playbackRate.value = e.playbackRate.value),
        (t.detune.value = e.detune.value),
        (t.onended = e.onended),
        t.connect(l),
        t
      );
    }, "cloneNode");
  return {
    stop() {
      (this.paused = !0), this.seek(0);
    },
    set paused(e) {
      if (n !== e)
        if (((n = e), e)) c && (i.stop(), (c = !1)), (d = r.currentTime);
        else {
          i = m(i);
          let e = d - u;
          i.start(0, e), (c = !0), (u = r.currentTime - e), (d = 0);
        }
    },
    get paused() {
      return n;
    },
    play(e = 0) {
      this.seek(e), (this.paused = !1);
    },
    seek(e) {
      i.buffer?.duration &&
        (e > i.buffer.duration ||
          (n
            ? ((i = m(i)), (u = d - e))
            : (i.stop(),
              (i = m(i)),
              (u = r.currentTime - e),
              i.start(0, e),
              (c = !0),
              (d = 0))));
    },
    set speed(e) {
      i.playbackRate.value = e;
    },
    get speed() {
      return i.playbackRate.value;
    },
    set detune(e) {
      i.detune.value = e;
    },
    get detune() {
      return i.detune.value;
    },
    set volume(e) {
      o.gain.value = Math.max(e, 0);
    },
    get volume() {
      return o.gain.value;
    },
    set pan(e) {
      l.pan.value = e;
    },
    get pan() {
      return l.pan.value;
    },
    set loop(e) {
      i.loop = e;
    },
    get loop() {
      return i.loop;
    },
    duration: () => i.buffer?.duration ?? 0,
    time() {
      return g() % this.duration();
    },
    onEnd: (e) => a.add(e),
    then(e) {
      return this.onEnd(e);
    },
  };
}
function Ui(e) {
  return Va.k.play(Va.audio.burpSnd, e);
}
function Li(e) {
  Va.audio.masterNode.gain.value = e;
}
function Ni() {
  return Va.audio.masterNode.gain.value;
}
function Hi(e) {
  return Ct("volume", "setVolume / getVolume"), void 0 !== e && Li(e), Ni();
}
function Gi() {
  Va.app.onHide(() => {
    Va.globalOpt.backgroundAudio || Va.audio.ctx.suspend();
  }),
    Va.app.onShow(() => {
      !Va.globalOpt.backgroundAudio &&
        !Va.debug.paused &&
        Va.audio.ctx.resume();
    }),
    Va.app.onResize(() => {
      if (Va.app.isFullscreen()) return;
      let e = Va.globalOpt.width && Va.globalOpt.height;
      (e && !Va.globalOpt.stretch && !Va.globalOpt.letterbox) ||
        ((Va.canvas.width = Va.canvas.offsetWidth * Va.pixelDensity),
        (Va.canvas.height = Va.canvas.offsetHeight * Va.pixelDensity),
        Mn(),
        e ||
          (Va.gfx.frameBuffer.free(),
          (Va.gfx.frameBuffer = new _r(
            Va.gfx.ggl,
            Va.gfx.ggl.gl.drawingBufferWidth,
            Va.gfx.ggl.gl.drawingBufferHeight
          )),
          (Va.gfx.width =
            Va.gfx.ggl.gl.drawingBufferWidth / Va.pixelDensity / Va.gscale),
          (Va.gfx.height =
            Va.gfx.ggl.gl.drawingBufferHeight / Va.pixelDensity / Va.gscale)));
    }),
    !1 !== Va.globalOpt.debug &&
      (Va.app.onKeyPress(
        Va.globalOpt.debugKey ?? "f1",
        () => (Va.debug.inspect = !Va.debug.inspect)
      ),
      Va.app.onKeyPress("f2", () => Va.debug.clearLog()),
      Va.app.onKeyPress("f8", () => (Va.debug.paused = !Va.debug.paused)),
      Va.app.onKeyPress("f7", () => {
        Va.debug.timeScale = Pt(l(Va.debug.timeScale - 0.2, 0, 2), 1);
      }),
      Va.app.onKeyPress("f9", () => {
        Va.debug.timeScale = Pt(l(Va.debug.timeScale + 0.2, 0, 2), 1);
      }),
      Va.app.onKeyPress("f10", () => Va.debug.stepFrame())),
    Va.globalOpt.burp && Va.app.onKeyPress("b", () => Ui());
}
function ji(e, t = {}) {
  let s = Va.game.root.add([Na(e), Aa()]),
    r = 5 * (t.speed || 1),
    n = t.scale || 1;
  s.add([$i(Va.boomSprite), Ga(0), Fa("center"), pa(r, n), ...(t.comps ?? [])]);
  let i = s.add([
    $i(Va.kaSprite),
    Ga(0),
    Fa("center"),
    va(),
    ...(t.comps ?? []),
  ]);
  return (
    i.wait(0.4 / r, () => i.use(pa(r, n))), i.onDestroy(() => s.destroy()), s
  );
}
function Vi(e, t) {
  if (Va.game.layers) throw Error("Layers can only be assigned once.");
  let s = e.indexOf(t);
  if (-1 == s)
    throw Error("The default layer name should be present in the layers list.");
  (Va.game.layers = e), (Va.game.defaultLayerIndex = s);
}
function Ki() {
  return Va.game.layers;
}
function Yi() {
  return Va.game.layers?.[Va.game.defaultLayerIndex] ?? null;
}
function Qi(e, t) {
  Ct("layers", "setLayers"), Vi(e, t);
}
function zi(e) {
  e.destroy();
}
function Xi() {
  return Va.game.root;
}
function Wi(e, t) {
  Va.game.scenes[e] = t;
}
function Ji(e, ...t) {
  if (!Va.game.scenes[e]) throw new Error(`Scene not found: ${e}`);
  Va.game.events.onOnce("frameEnd", () => {
    Va.game.events.trigger("sceneLeave", e),
      Va.app.events.clear(),
      Va.game.events.clear(),
      Va.game.objEvents.clear(),
      [...Va.game.root.children].forEach((t) => {
        !t.stay || (t.scenesToStay && !t.scenesToStay.includes(e))
          ? Va.game.root.remove(t)
          : t.trigger("sceneEnter", e);
      }),
      Va.game.root.clearEvents(),
      Gi(),
      (Va.game.cam = {
        pos: null,
        scale: f(1),
        angle: 0,
        shake: 0,
        transform: new y(),
      }),
      Va.game.scenes[e](...t);
  }),
    (Va.game.currentScene = e);
}
function Zi(e) {
  return Va.game.events.on("sceneLeave", e);
}
function _i() {
  return Va.game.currentScene;
}
function $i(e, s = {}) {
  let r = null,
    n = null,
    i = null,
    a = new dt();
  if (!e) throw new Error("Please pass the resource name or data to sprite()");
  let o = t((e, t, s, r) => {
      let n = f(1, 1);
      return (
        s && r
          ? ((n.x = s / (e.width * t.w)), (n.y = r / (e.height * t.h)))
          : s
          ? ((n.x = s / (e.width * t.w)), (n.y = n.x))
          : r && ((n.y = r / (e.height * t.h)), (n.x = n.y)),
        n
      );
    }, "calcTexScale"),
    l = t((e, t) => {
      if (!t) return;
      let n = t.frames[0].clone();
      s.quad && (n = n.scale(s.quad));
      let i = o(t.tex, n, s.width, s.height);
      (e.width = t.tex.width * n.w * i.x),
        (e.height = t.tex.height * n.h * i.y),
        s.anim && e.play(s.anim),
        (r = t),
        a.trigger(r);
    }, "setSpriteData");
  return {
    id: "sprite",
    width: 0,
    height: 0,
    frame: s.frame || 0,
    quad: s.quad || new p(0, 0, 1, 1),
    animSpeed: s.animSpeed ?? 1,
    flipX: s.flipX ?? !1,
    flipY: s.flipY ?? !1,
    get sprite() {
      return e.toString();
    },
    set sprite(e) {
      let t = fr(e);
      t && t.onLoad((e) => l(this, e));
    },
    get animFrame() {
      if (!r || !n || null === i) return this.frame;
      let e = r.anims[n.name];
      return "number" == typeof e ? e : this.frame - Math.min(e.from, e.to);
    },
    draw() {
      if (!r) return;
      let e = r.frames[this.frame ?? 0];
      if (!e) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (r.slice9) {
        let { left: t, right: n, top: i, bottom: a } = r.slice9,
          o = r.tex.width * e.w,
          l = r.tex.height * e.h,
          h = this.width - t - n,
          u = this.height - i - a,
          d = t / o,
          c = n / o,
          f = 1 - d - c,
          p = i / l,
          m = a / l,
          w = 1 - p - m,
          y = [
            g(0, 0, d, p),
            g(d, 0, f, p),
            g(d + f, 0, c, p),
            g(0, p, d, w),
            g(d, p, f, w),
            g(d + f, p, c, w),
            g(0, p + w, d, m),
            g(d, p + w, f, m),
            g(d + f, p + w, c, m),
            g(0, 0, t, i),
            g(t, 0, h, i),
            g(t + h, 0, n, i),
            g(0, i, t, u),
            g(t, i, h, u),
            g(t + h, i, n, u),
            g(0, i + u, t, a),
            g(t, i + u, h, a),
            g(t + h, i + u, n, a),
          ];
        for (let t = 0; t < 9; t++) {
          let n = y[t],
            i = y[t + 9];
          An(
            Object.assign(qn(this), {
              pos: i.pos(),
              tex: r.tex,
              quad: e.scale(n),
              flipX: this.flipX,
              flipY: this.flipY,
              tiled: s.tiled,
              width: i.w,
              height: i.h,
            })
          );
        }
      } else
        An(
          Object.assign(qn(this), {
            tex: r.tex,
            quad: e.scale(this.quad ?? new p(0, 0, 1, 1)),
            flipX: this.flipX,
            flipY: this.flipY,
            tiled: s.tiled,
            width: this.width,
            height: this.height,
          })
        );
    },
    add() {
      let t = fr(e);
      t ? t.onLoad((e) => l(this, e)) : hi(() => l(this, fr(e).data));
    },
    update() {
      if (!r || !n || null === i) return;
      let e = r.anims[n.name];
      if ("number" != typeof e) {
        if (0 === e.speed) throw new Error("Sprite anim speed cannot be 0");
        (n.timer += is() * this.animSpeed),
          n.timer >= 1 / n.speed &&
            ((n.timer = 0),
            (this.frame += i),
            (this.frame < Math.min(e.from, e.to) ||
              this.frame > Math.max(e.from, e.to)) &&
              (n.loop
                ? n.pingpong
                  ? ((this.frame -= i), (i *= -1), (this.frame += i))
                  : (this.frame = e.from)
                : n.pingpong
                ? i === Math.sign(e.to - e.from)
                  ? ((this.frame = e.to), (i *= -1), (this.frame += i))
                  : ((this.frame = e.from), n.onEnd(), this.stop())
                : ((this.frame = e.to), n.onEnd(), this.stop())));
      } else this.frame = e;
    },
    play(e, s = {}) {
      if (!r) return void a.add(() => this.play(e, s));
      let o = r.anims[e];
      if (void 0 === o) throw new Error(`Anim not found: ${e}`);
      n && this.stop(),
        (n =
          "number" == typeof o
            ? {
                name: e,
                timer: 0,
                loop: !1,
                pingpong: !1,
                speed: 0,
                onEnd: t(() => {}, "onEnd"),
              }
            : {
                name: e,
                timer: 0,
                loop: s.loop ?? o.loop ?? !1,
                pingpong: s.pingpong ?? o.pingpong ?? !1,
                speed: s.speed ?? o.speed ?? 10,
                onEnd: s.onEnd ?? (() => {}),
              }),
        (i = "number" == typeof o ? null : o.from < o.to ? 1 : -1),
        (this.frame = "number" == typeof o ? o : o.from),
        this.trigger("animStart", e);
    },
    stop() {
      if (!n) return;
      let e = n.name;
      (n = null), this.trigger("animEnd", e);
    },
    numFrames: () => r?.frames.length ?? 0,
    getCurAnim: () => n,
    curAnim: () => n?.name,
    getAnim: (e) => r?.anims[e] ?? null,
    hasAnim(e) {
      return !!this.getAnim(e);
    },
    onAnimEnd(e) {
      return this.on("animEnd", e);
    },
    onAnimStart(e) {
      return this.on("animStart", e);
    },
    renderArea() {
      return new ce(f(0), this.width, this.height);
    },
    inspect: () => ("string" == typeof e ? `sprite: "${e}"` : null),
  };
}
function ea(e, s = {}) {
  function r(e) {
    let t = an(
      Object.assign(qn(e), {
        text: e.text + "",
        size: e.textSize,
        font: e.font,
        width: s.width && e.width,
        align: e.align,
        letterSpacing: e.letterSpacing,
        lineSpacing: e.lineSpacing,
        transform: e.textTransform,
        styles: e.textStyles,
        indentAll: s.indentAll,
      })
    );
    return (
      s.width || (e.width = t.width / (e.scale?.x || 1)),
      (e.height = t.height / (e.scale?.y || 1)),
      t
    );
  }
  t(r, "update");
  let n = {
    id: "text",
    set text(t) {
      (e = t), r(this), (this.renderedText = nn(e).text);
    },
    get text() {
      return e;
    },
    textSize: s.size ?? 36,
    font: s.font,
    width: s.width ?? 0,
    height: 0,
    align: s.align,
    lineSpacing: s.lineSpacing,
    letterSpacing: s.letterSpacing,
    textTransform: s.transform,
    textStyles: s.styles,
    renderedText: e ? nn(e).text : "",
    add() {
      hi(() => r(this));
    },
    draw() {
      ln(r(this));
    },
    renderArea() {
      return new ce(f(0), this.width, this.height);
    },
  };
  return r(n), n;
}
function ta(e, t) {
  return {
    id: "rect",
    width: e,
    height: t,
    draw() {
      on(Object.assign(qn(this), { width: this.width, height: this.height }));
    },
    renderArea() {
      return new ce(f(0), this.width, this.height);
    },
    inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    },
  };
}
function sa(e = {}) {
  let t = null,
    s = null,
    r = null,
    n = null;
  return {
    id: "agent",
    require: ["pos", "tile"],
    agentSpeed: e.speed ?? 100,
    allowDiagonals: e.allowDiagonals ?? !0,
    getDistanceToTarget() {
      return t ? this.pos.dist(t) : 0;
    },
    getNextLocation: () => (s && r ? s[r] : null),
    getPath: () => (s ? s.slice() : null),
    getTarget: () => t,
    isNavigationFinished: () => !s || null === r,
    isTargetReachable: () => null !== s,
    isTargetReached() {
      return !t || this.pos.eq(t);
    },
    setTarget(e) {
      (t = e),
        (s = this.getLevel().getPath(this.pos, t, {
          allowDiagonals: this.allowDiagonals,
        })),
        (r = s ? 0 : null),
        s && null !== r
          ? (n ||
              ((n = this.getLevel().onNavigationMapChanged(() => {
                t &&
                  s &&
                  null !== r &&
                  ((s = this.getLevel().getPath(this.pos, t, {
                    allowDiagonals: this.allowDiagonals,
                  })),
                  s
                    ? ((r = 0), this.trigger("navigationNext", this, s[r]))
                    : ((r = null), this.trigger("navigationEnded", this)));
              })),
              this.onDestroy(() => n?.cancel())),
            this.trigger("navigationStarted", this),
            this.trigger("navigationNext", this, s[r]))
          : this.trigger("navigationEnded", this);
    },
    update() {
      if (t && s && null !== r) {
        if (this.pos.sdist(s[r]) < 2) {
          if (r === s.length - 1)
            return (
              (this.pos = t.clone()),
              (r = null),
              this.trigger("navigationEnded", this),
              void this.trigger("targetReached", this)
            );
          r++, this.trigger("navigationNext", this, s[r]);
        }
        this.moveTo(s[r], this.agentSpeed);
      }
    },
    onNavigationStarted(e) {
      return this.on("navigationStarted", e);
    },
    onNavigationNext(e) {
      return this.on("navigationNext", e);
    },
    onNavigationEnded(e) {
      return this.on("navigationEnded", e);
    },
    onTargetReached(e) {
      return this.on("targetReached", e);
    },
    inspect: () =>
      "agent: " +
      JSON.stringify({ target: JSON.stringify(t), path: JSON.stringify(s) }),
  };
}
function ra(e) {
  let t = e.graph;
  return {
    id: "pathfinder",
    require: ["pos"],
    navigateTo(t) {
      return this.graph?.getWaypointPath(this.pos, t, e.navigationOpt);
    },
    get graph() {
      if (t) return t;
      let e = this.parent;
      for (; e; ) {
        if (e.has("pathfinderMap")) return e.graph;
        e = e.parent;
      }
    },
    set graph(e) {
      t = e;
    },
  };
}
function na(e = {}) {
  let t = e.waypoints,
    s = e.speed || 100,
    r = e.endBehavior || "stop",
    n = 0,
    i = null != t;
  return {
    id: "patrol",
    require: ["pos"],
    get patrolSpeed() {
      return s;
    },
    set patrolSpeed(e) {
      s = e;
    },
    get waypoints() {
      return t;
    },
    set waypoints(e) {
      (t = e), (n = 0), (i = !1);
    },
    get nextLocation() {
      return t ? t[n] : void 0;
    },
    update() {
      let e = this.nextLocation;
      if (t && e && !i && (this.moveTo(e, s), this.pos.sdist(e) < 9))
        switch (r) {
          case "loop":
            n = (n + 1) % t.length;
            break;
          case "ping-pong":
            (n += 1), n == t.length && (t.reverse(), (n = 0));
            break;
          case "stop":
            (n = Math.min(n + 1, t.length - 1)),
              n == t.length - 1 && ((i = !0), this.trigger("patrolFinished"));
        }
    },
    onPatrolFinished(e) {
      return this.on("patrolFinished", e);
    },
  };
}
function ia(e, t = {}) {
  let s = "function" == typeof e ? e : () => Va.game.root.query(e),
    r = t.checkFrequency || 1,
    n = "number" == typeof t.direction ? c.fromAngle(t.direction) : t.direction,
    i = 0;
  return {
    id: "sentry",
    require: ["pos"],
    direction:
      "number" == typeof t.direction ? c.fromAngle(t.direction) : t.direction,
    spotted: [],
    set directionAngle(e) {
      this.direction = void 0 !== e ? c.fromAngle(e) : void 0;
    },
    get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    },
    fieldOfView: t.fieldOfView || 200,
    isWithinFieldOfView(e, s, r) {
      let i = ("number" == typeof s ? c.fromAngle(s) : s) || n,
        a = r || t.fieldOfView;
      if (!i || !a || a >= 360) return !0;
      let o = a / 2;
      return e.pos && i.angleBetween(e.pos.sub(this.pos)) <= o;
    },
    hasLineOfSight(e) {
      let s = Un(this.pos, e.pos.sub(this.pos), t.raycastExclude);
      return null != s && s.object === e;
    },
    update() {
      if (((i += is()), i > r)) {
        i -= r;
        let e = s();
        if (e.length && n && this.fieldOfView && this.fieldOfView < 360) {
          let t = this.fieldOfView / 2;
          e = e.filter(
            (e) => e.pos && n.angleBetween(e.pos.sub(this.pos)) <= t
          );
        }
        e.length &&
          t.lineOfSight &&
          (e = e.filter((e) => e.pos && this.hasLineOfSight(e))),
          e.length > 0 &&
            ((this.spotted = e), this.trigger("objectSpotted", e));
      }
    },
    onObjectsSpotted(e) {
      return this.on("objectSpotted", e);
    },
  };
}
function aa(e = {}) {
  let s = f(0),
    r = e.isObstacle ?? !1,
    n = e.cost ?? 0,
    i = e.edges ?? [],
    a = t(() => {
      let e = { left: 1, top: 2, right: 4, bottom: 8 };
      return i.map((t) => e[t] || 0).reduce((e, t) => e | t, 0);
    }, "getEdgeMask"),
    o = a();
  return {
    id: "tile",
    tilePosOffset: e.offset ?? f(0),
    set tilePos(e) {
      let t = this.getLevel();
      (s = e.clone()),
        (this.pos = f(
          this.tilePos.x * t.tileWidth(),
          this.tilePos.y * t.tileHeight()
        ).add(this.tilePosOffset));
    },
    get tilePos() {
      return s;
    },
    set isObstacle(e) {
      r !== e && ((r = e), this.getLevel().invalidateNavigationMap());
    },
    get isObstacle() {
      return r;
    },
    set cost(e) {
      n !== e && ((n = e), this.getLevel().invalidateNavigationMap());
    },
    get cost() {
      return n;
    },
    set edges(e) {
      (i = e), (o = a()), this.getLevel().invalidateNavigationMap();
    },
    get edges() {
      return i;
    },
    get edgeMask() {
      return o;
    },
    getLevel() {
      return this.parent;
    },
    tileMove(e) {
      let t = this.getLevel();
      t.removeFromSpatialMap(this),
        (this.tilePos = this.tilePos.add(e)),
        t.insertIntoSpatialMap(this),
        t.trigger("spatialMapChanged");
    },
    moveLeft() {
      this.tileMove(f(-1, 0));
    },
    moveRight() {
      this.tileMove(f(1, 0));
    },
    moveUp() {
      this.tileMove(f(0, -1));
    },
    moveDown() {
      this.tileMove(f(0, 1));
    },
  };
}
t(Di, "playMusic"),
  t(Oi, "play"),
  t(Ui, "burp"),
  t(Li, "setVolume"),
  t(Ni, "getVolume"),
  t(Hi, "volume"),
  t(Gi, "initEvents"),
  t(ji, "addKaboom"),
  t(Vi, "setLayers"),
  t(Ki, "getLayers"),
  t(Yi, "getDefaultLayer"),
  t(Qi, "layers"),
  t(zi, "destroy"),
  t(Xi, "getTreeRoot"),
  t(Wi, "scene"),
  t(Ji, "go"),
  t(Zi, "onSceneLeave"),
  t(_i, "getSceneName"),
  t($i, "sprite"),
  t(ea, "text"),
  t(ta, "uvquad"),
  t(sa, "agent"),
  t(ra, "pathfinder"),
  t(na, "patrol"),
  t(ia, "sentry"),
  t(aa, "tile");
var oa = class {
  static {
    t(this, "AnimateChannel");
  }
  name;
  duration;
  loops;
  direction;
  easing;
  interpolation;
  isFinished;
  timing;
  easings;
  relative;
  constructor(e, t, s) {
    (this.name = e),
      (this.duration = t.duration),
      (this.loops = t.loops || 0),
      (this.direction = t.direction || "forward"),
      (this.easing = t.easing || Ss.linear),
      (this.interpolation = t.interpolation || "linear"),
      (this.isFinished = !1),
      (this.timing = t.timing),
      (this.easings = t.easings),
      (this.relative = s);
  }
  update(e, t) {
    return !0;
  }
  getLowerKeyIndexAndRelativeTime(e, t, s) {
    let r = t - 1,
      n = e / this.duration;
    if (0 !== this.loops && n >= this.loops) return [r, 0, !0];
    let i = Math.trunc(n);
    if (
      ((n -= i),
      ("reverse" == this.direction ||
        ("ping-pong" == this.direction && 1 & i)) &&
        (n = 1 - n),
      s)
    ) {
      let e = 0;
      for (; void 0 !== s[e + 1] && s[e + 1] < n; ) e++;
      return e >= r ? [r, 0, !0] : [e, (n - s[e]) / (s[e + 1] - s[e]), !1];
    }
    {
      let e = Math.floor((t - 1) * n);
      return [e, (n - e / r) * r, !1];
    }
  }
  setValue(e, t, s) {
    if (this.relative)
      switch (t) {
        case "pos":
          e.pos = e.base.pos.add(s);
          break;
        case "angle":
          e.angle = e.base.angle + s;
          break;
        case "scale":
          e.scale = e.base.scale.scale(s);
          break;
        case "opacity":
          e.opacity = e.base.opacity * s;
          break;
        default:
          e[t] = s;
      }
    else e[t] = s;
  }
  serialize() {
    let e = { duration: this.duration, keys: [] };
    return (
      this.loops && (e.loops = this.loops),
      "forward" !== this.direction && (e.direction = this.direction),
      this.easing != Ss.linear && (e.easing = this.easing.name),
      "linear" !== this.interpolation && (e.interpolation = this.interpolation),
      this.timing && (e.timing = this.timing),
      this.easings && (e.easings = this.easings.map((e) => this.easing.name)),
      e
    );
  }
};
function la(e, t) {
  return t.add(t.sub(e));
}
t(la, "reflect");
var ha = class extends oa {
    static {
      t(this, "AnimateChannelNumber");
    }
    keys;
    constructor(e, t, s, r) {
      super(e, s, r), (this.keys = t);
    }
    update(e, t) {
      let [s, r, n] = this.getLowerKeyIndexAndRelativeTime(
        t,
        this.keys.length,
        this.timing
      );
      if (0 == r || "none" === this.interpolation)
        this.setValue(e, this.name, this.keys[s]);
      else {
        let t = this.easings ? this.easings[s] : this.easing;
        this.setValue(e, this.name, h(this.keys[s], this.keys[s + 1], t(r)));
      }
      return n;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  },
  ua = class extends oa {
    static {
      t(this, "AnimateChannelVec2");
    }
    keys;
    curves;
    dcurves;
    constructor(e, t, s, r, n) {
      if ((super(e, s, r), (this.keys = t), "spline" === this.interpolation)) {
        (this.curves = []), n && (this.dcurves = []);
        for (let e = 0; e < this.keys.length - 1; e++) {
          let t = this.keys[e],
            s = e + 1,
            r = this.keys[s],
            i = e > 0 ? this.keys[e - 1] : la(r, t),
            a = s < this.keys.length - 1 ? this.keys[s + 1] : la(t, r);
          this.curves.push(Ce(i, t, r, a)),
            n && this.dcurves?.push(Ce(i, t, r, a, ke));
        }
      }
    }
    update(e, t) {
      let [s, r, n] = this.getLowerKeyIndexAndRelativeTime(
        t,
        this.keys.length,
        this.timing
      );
      if (0 == r || "none" === this.interpolation)
        this.setValue(e, this.name, this.keys[s]);
      else {
        let t = this.easings ? this.easings[s] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(
              e,
              this.name,
              this.keys[s].lerp(this.keys[s + 1], t(r))
            );
            break;
          case "slerp":
            this.setValue(
              e,
              this.name,
              this.keys[s].slerp(this.keys[s + 1], t(r))
            );
            break;
          case "spline":
            if (this.curves) {
              this.setValue(e, this.name, this.curves[s](t(r))),
                this.dcurves &&
                  this.setValue(e, "angle", this.dcurves[s](t(r)).angle());
              break;
            }
        }
      }
      return n;
    }
    serialize() {
      return Object.assign(super.serialize(), {
        keys: this.keys.map((e) => [e.x, e.y]),
      });
    }
  },
  da = class extends oa {
    static {
      t(this, "AnimateChannelColor");
    }
    keys;
    constructor(e, t, s, r) {
      super(e, s, r), (this.keys = t);
    }
    update(e, t) {
      let [s, r, n] = this.getLowerKeyIndexAndRelativeTime(
        t,
        this.keys.length,
        this.timing
      );
      if (0 == r || "none" == this.interpolation)
        this.setValue(e, this.name, this.keys[s]);
      else {
        let t = this.easings ? this.easings[s] : this.easing;
        this.setValue(e, this.name, this.keys[s].lerp(this.keys[s + 1], t(r)));
      }
      return n;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
function ca(e = {}) {
  let t = [],
    s = 0,
    n = !1;
  return {
    id: "animate",
    require: e.followMotion ? ["rotate"] : void 0,
    base: { pos: f(0, 0), angle: 0, scale: f(1, 1), opacity: 1 },
    animation: {
      paused: !1,
      seek(e) {
        (s = l(e, 0, this.duration)),
          t.forEach((e) => {
            e.isFinished = !1;
          }),
          (n = !1);
      },
      get duration() {
        return t.reduce((e, t) => Math.max(t.duration, e), 0);
      },
    },
    add() {
      e.relative &&
        (this.has("pos") && (this.base.pos = this.pos.clone()),
        this.has("rotate") && (this.base.angle = this.angle),
        this.has("scale") && (this.base.scale = this.scale),
        this.has("opacity") && (this.base.opacity = this.opacity));
    },
    update() {
      if (this.animation.paused) return;
      let e,
        r = !0;
      s += is();
      for (let n of t)
        (e = n.update(this, s)),
          e &&
            !n.isFinished &&
            ((n.isFinished = !0),
            this.trigger("animateChannelFinished", n.name)),
          (r &&= e);
      r && !n && ((n = !0), this.trigger("animateFinished"));
    },
    animate(s, i, a) {
      (n = !1),
        this.unanimate(s),
        "number" == typeof i[0]
          ? t.push(new ha(s, i, a, e.relative || !1))
          : i[0] instanceof c
          ? t.push(
              new ua(
                s,
                i,
                a,
                e.relative || !1,
                "pos" === s && (e.followMotion || !1)
              )
            )
          : i[0] instanceof r && t.push(new da(s, i, a, e.relative || !1));
    },
    unanimate(e) {
      let s = t.findIndex((t) => t.name === e);
      s >= 0 && t.splice(s, 1);
    },
    unanimateAll() {
      t.splice(0, t.length);
    },
    onAnimateFinished(e) {
      return this.on("animateFinished", e);
    },
    onAnimateChannelFinished(e) {
      return this.on("animateChannelFinished", e);
    },
    serializeAnimationChannels: () =>
      t.reduce((e, t) => ((e[t.name] = t.serialize()), e), {}),
    serializeAnimationOptions() {
      let t = {};
      return (
        e.followMotion && (t.followMotion = !0),
        e.relative && (t.relative = !0),
        t
      );
    },
  };
}
function fa(e, t) {
  let s = { name: e.name };
  return (
    e.has("animate") &&
      ((s.channels = e.serializeAnimationChannels()),
      Object.assign(s, e.serializeAnimationOptions())),
    e.children.length > 0 &&
      (s.children = e.children
        .filter((e) => e.has("named"))
        .map((e) => fa(e, e.name))),
    s
  );
}
function pa(e = 2, t = 1) {
  let s = 0;
  return {
    require: ["scale"],
    update() {
      let r = Math.sin(s * e) * t;
      r < 0 && this.destroy(), (this.scale = f(r)), (s += is());
    },
  };
}
function ga(e, t) {
  if (null == e) throw new Error("health() requires the initial amount of hp");
  return {
    id: "health",
    hurt(t = 1) {
      this.setHP(e - t), this.trigger("hurt", t);
    },
    heal(t = 1) {
      let s = e;
      this.setHP(e + t), this.trigger("heal", e - s);
    },
    hp: () => e,
    maxHP: () => t ?? null,
    setMaxHP(e) {
      t = e;
    },
    setHP(s) {
      (e = t ? Math.min(t, s) : s) <= 0 && this.trigger("death");
    },
    onHurt(e) {
      return this.on("hurt", e);
    },
    onHeal(e) {
      return this.on("heal", e);
    },
    onDeath(e) {
      return this.on("death", e);
    },
    inspect: () => `health: ${e}`,
  };
}
function ma(e, t = {}) {
  if (null == e) throw new Error("lifespan() requires time");
  let s = t.fade ?? 0;
  return {
    id: "lifespan",
    require: ["opacity"],
    add() {
      Va.game.root.wait(e, () => {
        (this.opacity = this.opacity ?? 1),
          s > 0
            ? Va.game.root
                .tween(this.opacity, 0, s, (e) => (this.opacity = e), Ss.linear)
                .onEnd(() => {
                  this.destroy();
                })
            : this.destroy();
      });
    },
  };
}
function wa(e) {
  return { id: "named", name: e };
}
function ya(e, s, r) {
  if (!e) throw new Error("state() requires an initial state");
  let n = {};
  function i(e) {
    n[e] ||
      (n[e] = {
        enter: new dt(),
        end: new dt(),
        update: new dt(),
        draw: new dt(),
      });
  }
  function a(e, t, s) {
    return i(t), n[t][e].add(s);
  }
  function o(e, t, ...s) {
    i(t), n[t][e].trigger(...s);
  }
  t(i, "initStateEvents"), t(a, "on"), t(o, "trigger");
  let l = !1;
  return {
    id: "state",
    state: e,
    enterState(e, ...t) {
      if (((l = !0), s && !s.includes(e)))
        throw new Error(`State not found: ${e}`);
      let n = this.state;
      if (r) {
        if (!r?.[n]) return;
        let t = "string" == typeof r[n] ? [r[n]] : r[n];
        if (!t.includes(e))
          throw new Error(
            `Cannot transition state from "${n}" to "${e}". Available transitions: ${t
              .map((e) => `"${e}"`)
              .join(", ")}`
          );
      }
      o("end", n, ...t),
        (this.state = e),
        o("enter", e, ...t),
        o("enter", `${n} -> ${e}`, ...t);
    },
    onStateTransition: (e, t, s) => a("enter", `${e} -> ${t}`, s),
    onStateEnter: (e, t) => a("enter", e, t),
    onStateUpdate: (e, t) => a("update", e, t),
    onStateDraw: (e, t) => a("draw", e, t),
    onStateEnd: (e, t) => a("end", e, t),
    update() {
      l || (o("enter", e), (l = !0)), o("update", this.state);
    },
    draw() {
      o("draw", this.state);
    },
    inspect() {
      return `state: ${this.state}`;
    },
  };
}
function Aa(e) {
  return { id: "stay", stay: !0, scenesToStay: e };
}
function xa(e = !0, s) {
  let r, n;
  return {
    id: "textInput",
    hasFocus: e,
    require: ["text"],
    typedText: "",
    add() {
      let e = t(() => {
        this.text = this.typedText.replace(/([\[\\])/g, "\\$1");
      }, "flip");
      (r = Va.k.onCharInput((t) => {
        this.hasFocus &&
          (!s || this.typedText.length < s) &&
          (Va.k.isKeyDown("shift")
            ? (this.typedText += t.toUpperCase())
            : (this.typedText += t),
          e());
      })),
        (n = Va.k.onKeyPressRepeat("backspace", () => {
          this.hasFocus && (this.typedText = this.typedText.slice(0, -1)), e();
        }));
    },
    destroy() {
      r.cancel(), n.cancel();
    },
  };
}
function va(e = 1e3) {
  return {
    id: "timer",
    maxLoopsPerFrame: e,
    loop(e, t, s = -1, r = !1) {
      let n = r ? 0 : e,
        i = new dt(),
        a = this.onUpdate(() => {
          n += Va.app.state.dt;
          for (let r = 0; n >= e && r < this.maxLoopsPerFrame; r++) {
            if (-1 != s && --s < 0) return a.cancel(), void i.trigger();
            t(), (n -= e);
          }
        });
      return {
        get paused() {
          return a.paused;
        },
        set paused(e) {
          a.paused = e;
        },
        cancel: a.cancel,
        onEnd: i.add,
        then(e) {
          return i.add(e), this;
        },
      };
    },
    wait(e, t) {
      return this.loop(e, t ?? (() => {}), 1, !0);
    },
    tween(e, t, s, r, n = Ss.linear) {
      let i = 0,
        a = [],
        o = this.onUpdate(() => {
          i += Va.app.state.dt;
          let l = Math.min(i / s, 1);
          r(h(e, t, n(l))),
            1 === l && (o.cancel(), r(t), a.forEach((e) => e()));
        });
      return {
        get paused() {
          return o.paused;
        },
        set paused(e) {
          o.paused = e;
        },
        onEnd(e) {
          a.push(e);
        },
        then(e) {
          return this.onEnd(e), this;
        },
        cancel() {
          o.cancel();
        },
        finish() {
          o.cancel(), r(t), a.forEach((e) => e());
        },
      };
    },
  };
}
t(ca, "animate"),
  t(fa, "serializeAnimation"),
  t(pa, "boom"),
  t(ga, "health"),
  t(ma, "lifespan"),
  t(wa, "named"),
  t(ya, "state"),
  t(Aa, "stay"),
  t(xa, "textInput"),
  t(va, "timer");
var ba = 0;
function Ea() {
  return ba > 0;
}
function Ma(e = {}) {
  let t = {},
    s = new Set(),
    r = [];
  return {
    id: "area",
    collisionIgnore: e.collisionIgnore ?? [],
    add() {
      ba++,
        this.area.cursor &&
          r.push(this.onHover(() => Va.app.setCursor(this.area.cursor))),
        r.push(
          this.onCollideUpdate((e, r) => {
            if (!e.id)
              throw new Error("area() requires the object to have an id");
            t[e.id] || this.trigger("collide", e, r),
              r && ((t[e.id] = r), s.add(e.id));
          })
        );
    },
    destroy() {
      ba--;
      for (let e of r) e.cancel();
    },
    fixedUpdate() {
      for (let e in t)
        s.has(Number(e)) ||
          (this.trigger("collideEnd", t[e].target), delete t[e]);
      s.clear();
    },
    drawInspect() {
      let e = this.localArea();
      Us(), Os(this.area.offset);
      let t = {
        outline: { width: 4 / Ys(), color: n(0, 0, 255) },
        anchor: this.anchor,
        fill: !1,
        fixed: Sn(this),
      };
      e instanceof ce
        ? hn({
            ...t,
            pos: e.pos,
            width: e.width * this.area.scale.x,
            height: e.height * this.area.scale.y,
          })
        : e instanceof me
        ? Gr({ ...t, pts: e.pts, scale: this.area.scale })
        : e instanceof fe && Vr({ ...t, pos: e.center, radius: e.radius }),
        Gs();
    },
    area: {
      shape: e.shape ?? null,
      scale: e.scale ? f(e.scale) : f(1),
      offset: e.offset ?? f(0),
      cursor: e.cursor ?? null,
    },
    isClicked() {
      return Va.app.isMousePressed() && this.isHovering();
    },
    isHovering() {
      let e = Sn(this) ? Va.k.mousePos() : Va.k.toWorld(Va.k.mousePos());
      return this.hasPoint(e);
    },
    checkCollision(e) {
      if (!e.id)
        throw new Error("checkCollision() requires the object to have an id");
      return t[e.id] ?? null;
    },
    getCollisions: () => Object.values(t),
    isColliding(e) {
      if (!e.id)
        throw new Error("isColliding() requires the object to have an id");
      return !!t[e.id];
    },
    isOverlapping(e) {
      if (!e.id)
        throw new Error("isOverlapping() requires the object to have an id");
      let s = t[e.id];
      return s && s.hasOverlap();
    },
    onClick(e, t = "left") {
      let s = Va.app.onMousePress(t, () => {
        this.isHovering() && e();
      });
      return r.push(s), s;
    },
    onHover(e) {
      let t = !1;
      return this.onUpdate(() => {
        t ? (t = this.isHovering()) : this.isHovering() && ((t = !0), e());
      });
    },
    onHoverUpdate(e) {
      return this.onUpdate(() => {
        this.isHovering() && e();
      });
    },
    onHoverEnd(e) {
      let t = !1;
      return this.onUpdate(() => {
        t ? this.isHovering() || ((t = !1), e()) : (t = this.isHovering());
      });
    },
    onCollide(e, t) {
      if ("function" == typeof e && void 0 === t) return this.on("collide", e);
      if ("string" == typeof e)
        return this.onCollide((s, r) => {
          s.is(e) && t?.(s, r);
        });
      throw new Error("onCollide() requires either a function or a tag");
    },
    onCollideUpdate(e, t) {
      if ("function" == typeof e && void 0 === t)
        return this.on("collideUpdate", e);
      if ("string" == typeof e)
        return this.on("collideUpdate", (s, r) => s.is(e) && t?.(s, r));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    },
    onCollideEnd(e, t) {
      if ("function" == typeof e && void 0 === t)
        return this.on("collideEnd", e);
      if ("string" == typeof e)
        return this.on("collideEnd", (s) => s.is(e) && t?.(s));
      throw new Error("onCollideEnd() requires either a function or a tag");
    },
    hasPoint(e) {
      return K(this.worldArea(), e);
    },
    resolveCollision(e) {
      let t = this.checkCollision(e);
      t &&
        !t.resolved &&
        ((this.pos = this.pos.add(t.displacement)), (t.resolved = !0));
    },
    localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    },
    worldArea() {
      let e = this.localArea();
      if (!(e instanceof me || e instanceof ce))
        throw new Error("Only support polygon and rect shapes for now");
      let t = this.transform
        .clone()
        .translate(this.area.offset)
        .scale(f(this.area.scale ?? 1));
      if (e instanceof ce) {
        let s = ws(this.anchor || Ze)
          .add(1, 1)
          .scale(-0.5)
          .scale(e.width, e.height);
        t.translate(s);
      }
      return e.transform(t);
    },
    screenArea() {
      let e = this.worldArea();
      return Sn(this) ? e : e.transform(Va.game.cam.transform);
    },
    inspect() {
      return this.area.scale?.x == this.area.scale?.y
        ? `area: ${this.area.scale?.x?.toFixed(1)}x`
        : `area: (${this.area.scale?.x?.toFixed(
            1
          )}x, ${this.area.scale.y?.toFixed(1)}y)`;
    },
  };
}
function Sa(e = {}) {
  let t,
    s = null,
    r = null,
    n = !1,
    i = f(0),
    a = null,
    o = null;
  return {
    id: "body",
    require: ["pos"],
    vel: f(0),
    drag: e.drag ?? 0,
    jumpForce: e.jumpForce ?? 640,
    gravityScale: e.gravityScale ?? 1,
    isStatic: e.isStatic ?? !1,
    mass: e.mass ?? 1,
    add() {
      if (
        ((a = this.pos.clone()),
        (o = this.pos.clone()),
        (t = this.pos.clone()),
        0 === this.mass)
      )
        throw new Error("Can't set body mass to 0");
      this.has("area") &&
        (this.onCollideUpdate((e, t) => {
          if (!t || !e.has("body") || t.resolved) return;
          this.trigger("beforePhysicsResolve", t);
          let s = t.reverse();
          if (
            (e.trigger("beforePhysicsResolve", s),
            !(t.resolved || s.resolved || (this.isStatic && e.isStatic)))
          ) {
            if (this.isStatic || e.isStatic) {
              let s = !this.isStatic && e.isStatic ? t : t.reverse();
              (s.source.pos = s.source.pos.add(s.displacement)),
                (s.source.transform = Is(s.source));
            } else {
              let s = this.mass + e.mass;
              (this.pos = this.pos.add(t.displacement.scale(e.mass / s))),
                (e.pos = e.pos.add(t.displacement.scale(-this.mass / s))),
                (this.transform = Is(this)),
                (e.transform = Is(e));
            }
            (t.resolved = !0),
              this.trigger("physicsResolve", t),
              e.trigger("physicsResolve", t.reverse());
          }
        }),
        this.onPhysicsResolve((e) => {
          if (Va.game.gravity)
            if (e.isBottom() && this.isFalling()) {
              this.vel = this.vel.reject(Va.game.gravity.unit());
              let t = s;
              (s = e.target),
                t != s && (r = e.target.pos),
                n
                  ? (n = !1)
                  : t ||
                    (this.trigger("ground", s), e.target.trigger("land", this));
            } else
              e.isTop() &&
                this.isJumping() &&
                ((this.vel = this.vel.reject(Va.game.gravity.unit())),
                this.trigger("headbutt", e.target),
                e.target.trigger("headbutted", this));
        }));
    },
    update() {
      s &&
        this.isColliding(s) &&
        s.exists() &&
        s.has("body") &&
        (r &&
          !s.pos.eq(r) &&
          !1 !== e.stickToPlatform &&
          this.moveBy(s.pos.sub(r)),
        (r = s.pos));
      let n = os();
      n &&
        (this.pos.x == t.x &&
          ((this.pos.x = h(a.x, o.x, n / as())), (t.x = this.pos.x)),
        this.pos.y == t.y &&
          ((this.pos.y = h(a.y, o.y, n / as())), (t.y = this.pos.y)));
    },
    fixedUpdate() {
      if (
        (a &&
          (this.pos.x == t.x && (this.pos.x = a.x),
          this.pos.y == t.y && (this.pos.y = a.y),
          (a = null)),
        Va.game.gravity && !this.isStatic)
      ) {
        n && ((s = null), (r = null), this.trigger("fallOff"), (n = !1)),
          s &&
            (!this.isColliding(s) || !s.exists() || !s.has("body")) &&
            (n = !0);
        let t = this.vel.clone();
        this.vel = this.vel.add(
          Va.game.gravity.scale(this.gravityScale * is())
        );
        let i = e.maxVelocity ?? 65536;
        this.vel.slen() > i * i && (this.vel = this.vel.unit().scale(i)),
          t.dot(Va.game.gravity) < 0 &&
            this.vel.dot(Va.game.gravity) >= 0 &&
            this.trigger("fall");
      }
      if (
        ((this.vel.x += i.x * is()),
        (this.vel.y += i.y * is()),
        (this.vel.x *= 1 - this.drag * is()),
        (this.vel.y *= 1 - this.drag * is()),
        this.move(this.vel),
        os())
      ) {
        a = this.pos.clone();
        let e = this.vel.add(i.scale(is()));
        (o = this.pos.add(e.scale(is()))), (t = this.pos.clone());
      }
      (i.x = 0), (i.y = 0);
    },
    onPhysicsResolve(e) {
      return this.on("physicsResolve", e);
    },
    onBeforePhysicsResolve(e) {
      return this.on("beforePhysicsResolve", e);
    },
    curPlatform: () => s,
    isGrounded: () => null !== s,
    isFalling() {
      return this.vel.dot(ki()) > 0;
    },
    isJumping() {
      return this.vel.dot(ki()) < 0;
    },
    applyImpulse(e) {
      this.isStatic || (this.vel = this.vel.add(e));
    },
    addForce(e) {
      this.isStatic || ((i.x += e.x / this.mass), (i.y += e.y / this.mass));
    },
    jump(e) {
      this.isStatic ||
        ((s = null),
        (r = null),
        (this.vel = ki().scale(-e || -this.jumpForce)));
    },
    onGround(e) {
      return this.on("ground", e);
    },
    onFall(e) {
      return this.on("fall", e);
    },
    onFallOff(e) {
      return this.on("fallOff", e);
    },
    onHeadbutt(e) {
      return this.on("headbutt", e);
    },
    onLand(e) {
      return this.on("land", e);
    },
    onHeadbutted(e) {
      return this.on("headbutted", e);
    },
    inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    },
  };
}
function qa(e = 2) {
  let t = e;
  return {
    id: "doubleJump",
    require: ["body"],
    numJumps: e,
    add() {
      this.onGround(() => {
        t = this.numJumps;
      });
    },
    doubleJump(e) {
      t <= 0 ||
        (t < this.numJumps && this.trigger("doubleJump"), t--, this.jump(e));
    },
    onDoubleJump(e) {
      return this.on("doubleJump", e);
    },
    inspect: () => `jumpsLeft: ${t}`,
  };
}
function Ba(e) {
  return {
    id: "surfaceEffector",
    require: ["area"],
    speed: e.speed,
    speedVariation: e.speedVariation ?? 0,
    forceScale: e.speedVariation ?? 0.9,
    add() {
      this.onCollideUpdate("body", (e, t) => {
        let s = t?.normal.normal(),
          r = e.vel.project(s),
          n = s?.scale(this.speed)?.sub(r);
        e.addForce(n?.scale(e.mass * this.forceScale));
      });
    },
  };
}
function Ra(e) {
  return {
    id: "areaEffector",
    require: ["area"],
    useGlobalAngle: e.useGlobalAngle || !1,
    forceAngle: e.forceAngle,
    forceMagnitude: e.forceMagnitude,
    forceVariation: e.forceVariation ?? 0,
    linearDrag: e.linearDrag ?? 0,
    add() {
      this.onCollideUpdate("body", (e, t) => {
        if (!e.has("body")) return;
        let s = c.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(s),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    },
  };
}
function Ca(e) {
  return {
    id: "pointEffector",
    require: ["area", "pos"],
    forceMagnitude: e.forceMagnitude,
    forceVariation: e.forceVariation ?? 0,
    distanceScale: e.distanceScale ?? 1,
    forceMode: e.forceMode || "inverseLinear",
    linearDrag: e.linearDrag ?? 0,
    add() {
      this.onCollideUpdate("body", (e, t) => {
        let s = this.pos.sub(e.pos),
          r = s.len(),
          n = (r * this.distanceScale) / 10,
          i =
            "constant" === this.forceMode
              ? 1
              : "inverseLinear" === this.forceMode
              ? 1 / n
              : 1 / n ** 2,
          a = s.scale((this.forceMagnitude * i) / r);
        e.addForce(a),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    },
  };
}
function Pa(e) {
  return {
    id: "constantForce",
    require: ["body"],
    force: e.force,
    update() {
      this.force && this.addForce(this.force);
    },
  };
}
function Ia(e) {
  return {
    id: "platformEffector",
    require: ["area", "body"],
    surfaceArc: e.surfaceArc ?? 180,
    useOneWay: e.useOneWay ?? !1,
    add() {
      this.onBeforePhysicsResolve((e) => {
        let t = e.target.vel,
          s = ki().scale(-1).angleBetween(t);
        Math.abs(s) > this.surfaceArc / 2 && e.preventResolution();
      });
    },
  };
}
function ka(e) {
  return {
    id: "buoyancyEffector",
    require: ["area"],
    surfaceLevel: e.surfaceLevel,
    density: e.density ?? 1,
    linearDrag: e.linearDrag ?? 1,
    angularDrag: e.angularDrag ?? 0.2,
    flowAngle: e.flowAngle ?? 0,
    flowMagnitude: e.flowMagnitude ?? 0,
    flowVariation: e.flowVariation ?? 0,
    add() {
      this.onCollideUpdate("body", (e, t) => {
        let s = e,
          r = s.worldArea(),
          [n, i] = r.cut(f(-100, this.surfaceLevel), f(100, this.surfaceLevel));
        n && (this.applyBuoyancy(s, n), this.applyDrag(s, n)),
          this.flowMagnitude &&
            s.addForce(c.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    },
    applyBuoyancy(e, t) {
      let s = this.density * t.area(),
        r = f(0, 1).scale(-s);
      e.addForce(r);
    },
    applyDrag(e, t) {
      let s = e.vel,
        r = this.density * this.linearDrag,
        n = s.scale(-r);
      e.addForce(n);
    },
  };
}
function Fa(e) {
  if (!e) throw new Error("Please define an anchor");
  return {
    id: "anchor",
    anchor: e,
    inspect() {
      return "string" == typeof this.anchor
        ? "anchor: " + this.anchor
        : "anchor: " + this.anchor.toString();
    },
  };
}
function Ta() {
  return { id: "fixed", fixed: !0 };
}
function Da(e, t) {
  return {
    id: "follow",
    require: ["pos"],
    follow: { obj: e, offset: t ?? f(0) },
    add() {
      e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
    update() {
      e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
  };
}
function Oa(e) {
  let t = Va.game.layers?.indexOf(e);
  return {
    id: "layer",
    get layerIndex() {
      return t ?? null;
    },
    get layer() {
      return t ? Va.game.layers?.[t] ?? null : null;
    },
    set layer(e) {
      if (((t = Va.game.layers?.indexOf(e)), -1 == t))
        throw Error("Invalid layer name");
    },
    inspect() {
      return `layer: ${this.layer}`;
    },
  };
}
function Ua(e, t) {
  let s = "number" == typeof e ? c.fromAngle(e) : e.unit();
  return {
    id: "move",
    require: ["pos"],
    update() {
      this.move(s.scale(t));
    },
  };
}
function La(e = {}) {
  let t = e.distance ?? 200,
    s = !1;
  return {
    id: "offscreen",
    require: ["pos"],
    isOffScreen() {
      let e = this.screenPos();
      if (!e) return !1;
      let s = new ce(f(0), Vs(), Ks());
      return !T(s, e) && s.sdistToPoint(e) > t * t;
    },
    onExitScreen(e) {
      return this.on("exitView", e);
    },
    onEnterScreen(e) {
      return this.on("enterView", e);
    },
    update() {
      this.isOffScreen()
        ? (s || (this.trigger("exitView"), (s = !0)),
          e.hide && (this.hidden = !0),
          e.pause && (this.paused = !0),
          e.destroy && this.destroy())
        : (s && (this.trigger("enterView"), (s = !1)),
          e.hide && (this.hidden = !1),
          e.pause && (this.paused = !1));
    },
  };
}
function Na(...e) {
  return {
    id: "pos",
    pos: f(...e),
    moveBy(...e) {
      this.pos = this.pos.add(f(...e));
    },
    move(...e) {
      this.moveBy(f(...e).scale(is()));
    },
    moveTo(...e) {
      if ("number" == typeof e[0] && "number" == typeof e[1])
        return this.moveTo(f(e[0], e[1]), e[2]);
      let t = e[0],
        s = e[1];
      if (void 0 === s) return void (this.pos = f(t));
      let r = t.sub(this.pos);
      r.len() <= s * is() ? (this.pos = f(t)) : this.move(r.unit().scale(s));
    },
    worldPos(e = null) {
      return e
        ? ((this.pos = this.pos.add(this.fromWorld(e))), null)
        : this.parent
        ? this.parent.transform.multVec2(this.pos)
        : this.pos;
    },
    toWorld(e) {
      return this.parent
        ? this.parent.transform.multVec2(this.pos.add(e))
        : this.pos.add(e);
    },
    fromWorld(e) {
      return this.parent
        ? this.parent.transform.invert().multVec2(e).sub(this.pos)
        : e.sub(this.pos);
    },
    screenPos(e = null) {
      if (e) return (this.pos = this.pos.add(this.fromScreen(e))), null;
      {
        let e = this.worldPos();
        return e ? (Sn(this) ? e : vi(e)) : null;
      }
    },
    toScreen(e) {
      let t = this.toWorld(e);
      return Sn(this) ? t : vi(t);
    },
    fromScreen(e) {
      return Sn(this) ? this.fromWorld(e) : this.fromWorld(bi(e));
    },
    toOther(e, t) {
      return e.fromWorld(this.toWorld(t));
    },
    fromOther(e, t) {
      return e.toOther(this, t);
    },
    inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    },
    drawInspect() {
      Vr({ color: n(255, 0, 0), radius: 4 / Ys() });
    },
  };
}
function Ha(e) {
  return {
    id: "rotate",
    angle: e ?? 0,
    rotateBy(e) {
      this.angle += e;
    },
    rotateTo(e) {
      this.angle = e;
    },
    inspect() {
      return `angle: ${Math.round(this.angle)}`;
    },
  };
}
function Ga(...e) {
  if (0 === e.length) return Ga(1);
  let t = f(...e);
  return {
    id: "scale",
    set scale(e) {
      if (!(e instanceof c))
        throw Error(
          "The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number."
        );
      t = f(e);
    },
    get scale() {
      return t;
    },
    scaleTo(...e) {
      t = f(...e);
    },
    scaleBy(...e) {
      t = t.scale(f(...e));
    },
    inspect: () =>
      t.x == t.y
        ? `scale: ${t.x.toFixed(1)}x`
        : `scale: (${t.x.toFixed(1)}x, ${t.y.toFixed(1)}y)`,
  };
}
function ja(e) {
  return {
    id: "z",
    z: e,
    inspect() {
      return `z: ${this.z}`;
    },
  };
}
t(Ea, "usesArea"),
  t(Ma, "area"),
  t(Sa, "body"),
  t(qa, "doubleJump"),
  t(Ba, "surfaceEffector"),
  t(Ra, "areaEffector"),
  t(Ca, "pointEffector"),
  t(Pa, "constantForce"),
  t(Ia, "platformEffector"),
  t(ka, "buoyancyEffector"),
  t(Fa, "anchor"),
  t(Ta, "fixed"),
  t(Da, "follow"),
  t(Oa, "layer"),
  t(Ua, "move"),
  t(La, "offscreen"),
  t(Na, "pos"),
  t(Ha, "rotate"),
  t(Ga, "scale"),
  t(ja, "z");
var Va = {
    k: null,
    globalOpt: null,
    gfx: null,
    game: null,
    app: null,
    assets: null,
    fontCacheCanvas: null,
    fontCacheC2d: null,
    debug: null,
    audio: null,
    pixelDensity: null,
    canvas: null,
    gscale: null,
    kaSprite: null,
    boomSprite: null,
  },
  Ka = t((e = { tagsAsComponents: !0 }) => {
    Va.k &&
      (console.warn(
        "KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!"
      ),
      Va.k.quit()),
      (Va.globalOpt = e);
    let s = e.root ?? document.body;
    s === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%"));
    let m = e.canvas ?? s.appendChild(document.createElement("canvas"));
    Va.canvas = m;
    let w = e.scale ?? 1;
    Va.gscale = w;
    let x = e.width && e.height && !e.stretch && !e.letterbox;
    x
      ? ((m.width = e.width * w), (m.height = e.height * w))
      : ((m.width = m.parentElement.offsetWidth),
        (m.height = m.parentElement.offsetHeight));
    let b = ["outline: none", "cursor: default"];
    if (x) {
      let e = m.width,
        t = m.height;
      b.push(`width: ${e}px`), b.push(`height: ${t}px`);
    } else b.push("width: 100%"), b.push("height: 100%");
    e.crisp &&
      (b.push("image-rendering: pixelated"),
      b.push("image-rendering: crisp-edges")),
      (m.style.cssText = b.join(";"));
    let I = e.pixelDensity || 1;
    (Va.pixelDensity = I), (m.width *= I), (m.height *= I), (m.tabIndex = 0);
    let D = document.createElement("canvas");
    (D.width = 256), (D.height = 256), (Va.fontCacheCanvas = D);
    let O = D.getContext("2d", { willReadFrequently: !0 });
    Va.fontCacheC2d = O;
    let N = ns({
      canvas: m,
      touchToMouse: e.touchToMouse,
      gamepads: e.gamepads,
      pixelDensity: e.pixelDensity,
      maxFPS: e.maxFPS,
      buttons: e.buttons,
    });
    Va.app = N;
    let H = [],
      G = N.canvas.getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      });
    if (!G) throw new Error("WebGL not supported");
    let V = G,
      K = tn(V, { texFilter: e.texFilter }),
      Y = En(e, K);
    Va.gfx = Y;
    let Q = Ti();
    Va.audio = Q;
    let z = dr(K, e.spriteAtlasPadding ?? 0);
    Va.assets = z;
    let X = Ri();
    function W(e, s) {
      let r = new _r(K, e, s);
      return {
        clear: t(() => r.clear(), "clear"),
        free: t(() => r.free(), "free"),
        toDataURL: t(() => r.toDataURL(), "toDataURL"),
        toImageData: t(() => r.toImageData(), "toImageData"),
        width: r.width,
        height: r.height,
        draw: t((e) => {
          js(), r.bind(), e(), js(), r.unbind();
        }, "draw"),
        get fb() {
          return r;
        },
      };
    }
    function J() {
      V.clear(V.COLOR_BUFFER_BIT),
        Y.frameBuffer.bind(),
        V.clear(V.COLOR_BUFFER_BIT),
        Y.bgColor ||
          un(() => {
            on({
              width: Vs(),
              height: Ks(),
              quad: new p(0, 0, Vs() / 64, Ks() / 64),
              tex: Y.bgTex,
              fixed: !0,
            });
          }),
        (Y.renderer.numDraws = 0),
        (Y.fixed = !1),
        (Y.transformStack.length = 0),
        (Y.transform = new y());
    }
    function Z(e, t) {
      (Y.postShader = e), (Y.postShaderUniform = t ?? null);
    }
    function _() {
      js(),
        (Y.lastDrawCalls = Y.renderer.numDraws),
        Y.frameBuffer.unbind(),
        V.viewport(0, 0, V.drawingBufferWidth, V.drawingBufferHeight);
      let e = Y.width,
        t = Y.height;
      (Y.width = V.drawingBufferWidth / I),
        (Y.height = V.drawingBufferHeight / I),
        An({
          flipY: !0,
          tex: Y.frameBuffer.tex,
          pos: new c(Y.viewport.x, Y.viewport.y),
          width: Y.viewport.width,
          height: Y.viewport.height,
          shader: Y.postShader,
          uniform:
            "function" == typeof Y.postShaderUniform
              ? Y.postShaderUniform()
              : Y.postShaderUniform,
          fixed: !0,
        }),
        js(),
        (Y.width = e),
        (Y.height = t);
    }
    (Va.game = X),
      X.root.use(va()),
      t(W, "makeCanvas"),
      t(J, "frameStart"),
      t(Z, "usePostEffect"),
      t(_, "frameEnd");
    let $ = !1,
      ee = {
        inspect: !1,
        timeScale: 1,
        showLog: !0,
        fps: t(() => N.fps(), "fps"),
        numFrames: t(() => N.numFrames(), "numFrames"),
        stepFrame: je,
        drawCalls: t(() => Y.lastDrawCalls, "drawCalls"),
        clearLog: t(() => (X.logs = []), "clearLog"),
        log: t((...t) => {
          let s = e.logMax ?? 8,
            r = t.length > 1 ? t.concat(" ").join(" ") : t[0];
          X.logs.unshift({ msg: r, time: N.time() }),
            X.logs.length > s && (X.logs = X.logs.slice(0, s));
        }, "log"),
        error: t(
          (e) => ee.log(new Error(e.toString ? e.toString() : e)),
          "error"
        ),
        curRecording: null,
        numObjects: t(() => he("*", { recursive: !0 }).length, "numObjects"),
        get paused() {
          return $;
        },
        set paused(e) {
          ($ = e), e ? Q.ctx.suspend() : Q.ctx.resume();
        },
      };
    function te(e, t) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch {
        return t ? (se(e, t), t) : null;
      }
    }
    function se(e, t) {
      window.localStorage[e] = JSON.stringify(t);
    }
    function re(t, ...s) {
      let r,
        n = t($e);
      r = "function" == typeof n ? n(...s)($e) : n;
      for (let t in r) ($e[t] = r[t]), !1 !== e.global && (window[t] = r[t]);
      return $e;
    }
    function ne(e) {
      let t = N.canvas.captureStream(e),
        s = Q.ctx.createMediaStreamDestination();
      Q.masterNode.connect(s);
      let r = new MediaRecorder(t),
        n = [];
      return (
        (r.ondataavailable = (e) => {
          e.data.size > 0 && n.push(e.data);
        }),
        (r.onerror = () => {
          Q.masterNode.disconnect(s), t.getTracks().forEach((e) => e.stop());
        }),
        r.start(),
        {
          resume() {
            r.resume();
          },
          pause() {
            r.pause();
          },
          stop: () => (
            r.stop(),
            Q.masterNode.disconnect(s),
            t.getTracks().forEach((e) => e.stop()),
            new Promise((e) => {
              r.onstop = () => {
                e(new Blob(n, { type: "video/mp4" }));
              };
            })
          ),
          download(e = "kaboom.mp4") {
            this.stop().then((t) => bt(e, t));
          },
        }
      );
    }
    function ie() {
      return document.activeElement === N.canvas;
    }
    (Va.debug = ee),
      t(te, "getData"),
      t(se, "setData"),
      t(re, "plug"),
      t(ne, "record"),
      t(ie, "isFocused");
    let ae = X.root.add.bind(X.root),
      oe = X.root.readd.bind(X.root),
      le = X.root.removeAll.bind(X.root),
      he = X.root.get.bind(X.root),
      ge = X.root.wait.bind(X.root),
      ke = X.root.loop.bind(X.root),
      Fe = X.root.query.bind(X.root),
      Te = X.root.tween.bind(X.root),
      De = gr(
        null,
        "data:image/png;base64,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"
      ),
      Oe = gr(
        null,
        "data:image/png;base64,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"
      );
    function Ue() {
      X.root.fixedUpdate();
    }
    function je() {
      X.root.update();
    }
    (Va.kaSprite = De),
      (Va.boomSprite = Oe),
      t(Ue, "fixedUpdateFrame"),
      t(je, "updateFrame");
    class Ve {
      static {
        t(this, "Collision");
      }
      source;
      target;
      normal;
      distance;
      resolved = !1;
      constructor(e, t, s, r, n = !1) {
        (this.source = e),
          (this.target = t),
          (this.normal = s),
          (this.distance = r),
          (this.resolved = n);
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new Ve(
          this.target,
          this.source,
          this.normal.scale(-1),
          this.distance,
          this.resolved
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(X.gravity || f(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(X.gravity || f(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(X.gravity || f(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(X.gravity || f(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    }
    function Ke() {
      if (!Ea()) return;
      let s = {},
        r = e.hashGridSize || 64,
        n = new y(),
        i = [];
      function a(e) {
        if (
          (i.push(n.clone()),
          e.pos && n.translate(e.pos),
          e.scale && n.scale(e.scale),
          e.angle && n.rotate(e.angle),
          (e.transform = n.clone()),
          e.c("area") && !e.paused)
        ) {
          let t = e,
            n = t.worldArea().bbox(),
            i = Math.floor(n.pos.x / r),
            a = Math.floor(n.pos.y / r),
            o = Math.ceil((n.pos.x + n.width) / r),
            l = Math.ceil((n.pos.y + n.height) / r),
            h = new Set();
          for (let e = i; e <= o; e++)
            for (let r = a; r <= l; r++)
              if (s[e])
                if (s[e][r]) {
                  let n = s[e][r];
                  e: for (let e of n) {
                    if (e.paused || !e.exists() || h.has(e.id)) continue;
                    for (let s of t.collisionIgnore) if (e.is(s)) continue e;
                    for (let s of e.collisionIgnore) if (t.is(s)) continue e;
                    let s = Ge(t.worldArea(), e.worldArea());
                    if (s) {
                      let r = new Ve(t, e, s.normal, s.distance);
                      t.trigger("collideUpdate", e, r);
                      let n = r.reverse();
                      (n.resolved = r.resolved),
                        e.trigger("collideUpdate", t, n);
                    }
                    h.add(e.id);
                  }
                  n.push(t);
                } else s[e][r] = [t];
              else (s[e] = {}), (s[e][r] = [t]);
        }
        e.children.forEach(a), (n = i.pop());
      }
      t(a, "checkObj"), a(X.root);
    }
    function Ye(e) {
      console.error(e), Q.ctx.suspend();
      let t =
        e.message ?? String(e) ?? "Unknown error, check console for more info";
      N.run(
        () => {},
        () => {
          J(),
            un(() => {
              let s = Vs(),
                r = Ks(),
                i = {
                  size: 36,
                  width: s - 64,
                  letterSpacing: 4,
                  lineSpacing: 4,
                  font: _e,
                  fixed: !0,
                };
              hn({ width: s, height: r, color: n(0, 0, 255), fixed: !0 });
              let a = an({
                ...i,
                text: "Error",
                pos: f(32),
                color: n(255, 128, 0),
                fixed: !0,
              });
              ln(a),
                bn({
                  ...i,
                  text: t,
                  pos: f(32, 32 + a.height + 16),
                  fixed: !0,
                }),
                Gs(),
                X.events.trigger("error", e);
            }),
            _();
        }
      );
    }
    function Qe(e) {
      H.push(e);
    }
    function ze() {
      X.events.onOnce("frameEnd", () => {
        N.quit(),
          V.clear(
            V.COLOR_BUFFER_BIT | V.DEPTH_BUFFER_BIT | V.STENCIL_BUFFER_BIT
          );
        let e = V.getParameter(V.MAX_TEXTURE_IMAGE_UNITS);
        for (let t = 0; t < e; t++)
          V.activeTexture(V.TEXTURE0 + t),
            V.bindTexture(V.TEXTURE_2D, null),
            V.bindTexture(V.TEXTURE_CUBE_MAP, null);
        V.bindBuffer(V.ARRAY_BUFFER, null),
          V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, null),
          V.bindRenderbuffer(V.RENDERBUFFER, null),
          V.bindFramebuffer(V.FRAMEBUFFER, null),
          K.destroy(),
          H.forEach((e) => e());
      });
    }
    t(Ke, "checkFrame"), t(Ye, "handleErr"), t(Qe, "onCleanup"), t(ze, "quit");
    let Ze = !0;
    N.run(
      () => {
        try {
          z.loaded && (ee.paused || Ue(), Ke());
        } catch (e) {
          Ye(e);
        }
      },
      (t, s) => {
        try {
          t(),
            z.loaded ||
              (1 === or() &&
                !Ze &&
                ((z.loaded = !0),
                lr().forEach((e) => X.events.trigger("loadError", ...e)),
                X.events.trigger("load"))),
            (!z.loaded && !1 !== e.loadingScreen) || Ze
              ? (J(), mn(), _())
              : (ee.paused || je(),
                Ke(),
                J(),
                gn(),
                !1 !== e.debug && fn(),
                _()),
            Ze && (Ze = !1),
            X.events.trigger("frameEnd"),
            s();
        } catch (e) {
          Ye(e);
        }
      }
    ),
      Mn(),
      Gi();
    let $e = {
      _k: Va,
      VERSION: "3001.0.0",
      loadRoot: nr,
      loadProgress: or,
      loadSprite: gr,
      loadSpriteAtlas: Nr,
      loadSound: Ur,
      loadMusic: Lr,
      loadBitmapFont: qr,
      loadFont: Er,
      loadShader: kr,
      loadShaderURL: Fr,
      loadAseprite: Ar,
      loadPedit: Br,
      loadBean: yr,
      loadJSON: ir,
      load: ur,
      getSound: Or,
      getFont: br,
      getBitmapFont: Sr,
      getSprite: pr,
      getShader: Ir,
      getAsset: hr,
      Asset: _s,
      SpriteData: cr,
      SoundData: Tr,
      width: Vs,
      height: Ks,
      center: Ws,
      dt: is,
      fixedDt: as,
      restDt: os,
      time: N.time,
      screenshot: N.screenshot,
      record: ne,
      isFocused: ie,
      setCursor: N.setCursor,
      getCursor: N.getCursor,
      setCursorLocked: N.setCursorLocked,
      isCursorLocked: N.isCursorLocked,
      setFullscreen: N.setFullscreen,
      isFullscreen: N.isFullscreen,
      isTouchscreen: N.isTouchscreen,
      onLoad: hi,
      onLoadError: ui,
      onLoading: ai,
      onResize: oi,
      onGamepadConnect: N.onGamepadConnect,
      onGamepadDisconnect: N.onGamepadDisconnect,
      onError: li,
      onCleanup: Qe,
      flash: yi,
      setCamPos: di,
      getCamPos: ci,
      setCamRot: gi,
      getCamRot: mi,
      setCamScale: fi,
      getCamScale: pi,
      getCamTransform: wi,
      camPos: Ei,
      camScale: Mi,
      camFlash: qi,
      camRot: Si,
      camTransform: Ai,
      shake: xi,
      toScreen: vi,
      toWorld: bi,
      setGravity: Ci,
      getGravity: Pi,
      setGravityDirection: Ii,
      getGravityDirection: ki,
      setBackground: Ts,
      getBackground: Ds,
      getGamepads: N.getGamepads,
      getTreeRoot: Xi,
      add: ae,
      make: Bi,
      destroy: zi,
      destroyAll: le,
      get: he,
      query: Fe,
      readd: oe,
      pos: Na,
      scale: Ga,
      rotate: Ha,
      color: Rn,
      opacity: kn,
      anchor: Fa,
      area: Ma,
      sprite: $i,
      text: ea,
      polygon: On,
      rect: Ln,
      circle: Bn,
      uvquad: ta,
      outline: Fn,
      particles: Dn,
      body: Sa,
      platformEffector: Ia,
      surfaceEffector: Ba,
      areaEffector: Ra,
      pointEffector: Ca,
      buoyancyEffector: ka,
      constantForce: Pa,
      doubleJump: qa,
      shader: Nn,
      textInput: xa,
      timer: va,
      fixed: Ta,
      stay: Aa,
      health: ga,
      lifespan: ma,
      named: wa,
      state: ya,
      z: ja,
      layer: Oa,
      move: Ua,
      offscreen: La,
      follow: Da,
      fadeIn: Pn,
      mask: In,
      drawon: Cn,
      raycast: Un,
      tile: aa,
      animate: ca,
      serializeAnimation: fa,
      agent: sa,
      sentry: ia,
      patrol: na,
      pathfinder: ra,
      trigger: jn,
      on: Gn,
      onFixedUpdate: Vn,
      onUpdate: Kn,
      onDraw: Yn,
      onAdd: Qn,
      onDestroy: zn,
      onTag: Jn,
      onUntag: Zn,
      onUse: Xn,
      onUnuse: Wn,
      onClick: si,
      onCollide: _n,
      onCollideUpdate: $n,
      onCollideEnd: ei,
      onHover: ri,
      onHoverUpdate: ni,
      onHoverEnd: ii,
      onKeyDown: N.onKeyDown,
      onKeyPress: N.onKeyPress,
      onKeyPressRepeat: N.onKeyPressRepeat,
      onKeyRelease: N.onKeyRelease,
      onMouseDown: N.onMouseDown,
      onMousePress: N.onMousePress,
      onMouseRelease: N.onMouseRelease,
      onMouseMove: N.onMouseMove,
      onCharInput: N.onCharInput,
      onTouchStart: N.onTouchStart,
      onTouchMove: N.onTouchMove,
      onTouchEnd: N.onTouchEnd,
      onScroll: N.onScroll,
      onHide: N.onHide,
      onShow: N.onShow,
      onGamepadButtonDown: N.onGamepadButtonDown,
      onGamepadButtonPress: N.onGamepadButtonPress,
      onGamepadButtonRelease: N.onGamepadButtonRelease,
      onGamepadStick: N.onGamepadStick,
      onButtonPress: N.onButtonPress,
      onButtonDown: N.onButtonDown,
      onButtonRelease: N.onButtonRelease,
      mousePos: Xs,
      mouseDeltaPos: N.mouseDeltaPos,
      isKeyDown: N.isKeyDown,
      isKeyPressed: N.isKeyPressed,
      isKeyPressedRepeat: N.isKeyPressedRepeat,
      isKeyReleased: N.isKeyReleased,
      isMouseDown: N.isMouseDown,
      isMousePressed: N.isMousePressed,
      isMouseReleased: N.isMouseReleased,
      isMouseMoved: N.isMouseMoved,
      isGamepadButtonPressed: N.isGamepadButtonPressed,
      isGamepadButtonDown: N.isGamepadButtonDown,
      isGamepadButtonReleased: N.isGamepadButtonReleased,
      getGamepadStick: N.getGamepadStick,
      isButtonPressed: N.isButtonPressed,
      isButtonDown: N.isButtonDown,
      isButtonReleased: N.isButtonReleased,
      setButton: N.setButton,
      getButton: N.getButton,
      pressButton: N.pressButton,
      releaseButton: N.releaseButton,
      getLastInputDeviceType: N.getLastInputDeviceType,
      charInputted: N.charInputted,
      loop: ke,
      wait: ge,
      play: Oi,
      setVolume: Li,
      getVolume: Ni,
      volume: Hi,
      burp: Ui,
      audioCtx: Q.ctx,
      Line: de,
      Rect: ce,
      Circle: fe,
      Ellipse: pe,
      Point: ue,
      Polygon: me,
      Vec2: c,
      Color: r,
      Mat4: y,
      Quad: p,
      RNG: v,
      rand: M,
      randi: S,
      randSeed: E,
      vec2: f,
      rgb: n,
      hsl2rgb: i,
      quad: g,
      choose: C,
      chooseMultiple: R,
      shuffle: B,
      chance: q,
      lerp: h,
      tween: Te,
      easings: Ss,
      map: u,
      mapc: d,
      wave: A,
      deg2rad: a,
      rad2deg: o,
      clamp: l,
      evaluateQuadratic: we,
      evaluateQuadraticFirstDerivative: ye,
      evaluateQuadraticSecondDerivative: Ae,
      evaluateBezier: xe,
      evaluateBezierFirstDerivative: ve,
      evaluateBezierSecondDerivative: be,
      evaluateCatmullRom: Ee,
      evaluateCatmullRomFirstDerivative: Me,
      curveLengthApproximation: qe,
      normalizedCurve: Se,
      hermite: Be,
      cardinal: Re,
      catmullRom: Ce,
      bezier: Pe,
      kochanekBartels: Ie,
      easingSteps: He,
      easingLinear: Le,
      easingCubicBezier: Ne,
      testLineLine: k,
      testRectRect: P,
      testRectLine: F,
      testRectPoint: T,
      testCirclePolygon: j,
      testLinePoint: U,
      testLineCircle: L,
      isConvex: We,
      triangulate: Xe,
      NavMesh: Ps,
      drawSprite: xn,
      drawText: bn,
      formatText: an,
      drawRect: hn,
      drawLine: Kr,
      drawLines: Xr,
      drawTriangle: cn,
      drawCircle: Vr,
      drawEllipse: jr,
      drawUVQuad: on,
      drawPolygon: Gr,
      drawCurve: Wr,
      drawBezier: Jr,
      drawFormattedText: ln,
      drawMasked: yn,
      drawSubtracted: vn,
      pushTransform: Us,
      popTransform: Gs,
      pushTranslate: Os,
      pushScale: Ns,
      pushRotate: Hs,
      pushMatrix: Ls,
      usePostEffect: Z,
      makeCanvas: W,
      debug: ee,
      scene: Wi,
      getSceneName: _i,
      go: Ji,
      onSceneLeave: Zi,
      layers: Qi,
      getLayers: Ki,
      setLayers: Vi,
      getDefaultLayer: Yi,
      addLevel: Hn,
      getData: te,
      setData: se,
      download: At,
      downloadJSON: vt,
      downloadText: xt,
      downloadBlob: bt,
      plug: re,
      ASCII_CHARS: Je,
      canvas: N.canvas,
      addKaboom: ji,
      LEFT: c.LEFT,
      RIGHT: c.RIGHT,
      UP: c.UP,
      DOWN: c.DOWN,
      RED: r.RED,
      GREEN: r.GREEN,
      BLUE: r.BLUE,
      YELLOW: r.YELLOW,
      MAGENTA: r.MAGENTA,
      CYAN: r.CYAN,
      WHITE: r.WHITE,
      BLACK: r.BLACK,
      quit: ze,
      KEvent: dt,
      KEventHandler: ct,
      KEventController: ut,
      cancel: t(() => lt, "cancel"),
    };
    Va.k = $e;
    let et = e.plugins;
    if ((et && et.forEach(re), !1 !== e.global))
      for (let e in $e) window[e] = $e[e];
    return !1 !== e.focus && N.canvas.focus(), $e;
  }, "kaplay");
export { Ka as default };
//# sourceMappingURL=/sm/c53e40e34ed43b39bf5944c1e69dd36e470d051f2c4afca319f2caa3005fb8ba.map
