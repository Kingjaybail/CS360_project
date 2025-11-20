# Generate testcases for our library stuff

from app.model import library_model, user_model
from app.services import open_library
import requests

#########################################
# Library Model Tests
#########################################

def test_fetch_user_books_empty_no_user():
    # username not created
    result = library_model.fetch_user_books("no_such_user")
    assert result == []


def test_fetch_user_books_with_ratings(monkeypatch, unique_username):
    # Create user and rating row
    #monkeypatch is a pytest fixture that reroutes DB calls to a temp DB
    user_model.create_user(unique_username, "pw123")
    info = user_model.get_user(unique_username, "")
    user_id = info["user_id"]

    # Insert a rating directly
    from app.config.database import get_connection
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO Users_lib (USER_ID, BOOK_ID, RATING) VALUES (?, ?, ?)",
        (user_id, "book_123", 5),
    )
    conn.commit()
    conn.close()

    # Mock find_book_by_id to avoid lookuping external API
    def fake_find_book_by_id(book_id):
        assert book_id == "book_123"
        return {
            "id": book_id,
            "title": "Fake Book",
            "authors": ["Test Author"],
            "genre": ["Fiction"],
            "thumbnail": None,
            "description": "Test description",
        }

    monkeypatch.setattr(library_model, "find_book_by_id", fake_find_book_by_id)

    # Now call
    books = library_model.fetch_user_books(unique_username)
    assert len(books) == 1
    b = books[0]
    assert b["id"] == "book_123"
    assert b["user_rating"] == 5
    assert b["title"] == "Fake Book"

#########################################
# Open Library Tests
#########################################

class DummyResponse:
    def __init__(self, json_data):
        self._json = json_data

    def json(self):
        return self._json


def test_find_book_by_id_parsing(monkeypatch):
    def fake_get(url, headers=None):
        return DummyResponse({
            "id": "abc123",
            "volumeInfo": {
                "title": "Test Title",
                "authors": ["Author 1"],
                "categories": ["Category A"],
                "imageLinks": {"thumbnail": "thumb_url"},
                "description": "Desc",
            },
        })

    
    monkeypatch.setattr(requests, "get", fake_get)

    book = open_library.find_book_by_id("abc123")
    assert book["id"] == "abc123"
    assert book["title"] == "Test Title"
    assert book["authors"] == ["Author 1"]
    assert book["genre"] == ["Category A"]
    assert book["thumbnail"] == "thumb_url"
    assert book["description"] == "Desc"


def test_find_book_by_name_parsing(monkeypatch):
    def fake_get(url, headers=None):
        return DummyResponse({
            "items": [
                {
                    "id": "b1",
                    "volumeInfo": {
                        "title": "Book 1",
                        "authors": ["A1"],
                        "categories": ["C1"],
                        "imageLinks": {"smallThumbnail": "small1"},
                        "description": "D1",
                    },
                },
                {
                    "id": "b2",
                    "volumeInfo": {
                        "title": "Book 2",
                        "authors": ["A2"],
                        "categories": ["C2"],
                        "imageLinks": {"thumbnail": "thumb2"},
                        "description": "D2",
                    },
                },
            ]
        })

    monkeypatch.setattr(requests, "get", fake_get)

    books = open_library.find_book_by_name("anything")
    assert len(books) == 2
    assert books[0]["id"] == "b1"
    assert books[1]["id"] == "b2"
