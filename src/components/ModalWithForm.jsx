import React, { useEffect, useRef, useState } from "react";

import "../blocks/modal.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText,
  accessButtonText,
  handleCloseClick,
  handleModalClick,
  isOpen,
  isLoggedIn,
  onSubmit,
  switchForms,
}) {
  const [buttonDisability, setButtonDisability] = useState(true);

  //using a ref, learned in Sprint 11, we can select the DOM element
  //useRef creates a ref
  //the rest is basically the same as the past projects.
  //for now, the button is enough, I might do the error messages later on.
  // do not use queryselector for React apps
  const formRef = useRef(null);

  const isFormvalid = () => {
    const form = formRef.current;
    const isValid = form.checkValidity();

    if (!isValid) {
      setButtonDisability(true);
    } else {
      setButtonDisability(false);
    }
  };

  // const switchForms = () => {
  //   console.log(isOpen);
  // };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen && "modal_visible"}`}
      onClick={handleModalClick}
    >
      <form
        className="modal__form"
        name={name}
        onInput={isFormvalid}
        // adding this replaces eventlisteners for each input.
        onSubmit={onSubmit}
        ref={formRef}
        // adding this is kinda like a className to select, but for React components
      >
        <h2 className="modal__title">{title}</h2>
        {children}
        <div className="modal__button-container">
          <button
            type="submit"
            className={`modal__submit-button 
            }`}
            disabled={buttonDisability}
          >
            {buttonText}
          </button>
          <div>
            {isLoggedIn ? (
              <></>
            ) : (
              <button
                type="button"
                className="modal__access-button"
                onClick={switchForms}
              >
                {accessButtonText}
              </button>
            )}
          </div>
        </div>
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

//${ isLoggedIn ? "" : "modal__submit-button:disabled "
