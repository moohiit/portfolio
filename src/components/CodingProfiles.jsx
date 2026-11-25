import { codingProfiles } from "../data.js";

export default function CodingProfiles() {
  return (
    <div className="profiles-row" id="coding-profiles">
      {codingProfiles.map((p) => (
        <a className="card spot profile-link" key={p.name} href={p.link} target="_blank" rel="noopener noreferrer">
          <span className="icon-tile icon-tile--sm"><i className={p.icon} aria-hidden="true"></i></span>
          <span className="profile-text">
            <span className="profile-name">{p.name}</span>
            <span className="profile-handle">{p.handle}</span>
          </span>
          <i className="fas fa-arrow-up-right-from-square profile-arrow" aria-hidden="true"></i>
        </a>
      ))}
    </div>
  );
}
