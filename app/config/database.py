# Handle database logic
import sqlite3

DB_PATH = "DB.db"

def get_connection():
  # conn.row_factory = sqlite3.Row -> this is new to me ngl but I read about it apparently lets u get sql as a dictionary which is pog
  # return conn
  try:
      conn = sqlite3.connect(DB_PATH)
      conn.execute("PRAGMA foreign_keys = ON")              # Enable foreign keys because SQLite is dumb AF
      conn.row_factory = sqlite3.Row                        # not suer what this will do
      print(f"database connected: {DB_PATH}")
  except sqlite3.Error as e:
      conn = 0
      print(f"connection to database failed")
  return conn

def init_database():
  conn = get_connection()
  curr = conn.cursor() 
  
  # In here create table 1 if not exists make sure it has user id, user password, username, and all the associated data we checked
  curr.execute("""CREATE TABLE IF NOT EXISTS Users (
    USER_ID TEXT PRIMARY KEY,
    USERNAME TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL
    );""") # User id needs to be Unique and not null
  
  # now create second table this will use the userID of table one as a primary key this one will store book id's ratings, user_id, and will have a foreign key attribute
  curr.execute("""CREATE TABLE IF NOT EXISTS Users_lib (
    USER_ID TEXT NOT NULL,
    BOOK_ID TEXT NOT NULL,
    RATING INTEGER,
    PRIMARY KEY (USER_ID, BOOK_ID),   
    FOREIGN KEY (USER_ID) REFERENCES Users(USER_ID)
    );""")        # make sure to wrap userid in () as well # the PRIMARY KEY (USER_ID, BOOK_ID) line ensures a many0to-many relationship so multiple users can check out multiple books but not the same book multiple times
    
  conn.commit()
  conn.close()
  
  return 0 # only here cause I hate errors^2


def delete_tables():
  conn = get_connection()
  curr = conn.cursor()
  
  
  curr.execute("""DROP TABLE Users_lib""")
  curr.execute("""DROP TABLE Users;""")
  conn.commit()
  conn.close()
  return 0

# delete_tables()
init_database()