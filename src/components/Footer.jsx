import { useEffect, useState } from "react";

export default function Footer() {
  const [visitors, setVisitors] = useState("…");

  useEffect(() => {
    fetch("https://mohitpatel.goatcounter.com/counter//.json")
      .then((r) => r.json())
      .then((data) => setVisitors(data.count || "0"))
      .catch(() => setVisitors("-"));
  }, []);

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Mohit Patel</div>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/moohiitpatel/" className="social-icon linkedin" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/moohiit" className="social-icon github" title="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.instagram.com/m.o.h.i.t.p.a.t.e.l" className="social-icon instagram" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://x.com/mooohiit" className="social-icon twitter" title="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </div>
          <div className="visitor-counter">
            <i className="fas fa-eye"></i>
            <span>Visitors: </span>
            <span className="visitor-count-badge">{visitors}</span>
          </div>
          <a
            className="site-architecture-link"
            href="https://github.com/moohiit/portfolio/blob/main/ARCHITECTURE.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-drafting-compass"></i> How this site works
          </a>
          <div className="copyright">© {new Date().getFullYear()} Mohit Patel. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
