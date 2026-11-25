// ---- Central content data for the portfolio ----
// Edit this file to update site content without touching components.

export const roles = [
  "Backend Developer",
  "Lending Platform Engineer",
  "Node.js / Fastify Engineer",
  "Fintech API Developer",
  "MERN Stack Developer",
];

export const currentlyBuilding = {
  name: "Fluxus Forge Lending Cloud",
  desc: "In development: a multi-tenant, white-label lending platform with LOS, LMS, collections and lender CRM",
  tech: ["TypeScript", "Fastify", "PostgreSQL"],
  link: "https://fluxusforge.in",
};

// ---- Live status strip in the hero console ----
// The browser probes each site directly (the portfolio has no backend), so it
// shows "reachable from your browser right now" and the round-trip time.
// For real 30-day uptime, create free UptimeRobot monitors for these URLs and
// paste the account's *read-only* API key here (it is safe to publish).
export const statusConfig = {
  uptimeRobotKey: "",
  refreshSeconds: 60,
  services: [
    // quikkred.in sends Cross-Origin-Resource-Policy: same-origin on its pages,
    // which blocks a cross-site probe; its favicon allows cross-origin loads.
    { name: "Quikkred", url: "https://quikkred.in", probe: "https://quikkred.in/favicon.ico" },
    { name: "Fluxus Forge", url: "https://fluxusforge.in" },
    { name: "Developer portal", url: "https://developers.fluxusforge.in" },
    { name: "AI Playground", url: "https://aiplayground.mohitpatel.org" },
  ],
};

export const stats = [
  { icon: "fas fa-briefcase", target: 2, label: "Years Experience" },
  { icon: "fas fa-project-diagram", target: 10, label: "Projects Completed" },
  { icon: "fas fa-rocket", target: 8, label: "Live Products" },
  { icon: "fas fa-certificate", target: 5, label: "Certifications", plus: false },
];

export const skillCategories = [
  {
    key: "frontend",
    title: "Frontend & Mobile",
    icon: "fab fa-react",
    items: [
      "React.js", "Next.js", "React Native (Expo)", "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Redux",
      "Tailwind CSS", "Bootstrap", "Material UI", "Axios", "React Hook Form",
      "Responsive Design", "UI/UX Best Practices",
    ],
  },
  {
    key: "backend",
    title: "Backend",
    icon: "fas fa-server",
    items: [
      "Node.js", "TypeScript", "Fastify", "Express.js", "PostgreSQL", "MongoDB",
      "Redis", "BullMQ", "Kysely", "Mongoose", "MySQL", "RESTful APIs", "Webhooks & HMAC signing",
      "Outbox / event-driven design", "Socket.io", "JWT/OAuth2 Authentication", "Zod", "OpenAPI / Swagger", "Java",
    ],
  },
  {
    key: "devops",
    title: "DevOps & Server",
    icon: "fas fa-terminal",
    items: [
      "Nginx (Reverse Proxy)", "PM2", "Linux (Ubuntu)", "GitHub Actions", "Docker",
      "Cloudflare Workers & Pages", "CI/CD Pipelines", "Self-hosted CI runners",
      "Prometheus & Grafana", "Sentry", "SSL / Certbot", "AWS EC2",
    ],
  },
  {
    key: "tools",
    title: "Cloud & Tools",
    icon: "fas fa-tools",
    items: [
      "Git & GitHub", "AWS S3", "Google Cloud Platform", "RazorPay",
      "Google Maps API", "Docusaurus", "Testing (Vitest, Jest)", "Playwright", "pnpm + Turborepo", "Postman", "VS Code",
    ],
  },
];

export const radarData = {
  labels: ["React.js", "Node.js", "MongoDB", "TypeScript", "Socket.io", "Redis", "AWS/Cloud", "Docker"],
  proficiency: [90, 88, 85, 70, 80, 75, 72, 55],
  interest: [85, 92, 80, 80, 75, 78, 85, 70],
};

export const experience = [
  {
    date: "February 2026 - Present",
    position: "Backend Developer",
    current: true,
    company: "Quikkred · Fluxus Forge",
    tag: "Fintech",
    tagClass: "company-tag--fintech",
    startDate: "2026-02-01",
    // Impact numbers: only figures already stated elsewhere on the site.
    impact: [
      { value: 10, suffix: "K+", label: "installs, Quikkred Collect" },
      { value: 4.6, suffix: "★", label: "rating on Google Play" },
      { value: 650, suffix: "+", label: "commits in 8 weeks, Fluxus Forge" },
      { value: 37, label: "endpoints in Credit Health" },
    ],
    storyKey: "fluxusForge",
    description:
      "Backend engineer across a lending group's product stack: the API behind the Quikkred personal-loan app, the Quikkred Collect field-collections platform, and now lead engineer and top contributor on the Fluxus Forge Lending Cloud, which is in active development.",
    details: [
      { icon: "fas fa-layer-group", text: "Lead engineer on Fluxus Forge Lending Cloud, a multi-tenant, white-label lending platform (LOS, LMS, collections, lender CRM) in active development as a TypeScript monorepo of 6 apps and 15 packages. Designed tenant isolation, the provisioning control plane and Cloudflare edge routing." },
      { icon: "fas fa-mobile-alt", text: "Built the backend, ops CRM and core app features of Quikkred Collect (10K+ installs, 4.6★ on Google Play): road-distance case matching and earnings, pincode geocoding, in-app calling and Play in-app updates." },
      { icon: "fas fa-plug", text: "Designed the multi-tenant lender API for field collections: HMAC-signed requests, push/pull/CSV ingest, a durable event store with webhook delivery and replay, and idempotent import and remittance batches. Wrote and shipped its public developer portal." },
      { icon: "fas fa-heartbeat", text: "Owned the Credit Health programme in the Quikkred loan-app API (10K+ installs): lifecycle state machine, mandate billing, referral ladder and campaigns, across 37 endpoints with 42 test files." },
      { icon: "fas fa-file-invoice", text: "Built organisation billing (GST invoices, deposit and TDS ledgers, month-end billing runs) and an investor-ledger API that reconciles disbursals and repayments per loan." },
      { icon: "fas fa-shield-alt", text: "Production reliability: outbox-based sync with HMAC webhooks and nightly reconciliation, Sentry and structured logging, Swagger and Zod across route modules, ClamAV upload scanning, capability-based RBAC, and CI with zero-downtime PM2 deploys." },
    ],
    tech: ["TypeScript", "Node.js", "Fastify", "Express", "PostgreSQL", "MongoDB", "Redis", "BullMQ", "Cloudflare Workers", "React", "React Native (Expo)", "Docker", "GitHub Actions", "PM2", "Sentry", "Prometheus/Grafana", "Playwright"],
  },
  {
    date: "June 2024 - January 2026",
    position: "Full Stack Developer",
    company: "Life Layer Health Solutions Pvt. Ltd",
    tag: "Health-tech",
    tagClass: "company-tag--healthtech",
    duration: "1 yr 8 mos",
    impact: [
      { value: 10, suffix: "x", label: "faster hot endpoints with Redis" },
      { prefix: "~", value: 70, suffix: "%", label: "fewer database queries" },
    ],
    description:
      "Developed and maintained full-stack web applications using modern technologies in a health-tech product environment.",
    details: [
      { icon: "fas fa-code", text: "Designed optimized and secure backend APIs using Node.js, Express, JWT authentication." },
      { icon: "fas fa-lock", text: "Built reusable React components and implemented state management using hooks & custom hooks." },
      { icon: "fas fa-check-circle", text: "Integrated cloud file upload using AWS S3 / Google Cloud / Utho Storage and stored URLs in database." },
      { icon: "fas fa-check-circle", text: "Implemented Redis caching to reduce DB queries and improve API performance 10x." },
      { icon: "fas fa-check-circle", text: "Worked on Socket.io for real-time events (chat, notifications, live activity status)." },
      { icon: "fas fa-check-circle", text: "Integrated Razorpay for secure payment flow." },
      { icon: "fas fa-check-circle", text: "Implemented Google Maps API for mapping and location-based services." },
      { icon: "fab fa-git-alt", text: "Worked in Agile sprint-based development using GitHub for version control and collaboration." },
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git", "Socket.io", "CI/CD", "MySQL", "JavaScript"],
  },
  {
    date: "January 2024 - June 2024",
    position: "Internship",
    company: "Ducat Academy",
    tag: "Training",
    tagClass: "company-tag--internship",
    duration: "6 months",
    impact: [
      { text: "35–40%", label: "fewer unauthorized entries" },
      { value: 10, label: "departments consolidated" },
    ],
    description: "Developed a comprehensive digital system for college security.",
    details: [
      { icon: "fas fa-shield-alt", text: "Gained hands-on experience in developing entry-exit monitoring system" },
      { icon: "fas fa-stream", text: "Streamlined gate processes and efficiently managed visitor data" },
      { icon: "fas fa-check-circle", text: "Improved campus security and reduced unauthorized entries by 35-40%" },
      { icon: "fas fa-cogs", text: "Led process re-engineering to consolidate services across 10 departments" },
      { icon: "fab fa-git-alt", text: "Utilized Git for version control to maintain and update source code" },
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"],
  },
];

export const projects = [
  {
    title: "Fluxus Forge Lending Cloud",
    categories: ["Fintech"],
    badge: { text: "Work · Lead engineer", cls: "project-badge--featured" },
    featured: true,
    storyKey: "fluxusForge",
    image: "/images/fluxusforge.webp",
    description:
      "A multi-tenant, white-label lending platform for NBFCs and fintechs. Every lender gets its own branded site and borrower app, a lender CRM (LOS, LMS, collections), a lending engine and a field-agent app, all from one codebase, with per-tenant domains and databases. Currently in active development; I'm the lead engineer and top contributor.",
    architecture: [
      "Tenant isolation by construction: tenant context on every request, one package allowed to open databases, lint rules that block hard-coded brands",
      "Control plane for self-serve signup and tenant provisioning, with a Cloudflare Worker routing each host to its tenant",
      "Entitlements generated from code: every route declares its capability (24 capabilities, 29 roles)",
    ],
    tech: ["TypeScript", "Fastify 5", "PostgreSQL", "Kysely", "MongoDB", "Redis", "Cloudflare Workers", "React", "Next.js", "Turborepo", "Docker", "Prometheus", "Playwright"],
    status: "In development",
    site: "https://fluxusforge.in",
  },
  {
    title: "Quikkred Collect — Field Collections",
    categories: ["Fintech", "Mobile"],
    badge: { text: "Work · Mobile", cls: "project-badge--mobile" },
    storyKey: "multiTenant",
    image: "/images/quikkred-collect.webp",
    description:
      "Gig-style field-collections platform: KYC-verified partners pick nearby overdue cases in the app, visit the borrower, collect payment and earn per visit or by distance. Lenders plug in through a signed API. 10K+ installs, rated 4.6★ on Google Play.",
    architecture: [
      "Road-distance case matching and earnings, with pincode geocoding and backfill jobs",
      "Lender API with HMAC auth, webhook delivery and replay, and idempotent batches",
    ],
    tech: ["Fastify", "MongoDB", "React Native (Expo)", "React", "node-cron", "Docusaurus", "FCM"],
    playStore: "https://play.google.com/store/apps/details?id=com.quikkred.collect",
  },
  {
    title: "Quikkred — Personal Loan App (API)",
    categories: ["Fintech"],
    badge: { text: "Work · Backend", cls: "project-badge--mobile" },
    image: "/images/quikkred-app.webp",
    description:
      "Backend for a digital personal-loan app covering onboarding and KYC, underwriting rules, disbursal, autopay repayment and collections. I built the Credit Health programme, the partner-sync bridge, Redis caching for the dashboards and the investor-ledger API. 10K+ installs on Google Play.",
    architecture: [
      "Transactional outbox with HMAC-verified webhooks and nightly reconciliation for partner sync",
    ],
    tech: ["Node.js", "Express 5", "MongoDB", "PostgreSQL", "Redis", "Bull", "Zod", "Swagger", "Sentry"],
    playStore: "https://play.google.com/store/apps/details?id=in.quikkred.app",
  },
  {
    title: "AI Playground — GenAI Hub",
    categories: ["GenAI", "Full-stack"],
    badge: { text: "Featured", cls: "project-badge--featured" },
    featured: true,
    storyKey: "aiPlayground",
    image: "/images/ai-playground.webp",
    description:
      "A unified platform of seven end-to-end generative AI modules: resume & JD matcher, natural-language SQL sandbox, AI-powered expense tracker (receipt OCR, spending coach, savings goals, bill-split links), streaming Markdown generator, PDF chat with RAG & page-level citations, YouTube Q&A from transcripts, and a real-time content hub.",
    architecture: [
      "MongoDB Atlas Vector Search powers RAG with page-level citations",
      "Shared service layer serves both the Next.js web app and Expo mobile app",
    ],
    tech: ["Next.js 15", "Gemini 2.5", "RAG", "MongoDB Atlas Vector Search", "Streaming", "Expo (React Native)", "Tailwind", "JWT Auth", "Cloudinary", "Zod"],
    demo: "https://aiplayground.mohitpatel.org",
    code: "https://github.com/moohiit/ai-playground",
  },
  {
    title: "Splitzy — AI Expense Tracker",
    categories: ["GenAI", "Mobile"],
    badge: { text: "Mobile", cls: "project-badge--mobile" },
    image: "/images/splitzy-feature.webp",
    description:
      "React Native (Expo) companion app for the AI Playground expense tracker. Features receipt scanning via Gemini Vision, group expense splits, spending coach chat, savings goals, shareable bill-split links, and offline-capable JWT auth — all synced to the shared backend service layer.",
    architecture: [
      "Gemini Vision OCR pipeline extracts line items from receipt photos",
      "Offline-capable JWT auth with sync to the shared Node.js API",
    ],
    tech: ["React Native", "Expo Router", "NativeWind", "Gemini Vision", "JWT Auth", "Node.js API", "MongoDB"],
    playStore: "https://play.google.com/store/apps/details?id=com.moohiit.expensetracker",
    code: "https://github.com/moohiit/ai-playground",
  },
  {
    title: "ShopEase E-commerce Website",
    categories: ["Full-stack"],
    image: "/images/ShopEase.webp",
    description:
      "An e-commerce platform where users, sellers, and admins can buy, sell, and manage users and products. Admin can manage users, products, categories, and other data. Includes all features for sellers and buyers.",
    architecture: [
      "Role-based access control for buyer / seller / admin flows",
      "Razorpay payment gateway with order lifecycle management",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Tailwind CSS", "Git", "Payment Gateway (RazorPay)"],
    demo: "https://shopease.mohitpatel.org/",
    code: "https://github.com/moohiit/e-com-shop",
  },
  {
    title: "AI Interview Prep Platform",
    categories: ["GenAI", "Full-stack"],
    image: "/images/PrepAi.webp",
    description:
      "AI-powered platform that generates interview questions and provides real-time feedback to help candidates prepare effectively.",
    architecture: [
      "AI question generation tuned per role and difficulty level",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Git"],
    demo: "https://ai-interview-prep-mohit.vercel.app/",
    code: "https://github.com/moohiit/ai-interview-prep",
  },
  {
    title: "Social Media & Messaging Platform",
    categories: ["Full-stack"],
    image: "/images/sastagram.webp",
    description:
      "A feature-rich social media platform with real-time messaging, posts, likes, comments, and follow functionality.",
    architecture: [
      "Socket.io rooms for real-time chat, notifications, and live status",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    demo: "https://sastagram.mohitpatel.org/",
    code: "https://github.com/moohiit/sastagram",
  },
  {
    title: "Watchman System (WMS)",
    categories: ["Full-stack"],
    image: "/images/watchman.webp",
    description:
      "Visitor and student tracking system for educational institutions to enhance campus security.",
    architecture: [
      "Entry/exit monitoring reduced unauthorized entries by 35-40%",
    ],
    tech: ["PHP", "Apache Server", "MySQL", "Git"],
    demo: "https://watchman.mohitpatel.org",
    code: "https://github.com/moohiit/watchman-system",
  },
];

export const certificates = [
  {
    title: "Advance Certification in Microsoft Excel",
    image: "/images/Advance Excel.webp",
    link: "https://lms.intellipaat.com/certificate-link/?Yz0yNjYwOSZ1PTE2NDkxMiZleHQ9MQ==",
  },
  {
    title: "Data Science Course",
    image: "/images/Data Science.webp",
    link: "https://lms.intellipaat.com/certificate-link/?Yz01Nzk5JnU9MTY0OTEyJmV4dD0x",
  },
  {
    title: "MongoDB Developer's Toolkit: CRUD Mastery with Node.js",
    image: "/images/MongoDB.webp",
    link: "https://www.geeksforgeeks.org/certificate/c97fe9133e67d1456dcc544d1410b7e5",
  },
  {
    title: "IBM Data Science",
    image: "/images/IBM_Data_Science.webp",
    link: "https://coursera.org/share/2acc587f7d7b0d409c3c2fb2333f522a",
  },
  {
    title: "MS SQL Developer Course",
    image: "/images/MS SQL.webp",
    link: "https://lms.intellipaat.com/certificate-link/?Yz0yODUzJnU9MTY0OTEyJmV4dD0x",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Dr. A.P.J. Abdul Kalam Technical University, Uttar Pradesh, Lucknow",
    year: "2022 - 2024",
    grade: "CGPA: 8.26",
  },
  {
    degree: "Bachelor of Science (B.Sc)",
    school: "Invertis University, Bareilly",
    year: "2017 - 2020",
    grade: "82.37%",
  },
];

// ---- NEW: Services / What I Do ----
export const services = [
  { icon: "fas fa-landmark", title: "Fintech & Lending Platforms", desc: "Loan origination and management, collections, billing and reconciliation, built multi-tenant and audit-ready." },
  { icon: "fas fa-plug", title: "Partner APIs & Integrations", desc: "HMAC-signed APIs, webhooks with replay, idempotent batch ingest, plus the OpenAPI docs and developer portal to go with them." },
  { icon: "fas fa-mobile-alt", title: "Mobile Apps", desc: "React Native (Expo) apps shipped to Google Play, from case feeds and KYC flows to in-app updates." },
  { icon: "fas fa-network-wired", title: "DevOps & Reliability", desc: "CI/CD, zero-downtime deploys, edge routing on Cloudflare, and monitoring with Sentry, Prometheus and Grafana." },
];

// ---- NEW: Coding profiles ----
// Update usernames/links and stats here.
export const codingProfiles = [
  {
    name: "GitHub",
    icon: "fab fa-github",
    handle: "@moohiit",
    link: "https://github.com/moohiit",
    stats: "20+ repos · MERN & GenAI projects",
    cls: "profile-card--github",
  },
  {
    name: "LeetCode",
    icon: "fas fa-code",
    handle: "moohiit",
    link: "https://leetcode.com/u/moohiit/",
    stats: "DSA problem solving — arrays, trees, DP",
    cls: "profile-card--leetcode",
  },
  {
    name: "GeeksforGeeks",
    icon: "fas fa-laptop-code",
    handle: "moohiit",
    link: "https://www.geeksforgeeks.org/user/moohiit/",
    stats: "Certified: MongoDB CRUD Mastery",
    cls: "profile-card--gfg",
  },
  {
    name: "Docker Hub",
    icon: "fab fa-docker",
    handle: "moohiit",
    link: "https://hub.docker.com/u/moohiit",
    stats: "Container images for deployments",
    cls: "profile-card--docker",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    handle: "moohiitpatel",
    link: "https://www.linkedin.com/in/moohiitpatel/",
    stats: "Professional network & recommendations",
    cls: "profile-card--linkedin",
  },
];

// ---- NEW: Achievements & milestones ----
export const achievements = [
  {
    icon: "fas fa-layer-group",
    title: "Lead engineer, lending cloud",
    desc: "Top contributor (650+ commits in 8 weeks) to a multi-tenant lending platform in active development: 6 apps, 15 packages and 70+ lending-engine modules so far.",
    link: "https://fluxusforge.in",
  },
  {
    icon: "fab fa-google-play",
    image: "/images/collect-icon.webp",
    title: "3 apps live on Google Play",
    desc: "Quikkred Collect (10K+ installs, 4.6★) and the Quikkred loan app (10K+) at work, plus my own Splitzy AI expense app.",
    link: "https://play.google.com/store/apps/details?id=com.quikkred.collect",
  },
  {
    icon: "fas fa-book",
    title: "Public developer portal",
    desc: "Wrote and shipped the lender API docs: HMAC signing samples in 4 languages, ingest, webhooks, payments, sandbox and go-live.",
    link: "https://developers.fluxusforge.in",
  },
  {
    icon: "fas fa-bolt",
    title: "10x API Performance",
    desc: "Redis caching layer at Life Layer cut DB queries ~70% and made hot endpoints 10x faster.",
  },
];

// ---- NEW: Testimonials ----
// The section stays hidden until real quotes are added here.
// Ask for LinkedIn recommendations, then add entries like:
//   { quote: "…", name: "Full Name", role: "Title, Company" },
export const testimonials = [];

// ---- NEW: Blog / writing ----
// The section renders only when dev.to has published articles for this
// username (or when manualPosts has entries). Article ideas worth writing:
//   - "How I Built a 7-Module GenAI Platform on the Gemini Free Tier"
//   - "Redis Caching Patterns That Made Our APIs 10x Faster"
//   - "Zero-Downtime Deploys with Nginx + PM2 + GitHub Actions"
export const blogConfig = {
  devToUsername: "moohiit",
  manualPosts: [],
};

// ---- Toolbox (/uses) ----
export const toolbox = [
  { icon: "fas fa-code", label: "Editor", value: "VS Code + Vim keybindings" },
  { icon: "fas fa-terminal", label: "Terminal", value: "zsh · iTerm2" },
  { icon: "fas fa-layer-group", label: "Core stack", value: "Node.js · Express · MongoDB · React · Next.js" },
  { icon: "fas fa-server", label: "Servers", value: "Ubuntu · Nginx · PM2 · Certbot" },
  { icon: "fas fa-rocket", label: "CI/CD", value: "GitHub Actions" },
  { icon: "fas fa-vial", label: "API & testing", value: "Postman · Jest" },
  { icon: "fas fa-robot", label: "AI tooling", value: "Gemini API · MongoDB Atlas Vector Search" },
  { icon: "fas fa-mobile-alt", label: "Mobile", value: "Expo (React Native) · NativeWind" },
];

// ---- Case studies ("Read the build story" overlays) ----
export const caseStudies = {
  aiPlayground: {
    title: "Building the AI Playground",
    subtitle: "7 GenAI modules, one platform, $0 infrastructure budget",
    // Animated request-flow diagram shown after the Architecture section.
    // Nodes sit on a 4-column x 3-row grid; each step moves a packet along one
    // edge. fromSide/toSide (l, r, t, b) override the automatic connection sides.
    diagram: {
      title: "A PDF chat question, end to end",
      nodes: [
        { id: "client", label: "Web + Expo app", sub: "one service layer", col: 0, row: 1 },
        { id: "api", label: "Next.js API route", sub: "JWT · Zod", col: 1, row: 1 },
        { id: "vector", label: "Atlas Vector Search", sub: "chunks + page numbers", col: 2, row: 0 },
        { id: "queue", label: "Rate-limit queue", sub: "free-tier budget", col: 2, row: 2 },
        { id: "gemini", label: "Gemini 2.5", sub: "flash · flash-lite", col: 3, row: 1 },
      ],
      steps: [
        { from: "client", to: "api", text: "The web app and the Expo mobile app call the same Next.js API routes. JWT auth and Zod validation sit at the boundary." },
        { from: "api", to: "vector", fromSide: "t", toSide: "l", text: "The question is matched against the PDF's chunks in MongoDB Atlas Vector Search. Page numbers are stored next to each chunk." },
        { from: "api", to: "queue", fromSide: "b", toSide: "l", text: "The prompt and the retrieved chunks go into a queue that keeps calls inside Gemini's free-tier rate limits." },
        { from: "queue", to: "gemini", fromSide: "r", toSide: "b", text: "Gemini writes the answer, using flash-lite where thinking tokens would break the budget." },
        { from: "gemini", to: "api", text: "The answer streams back to the API route as it is generated." },
        { from: "api", to: "client", text: "The client renders it token by token, with page-level citations." },
      ],
    },
    sections: [
    {
      heading: "The problem",
      body: "I wanted a single place to demonstrate practical GenAI engineering — not toy demos, but end-to-end features with auth, persistence, and error handling. The constraint: run everything on free tiers (Gemini API, MongoDB Atlas, Vercel) without degrading UX.",
    },
    {
      heading: "Architecture",
      body: "Next.js 15 App Router serves both the UI and API routes — no separate backend to host. Each module (resume matcher, NL-to-SQL, PDF RAG chat, YouTube Q&A, expense tracker, streaming generator) shares a common service layer: JWT auth, Zod validation at every boundary, and a rate-limit wrapper around Gemini calls. The Expo mobile app for the expense tracker consumes the exact same service layer.",
    },
    {
      heading: "Hard decisions",
      body: "RAG on a free tier: MongoDB Atlas Vector Search instead of a dedicated vector DB — one database for documents, embeddings, and app data, with page-level citation metadata stored alongside chunks. Gemini free-tier rate limits: request queuing with graceful client-side streaming fallbacks, and gemini-2.5-flash-lite where thinking-token overhead broke budgets. Receipt OCR: Gemini Vision with a strict Zod schema so a bad extraction fails loudly instead of corrupting expense data.",
    },
    {
      heading: "Outcomes",
      body: "Seven working modules in production at aiplayground.mohitpatel.org, a companion mobile app (Splitzy) live on Google Play, and a codebase that doubles as my reference implementation for prompt design, structured output, and streaming UX.",
    },
    ],
    links: [
      { label: "Live Demo", url: "https://aiplayground.mohitpatel.org", primary: true },
      { label: "View Code", url: "https://github.com/moohiit/ai-playground" },
    ],
  },

  fluxusForge: {
    title: "Fluxus Forge Lending Cloud",
    subtitle: "Lead engineer on a multi-tenant, white-label lending platform",
    diagram: {
      title: "One request, one tenant",
      nodes: [
        { id: "control", label: "Control plane", sub: "signup · provisioning", col: 1, row: 0 },
        { id: "client", label: "Borrower or staff", sub: "lender-a.example", col: 0, row: 1 },
        { id: "edge", label: "Cloudflare Worker", sub: "host → tenant", col: 1, row: 1 },
        { id: "kernel", label: "Fastify kernel", sub: "Zod · auth · idempotency", col: 2, row: 1 },
        { id: "db", label: "Tenant databases", sub: "Postgres · Mongo · Redis", col: 3, row: 1 },
        { id: "outbox", label: "Outbox → events", sub: "hash-chained audit log", col: 2, row: 2 },
      ],
      steps: [
        { from: "control", to: "edge", text: "A lender signs up. The control plane provisions its databases and registers its domain for edge routing." },
        { from: "client", to: "edge", text: "A borrower opens the lender's site. The request lands on a Cloudflare Worker." },
        { from: "edge", to: "kernel", text: "The Worker maps the host to its tenant and forwards the request with the tenant attached." },
        { from: "kernel", to: "db", text: "The shared Fastify kernel validates with Zod and checks the session, the route's capability and the idempotency key. Only one package may open a database, so the query can only reach this lender's own databases." },
        { from: "kernel", to: "outbox", text: "Writes go through an outbox that turns them into events. The audit log is hash-chained, and money is always Decimal." },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body: "Every new lender (an NBFC or a fintech) needs the same stack: a branded website and borrower app, loan origination and management, collections, a CRM for staff and a field app. Building it once per lender doesn't scale, but sharing one deployment across lenders means one tenant's data, branding or configuration must never leak into another's.",
      },
      {
        heading: "Architecture",
        body: "A TypeScript monorepo (pnpm + Turborepo) of 6 apps and 15 packages. Fastify 5 services share a kernel I built: zod-validated routes, sessions, idempotency keys, rate limits, OpenAPI generation and tenant-tagged logs. Each tenant gets its own domain and its own databases (PostgreSQL via Kysely, plus MongoDB and Redis). A Cloudflare Worker maps every incoming host to its tenant, and a control plane handles self-serve signup, provisioning and demo lifecycles. Writes go through an outbox that turns them into events, the audit log is hash-chained, and money is always Decimal.",
      },
      {
        heading: "Hard decisions",
        body: "Isolation by construction rather than by convention: tenant context travels with every request, only one package may open a database connection, and custom lint rules plus a scanner block hard-coded brands, secrets and personal data. Permissions are declared on each route and the entitlement catalog is generated from the code (24 capabilities, 29 roles), so documentation can't drift. Delivery runs on self-hosted CI runners with affected-only test selection, a merge gate, and production runbooks with restore drills.",
      },
      {
        heading: "Where it stands & my role",
        body: "The platform is in active development and not yet fully built. I made the initial commit and I'm the top contributor (650+ commits in about 8 weeks). I own the control plane, edge routing, the shared service kernel, the tenant packages, entitlements and CI. I set the architecture and review and merge the work of the rest of the team, who build the lending engine, CRM and site on these foundations.",
      },
    ],
    links: [
      { label: "fluxusforge.in", url: "https://fluxusforge.in", primary: true },
      { label: "Developer docs", url: "https://developers.fluxusforge.in" },
    ],
  },

  multiTenant: {
    title: "Quikkred Collect & the Lender API",
    subtitle: "Field collections, opened up to external lenders through a signed API",
    diagram: {
      title: "A case, from lender to field and back",
      nodes: [
        { id: "lender", label: "Lender system", sub: "push · pull · CSV", col: 0, row: 1 },
        { id: "api", label: "Lender API", sub: "HMAC · idempotency", col: 1, row: 1 },
        { id: "cases", label: "Case store", sub: "scoped per organisation", col: 2, row: 1 },
        { id: "partner", label: "Partner app", sub: "road-distance feed", col: 3, row: 1 },
        { id: "events", label: "Event store", sub: "durable log", col: 3, row: 2 },
        { id: "webhooks", label: "Webhook outbox", sub: "retries · DLQ · replay", col: 1.5, row: 2 },
      ],
      steps: [
        { from: "lender", to: "api", text: "A lender sends cases by push, pull or CSV ingest. Every request is HMAC-signed." },
        { from: "api", to: "cases", text: "Imports run as idempotent batches, so re-sending a file can't double-create cases. Every case is scoped to its organisation." },
        { from: "cases", to: "partner", text: "Nearby field partners see the case, matched by real road distance, with pincode geocoding keeping coordinates accurate." },
        { from: "partner", to: "events", text: "The partner visits the borrower and collects. The update lands in a durable event store." },
        { from: "events", to: "webhooks", text: "An outbox delivers it as a webhook, with a delivery log, retries and a dead-letter queue." },
        { from: "webhooks", to: "lender", fromSide: "l", toSide: "b", text: "The lender gets the update, and can replay any delivery or read a poll feed instead." },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body: "Quikkred Collect sends vetted field partners to borrowers with overdue loans. Other lenders wanted to hand their cases to the same partner network, each with their own data formats, payment flows and status-update needs. Onboarding every lender with custom code doesn't scale, so the platform had to become multi-tenant behind one public API.",
      },
      {
        heading: "Architecture",
        body: "A Fastify and MongoDB backend where every case, payout and event is scoped to its organisation. Lenders authenticate with HMAC-signed requests and send cases by push, pull or CSV ingest. A durable event store feeds webhook delivery (with a delivery log and replay) and a poll feed, and payments reconcile through remittance batches. Partners get cases matched by real road distance, with pincode geocoding and backfill jobs keeping coordinates accurate.",
      },
      {
        heading: "Hard decisions",
        body: "Webhook reliability: an outbox with per-delivery logging, retries and a dead-letter queue, so a lender's downtime never loses an update. Auditability for finance: imports and remittances run as idempotent batches, so re-sending a file can't double-create cases or payments, and organisation billing (GST invoices, deposit and TDS ledgers, a month-end billing run) is generated from the same events. Developer experience: I wrote a Docusaurus portal with HMAC signing samples in Node, Python, PHP and cURL, plus sandbox and go-live guides, so lender teams can integrate without hand-holding.",
      },
      {
        heading: "Where it stands",
        body: "Live in production. Quikkred Collect has 10K+ installs and a 4.6★ rating on Google Play, and the lender API and its docs are public. I built most of the backend's lender API, billing and scheduled jobs (17 of its 30 crons), the operations CRM's collections module, and core app features: the road-distance case feed, an earnings calculator, and in-app and forced updates.",
      },
    ],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.quikkred.collect", primary: true },
      { label: "API Documentation", url: "https://developers.fluxusforge.in" },
    ],
  },
};

export const codeSnippets = [
  {
    lang: "React.js",
    code: `const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    axios.get("/api/auth/me", {
      headers: { Authorization: \`Bearer \${token}\` }
    })
    .then(res => setUser(res.data.user))
    .catch(() => localStorage.removeItem("token"))
    .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post("/api/auth/login", {
      email, password
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  return { user, loading, login };
};`,
  },
  {
    lang: "Express.js",
    code: `const protect = async (req, res, next) => {
  const token = req.headers.authorization
    ?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Not authorized"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)
      .select("-password");
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token expired"
    });
  }
};

router.get("/api/products",
  cacheMiddleware(300),
  async (req, res) => {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.json({ success: true, products });
  }
);`,
  },
  {
    lang: "MongoDB",
    code: `// Aggregation Pipeline - Sales Analytics
const analytics = await Order.aggregate([
  {
    $match: {
      status: "delivered",
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
  },
  {
    $group: {
      _id: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" }
      },
      totalSales: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$totalAmount" }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);`,
  },
  {
    lang: "Socket.io",
    code: `// Real-time Chat with Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user_joined", {
      userId: socket.userId,
      timestamp: new Date()
    });
  });

  socket.on("send_message", async (data) => {
    const message = await Message.create({
      sender: socket.userId,
      room: data.roomId,
      content: data.content
    });

    io.to(data.roomId).emit("new_message", {
      ...message.toObject(),
      sender: { name: socket.userName }
    });
  });

  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("user_typing", {
      userId: socket.userId
    });
  });
});`,
  },
];

export const botResponses = {
  whoami: [
    "Hey! I'm <span class='terminal-highlight'>Mohit Patel</span> — a Full Stack Developer based in Gurgaon, Haryana.",
    "I'm a results-driven <span class='terminal-highlight'>Node.js & MERN Stack Developer</span> with 2+ years of hands-on experience.",
    "I build scalable REST APIs, real-time apps, and production-grade cloud-integrated solutions.",
    "Currently at <span class='terminal-highlight'>Quikkred · Fluxus Forge</span>, leading development of a multi-tenant lending cloud.",
  ],
  skills: [
    "<span class='terminal-cmd'>// Frontend</span>",
    "React.js | Redux | TypeScript | Tailwind CSS | Material UI | Axios | React Hook Form",
    "<span class='terminal-cmd'>// Backend</span>",
    "Node.js | Express.js | REST APIs | Socket.io | JWT | OAuth2 | MVC | Redis",
    "<span class='terminal-cmd'>// Databases</span>",
    "MongoDB | Mongoose | MySQL | Aggregation Pipelines",
    "<span class='terminal-cmd'>// DevOps & Server</span>",
    "Nginx | PM2 | Linux (Ubuntu) | GitHub Actions | CI/CD | Docker",
    "<span class='terminal-cmd'>// Cloud & Tools</span>",
    "AWS S3 | AWS EC2 | Google Cloud | Git | Postman | Jest",
  ],
  experience: [
    "<span class='terminal-highlight'>Backend Developer</span> @ Quikkred — <span class='terminal-cmd'>February 2026 - Present</span>",
    "  → Lead engineer on Fluxus Forge Lending Cloud, in development (multi-tenant LOS/LMS, TypeScript monorepo)",
    "  → Built Quikkred Collect's backend, ops CRM & app features (10K+ installs, 4.6★)",
    "  → Multi-tenant lender API: HMAC auth, webhooks with replay, idempotent batches",
    "  → Credit Health programme & investor ledger in the Quikkred loan-app API",
    "  → CI/CD, zero-downtime PM2 deploys, Sentry, Swagger & Zod across the APIs",
    "",
    "<span class='terminal-highlight'>Full Stack Developer</span> @ Life Layer Health Solutions — <span class='terminal-cmd'>June 2024 - January 2026</span>",
    "  → Built secure backend APIs with Node.js, Express & JWT auth",
    "  → Implemented Redis caching — reduced DB queries by ~70%, 10x faster APIs",
    "  → Built reusable React components with hooks & custom hooks",
    "  → Integrated AWS S3, Google Cloud & Utho for file handling",
    "  → Real-time features with Socket.io (chat, notifications, live status)",
    "  → Integrated Razorpay payment gateway",
    "  → Agile sprint-based development with GitHub collaboration",
  ],
  education: [
    "<span class='terminal-highlight'>MCA</span> — Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
    "  CGPA: <span class='terminal-cmd'>8.26</span> | 2022 - 2024",
    "",
    "<span class='terminal-highlight'>B.Sc</span> — Invertis University, Bareilly",
    "  Score: <span class='terminal-cmd'>82.37%</span> | 2017 - 2020",
  ],
  projects: [
    "<span class='terminal-highlight'>★ Fluxus Forge Lending Cloud</span> — multi-tenant white-label lending platform, in development (lead engineer)",
    "   Tech: TypeScript, Fastify, PostgreSQL, Cloudflare Workers, React",
    "",
    "<span class='terminal-highlight'>★ Quikkred Collect</span> — field-collections app on Google Play (10K+ installs, 4.6★)",
    "   Tech: Fastify, MongoDB, React Native (Expo)",
    "",
    "<span class='terminal-highlight'>1. ShopEase</span> — Full e-commerce platform with Razorpay payments, admin dashboard",
    "   Tech: React, Node.js, Express, MongoDB, Redux, Tailwind",
    "",
    "<span class='terminal-highlight'>2. AI Interview Prep</span> — AI-powered question generator with voice responses",
    "   Tech: Next.js, Node.js, Express, MongoDB",
    "",
    "<span class='terminal-highlight'>3. SastaGram</span> — Social media with real-time chat, follow system, notifications",
    "   Tech: MERN, Socket.io, Tailwind CSS",
    "",
    "<span class='terminal-highlight'>4. Watchman System</span> — Campus security & visitor tracking system",
    "   Tech: PHP, Apache, MySQL",
  ],
  contact: [
    "📧 Email: <span class='terminal-highlight'>mohitpatel.inbox@gmail.com</span>",
    "📱 Phone: <span class='terminal-highlight'>+91 7060993826</span>",
    "📍 Location: <span class='terminal-highlight'>Gurgaon, Haryana, India</span>",
    "🔗 LinkedIn: <span class='terminal-cmd'>linkedin.com/in/moohiitpatel</span>",
    "💻 GitHub: <span class='terminal-cmd'>github.com/moohiit</span>",
    "",
    "Feel free to reach out. I usually reply within a day.",
  ],
  hobbies: [
    "When I'm not coding, you'll find me:",
    "  → 🎮 Exploring new technologies & building side projects",
    "  → 📚 Learning about system design & scalable architectures",
    "  → 🎧 Listening to music while debugging at 2 AM",
    "  → ☕ Fueled by chai and clean code",
  ],
  games: [
    "🕹️ <span class='terminal-highlight'>Secret Arcade Unlocked!</span>",
    "",
    "Press <span class='terminal-cmd'>Ctrl+G</span> to open the arcade, or click the 🎮 badge at the bottom-left.",
    "",
    "Available games:",
    "  🐍 <span class='terminal-highlight'>Snake</span> — Classic snake with neon glow",
    "  🧠 <span class='terminal-highlight'>Memory Match</span> — Match tech stack icons",
    "  ⌨️  <span class='terminal-highlight'>Typing Test</span> — Test your coding speed",
    "",
    "Have fun!",
  ],
  help: [
    "Available commands:",
    "  <span class='terminal-cmd'>whoami</span>       — Know who I am",
    "  <span class='terminal-cmd'>skills</span>       — My technical skills",
    "  <span class='terminal-cmd'>experience</span>   — Work experience",
    "  <span class='terminal-cmd'>education</span>    — Academic background",
    "  <span class='terminal-cmd'>projects</span>     — Featured projects",
    "  <span class='terminal-cmd'>contact</span>      — How to reach me",
    "  <span class='terminal-cmd'>hobbies</span>      — What I do for fun",
    "  <span class='terminal-cmd'>games</span>        — 🕹️ Secret arcade",
    "  <span class='terminal-cmd'>clear</span>        — Clear the terminal",
    "",
    "Or type anything — I'll try my best to answer!",
  ],
};

export const fuzzyMatch = {
  "who are you": "whoami", "about": "whoami", "about you": "whoami",
  "introduce": "whoami", "name": "whoami", "who": "whoami", "yourself": "whoami",
  "tech": "skills", "technologies": "skills", "stack": "skills", "what do you know": "skills",
  "work": "experience", "job": "experience", "company": "experience", "career": "experience",
  "study": "education", "college": "education", "degree": "education", "university": "education",
  "project": "projects", "portfolio": "projects", "built": "projects", "made": "projects",
  "email": "contact", "phone": "contact", "reach": "contact", "hire": "contact", "connect": "contact",
  "fun": "hobbies", "hobby": "hobbies", "free time": "hobbies", "interests": "hobbies",
  "hi": "greeting", "hello": "greeting", "hey": "greeting",
  "game": "games", "play": "games", "arcade": "games", "snake": "games", "secret": "games",
};
