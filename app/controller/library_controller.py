# handle library user biz (all of the book data processing for a user)

from app.model import library_model

def add_book_to_user(user_id, book_id, rating=0):
  
  # not sure if we want to force a rating yet so just leaving it as a default 0
  if not isinstance(user_id, int):
    return {"error": "user_id must be an integer"}
  if not isinstance(book_id, str):
    return {"error": "book_id must be a string"}
  library_model.add_user_book(user_id, book_id, rating) 
  # return a message here
  message = f"book {book_id} added to {user_id}"    #this is a security risk, right?
  return message

def get_books(user_id):
  # I am NOT explaining this one
  books = library_model.get_user_books(user_id)
  return books

def remove_book(user_id, book_id):
  library_model.remove_user_book(user_id, book_id)

  pass

def rate_book():
  pass