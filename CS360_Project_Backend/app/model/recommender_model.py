import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config.database import get_connection
from app.services.open_library import find_book_by_id, find_book_by_name


def _get_user_id(username: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT USER_ID FROM Users WHERE USERNAME = ?", (username,))
    row = cur.fetchone()
    conn.close()
    return row["USER_ID"] if row else None


def _get_user_ratings(user_id: str):

    conn = get_connection()
    df = pd.read_sql_query(
        "SELECT BOOK_ID, RATING FROM Users_lib WHERE USER_ID = ?",
        conn,
        params=(user_id,),
    )
    conn.close()
    return df


def _build_book_text(book: dict) -> str:
    parts = [
        book.get("title") or "",
        " ".join(book.get("authors") or []),
        " ".join(book.get("genre") or []),
        book.get("description") or "",
    ]
    return " ".join(parts)


def recommend_books_for_user(username: str, n_recs: int = 12):
    user_id = _get_user_id(username)
    print("Recommending books")
    if not user_id:
        return {"recommended": []}

    ratings_df = _get_user_ratings(user_id)
    if ratings_df.empty: # this just gets a generic rec if theres no ratings yet
        seeds = ["fantasy", "science", "magic", "space", "history", "romance"]
        import random # for some reason it wont let me import outside of here we hate python sometimes lmao
        term = random.choice(seeds)
        candidates = find_book_by_name(term)[:n_recs]
        return {"recommended": candidates, "reason": "no_ratings_fallback"}

    rated_books = []
    for _, row in ratings_df.iterrows():
        book_meta = find_book_by_id(row["BOOK_ID"])
        if book_meta:
            book_meta["user_rating"] = int(row["RATING"])
            rated_books.append(book_meta)

    if not rated_books:
        return {"recommended": [], "reason": "no_meta_for_rated"}

    liked_books = [b for b in rated_books if b["user_rating"] >= 4]
    if not liked_books:
        liked_books = rated_books  # if user only gave low ratings, still use them

    # For now: search by some tags + authors of liked books
    candidate_books = {}
    import random

    seeds = ["fantasy", "science", "space", "magic", "novel", "adventure"]
    for b in liked_books:
        seeds.append(b["title"])
        for a in b.get("authors") or []:
            seeds.append(a)

    random.shuffle(seeds)
    seeds = seeds[:6]

    for term in seeds:
        try:
            for item in find_book_by_name(term)[:6]:
                candidate_books[item["id"]] = item
        except Exception:
            continue

    rated_ids = set(ratings_df["BOOK_ID"])
    candidates = [b for bid, b in candidate_books.items() if bid not in rated_ids]

    if not candidates:
        return {"recommended": [], "reason": "no_candidates"}

    all_books = liked_books + candidates
    texts = [_build_book_text(b) for b in all_books]

    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    tfidf_matrix = vectorizer.fit_transform(texts)

    liked_vecs = tfidf_matrix[: len(liked_books)]
    cand_vecs = tfidf_matrix[len(liked_books) :]

    ratings_for_liked = np.array([b["user_rating"] for b in liked_books], dtype=float)
    # normalize weights to 0-1
    weights = ratings_for_liked / ratings_for_liked.max()
    user_profile = np.average(liked_vecs.toarray(), axis=0, weights=weights)

    sims = cosine_similarity(cand_vecs, user_profile.reshape(1, -1)).ravel()

    scored = list(zip(candidates, sims))
    scored.sort(key=lambda x: x[1], reverse=True)

    top = [b for (b, score) in scored[:n_recs]]

    return {
        "recommended": top,
        "reason": "content_based",
        "liked_count": len(liked_books),
        "candidate_count": len(candidates),
    }
