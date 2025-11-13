import React, { useEffect, useRef } from "react";
import "./rateModal.scss";

export default function RateModal({ book, open, onClose, onRate, initial = 0 }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev && prev.focus?.();
    };
  }, [open, onClose]);

  if (!open || !book) return null;

  const initials = book.title
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const authors =
    book.authors && Array.isArray(book.authors)
      ? book.authors.join(", ")
      : book.author || "Unknown";

  return (
    <div className="rateModal__backdrop" role="dialog" aria-modal="true">
      <div className="rateModal" tabIndex={-1} ref={dialogRef}>

        <header className="rateModal__header">
          <h2>{book.title}</h2>
          <button className="rateModal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="rateModal__body">

          <div className="rateModal__cover">
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} className="rateModal__thumb" />
            ) : (
              <span className="rateModal__initials">{initials}</span>
            )}
          </div>

          <div className="rateModal__meta">
            <p className="rateModal__author"><strong>Author(s):</strong> {authors}</p>

            {book.genre && (
              <div className="rateModal__genres">
                <strong>Genres:</strong>
                <ul>
                  {book.genre.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
            )}

            {book.description && (
              <div className="rateModal__description"
                   dangerouslySetInnerHTML={{ __html: book.description }} />
            )}
          </div>
        </div>

        <RatingStars
          defaultValue={initial}
          onChange={(val) => onRate(book, val)}
        />

        <footer className="rateModal__footer">
          <button className="btn" onClick={onClose}>Done</button>
        </footer>
      </div>
    </div>
  );
}


function RatingStars({ max = 5, defaultValue = 0, onChange }) {
  const [value, setValue] = React.useState(defaultValue);

  useEffect(() => { setValue(defaultValue); }, [defaultValue]);

  const set = (v) => {
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="stars" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => {
        const idx = i + 1;
        return (
          <button
            key={idx}
            type="button"
            className={`star ${idx <= value ? "is-on" : ""}`}
            role="radio"
            aria-checked={idx === value}
            onClick={() => set(idx)}
            onMouseEnter={() => setValue(idx)}
            onMouseLeave={() => setValue(defaultValue)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
