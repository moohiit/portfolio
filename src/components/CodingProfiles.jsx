import SectionTitle from "./SectionTitle.jsx";
import { codingProfiles } from "../data.js";

export default function CodingProfiles() {
  return (
    <section id="coding-profiles">
      <div className="container">
        <SectionTitle number="06">Coding Profiles</SectionTitle>

        <div className="profiles-grid">
          {codingProfiles.map((p) => (
            <a
              className={"profile-card " + p.cls}
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="profile-card-icon"><i className={p.icon}></i></div>
              <div className="profile-card-body">
                <h3 className="profile-card-name">{p.name}</h3>
                <span className="profile-card-handle">{p.handle}</span>
                <p className="profile-card-stats">{p.stats}</p>
              </div>
              <i className="fas fa-arrow-up-right-from-square profile-card-arrow"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
