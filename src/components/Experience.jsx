import { useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { experience } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

const VISIBLE_DETAILS = 3;

function currentDuration(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 - start.getMonth() + now.getMonth();
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0 && rest === 0) {
    const days = Math.max(1, Math.floor((now - start) / 86400000));
    return `${days} day${days > 1 ? "s" : ""}`;
  }
  return [years > 0 && `${years} yr${years > 1 ? "s" : ""}`, rest > 0 && `${rest} mo${rest > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

function Job({ job, onOpenCaseStudy }) {
  const [open, setOpen] = useState(false);
  const details = open ? job.details : job.details.slice(0, VISIBLE_DETAILS);
  const hidden = job.details.length - VISIBLE_DETAILS;

  return (
    <Reveal className={"tl-item" + (job.current ? " tl-item--current" : "")}>
      <span className="tl-node" aria-hidden="true"></span>
      <div className="tl-meta">
        <span className="tl-date">{job.date}</span>
        <span className="tl-duration">{job.current ? currentDuration(job.startDate) : job.duration}</span>
      </div>
      <article className="card spot tl-card">
        <header className="tl-head">
          <div>
            <h3 className="card-title">
              {job.position}
              {job.current && <span className="status-tag"><span className="pulse-dot"></span>Current</span>}
            </h3>
            <div className="tl-company">
              {job.company} <span className="chip chip--sm chip--violet">{job.tag}</span>
            </div>
          </div>
        </header>
        <p className="card-text">{job.description}</p>
        <ul className="tl-details">
          {details.map((d, i) => (
            <li key={i}>
              <i className={d.icon} aria-hidden="true"></i>
              <span>{d.text}</span>
            </li>
          ))}
        </ul>
        <div className="chip-row">
          {job.tech.map((t) => (
            <span className="chip chip--sm" key={t}>{t}</span>
          ))}
        </div>
        <div className="tl-actions">
          {hidden > 0 && (
            <button className="text-btn" onClick={() => setOpen(!open)} aria-expanded={open}>
              {open ? "Show less" : `Show ${hidden} more`}
              <i className={"fas fa-chevron-" + (open ? "up" : "down")} aria-hidden="true"></i>
            </button>
          )}
          {job.storyKey && (
            <button className="btn btn-ghost btn-sm" onClick={() => onOpenCaseStudy(job.storyKey)}>
              <i className="fas fa-book-open" aria-hidden="true"></i> Read the build story
            </button>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Experience({ onOpenCaseStudy }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader index="03" eyebrow="Experience" title="Where I've been shipping" />
        <div className="timeline" ref={ref}>
          <div className="tl-rail" aria-hidden="true">
            <motion.span className="tl-rail-fill" style={{ scaleY: scrollYProgress }} />
          </div>
          {experience.map((job) => (
            <Job job={job} key={job.company} onOpenCaseStudy={onOpenCaseStudy} />
          ))}
        </div>
      </div>
    </section>
  );
}
