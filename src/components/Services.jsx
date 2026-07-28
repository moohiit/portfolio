import SectionTitle from "./SectionTitle.jsx";
import { services } from "../data.js";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <SectionTitle number="01">What I Do</SectionTitle>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon"><i className={s.icon}></i></div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
