# User tests use pytest  
from app.model import user_model
from app.controller import user_controller



#########################################
# User Model Tests
#########################################

def test_create_and_get_user(unique_username):
    password = "password"
    user_model.create_user(unique_username, password)

    result = user_model.get_user(unique_username, "")
    assert "Success" in result
    assert result["username"] == unique_username
    assert "user_id" in result


def test_get_user_not_found():
    result = user_model.get_user("Waldo", "")
    assert "Failed" in result
    assert result["Failed"] == "User not found"


def test_get_user_login_success(create_user):
    username, password, _ = create_user

    result = user_model.get_user_login(username, password)
    assert "Success" in result
    assert result["Success"] == "Login successful"


def test_get_user_login_wrong_password(create_user):
    username, _, _ = create_user

    result = user_model.get_user_login(username, "wrongpw")
    assert "Failed" in result
    assert result["Failed"].startswith("Login failed")


def test_save_user_rating_insert_then_update(create_user):
    username, _, info = create_user
    user_id = info["user_id"]
    book_id = "test_book_123"

    #rate a book
    res1 = user_model.save_user_rating(user_id, book_id, 3)
    assert res1["Success"] == "Rating saved"
    assert res1["rating"] == 3

    #do it again
    res2 = user_model.save_user_rating(user_id, book_id, 5)
    assert res2["Success"] == "Rating saved"
    assert res2["rating"] == 5

#########################################
# User Controller Tests
#########################################

def test_register_user_success(unique_username):
    result = user_controller.register_user(unique_username, "pw123")
    assert "Success" in result


def test_register_user_duplicate(unique_username):
    # Create once
    user_model.create_user(unique_username, "ditto")
    # Try via controller
    result = user_controller.register_user(unique_username, "ditto")
    assert "Failed" in result
    assert result["Failed"] == "User already exists"


def test_login_user_success(unique_username):
    user_model.create_user(unique_username, "pw123")
    result = user_controller.login_user(unique_username, "pw123")
    assert "Success" in result
    assert result["Success"] == "Login successful"


def test_update_user_rating_existing_user(unique_username):

    user_model.create_user(unique_username, "pw123")
    res = user_controller.update_user_rating(unique_username, 4, "book_abc")
    assert "Success" in res
    assert res["rating"] == 4


def test_update_user_rating_missing_user():
    res = user_controller.update_user_rating("no_such_user", 4, "book_abc")
    assert "Failed" in res
    assert res["Failed"] == "User not found"
