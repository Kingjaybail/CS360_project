# creates test fixtures for the test suite
import os
import sqlite3
import uuid
import sys

# Ensure project root is added to PYTHONPATH
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.insert(0, ROOT_DIR)

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import database as db
from app.model import user_model
import sys
import os

@pytest.fixture(scope="session", autouse=True)
def test_db(tmp_path_factory):
    # Create a temporary database file for testing
    tmp_dir = tmp_path_factory.mktemp("data")
    test_db_path = tmp_dir / "test.db"

    # Point the app's DB_PATH at the temp file, if it exists in your db module
    if hasattr(db, "DB_PATH"):
        db.DB_PATH = str(test_db_path)

    # Initialize tables in the test DB
    db.init_database()

    return str(test_db_path)


@pytest.fixture(scope="session")
def client(test_db):
    # Provide a TestClient for the FastAPI app
    return TestClient(app)


@pytest.fixture
def unique_username():
    #Generate a unique username so tests don't collide on the Users table.
    return f"user_{uuid.uuid4().hex[:8]}"


@pytest.fixture
def create_user(unique_username):
    #create test user in the database
    password = "password123"
    user_model.create_user(unique_username, password)
    # Use get_user to fetch user_id etc.
    info = user_model.get_user(unique_username, "")
    return unique_username, password, info
