// Real usage signals for the Skills section, derived from the tech lists in
// data.js (projects and jobs) instead of self-rated percentages.
import { caseStudies, experience, projects } from "../data.js";

// "Fastify 5" -> "fastify", "React.js" -> "react", "JavaScript (ES6+)" -> "javascript".
export function norm(name) {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+\d+(\.\d+)*$/, "")
    .replace(/\.js$/, "")
    .trim();
}

// Skill names whose project/job spelling differs. Keys and values are normalised.
const ALIASES = {
  "tailwind css": ["tailwind"],
  "git & github": ["git", "github"],
  razorpay: ["payment gateway"],
  "cloudflare workers & pages": ["cloudflare workers", "cloudflare pages"],
  "prometheus & grafana": ["prometheus", "grafana", "prometheus/grafana"],
  "openapi / swagger": ["openapi", "swagger"],
  "jwt/oauth2 authentication": ["jwt", "jwt auth", "oauth2"],
  "pnpm + turborepo": ["pnpm", "turborepo"],
  "ci/cd pipelines": ["ci/cd"],
  mongodb: ["mongodb atlas vector search"],
  testing: ["vitest", "jest"],
  "react native": ["expo", "expo router"],
};

// Skills that are mostly named in prose (descriptions, architecture notes,
// build stories, job details) rather than in the tech chips.
const IN_TEXT = {
  "webhooks & hmac signing": /\bhmac\b|webhook/i,
  "outbox / event-driven design": /\boutbox\b/i,
  nginx: /\bnginx\b/i,
  pm2: /\bpm2\b/i,
  "ci/cd pipelines": /\bci\b|ci\/cd/i,
  "self-hosted ci runners": /self-hosted ci/i,
  "aws s3": /\baws s3\b/i,
  "google cloud platform": /\bgoogle cloud\b/i,
  "google maps api": /\bgoogle maps\b/i,
  razorpay: /\brazorpay\b/i,
  "openapi / swagger": /\bswagger\b|\bopenapi\b/i,
  sentry: /\bsentry\b/i,
  zod: /\bzod\b/i,
  redis: /\bredis\b/i,
  "socket.io": /socket\.io/i,
  docusaurus: /docusaurus/i,
  "jwt/oauth2 authentication": /\bjwt\b/i,
};

const studyText = (key) => (key && caseStudies[key] ? caseStudies[key].sections.map((s) => s.body).join(" ") : "");
const SOURCES = {
  projects: projects.map((p) => ({
    title: p.title,
    tech: p.tech,
    text: [p.description, ...(p.architecture || []), studyText(p.storyKey)].join(" "),
  })),
  roles: experience.map((j) => ({
    title: j.company,
    startDate: j.startDate,
    date: j.date,
    tech: j.tech,
    text: [j.description, ...j.details.map((d) => d.text)].join(" "),
  })),
};

function matcher(skill) {
  const key = norm(skill);
  const names = new Set([key, ...(ALIASES[key] || [])]);
  const re = IN_TEXT[key];
  return (src) => src.tech.some((t) => names.has(norm(t))) || Boolean(re && re.test(src.text));
}

// For one skill category: which projects use it, how many roles used it, and
// for each item, how many projects and roles mention it.
export function categoryUsage(cat) {
  const matchers = cat.items.map((item) => ({ item, uses: matcher(item) }));
  const usesAny = (src) => matchers.some((m) => m.uses(src));

  const projectHits = SOURCES.projects.map((p) => ({ title: p.title, used: usesAny(p) }));
  const roles = SOURCES.roles.filter(usesAny);
  const items = matchers
    .map(({ item, uses }, order) => ({
      item,
      order,
      projects: SOURCES.projects.filter(uses).length,
      roles: SOURCES.roles.filter(uses).length,
    }))
    .map((x) => ({ ...x, count: x.projects + x.roles }))
    // Most-used first; ties keep the order written in data.js.
    .sort((a, b) => b.count - a.count || a.order - b.order);

  return {
    projectHits,
    projectCount: projectHits.filter((p) => p.used).length,
    roleCount: roles.length,
    // First year a role used it ("June 2024 - …" -> 2024). Regex, not Date(), so every browser agrees.
    since: roles.length ? Math.min(...roles.map((j) => Number((j.startDate || j.date).match(/\d{4}/)[0]))) : null,
    items,
  };
}
