// Infinite tech-stack strip. The list is rendered twice for a seamless loop;
// the copy is hidden from assistive tech. CSS pauses it on hover and for
// reduced-motion visitors.
const STACK = [
  "Node.js", "Fastify", "Express", "MongoDB", "Redis", "Socket.io", "React", "Next.js",
  "React Native", "TypeScript", "Nginx", "PM2", "Docker", "AWS", "GitHub Actions", "Gemini", "RAG", "Razorpay",
];

export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {STACK.map((s) => (
        <li key={s}>
          <span>{s}</span>
          <i className="marquee-sep" aria-hidden="true">✦</i>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Tech stack">
      {row(false)}
      {row(true)}
    </div>
  );
}
