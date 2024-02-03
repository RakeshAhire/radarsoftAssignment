import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/auth/register`,
        { userName, password }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/login");
        setLoading(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setLoading(false);
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="w-full h-[100vh] flex flex-col items-center justify-center border">
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
            onClick={handleRegister}
          >
            Register
          </button>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
