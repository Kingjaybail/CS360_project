# Do user auth and login 

# from app.config.database import get_connection
import app.model.user_model as user_model


def register_user(username, password):
  # run a check to make sure user doesnt alr exist 

  # Check if username already exists in the database
  existing_user = user_model.get_user(username)
  print(existing_user)
  #check for and prevent duplicate usernames
  if existing_user :
      return 1                  #return value of 1 means user already exists
  else :
      return user_model.create_user(username, password)
  # run user_model.create_user do that biz with the function input
  # return that

def login_user(username, password): # <-- call this from user_routes our frontend will connect to this
  # check DB to make sure they exist
  verify = user_model.get_user(username, password)
  
  if verify.get('Successful') != None:
    return {'Login': f'Login User {verify.get('USERNAME')}'}
  return False


# register_user("JayBailey04", "password") <-- how to add a user
