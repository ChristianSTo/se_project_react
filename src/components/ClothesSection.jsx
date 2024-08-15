import "../blocks/clothesSection.css";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";

function ClothesSection({
  weatherData,
  handleCardClick,
  handleAddClick,
  previewCard,
  clothingItems,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__banner">
        <p className="clothes-section__label">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__cards">
        {/* not filtering to list all owned clothes */}
        {/* filtering in main for weather suggestions */}
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              previewCard={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
