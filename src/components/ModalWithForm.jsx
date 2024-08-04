import "../blocks/modal.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  handleCloseClick,
  handleModalClick,
  isOpen,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen && "modal_visible"}`}
      onClick={handleModalClick}
    >
      <form className="modal__form" name={name}>
        <h2 className="modal__title">{title}</h2>
        {children}
        <button type="submit" className="modal__submit-button">
          {buttonText}
        </button>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close-button"
        ></button>
      </form>
    </div>
  );
}

export default ModalWithForm;
