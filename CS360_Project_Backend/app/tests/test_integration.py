# Integration tests for library controller and routes
import random

from app.controller import library_controller
from app.model import user_model
from app.services import open_library


def test_get_user_books_controller(monkeypatch, unique_username):
    # Mock model.fetch_user_books to avoid DB/API
    def fake_fetch(username):
        assert username == unique_username
        return [{"id": "book1"}, {"id": "book2"}]

    monkeypatch.setattr(library_controller.library_model, "fetch_user_books", fake_fetch)

    res = library_controller.get_user_books(unique_username)
    assert isinstance(res, list)
    assert len(res) == 2


def test_get_random_books(monkeypatch):
    # Mock find_book_by_name to return predictable list
    def fake_find_book_by_name(term):
        return [
            {
                "id": f"{term}_1",
                "title": f"{term} Book 1",
                "authors": ["A"],
                "genre": ["G"],
                "thumbnail": None,
                "description": "d",
            },
            {
                "id": f"{term}_2",
                "title": f"{term} Book 2",
                "authors": ["A"],
                "genre": ["G"],
                "thumbnail": None,
                "description": "d",
            },
        ]

    monkeypatch.setattr(open_library, "find_book_by_name", fake_find_book_by_name)

    books = library_controller.get_random_books()
    assert isinstance(books, list)
    ids = {b["id"] for b in books}
    assert len(ids) == len(books)


def test_library_user_books_route(client, monkeypatch, unique_username):
    # Create user and a rating row
    user_model.create_user(unique_username, "pw123")
    info = user_model.get_user(unique_username, "")
    user_id = info["user_id"]

    from app.config.database import get_connection
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Users_lib (USER_ID, BOOK_ID, RATING) VALUES (?, ?, ?)",
        (user_id, "book_001", 4),
    )
    conn.commit()
    conn.close()

    # Mock open_library.find_book_by_id used indirectly via library_model
    from app.model import library_model as lm

    def fake_find_book_by_id(book_id):
        return {
            "id": book_id,
            "title": "Route Fake Book",
            "authors": ["Tester"],
            "genre": ["Fiction"],
            "thumbnail": None,
            "description": "desc",
        }

    monkeypatch.setattr(lm, "find_book_by_id", fake_find_book_by_id)

    res = client.get(f"/library/user-books/{unique_username}")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert data[0]["id"] == "book_001"
    assert data[0]["user_rating"] == 4


def test_library_test_route(client):
    res = client.post("/library/test-library-route")
    assert res.status_code == 200
    assert res.json() == {"message": "Successful"}
