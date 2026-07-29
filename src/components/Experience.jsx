import SectionTitle from "./SectionTitle.jsx";
import { experience } from "../data.js";

function currentDuration(startDateStr) {
  const startDate = new Date(startDateStr);
  const currentDate = new Date();
  let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += currentDate.getMonth();
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const days = Math.floor(
    (currentDate - new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) / (1000 * 60 * 60 * 24)
  );
  let text = "";
  if (years > 0) text += `${years} year${years > 1 ? "s" : ""} `;
  if (remainingMonths > 0) text += `${remainingMonths} month${remainingMonths > 1 ? "s" : ""} `;
  if (years === 0 && remainingMonths === 0) text += `${days} day${days > 1 ? "s" : ""}`;
  return text.trim();
}

export default function Experience({ onOpenCaseStudy }) {
  return (
    <section id="experience">
      <div className="container">
        <SectionTitle number="02">Work Experience</SectionTitle>

        <div className="timeline">
          {experience.map((job) => (
            <div className={"timeline-item" + (job.current ? " timeline-item--current" : "")} key={job.company}>
              <div className="timeline-date">{job.date}</div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-position">
                    {job.position}
                    {job.current && <span className="current-badge">Current</span>}
                  </h3>
                  <div className="timeline-company">
                    {job.company}
                    <span className={"company-tag " + job.tagClass}>{job.tag}</span>
                    <span className="experience-duration">
                      {job.current ? currentDuration(job.startDate) : job.duration}
                    </span>
                  </div>
                </div>
                <p className="timeline-description">{job.description}</p>
                <div className="timeline-details">
                  {job.details.map((d, i) => (
                    <div className="detail-item" key={i}>
                      <i className={d.icon}></i>
                      <span>{d.text}</span>
                    </div>
                  ))}
                </div>
                <div className="tech-stack">
                  {job.tech.map((t) => (
                    <span className="tech-item" key={t}>{t}</span>
                  ))}
                </div>
                {job.storyKey && (
                  <button
                    className="project-link project-link--story timeline-story-btn"
                    onClick={() => onOpenCaseStudy(job.storyKey)}
                  >
                    <i className="fas fa-book-open"></i> Read the build story
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
