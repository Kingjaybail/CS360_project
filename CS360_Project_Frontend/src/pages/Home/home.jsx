import React from "react";
import routed_connectors from "../../components/Connector/connector";
import RateModal from "../../components/Rating/RateModal";
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
  { id: "b9", title: "Jurassic Park", author: "Michael Crichton" },
];

export default function Home() {
  const [rateOpen, setRateOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [ratings, setRatings] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bookRatings") || "{}");
    } catch {
      return {};
    }
  });

  const openRate = (book) => {
    setSelectedBook(book);
    setRateOpen(true);
  };
  const closeRate = () => setRateOpen(false);

  const handleRate = (book, value) => {
    setRatings((prev) => {
      const next = { ...prev, [book.id]: value };
      localStorage.setItem("bookRatings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="home">
      {/* Home-only parchment background */}
      <div className="home__bg" aria-hidden />

      {/* Header + action */}
      <header className="home__header">
        <div>
          <h1 className="home__title">Home Library</h1>
        </div>
        <div className="home__actions">
          <button
            className="btn"
            onClick={() =>
              routed_connectors.get_book_info("The lord of the rings")
            }
          >
            Get book information
          </button>
        </div>
      </header>

      {/* Search (REPLACE WHEN BACKEND READY) */}
      <div className="home__search">
        <input
          className="home__searchInput"
          placeholder="Find new books…"
          type="text"
        />
        <button className="btn btn--contrast">Search</button>
      </div>

      {/* Grid of square recommendation cards */}
      <section className="home__grid">
        {MOCK_BOOKS.map((b) => (
          <article
            key={b.id}
            className="book"
            tabIndex={0}
            onClick={() => openRate(b)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openRate(b);
            }}
          >
            <div className="book__cover" aria-hidden>
              <span className="book__initials">
                {b.title
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>

            <div className="book__meta">
              <h3 className="book__title" title={b.title}>
                {b.title}
              </h3>
              <p className="book__author">{b.author}</p>

              <div className="book__footer">
                <span className="book__tag">
                  {ratings[b.id]
                    ? `Rated: ${"★".repeat(ratings[b.id])}`
                    : "Recommended"}
                </span>
                <button
                  className="btn btn--small"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openRate(b);
                  }}
                >
                  Rate
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Rating modal */}
      <RateModal
        book={selectedBook}
        open={rateOpen}
        onClose={closeRate}
        onRate={handleRate}
        initial={selectedBook ? ratings[selectedBook.id] || 0 : 0}
      />
    </div>
  );
}
