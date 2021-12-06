import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import AuthManager from "../AuthManager/AuthManager";
import "../Profile/Profile.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
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
        setUserData(data[0]);
      });
  }, []);

  return (
    <>
      <Navigation
        linkto1="/user"
        linkto2="/login"
        text1="Pagrindinis"
        text2="Atsijungti"
        handleClick={() => {
          window.localStorage.clear();
        }}
      />
      <AuthManager />
      <section className="profile-section">
        <h2>Vartotojo duomenys</h2>
        <div className="wrap-div-profile">
          <div className="profile-div">
            <h2>
              Vardas: <span>{userData.name}</span>
            </h2>
            <h2>
              Pavardė: <span>{userData.surname}</span>
            </h2>
            <h2>
              El.paštas: <span>{userData.email}</span>
            </h2>
            <h2>
              Telefono numeris: <span>{userData.phone}</span>
            </h2>
          </div>
          <div className="update-div">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch("http://localhost:3000/user/", {
                  method: "PUT",
                  headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(userInputs),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setUserInputs(data);
                  })
                  .finally(
                    () =>
                      toast.success("Duomenys sėkmingai atnaujinti!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      }),
                    e.target.reset(),
                    window.location.reload()
                  );
              }}
            >
              <input
                type="text"
                placeholder="Naujas Vardas"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    name: e.target.value,
                  });
                }}
              ></input>
              <input
                type="text"
                placeholder="Nauja Pavardė"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    surname: e.target.value,
                  });
                }}
              ></input>
              <input
                type="email"
                placeholder="Naujas El.Paštas"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    email: e.target.value,
                  });
                }}
              ></input>
              <input
                type="text"
                placeholder="Naujas pilnas Tel.numeris (+370)"
                onChange={(e) => {
                  setUserInputs({
                    ...userInputs,
                    phone: e.target.value,
                  });
                }}
              ></input>
              <button type="submit">Keisti duomenis</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
