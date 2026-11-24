import { useState } from "react";
import { motion } from "motion/react";
import { skillCategories } from "../data.js";
import { EASE, Reveal, SectionHeader } from "./ui.jsx";

const VISIBLE = 8;

function SkillCard({ cat, delay }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? cat.items : cat.items.slice(0, VISIBLE);
  const hidden = cat.items.length - VISIBLE;

  return (
    <Reveal className={`card spot skill-card skill-card--${cat.key}`} delay={delay}>
      <div className="skill-head">
        <span className="icon-tile"><i className={cat.icon} aria-hidden="true"></i></span>
        <h3 className="card-title">{cat.title}</h3>
        <span className="skill-value">{cat.proficiency}%</span>
      </div>
      <div className="meter" role="meter" aria-valuenow={cat.proficiency} aria-valuemin={0} aria-valuemax={100} aria-label={`${cat.title} proficiency`}>
        <motion.span
          className="meter-fill"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: cat.proficiency / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: delay + 0.2 }}
        />
      </div>
      <div className="chip-row">
        {shown.map((item) => (
          <span className="chip" key={item}>{item}</span>
        ))}
        {hidden > 0 && (
          <button className="chip chip--btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
            {expanded ? "Show less" : `+${hidden} more`}
          </button>
        )}
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Skills"
          title="The toolkit behind the work"
          lead="Strongest on the backend and the servers it runs on, with enough frontend and mobile to ship a whole product."
        />
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <SkillCard cat={cat} key={cat.key} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
