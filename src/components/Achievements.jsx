import SectionTitle from "./SectionTitle.jsx";
import { achievements } from "../data.js";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <SectionTitle>Achievements & Milestones</SectionTitle>

        <div className="achievements-grid">
          {achievements.map((a) => (
            <div className="achievement-card" key={a.title}>
              <div className="achievement-icon"><i className={a.icon}></i></div>
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
