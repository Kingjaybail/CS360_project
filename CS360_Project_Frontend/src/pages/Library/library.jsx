import React, { useEffect, useState, useRef } from "react";
import routed_connectors from "../../components/Connector/connector";
import RateModal from "../../components/Rating/RateModal";
import "./library.scss";

function RowWheel({ title, books, onOpen }) {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const card = trackRef.current;
    if (!card) return;
    card.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="wheel">
      <div className="wheel__header">
        <h2 className="wheel__title">{title}</h2>
        <div className="wheel__controls">
          <button className="btn btn--small" onClick={() => scrollByCards(-1)}>‹</button>
          <button className="btn btn--small" onClick={() => scrollByCards(1)}>›</button>
        </div>
      </div>

      <div className="wheel__track" ref={trackRef}>
        {books.map((b) => (
          <article key={b.id} className="tile" onClick={() => onOpen(b)}>
            <div className="tile__cover">
              {b.thumbnail ? (
                <img src={b.thumbnail} className="tile__img" alt={b.title} />
              ) : (
                <span className="tile__initials">
                  {b.title?.slice(0, 2)?.toUpperCase() || "??"}
                </span>
              )}
            </div>

            <div className="tile__meta">
              <h3 className="tile__title">{b.title}</h3>
              <p className="tile__author">
                {Array.isArray(b.authors) ? b.authors.join(", ") : b.authors}
              </p>
              {b.user_rating && (
                <p className="tile__rating">Your Rating: {b.user_rating} ★</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Library() {
  const [rateOpen, setRateOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const username = JSON.parse(localStorage.getItem("username"))?.username;

  const loadUserBooks = async () => {
    if (!username) return;
    const res = await routed_connectors.get_user_rated_books(username);
    setUserBooks(Array.isArray(res) ? res : res.books || []);
  };

  useEffect(() => {
    loadUserBooks();
  }, [username]);

  useEffect(() => {
    async function loadRecs() {
      if (!username) return;
      const res = await routed_connectors.get_recommendations(username);
      setRecommended(res.recommended || []);
      setLoading(false);
    }
    loadRecs();
  }, [username]);

  const handleRate = async (book, value) => {
    if (!book || !username) return;

    try {
      const ratingValue =
        typeof value === "number"
          ? value
          : value?.user_rating || value?.rating || 0;

      if (!ratingValue) {
        console.warn("Invalid rating value:", value);
        return;
      }

      await routed_connectors.update_user_rating({
        bookId: book.id,
        username,
        rating: ratingValue,
      });

      await Promise.all([
        loadUserBooks(),
        refreshRecommendations()
      ]);
    } catch (err) {
      console.error("Error updating rating:", err);
    }
  };

  const refreshRecommendations = async () => {
    if (!username) return;
    try {
      setRefreshing(true);
      const res = await routed_connectors.get_recommendations(username);
      setRecommended(res.recommended || []);
    } catch (err) {
      console.error("Error refreshing recommendations:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const openRate = (book) => {
    setSelectedBook(book);
    setRateOpen(true);
  };

  const closeRate = () => setRateOpen(false);

  return (
    <div className="library">
      <div className="library__bg" aria-hidden />

      <header className="library__header">
        <h1>Your Library</h1>
        <p>Books you rated & personalized recommendations</p>
        <button
          className="btn btn--small"
          onClick={refreshRecommendations}
          disabled={refreshing}
          style={{ marginTop: "8px" }}
        >
          {refreshing ? "Refreshing..." : "Refresh Recommendations"}
        </button>
      </header>

      <RowWheel title="Your Rated Books" books={userBooks} onOpen={openRate} />

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading recommendations...
        </p>
      ) : (
        <RowWheel
          title="Your Recommendations"
          books={recommended}
          onOpen={openRate}
        />
      )}

      <RateModal
        book={selectedBook}
        open={rateOpen}
        onClose={closeRate}
        onRate={handleRate}
        initial={selectedBook ? selectedBook.user_rating || 0 : 0}
      />
    </div>
  );
}
