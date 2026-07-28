import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { blogConfig } from "../data.js";

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
    <section id="blog">
      <div className="container">
        <SectionTitle>Technical Writing</SectionTitle>

        <div className="blog-grid">
          {posts.map((p) => (
            <a className="blog-card" key={p.title} href={p.url} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-pen-nib blog-icon"></i>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-desc">{p.desc}</p>
              <div className="blog-tags">
                {p.tags.map((t) => (
                  <span className="tech-item" key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
