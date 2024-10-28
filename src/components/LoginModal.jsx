import React from "react";
import { useEffect, useState } from "react";
import "../blocks/modal.css";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({
  isOpen,
  isLoading,
  onCloseModal,
  handleModalClick,
  logInUser,
  switchForms,
  isNoUser,
  isResetForm,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    logInUser(data);
  };

  useEffect(() => {
    if (isResetForm) {
      setData({ email: "", password: "" });
    }
  }, [isResetForm]);

  return (
    <ModalWithForm
      title="Log In"
      name="log-in"
      buttonText={`${isLoading ? "Saving..." : "Log In"}`}
      accessButtonText={`${isLoading ? "Loading..." : "or Sign up"}`}
      handleCloseClick={onCloseModal}
      handleModalClick={handleModalClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      switchForms={switchForms}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
      </label>
      <input
        type="text"
        className="modal__input"
        id="login-email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="login-password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        className="modal__input"
        id="login-password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      ></input>
      <span
        className={
          isNoUser ? `modal__error-message_visible` : `modal__error-message`
        }
      >
        Invalid credentials. Update credentials or sign up.
      </span>
    </ModalWithForm>
  );
};

export default LoginModal;
