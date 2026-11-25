// Smooth scrolling (Lenis) plus the few helpers the rest of the app needs.
//
// Lenis drives the native scroll position, so IntersectionObserver, motion's
// useScroll and window.scrollY all keep working. It is skipped entirely for
// visitors who prefer reduced motion; every helper falls back to native scroll.
import Lenis from "lenis";

export const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Height of the floating header plus breathing room, used as the anchor offset.
export const HEADER_OFFSET = -84;

let lenis = null;
let lockCount = 0;

export function initSmoothScroll() {
  if (REDUCED_MOTION || lenis) return () => {};
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, allowNestedScroll: true });
  let rafId = requestAnimationFrame(function raf(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  });
  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

// target: "#id", an element, or 0 for the very top.
export function scrollToTarget(target, offset = HEADER_OFFSET) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (target !== 0 && !el) return;
  if (lenis) {
    // force: a closing modal may still hold the scroll lock for its exit animation.
    lenis.scrollTo(target === 0 ? 0 : el, { offset: target === 0 ? 0 : offset, force: true });
    return;
  }
  const top = target === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: REDUCED_MOTION ? "auto" : "smooth" });
}

// Modals (case study, command palette, arcade) can stack, so locking is counted.
export function lockScroll(lock) {
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  document.documentElement.classList.toggle("scroll-locked", locked);
  if (lenis) locked ? lenis.stop() : lenis.start();
}
