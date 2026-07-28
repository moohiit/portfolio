import { useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle.jsx";
import { botResponses, fuzzyMatch } from "../data.js";

const CHIPS = ["whoami", "skills", "experience", "education", "projects", "contact", "hobbies", "help"];

// The terminal is inherently imperative (append-only log with typing delays),
// so it manipulates its own body element directly via refs.
export default function Terminal() {
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.innerHTML = "";
    addLine(
      "Welcome! I'm <span class='terminal-highlight'>Mohit's portfolio bot</span>. Click a question below or type your own to know more about me.",
      true
    );
    addLine(
      "Type <span class='terminal-cmd'>help</span> to see available commands...",
      true,
      "terminal-muted"
    );
  }, []);

  function addLine(html, withPrompt, extraCls = "") {
    const body = bodyRef.current;
    if (!body) return;
    const line = document.createElement("div");
    line.classList.add("terminal-line");
    line.innerHTML = withPrompt
      ? `<span class="terminal-prompt">$</span><span class="terminal-text ${extraCls}">${html}</span>`
      : `<span class="terminal-response">${html}</span>`;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function addUserLine(text) {
    const body = bodyRef.current;
    if (!body) return;
    const line = document.createElement("div");
    line.classList.add("terminal-line");
    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.textContent = "$";
    const cmd = document.createElement("span");
    cmd.className = "terminal-text terminal-user-cmd";
    cmd.textContent = text;
    line.append(prompt, cmd);
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function typeResponse(lines, index) {
    if (index >= lines.length) return;
    const body = bodyRef.current;
    if (!body) return;
    const line = document.createElement("div");
    line.classList.add("terminal-line", "terminal-typing");
    line.innerHTML = `<span class="terminal-response">${lines[index]}</span>`;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => {
      line.classList.remove("terminal-typing");
      line.classList.add("terminal-typed");
      typeResponse(lines, index + 1);
    }, 80 + lines[index].length * 2);
  }

  function processCommand(input) {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    addUserLine(input);

    if (cmd === "clear") {
      bodyRef.current.innerHTML = "";
      addLine("Terminal cleared. Type <span class='terminal-cmd'>help</span> for commands.", false);
      return;
    }

    let responseKey = botResponses[cmd] ? cmd : null;
    if (!responseKey) {
      for (const [keyword, key] of Object.entries(fuzzyMatch)) {
        if (cmd.includes(keyword)) {
          responseKey = key;
          break;
        }
      }
    }

    if (responseKey === "greeting") {
      const greetings = [
        "Hey there! 👋 Nice to meet you. Type <span class='terminal-cmd'>help</span> to explore!",
        "Hello! Welcome to my portfolio terminal. Try <span class='terminal-cmd'>whoami</span> to learn about me!",
        "Hi! I'm Mohit's portfolio bot. Ask me anything!",
      ];
      setTimeout(() => addLine(greetings[Math.floor(Math.random() * greetings.length)], false), 300);
      return;
    }

    if (responseKey && botResponses[responseKey]) {
      setTimeout(() => typeResponse(botResponses[responseKey], 0), 300);
    } else {
      setTimeout(
        () =>
          addLine(
            `<span class="terminal-error">Command not found:</span> ${cmd.replace(/</g, "&lt;")}. Type <span class="terminal-cmd">help</span> for available commands.`,
            false
          ),
        300
      );
    }
  }

  return (
    <section id="about-terminal">
      <div className="container">
        <SectionTitle>Know Me Better</SectionTitle>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <div className="terminal-title">mohit@portfolio:~</div>
            <div className="terminal-actions">
              <button
                className="terminal-clear-btn"
                title="Clear terminal"
                aria-label="Clear terminal output"
                onClick={() => processCommand("clear")}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>

          <div className="terminal-body" ref={bodyRef}></div>

          <div className="terminal-input-area">
            <span className="terminal-prompt">$</span>
            <input
              type="text"
              className="terminal-input"
              ref={inputRef}
              placeholder="Type a command or question..."
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  processCommand(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>

          <div className="terminal-suggestions">
            {CHIPS.map((c) => (
              <button key={c} className="suggestion-chip" onClick={() => processCommand(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
