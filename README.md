# Mohit Patel — Portfolio

Personal portfolio of **Mohit Patel**, Backend Developer at Quikkred (Fintech) — live at **[mohitpatel.org](https://mohitpatel.org/)**.

Built as a fully static, serverless React app: no backend server, deployable to any static host. The contact form posts to Web3Forms, and all dynamic data (GitHub stats, repositories, visitor counts) is fetched client-side from public APIs.

## Sections

1. **Hero / About** — typewriter roles, social links, animated stats (2+ yrs experience, 10+ projects, 4+ live products, 5 certifications)
2. **Know Me Better** — interactive terminal chatbot (`whoami`, `skills`, `experience`, `help`…)
3. **What I Do** — full-stack apps, AI integrations, mobile apps, API design & DevOps
4. **Work Experience** — Quikkred (Backend Developer, current) · Life Layer Health Solutions · Ducat Academy
5. **Featured Projects** — AI Playground, Splitzy (AI expense tracker on Google Play), ShopEase, PrepAI, SastaGram, Watchman — with architecture notes per project
6. **Technical Skills** — categorized skill cards with proficiency bars + Chart.js radar
7. **Achievements** — Splitzy on Play Store, live products, 10x API performance, certifications
8. **Coding Profiles** — GitHub, LeetCode, GeeksforGeeks, Docker Hub, LinkedIn (`moohiit`)
9. **GitHub Activity** — live stats + contribution heatmap (GitHub API)
10. **Open Source & Repositories** — top repos fetched live from the GitHub API
11. **Code Showcase** — auto-typing code snippets (React, Express, MongoDB, Socket.io)
12. **Certificates / Education** — certificate slider; MCA (AKTU) & B.Sc (Invertis)
13. **Contact** — Web3Forms-powered form, email/phone/WhatsApp
14. **Extras** — dark/light theme, custom cursor, Spotify recently-played, secret arcade (**Ctrl+G**: Snake, Memory Match, Typing Test), GoatCounter visitor & resume-download counters

Testimonials and Technical Writing sections exist in the code but stay hidden until real recommendations / published articles are added in `src/data.js`.

## Tech Stack

- **React 18** + **Vite 5** — static build, no SSR needed
- **Chart.js 4** — skills radar
- Custom CSS design system (`src/styles.css`) + section styles (`src/extra.css`) — no CSS framework
- Public APIs: GitHub (stats, repos, events), dev.to (articles), GoatCounter (analytics), Web3Forms (contact)

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
│   ├── App.jsx         # section composition + global effects (cursor, scroll, theme)
│   ├── components/     # one component per section
│   ├── styles.css      # main design system
│   └── extra.css       # styles for newer sections
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
- Email: mohit.patel.edu@gmail.com
