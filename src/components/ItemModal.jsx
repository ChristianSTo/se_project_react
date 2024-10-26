import { useContext } from "react";

import "../blocks/modal.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function ItemModal({
  name,
  card,
  handleCloseClick,
  handleModalClick,
  handleDeleteClick,
  isOpen,
}) {
  //conditional src based on if the card has a link or url
  const imgSrc = card.link || card.imageUrl || card.url;

  const currentUser = useContext(CurrentUserContext);

  //Checking if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser._id;

  //Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__card-delete-button ${
    isOwn
      ? "modal__card-delete-button_visible"
      : "modal__card-delete-button_hidden"
  }`;

  return (
    <div
      className={`modal ${isOpen && "modal_visible"} modal_type_${name}`}
      onClick={handleModalClick}
    >
      <div className="modal__card">
        <img className="modal__card-image" src={imgSrc} alt={card.name}></img>
        <div className="modal__card-info">
          <div>
            <p className="modal__card-name">{card.name}</p>
            <p className="modal__card-weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className={`${itemDeleteButtonClassName}`}
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>

        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close-button modal__card-close-button"
        ></button>
      </div>
    </div>
  );
}

export default ItemModal;
