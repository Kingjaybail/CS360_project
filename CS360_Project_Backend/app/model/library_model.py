# handle alt table data
from app.config.database import get_connection

def add_user_book(user_id: str, book_id: str, rating: int):
  # conn curr biz
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute insert statement into user_books (assuming this is what we call the table)
  curr.execute(""" INSERT INTO Users_lib (USER_ID, BOOK_ID, RATING) 
               VALUES (?, ?, ?)""",
               (user_id, book_id, rating))

  conn.commit()
  conn.close()
  
  # commit close
  
  return 0

def get_user_books(user_id: str):
  # get books
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute select statement into user_books
  curr.execute("""SELECT BOOK_ID 
               FROM Users_lib 
               WHERE USER_ID = ? """,
               (user_id,))    #the , there is to make the input value a tuple, or to appease the code gremlins
  books = curr.fetchall()
  #conn.commit() not needed on SELECT queries
  conn.close()
  
  
  return books

def remove_user_book(user_id: str, book_id: str):
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute delete statement into user_books to change review score 
  curr.execute("""DELETE  
               FROM Users_lib
               WHERE USER_ID = ? AND BOOK_ID = ? """,
               (user_id, book_id))
  conn.commit()
  conn.close()
  return 0

def rate_user_book(user_id: str, book_id: str, rating: int):
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute update statement into user_books to change review score 
  curr.execute("""UPDATE Users_lib 
               SET RATING = ?
               WHERE USER_ID = ? AND BOOK_ID = ? """,
               (rating, user_id, book_id))
  conn.commit()
  conn.close()
  return 0

def get_user_book_rating(user_id: str, book_id: str):
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute slect statement into user_lib to get review score 
  curr.execute("""SELECT RATING 
               FROM Users_lib 
               WHERE USER_ID = ? AND BOOK_ID = ?""",
               (user_id, book_id))
  rating = curr.fetchall()
  conn.close()
  return rating

def user_exists(user_id: str):
  conn = get_connection()
  curr = conn.cursor() 
  # curr execute select statement into user_books to get if user exist 
  curr.execute("""SELECT USER_ID 
               FROM Users 
               WHERE User_id = ?""",
               (user_id,))
  exists = curr.fetchone()
  #conn.commit()
  conn.close()
  return exists is not None

def book_in_library(user_id, book_id):
  conn = get_connection()
  curr = conn.cursor()
  curr.execute("""SELECT 1 FROM Users_lib
              WHERE USER_ID = ? AND BOOK_ID = ?""",
              (user_id, book_id))
  exists = curr.fetchone()
  conn.close()
  return exists is not None