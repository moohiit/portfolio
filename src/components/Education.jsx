import { education } from "../data.js";
import Certificates from "./Certificates.jsx";
import { Reveal, SectionHeader } from "./ui.jsx";

// Education + certificates, merged into one "Credentials" section.
export default function Education() {
  return (
    <section id="credentials" className="section">
      <div className="container">
        <SectionHeader index="07" eyebrow="Credentials" title="Education & certifications" />
        <div className="edu-grid" id="education">
          {education.map((ed, i) => (
            <Reveal className="card spot edu-card" key={ed.degree} delay={i * 0.08}>
              <span className="icon-tile"><i className="fas fa-graduation-cap" aria-hidden="true"></i></span>
              <div>
                <h3 className="card-title">{ed.degree}</h3>
                <p className="card-text">{ed.school}</p>
                <div className="edu-meta">
                  <span className="chip chip--sm">{ed.year}</span>
                  <span className="chip chip--sm chip--brand">{ed.grade}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <h3 className="subhead">Certifications</h3>
          <Certificates />
        </Reveal>
      </div>
    </section>
  );
}
