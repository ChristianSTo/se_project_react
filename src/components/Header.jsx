import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import headerLogo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.png";
import Hamburger from "./HamburgerIcon.jsx";
import MobileMenu from "./MobileMenu.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

import "../blocks/header.css";

function Header({ handleAddClick, handleSwitchClick, weatherData }) {
  //code for current date (no need for api)
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
      />
      <div className="header__profile-container">
        <ToggleSwitch handleSwitchClick={handleSwitchClick} />

        <button
          type="button"
          onClick={handleAddClick}
          className="header__button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <p className="header__username">Terrence Tegegne</p>

          <img
            className="header__avatar"
            src={avatar}
            alt="profile avatar"
          ></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
