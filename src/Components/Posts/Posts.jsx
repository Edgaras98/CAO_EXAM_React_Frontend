import React, { useEffect, useState } from "react";
import AuthManager from "../AuthManager/AuthManager";
import Navigation from "../Navigation/Navigation";
import Modal from "../Modal/Modal";
import "../Posts/Posts.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const [fetchedData, setfetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const baseUrl = "http://localhost:3000";
  const imgLink = `http://localhost:3000/uploads/`;
  const myBooks = "http://localhost:3000/user-books";
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:3000/user-books", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setfetchedData(data);
      });
  }, []);
  return (
    <>
      <Navigation
        linkto1="/user"
        linkto2="/upload"
        text1="Pagrindinis"
        text2="Įkelti knygą"
      />
      <AuthManager />
      <section className="main-home-section">
        <div className="main-home-wrap">
          <div className="search-word-div">
            <h2>Ieškoti</h2>
            <p>{`Tavo knygos ${fetchedData.length}`}</p>
          </div>
          <div className="input-div">
            <button>
              <i class="fas fa-search"></i>
            </button>
            <input
              type="search"
              placeholder="ieškoti skelbimų"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="modal-section">
          {fetchedData && fetchedData.length === 0 ? (
            <div className="no-post-div">
              <h2 className="no-posts">Jūs neturite aktyvių skelbimų</h2>
              <button
                onClick={() => {
                  navigate("/upload");
                }}
              >
                Sukurti skelbimą
              </button>
            </div>
          ) : (
            fetchedData
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((book) => (
                <Modal
                  key={book.id}
                  name={book.name}
                  author={book.author}
                  price={book.price}
                  createAt={book.created_at.split("T")[0]}
                  image={imgLink + book.image}
                  description={book.description}
                  handleDelete={() => {
                    if (
                      window.confirm(`Ar tikrai norite ištrinti ${book.name}?`)
                    ) {
                      fetch(`http://localhost:3000/books/${book.id}`, {
                        method: "DELETE",
                        headers: {
                          authorization: `Bearer ${token}`,
                        },
                      })
                        .then((res) => {
                          return res.json();
                        })
                        .then(
                          (data) => window.location.reload(),
                          toast.success("Skelbimas sėkmingai ištrintas", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          })
                        );
                    }
                  }}
                />
              ))
          )}
        </div>
      </section>
    </>
  );
};

export default Posts;
