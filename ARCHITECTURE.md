# How this site works

This portfolio is a deliberately **serverless static site** — there is no backend to run, patch, or pay for, yet it shows live data. This document explains the engineering choices.

## Constraints

1. **Shared hosting deploy target** — the site ships as plain files into a `public_html` folder; no Node runtime in production.
2. **SEO continuity** — the previous HTML version had indexed URLs (`/sitemap.xml`, `/robots.txt`, `/files/MohitPatelResume.pdf`, project sitemaps). None of them could change.
3. **Live data without a server** — GitHub stats, repository cards, visitor counts, and blog posts should stay current without redeploys.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 5 + React 18 | Static output, fast builds, no SSR needed for a single page |
| Motion | Motion (Framer Motion) + Lenis | Declarative scroll/entrance animations; smooth scrolling that keeps native scroll position |
| WebGL | OGL (dynamic `import()`) | ~25 KB shader renderer for the hero, loaded after first paint |
| Styling | Token-based CSS (`src/styles/theme.css`) | Every colour is a CSS variable; the light theme only redefines tokens |
| Content | Single `src/data.js` | Every string on the site lives in one editable file |

## SEO strategy

- All meta tags, Open Graph tags, and **JSON-LD structured data** live in the static `index.html`, so crawlers read them without executing JavaScript.
- **One identity graph for name searches.** The JSON-LD is a single `@graph`: a `ProfilePage` whose `mainEntity` is the `Person` (Mohit Patel, alternate name `moohiit`), on a `WebSite` named "Mohit Patel" (which Google uses as the site name in results). The Person's `sameAs` lists every public profile, and the same profiles are repeated as `<link rel="me">`. Together they tell search engines that GitHub, LinkedIn, X, LeetCode and this site belong to the same person. When a profile is added or renamed, update `sameAs`, the `rel="me"` links, `SOCIALS` in `Hero.jsx` and `codingProfiles` in `data.js` together.
- **Content in the first HTML response.** `#root` ships with a short static profile (photo, name as `<h1>`, role, summary, profile links). Crawlers that don't run JavaScript (Bing, DuckDuckGo, link previews, AI search) read it, visitors see it as the first paint, and React replaces it on mount. It must say the same thing as the rendered page.
- **Self-hosted favicons** (`favicon.ico` 48px, `favicon-192.png`, `apple-touch-icon.png`) made from the profile photo; Google shows the favicon next to the result.
- The profile photo is `images/mohit-patel.webp` (a descriptive filename helps image search), and the sitemap lists only real URLs. Search engines ignore everything after `#`, so section anchors aren't listed.
- **Link-preview image:** `og:image` / `twitter:image` point to a dated file (`images/og-mohit-patel-2026-11.png`). LinkedIn, WhatsApp and X cache preview images by URL, so a redesigned card must get a **new filename**; overwriting the old file is not enough. `images/og-card.png` is kept for old shares.
- SEO-critical files sit in `public/`, which Vite copies verbatim to the build root — every previously indexed URL resolves identically after the React migration.
- The single-page layout uses hash navigation, so no server-side rewrites are required on shared hosting.

## Live data, client-side

- **GitHub REST API** — profile stats, a contribution heatmap built from public events, and repository cards (sorted by stars, forks excluded). Each fetch has a timeout and a graceful fallback state, so API rate limits never break the page.
- **dev.to API** — the Technical Writing section renders only when published articles exist; no placeholder content.
- **Live status** (`lib/status.js`) — the hero console probes each product with a `no-cors` HEAD request from the visitor's browser: it resolves for any HTTP answer and fails only when the host is unreachable, so the console claims "reachable from your browser" plus a round-trip time, never uptime it can't see. Two requests per check (the faster one is shown, so DNS/TLS setup doesn't count), one retry before a site is shown as down, re-checked every 60 s while on screen. Sites that send `Cross-Origin-Resource-Policy: same-origin` (quikkred.in) are probed through a file they serve cross-origin (the favicon). Adding an UptimeRobot read-only key to `statusConfig` in `data.js` adds 30-day uptime.
- **GoatCounter** — privacy-friendly visitor and resume-download counters, fetched as JSON.
- **Web3Forms** — the contact form posts directly to their API; no form backend.

## Honest-content rules

Two sections (Testimonials, Technical Writing) are fully built but render `null` until real data exists in `data.js`. The site never shows fabricated quotes or fake article cards.

- Skills show usage, not self-ratings: `lib/skills.js` counts how many projects and roles in `data.js` list each skill (by tech chip, or for a few prose-only skills such as HMAC/webhooks and outbox, by a word match in the descriptions and build stories).
- Timeline impact numbers repeat only figures already stated elsewhere on the site. Add `impact` entries to a job in `data.js` to show more.
- The Lab's signed-API demo says it is a simplified, in-browser mock; nothing is sent over the network.

## Performance & accessibility

- The WebGL hero (OGL), the arcade mini-games, the build-story flow diagram and the Lab's API playground are code-split via dynamic import / `React.lazy` — they load only when needed.
- The hero shader renders at reduced resolution, pauses when off screen or in a background tab, and is skipped for reduced-motion visitors (a CSS gradient stands in).
- The ambient background (`Ambient.jsx`) animates only `transform`/`opacity`, so it stays on the compositor; the animated card borders are SVG stroke dashes on their own layer, so a frame re-rasters a thin line, not the card under it. Phones get a static aurora (no beams, no spotlight) so the glass cards are not re-blurred every frame. Measured at 59-60 fps on an integrated Intel UHD GPU at 1440×900.
- Visitors can switch the background motion off from the command palette (`data-fx="off"`, remembered per browser); the hero shader then freezes on its last frame.
- The first-visit intro counter is under one second, renders over an already-loaded page, and is skipped on repeat visits.
- `prefers-reduced-motion` disables animations globally: Motion's `reducedMotion="user"`, no Lenis, no shader, no intro, no background beams or grid floor, no heading scramble, and build-story diagrams that step by hand instead of auto-playing.
- Below-the-fold images use `loading="lazy"`.

## Deploy

```
npm run build   # → dist/
# upload dist/* to public_html on any static host
```

The old HTML version is archived on the [`backup/html-portfolio`](https://github.com/moohiit/portfolio/tree/backup/html-portfolio) branch.
