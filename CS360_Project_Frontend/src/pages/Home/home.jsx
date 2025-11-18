import React, { useEffect } from "react";
import routed_connectors from "../../components/Connector/connector";
import RateModal from "../../components/Rating/RateModal";
import "./home.scss";

export default function Home() {
  const [books, setBooks] = React.useState([]);
  const [rateOpen, setRateOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");

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

  useEffect(() => {
    async function load() {
      const list = await routed_connectors.get_home_page_books();
      setBooks(list);
    }
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem("bookRatings", JSON.stringify(ratings));
  }, [ratings]);

  const handleRate = (book, value) => {
    setRatings((prev) => {
      const usernameObj = JSON.parse(localStorage.getItem("username"));
      const username = usernameObj?.username;

      routed_connectors.update_user_rating({
        bookId: book.id,
        username: username,
        rating: value
      });

      return { ...prev, [book.id]: value };
    });
  };

  const find_book = async () => {
    try {
      const res = await routed_connectors.get_book_info(searchInput);
      console.log("Book info", res);

      setSelectedBook(res);
      setRateOpen(true);
    } catch {
      console.log("Error");
    }
  };

  return (
    <div className="home">
      <div className="home__bg" aria-hidden />

      <header className="home__header">
        <div>
          <h1 className="home__title">Home Library</h1>
        </div>
        <div className="home__actions">
          <button
            className="btn"
            onClick={() => routed_connectors.get_book_info("The lord of the rings")}
          >
            Get book information
          </button>
        </div>
      </header>

      <div className="home__search">
        <input
          className="home__searchInput"
          placeholder="Find new books…"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn--contrast" onClick={find_book}>
          Search
        </button>
      </div>

      <section className="home__grid">
        {books.map((b) => (
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
              {b.thumbnail ? (
                <img src={b.thumbnail} alt={b.title} className="book__img" />
              ) : (
                <span className="book__initials">
                  {b.title
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div className="book__meta">
              <h3 className="book__title" title={b.title}>
                {b.title}
              </h3>

              <p className="book__author">
                {Array.isArray(b.authors) ? b.authors.join(", ") : b.authors}
              </p>

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

      <RateModal
        book={selectedBook}
        open={rateOpen}
        onClose={closeRate}
        onRate={handleRate}
        initial={selectedBook ? ratings[selectedBook?.id] || 0 : 0}
      />
    </div>
  );
}
