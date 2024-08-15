import "../blocks/toggleSwitch.css";
import React, { useContext } from "react";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function ToggleSwitch({ handleSwitchClick }) {
  //bring in the context of the unit, instead of passing it as a prop through so many things
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <button
      type="button"
      onClick={handleSwitchClick}
      className="header__switch"
    >
      <div
        className={`header__switch-F ${
          currentTemperatureUnit === "F"
            ? "header__switch-F_on"
            : "header__switch-F_off"
        }`}
      >
        F
      </div>
      <div
        className={`header__switch-C ${
          currentTemperatureUnit === "C"
            ? "header__switch-C_on"
            : "header__switch-C_off"
        }`}
      >
        C
      </div>
      <div
        className={`header__switch-circle ${
          currentTemperatureUnit === "C" ? "header__switch-circle_c" : ""
        }`}
      ></div>
    </button>
  );
}

export default ToggleSwitch;
