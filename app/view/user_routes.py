# Add user routes login recommendations etc this is where Connor will mainly be

from fastapi import APIRouter
from app.controller import user_controller

router = APIRouter()

@router.post("/register")
def register(username: str, password: str):
  return user_controller.register_user(username, password)

@router.post("/login")
def login(username: str, password: str):
  return user_controller.login_user(username, password)