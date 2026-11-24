// A short (<1s) boot counter on the first visit of a browser session only.
// The page renders underneath it, so it never delays content from loading;
// reduced-motion visitors and repeat visits skip it completely.
import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { REDUCED_MOTION } from "../lib/scroll.js";

const KEY = "intro-seen";

function shouldPlay() {
  if (REDUCED_MOTION) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export const INTRO_PLAYS = typeof window !== "undefined" && shouldPlay();
// Hero entrance animations wait for the curtain to lift.
export const HERO_DELAY = INTRO_PLAYS ? 1.15 : 0.1;

export default function Preloader() {
  const [show, setShow] = useState(INTRO_PLAYS);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch { /* ignore */ }
    let timer;
    const controls = animate(0, 100, {
      duration: 0.85,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => (timer = setTimeout(() => setShow(false), 120)),
    });
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          aria-hidden="true"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="preloader-row">
            <span className="preloader-label">~/mohitpatel.org</span>
            <span className="preloader-count">{String(count).padStart(3, "0")}%</span>
          </div>
          <div className="preloader-bar">
            <span style={{ transform: `scaleX(${count / 100})` }}></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
