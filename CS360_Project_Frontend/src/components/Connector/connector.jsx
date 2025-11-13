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
    console.log(res)

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
  console.log(res);

  return res;
}

export async function get_book_info(title) {
    console.log(title)
    const result = await fetch(`${VITE_REACT_API_URL}/library/find-book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });

    const res = await result.json();
    return res;
}

const auth = {
    login: login_user,
};

const routed_connectors = {
    get_book_info,
    testConnector,
    login_user,
    signup_user,
};

export default routed_connectors;