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

- All meta tags, Open Graph tags, and **JSON-LD structured data** (Person + ItemList schemas) live in the static `index.html`, so crawlers read them without executing JavaScript.
- SEO-critical files sit in `public/`, which Vite copies verbatim to the build root — every previously indexed URL resolves identically after the React migration.
- The single-page layout uses hash navigation, so no server-side rewrites are required on shared hosting.

## Live data, client-side

- **GitHub REST API** — profile stats, a contribution heatmap built from public events, and repository cards (sorted by stars, forks excluded). Each fetch has a timeout and a graceful fallback state, so API rate limits never break the page.
- **dev.to API** — the Technical Writing section renders only when published articles exist; no placeholder content.
- **GoatCounter** — privacy-friendly visitor and resume-download counters, fetched as JSON.
- **Web3Forms** — the contact form posts directly to their API; no form backend.

## Honest-content rules

Two sections (Testimonials, Technical Writing) are fully built but render `null` until real data exists in `data.js`. The site never shows fabricated quotes or fake article cards.

## Performance & accessibility

- The WebGL hero (OGL) and the arcade mini-games are code-split via dynamic import / `React.lazy` — they load only when needed.
- The hero shader renders at reduced resolution, pauses when off screen or in a background tab, and is skipped for reduced-motion visitors (a CSS gradient stands in).
- The first-visit intro counter is under one second, renders over an already-loaded page, and is skipped on repeat visits.
- `prefers-reduced-motion` disables animations globally: Motion's `reducedMotion="user"`, no Lenis, no shader, no intro.
- Below-the-fold images use `loading="lazy"`.

## Deploy

```
npm run build   # → dist/
# upload dist/* to public_html on any static host
```

The old HTML version is archived on the [`backup/html-portfolio`](https://github.com/moohiit/portfolio/tree/backup/html-portfolio) branch.
