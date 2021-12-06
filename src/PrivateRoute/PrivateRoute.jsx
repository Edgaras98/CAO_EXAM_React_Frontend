import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
  return token ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
