import React from "react";
import "./about.scss";

export default function About() {
  return (
    <div className="about">
      <div className="about__bg" aria-hidden />

      <header className="about__header">
        <h1 className="about__title">About Book Recs</h1>
        <p className="about__subtitle">
          A cozy place to discover your next favorite read.
        </p>
      </header>

      {/* Mission */}
      <section className="card">
        <h2>Our Mission</h2>
        <p>
          Help readers spend less time searching and more time reading. We blend
          personalized recommendations with simple, humane design.
        </p>
      </section>

      {/* What we’re building */}
      <section className="card card--grid">
        <div className="card__item">
          <h3>Personalized Library</h3>
          <p>
            Your home for books you love and ones we think you&apos;ll love.
            Wheels show <em>Recommendations</em>, <em>Might Like</em>, and books
            with similar <em>tags/genres</em>.
          </p>
        </div>
        <div className="card__item">
          <h3>Fast Search</h3>
          <p>
            Quick lookups for titles, authors, and series—then save to your
            library with a click.
          </p>
        </div>
        <div className="card__item">
          <h3>Thoughtful Design</h3>
          <p>
            A warm, readable UI inspired by parchment &amp; leather—easy on the
            eyes for long browsing sessions.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="card">
        <h2>How It Works</h2>
        <ol className="steps">
          <li><strong>Rate or save</strong> a few books you like.</li>
          <li><strong>We match</strong> patterns across tags, authors, and similar readers.</li>
          <li><strong>Explore</strong> wheels on your Library page and refine as you go.</li>
        </ol>
        <p className="small">
          We’ll plug in the recommendation engine when the backend is ready.
        </p>
      </section>

      {/* Tech stack */}
      <section className="card">
        <h2>Tech Stack</h2>
        <ul className="stack">
          <li><strong>Frontend:</strong> React + Vite, React Router, SCSS</li>
          <li><strong>Styles:</strong> Custom theme (espresso + parchment)</li>
          <li><strong>Contact:</strong> Formspree integration</li>
          <li><strong>Backend:</strong> (in progress) — API for books, tags, and recs</li>
        </ul>
      </section>
        {/* Team */}    
      <section className="card team">
        <h2>Team</h2>
        <div className="team__grid">
          <article className="member">
            <div className="avatar">JB</div>
            <div className="meta">
              <h3>Jay Bailey</h3>
              <p>Project Manager</p>
              <p>
                <a href="mailto:johnathan.bailey433@topper.wku.edu">
                  johnathan.bailey433@topper.wku.edu
                </a>
              </p>
            </div>
          </article>

          <article className="member">
            <div className="avatar">CD</div>
            <div className="meta">
              <h3>Connor DeBusschere</h3>
              <p>Frontend • UX</p>
              <p>
                <a href="mailto:Connor.debusschere122@topper.wku.edu">
                  Connor.debusschere122@topper.wku.edu
                </a>
              </p>
            </div>
          </article>

          <article className="member">
            <div className="avatar">JB</div>
            <div className="meta">
              <h3>James Brooks</h3>
              <p>Backend</p>
              <p>
                <a href="mailto:james.brooks741@topper.wku.edu">
                  james.brooks741@topper.wku.edu
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="card card--cta">
        <div>
          <h2>Have feedback?</h2>
          <p>We love suggestions—tell us what would make discovering books better.</p>
        </div>
        <a className="btn" href="/contact">Contact Us</a>
      </section>
    </div>
  );
}
