import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import Preloader from "./components/Preloader.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Achievements from "./components/Achievements.jsx";
import Skills from "./components/Skills.jsx";
import OpenSource from "./components/OpenSource.jsx";
import Education from "./components/Education.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Blog from "./components/Blog.jsx";
import Lab from "./components/Lab.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import { initSmoothScroll, lockScroll, scrollToTarget } from "./lib/scroll.js";

const Arcade = lazy(() => import("./components/Arcade.jsx"));

function readTheme() {
  try {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function App() {
  const [theme, setTheme] = useState(readTheme);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [openStudy, setOpenStudy] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [showTop, setShowTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const closeStudy = useCallback(() => setOpenStudy(null), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openArcade = useCallback(() => setArcadeOpen(true), []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b0616" : "#f7f5fc");
    try {
      localStorage.setItem("theme", theme);
    } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => initSmoothScroll(), []);

  // In-page anchors go through Lenis (or native smooth scroll) with the header offset.
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const href = anchor.getAttribute("href");
      if (href === "#top" || href === "#") {
        e.preventDefault();
        scrollToTarget(0);
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        scrollToTarget(target);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Cursor spotlight: cards with .spot get --mx/--my for a radial glow.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e) => {
      const card = e.target.closest?.(".spot");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Active nav link: the section crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Global shortcuts: Ctrl+G arcade, ⌘K / Ctrl+K command palette.
  useEffect(() => {
    const onKey = (e) => {
      const key = typeof e.key === "string" ? e.key.toLowerCase() : "";
      if (e.ctrlKey && key === "g") {
        e.preventDefault();
        setArcadeOpen((o) => !o);
      } else if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "Escape") {
        setArcadeOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while any overlay is open. Tied to state (not to the
  // overlays' lifetimes) so it releases immediately, before exit animations end.
  const overlayOpen = paletteOpen || Boolean(openStudy) || arcadeOpen;
  useEffect(() => {
    if (!overlayOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [overlayOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="page-noise" aria-hidden="true"></div>

      <a className="skip-link" href="#projects">Skip to content</a>

      <Header theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} active={activeSection} />

      <main id="top">
        <Hero theme={theme} />
        <Marquee />
        <Services />
        <Projects onOpenCaseStudy={setOpenStudy} />
        <Experience onOpenCaseStudy={setOpenStudy} />
        <Achievements />
        <Skills />
        <OpenSource />
        <Education />
        <Testimonials />
        <Blog />
        <Lab onOpenArcade={openArcade} />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {openStudy && <CaseStudy key={openStudy} studyKey={openStudy} onClose={closeStudy} />}
      </AnimatePresence>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            onClose={closePalette}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenArcade={openArcade}
            onOpenCaseStudy={setOpenStudy}
          />
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        {arcadeOpen && <Arcade open={arcadeOpen} onClose={() => setArcadeOpen(false)} />}
      </Suspense>

      <button
        className={"to-top" + (showTop ? " is-visible" : "")}
        aria-label="Back to top"
        onClick={() => scrollToTarget(0)}
        tabIndex={showTop ? 0 : -1}
      >
        <i className="fas fa-arrow-up" aria-hidden="true"></i>
      </button>
    </MotionConfig>
  );
}
