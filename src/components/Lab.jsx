// The fun stuff, moved off the main flow: terminal bot, code showcase,
// toolbox, Spotify and the arcade launcher, behind tabs.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Terminal from "./Terminal.jsx";
import CodeShowcase from "./CodeShowcase.jsx";
import Toolbox from "./Toolbox.jsx";
import Spotify from "./Spotify.jsx";
import { EASE, Magnetic, Reveal, SectionHeader } from "./ui.jsx";

const TABS = [
  { key: "terminal", label: "Terminal", icon: "fas fa-terminal", Panel: Terminal },
  { key: "code", label: "Code", icon: "fas fa-code", Panel: CodeShowcase },
  { key: "uses", label: "Uses", icon: "fas fa-toolbox", Panel: Toolbox },
  { key: "music", label: "Music", icon: "fab fa-spotify", Panel: Spotify },
];

export default function Lab({ onOpenArcade }) {
  const [tab, setTab] = useState("terminal");
  const { Panel } = TABS.find((t) => t.key === tab);

  return (
    <section id="lab" className="section">
      <div className="container">
        <SectionHeader
          index="08"
          eyebrow="Lab"
          title="Things I build for fun"
          lead="Ask the terminal bot about me, watch some code type itself, or find the arcade."
        />
        <div className="lab-grid">
          <Reveal className="card lab-main">
            <div className="tabs" role="tablist" aria-label="Lab">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  id={`lab-tab-${t.key}`}
                  aria-selected={tab === t.key}
                  aria-controls="lab-panel"
                  className={"tab" + (tab === t.key ? " is-active" : "")}
                  onClick={() => setTab(t.key)}
                >
                  <i className={t.icon} aria-hidden="true"></i>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            <div className="lab-panel" id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal className="card spot arcade-card" delay={0.1}>
            <div className="arcade-art" aria-hidden="true">
              <i className="fas fa-gamepad"></i>
            </div>
            <span className="mono-label">Secret arcade</span>
            <h3 className="card-title">Snake, Memory Match & a typing test</h3>
            <p className="card-text">
              Press <kbd>Ctrl</kbd> + <kbd>G</kbd> anywhere on the site, or hit the button.
            </p>
            <Magnetic>
              <button className="btn btn-primary" onClick={onOpenArcade}>
                <i className="fas fa-play" aria-hidden="true"></i> Play now
              </button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
