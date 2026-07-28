# Mohit Patel's Portfolio

A showcase of projects, skills, and experience in web development and software engineering — built as a serverless static React app (Vite), deployed at [mohitpatel.org](https://mohitpatel.org/).

## Features
- React 18 + Vite, fully static build (no backend server)
- Dark/light theme, custom cursor, cinematic background effects
- Interactive terminal chatbot, code showcase, secret arcade (Ctrl+G)
- Live GitHub activity heatmap, stats, and featured repositories (GitHub API)
- Coding profiles, achievements, testimonials, technical writing sections
- Contact form via Web3Forms (serverless)
- SEO preserved: sitemaps, robots.txt, and resume served at the domain root

## Development
1. Clone the repo: `git clone https://github.com/moohiit/portfolio.git`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Production build: `npm run build` (output in `dist/`)

## Structure
- `index.html` — meta tags, JSON-LD structured data, fonts
- `src/data.js` — all site content (edit this to update text/projects/links)
- `src/components/` — one component per section
- `src/styles.css` — main design system; `src/extra.css` — new-section styles
- `public/` — sitemaps, robots.txt, dns.config, images, resume (emitted at site root unchanged)

## License
This project is licensed under the MIT License.

## Contact
- GitHub: [moohiit](https://github.com/moohiit)
- Email: mohit.patel.edu@gmail.com
- Linkedin: [Mohit Patel](https://www.linkedin.com/in/mohit-patel-51338a245/)
