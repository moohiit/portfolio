import SectionTitle from "./SectionTitle.jsx";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <SectionTitle number="10">Get In Touch</SectionTitle>

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
                  <a href="mailto:mohit.patel.edu@gmail.com">mohit.patel.edu@gmail.com</a>
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
            <form action="https://api.web3forms.com/submit" method="POST">
              <input type="hidden" name="access_key" value="0db51182-14c2-4b47-bc33-f3fcbb1c7b55" />
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

              <button type="submit" className="cta-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
