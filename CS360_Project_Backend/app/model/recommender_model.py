import random
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config.database import get_connection
from app.services.open_library import find_book_by_id, find_book_by_name


def _get_user_id(username: str):
    with get_connection() as conn:
        cur = conn.cursor()
        cur.execute("SELECT USER_ID FROM Users WHERE USERNAME = ?", (username,))
        row = cur.fetchone()
    return row["USER_ID"] if row else None


def _get_user_ratings(user_id: str):
    with get_connection() as conn:
        return pd.read_sql_query(
            "SELECT BOOK_ID, RATING FROM Users_lib WHERE USER_ID = ?",
            conn,
            params=(user_id,),
        )


def _build_book_text(book: dict) -> str:
    return " ".join(
        filter(
            None,
            [
                book.get("title"),
                " ".join(book.get("authors") or []),
                " ".join(book.get("genre") or []),
                book.get("description"),
            ],
        )
    )


def _fallback_recommendations(n_recs: int = 12):
    term = random.choice(["fantasy", "science", "magic", "space", "history", "romance"])
    return find_book_by_name(term)[:n_recs]


def recommend_books_for_user(username: str, n_recs: int = 12):
    user_id = _get_user_id(username)
    if not user_id:
        return {"recommended": []}

    ratings_df = _get_user_ratings(user_id)
    if ratings_df.empty:
        return {"recommended": _fallback_recommendations(n_recs), "reason": "no_ratings_fallback"}

    rated_books = []
    for _, row in ratings_df.iterrows():
        book = find_book_by_id(row["BOOK_ID"])
        if book:
            book["user_rating"] = int(row["RATING"])
            rated_books.append(book)

    if not rated_books:
        return {"recommended": [], "reason": "no_meta_for_rated"}

    liked_books = [b for b in rated_books if b["user_rating"] >= 3] or rated_books

    seeds = {"fantasy", "science", "space", "magic", "novel", "adventure"}
    for b in liked_books:
        seeds.add(b["title"])
        seeds.update(b.get("authors") or [])
    seeds = random.sample(list(seeds), k=min(6, len(seeds)))

    # Fetch candidates
    candidates = {}
    for term in seeds:
        for item in find_book_by_name(term)[:6]:
            candidates[item["id"]] = item

    rated_ids = {r["BOOK_ID"] for _, r in ratings_df.iterrows()}
    candidates = [b for b in candidates.values() if b["id"] not in rated_ids]

    if not candidates:
        return {"recommended": [], "reason": "no_candidates"}

    all_books = liked_books + candidates
    texts = [_build_book_text(b) for b in all_books]

    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    tfidf = vectorizer.fit_transform(texts)

    liked_vecs = tfidf[: len(liked_books)]
    cand_vecs = tfidf[len(liked_books) :]

    weights = np.array([b["user_rating"] for b in liked_books], dtype=float)
    weights /= weights.max()
    profile = np.average(liked_vecs.toarray(), axis=0, weights=weights)

    sims = cosine_similarity(cand_vecs, profile.reshape(1, -1)).ravel()
    top = [b for b, _ in sorted(zip(candidates, sims), key=lambda x: x[1], reverse=True)[:n_recs]]

    return {
        "recommended": top,
        "reason": "content_based",
        "liked_count": len(liked_books),
        "candidate_count": len(candidates),
    }
