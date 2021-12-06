import React from "react";

const ProductID = ({
  imageLink,
  bookname,
  author,
  description,
  price,
  created_at,
  phone,
  email,
  imgFull,
}) => {
  return (
    <div className="product-id-div">
      <div className="img-div">
        <img src={imageLink} alt="product-foto" onClick={imgFull}></img>
      </div>
      <div className="product-id-info">
        <h1>{bookname}</h1>
        <h2>
          <span>Autorius: </span> {author}
        </h2>
        <h2>
          <span>Aprašymas: </span> {description}
        </h2>
        <h3>
          <span>Kaina: </span>
          {`${price} €`}
        </h3>
        <h3>
          <span>Įkelta: </span> {created_at.split("T")[0]}
        </h3>
        <div className="sellers-div">
          <h2>Pardavėjo Kontaktai</h2>
          <h3>Tel.numeris: {phone}</h3>
          <h3>El.paštas: {email}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductID;
