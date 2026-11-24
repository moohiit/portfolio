import { services } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="What I do"
          title="Backend systems that hold up in production"
          lead="From schema design to the Nginx config: I own features end to end, then keep them fast and observable once real users arrive."
        />
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal className="card spot service-card" key={s.title} delay={i * 0.08}>
              <div className="service-top">
                <span className="icon-tile"><i className={s.icon} aria-hidden="true"></i></span>
                <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-text">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
