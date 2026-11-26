# Mohit Patel — Portfolio

Personal portfolio of **Mohit Patel**, Backend Developer at Quikkred (Fintech) — live at **[mohitpatel.org](https://mohitpatel.org/)**.

Built as a fully static, serverless React app: no backend server, deployable to any static host. The contact form posts to Web3Forms, and all dynamic data (GitHub stats, repositories, visitor counts) is fetched client-side from public APIs.

## Sections

1. **Hero** — WebGL shader background over a perspective grid floor, display-type name reveal, typewriter roles, and a "live console" card (experience stats, what's being built now, and live reachability and latency for the products, probed from the visitor's browser)
2. **What I Do** — full-stack apps, AI integrations, mobile apps, API design & DevOps
3. **Selected Work** — Fluxus Forge and AI Playground (featured), Quikkred Collect, the Quikkred API, Splitzy, ShopEase, PrepAI, SastaGram and Watchman, with category filters and build-story case studies that include an animated request-flow diagram
4. **Experience** — Quikkred (Backend Developer, current) · Life Layer Health Solutions · Ducat Academy, on a scroll-drawn timeline with impact numbers per role
5. **Impact** — Splitzy on Play Store, live products, 10x API performance, certifications
6. **Skills** — skill cards with usage counted from the projects and jobs on the page (no self-rated percentages)
7. **Open Source** — GitHub stats, contribution heatmap, top repositories (live from the GitHub API) and coding profiles
8. **Credentials** — MCA (AKTU) & B.Sc (Invertis), certificate gallery
9. **Lab** — terminal chatbot, a signed-API playground (HMAC signing, replay, tampering and idempotency keys against an in-browser mock server), auto-typing code showcase, toolbox, Spotify recently-played, and the secret arcade (**Ctrl+G**: Snake, Memory Match, Typing Test)
10. **Contact** — Web3Forms-powered form, copy-to-clipboard email, phone/WhatsApp/LinkedIn

Site-wide: **⌘K / Ctrl+K command palette**, dark/light theme, an ambient background (drifting aurora that re-tints per section, a tech grid with a cursor spotlight and light pulses, switchable off from the palette), section titles that decode from random glyphs, smooth scrolling, scroll progress bar, GoatCounter visitor & resume-download counters.

The Testimonials section stays hidden until real recommendations are added in `src/data.js`. The Writing section lists published dev.to posts (`blogConfig` in `src/data.js`); add each new post to `manualPosts` too, because dev.to's API can serve a cached list for a day or more. Post drafts are kept locally in `drafts/`, which is git-ignored so unpublished writing never reaches this public repo.

## Tech Stack

- **React 18** + **Vite 5** — static build, no SSR needed
- **Motion** (Framer Motion) — scroll reveals, split-text headings, layout animations, modals
- **Lenis** — smooth scrolling
- **OGL** — the hero's WebGL shader (lazy-loaded)
- Token-based CSS design system in `src/styles/theme.css` — no CSS framework; light mode only redefines tokens
- Fonts: General Sans (Fontshare), Inter and JetBrains Mono (Google Fonts)
- Public APIs: GitHub (stats, repos), github-contributions-api (heatmap), dev.to (articles), GoatCounter (analytics), Web3Forms (contact)

## Development

```bash
npm install
npm run dev       # local dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project Structure

```
├── index.html          # SEO meta tags, JSON-LD identity graph, static profile for crawlers, fonts
├── public/             # served at site root unchanged:
│   ├── sitemap.xml, sastagram.sitemap.xml, shopease.sitemap.xml
│   ├── robots.txt, dns.config
│   ├── files/MohitPatelResume.pdf
│   └── images/
├── src/
│   ├── data.js         # ALL site content — edit this to update the site
│   ├── App.jsx         # section composition + global effects (scroll, spotlight, theme, shortcuts)
│   ├── components/     # one component per section
│   ├── lib/            # GitHub API client, smooth scroll, live status probes, skill usage
│   └── styles/theme.css # design tokens + all component styles
```

## Deployment

Static hosting (currently GoViralHost shared hosting):

1. `npm run build`
2. Upload the **contents of `dist/`** into `public_html`

SEO files (`sitemap.xml`, `robots.txt`, resume PDF) are emitted at the site root with unchanged URLs, so search-engine indexing carries over between deploys.

## Resume

`public/files/MohitPatelResume.pdf` is exported from `resume/resume.html`: open it in Chrome → Print → Save as PDF (A4, margins "None", "Background graphics" on). It must stay one page. Keep its content in step with `src/data.js`, and update the resume's `<lastmod>` in `public/sitemap.xml` when it changes.

## Branches

- `main` — React app (current)
- `backup/html-portfolio` — archived original HTML/CSS version

## License

MIT

## Contact

- Website: [mohitpatel.org](https://mohitpatel.org/)
- GitHub: [@moohiit](https://github.com/moohiit)
- LinkedIn: [Mohit Patel](https://www.linkedin.com/in/moohiitpatel/)
- Email: mohitpatel.inbox@gmail.com
