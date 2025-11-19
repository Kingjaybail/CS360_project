# handle library user biz (all of the book data processing for a user)

from app.model import library_model, recommender_model
from app.services import open_library
import random

def add_book_to_user(user_id, book_id, rating=0):
  # not sure if we want to force a rating yet so just leaving it as a default 0
  # here do library_model.add_user_book 
  # return a message here


  return 0


def get_user_books(username: str):
  return library_model.fetch_user_books(username)


def get_random_books():
  seeds = [
    "fantasy", "adventure", "history", "mythology", "technology", "computer", "programming", "computer science"
  ]

  chosen_terms = random.sample(seeds, k=random.choice([2, 3]))

  all_results = []
  seen_ids = set()

  # Fetch results for each chosen topic until we reach 12 unique books
  for term in chosen_terms:
    results = open_library.find_book_by_name(term)
    random.shuffle(results)  # small extra randomness
    for r in results:
      if r["id"] not in seen_ids:
        seen_ids.add(r["id"])
        all_results.append(r)
      if len(all_results) >= 20:
        return all_results

  return all_results

def get_books(user_id):
  # I am NOT explaining this one
  
  return 0

def recommend_for_user(username: str):
  return recommender_model.recommend_books_for_user(username)

def get_list_of_books():
  return open_library.return_list_of_books()