import { useEffect, useRef, useState } from "react";
import { roles, currentlyBuilding } from "../data.js";
import { fetchRepos } from "../lib/github.js";

// Repos that shouldn't appear as "currently building" even when recently pushed
// (the portfolio itself and the profile readme repo are meta, not projects).
const BUILDING_EXCLUDE = ["portfolio", "moohiit"];

export default function Hero() {
  const [text, setText] = useState("");
  const [building, setBuilding] = useState(currentlyBuilding);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    // fetchRepos() is shared with FeaturedRepos, so this costs no extra API quota.
    fetchRepos()
      .then((repos) => {
        const repo = repos.find((r) => !r.fork && !BUILDING_EXCLUDE.includes(r.name));
        if (!repo) return;
        setBuilding({
          name: repo.name,
          desc: repo.description || currentlyBuilding.desc,
          tech: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 3),
          link: repo.html_url,
        });
      })
      .catch(() => { /* keep static fallback from data.js */ });
  }, []);

  useEffect(() => {
    let roleIndex = 0, charIndex = 0, isDeleting = false, timer;
    const tick = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      setText(currentRole.substring(0, charIndex));

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }
      timer = setTimeout(tick, speed);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  // DOM order is the reading / tab order on every viewport: text, social links,
  // then the photo and the "currently building" card. On desktop the grid puts
  // the photo column beside the text and the social row underneath both
  // (.hero .social-icons in styles.css); on phones it is a single column.
  return (
    <section className="hero" id="about">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-subtitle">Hello, I'm</div>
            <h1 className="hero-title">
              <span>Mohit Patel</span>
              <span className="typewriter">{text}</span>
            </h1>
            <p className="hero-description">
              Backend Developer at <span className="hero-highlight">Quikkred</span> — engineering critical financial
              APIs, managing production Linux infrastructure, and shipping{" "}
              <span className="hero-highlight">AI-powered MERN products</span> that scale.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="cta-button">View Projects</a>
              <a href="#contact" className="btn-outline">Get In Touch</a>
            </div>
          </div>

          <div className="social-icons">
            <a href="https://www.linkedin.com/in/moohiitpatel/" className="social-icon linkedin" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/moohiit" className="social-icon github" title="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.instagram.com/m.o.h.i.t.p.a.t.e.l" className="social-icon instagram" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://x.com/mooohiit" className="social-icon twitter" title="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://wa.me/+917060993826" className="social-icon whatsapp" title="Whatsapp" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
          </div>

          <div className="hero-image">
            <div className="profile-container">
              <div className="profile-circle"></div>
              <div className="profile-img"></div>
            </div>
            <a className="building-card" href={building.link} target="_blank" rel="noopener noreferrer">
              <span className="building-pulse"></span>
              <div>
                <div className="building-label">Currently building</div>
                <div className="building-name">{building.name}</div>
                <div className="building-desc">{building.desc}</div>
                <div className="building-tech">
                  {building.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
