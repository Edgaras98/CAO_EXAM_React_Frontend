import React from "react";
import "../Modal/Modal.css";

const Modal = ({ name, author, price, createAt, image, handleDelete }) => {
  return (
    <div className="modal-div">
      <div className="img-div">
        <img src={image} alt="book image"></img>
      </div>
      <div className="modal-info-div">
        <p className="card-div-name">{name}</p>
        <p className="card-div-author">
          <i class="fas fa-user"></i> {author}
        </p>
        <p className="card-div-price">Kaina: {price} €</p>
        <p className="card-div-created">Įkelta: {createAt}</p>
        <button className="card-div-btn" onClick={handleDelete}>
          Ištrinti skelbimą
        </button>
      </div>
    </div>
  );
};

export default Modal;
