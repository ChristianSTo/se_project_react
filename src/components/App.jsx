import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getItems, addItems, deleteItems } from "../utils/api.js";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import AddItemModal from "./AddItemModal.jsx";

import ItemModal from "./ItemModal.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

import Profile from "./Profile.jsx";

import "../blocks/page.css";

import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 9999, C: 9999 },
    city: "",
    sky: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleSwitchClick = () => {
    //switch the unit
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const clickAwayModal = (evt) => {
    if (evt.target.className.includes("modal_visible")) {
      closeModal();
    }
  };

  const onAddItem = (values) => {
    setIsLoading(true);
    //update the api
    addItems({
      name: values.name,
      weather: values.weather,
      imageUrl: values.link,
    })
      //update the page
      //here, data is the added item because addItems is called first
      .then((data) => {
        console.log(data);
        setClothingItems([data, ...clothingItems]);
        closeModal();
        setIsLoading(false);
      })
      .catch(console.error);
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-action");
  };

  const handleConfirmDelete = (card) => {
    const cardId = card.card._id;
    console.log(cardId);
    //update the api
    deleteItems({ itemId: cardId })
      //update the page
      .then((data) => {
        console.log(data);
        setClothingItems(clothingItems.filter((card) => card._id !== cardId));
        //close modal and deselect card
        closeModal();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      //data is the json from the response from the weatherApi.js
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //set the clothingaItems to these items from the provided Api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleSwitchClick }}
    >
      <Header
        handleAddClick={handleAddClick}
        handleSwitchClick={handleSwitchClick}
        weatherData={weatherData}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              weatherData={weatherData}
              handleCardClick={handleCardClick}
              clothingItems={clothingItems}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              weatherData={weatherData}
              handleCardClick={handleCardClick}
              handleAddClick={handleAddClick}
              clothingItems={clothingItems}
            />
          }
        />
      </Routes>
      <Footer />
      <AddItemModal
        onCloseModal={closeModal}
        onAddItem={onAddItem}
        handleModalClick={clickAwayModal}
        isOpen={activeModal === "add-garment"}
        isLoading={isLoading}
      />

      <ItemModal
        name="preview-card"
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
        handleDeleteClick={handleDeleteClick}
        card={selectedCard}
        isOpen={activeModal === "preview-card"}
      />

      <ConfirmModal
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
        onRemoveItem={handleConfirmDelete}
        card={selectedCard}
        isOpen={activeModal === "confirm-action"}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
