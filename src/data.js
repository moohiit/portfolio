// ---- Central content data for the portfolio ----
// Edit this file to update site content without touching components.

export const roles = [
  "Backend Developer",
  "Node.js Engineer",
  "MERN Stack Developer",
  "Fintech Developer",
  "React.js Developer",
];

export const currentlyBuilding = {
  name: "PrivateChat",
  desc: "End-to-end encrypted chat, zero-knowledge server",
  tech: ["Next.js", "PartyKit", "Turso"],
  link: "https://github.com/moohiit/PrivateChat",
};

export const stats = [
  { icon: "fas fa-briefcase", target: 2, label: "Years Experience" },
  { icon: "fas fa-project-diagram", target: 10, label: "Projects Completed" },
  { icon: "fas fa-rocket", target: 4, label: "Live Products" },
  { icon: "fas fa-certificate", target: 5, label: "Certifications", plus: false },
];

export const skillCategories = [
  {
    key: "frontend",
    title: "Frontend",
    icon: "fab fa-react",
    proficiency: 88,
    items: [
      "React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Redux",
      "Tailwind CSS", "Bootstrap", "Material UI", "Axios", "React Hook Form",
      "Responsive Design", "UI/UX Best Practices",
    ],
  },
  {
    key: "backend",
    title: "Backend",
    icon: "fas fa-server",
    proficiency: 92,
    items: [
      "Node.js", "Express.js", "MongoDB", "MySQL", "Mongoose", "JavaScript",
      "Java", "RESTful APIs", "MVC Architecture", "Socket.io", "Cloud Storage",
      "JWT/OAuth2 Authentication", "SQL", "Redis(Caching)",
    ],
  },
  {
    key: "devops",
    title: "DevOps & Server",
    icon: "fas fa-terminal",
    proficiency: 80,
    items: [
      "Nginx (Reverse Proxy)", "PM2", "Linux (Ubuntu)", "GitHub Actions",
      "Docker", "CI/CD Pipelines", "SSL / Certbot", "AWS EC2",
    ],
  },
  {
    key: "tools",
    title: "Cloud & Tools",
    icon: "fas fa-tools",
    proficiency: 78,
    items: [
      "Git & GitHub", "AWS S3", "Google Cloud Platform", "RazorPay",
      "Google Maps API", "VS Code", "Postman", "Testing (Jest)", "npm/yarn",
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
    company: "Quikkred",
    tag: "Fintech",
    tagClass: "company-tag--fintech",
    startDate: "2026-02-01",
    storyKey: "multiTenant",
    description:
      "Building the collections-partner platform end to end — a high-performance Fastify backend and an Expo React Native field app — plus handling critical production issues in a fast-paced fintech environment.",
    details: [
      { icon: "fas fa-code", text: "Designing and building Fastify (Node.js) APIs for collections workflows — case management, partner onboarding & KYC, earnings, and Razorpay-powered payouts/withdrawals." },
      { icon: "fas fa-map-marked-alt", text: "Built geo-based case assignment: pincode-to-coordinate resolution and road-distance matching to route field partners to the nearest cases." },
      { icon: "fas fa-bolt", text: "Real-time layer with Socket.io and Redis; background workers and node-cron jobs for payouts, notifications, and data-migration/backfill scripts." },
      { icon: "fas fa-file-invoice", text: "Document pipelines: AWS S3 presigned uploads, OCR with Tesseract and pdf-parse, Excel report generation, and FCM push notifications via Firebase Admin." },
      { icon: "fas fa-mobile-alt", text: "Developing the partner mobile app in Expo React Native (TypeScript) with React Query, React Hook Form + Zod, Firebase messaging, and multi-language support." },
      { icon: "fas fa-shield-alt", text: "Production ownership: Sentry error tracking, Winston rotating logs, rate limiting, Swagger API docs, Nginx/PM2 on Linux, and SLA-bound incident debugging." },
    ],
    tech: ["Node.js", "Fastify", "MongoDB", "Redis", "Socket.io", "Razorpay", "AWS S3", "Firebase (FCM)", "React Native (Expo)", "React Query", "Nginx", "PM2", "Sentry", "CI/CD"],
  },
  {
    date: "June 2024 - January 2026",
    position: "Full Stack Developer",
    company: "Life Layer Health Solutions Pvt. Ltd",
    tag: "Health-tech",
    tagClass: "company-tag--healthtech",
    duration: "1 yr 8 mos",
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
    title: "AI Playground — GenAI Hub",
    badge: { text: "Featured", cls: "project-badge--featured" },
    featured: true,
    storyKey: "aiPlayground",
    image: "/images/ai-playground.png",
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
    badge: { text: "Mobile", cls: "project-badge--mobile" },
    image: "/images/splitzy-feature.png",
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
    image: "/images/ShopEase.png",
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
    image: "/images/PrepAi.png",
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
    image: "/images/sastagram.png",
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
    image: "/images/watchman.png",
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
    image: "/images/Advance Excel.png",
    link: "https://lms.intellipaat.com/certificate-link/?Yz0yNjYwOSZ1PTE2NDkxMiZleHQ9MQ==",
  },
  {
    title: "Data Science Course",
    image: "/images/Data Science.png",
    link: "https://lms.intellipaat.com/certificate-link/?Yz01Nzk5JnU9MTY0OTEyJmV4dD0x",
  },
  {
    title: "MongoDB Developer's Toolkit: CRUD Mastery with Node.js",
    image: "/images/MongoDB.png",
    link: "https://www.geeksforgeeks.org/certificate/c97fe9133e67d1456dcc544d1410b7e5",
  },
  {
    title: "IBM Data Science",
    image: "/images/IBM_Data_Science.png",
    link: "https://coursera.org/share/2acc587f7d7b0d409c3c2fb2333f522a",
  },
  {
    title: "MS SQL Developer Course",
    image: "/images/MS SQL.png",
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
  { icon: "fas fa-layer-group", title: "Full-Stack Apps", desc: "Production MERN / Next.js applications end to end — from schema design to deployment." },
  { icon: "fas fa-robot", title: "AI Integrations", desc: "RAG pipelines, Gemini-powered features, vector search, and streaming AI UX." },
  { icon: "fas fa-mobile-alt", title: "Mobile Apps", desc: "React Native (Expo) apps shipped to the Google Play Store." },
  { icon: "fas fa-network-wired", title: "API Design & DevOps", desc: "Secure REST APIs, Nginx/PM2 server management, and CI/CD automation." },
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
    handle: "mohit-patel",
    link: "https://www.linkedin.com/in/mohit-patel-51338a245/",
    stats: "Professional network & recommendations",
    cls: "profile-card--linkedin",
  },
];

// ---- NEW: Achievements & milestones ----
export const achievements = [
  {
    icon: "fab fa-google-play",
    image: "/images/splitzy-icon.png",
    title: "Splitzy AI on Google Play",
    desc: "Published the AI expense-splitting mobile app (React Native + Gemini) live on the Play Store.",
    link: "https://play.google.com/store/apps/details?id=com.moohiit.expensetracker",
  },
  {
    icon: "fas fa-rocket",
    title: "4+ Live Products in Production",
    desc: "AI Playground, ShopEase, SastaGram, and Watchman — all deployed, domain-mapped, and in active use.",
  },
  {
    icon: "fas fa-bolt",
    title: "10x API Performance",
    desc: "Redis caching layer at Life Layer cut DB queries ~70% and made hot endpoints 10x faster.",
  },
  {
    icon: "fas fa-certificate",
    title: "5 Professional Certifications",
    desc: "IBM Data Science, MongoDB, MS SQL, Advanced Excel, and Data Science certifications.",
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

  multiTenant: {
    title: "A Multi-Tenant Lender Integration Platform",
    subtitle: "What I'm building at Quikkred — public API docs at developers.quikkred.in",
    sections: [
      {
        heading: "The problem",
        body: "Multiple lenders and organizations need to hand collection cases to Quikkred's field-partner network — each with their own branding, data formats, payment flows, and status-update requirements. Onboarding every lender with custom code doesn't scale; the platform had to become multi-tenant with a single public API surface.",
      },
      {
        heading: "Architecture",
        body: "A Fastify (Node.js) backend where every case, payout, and event is scoped to its source organization. Lenders integrate through a versioned public API — authenticated per tenant via API-key middleware — to push cases in bulk, receive status updates over signed webhooks with delivery tracking and retries, and reconcile payments through remittance batches. Per-tenant branding flows through to everything the borrower and field partner see.",
      },
      {
        heading: "Hard decisions",
        body: "Webhook reliability: an outbox pattern with per-delivery logging and retry, so a lender's downtime never loses an update. Auditability for finance: every external API request is logged, and imports/remittances run as idempotent batches — re-sending a file can't double-create cases or payments. Developer experience: a public Docusaurus documentation portal (authentication, sending cases, payments, receiving updates, sandbox testing) so lender teams can integrate without hand-holding.",
      },
      {
        heading: "Where it stands",
        body: "Live in production with the docs portal at developers.quikkred.in, powering case intake, geo-routed field assignment, real-time partner updates, and Razorpay-based payouts — with Sentry, structured logging, and rate limiting keeping it observable and stable under SLA.",
      },
    ],
    links: [
      { label: "API Documentation", url: "https://developers.quikkred.in", primary: true },
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
    "Currently working at <span class='terminal-highlight'>Quikkred</span> as a Backend Developer handling financial APIs and production server management.",
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
    "  → Building the collections-partner platform: Fastify APIs + Expo React Native field app",
    "  → Case management, KYC onboarding, earnings & Razorpay payouts",
    "  → Geo-based case assignment (pincode → coordinates, road-distance matching)",
    "  → Real-time Socket.io + Redis, cron jobs & workers, S3 uploads, OCR pipelines",
    "  → Production ownership: Sentry, Winston, Nginx/PM2, SLA-bound incident debugging",
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
    "📧 Email: <span class='terminal-highlight'>mohit.patel.edu@gmail.com</span>",
    "📱 Phone: <span class='terminal-highlight'>+91 7060993826</span>",
    "📍 Location: <span class='terminal-highlight'>Gurgaon, Haryana, India</span>",
    "🔗 LinkedIn: <span class='terminal-cmd'>linkedin.com/in/mohit-patel-51338a245</span>",
    "💻 GitHub: <span class='terminal-cmd'>github.com/moohiit</span>",
    "",
    "Feel free to reach out! I'm an <span class='terminal-highlight'>immediate joiner</span>.",
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
