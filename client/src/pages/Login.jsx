import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // if (false) {
  //   return <Navigate to="/" />;
  // }

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await dispatch(userLogin({ userName, password }));
      if (response.data.success) {
        Cookies.set("access_token", response.data.user.token);
        alert(response.data.message);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-2/5 h-auto flex flex-col items-center justify-center gap-3 border py-8 px-8 rounded-lg bg-white">
          <input
            type="text"
            className="w-full border-b border-gray-500 py-2 px-2 outline-none"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            className="w-full border-b border-gray-500 py-2 px-2 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-gray-300 mt-8 py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/signup">Don't have an account? Register</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
