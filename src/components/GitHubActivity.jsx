import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

const USERNAME = "moohiit";
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildWeeks(contributionMap) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const totalDays = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  const weekCount = Math.ceil(totalDays / 7);

  const months = [];
  let lastMonth = -1, lastMonthW = -1;
  for (let w = 0; w < weekCount; w++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + w * 7);
    const month = d.getMonth();
    if (month !== lastMonth) {
      if (lastMonthW === -1 || w - lastMonthW >= 3) {
        months.push({ label: MONTH_NAMES[month], col: w + 1 });
        lastMonthW = w;
      }
      lastMonth = month;
    }
  }

  const weeks = [];
  for (let w = 0; w < weekCount; w++) {
    const cells = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + w * 7 + d);
      if (cellDate > today) {
        cells.push({ level: 0, future: true, key: w + "-" + d });
      } else {
        const dateStr = cellDate.toISOString().split("T")[0];
        const count = contributionMap[dateStr] || 0;
        let level = 0;
        if (count >= 8) level = 4;
        else if (count >= 5) level = 3;
        else if (count >= 3) level = 2;
        else if (count >= 1) level = 1;
        cells.push({
          level,
          key: w + "-" + d,
          title: `${dateStr}: ${count} contribution${count !== 1 ? "s" : ""}`,
        });
      }
    }
    weeks.push(cells);
  }
  return { weeks, months };
}

export default function GitHubActivity() {
  const [ghStats, setGhStats] = useState({ repos: "--", followers: "--", following: "--", contributions: "--" });
  const [heatmap, setHeatmap] = useState({ weeks: [], months: [] });
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    (async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`https://api.github.com/users/${USERNAME}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("GitHub API error");
        const user = await res.json();

        const contributionMap = {};
        try {
          for (let page = 1; page <= 3; page++) {
            const evRes = await fetch(
              `https://api.github.com/users/${USERNAME}/events/public?per_page=100&page=${page}`
            );
            if (!evRes.ok) break;
            const events = await evRes.json();
            if (events.length === 0) break;
            events.forEach((event) => {
              const date = event.created_at.split("T")[0];
              contributionMap[date] = (contributionMap[date] || 0) + 1;
            });
          }
        } catch { /* partial data is fine */ }

        const total = Object.values(contributionMap).reduce((a, b) => a + b, 0);
        setGhStats({
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          contributions: total > 0 ? total + "+" : "100+",
        });
        setHeatmap(buildWeeks(contributionMap));
      } catch {
        // Fallback data when the API is unavailable / rate-limited
        const map = {};
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          map[d.toISOString().split("T")[0]] = Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0;
        }
        setGhStats({ repos: "20+", followers: "10+", following: "15+", contributions: "100+" });
        setHeatmap(buildWeeks(map));
      }
    })();
  }, []);

  return (
    <section id="github-activity">
      <div className="container">
        <SectionTitle number="04">GitHub Activity</SectionTitle>

        <div className="github-heatmap-card">
          <div className="github-profile-row">
            <img src="https://avatars.githubusercontent.com/u/109367447?v=4" alt="Mohit Patel" className="github-avatar" loading="lazy" />
            <div className="github-profile-info">
              <h3 className="github-username">moohiit</h3>
              <p className="github-bio">Full Stack Developer | MERN Stack</p>
            </div>
            <a href="https://github.com/moohiit" className="btn-outline github-follow-btn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i> Follow
            </a>
          </div>

          <div className="github-stats-row">
            <div className="github-stat">
              <span className="github-stat-value">{ghStats.repos}</span>
              <span className="github-stat-label">Repos</span>
            </div>
            <div className="github-stat">
              <span className="github-stat-value">{ghStats.followers}</span>
              <span className="github-stat-label">Followers</span>
            </div>
            <div className="github-stat">
              <span className="github-stat-value">{ghStats.following}</span>
              <span className="github-stat-label">Following</span>
            </div>
            <div className="github-stat">
              <span className="github-stat-value">{ghStats.contributions}</span>
              <span className="github-stat-label">Contributions (Year)</span>
            </div>
          </div>

          <div className="heatmap-container">
            <div className="heatmap-months">
              {heatmap.months.map((m, i) => (
                <span key={i} style={{ gridColumnStart: m.col }}>{m.label}</span>
              ))}
            </div>
            <div className="heatmap-grid-wrapper">
              <div className="heatmap-days">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="heatmap-grid">
                {heatmap.weeks.map((cells, w) => (
                  <div className="heatmap-week" key={w}>
                    {cells.map((c) => (
                      <div
                        key={c.key}
                        className="heatmap-cell"
                        data-level={c.level}
                        style={c.future ? { opacity: 0.3 } : undefined}
                        title={c.title}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="heatmap-legend">
              <span className="heatmap-legend-label">Less</span>
              <span className="heatmap-cell" data-level="0"></span>
              <span className="heatmap-cell" data-level="1"></span>
              <span className="heatmap-cell" data-level="2"></span>
              <span className="heatmap-cell" data-level="3"></span>
              <span className="heatmap-cell" data-level="4"></span>
              <span className="heatmap-legend-label">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
