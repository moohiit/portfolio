# Mohit Patel — Portfolio

Personal portfolio of **Mohit Patel**, Backend Developer at Quikkred (Fintech) — live at **[mohitpatel.org](https://mohitpatel.org/)**.

Built as a fully static, serverless React app: no backend server, deployable to any static host. The contact form posts to Web3Forms, and all dynamic data (GitHub stats, repositories, visitor counts) is fetched client-side from public APIs.

## Sections

1. **Hero** — WebGL shader background, display-type name reveal, typewriter roles, and a "live console" card (experience stats, the repo currently being built from the GitHub API, stack health)
2. **What I Do** — full-stack apps, AI integrations, mobile apps, API design & DevOps
3. **Selected Work** — AI Playground (featured), Splitzy (Google Play), ShopEase, PrepAI, SastaGram, Watchman, with build-story case studies
4. **Experience** — Quikkred (Backend Developer, current) · Life Layer Health Solutions · Ducat Academy, on a scroll-drawn timeline
5. **Impact** — Splitzy on Play Store, live products, 10x API performance, certifications
6. **Skills** — categorized skill cards with animated proficiency meters
7. **Open Source** — GitHub stats, contribution heatmap, top repositories (live from the GitHub API) and coding profiles
8. **Credentials** — MCA (AKTU) & B.Sc (Invertis), certificate gallery
9. **Lab** — terminal chatbot, auto-typing code showcase, toolbox, Spotify recently-played, and the secret arcade (**Ctrl+G**: Snake, Memory Match, Typing Test)
10. **Contact** — Web3Forms-powered form, copy-to-clipboard email, phone/WhatsApp/LinkedIn

Site-wide: **⌘K / Ctrl+K command palette**, dark/light theme, smooth scrolling, scroll progress bar, GoatCounter visitor & resume-download counters.

Testimonials and Technical Writing sections exist in the code but stay hidden until real recommendations / published articles are added in `src/data.js`.

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
├── index.html          # SEO meta tags, JSON-LD structured data, fonts
├── public/             # served at site root unchanged:
│   ├── sitemap.xml, sastagram.sitemap.xml, shopease.sitemap.xml
│   ├── robots.txt, dns.config
│   ├── files/MohitPatelResume.pdf
│   └── images/
├── src/
│   ├── data.js         # ALL site content — edit this to update the site
│   ├── App.jsx         # section composition + global effects (scroll, spotlight, theme, shortcuts)
│   ├── components/     # one component per section
│   ├── lib/            # GitHub API client, smooth-scroll helpers
│   └── styles/theme.css # design tokens + all component styles
```

## Deployment

Static hosting (currently GoViralHost shared hosting):

1. `npm run build`
2. Upload the **contents of `dist/`** into `public_html`

SEO files (`sitemap.xml`, `robots.txt`, resume PDF) are emitted at the site root with unchanged URLs, so search-engine indexing carries over between deploys.

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
