import { useState } from "react";

export default function Spotify() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="spotify-panel" id="spotify">
      <div className="spotify-head">
        <i className="fab fa-spotify" aria-hidden="true"></i>
        <span>What I've been listening to</span>
      </div>
      {failed ? (
        <p className="panel-empty">Spotify data is unavailable right now.</p>
      ) : (
        <img
          src="https://spotify-recently-played-readme.vercel.app/api?user=316rzbhecq2khqsc4ysqdhbgqmdu&count=5&width=600&unique=true"
          alt="Recently played tracks on Spotify"
          className="spotify-img"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
