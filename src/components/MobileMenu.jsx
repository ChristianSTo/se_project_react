import React, { useContext } from "react";

import avatar from "../assets/images/avatar.png";
import { Link } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";
import "../blocks/mobileMenu.css";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function MobileMenu({
  isMobileMenuOpened,
  handleAddClick,
  handleCloseClick,
  handleSwitchClick,
  handleRegisterClick,
  handleLogInClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className={`menu ${isMobileMenuOpened === true && "menu_visible"}`}>
      <div className="menu__profile">
        <button
          onClick={handleCloseClick}
          type="button"
          className="menu__close-button"
        ></button>
        <div>
          {isLoggedIn ? (
            <Link to="/profile" className="menu__profile-link">
              <div className="menu__profile-container">
                <p className="menu__username">{currentUser.name}</p>
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
              </div>
            </Link>
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
            <button
              type="button"
              className="menu__button"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>
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

        <ToggleSwitch handleSwitchClick={handleSwitchClick} />
      </div>
    </div>
  );
}

export default MobileMenu;
