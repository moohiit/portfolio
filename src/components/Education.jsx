import SectionTitle from "./SectionTitle.jsx";
import { education } from "../data.js";

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <SectionTitle number="10">Education</SectionTitle>

        <div className="education-grid">
          {education.map((ed) => (
            <div className="education-card" key={ed.degree}>
              <div className="education-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="education-info">
                <h3 className="education-degree">{ed.degree}</h3>
                <p className="education-school">{ed.school}</p>
                <div className="education-meta">
                  <span className="education-year"><i className="fas fa-calendar-alt"></i> {ed.year}</span>
                  <span className="education-grade"><i className="fas fa-star"></i> {ed.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
