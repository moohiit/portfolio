import SectionTitle from "./SectionTitle.jsx";
import { testimonials } from "../data.js";

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials">
      <div className="container">
        <SectionTitle>Testimonials</SectionTitle>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <i className="fas fa-quote-left testimonial-quote-icon"></i>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar"><i className="fas fa-user"></i></div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
