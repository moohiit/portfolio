import { useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

export default function Spotify() {
  const [failed, setFailed] = useState(false);

  return (
    <section id="spotify">
      <div className="container">
        <SectionTitle>Recently Played</SectionTitle>

        <div className="spotify-card">
          <div className="spotify-header">
            <i className="fab fa-spotify spotify-icon"></i>
            <span>What I've been listening to</span>
          </div>
          <div className="spotify-widget">
            {failed ? (
              <p style={{ textAlign: "center", opacity: 0.5, padding: "20px 0", fontSize: "0.9rem" }}>
                🎵 Spotify data unavailable right now.
              </p>
            ) : (
              <img
                src="https://spotify-recently-played-readme.vercel.app/api?user=316rzbhecq2khqsc4ysqdhbgqmdu&count=5&width=600&unique=true"
                alt="Spotify Recently Played"
                className="spotify-img"
                loading="lazy"
                onError={() => setFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
