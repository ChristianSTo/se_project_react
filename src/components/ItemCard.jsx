import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import "../blocks/itemcard.css";

function ItemCard({ item, previewCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  //Checking if the current user is the owner of the current clothing item
  const isOwn = currentUser && item.owner === currentUser._id;

  //Creating a variable which you'll then set in `className` for the delete button
  const itemLikeButtonClassName = `${
    isOwn ? "item-card__like-button" : "item-card__like-button_hidden"
  }`;
  if (!item) {
    console.error("Item is undefined");
    return null;
  }
  const handleCardClick = () => {
    previewCard(item);
  };

  const handleLike = (evt) => {
    evt.stopPropagation();
    onCardLike({ itemId: item._id, isLiked: isLiked });
  };
  //conditional src based on if the item has a link or url, so they are now interchangeable.
  const imgSrc = item.link || item.imageUrl || item.url;
  return (
    <li className="item-card" onClick={handleCardClick}>
      <div className="item-card__container">
        <h2 className="item-card__name">{item.name}</h2>
        <button
          className={`${itemLikeButtonClassName} ${
            isLiked ? "item-card__like-button_liked" : ""
          }`}
          type="button"
          onClick={handleLike}
        ></button>
      </div>
      <img src={imgSrc} alt={item.name} className="item-card__image"></img>
    </li>
  );
}

export default ItemCard;
