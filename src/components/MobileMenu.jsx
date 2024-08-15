import avatar from "../assets/images/avatar.png";
import { Link } from "react-router-dom";
import UnitSwitch from "./UnitSwitch";
import "../blocks/mobileMenu.css";

function MobileMenu({
  isMobileMenuOpened,
  handleAddClick,
  handleCloseClick,
  handleSwitchClick,
}) {
  return (
    <div className={`menu ${isMobileMenuOpened === true && "menu_visible"}`}>
      <div className="menu__profile">
        <button
          onClick={handleCloseClick}
          type="button"
          className="menu__close-button"
        ></button>
        <Link to="/profile" className="menu__profile-link">
          <div className="menu__profile-container">
            <p className="menu__username">Terrence Tegegne</p>
            <img
              className="menu__avatar"
              src={avatar}
              alt="profile avatar"
            ></img>
          </div>
        </Link>

        <button type="button" className="menu__button" onClick={handleAddClick}>
          + Add Clothes
        </button>
        <UnitSwitch handleSwitchClick={handleSwitchClick} />
      </div>
    </div>
  );
}

export default MobileMenu;
