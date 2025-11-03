// how to structure a route call
// do the below in the url have ${API_URL}/route_prefix/route -> this is for our MVC style
const API_URL = import.meta.env.VITE_API_URL

export async function login_user(username, password) {
  const result = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const res = await result.json();
  console.log(res);

  return res;
}

export async function testConnector() {
  const result = await fetch(`${API_URL}/library/test-library-route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const res = await result.json();
  console.log(res);

  return res;
}

// Get book information from backend from a book title
export async function get_book_info(title) {
  const result = await fetch(`${API_URL}/library/books/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  const res = await result.json();
  console.log(res);

  return res;
}
const auth = {
  login: login_user,
};

const routed_connectors = {
  get_book_info,
  testConnector,
  login_user,
};

export default routed_connectors;