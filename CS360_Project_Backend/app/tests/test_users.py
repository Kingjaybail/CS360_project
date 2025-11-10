# User tests use pytest

from fastapi.testclient import TestClient
from app.view.user_routes import router as user_router

client = TestClient(user_router)

# user route test
def test_user_route():
  response = client.post("/test-message")
  assert response.status_code == 200
  assert response.json() == {"message": "Successful"} 
   
# user book add test

# user book rate test