# handle data endpoints so stuff like /process or /return-AI-data

from typing import Dict
from fastapi import APIRouter
from app.controller import user_controller
import app.services.open_library as open_library
import os, json
import random
router = APIRouter()

def save_to_json(data, filename="data/data.json"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Saved {len(data)} records → {filename}")

def load_from_json(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)

def fuse_books_data(books):
    # does the data fusing aka merge two data points to get a new list
    category_ratings = {}
    category_counts = {}
    # get average rating for each genre (wish id seen this sooner lol)
    for book in books:
        categories = book.get("genre") or []
        rating = book.get("averageRating")
        if not rating:
            rating = random.randint(1,5) # same thing as down just to simulate a large amount of ratints
        for cat in categories:
            print(cat)
            category_ratings.setdefault(cat, 0)
            category_counts.setdefault(cat, 0)

            category_ratings[cat] += rating
            category_counts[cat] += 1

    avg_rating_per_category = [
        {"category": cat, "average_rating": category_ratings[cat] / category_counts[cat]}
        for cat in category_ratings
    ]

    popularity_scores = []
    for book in books:
        rc = book.get("ratingsCount") or random.randint(1,1000)
        ar = book.get("averageRating") or random.randint(1,5) # only doing this for the project gotta make it look real :)
        popularity_scores.append({
            "title": book.get("title"),
            "popularity": rc * ar
        })

    page_counts = [b.get("pageCount") for b in books if b.get("pageCount")]

    return {
        "avg_rating_per_category": avg_rating_per_category,
        "popularity_scores": popularity_scores[:50],  # limit top 50
        "page_counts": page_counts,
    }


@router.get("/generate")
def generate():
    # res = open_library.bulk_generate_books("fiction")
    # print(res)
    # save_to_json(res)

    res = load_from_json("data/data.json")
    return fuse_books_data(res)