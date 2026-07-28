import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { certificates } from "../data.js";

export default function Certificates() {
  const [index, setIndex] = useState(0);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % certificates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const step = (n) => setIndex((i) => (i + n + certificates.length) % certificates.length);

  return (
    <section id="certificates">
      <div className="container">
        <SectionTitle number="09">Certificates</SectionTitle>

        <div className="certificate-slider">
          {certificates.map((cert, i) => (
            <div className={"certificate-slide" + (i === index ? " active" : "")} key={cert.title}>
              {imgError[i] ? (
                <div className="certificate-placeholder" style={{ display: "flex" }}>
                  <i className="fas fa-database"></i>
                </div>
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="certificate-img"
                  loading="lazy"
                  onError={() => setImgError((e) => ({ ...e, [i]: true }))}
                />
              )}
              <h3 className="certificate-title">{cert.title}</h3>
              <a href={cert.link} className="certificate-link" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </div>
          ))}

          <div className="slider-controls">
            <button type="button" className="slider-btn prev" onClick={() => step(-1)}>&#10094;</button>
            <button type="button" className="slider-btn next" onClick={() => step(1)}>&#10095;</button>
          </div>

          <div className="slider-dots">
            {certificates.map((_, i) => (
              <span key={i} className={"dot" + (i === index ? " active" : "")} onClick={() => setIndex(i)}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
