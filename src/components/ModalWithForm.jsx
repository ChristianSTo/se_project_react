import React, { useEffect, useRef, useState } from "react";

import "../blocks/modal.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  handleCloseClick,
  handleModalClick,
  isOpen,
  onSubmit,
}) {
  const [buttonDisability, setButtonDisability] = useState(true);

  //using a ref, learned in Sprint 11, we can select the DOM element
  //useRef creates a ref
  //the rest is basically the same as the past projects.
  //for now, the button is enough, I might do the error messages later on.
  const formRef = useRef(null);

  const isFormvalid = () => {
    const form = formRef.current;
    const inputElements = form.querySelectorAll(".modal__input");
    const isValid = Array.from(inputElements).every(
      (input) => input.validity.valid
    );
    if (!isValid) {
      setButtonDisability(true);
    } else {
      setButtonDisability(false);
    }
  };

  //each input should listen to if it is valid
  const inputEventListeners = () => {
    const form = formRef.current;
    const inputElements = form.querySelectorAll(".modal__input");
    inputElements.forEach((input) => {
      input.addEventListener("input", isFormvalid);
    });
  };

  //run this, if modal with form is opened.
  useEffect(() => {
    if (formRef.current) {
      inputEventListeners();
    }
  }, [isOpen]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen && "modal_visible"}`}
      onClick={handleModalClick}
    >
      <form
        className="modal__form"
        name={name}
        onSubmit={onSubmit}
        ref={formRef}
        // adding this is kinda like a className to select, but for React components
      >
        <h2 className="modal__title">{title}</h2>
        {children}
        <button
          type="submit"
          className="modal__submit-button"
          disabled={buttonDisability}
        >
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
