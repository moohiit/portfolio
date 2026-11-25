// "Live systems" block for the hero console: each product is probed from the
// visitor's browser (see lib/status.js), so the "mohit@prod:~/status" console
// shows real, current numbers instead of fixed percentages.
import { useCallback, useEffect, useRef, useState } from "react";
import { statusConfig } from "../data.js";
import { hostOf, probe, uptimeRobot } from "../lib/status.js";

const initial = () =>
  statusConfig.services.map((s) => ({ ...s, host: hostOf(s.url), state: "checking", ms: null, uptime: null }));

export function useLiveStatus(startDelayMs = 0) {
  const [rows, setRows] = useState(initial);
  const [checkedAt, setCheckedAt] = useState(null);
  const [checking, setChecking] = useState(false);
  const watchRef = useRef(null);
  const busy = useRef(false);

  const run = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setChecking(true);
    const [probes, robot] = await Promise.all([
      Promise.all(statusConfig.services.map((s) => probe(s.probe || s.url))),
      uptimeRobot(statusConfig.uptimeRobotKey),
    ]);
    setRows(
      statusConfig.services.map((s, i) => {
        const host = hostOf(s.url);
        const monitor = robot[host];
        const up = monitor?.up ?? probes[i].up;
        return { ...s, host, state: up ? "up" : "down", ms: probes[i].ms, uptime: monitor?.uptime ?? null };
      })
    );
    setCheckedAt(new Date());
    setChecking(false);
    busy.current = false;
  }, []);

  // First check once the hero has settled, then every refreshSeconds while
  // the console is on screen and the tab is visible.
  useEffect(() => {
    let inView = true;
    const el = watchRef.current;
    const io = el
      ? new IntersectionObserver(([e]) => {
          inView = e.isIntersecting;
        })
      : null;
    if (io) io.observe(el);
    const first = setTimeout(run, startDelayMs);
    const every = setInterval(() => {
      if (inView && document.visibilityState === "visible") run();
    }, statusConfig.refreshSeconds * 1000);
    return () => {
      clearTimeout(first);
      clearInterval(every);
      io?.disconnect();
    };
  }, [run, startDelayMs]);

  const done = rows.filter((r) => r.state !== "checking");
  const up = rows.filter((r) => r.state === "up").length;
  const summary = done.length === 0 ? null : { up, total: rows.length };
  return { rows, checkedAt, checking, refresh: run, summary, watchRef };
}

function value(r) {
  if (r.state === "checking") return "…";
  if (r.state === "down") return "unreachable";
  const ms = r.ms != null ? `${r.ms} ms` : "up";
  return r.uptime != null ? `${r.uptime.toFixed(2)}% · ${ms}` : ms;
}

export default function LiveStatus({ status }) {
  const { rows, checkedAt, checking, refresh, watchRef } = status;
  const time = checkedAt?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const hasUptime = rows.some((r) => r.uptime != null);

  return (
    <div className="console-status" ref={watchRef}>
      <div className="status-head">
        <span className="mono-label">Live systems</span>
        <button
          type="button"
          className="status-refresh"
          onClick={refresh}
          disabled={checking}
          aria-label="Check again"
          title="Check again"
        >
          <i className={"fas fa-rotate" + (checking ? " fa-spin" : "")} aria-hidden="true"></i>
        </button>
      </div>
      <ul className="status-list">
        {rows.map((r) => (
          <li className={"status-row is-" + r.state} key={r.url}>
            <span className="status-dot" aria-hidden="true"></span>
            <a className="status-name" href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
            <span className="status-host">{r.host}</span>
            <span className="status-value">
              <span className="sr-only">{r.state === "checking" ? "checking" : r.state === "up" ? "reachable, " : ""}</span>
              {value(r)}
            </span>
            <span
              className="status-latency"
              aria-hidden="true"
              style={{ "--lat": r.state === "up" && r.ms != null ? Math.min(r.ms / 900, 1) : 0 }}
            ></span>
          </li>
        ))}
      </ul>
      <p className="status-note">
        {hasUptime ? "30-day uptime from UptimeRobot · " : "Probed from your browser · "}
        {time ? `checked ${time}` : "checking now"}
      </p>
    </div>
  );
}
