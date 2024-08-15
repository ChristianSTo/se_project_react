import "../blocks/confirmModal.css";

function ConfirmModal({
  handleCloseClick,
  handleModalClick,
  onRemoveItem,
  isOpen,
  card,
}) {
  //submit function to pass into onSubmit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRemoveItem({ card });
  };
  return (
    <div
      className={`confirm-modal ${isOpen && "confirm-modal_visible"}`}
      onClick={handleModalClick}
    >
      <form className="confirm-modal__form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="confirm-modal__button confirm-modal__close-button"
          onClick={handleCloseClick}
        ></button>
        <p className="confirm-modal__message">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="submit"
          className="confirm-modal__button confirm-modal__delete-button"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="confirm-modal__button confirm-modal__cancel-button"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ConfirmModal;
