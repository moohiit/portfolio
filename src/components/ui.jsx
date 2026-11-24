// Small shared building blocks for the motion layer.
import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

// Fade + rise when the element scrolls into view (once).
export function Reveal({ as = "div", children, delay = 0, y = 28, className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
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
}

// Word-by-word masked reveal for headings. Screen readers get the plain text.
export function SplitText({ as = "h2", text, className, delay = 0, stagger = 0.06, animateOnMount = false }) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-40px" } };
  return (
    <Tag
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
              {word}
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
      <SplitText className="section-title" text={title} />
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
