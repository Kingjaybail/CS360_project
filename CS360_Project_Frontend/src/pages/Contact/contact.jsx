import React, { useState } from "react";
import "./contact.scss";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // fake submit for now( no backend)
    setStatus("Thanks! We’ll get back to you soon.");
    console.log("Contact form data (mock):", data);
    e.currentTarget.reset();
  };

  return (
    <div className="contact">
      <div className="contact__bg" aria-hidden />

      <header className="contact__header">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__subtitle">
          Have a question or feature idea? Drop us a note.
        </p>
      </header>

      <div className="contact__content">
        {/* Left: form */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name<span aria-hidden="true">*</span></label>
            <input id="name" name="name" type="text" required placeholder="Your name" />
            <small className="error" data-for="name">Please enter your name.</small>
          </div>

          <div className="field">
            <label htmlFor="email">Email<span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
            <small className="error" data-for="email">Please enter a valid email.</small>
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="What's this about?" />
          </div>

          <div className="field">
            <label htmlFor="message">Message<span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" required placeholder="How can we help?" rows="6" />
            <small className="error" data-for="message">Please enter a message.</small>
          </div>

          <div className="actions">
            <button type="submit" className="btn">Send</button>
          </div>

          {status && <p className="contact__status" role="status">{status}</p>}
        </form>

        {/* Right: info panel */}
        <aside className="contact__info">
          <div className="infoCard">
            <h2>Get in touch</h2>
            <p>We typically reply within 1–2 business days.</p>
            <ul className="infoList">
              <li><strong>Email:</strong> <a href="mailto:johnathanbailey2022@gmail.com">johnathanbailey2022@gmail.com</a></li>
              <li><strong>X:</strong> <a href="https://twitter.com/@Kingjaybail">Kingjaybail</a></li>
              <li><strong>Address:</strong> <a href="https://www.google.com/maps/place/1421+Chestnut+St,+Bowling+Green,+KY+42101">1421 Chestnut St, Bowling Green, KY 42101</a></li>
            </ul>
            <p className="small">
              Please do not send sensitive information through this form.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
