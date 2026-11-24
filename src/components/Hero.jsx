import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { roles, currentlyBuilding, stats, skillCategories } from "../data.js";
import HeroCanvas from "./HeroCanvas.jsx";
import { HERO_DELAY } from "./Preloader.jsx";
import { Counter, EASE, Magnetic } from "./ui.jsx";

const TAGS = ["Fintech APIs", "GenAI", "DevOps", "Mobile"];

export const SOCIALS = [
  { href: "https://www.linkedin.com/in/moohiitpatel/", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { href: "https://github.com/moohiit", icon: "fab fa-github", label: "GitHub" },
  { href: "https://x.com/mooohiit", icon: "fab fa-x-twitter", label: "X (Twitter)" },
  { href: "https://www.instagram.com/m.o.h.i.t.p.a.t.e.l", icon: "fab fa-instagram", label: "Instagram" },
  { href: "https://wa.me/+917060993826", icon: "fab fa-whatsapp", label: "WhatsApp" },
];

function useTypewriter(words) {
  const [text, setText] = useState("");
  useEffect(() => {
    let wordIndex = 0, charIndex = 0, deleting = false, timer;
    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.substring(0, charIndex));
      let delay = deleting ? 35 : 75;
      if (!deleting && charIndex === word.length) {
        delay = 2000;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, HERO_DELAY * 1000 + 600);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

// Letter-by-letter rise for the display name.
function DisplayName({ lines }) {
  let n = 0;
  return (
    <h1 className="hero-title">
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, li) => (
        <span className={"hero-line" + (li === 1 ? " hero-line--accent" : "")} aria-hidden="true" key={line}>
          {[...line].map((ch) => {
            const i = n++;
            return (
              <span className="split-word" key={i}>
                <motion.span
                  className="split-inner"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: HERO_DELAY + i * 0.045 }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

// The right-hand "live console": real stats, real GitHub activity.
function Console({ building }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className="console-wrap"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: HERO_DELAY + 0.45 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div className="console glass" style={{ rotateX, rotateY }}>
        <div className="console-bar">
          <span className="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span className="console-url">mohit@prod:~/status</span>
          <span className="live-badge"><span className="pulse-dot"></span>Live</span>
        </div>

        <div className="console-profile">
          <img src="/images/profile.webp" alt="Mohit Patel" width="56" height="56" />
          <div>
            <div className="console-name">Mohit Patel</div>
            <div className="console-role">Backend Developer · Quikkred</div>
          </div>
        </div>

        <div className="console-stats">
          {stats.map((s) => (
            <div className="console-stat" key={s.label}>
              <div className="console-stat-value">
                <Counter to={s.target} suffix={s.plus === false ? "" : "+"} />
              </div>
              <div className="console-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <a className="console-building" href={building.link} target="_blank" rel="noopener noreferrer">
          <div className="console-building-top">
            <span className="mono-label"><span className="pulse-dot pulse-dot--violet"></span>Currently building</span>
            <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </div>
          <div className="console-building-name">{building.name}</div>
          <div className="console-building-desc">{building.desc}</div>
          <div className="chip-row">
            {building.tech.map((t) => (
              <span className="chip chip--sm" key={t}>{t}</span>
            ))}
          </div>
        </a>

        <div className="console-health">
          <div className="mono-label">Stack health</div>
          {skillCategories.map((c, i) => (
            <div className="health-row" key={c.key}>
              <span>{c.title}</span>
              <div className="health-track">
                <motion.span
                  className="health-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: c.proficiency / 100 }}
                  transition={{ duration: 1.4, ease: EASE, delay: HERO_DELAY + 0.9 + i * 0.12 }}
                />
              </div>
              <span className="health-value">{c.proficiency}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ theme }) {
  const role = useTypewriter(roles);
  // Static on purpose: the current work lives in private repos, so the latest
  // public GitHub repo would be the wrong answer here.
  const building = currentlyBuilding;

  const fade = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: HERO_DELAY + delay },
  });

  return (
    <section className="hero" id="about">
      <div className="hero-bg" aria-hidden="true">
        <HeroCanvas theme={theme} />
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          {/* Phones/tablets only: on desktop the photo lives in the console card. */}
          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: HERO_DELAY }}
          >
            <span className="hero-avatar-ring" aria-hidden="true"></span>
            <img
              src="/images/profile.webp"
              alt="Mohit Patel"
              width="128"
              height="128"
              fetchpriority="high"
            />
            <span className="hero-avatar-badge" aria-hidden="true">
              <i className="fas fa-code"></i>
            </span>
          </motion.div>

          <motion.a href="#contact" className="status-chip" {...fade(0)}>
            <span className="pulse-dot"></span>
            Open to new opportunities
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </motion.a>

          <DisplayName lines={["Mohit", "Patel"]} />

          <motion.div className="hero-role" {...fade(0.35)}>
            <span className="hero-role-prompt">&gt;</span>
            <span>{role}</span>
            <span className="caret" aria-hidden="true"></span>
          </motion.div>

          <motion.p className="hero-desc" {...fade(0.45)}>
            Backend Developer at <strong>Quikkred</strong>, leading engineering on the{" "}
            <strong>Fluxus Forge</strong> multi-tenant lending cloud, and building the APIs behind two fintech apps
            with <strong>10K+ installs</strong> on Google Play.
          </motion.p>

          <motion.div className="hero-ctas" {...fade(0.55)}>
            <Magnetic>
              <a href="#projects" className="btn btn-primary btn-lg">
                View my work <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost btn-lg">Get in touch</a>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero-tags" {...fade(0.65)} aria-label="Focus areas">
            {TAGS.map((t) => (
              <li key={t}>[ {t} ]</li>
            ))}
          </motion.ul>

          <motion.div className="social-row" {...fade(0.75)}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="social-btn" aria-label={s.label} title={s.label} target="_blank" rel="noopener noreferrer">
                <i className={s.icon} aria-hidden="true"></i>
              </a>
            ))}
          </motion.div>
        </div>

        <Console building={building} />
      </div>

      <a href="#services" className="scroll-cue" aria-label="Scroll to content">
        <span></span>
      </a>
    </section>
  );
}
