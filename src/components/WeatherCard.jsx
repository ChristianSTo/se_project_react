import React, { useContext } from "react";

import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rain from "../assets/images/rain.png";
import storm from "../assets/images/storm.png";
import snow from "../assets/images/snow.png";
import fog from "../assets/images/fog.png";

import "../blocks/weathercard.css";

import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  let weatherIcon = sunny;

  if (weatherData.sky.main == "Clouds") {
    weatherIcon = cloudy;
  } else if (weatherData.sky.main == "Storm") {
    weatherIcon = storm;
  } else if (weatherData.sky.main == "Rain" || "Drizzle") {
    weatherIcon = rain;
  } else if (weatherData.sky.main == "Snow") {
    weatherIcon = snow;
  } else if (weatherData.sky.main == "Fog") {
    weatherIcon = fog;
  } else {
    weatherIcon = sunny;
  }

  return (
    <section className="weather-card">
      <div className="weather-card__info">
        <p className="weather-card__temp">
          {weatherData.temp[currentTemperatureUnit]}
        </p>
        <img
          className="weather-card__image"
          src={weatherIcon}
          alt={`Image of ${weatherIcon}`}
        ></img>
      </div>
    </section>
  );
}

export default WeatherCard;
