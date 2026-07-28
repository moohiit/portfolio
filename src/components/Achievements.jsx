import SectionTitle from "./SectionTitle.jsx";
import { achievements } from "../data.js";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <SectionTitle number="05">Achievements & Milestones</SectionTitle>

        <div className="achievements-grid">
          {achievements.map((a) => (
            <div className="achievement-card" key={a.title}>
              {a.image ? (
                <img src={a.image} alt={a.title} className="achievement-img" loading="lazy" />
              ) : (
                <div className="achievement-icon"><i className={a.icon}></i></div>
              )}
              <h3 className="achievement-title">{a.title}</h3>
              <p className="achievement-desc">{a.desc}</p>
              {a.link && (
                <a href={a.link} className="achievement-link" target="_blank" rel="noopener noreferrer">
                  View <i className="fas fa-arrow-right"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
