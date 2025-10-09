# Generate testcases for our library stuff

from fastapi.testclient import TestClient
from app.view.library_routes import router


client = TestClient(router)

def test_library_route():
  response = client.post("/test-library-route")
  assert response.status_code == 200
  assert response.json() == {"message": "Successful"}
  