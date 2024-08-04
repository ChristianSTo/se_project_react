import "../blocks/modal.css";

function ItemModal({ name, card, handleCloseClick, handleModalClick, isOpen }) {
  return (
    <div
      className={`modal ${isOpen && "modal_visible"} modal_type_${name}`}
      onClick={handleModalClick}
    >
      <div className="modal__card">
        <img
          className="modal__card-image"
          src={card.link}
          alt={card.name}
        ></img>
        <p className="modal__card-name">{card.name}</p>
        <p className="modal__card-weather">Weather: {card.weather}</p>
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
