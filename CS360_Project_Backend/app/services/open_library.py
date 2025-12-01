import requests

def find_book_by_id(id):
    url = f"https://www.googleapis.com/books/v1/volumes/{id}"
    headers = {
        "User-Agent": "BookRecommender/0.0.1 (johnathan.bailey433@topper.wku.edu)"
    }    
    response = requests.get(url, headers=headers)
    
    book = response.json()
    volume_info = book.get("volumeInfo")
    parsed_book = {
        "id": book.get("id"),
        "title": volume_info.get("title"),
        "authors": volume_info.get("authors"),
        "genre": volume_info.get("categories"),
        "thumbnail": (volume_info.get("imageLinks", {}).get("thumbnail") or volume_info.get("imageLinks", {}).get("smallThumbnail")),
        "description": volume_info.get("description")
    }
    
    return parsed_book
    
def find_book_by_name(title):
    url = f"https://www.googleapis.com/books/v1/volumes?q={title}"
    headers = {
        "User-Agent": "BookRecommender/0.0.1 (johnathan.bailey433@topper.wku.edu)"
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    books = []
    for item in data.get("items"):
        volume_info = item.get("volumeInfo") or None
        book = {
            "id": item.get("id"),
            "title": volume_info.get("title"),
            "authors": volume_info.get("authors"),
            "genre": volume_info.get("categories"),
            "thumbnail": (volume_info.get("imageLinks", {}).get("thumbnail") or volume_info.get("imageLinks", {}).get("smallThumbnail")),
            "description": volume_info.get("description")
        }

        books.append(book)

    return books

def return_book(title):
    res = find_book_by_name(title)
    book = find_book_by_id(res[0].get('id'))
    return book

def return_list_of_books():
    books = [
        "The lord of the rings",
        "1984",
        "Percy Jackson",
        "Harry potter",
        "The farseer trilogy",
        "Jurassic Park"
    ]

    data = []

    for item in books:
        data.append(return_book(item))

    return data

def bulk_generate_books(query, total=1000):
    print(f"Running bulk read on: {query}")
    all_books = []
    max_results = 40

    for start in range(0, total, max_results):
        url = f"https://www.googleapis.com/books/v1/volumes?q={query}&startIndex={start}&maxResults={max_results}"
        headers = {
            "User-Agent": "BookRecommender/0.0.1 (johnathan.bailey433@topper.wku.edu)"
        }

        response = requests.get(url, headers=headers).json()
        items = response.get("items", [])
        for item in items:
            volume_info = item.get("volumeInfo", {})
            book = {
                "id": item.get("id"),
                "title": volume_info.get("title"),
                "authors": volume_info.get("authors"),
                "genre": volume_info.get("categories"),
                "thumbnail": (
                    volume_info.get("imageLinks", {}).get("thumbnail")
                    or volume_info.get("imageLinks", {}).get("smallThumbnail")
                ),
                "description": volume_info.get("description"),
                "pageCount": volume_info.get("pageCount"),
                "publishedDate": volume_info.get("publishedDate"),
                "averageRating": volume_info.get("averageRating"),
                "ratingsCount": volume_info.get("ratingsCount"),
            }
            all_books.append(book)

    print(f"Generated {len(all_books)} book records.")
    return all_books
