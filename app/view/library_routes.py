# user library routes handles book adds and biz
from fastapi import APIRouter
from app.controller import library_controller
from app.services import open_library

router = APIRouter()

@router.post("/add_book")
def add_book(user_id: int, book_id: str, rating: int):
    return library_controller.add_book_for_user(user_id, book_id, rating)

@router.post("/books/")
def get_books(book_title: dict):
    print(book_title)
    return open_library.return_book(book_title['title'])

@router.post("/test-library-route")
def test_route():
    return {"message": "Successful"}