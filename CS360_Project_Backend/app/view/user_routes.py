# Add user routes login recommendations etc this is where Connor will mainly be
from typing import Dict
from fastapi import APIRouter
from app.controller import user_controller

router = APIRouter()

@router.post("/test-message")
def test_route():
    return {"message": "Successful"}

@router.post("/register")
def register(username: str, password: str):
    return user_controller.register_user(username, password)

@router.post("/login")
def login(data: Dict):
    username = data.get("username")
    password = data.get("password")
    res = user_controller.login_user(username, password)
    print(res)

    return res

@router.post("/create-user")
def create_user(data: Dict):
    username = data.get("username")
    password = data.get("password")
    return user_controller.register_user(username, password)

@router.post("/update-rating")
def update_user_rating(data: Dict):
    print(data)
    username = data.get("username")
    rating = data.get("value")
    book_id = data.get("book_id")
    res = user_controller.update_user_rating(username, rating, book_id)
    print(res)
    return res