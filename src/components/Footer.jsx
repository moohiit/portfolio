import { useEffect, useState } from "react";
import { NAV_LINKS } from "./Header.jsx";
import { SOCIALS } from "./Hero.jsx";

export default function Footer() {
  const [visitors, setVisitors] = useState("…");

  useEffect(() => {
    fetch("https://mohitpatel.goatcounter.com/counter//.json")
      .then((r) => r.json())
      .then((data) => setVisitors(data.count || "0"))
      .catch(() => setVisitors("-"));
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <span className="brand-mark">MP</span>
              <span className="brand-name">Mohit Patel</span>
            </a>
            <p className="card-text">Backend Developer building fintech APIs, GenAI products and the servers they run on.</p>
            <div className="social-row">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} className="social-btn" aria-label={s.label} title={s.label} target="_blank" rel="noopener noreferrer">
                  <i className={s.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <span className="mono-label">Sitemap</span>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>

          <div className="footer-nav">
            <span className="mono-label">More</span>
            <a href="/files/MohitPatelResume.pdf" download="Mohit_Patel_Resume.pdf">Resume (PDF)</a>
            <a href="https://github.com/moohiit/portfolio/blob/main/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer">How this site works</a>
            <a href="https://github.com/moohiit/portfolio" target="_blank" rel="noopener noreferrer">Source code</a>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">MOHIT PATEL</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mohit Patel</span>
          <span className="footer-visitors">
            <span className="pulse-dot"></span> {visitors} visitors
          </span>
          <a href="#top" className="text-link">
            Back to top <i className="fas fa-arrow-up" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
