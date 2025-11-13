# Do user auth and login 

# from app.config.database import get_connection
import app.model.user_model as user_model


def register_user(username, password):
    existing_user = user_model.get_user(username,password)
    print(existing_user)
    if existing_user.get('Success'):
        return {"Failed": "User already exists"}

    user_model.create_user(username, password)
    return {"Success": "User successfully registered"}


  # run user_model.create_user do that biz with the function input
  # return that

def login_user(username, password):
    user = user_model.get_user_login(username, password)
    print(user)
    return user
# print(login_user("admin", "admin"))
# register_user("JayBailey04", "password") <-- how to add a user
