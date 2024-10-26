const baseUrl = "http://localhost:3001";

//higher scope function for repeated res.ok checks
const checkRes = (res) => {
  if (!res.ok) {
    const error = new Error(`Error ${res.status}`);
    error.status = res.status;
    return Promise.reject(error);
  }
  return res.json();
};

//sign up for user registration
function signUp({ name, email, password, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then(checkRes);
}

//sign in for user
function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRes);
}

function checkUserToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

//edit profile for user
function changeProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRes);
}

export { signUp, signIn, checkUserToken, changeProfile };
