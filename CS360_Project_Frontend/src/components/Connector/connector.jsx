// how to structure a route call
// do the below in the url have ${VITE_REACT_API_URL}/route_prefix/route -> this is for our MVC style
const VITE_REACT_API_URL = import.meta.env.VITE_REACT_API_URL || "http://localhost:8000";

export async function login_user(username, password) {
    const result = await fetch(`${VITE_REACT_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const res = await result.json();

    return res;
}

export async function signup_user(username, password) {
    const result = await fetch(`${VITE_REACT_API_URL}/user/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const res = await result.json();

    return res;
}

export async function testConnector() {
  const result = await fetch(`${VITE_REACT_API_URL}/library/test-library-route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const res = await result.json();

  return res;
}


export async function update_user_rating(book) {
    const username = JSON.parse(localStorage.getItem("username"))?.username;
    const book_id = book.bookId;
    const value = book.rating
    const result = await fetch(`${VITE_REACT_API_URL}/user/update-rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, value, book_id})
    });

    const res = await result.json();

    return res;
}

export async function get_book_info(title) {
    const result = await fetch(`${VITE_REACT_API_URL}/library/find-book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });

    const res = await result.json();
    return res;
}

export async function get_home_page_books() {
    const result = await fetch(`${VITE_REACT_API_URL}/library/random-books`, {
        method: "GET"
    });

    const res = await result.json();
    return res;
}

export async function get_user_rated_books(username) {
  const result = await fetch(`${VITE_REACT_API_URL}/library/user-books/${username}`);
  return await result.json();
}

export async function get_recommendations(username) {
  const result = await fetch(`${VITE_REACT_API_URL}/library/recommend/${username}`);
  return await result.json();
}

const auth = {
    login: login_user,
};

const routed_connectors = {
    get_book_info,
    testConnector,
    login_user,
    signup_user,
    get_home_page_books,
    update_user_rating,
    get_user_rated_books,
    get_recommendations
}

export default routed_connectors;