// Shared access to the public GitHub REST API.
//
// The unauthenticated limit is 60 requests per hour per client IP, and three
// components (Hero, GitHubActivity, FeaturedRepos) want data from it on every
// page load. Two of them need the very same repo list, and React StrictMode
// runs effects twice in development, so without coordination one dev reload
// costs 6 requests. This module makes each resource cost at most one request
// per page load (concurrent callers share the in-flight promise) and remembers
// successful responses in sessionStorage for a short while so a reload within
// the same tab costs nothing.
//
// Pure client-side: no token, no proxy. When the limit is hit the fetch
// rejects and every caller falls back to its static content.

const API = "https://api.github.com";
export const GITHUB_USERNAME = "moohiit";

const FETCH_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_PREFIX = "gh-cache:";

const inflight = new Map();

function readCache(url) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + url);
    if (!raw) return null;
    const { at, value } = JSON.parse(raw);
    if (typeof at !== "number" || Date.now() - at > CACHE_TTL_MS) return null;
    return value;
  } catch {
    return null;
  }
}

function writeCache(url, value) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + url, JSON.stringify({ at: Date.now(), value }));
  } catch {
    /* private mode / quota: caching is only an optimisation */
  }
}

export function fetchGitHub(path) {
  const url = API + path;
  const cached = readCache(url);
  if (cached !== null) return Promise.resolve(cached);
  if (inflight.has(url)) return inflight.get(url);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const request = fetch(url, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
      return res.json();
    })
    .then((json) => {
      writeCache(url, json);
      return json;
    })
    .finally(() => {
      clearTimeout(timer);
      inflight.delete(url);
    });
  inflight.set(url, request);
  return request;
}

// Profile: public_repos / followers / following.
export function fetchProfile() {
  return fetchGitHub(`/users/${GITHUB_USERNAME}`);
}

// Every public repo, most recently pushed first. One request serves both the
// hero's "currently building" card and the featured repositories grid.
export function fetchRepos() {
  return fetchGitHub(`/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`);
}
