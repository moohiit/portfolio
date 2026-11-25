import { testimonials } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

// Hidden until real recommendations are added to data.js.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <SectionHeader eyebrow="Testimonials" title="What colleagues say" />
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal className="card spot testimonial-card" key={i} delay={i * 0.08}>
              <i className="fas fa-quote-left testimonial-mark" aria-hidden="true"></i>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
