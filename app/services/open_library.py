# API request for the book library
import requests

# Function to make our api call
def make_request(genre):
    url = f"https://openlibrary.org/subjects/{genre}.json"
    headers = {
        "User-Agent": "BookRecommender/0.0.1 (johnathan.bailey433@topper.wku.edu)"
    }

    response = requests.get(url, headers=headers)

    print(response.json())
    