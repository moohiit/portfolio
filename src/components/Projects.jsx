import { projects } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

const MAX_TECH = 6;

function hostOf(p) {
  return (p.demo || p.playStore || p.site || "").replace(/^https?:\/\//, "").replace(/\/$/, "").split("/")[0] || "github.com/moohiit";
}

function Status({ p }) {
  if (p.status) return <span className="status-tag status-tag--violet"><span className="pulse-dot pulse-dot--violet"></span>{p.status}</span>;
  if (p.playStore) return <span className="status-tag"><span className="pulse-dot"></span>On Google Play</span>;
  if (p.demo) return <span className="status-tag"><span className="pulse-dot"></span>Live</span>;
  return null;
}

function Links({ p, onOpenCaseStudy }) {
  return (
    <div className="project-links">
      {p.storyKey && (
        <button className="btn btn-primary btn-sm" onClick={() => onOpenCaseStudy(p.storyKey)}>
          <i className="fas fa-book-open" aria-hidden="true"></i> Build story
        </button>
      )}
      {p.demo && (
        <a href={p.demo} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
          Live demo <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      )}
      {p.site && (
        <a href={p.site} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
          Website <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      )}
      {p.playStore && (
        <a href={p.playStore} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-google-play" aria-hidden="true"></i> Google Play
        </a>
      )}
      {p.code && (
        <a href={p.code} className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" aria-hidden="true"></i> Code
        </a>
      )}
    </div>
  );
}

function Tech({ items, max = MAX_TECH }) {
  const extra = items.length - max;
  return (
    <div className="chip-row">
      {items.slice(0, max).map((t) => (
        <span className="chip" key={t}>{t}</span>
      ))}
      {extra > 0 && <span className="chip chip--muted">+{extra}</span>}
    </div>
  );
}

function Shot({ p, eager }) {
  return (
    <div className="shot">
      <div className="shot-bar">
        <span className="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="shot-url">{hostOf(p)}</span>
      </div>
      <div className="shot-img">
        <img src={p.image} alt={`${p.title} screenshot`} loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}

export default function Projects({ onOpenCaseStudy }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="Selected work"
          title="Products I've shipped to real users"
          lead="Everything here is deployed and in use, from lending platforms at work to my own GenAI products. The build stories cover the architecture and the trade-offs."
        />

        {featured.map((f, i) => (
          <Reveal className={"card spot project-feature" + (i % 2 ? " project-feature--flip" : "")} key={f.title}>
            <Shot p={f} eager={i === 0} />
            <div className="project-body">
              <div className="project-meta">
                <span className="mono-label">{f.badge?.text || "Featured project"}</span>
                <Status p={f} />
              </div>
              <h3 className="project-title project-title--lg">{f.title}</h3>
              <p className="card-text">{f.description}</p>
              {f.architecture && (
                <ul className="arch-list">
                  {f.architecture.map((a) => (
                    <li key={a}><i className="fas fa-diagram-project" aria-hidden="true"></i>{a}</li>
                  ))}
                </ul>
              )}
              <Tech items={f.tech} max={8} />
              <Links p={f} onOpenCaseStudy={onOpenCaseStudy} />
            </div>
          </Reveal>
        ))}

        <div className="projects-grid">
          {rest.map((p, i) => (
            <Reveal className="card spot project-card" key={p.title} delay={(i % 3) * 0.08}>
              <Shot p={p} />
              <div className="project-body">
                <div className="project-meta">
                  {p.badge ? <span className="mono-label">{p.badge.text}</span> : <span className="mono-label">Project</span>}
                  <Status p={p} />
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="card-text clamp-3">{p.description}</p>
                {p.architecture?.[0] && (
                  <p className="arch-line"><i className="fas fa-diagram-project" aria-hidden="true"></i>{p.architecture[0]}</p>
                )}
                <Tech items={p.tech} max={4} />
                <Links p={p} onOpenCaseStudy={onOpenCaseStudy} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
