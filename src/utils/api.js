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

//get the initial provided items
function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then(checkRes);
}

//add items
function addItems({ name, weather, imageUrl, token }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // based off the github readMe notes
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkRes);
}

//delete items
function deleteItems({ itemId, token }) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  }).then(checkRes);
}

//add like
function addCardLike({ itemId, token }) {
  console.log(itemId);
  if (!itemId) {
    console.error("No valid item ID provided");
    return Promise.reject("Invalid item ID");
  }
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

//remove like
function removeCardLike({ itemId, token }) {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

export {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
  checkRes,
};
