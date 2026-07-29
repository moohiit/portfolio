import { useEffect } from "react";
import { caseStudies } from "../data.js";

export default function CaseStudy({ studyKey, onClose }) {
  const study = caseStudies[studyKey];

  useEffect(() => {
    if (!study) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div className="casestudy-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="casestudy-modal" role="dialog" aria-modal="true" aria-label={study.title}>
        <button className="casestudy-close" onClick={onClose} aria-label="Close case study">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="casestudy-title">{study.title}</h2>
        <p className="casestudy-subtitle">{study.subtitle}</p>

        {study.sections.map((s) => (
          <div className="casestudy-section" key={s.heading}>
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </div>
        ))}

        <div className="casestudy-links">
          {study.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              className={l.primary ? "cta-button" : "btn-outline"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
