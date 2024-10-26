import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import headerLogo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.png";
import Hamburger from "./HamburgerIcon.jsx";
import MobileMenu from "./MobileMenu.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import "../blocks/header.css";

function Header({
  handleAddClick,
  handleSwitchClick,
  handleRegisterClick,
  handleLogInClick,
  weatherData,
  isLoggedIn,
}) {
  //code for current date (no need for api)
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  //for current user
  const currentUser = useContext(CurrentUserContext);

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const handleHamburgerClick = () => {
    setIsMobileMenuOpened(true);
  };
  const closeMenu = () => {
    setIsMobileMenuOpened(false);
  };

  return (
    <header className="header">
      <div className="header__info-container">
        <Link to="/" className="header__link">
          <img className="header__logo" src={headerLogo} alt="App logo" />
        </Link>
        <p className="header__info">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <Hamburger handleClick={handleHamburgerClick} />
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        handleAddClick={handleAddClick}
        handleCloseClick={closeMenu}
        handleSwitchClick={handleSwitchClick}
        handleRegisterClick={handleRegisterClick}
        handleLogInClick={handleLogInClick}
        isLoggedIn={isLoggedIn}
      />
      <div className="header__profile-container">
        <ToggleSwitch handleSwitchClick={handleSwitchClick} />
        <div>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleAddClick}
              className="header__button"
            >
              + Add Clothes
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRegisterClick}
              className="header__button"
            >
              Sign Up
            </button>
          )}
        </div>

        <div>
          {isLoggedIn ? (
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>

              <div>
                {currentUser.avatar ? (
                  <img
                    className="menu__avatar"
                    src={currentUser.avatar}
                    alt="profile avatar"
                  ></img>
                ) : (
                  <div
                    className="menu__avatar-letter"
                    src={currentUser.avatar}
                    alt={currentUser.name[0]}
                  >
                    {currentUser.name[0]}
                  </div>
                )}
              </div>
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogInClick}
              className="header__button"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
