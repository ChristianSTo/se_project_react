import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/card.css";

// import { defaultClothingItems } from "../utils/constants";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(weatherData);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} / You may want to
          wear:
        </p>
        {/* rounded to match css, or else the decimals make it too long for mobile*/}
        <ul className="cards__list">
          {/* take each card in the array, then filter them based on type then render them on the page */}
          {clothingItems
            .filter((item) => {
              console.log(item.weather);
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  previewCard={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
