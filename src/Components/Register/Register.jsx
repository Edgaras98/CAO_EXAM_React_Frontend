import React, { useState, useRef } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Register/Register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  let navigate = useNavigate();
  const [userInputs, setUserInputs] = useState();
  const password = useRef();
  const passwordRep = useRef();
  return (
    <>
      <Navigation
        linkto1="/"
        linkto2="/upload"
        text1="Pagrindinis"
        text2="Įkelti knygą"
      />
      <section className="login-section">
        <div className="switch-div">
          <Link className="login-btn" to="/login">
            Prisijunk
          </Link>
          <Link className="register-btn" to="/register">
            Registruokis
          </Link>
        </div>
        <div className="login-div-reg">
          <form
            className="reg-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (password.current.value !== passwordRep.current.value) {
                return toast.error("Slaptažodžiai nesutampa!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
              if (userInputs.phone.includes("+370")) {
                fetch("http://localhost:3000/routes/auth/register", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(userInputs),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.affectedRows !== 1) {
                      return toast.error("tokio naudotojo neradome", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    }
                    toast.success("Registracija sėkminga!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  })
                  .catch((err) => alert(err))
                  .finally(() => e.target.reset(), navigate("/login"));
              } else {
                return toast.error("Neteisingas Telefono numerio formatas!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }}
          >
            <h1>Registracija</h1>
            <input
              type="text"
              placeholder="Vardas"
              required
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  name: e.target.value.trim().toLocaleLowerCase(),
                });
              }}
            />
            <input
              type="text"
              placeholder="Pavardė"
              required
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  surname: e.target.value.trim().toLocaleLowerCase(),
                });
              }}
            />
            <input
              type="text"
              placeholder="El.paštas"
              required
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  email: e.target.value.trim().toLocaleLowerCase(),
                });
              }}
            />
            <div className="phone-div">
              <input
                type="text"
                placeholder="Pilnas telefono numeris (+370..)"
                required
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    phone: e.target.value.trim().toLocaleLowerCase(),
                  });
                }}
              />
            </div>
            <input
              type="password"
              placeholder="Slaptažodis"
              required
              ref={password}
            />
            <input
              type="password"
              placeholder="Pakartokite Slaptažodi"
              ref={passwordRep}
              required
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  password: e.target.value,
                });
              }}
            />
            <button>Registruotis</button>
          </form>
        </div>
      </section>
    </>
  );
};
