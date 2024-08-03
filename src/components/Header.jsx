import React, { useEffect, useState } from "react";

import headerLogo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.png";
import Hamburger from "./HamburgerIcon.jsx";
import MobileMenu from "./MobileMenu.jsx";

import "../blocks/header.css";

function Header({ handleAddClick, weatherData }) {
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
    <div className="header">
      <div className="header__info-container">
        <img className="header__logo" src={headerLogo} alt="App logo" />
        <p className="header__info">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <Hamburger handleClick={handleHamburgerClick} />
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        handleAddClick={handleAddClick}
        handleCloseClick={closeMenu}
      />
      <div className="header__profile-container">
        <button
          type="button"
          onClick={handleAddClick}
          className="header__button"
        >
          + Add Clothes
        </button>
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar}></img>
      </div>
    </div>
  );
}

export default Header;
