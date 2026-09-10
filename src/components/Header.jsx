import { useEffect, useRef, useState } from "react";

export default function Header({ theme, onToggleTheme, cursorOn, onToggleCursor }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dlCount, setDlCount] = useState(null);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const fetchResumeCount = () => {
    fetch("https://mohitpatel.goatcounter.com/counter/resume-download.json")
      .then((r) => r.json())
      .then((data) => setDlCount(data.count && data.count !== "0" ? data.count : null))
      .catch(() => setDlCount(null));
  };

  useEffect(() => {
    fetchResumeCount();
  }, []);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuOpen && !navRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  const onResumeClick = () => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: "/resume-download", event: true });
    }
    setTimeout(fetchResumeCount, 3000);
  };

  const links = [
    ["#about", "About"],
    ["#experience", "Experience"],
    ["#projects", "Projects"],
    ["#skills", "Skills"],
    ["#coding-profiles", "Profiles"],
    ["#certificates", "Certificates"],
    ["#education", "Education"],
    ["#contact", "Contact"],
  ];

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon"><i className="fas fa-code"></i></div>
            <div className="logo-text">Mohit Patel</div>
          </div>

          <nav className={"nav-links" + (menuOpen ? " active" : "")} ref={navRef}>
            {links.map(([href, label], i) => (
              <a key={href} href={href} data-num={String(i + 1).padStart(2, "0")} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#contact" className="cta-button hire-me-mobile" onClick={() => setMenuOpen(false)}>
              Hire Me
            </a>
            <a
              className="cta-button resume-button"
              href="/files/MohitPatelResume.pdf"
              download="Mohit_Patel_Resume.pdf"
              onClick={onResumeClick}
            >
              <i className="fas fa-download"></i> Resume
              {dlCount && (
                <span className="resume-dl-badge" style={{ display: "inline-flex" }} title="Total downloads">
                  {dlCount}
                </span>
              )}
            </a>
          </nav>

          <button
            className={"theme-toggle cursor-toggle" + (cursorOn ? " cursor-toggle--on" : "")}
            title={cursorOn ? "Disable custom cursor" : "Enable custom cursor"}
            aria-label="Toggle custom cursor"
            aria-pressed={cursorOn}
            onClick={onToggleCursor}
          >
            <i className="fas fa-mouse-pointer"></i>
          </button>
          <button className="theme-toggle" title="Toggle theme" aria-label="Toggle light/dark theme" onClick={onToggleTheme}>
            <i className={theme === "light" ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>

          <div
            className={"hamburger" + (menuOpen ? " active" : "")}
            ref={hamburgerRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
