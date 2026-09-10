import { useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

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
    <section id="contact">
      <div className="container">
        <SectionTitle number="11">Get In Touch</SectionTitle>

        <div className="contact-container">
          <div className="contact-info">
            <h3 className="contact-title">Let's Connect</h3>
            <p>
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a
              project in mind or just want to connect!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div className="contact-text">
                  <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="contact-text">
                  <a href="tel:+917060993826">+91 7060993826</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fab fa-whatsapp"></i></div>
                <div className="contact-text">
                  <a href="https://wa.me/+917060993826" target="_blank" rel="noopener noreferrer">WhatsApp Me</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="contact-text">Gurgaon, Haryana, India</div>
              </div>
            </div>
          </div>

          <div className="contact-form">
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

              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="What is this regarding?" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Your message here..." required></textarea>
              </div>

              {/* aria-disabled rather than disabled: a disabled button drops keyboard focus to <body>
                  mid-submit. handleSubmit ignores repeat submits while a request is in flight. */}
              <button type="submit" className="cta-button" aria-disabled={sending} aria-busy={sending}>
                {sending ? "Sending…" : "Send Message"}
              </button>

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
          </div>
        </div>
      </div>
    </section>
  );
}
