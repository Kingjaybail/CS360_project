import React, { useRef } from "react";
import RateModal from "../../components/Rating/RateModal";
import "./library.scss";

// --- Mock data ---
const RECOMMENDED = [
  { id: "r1",  title: "The Left Hand of Darkness", author: "Ursula K. Le Guin" },
  { id: "r2",  title: "Neuromancer",                author: "William Gibson" },
  { id: "r3",  title: "Mistborn",                   author: "Brandon Sanderson" },
  { id: "r4",  title: "Kindred",                    author: "Octavia E. Butler" },
  { id: "r5",  title: "Project Hail Mary",          author: "Andy Weir" },
  { id: "r6",  title: "Snow Crash",                 author: "Neal Stephenson" },
  { id: "r7",  title: "Annihilation",               author: "Jeff VanderMeer" },
  { id: "r8",  title: "The Martian",                author: "Andy Weir" },
  { id: "r9",  title: "Station Eleven",             author: "Emily St. John Mandel" },
  { id: "r10", title: "The Road",                   author: "Cormac McCarthy" },
  { id: "r11", title: "A Darker Shade of Magic",    author: "V.E. Schwab" },
  { id: "r12", title: "The City & The City",        author: "China Miéville" },
];

const MIGHT_LIKE = [
  { id: "m1",  title: "Good Omens",                       author: "Pratchett & Gaiman" },
  { id: "m2",  title: "Red Rising",                       author: "Pierce Brown" },
  { id: "m3",  title: "Circe",                            author: "Madeline Miller" },
  { id: "m4",  title: "American Gods",                    author: "Neil Gaiman" },
  { id: "m5",  title: "Fahrenheit 451",                   author: "Ray Bradbury" },
  { id: "m6",  title: "The Priory of the Orange Tree",    author: "Samantha Shannon" },
  { id: "m7",  title: "The Night Circus",                 author: "Erin Morgenstern" },
  { id: "m8",  title: "The House in the Cerulean Sea",    author: "T.J. Klune" },
  { id: "m9",  title: "The Song of Achilles",             author: "Madeline Miller" },
  { id: "m10", title: "The Ocean at the End of the Lane", author: "Neil Gaiman" },
  { id: "m11", title: "The Power",                        author: "Naomi Alderman" },
  { id: "m12", title: "Babel",                            author: "R.F. Kuang" },
];

// tag/genre -> books
const BY_TAG = {
  Fantasy: [
    { id: "t1",  title: "The Final Empire",                author: "Brandon Sanderson" },
    { id: "t2",  title: "The Way of Kings",                author: "Brandon Sanderson" },
    { id: "t3",  title: "The Blade Itself",                author: "Joe Abercrombie" },
    { id: "t4",  title: "The Poppy War",                   author: "R.F. Kuang" },
    { id: "t5",  title: "Assassin’s Apprentice",           author: "Robin Hobb" },
    { id: "t6",  title: "The Lies of Locke Lamora",        author: "Scott Lynch" },
    { id: "t7",  title: "The Name of the Wind",            author: "Patrick Rothfuss" },
    { id: "t8",  title: "The Priory of the Orange Tree",   author: "Samantha Shannon" },
  ],
  "Sci-Fi": [
    { id: "s1", title: "Hyperion",               author: "Dan Simmons" },
    { id: "s2", title: "Children of Time",       author: "Adrian Tchaikovsky" },
    { id: "s3", title: "The Three-Body Problem", author: "Liu Cixin" },
    { id: "s4", title: "Old Man’s War",          author: "John Scalzi" },
    { id: "s5", title: "Blindsight",             author: "Peter Watts" },
    { id: "s6", title: "The Forever War",        author: "Joe Haldeman" },
    { id: "s7", title: "Contact",                author: "Carl Sagan" },
    { id: "s8", title: "A Memory Called Empire", author: "Arkady Martine" },
  ],
  Classics: [
    { id: "c1", title: "Brave New World",               author: "Aldous Huxley" },
    { id: "c2", title: "The Count of Monte Cristo",     author: "Alexandre Dumas" },
    { id: "c3", title: "The Picture of Dorian Gray",    author: "Oscar Wilde" },
    { id: "c4", title: "Crime and Punishment",          author: "Fyodor Dostoevsky" },
    { id: "c5", title: "Frankenstein",                  author: "Mary Shelley" },
    { id: "c6", title: "Dracula",                       author: "Bram Stoker" },
    { id: "c7", title: "The Odyssey",                   author: "Homer" },
    { id: "c8", title: "Jane Eyre",                     author: "Charlotte Brontë" },
  ],
};

// --- Reusable scroll wheel ---
function RowWheel({ title, books, onOpen }) {
  const trackRef = useRef(null);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  return (
    <section className="wheel">
      <div className="wheel__header">
        <h2 className="wheel__title">{title}</h2>
        <div className="wheel__controls">
          <button
            className="btn btn--small"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll left"
            type="button"
          >
            ‹
          </button>
          <button
            className="btn btn--small"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll right"
            type="button"
          >
            ›
          </button>
        </div>
      </div>

      <div className="wheel__track" ref={trackRef}>
        {books.map((b) => (
          <article
            key={b.id}
            className="tile"
            tabIndex={0}
            onClick={() => onOpen(b)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onOpen(b);
            }}
          >
            <div className="tile__cover" aria-hidden>
              <span className="tile__initials">
                {b.title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
              </span>
            </div>
            <div className="tile__meta">
              <h3 className="tile__title" title={b.title}>{b.title}</h3>
              <p className="tile__author">{b.author}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Library() {
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
    <div className="library">
      <div className="library__bg" aria-hidden />
      <header className="library__header">
        <h1 className="library__title">Your Library</h1>
        <p className="library__subtitle">Personalized picks and similar genres</p>
      </header>

      <RowWheel title="Your Recommendations" books={RECOMMENDED} onOpen={openRate} />
      <RowWheel title="Might Like This" books={MIGHT_LIKE} onOpen={openRate} />

      {Object.entries(BY_TAG).map(([tag, books]) => (
        <RowWheel key={tag} title={`Similar • ${tag}`} books={books} onOpen={openRate} />
      ))}

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
