# user library routes handles book adds and biz

from fastapi import APIRouter
from app.controller import library_controller

router = APIRouter()

@router.post("/add_book")
def add_book(user_id: int, book_id: str, rating: int):
    return library_controller.add_book_for_user(user_id, book_id, rating)

@router.get("/books/{user_id}") # here treat {user_id} as a variable this will be added in frontends call
def get_books(user_id: int):
    return library_controller.get_books_for_user(user_id)