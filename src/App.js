import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Login } from "./Components/Login/Login";
// import { Register } from "./Components/Register/Register";
// import AuthHome from "./Components/AuthHome/AuthHome";
// import PrivateRoute from "./PrivateRoute/PrivateRoute";
// import Upload from "./Components/Upload/Upload";
// import Posts from "./Components/Posts/Posts";
// import Product from "./Components/Product/Product";
// import Profile from "./Components/Profile/Profile";

//Lazy imports

const Home = React.lazy(() => import("./Components/Home/Home"));
const AuthHome = React.lazy(() => import("./Components/AuthHome/AuthHome"));
const PrivateRoute = React.lazy(() =>
  import("./Components/PrivateRoute/PrivateRoute")
);
const Upload = React.lazy(() => import("./Components/Upload/Upload"));
const Posts = React.lazy(() => import("./Components/Posts/Posts"));
const Product = React.lazy(() => import("./Components/Product/Product"));
const Profile = React.lazy(() => import("./Components/Profile/Profile"));
const Login = React.lazy(() => import("./Components/Login/Login"));
const Register = React.lazy(() => import("./Components/Register/Register"));

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
