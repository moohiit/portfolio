// Live checks for the products in the hero console.
//
// The portfolio is a static site, so the visitor's browser probes each site
// itself. A no-cors HEAD request resolves for any HTTP answer and rejects only
// when the host can't be reached (DNS, TLS, refused, timeout). That makes the
// honest claim "reachable from your browser right now", plus a round-trip time.
// The first request pays for DNS and TLS, so each check sends two and keeps
// the faster one (a warm request is what a returning user feels).
// Sites that send Cross-Origin-Resource-Policy: same-origin block this probe;
// point `probe` in data.js at a file they serve cross-origin (a favicon).

async function once(url, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const t0 = performance.now();
  try {
    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: ctrl.signal,
    });
    return Math.round(performance.now() - t0);
  } finally {
    clearTimeout(timer);
  }
}

export async function probe(url, timeoutMs = 8000) {
  try {
    // One retry before calling a site unreachable, so a dropped packet on the
    // visitor's network doesn't paint a product red.
    const cold = await once(url, timeoutMs).catch(() => new Promise((r) => setTimeout(r, 800)).then(() => once(url, timeoutMs)));
    const warm = await once(url, timeoutMs).catch(() => cold);
    return { up: true, ms: Math.min(cold, warm) };
  } catch {
    return { up: false, ms: null };
  }
}

// Optional: real uptime from UptimeRobot, using a read-only API key (which is
// meant to be public). Returns { [hostname]: { up, uptime } } or {} on failure.
export async function uptimeRobot(apiKey) {
  if (!apiKey) return {};
  try {
    const res = await fetch("https://api.uptimerobot.com/v2/getMonitors", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ api_key: apiKey, format: "json", custom_uptime_ratios: "30" }),
    });
    const data = await res.json();
    if (data.stat !== "ok") return {};
    const out = {};
    for (const m of data.monitors || []) {
      const host = hostOf(m.url);
      // 2 = up; 8 = seems down; 9 = down; 0/1 = paused or not checked yet.
      if (host) out[host] = { up: m.status === 2 ? true : m.status >= 8 ? false : null, uptime: parseFloat(m.custom_uptime_ratio) };
    }
    return out;
  } catch {
    return {};
  }
}

export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
