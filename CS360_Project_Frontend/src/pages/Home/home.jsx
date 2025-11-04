import React from "react";
import routed_connectors from "../../components/Connector/connector"; // fixed path
import "./home.scss";

const MOCK_BOOKS = [
  { id: "b1", title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: "b2", title: "Dune", author: "Frank Herbert" },
  { id: "b3", title: "1984", author: "George Orwell" },
  { id: "b4", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "b5", title: "Pride and Prejudice", author: "Jane Austen" },
  { id: "b6", title: "Foundation", author: "Isaac Asimov" },
  { id: "b7", title: "The Name of the Wind", author: "Patrick Rothfuss" },
  { id: "b8", title: "The Catcher in the Rye", author: "J.D. Salinger" },
];

export default function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <div>
          <h1 className="home__title">Home Library</h1>
          <p className="home__subtitle">Recommended for you</p>
        </div>
        <div className="home__actions">
          <button className="btn" onClick={() => routed_connectors.testConnector()}>
            Sample
          </button>
          <button
            className="btn"
            onClick={() => routed_connectors.get_book_info("The lord of the rings")}
          >
            Get book information
          </button>
        </div>
      </header>

      <div className="home__search">
        <input className="home__searchInput" placeholder="Find new books…" type="text" />
        <button className="btn btn--contrast">Search</button>
      </div>

      <section className="home__grid">
        {MOCK_BOOKS.map((b) => (
          <article key={b.id} className="book">
            <div className="book__cover" aria-hidden>
              <span className="book__initials">
                {b.title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
              </span>
            </div>
            <div className="book__meta">
              <h3 className="book__title" title={b.title}>{b.title}</h3>
              <p className="book__author">{b.author}</p>
              <div className="book__footer">
                <span className="book__tag">Recommended</span>
                <button className="btn btn--small" type="button">Details</button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
