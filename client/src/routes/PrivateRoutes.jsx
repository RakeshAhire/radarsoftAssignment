import React from "react";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const user = useSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default PrivateRoutes;
