import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./contact.scss";
const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || "mnnoelqo";


export default function Contact() {
  // Prefer env; fallback to hardcoded ID if you want
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID || "mnnoelqo";
  const [state, handleSubmit] = useForm(formId);

const Success = () => (
  <div className="contact">
    <div className="contact__bg" aria-hidden />
    <header className="contact__header">
      <h1 className="contact__title">Contact Us</h1>
      <p className="contact__subtitle">Thanks! Your message has been sent.</p>
    </header>
    <div className="contact__content">
      <div className="contact__form infoCard infoCard--light">
        <h2>We’ll be in touch</h2>
        <p>We typically reply within 1–2 business days.</p>
      </div>
    </div>
  </div>
);

  if (state.succeeded) return <Success />;

  return (
    <div className="contact">
      <div className="contact__bg" aria-hidden />

      <header className="contact__header">
        <h1 className="contact__title">Contact Us</h1>
        <p className="contact__subtitle">Have a question or feature idea? Drop us a note.</p>
      </header>

      <div className="contact__content">
        {/* LEFT: Formspree-enabled form */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="field">
            <label htmlFor="user_name">Name<span aria-hidden="true">*</span></label>
            <input id="user_name" name="user_name" type="text" required placeholder="Your name" />
            <ValidationError prefix="Name" field="user_name" errors={state.errors} />
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email<span aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          {/* Subject (optional) */}
          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="What's this about?" />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} />
          </div>

          {/* Message */}
          <div className="field">
            <label htmlFor="message">Message<span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" required placeholder="How can we help?" rows="6" />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          {/* Honeypot to reduce spam (Formspree will ignore it if you set it in dashboard, but harmless either way) */}
          <input
            type="text"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />

          <div className="actions">
            <button type="submit" className="btn" disabled={state.submitting}>
              {state.submitting ? "Sending…" : "Send"}
            </button>
          </div>
        </form>

        {/* RIGHT: info panel (unchanged) */}
        <aside className="contact__info">
          <div className="infoCard">
            <h2>Get in touch</h2>
            <p>We typically reply within 1–2 business days.</p>
            <ul className="infoList">
              <li><strong>Email:</strong> <a href="mailto:johnathanbailey2022@gmail.com">johnathanbailey2022@gmail.com</a></li>
              <li><strong>X:</strong> <a href="https://twitter.com/@Kingjaybail" target="_blank" rel="noreferrer">@Kingjaybail</a></li>
              <li><strong>Address:</strong> <a href="https://www.google.com/maps/place/1421+Chestnut+St,+Bowling+Green,+KY+42101" target="_blank" rel="noreferrer">1421 Chestnut St, Bowling Green, KY 42101</a></li>
            </ul>
            <p className="small">Please do not send sensitive information through this form.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
