// Animated WebGL background for the hero: a slow, domain-warped noise field in
// the theme colours, with a soft glow that follows the pointer.
//
// Cost control:
//  - OGL (~25 KB) is loaded with a dynamic import, after first paint
//  - renders at reduced resolution (lower still on phones)
//  - pauses when the hero is off screen or the tab is hidden
//  - never starts for reduced-motion visitors; the CSS gradient behind the
//    canvas is the fallback in that case and while WebGL is loading
import { useEffect, useRef } from "react";
import { REDUCED_MOTION } from "../lib/scroll.js";

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform float uIntensity;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.05;

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.7 + 2.0 * q + vec2(1.7, 9.2) + t * 1.4 + m * 0.2),
                fbm(p * 1.7 + 2.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.5 + 2.4 * r);

  vec3 col = mix(uBg, uColB, smoothstep(0.2, 0.85, f) * 0.95);
  col = mix(col, uColC, smoothstep(0.45, 1.0, q.y * f * 1.5) * 0.55);
  col = mix(col, uColA, smoothstep(0.55, 1.0, f * r.x * 1.7) * 0.8);

  float d = length(p - m);
  col += uColA * 0.10 * exp(-d * d * 5.0);

  // Blend into the page: fade out toward the bottom edge and the corners.
  float fade = smoothstep(0.0, 0.6, vUv.y) * (1.0 - smoothstep(0.75, 1.15, length((vUv - 0.5) * vec2(1.1, 1.0))));
  col = mix(uBg, col, fade * uIntensity);

  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.03; // film grain
  gl_FragColor = vec4(col, 1.0);
}`;

function cssColor(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = raw.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return [0, 0, 0];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

function themeUniforms() {
  return {
    uBg: cssColor("--shader-bg"),
    uColA: cssColor("--shader-a"),
    uColB: cssColor("--shader-b"),
    uColC: cssColor("--shader-c"),
    uIntensity: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--shader-intensity")) || 1,
  };
}

export default function HeroCanvas({ theme }) {
  const wrapRef = useRef(null);
  const programRef = useRef(null);

  useEffect(() => {
    if (REDUCED_MOTION) return;
    let disposed = false;
    let cleanup = () => {};

    import("ogl").then(({ Renderer, Program, Mesh, Triangle }) => {
      const wrap = wrapRef.current;
      if (disposed || !wrap) return;

      const small = window.matchMedia("(max-width: 768px)").matches;
      const renderer = new Renderer({
        dpr: small ? 0.6 : Math.min(window.devicePixelRatio, 1.25) * 0.75,
        alpha: false,
        antialias: false,
        powerPreference: "low-power",
      });
      const gl = renderer.gl;
      if (!gl) return;
      gl.canvas.className = "hero-canvas";
      wrap.appendChild(gl.canvas);

      const t = themeUniforms();
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
          uMouse: { value: [0.5, 0.6] },
          uBg: { value: t.uBg },
          uColA: { value: t.uColA },
          uColB: { value: t.uColB },
          uColC: { value: t.uColC },
          uIntensity: { value: t.uIntensity },
        },
      });
      programRef.current = program;
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
        program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      };
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      resize();

      const target = [0.5, 0.6];
      const mouse = [0.5, 0.6];
      const onPointer = (e) => {
        const r = wrap.getBoundingClientRect();
        target[0] = (e.clientX - r.left) / r.width;
        target[1] = 1 - (e.clientY - r.top) / r.height;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(wrap);

      let rafId;
      const start = performance.now();
      const loop = (now) => {
        rafId = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        mouse[0] += (target[0] - mouse[0]) * 0.04;
        mouse[1] += (target[1] - mouse[1]) * 0.04;
        program.uniforms.uMouse.value = mouse;
        program.uniforms.uTime.value = (now - start) / 1000;
        renderer.render({ scene: mesh });
      };
      rafId = requestAnimationFrame(loop);
      requestAnimationFrame(() => gl.canvas.classList.add("is-ready"));

      cleanup = () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        gl.canvas.remove();
        programRef.current = null;
      };
    }).catch(() => { /* no WebGL: the CSS gradient stays */ });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  // Re-read the palette when the theme flips.
  useEffect(() => {
    const program = programRef.current;
    if (!program) return;
    const t = themeUniforms();
    for (const key of ["uBg", "uColA", "uColB", "uColC", "uIntensity"]) program.uniforms[key].value = t[key];
  }, [theme]);

  return <div className="hero-canvas-wrap" ref={wrapRef} aria-hidden="true"></div>;
}
