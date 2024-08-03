import React, { useEffect, useState } from "react";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import "../blocks/body.css";

import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 9999 },
    city: "",
    sky: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = (evt) => {
    if (!evt.target.className.includes("modal_visible")) {
      alert(isMobileMenuOpened);
    }
    if (isMobileMenuOpened == true) {
      setIsMobileMenuOpened(false);
    } else {
      setIsMobileMenuOpened(true);
    }
  };

  const clickAwayModal = (evt) => {
    let isInsideContainer = false;
    if (evt.target.className.includes("modal_visible")) {
      isInsideContainer = false;
    } else if (!evt.target.className.includes("modal_visible")) {
      isInsideContainer = true;
    }
    if (isInsideContainer === false) {
      setActiveModal("");
    }
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

  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    });
  });

  return (
    <>
      <Header handleAddClick={handleAddClick} weatherData={weatherData} />
      <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      <Footer />
      <ModalWithForm
        title="New Garment"
        name="new-garment"
        buttonText="Add garment"
        activeModal={activeModal}
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
      >
        <label htmlFor="input-name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          className="modal__input"
          id="input-name"
          name="inputName"
          placeholder="Name"
          required
        ></input>
        <label htmlFor="input-image" className="modal__label">
          Image
        </label>
        <input
          type="url"
          className="modal__input"
          id="input-image"
          name="inputImage"
          placeholder="Image URL"
          required
        ></input>
        <fieldset className="modal__label modal__choices">
          <legend className="modal__legend"> Select the weather type:</legend>
          <label className="modal__label modal__choice-label" htmlFor="hot">
            <input
              type="radio"
              className="modal__input modal__choice-input"
              value="Hot"
              id="hot"
              name="tempChoice"
              required
            ></input>
            Hot
          </label>
          <label className="modal__label modal__choice-label" htmlFor="warm">
            <input
              type="radio"
              className="modal__input modal__choice-input"
              value="Warm"
              id="warm"
              name="tempChoice"
              required
            ></input>
            Warm
          </label>
          <label className="modal__label modal__choice-label" htmlFor="cold">
            <input
              type="radio"
              className="modal__input modal__choice-input"
              value="Cold"
              id="cold"
              name="tempChoice"
              required
            ></input>
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        name="preview-card"
        activeModal={activeModal}
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
        card={selectedCard}
      />
    </>
  );
}

export default App;