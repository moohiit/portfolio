// ⌘K / Ctrl+K command palette: jump to sections, open projects, run actions.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { projects } from "../data.js";
import { NAV_LINKS, countResumeDownload } from "./Header.jsx";
import { EASE } from "./ui.jsx";
import { scrollToTarget } from "../lib/scroll.js";

const EMAIL = "mohitpatel.inbox@gmail.com";

function buildCommands({ theme, onToggleTheme, onOpenArcade, onOpenCaseStudy }) {
  const go = (href) => () => (href === "#top" ? scrollToTarget(0) : scrollToTarget(href));
  const open = (url) => () => window.open(url, "_blank", "noopener,noreferrer");
  return [
    { group: "Navigate", icon: "fas fa-house", label: "Home", run: go("#top") },
    ...NAV_LINKS.map(([href, label]) => ({ group: "Navigate", icon: "fas fa-hashtag", label, run: go(href) })),
    ...projects.flatMap((p) => {
      const items = [];
      if (p.storyKey)
        items.push({ group: "Projects", icon: "fas fa-book-open", label: `${p.title}: build story`, run: () => onOpenCaseStudy(p.storyKey) });
      const live = p.demo || p.playStore;
      if (live) items.push({ group: "Projects", icon: "fas fa-arrow-up-right-from-square", label: `Open ${p.title}`, run: open(live) });
      return items;
    }),
    { group: "Actions", icon: theme === "dark" ? "fas fa-sun" : "fas fa-moon", label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, run: onToggleTheme },
    {
      group: "Actions",
      icon: "fas fa-arrow-down",
      label: "Download resume",
      run: () => {
        countResumeDownload();
        const a = document.createElement("a");
        a.href = "/files/MohitPatelResume.pdf";
        a.download = "Mohit_Patel_Resume.pdf";
        a.click();
      },
    },
    { group: "Actions", icon: "fas fa-copy", label: "Copy email address", keep: true, run: () => navigator.clipboard?.writeText(EMAIL) },
    { group: "Actions", icon: "fas fa-gamepad", label: "Open the secret arcade", run: onOpenArcade },
    { group: "Links", icon: "fab fa-github", label: "GitHub", run: open("https://github.com/moohiit") },
    { group: "Links", icon: "fab fa-linkedin-in", label: "LinkedIn", run: open("https://www.linkedin.com/in/moohiitpatel/") },
    { group: "Links", icon: "fas fa-envelope", label: "Send an email", run: () => (window.location.href = `mailto:${EMAIL}`) },
  ];
}

export default function CommandPalette({ onClose, ...ctx }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => buildCommands(ctx), [ctx.theme]); // eslint-disable-line react-hooks/exhaustive-deps
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.group).toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (cmd) => {
    if (!cmd) return;
    if (cmd.keep) {
      cmd.run();
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
      return;
    }
    // Close first so the scroll lock is released before a scroll command runs.
    onClose();
    setTimeout(cmd.run, 30);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = null;
  return (
    <motion.div
      className="palette-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        <div className="palette-search">
          <i className="fas fa-magnifying-glass" aria-hidden="true"></i>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search sections, projects, actions…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${index}` : undefined}
            role="combobox"
            aria-expanded="true"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef} data-lenis-prevent>
          {results.length === 0 && <li className="palette-empty">No results for “{query}”</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            return (
              <li key={cmd.group + cmd.label} role="presentation">
                {header && <div className="palette-group">{header}</div>}
                <div
                  id={`cmd-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === index}
                  className={"palette-item" + (i === index ? " is-active" : "")}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(cmd)}
                >
                  <i className={cmd.icon} aria-hidden="true"></i>
                  <span>{cmd.keep && copied ? "Copied!" : cmd.label}</span>
                  {i === index && <i className="fas fa-arrow-turn-down palette-enter" aria-hidden="true"></i>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
