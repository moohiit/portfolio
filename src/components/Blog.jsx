import { useEffect, useRef, useState } from "react";
import { blogConfig } from "../data.js";
import { Reveal, SectionHeader } from "./ui.jsx";

const MAX_POSTS = 3;

// dev.to's CDN caches each exact request (per Origin and encoding) and can keep
// serving an old copy for days; publishing doesn't always clear it, and unknown
// query params are ignored. per_page is a real parameter, so changing it once a
// day (UTC) makes a fresh request each day: a new post shows up by the next day
// without editing anything. 90 distinct values, so no URL repeats for months.
function devToUrl(username) {
  const day = Math.floor(Date.now() / 86_400_000);
  return `https://dev.to/api/articles?username=${username}&per_page=${4 + (day % 90)}`;
}

// Renders only when real articles exist (dev.to or manualPosts) —
// no fabricated placeholder posts on a professional portfolio.
export default function Blog() {
  const [posts, setPosts] = useState(blogConfig.manualPosts.slice(0, MAX_POSTS));
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current || !blogConfig.devToUsername) return;
    fetched.current = true;
    fetch(devToUrl(blogConfig.devToUsername))
      .then((r) => (r.ok ? r.json() : []))
      .then((articles) => {
        if (!Array.isArray(articles) || articles.length === 0) return;
        const fromDevTo = articles.map((a) => ({
          title: a.title,
          desc: a.description,
          url: a.url,
          tags: (a.tag_list || []).slice(0, 3),
        }));
        // A manual post that dev.to's list doesn't include yet is newer than
        // anything in it, so it goes first; dev.to's list is already newest-first.
        const known = new Set(fromDevTo.map((p) => p.url));
        const extra = blogConfig.manualPosts.filter((p) => !known.has(p.url));
        setPosts([...extra, ...fromDevTo].slice(0, MAX_POSTS));
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
