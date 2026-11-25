import { useState } from "react";
import { certificates } from "../data.js";

// Horizontal, swipeable gallery (scroll-snap) instead of an auto-playing slider.
export default function Certificates() {
  const [imgError, setImgError] = useState({});

  return (
    <div className="cert-rail" id="certificates">
      {certificates.map((cert, i) => (
        <a className="card spot cert-card" key={cert.title} href={cert.link} target="_blank" rel="noopener noreferrer">
          <div className="cert-img">
            {imgError[i] ? (
              <i className="fas fa-certificate" aria-hidden="true"></i>
            ) : (
              <img
                src={cert.image}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setImgError((e) => ({ ...e, [i]: true }))}
              />
            )}
          </div>
          <div className="cert-body">
            <h4 className="cert-title">{cert.title}</h4>
            <span className="text-link">
              View certificate <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
