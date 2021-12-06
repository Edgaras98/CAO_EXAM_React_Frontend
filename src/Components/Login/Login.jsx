import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { AuthContext } from "../../Context/Auth";
import { Link } from "react-router-dom";
import "../Login/Login.css";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  let navigate = useNavigate();
  const [userInputs, setUserInputs] = useState();
  const authContext = useContext(AuthContext);
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
          <Link className="login-btn-log" to="/login">
            Prisijunk
          </Link>
          <Link className="register-btn-reg" to="/register">
            Registruokis
          </Link>
        </div>
        <div className="login-div">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch(process.env.REACT_APP_LOGIN_URL, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(userInputs),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.msg !== "Successfully logged in" || !data.token) {
                    toast.error("Toks vartotojas neegzistuoja", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    localStorage.setItem("token", data.token);
                    authContext.setToken(data.token);
                    toast.success(
                      `Malonu jus vėl matyti, ${userInputs.email} !`,
                      {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      }
                    );
                  }
                })
                .catch((err) =>
                  toast.error("Serverio klaida, atsiprašome už nesklandumus", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                )
                .finally(() => navigate("/user"));
            }}
          >
            <h1>Prisijungti su el.paštu</h1>
            <input
              type="text"
              placeholder="El.paštas"
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  email: e.target.value.trim().toLocaleLowerCase(),
                });
              }}
              required
            />
            <input
              type="password"
              placeholder="Slaptažodis"
              onChange={(e) => {
                setUserInputs({
                  ...userInputs,
                  password: e.target.value,
                });
              }}
              required
            />
            <button>Prisijungti</button>
          </form>
        </div>
      </section>
    </>
  );
};
