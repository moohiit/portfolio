import { useEffect } from "react";
import { caseStudy } from "../data.js";

export default function CaseStudy({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="casestudy-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="casestudy-modal" role="dialog" aria-modal="true" aria-label={caseStudy.title}>
        <button className="casestudy-close" onClick={onClose} aria-label="Close case study">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="casestudy-title">{caseStudy.title}</h2>
        <p className="casestudy-subtitle">{caseStudy.subtitle}</p>

        {caseStudy.sections.map((s) => (
          <div className="casestudy-section" key={s.heading}>
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </div>
        ))}

        <div className="casestudy-links">
          <a href={caseStudy.links.demo} className="cta-button" target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
          <a href={caseStudy.links.code} className="btn-outline" target="_blank" rel="noopener noreferrer">
            View Code
          </a>
        </div>
      </div>
    </div>
  );
}
