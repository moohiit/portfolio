import { useState } from "react";
import { Magnetic, Reveal, SectionHeader } from "./ui.jsx";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const OWNER_EMAIL = "mohit.patel.edu@gmail.com";
const REQUEST_TIMEOUT_MS = 20000;
const MAX_SERVER_MESSAGE_CHARS = 200;

export default function Contact() {
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  // Web3Forms explains most rejections (invalid email, bad access key, spam score); shown with the error.
  const [serverMessage, setServerMessage] = useState("");
  const sending = status === "sending";
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(OWNER_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key) => String(data.get(key) || "").trim();
    const name = field("name");
    const subject = field("subject");

    // Honeypot: real visitors never see this box. If it is ticked, pretend
    // everything went fine and quietly drop the submission.
    const honeypot = form.elements.namedItem("botcheck");
    if (honeypot && honeypot.checked) {
      form.reset();
      setServerMessage("");
      setStatus("success");
      return;
    }

    const payload = {
      access_key: data.get("access_key"),
      from_name: "mohitpatel.org portfolio",
      name,
      email: field("email"),
      phone: field("phone"),
      subject: subject || `Portfolio contact from ${name}`,
      message: field("message"),
      botcheck: "",
    };

    setStatus("sending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result && result.success) {
        form.reset();
        setServerMessage("");
        setStatus("success");
      } else {
        const message = result && typeof result.message === "string" ? result.message.trim() : "";
        setServerMessage(message.slice(0, MAX_SERVER_MESSAGE_CHARS).replace(/[.!\s]+$/, ""));
        setStatus("error");
      }
    } catch {
      setServerMessage("");
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader
          index="09"
          eyebrow="Contact"
          title="Let's build something that ships"
          lead="Open to backend and full-stack roles, freelance APIs and collaborations. I usually reply within a day."
        />

        <div className="contact-grid">
          <Reveal className="contact-info">
            <div className="card contact-email">
              <span className="mono-label">Email</span>
              <a href={`mailto:${OWNER_EMAIL}`} className="contact-email-link">{OWNER_EMAIL}</a>
              <button type="button" className="btn btn-ghost btn-sm" onClick={copyEmail}>
                <i className={copied ? "fas fa-check" : "fas fa-copy"} aria-hidden="true"></i> {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <ul className="contact-list">
              <li>
                <span className="icon-tile icon-tile--sm"><i className="fas fa-phone" aria-hidden="true"></i></span>
                <a href="tel:+917060993826">+91 70609 93826</a>
              </li>
              <li>
                <span className="icon-tile icon-tile--sm"><i className="fab fa-whatsapp" aria-hidden="true"></i></span>
                <a href="https://wa.me/+917060993826" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
              </li>
              <li>
                <span className="icon-tile icon-tile--sm"><i className="fas fa-location-dot" aria-hidden="true"></i></span>
                <span>Gurgaon, Haryana, India</span>
              </li>
              <li>
                <span className="icon-tile icon-tile--sm"><i className="fab fa-linkedin-in" aria-hidden="true"></i></span>
                <a href="https://www.linkedin.com/in/moohiitpatel/" target="_blank" rel="noopener noreferrer">linkedin.com/in/moohiitpatel</a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="card contact-form" delay={0.1}>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="0db51182-14c2-4b47-bc33-f3fcbb1c7b55" />
              {/* Honeypot for bots: hidden from people, screen readers and the tab order. */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="you@company.com" autoComplete="email" required />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="+91 …" autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="What's it about?" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about the role or project…" required></textarea>
              </div>

              {/* aria-disabled rather than disabled: a disabled button drops keyboard focus to <body>
                  mid-submit. handleSubmit ignores repeat submits while a request is in flight. */}
              <Magnetic strength={0.2}>
                <button type="submit" className="btn btn-primary btn-lg" aria-disabled={sending} aria-busy={sending}>
                  {sending ? "Sending…" : "Send message"}
                  <i className={sending ? "fas fa-circle-notch fa-spin" : "fas fa-paper-plane"} aria-hidden="true"></i>
                </button>
              </Magnetic>

              <p
                className={`form-status${status === "success" || status === "error" ? ` form-status--${status}` : ""}`}
                role="status"
                aria-live="polite"
              >
                {status === "success" && "Thanks, your message is on its way. I usually reply within a day."}
                {status === "error" && (
                  <>
                    {serverMessage
                      ? `Your message didn't send: ${serverMessage}. Please check and try again, or`
                      : "Sorry, something went wrong and your message didn't send. Please try again in a moment, or"}{" "}
                    email me directly at <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>.
                  </>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
