import avatar from "../assets/images/avatar.png";

import "../blocks/mobileMenu.css";

function MobileMenu({ isMobileMenuOpened, handleAddClick, handleCloseClick }) {
  return (
    <div className={`menu ${isMobileMenuOpened === true && "menu_visible"}`}>
      <div className="menu__profile">
        <button
          onClick={handleCloseClick}
          type="button"
          className="menu__close-button"
        ></button>
        <div className="menu__profile-container">
          <p className="menu__username">Terrence Tegegne</p>
          <img className="menu__avatar" src={avatar}></img>
        </div>

        <button type="button" className="menu__button" onClick={handleAddClick}>
          + Add Clothes
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
