import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AuthManager/AuthManager.css";

const AuthManager = () => {
  const [usersData, setUsersData] = useState([]);
  const token = window.localStorage.getItem("token");
  let navigate = useNavigate();
  useEffect(() => {
    fetch(process.env.REACT_APP_USER_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      });
  }, []);
  return (
    <div className="extended-header">
      <div className="extended-nav-links">
        <div className="name-div">
          <p>
            {usersData.map(
              (person) =>
                person.name.charAt(0).toUpperCase() +
                person.name.slice(1) +
                " " +
                person.surname.charAt(0).toUpperCase() +
                person.surname.slice(1)
            )}
          </p>
        </div>
        <div className="controlers-div">
          <div className="add-book-div">
            <i class="fas fa-plus"></i>
            <a href="/upload">įkelti naują skelbimą</a>
          </div>
          <div className="add-book-div">
            <i class="fas fa-book"></i>
            <a href="/posts">Mano skelbimai</a>
          </div>
          <div className="add-book-div">
            <i class="fas fa-user"></i>
            <a href="/profile">Profilis</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthManager;
