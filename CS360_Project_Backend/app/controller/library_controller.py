# handle library user biz (all of the book data processing for a user)

from app.model import library_model
from app.services import open_library

def add_book_to_user(user_id, book_id, rating=0):
  
  # not sure if we want to force a rating yet so just leaving it as a default 0
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not isinstance(book_id, str):
    return {"error": "book_id must be a string"}
  if not library_model.user_exists(user_id):
    return {"error": "user does not exist"}
  if library_model.book_in_library(user_id, book_id):
    return {"error": "book already in user library"}
  library_model.add_user_book(user_id, book_id, rating) 
  # return a message here
  message = {"status": "success", "message": "Book added", "user_id" : user_id, "book_id": book_id}    #this is a security risk, right?
  return message

def get_books(user_id):
  # I am NOT explaining this one
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not library_model.user_exists(user_id):
    return {"error": "user does not exist"}
  book_rows = library_model.get_user_books(user_id)
  full_books = []  # this will be a list of dicts

  for row in book_rows:
      book_id = row[0]        # each row is a tuple
      book_data = open_library.find_book_by_id(book_id)  # returns a dict
      full_books.append(book_data)
  message = {"status": "success", "books": full_books}
  return message


def remove_book(user_id, book_id):
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not isinstance(book_id, str):
    return {"error": "book_id must be a string"}
  if not library_model.user_exists(user_id):
    return {"error": "user does not exist"}
  if not library_model.book_in_library(user_id, book_id):
    return {"error": "book not in user library"}
  library_model.remove_user_book(user_id, book_id)
  message = {"status": "success", "message": "Book removed", "user_id" : user_id, "book_id": book_id}
  return message

def rate_book(user_id, book_id, rating):
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not isinstance(book_id, str):
    return {"error": "book_id must be a string"}
  if not library_model.user_exists(user_id):
    return {"error": "user does not exist"}
  if not library_model.book_in_library(user_id, book_id):
    return {"error": "book not in user library"}
  if not isinstance(rating, int) or not ( 0 <= rating <= 5):
    return {"error": "rating must be int between 0 and 5 inclusive"}
  library_model.rate_user_book(user_id, book_id, rating)
  message ={"status": "success", "message": "Book rated", "user_id" : user_id, "book_id": book_id}  
  return message

def get_rating(user_id, book_id):
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not isinstance(book_id, str):
    return {"error": "book_id must be a string"}
  if not library_model.user_exists(user_id):
    return {"error": "user does not exist"}
  if not library_model.book_in_library(user_id, book_id):
    return {"error": "book not in user library"}
  rating = library_model.get_user_book_rating(user_id,book_id)
  message = {"status": "success", "rating": rating}
  return message
  