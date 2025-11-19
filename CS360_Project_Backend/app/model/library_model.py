# handle alt table data

from app.config.database import get_connection
from app.services.open_library import find_book_by_id

def add_user_book(user_id: int, book_id: str, rating: int):
  # conn curr biz
  # curr execute insert statement into user_books (assuming this is what we call the table)
  # commit close
  
  return 0

def fetch_user_books(username: str):
  conn = get_connection()
  curr = conn.cursor()

  # Get user_id
  curr.execute("SELECT USER_ID FROM Users WHERE USERNAME = ?", (username,))
  row = curr.fetchone()

  if not row:
    return []

  user_id = row["USER_ID"]

  # Get book IDs + ratings
  curr.execute("SELECT BOOK_ID, RATING FROM Users_lib WHERE USER_ID = ?", (user_id,))
  rated = curr.fetchall()

  results = []

  for item in rated:
    book_id = item["BOOK_ID"]
    rating = item["RATING"]

    # Fetch book metadata from Google Books
    book_data = find_book_by_id(book_id)
    if book_data:
      book_data["user_rating"] = rating
      results.append(book_data)

  return results