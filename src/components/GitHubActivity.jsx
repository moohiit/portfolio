import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { fetchProfile, GITHUB_USERNAME } from "../lib/github.js";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Public, token-free mirror of the GitHub contribution graph (full 12 months, per-day level 0-4).
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const FETCH_TIMEOUT_MS = 8000;
const DAY_MS = 24 * 60 * 60 * 1000;
// One week column is an 11px cell plus the 3px gap (.heatmap-cell / .heatmap-grid in styles.css).
const WEEK_COLUMN_PX = 14;
// Shown when api.github.com is unavailable, which happens routinely: the unauthenticated
// limit is 60 requests/hour per client IP. Live values rounded down (36 / 12 / 13 in Sep 2026).
const PROFILE_FALLBACK = { repos: "35+", followers: "10+", following: "10+" };
const UNAVAILABLE = "n/a";

function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
      return res.json();
    })
    .finally(() => clearTimeout(timeoutId));
}

// "YYYY-MM-DD" -> UTC midnight, so weekday/month math never shifts with the visitor timezone.
function parseDay(dateStr) {
  return new Date(dateStr + "T00:00:00Z");
}

function formatDay(date) {
  return `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

// Returns a clean, date-sorted, duplicate-free [{ date, count, level }] or null when the
// payload is not what we expect.
function normalizeContributions(payload) {
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.contributions)) return null;
  const days = [];
  for (const item of payload.contributions) {
    if (!item || typeof item.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) return null;
    const date = parseDay(item.date);
    if (Number.isNaN(date.getTime())) return null;
    const count = Number(item.count);
    const level = Number(item.level);
    if (!Number.isFinite(count) || !Number.isFinite(level)) return null;
    days.push({ date, count: Math.max(0, Math.round(count)), level: Math.min(4, Math.max(0, Math.round(level))) });
  }
  if (days.length === 0) return null;
  days.sort((a, b) => a.date - b.date);
  for (let i = 1; i < days.length; i++) {
    if (days[i].date.getTime() === days[i - 1].date.getTime()) return null;
  }
  return days;
}

// One label per month, above the first column whose Sunday falls in that month.
// A partial month at the left edge keeps its label only when it is at least three
// columns wide; otherwise the label goes to the first full month instead (this is
// what GitHub does), so a full month is never the one left unlabelled.
function monthLabels(gridStart, weekCount) {
  const months = [];
  let lastMonth = -1;
  for (let w = 0; w < weekCount; w++) {
    const month = new Date(gridStart.getTime() + w * 7 * DAY_MS).getUTCMonth();
    if (month === lastMonth) continue;
    lastMonth = month;
    const prev = months[months.length - 1];
    if (prev && w - (prev.col - 1) < 3) {
      if (prev.col === 1) months.pop();
      else continue;
    }
    months.push({ label: MONTH_NAMES[month], col: w + 1 });
  }
  return months;
}

// Sunday-first week columns. Each cell's slot is derived from its own date, so a
// gap in the payload can never shift later days onto the wrong weekday row; a
// missing day simply renders as an empty level-0 cell.
function buildWeeks(days) {
  const first = days[0].date;
  const last = days[days.length - 1].date;
  const leadPad = first.getUTCDay();
  const gridStart = new Date(first.getTime() - leadPad * DAY_MS);
  const slotCount = Math.round((last.getTime() - gridStart.getTime()) / DAY_MS) + 1;
  const weekCount = Math.ceil(slotCount / 7);

  const bySlot = new Array(weekCount * 7);
  for (const day of days) {
    bySlot[Math.round((day.date.getTime() - gridStart.getTime()) / DAY_MS)] = {
      level: day.level,
      title: `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDay(day.date)}`,
    };
  }

  const weeks = [];
  for (let w = 0; w < weekCount; w++) {
    const cells = [];
    for (let d = 0; d < 7; d++) {
      const slot = w * 7 + d;
      const key = w + "-" + d;
      const day = bySlot[slot];
      if (day) cells.push({ ...day, key });
      else if (slot < leadPad) cells.push({ level: 0, pad: true, key });
      else if (slot >= slotCount) cells.push({ level: 0, future: true, key });
      else cells.push({ level: 0, key });
    }
    weeks.push(cells);
  }
  return { weeks, months: monthLabels(gridStart, weekCount) };
}

// The API window is [the Sunday on or before today-365d, today]: 53 columns, or 54
// when today is a Sunday. Sizing the placeholder the same way avoids a width jump.
function expectedWeekCount(now = new Date()) {
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const leadPad = new Date(today - 365 * DAY_MS).getUTCDay();
  return Math.ceil((leadPad + 366) / 7);
}

// Placeholder grid shown while the request is in flight, so the card keeps its final size.
function buildSkeleton() {
  const weeks = [];
  const weekCount = expectedWeekCount();
  for (let w = 0; w < weekCount; w++) {
    const cells = [];
    for (let d = 0; d < 7; d++) cells.push({ level: 0, future: true, key: w + "-" + d });
    weeks.push(cells);
  }
  return { weeks, months: [] };
}

export default function GitHubActivity() {
  const [ghStats, setGhStats] = useState({ repos: "--", followers: "--", following: "--", contributions: "--" });
  // undefined = loading, null = unavailable (block hidden), object = { weeks, months }
  const [heatmap, setHeatmap] = useState(undefined);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    (async () => {
      const [profileResult, contribResult] = await Promise.allSettled([
        fetchProfile(),
        fetchJson(CONTRIBUTIONS_URL),
      ]);

      let profile = PROFILE_FALLBACK;
      if (profileResult.status === "fulfilled" && profileResult.value && typeof profileResult.value === "object") {
        const user = profileResult.value;
        profile = {
          repos: Number.isFinite(user.public_repos) ? user.public_repos : profile.repos,
          followers: Number.isFinite(user.followers) ? user.followers : profile.followers,
          following: Number.isFinite(user.following) ? user.following : profile.following,
        };
      }

      let contributions = UNAVAILABLE;
      let nextHeatmap = null;
      if (contribResult.status === "fulfilled") {
        const days = normalizeContributions(contribResult.value);
        if (days) {
          const reported = Number(contribResult.value.total && contribResult.value.total.lastYear);
          const total = Number.isFinite(reported) ? reported : days.reduce((sum, d) => sum + d.count, 0);
          contributions = total.toLocaleString("en-US");
          nextHeatmap = buildWeeks(days);
        }
      }

      setGhStats({ ...profile, contributions });
      setHeatmap(nextHeatmap);
    })().catch(() => {
      setHeatmap(null);
      setGhStats((prev) => ({ ...prev, contributions: UNAVAILABLE }));
    });
  }, []);

  const loading = heatmap === undefined;
  const grid = loading ? buildSkeleton() : heatmap;

  return (
    <section id="github-activity">
      <div className="container">
        <SectionTitle number="07">GitHub Activity</SectionTitle>

        <div className="github-heatmap-card">
          <div className="github-profile-row">
            <img src="https://avatars.githubusercontent.com/u/109367447?v=4" alt="Mohit Patel" className="github-avatar" loading="lazy" />
            <div className="github-profile-info">
              <h3 className="github-username">{GITHUB_USERNAME}</h3>
              <p className="github-bio">Full Stack Developer | MERN Stack</p>
            </div>
            <a href={`https://github.com/${GITHUB_USERNAME}`} className="btn-outline github-follow-btn" target="_blank" rel="noopener noreferrer">
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

          {grid && (
            <div className="heatmap-container" aria-busy={loading || undefined}>
              <div
                className="heatmap-months"
                style={{ gridTemplateColumns: `repeat(${grid.weeks.length}, ${WEEK_COLUMN_PX}px)` }}
              >
                {loading ? (
                  <span style={{ gridColumnStart: 1 }}>&nbsp;</span>
                ) : (
                  grid.months.map((m, i) => (
                    <span key={i} style={{ gridColumnStart: m.col }}>{m.label}</span>
                  ))
                )}
              </div>
              <div className="heatmap-grid-wrapper">
                <div className="heatmap-days">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div className="heatmap-grid">
                  {grid.weeks.map((cells, w) => (
                    <div className="heatmap-week" key={w}>
                      {cells.map((c) => (
                        <div
                          key={c.key}
                          className="heatmap-cell"
                          data-level={c.level}
                          style={c.pad ? { visibility: "hidden" } : c.future ? { opacity: 0.3 } : undefined}
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
          )}
        </div>
      </div>
    </section>
  );
}
