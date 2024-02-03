import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../pages/Profile";
import SingleBlog from "../components/SingleBlog";
import EditBlog from "../pages/EditBlog";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/post/edit/:id"
        element={
          <PrivateRoutes>
            <EditBlog />
          </PrivateRoutes>
        }
      />
      <Route
        path="/post/:id"
        element={
          <PrivateRoutes>
            <SingleBlog />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
