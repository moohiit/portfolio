import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { codeSnippets } from "../data.js";

export default function CodeShowcase() {
  const [current, setCurrent] = useState(0);
  const [typed, setTyped] = useState("");
  const sectionRef = useRef(null);
  const bodyRef = useRef(null);
  const timerRef = useRef(null);
  const nextRef = useRef(null);
  const started = useRef(false);

  function typeSnippet(index) {
    clearInterval(timerRef.current);
    clearTimeout(nextRef.current);
    setCurrent(index);
    setTyped("");
    const code = codeSnippets[index].code;
    let i = 0;
    timerRef.current = setInterval(() => {
      if (i < code.length) {
        i++;
        setTyped(code.slice(0, i));
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      } else {
        clearInterval(timerRef.current);
        nextRef.current = setTimeout(() => {
          typeSnippet((index + 1) % codeSnippets.length);
        }, 4000);
      }
    }, 18);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            typeSnippet(0);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearInterval(timerRef.current);
      clearTimeout(nextRef.current);
    };
  }, []);

  const lineCount = typed.split("\n").length;

  return (
    <section id="code-showcase" ref={sectionRef}>
      <div className="container">
        <SectionTitle>Code Showcase</SectionTitle>

        <div className="code-editor">
          <div className="code-editor-header">
            <div className="terminal-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <div className="code-tabs">
              {["React Hook", "Express API", "MongoDB", "Socket.io"].map((label, i) => (
                <button
                  key={label}
                  className={"code-tab" + (i === current ? " active" : "")}
                  onClick={() => typeSnippet(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="code-editor-body" ref={bodyRef}>
            <div className="code-line-numbers">
              {Array.from({ length: lineCount }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <pre className="code-content">{typed}</pre>
          </div>
          <div className="code-editor-footer">
            <span className="code-lang">{codeSnippets[current].lang}</span>
            <span className="code-info">Auto-typing...</span>
          </div>
        </div>
      </div>
    </section>
  );
}
