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

  if (!open) return null;

  return (
    <div className="rateModal__backdrop" role="dialog" aria-modal="true">
      <div className="rateModal" tabIndex={-1} ref={dialogRef}>
        <header className="rateModal__header">
          <h2>Rate this book</h2>
          <button className="rateModal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="rateModal__body">
          <div className="rateModal__cover">
            <span className="rateModal__initials">
              {book?.title?.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase()}
            </span>
          </div>
          <div className="rateModal__meta">
            <h3 className="rateModal__title">{book?.title}</h3>
            <p className="rateModal__author">{book?.author}</p>
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
            <span className="sr-only">{idx} star{idx>1?"s":""}</span>
          </button>
        );
      })}
    </div>
  );
}
