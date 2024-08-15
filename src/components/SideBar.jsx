import "../blocks/sideBar.css";

import avatar from "../assets/images/avatar.png";

function SideBar() {
  return (
    <div className="sidebar__container">
      <img className="sidebar__avatar" src={avatar} alt="profile avatar"></img>
      <div className="sidebar__info">
        <p className="sidebar__username">Terrence Tegegne</p>
        <button
          type="button"
          className="sidebar__button sidebar__change-button"
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__button sidebar__logout-button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
