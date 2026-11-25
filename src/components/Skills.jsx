import { useState } from "react";
import { motion } from "motion/react";
import { experience, projects, skillCategories } from "../data.js";
import { categoryUsage } from "../lib/skills.js";
import { EASE, Reveal, SectionHeader } from "./ui.jsx";

const VISIBLE = 8;

// Usage is derived from the projects and jobs in data.js (see lib/skills.js),
// so every number here can be traced back to something on the page.
const USAGE = Object.fromEntries(skillCategories.map((c) => [c.key, categoryUsage(c)]));

function SkillCard({ cat, delay }) {
  const [expanded, setExpanded] = useState(false);
  const usage = USAGE[cat.key];
  const shown = expanded ? usage.items : usage.items.slice(0, VISIBLE);
  const hidden = usage.items.length - VISIBLE;

  return (
    <Reveal className={`card spot skill-card skill-card--${cat.key}`} delay={delay}>
      <div className="skill-head">
        <span className="icon-tile"><i className={cat.icon} aria-hidden="true"></i></span>
        <h3 className="card-title">{cat.title}</h3>
        <span className="skill-value">
          {usage.projectCount}/{projects.length} projects
        </span>
      </div>

      <div className="usage">
        <ol className="usage-bar" aria-label={`Used in ${usage.projectCount} of ${projects.length} projects`}>
          {usage.projectHits.map((p, i) => (
            <motion.li
              key={p.title}
              className={"usage-seg" + (p.used ? " is-used" : "")}
              title={`${p.title}${p.used ? "" : " (not used)"}`}
              initial={{ opacity: 0, scaleY: 0.3 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: delay + 0.15 + i * 0.05 }}
            >
              <span className="sr-only">{p.title}: {p.used ? "uses this stack" : "does not"}</span>
            </motion.li>
          ))}
        </ol>
        <p className="usage-note">
          {usage.roleCount > 0
            ? `${usage.roleCount} of ${experience.length} roles · professionally since ${usage.since}`
            : "Personal projects"}
        </p>
      </div>

      <div className="chip-row">
        {shown.map(({ item, count, projects: p, roles: r }) => (
          <span
            className={"chip" + (count > 0 ? " chip--used" : "")}
            key={item}
            title={count > 0 ? `Used in ${p} project${p === 1 ? "" : "s"} and ${r} role${r === 1 ? "" : "s"}` : undefined}
          >
            {item}
            {count > 0 && (
              <>
                <span className="chip-count" aria-hidden="true">×{count}</span>
                <span className="sr-only">, used in {count} projects and roles</span>
              </>
            )}
          </span>
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
          lead="Strongest on the backend and the servers it runs on, with enough frontend and mobile to ship a whole product. Counted from the work on this page, not self-rated: each bar segment is a project, and ×N is how many projects and roles used that tool."
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
