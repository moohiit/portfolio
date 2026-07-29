import { useEffect, useState } from "react";
import { roles, currentlyBuilding } from "../data.js";

export default function Hero() {
  const [text, setText] = useState("");

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

          <div className="hero-image">
            <div className="profile-container">
              <div className="profile-circle"></div>
              <div className="profile-img"></div>
            </div>
            <a
              className="building-card"
              href={currentlyBuilding.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="building-pulse"></span>
              <div>
                <div className="building-label">Currently building</div>
                <div className="building-name">{currentlyBuilding.name}</div>
                <div className="building-desc">{currentlyBuilding.desc}</div>
                <div className="building-tech">
                  {currentlyBuilding.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/mohit-patel-51338a245/" className="social-icon linkedin" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://github.com/moohiit" className="social-icon github" title="GitHub" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/m.o.h.i.t.p.a.t.e.l" className="social-icon instagram" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://x.com/mooohiit" className="social-icon twitter" title="Twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://wa.me/+917060993826" className="social-icon whatsapp" title="Whatsapp" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </section>
  );
}
