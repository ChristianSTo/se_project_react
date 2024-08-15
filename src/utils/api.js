const baseUrl = "http://localhost:3001";

//get the initial provided items
function getItems() {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  });
}

//add items
function addItems({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // based off the github readMe notes
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  });
}

//delete items
function deleteItems({ itemId }) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // based off the github readMe notes
    },
    body: JSON.stringify({ itemId }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
  });
}

export { getItems, addItems, deleteItems };
