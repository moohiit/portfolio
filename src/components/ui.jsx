// Small shared building blocks for the motion layer.
import { forwardRef, Fragment, useEffect, useId, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

// Fade + rise when the element scrolls into view (once). Forwards its ref so
// it can sit directly inside <AnimatePresence mode="popLayout">.
export const Reveal = forwardRef(function Reveal({ as = "div", children, delay = 0, y = 28, className, ...rest }, ref) {
  const Tag = motion[as];
  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

// Terminal-style decode: unresolved letters cycle through glyphs and settle
// left to right. The real word stays in the layout (invisible) and the glyphs
// sit on top of it, so the line never reflows while it decodes.
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789<>/[]{}=+*#$%&";
function Scramble({ text, start, delay = 0 }) {
  const live = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;
    const duration = 420 + text.length * 55;
    let raf;
    let t0;
    let last = 0;
    const tick = (now) => {
      t0 ??= now + delay * 1000;
      const t = now - t0;
      const el = live.current;
      if (t >= duration || !el) return setDone(true);
      if (t >= 0 && now - last > 50) {
        last = now;
        const settled = Math.floor((t / duration) * text.length);
        let noise = "";
        for (let i = settled; i < text.length; i++) noise += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        el.firstChild.textContent = text.slice(0, settled);
        el.lastChild.textContent = noise;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, done, text, delay]);

  const active = start && !done;
  return (
    <span className={"scramble" + (active ? " is-active" : "")}>
      <span className="scramble-word">{text}</span>
      {active && (
        <span className="scramble-live" ref={live}>
          <span></span>
          <span className="scramble-glyphs">{text}</span>
        </span>
      )}
    </span>
  );
}

// Word-by-word masked reveal for headings. Screen readers get the plain text.
// With `scramble`, each word also decodes from random glyphs as it rises.
export function SplitText({ as = "h2", text, className, delay = 0, stagger = 0.06, animateOnMount = false, scramble = false }) {
  const Tag = motion[as];
  const words = text.split(" ");
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const decoding = scramble && !reduced && (animateOnMount || inView);
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-40px" } };
  return (
    <Tag
      ref={ref}
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <motion.span
              className="split-inner"
              variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
            >
              {scramble && !reduced ? <Scramble text={word} start={decoding} delay={delay + i * stagger} /> : word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

// "01 — Experience" eyebrow, split-text title and optional lead paragraph.
export function SectionHeader({ index, eyebrow, title, lead }) {
  return (
    <div className="section-head">
      <Reveal className="eyebrow" y={12}>
        {index && <span className="eyebrow-index">{index}</span>}
        <span className="eyebrow-line" aria-hidden="true"></span>
        <span>{eyebrow}</span>
      </Reveal>
      <SplitText className="section-title" text={title} scramble />
      {lead && (
        <Reveal as="p" className="section-lead" delay={0.15}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

// Pulls its child slightly toward the mouse; springs back on leave.
export function Magnetic({ children, strength = 0.35 }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span className="magnetic" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

// A short light dash running around the parent's border (parent must be
// positioned, with a 24px radius). An SVG stroke dash is cheap to repaint,
// unlike an animated conic gradient that repaints the whole card each frame.
export function BeamBorder({ delay = 0 }) {
  const id = useId();
  return (
    <svg className="beam-border" aria-hidden="true" focusable="false" style={{ "--beam-delay": `${delay}s` }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--violet)" />
          <stop offset="1" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
      <rect className="beam-border-glow" width="100%" height="100%" rx="23.5" pathLength="100" stroke={`url(#${id})`} />
      <rect className="beam-border-line" width="100%" height="100%" rx="23.5" pathLength="100" stroke={`url(#${id})`} />
    </svg>
  );
}

// Counts up from 0 the first time it scrolls into view.
export function Counter({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setValue });
    return () => controls.stop();
  }, [inView, to, duration]);

  const shown = Number.isInteger(to) ? Math.round(value) : value.toFixed(1);
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
