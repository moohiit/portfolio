import { useEffect, useRef, useState } from "react";
import { stats } from "../data.js";

function format(value, target) {
  if (target % 1 !== 0) return value.toFixed(1) + "+";
  if (target >= 1000) return Math.floor(value).toLocaleString() + "+";
  return Math.floor(value) + "+";
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [values, setValues] = useState(stats.map(() => 0));
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const duration = 2000, steps = 60;
            let step = 0;
            const timer = setInterval(() => {
              step++;
              setValues(stats.map((s) => Math.min((s.target / steps) * step, s.target)));
              if (step >= steps) clearInterval(timer);
            }, duration / steps);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon"><i className={s.icon}></i></div>
              <div className="stat-number">{format(values[i], s.target)}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
