# Do user auth and login 

from app.config.database import get_connection
from app.model import user_model, get_user

def register_user(username, password):
  # run a check to make sure user doesnt alr exist 

  # Check if username already exists in the database
  existing_user = get_user(username)
  #check for and prevent duplicate usernames
  if existing_user :
      return 1                  #return value of 1 means user already exists
  else :
      return user_model.create_user(username, password)
  # run user_model.create_user do that biz with the function input
  # return that
  return 0

def login_user(username, password):
  # check DB to make sure they exist
  

  # do checks on the username and password to make sure they match
  # if good then send em through
  return 0