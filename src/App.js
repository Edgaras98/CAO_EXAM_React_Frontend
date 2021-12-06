import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import AuthHome from "./Components/AuthHome/AuthHome";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Upload from "./Components/Upload/Upload";
import Posts from "./Components/Posts/Posts";
import Product from "./Components/Product/Product";
import Profile from "./Components/Profile/Profile";

//Lazy imports

const Home = React.lazy(() => import("./Components/Home/Home"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              exact
              path="/user"
              element={
                <PrivateRoute>
                  <AuthHome />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/product/item=:id"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/posts"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
