import { achievements } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHeader index="04" eyebrow="Impact" title="Milestones worth measuring" />
        <div className="impact-grid">
          {achievements.map((a, i) => (
            <Reveal className="card spot impact-card" key={a.title} delay={i * 0.08}>
              {a.image ? (
                <img src={a.image} alt="" className="impact-img" loading="lazy" width="48" height="48" />
              ) : (
                <span className="icon-tile"><i className={a.icon} aria-hidden="true"></i></span>
              )}
              <h3 className="card-title">{a.title}</h3>
              <p className="card-text">{a.desc}</p>
              {a.link && (
                <a href={a.link} className="text-link" target="_blank" rel="noopener noreferrer">
                  View <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
