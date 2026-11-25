import { useEffect, useRef, useState } from "react";
import { blogConfig } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

// Renders only when real articles exist (dev.to or manualPosts) —
// no fabricated placeholder posts on a professional portfolio.
export default function Blog() {
  const [posts, setPosts] = useState(blogConfig.manualPosts);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current || !blogConfig.devToUsername) return;
    fetched.current = true;
    fetch(`https://dev.to/api/articles?username=${blogConfig.devToUsername}&per_page=3`)
      .then((r) => (r.ok ? r.json() : []))
      .then((articles) => {
        if (Array.isArray(articles) && articles.length > 0) {
          setPosts(
            articles.map((a) => ({
              title: a.title,
              desc: a.description,
              url: a.url,
              tags: (a.tag_list || []).slice(0, 3),
            }))
          );
        }
      })
      .catch(() => { /* keep manual posts (possibly empty) */ });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section">
      <div className="container">
        <SectionHeader eyebrow="Writing" title="Notes from production" />
        <div className="blog-grid">
          {posts.map((p, i) => (
            <Reveal as="a" className="card spot blog-card" key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" delay={i * 0.08}>
              <span className="mono-label">Article</span>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-text">{p.desc}</p>
              <div className="chip-row">
                {p.tags.map((t) => (
                  <span className="chip chip--sm" key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
