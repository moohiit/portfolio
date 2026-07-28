import { useEffect, useRef, useState } from "react";

// The arcade games are canvas/DOM-driven and ported imperatively from the
// original site; each game's effect owns its listeners and cleans them up.
export default function Arcade({ open, onClose }) {
  const [game, setGame] = useState(null); // null = menu
  const canvasRef = useRef(null);
  const memoryRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    if (!open) setGame(null);
  }, [open]);

  // ---- SNAKE ----
  useEffect(() => {
    if (game !== "snake" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const grid = 20;
    const cols = canvas.width / grid;
    const rows = canvas.height / grid;

    let snake = [{ x: 10, y: 10 }];
    let food = spawnFood();
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let score = 0;
    let gameOver = false;
    let interval;

    function spawnFood() {
      return { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    }

    function drawGame() {
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0,255,204,0.05)";
      for (let i = 0; i < cols; i++) {
        ctx.beginPath(); ctx.moveTo(i * grid, 0); ctx.lineTo(i * grid, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < rows; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * grid); ctx.lineTo(canvas.width, i * grid); ctx.stroke();
      }
      ctx.fillStyle = "#ff006e";
      ctx.shadowColor = "#ff006e";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x * grid + grid / 2, food.y * grid + grid / 2, grid / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? "#00ffcc" : "rgba(0,255,204,0.6)";
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = i === 0 ? 8 : 3;
        ctx.fillRect(seg.x * grid + 1, seg.y * grid + 1, grid - 2, grid - 2);
      });
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#00ffcc";
      ctx.font = "14px Orbitron";
      ctx.fillText("Score: " + score, 10, 20);

      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ffcc";
        ctx.font = "28px Orbitron";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 15);
        ctx.font = "16px Poppins";
        ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 15);
        ctx.font = "13px Poppins";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("Press Space or Tap to restart", canvas.width / 2, canvas.height / 2 + 45);
        ctx.textAlign = "left";
      }
    }

    function update() {
      if (gameOver) return;
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (
        head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        gameOver = true;
        drawGame();
        clearInterval(interval);
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = spawnFood();
      } else {
        snake.pop();
      }
      drawGame();
    }

    function restart() {
      snake = [{ x: 10, y: 10 }];
      food = spawnFood();
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      gameOver = false;
      clearInterval(interval);
      interval = setInterval(update, 200);
    }

    function onKey(e) {
      const k = e.key;
      if (k === "ArrowUp" && dir.y === 0) nextDir = { x: 0, y: -1 };
      else if (k === "ArrowDown" && dir.y === 0) nextDir = { x: 0, y: 1 };
      else if (k === "ArrowLeft" && dir.x === 0) nextDir = { x: -1, y: 0 };
      else if (k === "ArrowRight" && dir.x === 0) nextDir = { x: 1, y: 0 };
      else if (k === " " && gameOver) restart();
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(k)) e.preventDefault();
    }

    let touchStartX = 0, touchStartY = 0;
    function onTouchStart(e) {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }
    function onTouchMove(e) {
      if (!gameOver) e.preventDefault();
    }
    function onTouchEnd(e) {
      if (e.changedTouches.length === 0) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && gameOver) return restart();
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30 && dir.x === 0) nextDir = { x: 1, y: 0 };
        else if (dx < -30 && dir.x === 0) nextDir = { x: -1, y: 0 };
      } else {
        if (dy > 30 && dir.y === 0) nextDir = { x: 0, y: 1 };
        else if (dy < -30 && dir.y === 0) nextDir = { x: 0, y: -1 };
      }
    }

    document.addEventListener("keydown", onKey);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    drawGame();
    interval = setInterval(update, 200);

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", onKey);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [game]);

  // ---- MEMORY MATCH ----
  useEffect(() => {
    if (game !== "memory" || !memoryRef.current) return;
    const container = memoryRef.current;

    function start() {
      const techIcons = [
        { name: "React", icon: "fab fa-react", color: "#61dafb" },
        { name: "Node", icon: "fab fa-node-js", color: "#68a063" },
        { name: "MongoDB", icon: "fas fa-database", color: "#4db33d" },
        { name: "JS", icon: "fab fa-js-square", color: "#f7df1e" },
        { name: "Docker", icon: "fab fa-docker", color: "#2496ed" },
        { name: "Git", icon: "fab fa-git-alt", color: "#f05032" },
        { name: "AWS", icon: "fab fa-aws", color: "#ff9900" },
        { name: "CSS", icon: "fab fa-css3-alt", color: "#264de4" },
      ];
      const cards = [...techIcons, ...techIcons].sort(() => Math.random() - 0.5);
      let flipped = [];
      let matched = 0;
      let moves = 0;
      let locked = false;

      container.innerHTML = `
        <div class="memory-header">
          <span class="memory-moves">Moves: <strong>0</strong></span>
          <span class="memory-matched">Matched: <strong>0</strong>/8</span>
        </div>
        <div class="memory-grid">
          ${cards.map((card, i) => `
            <div class="memory-card" data-index="${i}" data-name="${card.name}">
              <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">
                  <i class="${card.icon}" style="color:${card.color}"></i>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `;

      container.querySelectorAll(".memory-card").forEach((card) => {
        card.addEventListener("click", () => {
          if (locked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
          card.classList.add("flipped");
          flipped.push(card);
          if (flipped.length === 2) {
            moves++;
            container.querySelector(".memory-moves strong").textContent = moves;
            locked = true;
            const [a, b] = flipped;
            if (a.dataset.name === b.dataset.name) {
              a.classList.add("matched");
              b.classList.add("matched");
              matched++;
              container.querySelector(".memory-matched strong").textContent = matched;
              flipped = [];
              locked = false;
              if (matched === 8) {
                setTimeout(() => {
                  container.innerHTML += `
                    <div class="memory-win">
                      <h3>You Win!</h3>
                      <p>Completed in ${moves} moves</p>
                      <button class="cta-button memory-restart">Play Again</button>
                    </div>
                  `;
                  container.querySelector(".memory-restart").addEventListener("click", start);
                }, 500);
              }
            } else {
              setTimeout(() => {
                a.classList.remove("flipped");
                b.classList.remove("flipped");
                flipped = [];
                locked = false;
              }, 800);
            }
          }
        });
      });
    }

    start();
    return () => {
      container.innerHTML = "";
    };
  }, [game]);

  // ---- TYPING TEST ----
  useEffect(() => {
    if (game !== "typing" || !typingRef.current) return;
    const container = typingRef.current;
    let wpmInterval;

    function start() {
      clearInterval(wpmInterval);
      const sentences = [
        "const express = require('express');",
        "app.use(cors({ origin: '*' }));",
        "const user = await User.findById(id);",
        "router.post('/api/login', authController);",
        "io.on('connection', (socket) => {});",
        "mongoose.connect(process.env.MONGO_URI);",
        "const token = jwt.sign({ id }, secret);",
        "res.status(200).json({ success: true });",
        "const [state, setState] = useState(null);",
        "useEffect(() => { fetchData(); }, []);",
      ];
      const shuffled = sentences.sort(() => Math.random() - 0.5).slice(0, 5);
      const fullText = shuffled.join("\n");
      let startTime = null;
      let currentIndex = 0;
      let errors = 0;
      let finished = false;

      container.innerHTML = `
        <div class="typing-container">
          <div class="typing-header">
            <span class="typing-wpm">WPM: <strong>0</strong></span>
            <span class="typing-accuracy">Accuracy: <strong>100%</strong></span>
            <span class="typing-time">Time: <strong>0s</strong></span>
          </div>
          <div class="typing-text"></div>
          <input type="text" class="typing-input" placeholder="Start typing here..." autocomplete="off" autofocus />
          <p class="typing-hint">Type the highlighted code above. Press Enter after each line.</p>
        </div>
      `;

      const typingTextEl = container.querySelector(".typing-text");
      const typingInput = container.querySelector(".typing-input");

      function renderText() {
        let html = "";
        for (let i = 0; i < fullText.length; i++) {
          let cls = "";
          if (i < currentIndex) cls = "typed-correct";
          else if (i === currentIndex) cls = "typed-current";
          const raw = fullText[i] === "\n" ? "↵\n" : fullText[i];
          const ch = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;");
          html += `<span class="${cls}">${ch}</span>`;
        }
        typingTextEl.innerHTML = html;
      }

      renderText();
      typingInput.focus();

      wpmInterval = setInterval(() => {
        if (!startTime || finished) return;
        const elapsed = (Date.now() - startTime) / 1000;
        container.querySelector(".typing-time strong").textContent = Math.floor(elapsed) + "s";
        const words = currentIndex / 5;
        const wpm = Math.round((words / elapsed) * 60) || 0;
        container.querySelector(".typing-wpm strong").textContent = wpm;
      }, 500);

      typingInput.addEventListener("input", (e) => {
        if (finished) return;
        if (!startTime) startTime = Date.now();
        const typedChar = e.data;
        if (typedChar === null) return;

        if (typedChar === fullText[currentIndex]) {
          currentIndex++;
        } else if (fullText[currentIndex] === "\n") {
          return;
        } else {
          errors++;
          currentIndex++;
        }

        const accuracy = Math.max(0, Math.round(((currentIndex - errors) / currentIndex) * 100));
        container.querySelector(".typing-accuracy strong").textContent = accuracy + "%";
        typingInput.value = "";
        renderText();

        if (currentIndex >= fullText.length) {
          finished = true;
          clearInterval(wpmInterval);
          const elapsed = (Date.now() - startTime) / 1000;
          const words = fullText.length / 5;
          const finalWpm = Math.round((words / elapsed) * 60);
          const finalAccuracy = Math.max(0, Math.round(((fullText.length - errors) / fullText.length) * 100));
          container.innerHTML += `
            <div class="typing-result">
              <h3>${finalWpm > 60 ? "Blazing Fast!" : finalWpm > 40 ? "Great Speed!" : "Keep Practicing!"}</h3>
              <div class="typing-result-stats">
                <div><strong>${finalWpm}</strong> WPM</div>
                <div><strong>${finalAccuracy}%</strong> Accuracy</div>
                <div><strong>${Math.round(elapsed)}s</strong> Time</div>
              </div>
              <button class="cta-button typing-restart">Try Again</button>
            </div>
          `;
          container.querySelector(".typing-restart").addEventListener("click", start);
        }
      });

      typingInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && fullText[currentIndex] === "\n") {
          e.preventDefault();
          currentIndex++;
          renderText();
          typingInput.value = "";
        }
      });
    }

    start();
    return () => {
      clearInterval(wpmInterval);
      container.innerHTML = "";
    };
  }, [game]);

  return (
    <div className={"arcade-overlay" + (open ? " open" : "")}>
      <div className="arcade-modal">
        <div className="arcade-header">
          <h2 className="arcade-title"><i className="fas fa-gamepad"></i> Secret Arcade</h2>
          <p className="arcade-hint">You found it! Press <kbd>Ctrl+G</kbd> or click X to close</p>
          <button className="arcade-close" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <div className="arcade-menu" style={{ display: game ? "none" : "grid" }}>
          {[
            ["snake", "🐍", "Snake", "Classic snake game"],
            ["memory", "🧠", "Memory Match", "Match the tech logos"],
            ["typing", "⌨️", "Typing Test", "Test your speed"],
          ].map(([key, icon, name, desc]) => (
            <button className="arcade-game-btn" key={key} onClick={() => setGame(key)}>
              <span className="arcade-game-icon">{icon}</span>
              <span className="arcade-game-name">{name}</span>
              <span className="arcade-game-desc">{desc}</span>
            </button>
          ))}
        </div>

        <div className="arcade-game-area" style={{ display: game ? "block" : "none" }}>
          <button className="arcade-back-btn" onClick={() => setGame(null)}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <canvas
            ref={canvasRef}
            width="400"
            height="400"
            style={{ display: game === "snake" ? "block" : "none" }}
          ></canvas>
          <div ref={memoryRef} style={{ display: game === "memory" ? "block" : "none" }}></div>
          <div ref={typingRef} style={{ display: game === "typing" ? "block" : "none" }}></div>
        </div>
      </div>
    </div>
  );
}
