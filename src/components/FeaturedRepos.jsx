import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { fetchRepos, GITHUB_USERNAME } from "../lib/github.js";

const LANG_COLORS = {
  JavaScript: "#f7df1e", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#563d7c",
  PHP: "#4f5d95", Java: "#b07219", Python: "#3572a5", Shell: "#89e051",
};

export default function FeaturedRepos() {
  const [repos, setRepos] = useState([]);
  const [failed, setFailed] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchRepos()
      .then((all) => {
        const picked = all
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6);
        if (picked.length === 0) throw new Error("No repos");
        setRepos(picked);
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      <section id="repos">
        <div className="container">
          <SectionTitle number="08">Open Source & Repositories</SectionTitle>
          <p className="repos-fallback">
            Couldn't load repositories right now — browse them directly on{" "}
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">github.com/{GITHUB_USERNAME}</a>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="repos">
      <div className="container">
        <SectionTitle number="08">Open Source & Repositories</SectionTitle>

        <div className="repos-grid">
          {repos.map((repo) => (
            <a
              className="repo-card"
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="repo-card-header">
                <i className="far fa-folder-open"></i>
                <h3 className="repo-name">{repo.name}</h3>
              </div>
              <p className="repo-desc">{repo.description || "No description provided."}</p>
              <div className="repo-meta">
                {repo.language && (
                  <span className="repo-lang">
                    <span
                      className="repo-lang-dot"
                      style={{ background: LANG_COLORS[repo.language] || "#8b949e" }}
                    ></span>
                    {repo.language}
                  </span>
                )}
                <span><i className="far fa-star"></i> {repo.stargazers_count}</span>
                <span><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="repos-more">
          <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} className="btn-outline" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
}
