# AI tests use pytest
import pandas as pd

from app.model import user_model
from app.model import recommender_model
from app.config.database import get_connection


def test_recommend_no_user():
    res = recommender_model.recommend_books_for_user("no_such_user_999")
    assert "recommended" in res
    assert res["recommended"] == []


def test_recommend_no_ratings(monkeypatch, unique_username):
    # Create user with no ratings
    user_model.create_user(unique_username, "pw123")

    # Force _get_user_ratings to return empty DataFrame
    monkeypatch.setattr(
        recommender_model,
        "_get_user_ratings",
        lambda user_id: pd.DataFrame(columns=["BOOK_ID", "RATING"]),
    )

    res = recommender_model.recommend_books_for_user(unique_username, n_recs=5)
    assert "recommended" in res
    assert len(res["recommended"]) <= 5
    assert res.get("reason") == "no_ratings_fallback"


def test_recommend_with_ratings_and_metadata(monkeypatch, unique_username):
    # Create user
    user_model.create_user(unique_username, "pw123")
    info = user_model.get_user(unique_username, "")
    user_id = info["user_id"]

    # insert some ratings
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Users_lib (USER_ID, BOOK_ID, RATING) VALUES (?, ?, ?)",
        (user_id, "book_A", 5),
    )
    cur.execute(
        "INSERT INTO Users_lib (USER_ID, BOOK_ID, RATING) VALUES (?, ?, ?)",
        (user_id, "book_B", 3),
    )
    conn.commit()
    conn.close()

    # Mock _get_user_ratings to return above
    def fake_get_ratings(uid):
        assert uid == user_id
        return pd.DataFrame(
            {"BOOK_ID": ["book_A", "book_B"], "RATING": [5, 3]}
        )

    monkeypatch.setattr(recommender_model, "_get_user_ratings", fake_get_ratings)

    # Mock find_book_by_id (for rated books)
    def fake_find_book_by_id(bid):
        return {
            "id": bid,
            "title": f"Title {bid}",
            "authors": ["Auth"],
            "genre": ["Genre"],
            "description": "desc",
        }

    monkeypatch.setattr(recommender_model, "find_book_by_id", fake_find_book_by_id)

    # Mock find_book_by_name
    def fake_find_book_by_name(term):
        # Return a few candidates per seed
        return [
            {
                "id": f"{term}_cand1",
                "title": f"{term} candidate 1",
                "authors": ["CA"],
                "genre": ["CG"],
                "description": "cd",
            },
            {
                "id": f"{term}_cand2",
                "title": f"{term} candidate 2",
                "authors": ["CA"],
                "genre": ["CG"],
                "description": "cd",
            },
        ]

    monkeypatch.setattr(recommender_model, "find_book_by_name", fake_find_book_by_name)

    res = recommender_model.recommend_books_for_user(unique_username, n_recs=5)
    assert "recommended" in res
    assert res.get("reason") in ("content_based", "no_candidates")
    # If there are recs, check structure
    if res["recommended"]:
        first = res["recommended"][0]
        assert "id" in first
        assert "title" in first
