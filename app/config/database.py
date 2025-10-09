# Handle database logic
import sqlite3

def get_connection():
  # conn = sqlite3.connect("DB.db") or we could do a DB_PATH env variable up 2 you go crazy here
  # conn.row_factory = sqlite3.Row -> this is new to me ngl but I read about it apparently lets u get sql as a dictionary which is pog
  # return conn
  
  return 0 # only here cause I hate errors


def init_database():
  # conn = get_connection()
  # curr = conn.cursor() this is how we do sql commands 
  
  # curr.execute("""CREATE TABLE IF NOT EXISTS...""") <-- example
  
  # In here create table 1 if not exists make sure it has user id, user password, username, and all the associated data we checked
  
  # now create second table this will use the userID of table one as a primary key this one will store book id's ratings, user_id, and will have a foreign key attribute
  
  # conn.commit()
  # conn.close()
  
  return 0 # only here cause I hate errors^2