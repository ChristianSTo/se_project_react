import { Routes, Route } from "react-router-dom";

import "../blocks/profile.css";
import SideBar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";

function Profile({
  weatherData,
  handleCardClick,
  handleAddClick,
  previewCard,
  clothingItems,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        previewCard={previewCard}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;
