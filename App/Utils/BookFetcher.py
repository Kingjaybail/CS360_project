import requests

url = "https://openlibrary.org/subjects/fiction.json"
headers = {
    "User-Agent": "MyAppName/1.0 (myemail@example.com)"
}

response = requests.get(url, headers=headers)


print(response.text)