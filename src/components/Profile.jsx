import { Routes, Route } from "react-router-dom";

import "../blocks/profile.css";
import SideBar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";

function Profile({
  weatherData,
  handleCardClick,
  handleAddClick,
  handleChangeClick,
  handleLogOutClick,
  previewCard,
  clothingItems,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        handleChangeClick={handleChangeClick}
        handleLogOutClick={handleLogOutClick}
      />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        previewCard={previewCard}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
