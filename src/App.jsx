import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Terminal from "./components/Terminal.jsx";
import Services from "./components/Services.jsx";
import Skills from "./components/Skills.jsx";
import CodingProfiles from "./components/CodingProfiles.jsx";
import GitHubActivity from "./components/GitHubActivity.jsx";
import FeaturedRepos from "./components/FeaturedRepos.jsx";
import CodeShowcase from "./components/CodeShowcase.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Achievements from "./components/Achievements.jsx";
import Certificates from "./components/Certificates.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Education from "./components/Education.jsx";
import Blog from "./components/Blog.jsx";
import Spotify from "./components/Spotify.jsx";
import Contact from "./components/Contact.jsx";
import Toolbox from "./components/Toolbox.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import Footer from "./components/Footer.jsx";

const Arcade = lazy(() => import("./components/Arcade.jsx"));

const REDUCED_MOTION =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [cursorOn, setCursorOn] = useState(() => localStorage.getItem("customCursor") === "on");
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [openStudy, setOpenStudy] = useState(null);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Custom cursor — opt-in, disabled on touch devices and for reduced-motion users
  useEffect(() => {
    document.body.classList.toggle("cursor-on", cursorOn && !REDUCED_MOTION);
    localStorage.setItem("customCursor", cursorOn ? "on" : "off");
    const show = cursorOn && !REDUCED_MOTION && !("ontouchstart" in window);
    if (cursorRef.current) cursorRef.current.style.display = show ? "" : "none";
    if (dotRef.current) dotRef.current.style.display = show ? "" : "none";
    if (!show) return;
    let cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;
    let rafId = null, running = true;

    const onMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (dotRef.current) {
            dotRef.current.style.left = cursorX + "px";
            dotRef.current.style.top = cursorY + "px";
          }
          rafId = null;
        });
      }
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      if (!running) return;
      dotX += (cursorX - dotX) * 0.15;
      dotY += (cursorY - dotY) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = dotX + "px";
        cursorRef.current.style.top = dotY + "px";
      }
      requestAnimationFrame(animate);
    };
    animate();

    const hoverTargets =
      "a, button, .skill-item, .tech-item, .project-card, .suggestion-chip, .code-tab, .social-icon, .arcade-game-btn, .memory-card, input, textarea";
    const onOver = (e) => {
      if (e.target.closest(hoverTargets)) {
        cursorRef.current?.classList.add("cursor-hover");
        dotRef.current?.classList.add("dot-hover");
      } else {
        cursorRef.current?.classList.remove("cursor-hover");
        dotRef.current?.classList.remove("dot-hover");
      }
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      running = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [cursorOn]);

  // Scroll: progress bar, header shrink, active nav, scroll-top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + "%";
      }
      const header = document.querySelector("header");
      if (header) {
        header.style.padding = scrollY > 100 ? "10px 0" : "20px 0";
        header.style.boxShadow = scrollY > 100 ? "0 5px 20px rgba(0, 0, 0, 0.1)" : "none";
      }
      let current = "";
      document.querySelectorAll("section[id]").forEach((section) => {
        if (scrollY >= section.offsetTop - 120) current = section.getAttribute("id");
      });
      document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === "#" + current);
      });
      setScrollTopVisible(scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scrolling for hash links
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Reveal-on-scroll animations (re-observe as sections mount)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            if (entry.target.classList.contains("timeline-item")) {
              entry.target.closest(".timeline")?.classList.add("timeline-active");
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    const selector =
      ".skill-card, .project-card, .timeline-item, .education-card, .service-card, .profile-card, .achievement-card, .testimonial-card, .blog-card, .repo-card";
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Arcade Ctrl+G shortcut
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.key === "g") {
        e.preventDefault();
        setArcadeOpen((o) => !o);
      }
      if (e.key === "Escape") setArcadeOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="progress-bar" ref={progressRef}></div>
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="grid-pattern"></div>
      <div className="stars"></div>
      <div className="ambient-blob ambient-blob-1"></div>
      <div className="vignette"></div>

      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        cursorOn={cursorOn}
        onToggleCursor={() => setCursorOn(!cursorOn)}
      />
      <Hero />
      <Stats />
      <Terminal />
      <Services />
      <Experience onOpenCaseStudy={setOpenStudy} />
      <Projects onOpenCaseStudy={setOpenStudy} />
      <Skills theme={theme} />
      <Achievements />
      <CodingProfiles />
      <GitHubActivity />
      <FeaturedRepos />
      <CodeShowcase />
      <Certificates />
      <Education />
      <Testimonials />
      <Blog />
      <Toolbox />
      <Spotify />
      <Contact />

      <CaseStudy studyKey={openStudy} onClose={() => setOpenStudy(null)} />

      <Suspense fallback={null}>
        {arcadeOpen && <Arcade open={arcadeOpen} onClose={() => setArcadeOpen(false)} />}
      </Suspense>

      <button
        className="arcade-hint-badge"
        title="Secret Arcade"
        aria-label="Open secret arcade (Ctrl+G)"
        onClick={() => setArcadeOpen(true)}
      >
        <i className="fas fa-gamepad"></i>
        <span>Ctrl+G</span>
      </button>

      <button
        className={"scroll-top" + (scrollTopVisible ? " visible" : "")}
        title="Back to top"
        aria-label="Scroll back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-chevron-up"></i>
      </button>

      <Footer />
    </>
  );
}
