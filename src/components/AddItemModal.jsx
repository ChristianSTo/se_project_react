import React from "react";
import { useState } from "react";
import "../blocks/modal.css";
import ModalWithForm from "./ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({
  isOpen,
  isLoading,
  onAddItem,
  onCloseModal,
  handleModalClick,
}) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setType] = useState("");

  // create onChange handlers corresponding to each state variable

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  };

  const handleTypeChange = (evt) => {
    setType(evt.target.value);
  };

  //submit function to pass into onSubmit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem({ name, link, weather });
    setName("");
    setLink("");
    setType("");
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-garment"
      buttonText={`${isLoading ? "Saving..." : "Add garment"}`}
      handleCloseClick={onCloseModal}
      handleModalClick={handleModalClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="input-name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="input-name"
        name="inputName"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        required
      ></input>
      <label htmlFor="input-image" className="modal__label">
        Image
      </label>
      <input
        type="url"
        className="modal__input"
        id="input-image"
        name="inputImage"
        placeholder="Image URL"
        value={link}
        onChange={handleLinkChange}
        required
      ></input>
      <fieldset className="modal__label modal__choices">
        <legend className="modal__legend"> Select the weather type:</legend>
        <label className="modal__label modal__choice-label" htmlFor="hot">
          <input
            type="radio"
            className="modal__input modal__choice-input"
            value="hot"
            id="hot"
            name="tempChoice"
            onChange={handleTypeChange}
            checked={weather === "hot"}
            required
          ></input>
          Hot
        </label>
        <label className="modal__label modal__choice-label" htmlFor="warm">
          <input
            type="radio"
            className="modal__input modal__choice-input"
            value="warm"
            id="warm"
            name="tempChoice"
            onChange={handleTypeChange}
            checked={weather === "warm"}
            required
          ></input>
          Warm
        </label>
        <label className="modal__label modal__choice-label" htmlFor="cold">
          <input
            type="radio"
            className="modal__input modal__choice-input"
            value="cold"
            id="cold"
            name="tempChoice"
            onChange={handleTypeChange}
            checked={weather === "cold"}
            required
          ></input>
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
