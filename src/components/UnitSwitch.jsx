import "../blocks/unitSwitch.css";
import React, { useContext } from "react";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function UnitSwitch({ handleSwitchClick }) {
  //bring in the context of the unit, instead of passing it as a prop through so many things
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const toggleUnit = () => {
    //update the state
    handleSwitchClick();
    //update the css

    const switchCircles = document.querySelectorAll(".header__switch-circle");
    const switchCircleCs = document.querySelectorAll(".header__switch-C");
    const switchCircleFs = document.querySelectorAll(".header__switch-F");

    if (currentTemperatureUnit === "F") {
      switchCircles.forEach((circle) =>
        circle.classList.add("header__switch-circle_c")
      );
      switchCircleCs.forEach((circle) =>
        circle.classList.add("header__switch-C_on")
      );
      switchCircleFs.forEach((circle) =>
        circle.classList.add("header__switch-F_off")
      );
    }
    if (currentTemperatureUnit === "C") {
      switchCircles.forEach((circle) =>
        circle.classList.remove("header__switch-circle_c")
      );
      switchCircleCs.forEach((circle) =>
        circle.classList.remove("header__switch-C_on")
      );
      switchCircleFs.forEach((circle) =>
        circle.classList.remove("header__switch-F_off")
      );
    }
  };

  return (
    <button type="button" onClick={toggleUnit} className="header__switch">
      <div className="header__switch-F">F</div>
      <div className="header__switch-C">C</div>
      <div className="header__switch-circle"></div>
    </button>
  );
}

export default UnitSwitch;
