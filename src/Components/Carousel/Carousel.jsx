import React from "react";
import "../../Components/Carousel/Carousel.css";
import Like from "../../Images/Book.svg";
import { useNavigate } from "react-router";

const Carousel = () => {
  let navigate = useNavigate();
  return (
    <div className="Carousel-div">
      <div className="wrapper1">
        <div className="info-div">
          <p>
            <span>Knygos</span> - jos leidžia keliauti nejudinant kojų.
          </p>
          <p>Perleisk savo bilietą kitam</p>
          <button onClick={() => navigate("/upload")}>Parduok knygą!</button>
        </div>
        <div className="img-div-svg">
          <img src={Like} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
