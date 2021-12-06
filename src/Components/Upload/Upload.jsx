import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import AuthManager from "../AuthManager/AuthManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Upload/Upload.css";
import sellImg from "../../Images/sell.svg";
import Footer from "../Footer/Footer";

toast.configure();

const Upload = () => {
  const token = window.localStorage.getItem("token");
  const [book, setBook] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  let navigate = useNavigate();

  let formData = new FormData();
  formData.append("book", book);
  formData.append("author", author);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("image", image);

  return (
    <>
      <Navigation
        linkto1="/user"
        linkto2="/upload"
        text1="Pagrindinis"
        text2="Įkelti knygą"
      />
      <AuthManager />
      <section className="upload-section">
        <div className="upload-div">
          <div className="upload-div-info">
            <img src={sellImg} alt="svg" />
          </div>
          <form
            className="upload-form"
            enctype="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              fetch("http://localhost:3000/books", {
                method: "POST",
                headers: {
                  authorization: `Bearer ${token}`,
                },
                body: formData,
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.affectedRows !== 1) {
                    return toast.error("Klaidingai suvesti duomenys!", {
                      position: "top-center",
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    toast.success("Knyga sėkmingai įkelta!", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    navigate("/user");
                  }
                })
                .catch((err) => alert(err));
            }}
          >
            <p>Visi laukeliai pažymėti * yra privalomi</p>
            <input
              type="text"
              placeholder="Knygos pavadinimas *"
              required
              onChange={(e) => setBook(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Autorius *"
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              required
              placeholder="Kaina €*"
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              type="text"
              required
              placeholder="Knygos Aprašymas *"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label for="file">Tik .jpg abra .png formatai</label>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button>Įkelti knygą</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Upload;
