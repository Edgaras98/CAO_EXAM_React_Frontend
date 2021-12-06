import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import Card from "../Card/Card";
import AuthManager from "../AuthManager/AuthManager";
import Carousel from "../Carousel/Carousel";
import Footer from "../Footer/Footer";
import ToTop from "../ToTop/ToTop";

const AuthHome = () => {
  const [fetchedData, setfetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const baseUrl = "http://localhost:3000/";
  const imgLink = `http://localhost:3000/uploads/`;
  useEffect(() => {
    fetch(`${baseUrl}books`)
      .then((res) => res.json())
      .then((data) => {
        setfetchedData(data);
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
      <Carousel />
      <ToTop />
      <section className="main-home-section">
        <div className="main-home-wrap">
          <div className="search-word-div">
            <h2>Ieškoti</h2>
            <p>{`Tarp ${fetchedData.length} knygų`}</p>
          </div>
          <div className="input-div">
            <button>
              <i class="fas fa-search"></i>
            </button>
            <input
              type="search"
              placeholder="ieškoti knygų"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="cards-section">
          {fetchedData && fetchedData.length === 0 ? (
            <h2 className="loading-book">Ieškome knygų...</h2>
          ) : (
            fetchedData
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.book.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((book) => (
                <Card
                  key={book.id}
                  name={book.book}
                  author={book.author}
                  price={book.price}
                  createAt={book.created_at.split("T")[0]}
                  image={imgLink + book.image}
                  handleProduct={() => {
                    navigate(`/product/item=${book.id}`);
                  }}
                />
              ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuthHome;
