import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { caseStudies } from "../data.js";
import { EASE } from "./ui.jsx";

// Only needed once a build story is opened, so it ships as its own chunk.
const FlowDiagram = lazy(() => import("./FlowDiagram.jsx"));

// Rendered inside <AnimatePresence> by App, so it animates in and out.
export default function CaseStudy({ studyKey, onClose }) {
  const study = caseStudies[studyKey];
  const closeRef = useRef(null);

  useEffect(() => {
    if (!study) return;
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <motion.div
      className="modal-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="modal casestudy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="casestudy-title"
        data-lenis-prevent
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button className="icon-btn modal-close" onClick={onClose} aria-label="Close case study" ref={closeRef}>
          <i className="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <span className="mono-label">Build story</span>
        <h2 className="casestudy-title" id="casestudy-title">{study.title}</h2>
        <p className="casestudy-subtitle">{study.subtitle}</p>

        {study.sections.map((s, i) => (
          <motion.div
            className="casestudy-section"
            key={s.heading}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.07 }}
          >
            <h3><span className="casestudy-num">{String(i + 1).padStart(2, "0")}</span>{s.heading}</h3>
            <p>{s.body}</p>
            {/* The request-flow diagram sits under the Architecture section. */}
            {study.diagram && i === (study.diagram.after ?? 1) && (
              <Suspense fallback={<div className="flow flow--loading" aria-hidden="true"></div>}>
                <FlowDiagram diagram={study.diagram} />
              </Suspense>
            )}
          </motion.div>
        ))}

        <div className="casestudy-links">
          {study.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              className={"btn " + (l.primary ? "btn-primary" : "btn-ghost")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label} <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
