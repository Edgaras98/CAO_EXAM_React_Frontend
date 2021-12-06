import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import Navigation from "../Navigation/Navigation";
import "../Home/Home.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import ToTop from "../ToTop/ToTop";

const Home = () => {
  const [fetchedData, setfetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const imgLink = `http://localhost:3000/uploads/`;
  useEffect(() => {
    fetch(`${baseUrl}/books`)
      .then((res) => res.json())
      .then((data) => {
        setfetchedData(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Navigation
        linkto1="/login"
        linkto2="/upload"
        text1="Registruotis | Prisijungti"
        text2="Įkelti knygą"
      />
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
          {fetchedData.length === 0 ? (
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
              .map((data) => (
                <Card
                  key={data.id}
                  id={data.id}
                  name={data.book}
                  author={data.author}
                  price={data.price}
                  createAt={data.created_at.split("T")[0]}
                  image={imgLink + data.image}
                  handleProduct={() => {
                    navigate("/login");
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

export default Home;
