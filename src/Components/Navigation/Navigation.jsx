import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Navigation/Navigation.css";

const Navigation = ({ linkto1, linkto2, text1, text2, handleClick }) => {
  const [navheader, setNavHeader] = useState(false);
  const [navwrap, setNavWrap] = useState(false);
  const [navlogo, setNavLogo] = useState(false);
  const [navLogBtn, setNavLogBtn] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavHeader(true);
      setNavWrap(true);
      setNavLogo(true);
      setNavLogBtn(true);
    } else {
      setNavLogBtn(false);
      setNavLogo(false);
      setNavWrap(false);
      setNavHeader(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <header className={navheader ? "header active" : "header"}>
      <div className={navwrap ? "wrapper active" : "wrapper"}>
        <a href="/" className={navlogo ? "a active" : "a"}>
          Pluma.lt
        </a>
        <div className="nav-button-div">
          <Link
            className={navLogBtn ? "log-reg-button active" : "log-reg-button"}
            to={linkto1}
          >
            {text1}
          </Link>
          <Link className="upload-button" to={linkto2} onClick={handleClick}>
            {text2}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
