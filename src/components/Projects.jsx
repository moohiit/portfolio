import SectionTitle from "./SectionTitle.jsx";
import { projects } from "../data.js";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionTitle number="06">Featured Projects</SectionTitle>

        <div className="projects-grid">
          {projects.map((p) => (
            <div className={"project-card" + (p.featured ? " project-card--featured" : "")} key={p.title}>
              {p.gradient ? (
                <div className="project-img project-img--gradient" style={{ background: p.gradient }}>
                  {p.mobileIcon && (
                    <div className="mobile-app-icon"><i className="fas fa-mobile-alt"></i></div>
                  )}
                </div>
              ) : (
                <div className="project-img" style={{ backgroundImage: `url('${p.image}')` }}></div>
              )}
              <div className="project-content">
                <h3 className="project-title">
                  {p.title}
                  {p.badge && <span className={"project-badge " + p.badge.cls}>{p.badge.text}</span>}
                </h3>
                <p>{p.description}</p>
                {p.architecture && (
                  <ul className="project-arch">
                    {p.architecture.map((a, i) => (
                      <li key={i}><i className="fas fa-sitemap"></i> {a}</li>
                    ))}
                  </ul>
                )}
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <div className="tech-item" key={t}>{t}</div>
                  ))}
                </div>
                <div className="project-links">
                  {p.demo && (
                    <a href={p.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  )}
                  {p.playStore && (
                    <a href={p.playStore} className="project-link demo-link" target="_blank" rel="noopener noreferrer">Google Play</a>
                  )}
                  {p.code && (
                    <a href={p.code} className="project-link code-link" target="_blank" rel="noopener noreferrer">View Code</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
