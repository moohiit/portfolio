// Lab tab: sign a request with HMAC-SHA256 and send it to a mock server that
// checks the timestamp, the signature and the idempotency key, the patterns
// behind the Quikkred Collect lender API. Real Web Crypto, all in the browser;
// nothing is sent over the network.
import { useEffect, useRef, useState } from "react";

const SERVER_SECRET = "whsec_demo_4f9a2c";
const PATH = "/v1/collections";
const WINDOW_S = 300;
const DEFAULT_BODY = JSON.stringify(
  { case_id: "CS-10293", amount: "4500.00", currency: "INR", collected_by: "partner_118" },
  null,
  2
);

const enc = new TextEncoder();
const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const newKey = () => "idem_" + toHex(crypto.getRandomValues(new Uint8Array(5)));
const now = () => Math.floor(Date.now() / 1000);

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}
const sha256 = async (s) => toHex(await crypto.subtle.digest("SHA-256", enc.encode(s)));

// Same idea as crypto.timingSafeEqual: the time taken doesn't depend on where
// the strings first differ.
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function createServer() {
  const store = new Map();
  let created = 0;
  const reject = (checks, status, statusText, error) => ({ status, statusText, body: { error }, checks });

  return {
    created: () => created,
    async handle(req) {
      const checks = [];
      const drift = Math.abs(now() - req.ts);
      if (drift > WINDOW_S) {
        checks.push({ ok: false, text: `timestamp is ${Math.round(drift / 60)} min old (limit 5 min)` });
        return reject(checks, 401, "Unauthorized", "stale_timestamp");
      }
      checks.push({ ok: true, text: `timestamp within 5 min (drift ${drift}s)` });

      const expected = await hmac(SERVER_SECRET, `${req.ts}.${req.body}`);
      if (!safeEqual(expected, req.signature.replace(/^sha256=/, ""))) {
        checks.push({ ok: false, text: "signature does not match timestamp + body" });
        return reject(checks, 401, "Unauthorized", "invalid_signature");
      }
      checks.push({ ok: true, text: "signature matches (constant-time compare)" });

      let parsed;
      try {
        parsed = JSON.parse(req.body);
      } catch {
        checks.push({ ok: false, text: "body is not valid JSON" });
        return reject(checks, 400, "Bad Request", "invalid_json");
      }

      const hash = await sha256(req.body);
      const seen = store.get(req.key);
      if (seen) {
        if (seen.hash !== hash) {
          checks.push({ ok: false, text: "key already used with a different body" });
          return reject(checks, 422, "Unprocessable Entity", "idempotency_key_reused");
        }
        checks.push({ ok: "replay", text: "key seen, same body: stored response, nothing created" });
        return { ...seen.response, replayed: true, checks };
      }

      created += 1;
      const response = {
        status: 201,
        statusText: "Created",
        body: { id: `col_${String(created).padStart(4, "0")}`, case_id: parsed.case_id ?? null, status: "recorded" },
      };
      store.set(req.key, { hash, response });
      checks.push({ ok: true, text: "new idempotency key: collection recorded" });
      return { ...response, checks };
    },
  };
}

const SERVER_CODE = `// Fastify preHandler (simplified)
const ts = Number(req.headers["x-timestamp"]);
if (Math.abs(Date.now() / 1000 - ts) > 300)
  throw httpError(401, "stale_timestamp");

const expected = createHmac("sha256", lender.secret)
  .update(\`\${ts}.\${req.rawBody}\`).digest("hex");
const given = req.headers["x-signature"].replace("sha256=", "");
if (given.length !== expected.length ||
    !timingSafeEqual(Buffer.from(given), Buffer.from(expected)))
  throw httpError(401, "invalid_signature");

// Idempotency: same key + same body = same answer
const key = req.headers["idempotency-key"];
const hit = await idem.get(lender.id, key);
if (hit) {
  if (hit.bodyHash !== sha256(req.rawBody))
    throw httpError(422, "idempotency_key_reused");
  return reply.header("Idempotent-Replayed", "true")
    .code(hit.status).send(hit.body);
}`;

function Check({ c }) {
  const icon = c.ok === "replay" ? "fa-rotate-left" : c.ok ? "fa-check" : "fa-xmark";
  return (
    <li className={"api-check" + (c.ok === false ? " is-fail" : c.ok === "replay" ? " is-replay" : "")}>
      <i className={"fas " + icon} aria-hidden="true"></i>
      {c.text}
    </li>
  );
}

export default function ApiPlayground() {
  const supported = typeof window !== "undefined" && Boolean(window.crypto?.subtle);
  const server = useRef(null);
  const [secret, setSecret] = useState(SERVER_SECRET);
  const [key, setKey] = useState(() => (supported ? newKey() : ""));
  const [body, setBody] = useState(DEFAULT_BODY);
  const [ts, setTs] = useState(now);
  const [signature, setSignature] = useState("");
  const [last, setLast] = useState(null);
  const [log, setLog] = useState([]);
  const [view, setView] = useState("log");
  const [busy, setBusy] = useState(false);
  const logRef = useRef(null);

  server.current ??= createServer();

  // Live preview of the signature for what's in the form right now.
  useEffect(() => {
    if (!supported) return;
    let stale = false;
    hmac(secret, `${ts}.${body}`).then((sig) => !stale && setSignature(sig));
    return () => {
      stale = true;
    };
  }, [supported, secret, ts, body]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  if (!supported) {
    return (
      <div className="api-play api-play--unsupported">
        <p className="card-text">This demo needs Web Crypto, which browsers only enable on secure (https) pages.</p>
      </div>
    );
  }

  const send = async (req, note) => {
    setBusy(true);
    setView("log");
    await new Promise((r) => setTimeout(r, 220)); // feel like a network hop
    const res = await server.current.handle(req);
    setLog((l) => [...l.slice(-5), { n: (l.length ? l[l.length - 1].n : 0) + 1, req, res, note }]);
    setBusy(false);
  };

  const signAndSend = async () => {
    const t = now();
    setTs(t);
    const req = { ts: t, key, body, signature: "sha256=" + (await hmac(secret, `${t}.${body}`)) };
    setLast(req);
    send(req);
  };
  const replay = () => last && send(last, "replayed the same request");
  const tamper = () => {
    if (!last) return;
    const changed = last.body.includes("4500.00") ? last.body.replace("4500.00", "45000.00") : last.body + " ";
    send({ ...last, body: changed }, "body changed in transit, signature kept");
  };
  const stale = async () => {
    const t = now() - 600;
    send({ ts: t, key, body, signature: "sha256=" + (await hmac(secret, `${t}.${body}`)) }, "a captured request from 10 min ago");
  };

  const created = server.current.created();

  return (
    <div className="api-play">
      <div className="api-req">
        <div className="api-line">
          <span className="api-method">POST</span>
          <span className="api-path">{PATH}</span>
        </div>

        <dl className="api-headers">
          <div>
            <dt>X-Timestamp</dt>
            <dd>{ts}</dd>
          </div>
          <div>
            <dt>Idempotency-Key</dt>
            <dd className="api-key">
              <span>{key}</span>
              <button type="button" className="api-mini" onClick={() => setKey(newKey())} title="New key" aria-label="Generate a new idempotency key">
                <i className="fas fa-rotate" aria-hidden="true"></i>
              </button>
            </dd>
          </div>
          <div>
            <dt>X-Signature</dt>
            <dd className="api-sig">sha256={signature}</dd>
          </div>
        </dl>

        <label className="api-field">
          <span>Body</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} spellCheck={false} data-lenis-prevent />
        </label>
        <label className="api-field api-field--inline">
          <span>Client secret</span>
          <input value={secret} onChange={(e) => setSecret(e.target.value)} spellCheck={false} autoComplete="off" />
        </label>
        <p className="api-signed">
          signs <code>{"{X-Timestamp}.{body}"}</code> with HMAC-SHA256
        </p>

        <div className="api-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={signAndSend} disabled={busy}>
            <i className="fas fa-signature" aria-hidden="true"></i> Sign &amp; send
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={replay} disabled={busy || !last}>
            <i className="fas fa-rotate-left" aria-hidden="true"></i> Replay
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={tamper} disabled={busy || !last}>
            <i className="fas fa-user-secret" aria-hidden="true"></i> Tamper
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={stale} disabled={busy}>
            <i className="fas fa-clock-rotate-left" aria-hidden="true"></i> Old request
          </button>
        </div>
      </div>

      <div className="api-res">
        <div className="api-res-bar">
          <div className="api-switch" role="group" aria-label="Right panel">
            <button type="button" aria-pressed={view === "log"} className={view === "log" ? "is-active" : ""} onClick={() => setView("log")}>
              Server log
            </button>
            <button type="button" aria-pressed={view === "code"} className={view === "code" ? "is-active" : ""} onClick={() => setView("code")}>
              Verify code
            </button>
          </div>
          <span className="api-count" title="Collections the mock server has recorded">
            recorded: <strong>{created}</strong>
          </span>
        </div>

        {view === "code" ? (
          <pre className="api-code" data-lenis-prevent><code>{SERVER_CODE}</code></pre>
        ) : (
          <div className="api-log" ref={logRef} data-lenis-prevent aria-live="polite">
            {log.length === 0 && (
              <p className="api-empty">
                Send a request, then try <b>Replay</b> (no duplicate is created), edit the body and send again with the same
                key, change the secret, or <b>Tamper</b> with it in transit.
              </p>
            )}
            {log.map(({ n, req, res, note }) => (
              <div className="api-entry" key={n}>
                <div className="api-entry-req">
                  <span className="api-entry-n">#{n}</span> POST {PATH} <span className="api-dim">· {req.key}</span>
                </div>
                {note && <div className="api-note">{note}</div>}
                <ul>
                  {res.checks.map((c, i) => (
                    <Check c={c} key={i} />
                  ))}
                </ul>
                <div className={"api-status" + (res.status < 300 ? " is-ok" : " is-err")}>
                  ← {res.status} {res.statusText}
                  {res.replayed && <span className="api-dim"> · Idempotent-Replayed: true</span>}
                </div>
                <code className="api-body">{JSON.stringify(res.body)}</code>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
