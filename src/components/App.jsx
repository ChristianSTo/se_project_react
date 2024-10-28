import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../utils/api.js";

import {
  signUp,
  signIn,
  checkUserToken,
  changeProfile,
} from "../utils/auth.js";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ProtectedRoute from "./ProtectedRoute";

import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";

// import ModalWithForm from "./ModalWithForm.jsx";

import Profile from "./Profile.jsx";

import "../blocks/page.css";

import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

/*just try this valid link from practicum:
https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/logo.svg
 to enter into the input to test it for convenience.
 */

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
  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);
  const [isNoUser, setIsNoUser] = useState(false);
  const [isResetForm, setIsResetForm] = useState(false);

  const navigate = useNavigate();

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsResetForm(true);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
    setIsResetForm(true);
  };

  const handleLoginClick = () => {
    setActiveModal("log-in");
    setIsResetForm(true);
  };

  const handleChangeClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSwitchClick = () => {
    //switch the unit
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const closeModal = () => {
    setActiveModal("");
    setIsSameUser(false);
    setIsNoUser(false);
    setIsResetForm(false);
  };

  const clickAwayModal = (evt) => {
    if (evt.target.className.includes("modal_visible")) {
      closeModal();
    }
  };

  //set the clothingItems to these items from the provided Api
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const onAddItem = (values) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    //update the api
    addItems({
      name: values.name,
      weather: values.weather,
      imageUrl: values.link,
      token,
    })
      //update the page
      //here, data is the added item because addItems is called first
      .then((addedData) => {
        setClothingItems((prevItems) => [...prevItems, addedData.data]);
        closeModal();
        setIsLoading(false);
      })
      .then(() => {
        console.log(clothingItems);
      })
      .catch(console.error);
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-action");
  };

  const handleConfirmDelete = (card) => {
    const token = localStorage.getItem("jwt");

    const cardId = card.card._id;
    console.log(cardId);
    //update the api
    deleteItems({ itemId: cardId, token })
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

  //like card
  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        addCardLike({ itemId: itemId, token })
          .then((updatedCard) => {
            console.log(updatedCard);
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === itemId ? updatedCard.data : item
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike({ itemId: itemId, token })
          .then((updatedCard) => {
            console.log(updatedCard);
            setClothingItems((cards) =>
              cards.map((item) =>
                item._id === itemId ? updatedCard.data : item
              )
            );
          })
          .catch((err) => console.log(err));
  };

  //Pass the values from RegisterModal's form to the request.
  const registerUser = (data) => {
    signUp(data)
      .then((data) => {
        console.log(data);
        //close modal
        closeModal();
      })
      .catch((error) => {
        if (error.status === 409) {
          setIsSameUser(true);
        } else {
          console.error(error);
        }
      });
  };

  const logInUser = (res) => {
    // console.log("Logging In");
    signIn(res)
      .then((res) => {
        // console.log(res);
        //set token for user
        localStorage.setItem("jwt", res.token);
        // save the user
        return checkUserToken(res.token);
      })
      .then((userData) => {
        //set context for user
        setCurrentUser(userData);
        //set login state status
        setIsLoggedIn(true);
        //close modal
        closeModal();
      })
      .catch((error) => {
        if (error.status === 404 || error.status === 401) {
          setIsNoUser(true);
        } else {
          console.error(error);
        }
      });
  };

  //edit profile
  const editProfile = (data) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      changeProfile(data, token)
        .then((data) => {
          //update context
          setCurrentUser(data);
          //close modal
          closeModal();
        })
        .catch(console.error);
    }
  };

  //switch forms
  const swapForms = () => {
    if (activeModal === "register") {
      setActiveModal("log-in");
    }
    if (activeModal === "log-in") {
      setActiveModal("register");
    }
  };

  //logout
  const logOutUser = () => {
    //reset variables
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(false);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkUserToken(token)
        .then((data) => {
          //keep the user logged in even after refresh
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Authentication failed:", err);
          setIsLoggedIn(false);
          navigate("/login");
        });
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleSwitchClick }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleAddClick={handleAddClick}
          handleSwitchClick={handleSwitchClick}
          handleRegisterClick={handleRegisterClick}
          handleLogInClick={handleLoginClick}
          weatherData={weatherData}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  handleChangeClick={handleChangeClick}
                  handleLogOutClick={logOutUser}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/profile" replace />
              ) : (
                <Navigate to="/" replace />
              )
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
          isResetForm={isResetForm}
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

        <EditProfileModal
          onCloseModal={closeModal}
          handleCloseClick={closeModal}
          handleModalClick={clickAwayModal}
          isOpen={activeModal === "edit-profile"}
          isLoading={isLoading}
          editProfile={editProfile}
        />
      </CurrentUserContext.Provider>

      <RegisterModal
        onCloseModal={closeModal}
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
        isOpen={activeModal === "register"}
        isLoading={isLoading}
        registerUser={registerUser}
        switchForms={swapForms}
        isSameUser={isSameUser}
        isResetForm={isResetForm}
      />

      <LoginModal
        onCloseModal={closeModal}
        handleCloseClick={closeModal}
        handleModalClick={clickAwayModal}
        isOpen={activeModal === "log-in"}
        isLoading={isLoading}
        logInUser={logInUser}
        switchForms={swapForms}
        isNoUser={isNoUser}
        isResetForm={isResetForm}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
