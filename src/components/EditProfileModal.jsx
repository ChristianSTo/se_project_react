import React from "react";
import { useEffect, useState, useContext } from "react";
import "../blocks/modal.css";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const EditProfileModal = ({
  isOpen,
  isLoading,
  onCloseModal,
  handleModalClick,
  editProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: "",
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
    console.log("Logging in user with data:", data); // Log the data
    editProfile(data);
  };

  useEffect(() => {
    if (currentUser) {
      setData({ name: currentUser.name, avatar: currentUser.avatar });
    } else {
      //   setData({ name: data.name, avatar: data.avatar });
      return;
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText={`${isLoading ? "Saving..." : "Edit Profile"}`}
      //   accessButtonText={`${isLoading ? "Loading..." : "or Sign up"}`}
      handleCloseClick={onCloseModal}
      handleModalClick={handleModalClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name
      </label>
      <input
        type="text"
        className="modal__input"
        id="profile-name"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL
      </label>
      <input
        type="avatar"
        className="modal__input"
        id="profile-avatar"
        name="avatar"
        placeholder="Avatar"
        value={data.avatar}
        onChange={handleChange}
        required
      ></input>
    </ModalWithForm>
  );
};

export default EditProfileModal;
