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
        "adventure", "history", "technology", "computer",
        "programming", "computer science", "dinosaur", "fiction",
        "math", "education", "python", "java"
        "paleontology"
    ]

    chosen_terms = seeds

    all_results = []
    seen_ids = set()

    books_per_seed = 3

    for term in chosen_terms:
        results = open_library.find_book_by_name(term)
        random.shuffle(results)

        count = 0
        for r in results:
            if r["id"] not in seen_ids:
                seen_ids.add(r["id"])
                all_results.append(r)
                count += 1
            if count >= books_per_seed:
                break

        if len(all_results) >= 45:
            break

    return all_results

def get_books(user_id):
  # I am NOT explaining this one
  
  return 0

def recommend_for_user(username: str):
  return recommender_model.recommend_books_for_user(username)

def get_list_of_books():
  return open_library.return_list_of_books()