# user library routes handles book adds and biz
from typing import Dict

from pydantic import BaseModel
from fastapi import APIRouter, Body
from app.controller import library_controller
from app.services import open_library
router = APIRouter()

class BookTitle(BaseModel):
    title: str


@router.post("/add_book")
def add_book(user_id: int, book_id: str, rating: int):
    return library_controller.add_book_for_user(user_id, book_id, rating)

@router.post("/find-book")
def find_book(book_title: BookTitle):
    print(book_title.title)
    return open_library.return_book(book_title.title)


@router.get("/get_list_of_books")
def get_list_of_books():
    return library_controller.get_list_of_books()

@router.post("/test-library-route")
def test_route():
    return {"message": "Successful"}

@router.get("/user-books/{username}")
def user_books(username: str):
    return library_controller.get_user_books(username)

@router.get("/recommend/{username}")
def recommend_for_user(username: str):
    return library_controller.recommend_for_user(username)


@router.get("/random-books")
def random_books():
    return library_controller.get_random_books()