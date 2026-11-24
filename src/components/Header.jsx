import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./ui.jsx";

export const NAV_LINKS = [
  ["#projects", "Work"],
  ["#experience", "Experience"],
  ["#skills", "Skills"],
  ["#open-source", "Open Source"],
  ["#lab", "Lab"],
  ["#contact", "Contact"],
];

export const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export function countResumeDownload() {
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: "/resume-download", event: true });
  }
}

export default function Header({ theme, onToggleTheme, onOpenPalette, active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dlCount, setDlCount] = useState(null);

  const fetchResumeCount = () => {
    fetch("https://mohitpatel.goatcounter.com/counter/resume-download.json")
      .then((r) => r.json())
      .then((data) => setDlCount(data.count && data.count !== "0" ? data.count : null))
      .catch(() => setDlCount(null));
  };

  useEffect(() => {
    fetchResumeCount();
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const onResumeClick = () => {
    countResumeDownload();
    setTimeout(fetchResumeCount, 3000);
  };

  return (
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="container header-row">
        <a href="#top" className="brand" aria-label="Mohit Patel, back to top">
          <span className="brand-mark">MP</span>
          <span className="brand-name">Mohit Patel</span>
        </a>

        <nav className="nav-pill" aria-label="Primary">
          {NAV_LINKS.map(([href, label]) => {
            const isActive = active === href.slice(1);
            return (
              <a key={href} href={href} className={isActive ? "is-active" : undefined} aria-current={isActive ? "true" : undefined}>
                {isActive && (
                  <motion.span className="nav-highlight" layoutId="nav-highlight" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="nav-label">{label}</span>
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
            <i className="fas fa-magnifying-glass" aria-hidden="true"></i>
            <kbd>{IS_MAC ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title="Toggle theme">
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} aria-hidden="true"></i>
          </button>
          <a className="btn btn-primary btn-sm resume-btn" href="/files/MohitPatelResume.pdf" download="Mohit_Patel_Resume.pdf" onClick={onResumeClick}>
            <i className="fas fa-arrow-down" aria-hidden="true"></i> Resume
            {dlCount && (
              <span className="resume-count" title="Total downloads">
                {dlCount}
              </span>
            )}
          </a>
          <button
            className={"icon-btn menu-btn" + (menuOpen ? " is-open" : "")}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_LINKS.map(([href, label], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i + 0.05, duration: 0.4, ease: EASE }}
              >
                <span className="mobile-index">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </motion.a>
            ))}
            <a className="btn btn-primary" href="/files/MohitPatelResume.pdf" download="Mohit_Patel_Resume.pdf" onClick={onResumeClick}>
              <i className="fas fa-arrow-down" aria-hidden="true"></i> Download resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
