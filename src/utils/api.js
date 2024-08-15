const baseUrl = "http://localhost:3001";

//higher scope function for repeated res.ok checks
const checkRes = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

//get the initial provided items
function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then(checkRes);
}

//add items
function addItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // based off the github readMe notes
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkRes);
}

//delete items
function deleteItems({ itemId }) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // based off the github readMe notes
    },
    body: JSON.stringify({ itemId }),
  }).then(checkRes);
}

export { getItems, addItems, deleteItems };
