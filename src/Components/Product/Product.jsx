import React, { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import AuthManager from "../AuthManager/AuthManager";
import "../Product/Product.css";
import ProductID from "../ProductID/ProductID";
import { useParams } from "react-router-dom";

const Product = () => {
  const [fetchedData, setFetchedData] = useState([]);

  const token = window.localStorage.getItem("token");
  const params = useParams();
  const imgLink = `http://localhost:3000/uploads/`;

  useEffect(() => {
    fetch(`http://localhost:3000/product/item=${params.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
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
      <section className="product-id-section">
        {fetchedData.map((book) => (
          <ProductID
            imageLink={imgLink + book.image}
            bookname={book.book}
            author={book.author}
            description={book.description}
            price={book.price}
            created_at={book.created_at}
            phone={book.phone}
            email={book.email}
          />
        ))}
      </section>
    </>
  );
};

export default Product;
