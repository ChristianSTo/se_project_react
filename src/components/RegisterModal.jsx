import React from "react";
import { useEffect, useState } from "react";
import "../blocks/modal.css";
import ModalWithForm from "./ModalWithForm";

const RegisterModal = ({
  isOpen,
  isLoading,
  onCloseModal,
  handleModalClick,
  registerUser,
  switchForms,
  isSameUser,
  isResetForm,
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //submit function to pass into onSubmit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerUser(data);
  };

  useEffect(() => {
    if (isResetForm) {
      setData({ name: "", email: "", password: "", avatar: "" });
    }
  }, [isResetForm]);

  return (
    <ModalWithForm
      title="Sign Up"
      name="sign-up"
      buttonText={`${isLoading ? "Saving..." : "Sign Up"}`}
      accessButtonText={`${isLoading ? "Loading..." : "or Log In"}`}
      handleCloseClick={onCloseModal}
      handleModalClick={handleModalClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchForms={switchForms}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        className="modal__input"
        id="register-email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="register-password" className="modal__label">
        Password*
      </label>
      <input
        type="text"
        className="modal__input"
        id="register-password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="register-name" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        className="modal__input"
        id="register-name"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
      </label>
      <input
        type="text"
        className="modal__input"
        id="register-avatar"
        name="avatar"
        placeholder="Avatar"
        value={data.avatar}
        onChange={handleChange}
      ></input>
      <span
        className={
          isSameUser ? `modal__error-message_visible` : `modal__error-message`
        }
      >
        Email already in use. Please switch email or log in.
      </span>
    </ModalWithForm>
  );
};

export default RegisterModal;
