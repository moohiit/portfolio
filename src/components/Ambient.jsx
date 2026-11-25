// Fixed decorative layer behind every section (the hero paints over it and
// fades into it at the bottom):
//  - aurora: three soft colour fields that drift slowly and re-tint to a
//    per-section palette as you scroll (colours live in theme.css)
//  - grid: a faint tech grid, lit up in a spotlight that follows the cursor
//  - beams: short light pulses travelling along the grid lines
//
// Cost control: the drift and the beams animate transform/opacity only, so
// they stay on the compositor; the spotlight writes two CSS variables at most
// once per frame and only on fine pointers. Phones get a static aurora, and
// reduced-motion visitors or html[data-fx="off"] get no motion at all.
import { useEffect, useRef } from "react";

// Grid columns / rows (in 64px cells) that the light pulses run along.
const V_BEAMS = [2, 6, 11, 15, 20];
const H_BEAMS = [3, 8, 12];

export default function Ambient({ section }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      ref.current?.style.setProperty("--cx", `${x}px`);
      ref.current?.style.setProperty("--cy", `${y}px`);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ambient" data-section={section || "about"} ref={ref} aria-hidden="true">
      <div className="ambient-aurora">
        <span className="orb orb--1"></span>
        <span className="orb orb--2"></span>
        <span className="orb orb--3"></span>
      </div>
      <div className="ambient-grid"></div>
      <div className="ambient-grid ambient-grid--lit"></div>
      <div className="ambient-beams">
        {V_BEAMS.map((col, i) => (
          <i className="beam beam--v" key={`v${col}`} style={{ "--n": col, "--i": i }}></i>
        ))}
        {H_BEAMS.map((row, i) => (
          <i className="beam beam--h" key={`h${row}`} style={{ "--n": row, "--i": i }}></i>
        ))}
      </div>
    </div>
  );
}
