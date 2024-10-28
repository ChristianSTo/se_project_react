import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/card.css";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
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
              return item.weather === weatherData.type;
            })
            .slice()
            .reverse()
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  previewCard={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
