import "../blocks/modal.css";

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
            className="modal__card-delete-button"
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
