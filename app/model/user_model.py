# Here is for our DB stuff and for user handling (so process user info here)
from app.config.database import get_connection
import uuid
import bcrypt #this must be added to requirements


def create_user(username: str, password: str):
  conn = get_connection()           # get connection
  curr = conn.cursor()              # cursor   
  
  user_ID = uuid.uuid4()            #generate random user id number (feel free to change uuid version if necessary)
  password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())         #generate password hash
  
  curr.execute("INSERT INTO Users (USERNAME, PASSWORD, USER_ID) VALUES (?, ?, ?)", (username, password_hash, str(user_ID)))
  conn.commit()                     #execute and commit new user to users table
  
  return 0
  
def get_user(username, password):
  # self explanitory
  # ^^^ you underestimate my stupid
  conn = get_connection()           # get connection
  curr = conn.cursor()              # cursor

  curr.execute("SELECT * FROM Users WHERE USERNAME = ?", (username,)) # has to be a tuple cause sqlite3 is stupid
  
  userdata = curr.fetchone()
  userdata = dict(userdata)
  
  stored_password = userdata.get("PASSWORD")
  
  if bcrypt.checkpw(password.encode('utf-8'), stored_password):
    return {'Successful': f'User {userdata.get('USERNAME')} successfully logged in', 'USERNAME': userdata.get('USERNAME')}
  else:
    return {'Login Failed': "Username or Password mismatch"}


