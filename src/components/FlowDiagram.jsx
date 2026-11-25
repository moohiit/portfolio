// Animated architecture diagram for the build stories. Each step sends a
// packet along one edge and explains what happens there; the steps play
// automatically while the diagram is on screen, or can be stepped by hand.
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Nodes are placed on a grid: col 0-3 (fractions allowed), row 0-2.
const NODE_W = 148;
const NODE_H = 58;
const COL = 210;
const ROW = 111;
const W = COL * 3 + NODE_W + 2;
const H = ROW * 2 + NODE_H + 20;
const PACKET_MS = 1100;
const PACKET_GAP = 350;
const DIR = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };

function anchor(n, side) {
  const cx = n.x + NODE_W / 2;
  const cy = n.y + NODE_H / 2;
  if (side === "l") return [n.x, cy];
  if (side === "r") return [n.x + NODE_W, cy];
  if (side === "t") return [cx, n.y];
  return [cx, n.y + NODE_H];
}

// Mostly-horizontal neighbours connect side to side, otherwise top to bottom.
function autoSides(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) >= Math.abs(dy) * 1.2) return dx > 0 ? ["r", "l"] : ["l", "r"];
  return dy > 0 ? ["b", "t"] : ["t", "b"];
}

const place = (n) => ({ ...n, x: 1 + n.col * COL, y: 10 + n.row * ROW });

function buildEdges(nodes, steps) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const pairs = new Set(steps.map((s) => `${s.from}>${s.to}`));
  const edges = {};
  for (const s of steps) {
    const id = `${s.from}>${s.to}`;
    if (edges[id]) continue;
    const a = byId[s.from];
    const b = byId[s.to];
    const [s0, s1] = s.fromSide && s.toSide ? [s.fromSide, s.toSide] : autoSides(a, b);
    let p0 = anchor(a, s0);
    let p3 = anchor(b, s1);
    // A pair that runs both ways gets two parallel lanes instead of one line.
    if (pairs.has(`${s.to}>${s.from}`)) {
      const off = s.from < s.to ? -6 : 6;
      const horizontal = s0 === "l" || s0 === "r";
      p0 = horizontal ? [p0[0], p0[1] + off] : [p0[0] + off, p0[1]];
      p3 = horizontal ? [p3[0], p3[1] + off] : [p3[0] + off, p3[1]];
    }
    const k = Math.max(28, Math.hypot(p3[0] - p0[0], p3[1] - p0[1]) * 0.45);
    const c1 = [p0[0] + DIR[s0][0] * k, p0[1] + DIR[s0][1] * k];
    const c2 = [p3[0] + DIR[s1][0] * k, p3[1] + DIR[s1][1] * k];
    edges[id] = { id, d: `M${p0} C${c1} ${c2} ${p3}` };
  }
  return edges;
}

const dwell = (text) => 1500 + text.split(" ").length * 190;

export default function FlowDiagram({ diagram }) {
  const { steps, title } = diagram;
  const nodes = useMemo(() => diagram.nodes.map(place), [diagram.nodes]);
  const edges = useMemo(() => buildEdges(nodes, steps), [nodes, steps]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { margin: "-80px" });
  const pathRefs = useRef({});
  const packetRef = useRef(null);
  const canvasRef = useRef(null);

  const current = steps[step];
  const edgeId = `${current.from}>${current.to}`;
  const autoplay = playing && inView && !reduced;

  // Move the packet along the active edge (layout effect, so it never paints at 0,0).
  useLayoutEffect(() => {
    const path = pathRefs.current[edgeId];
    const packet = packetRef.current;
    if (!path || !packet) return;
    const len = path.getTotalLength();
    const move = (t) => {
      const pt = path.getPointAtLength(len * t);
      packet.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    };
    if (reduced || !inView) {
      move(1);
      return;
    }
    // Loop the packet along the edge for as long as the step is showing.
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(((now - t0) % (PACKET_MS + PACKET_GAP)) / PACKET_MS, 1);
      move(t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [edgeId, step, reduced, inView]);

  // On phones the diagram is wider than the screen: pan to the active edge.
  useEffect(() => {
    const canvas = canvasRef.current;
    const path = pathRefs.current[edgeId];
    if (!canvas || !path || canvas.scrollWidth <= canvas.clientWidth) return;
    const box = path.getBBox();
    const scale = canvas.scrollWidth / W;
    const left = (box.x + box.width / 2) * scale - canvas.clientWidth / 2;
    canvas.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [edgeId, reduced]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % steps.length), PACKET_MS + dwell(current.text));
    return () => clearTimeout(id);
  }, [autoplay, step, steps.length, current.text]);

  const go = useCallback(
    (to) => {
      setPlaying(false);
      setStep((to + steps.length) % steps.length);
    },
    [steps.length]
  );

  const touched = new Set(steps.slice(0, step).flatMap((s) => [s.from, s.to]));
  const doneEdges = new Set(steps.slice(0, step).map((s) => `${s.from}>${s.to}`));
  const label = `${title}. ${steps.map((s, i) => `Step ${i + 1}: ${s.text}`).join(" ")}`;

  return (
    <figure className="flow" ref={rootRef}>
      <figcaption className="flow-head">
        <span className="mono-label"><i className="fas fa-diagram-project" aria-hidden="true"></i>Request flow</span>
        <span className="flow-title">{title}</span>
      </figcaption>

      <div className="flow-canvas" ref={canvasRef}>
        <svg className="flow-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
          <g className="flow-edges">
            {Object.values(edges).map((e) => (
              <path
                key={e.id}
                d={e.d}
                ref={(el) => (pathRefs.current[e.id] = el)}
                className={"flow-edge" + (e.id === edgeId ? " is-active" : doneEdges.has(e.id) ? " is-done" : "")}
              />
            ))}
          </g>
          {nodes.map((n) => {
            const active = n.id === current.from || n.id === current.to;
            const cls = active ? " is-active" : touched.has(n.id) ? " is-done" : "";
            return (
              <g className={"flow-node" + cls} key={n.id} transform={`translate(${n.x} ${n.y})`}>
                <rect width={NODE_W} height={NODE_H} rx="12" />
                <text className="flow-node-label" x={NODE_W / 2} y="25">{n.label}</text>
                <text className="flow-node-sub" x={NODE_W / 2} y="43">{n.sub}</text>
              </g>
            );
          })}
          <g className="flow-packet" ref={packetRef} aria-hidden="true">
            <circle r="11" className="flow-packet-glow" />
            <circle r="4.5" className="flow-packet-core" />
          </g>
        </svg>
      </div>

      <div className="flow-step" aria-live={autoplay ? "off" : "polite"}>
        <span className="flow-step-num">
          {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
        <p key={step}>{current.text}</p>
      </div>

      <div className="flow-controls">
        <button type="button" className="icon-btn icon-btn--sm" onClick={() => go(step - 1)} aria-label="Previous step">
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--sm"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          disabled={reduced}
        >
          <i className={"fas " + (playing && !reduced ? "fa-pause" : "fa-play")} aria-hidden="true"></i>
        </button>
        <button type="button" className="icon-btn icon-btn--sm" onClick={() => go(step + 1)} aria-label="Next step">
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
        <div className="flow-dots">
          {steps.map((s, i) => (
            <button
              type="button"
              key={i}
              className={"flow-dot" + (i === step ? " is-active" : i < step ? " is-done" : "")}
              onClick={() => go(i)}
              aria-label={`Step ${i + 1}`}
              aria-current={i === step ? "step" : undefined}
            ></button>
          ))}
        </div>
      </div>
    </figure>
  );
}
