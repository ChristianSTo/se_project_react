import React, { useEffect, useState, useContext } from "react";
import "../blocks/sideBar.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function SideBar({ handleChangeClick, handleLogOutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar__container">
      <div className="sidebar__info">
        <div>
          {currentUser.avatar ? (
            <img
              className="sideBar__avatar"
              src={currentUser.avatar}
              alt="profile avatar"
            ></img>
          ) : (
            <div
              className="sideBar__avatar-letter"
              src={currentUser.avatar}
              alt={currentUser.name[0]}
            >
              {currentUser.name[0]}
            </div>
          )}
        </div>
        <p className="sidebar__username">{currentUser.name}</p>{" "}
      </div>

      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__button sidebar__change-button"
          onClick={handleChangeClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button sidebar__logout-button"
          onClick={handleLogOutClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
