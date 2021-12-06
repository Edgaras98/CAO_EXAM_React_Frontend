import React from "react";
import "../Card/Card.css";

const Card = ({ name, author, price, createAt, image, handleProduct }) => {
  const token = window.localStorage.getItem("token");
  return (
    <div className="card-div" onClick={handleProduct}>
      <img src={image} alt="book image"></img>
      <div className="card-info-div">
        <p className="card-div-name">{name}</p>
        <p className="card-div-author">
          <i class="fas fa-user"></i> {author}
        </p>
        <p className="card-div-price">Kaina: {price} €</p>
        <p className="card-div-created">Įkelta: {createAt}</p>
        <button className="card-div-btn">Rinktis</button>
      </div>
    </div>
  );
};

export default Card;
