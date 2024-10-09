import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const socket = io("https://mainkaju.onrender.com");
export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const register = async (
    id,
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password,
    image,
    image2,
    image3
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/api/user/userCreate/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        gender,
        mobileMoney,
        email,
        password,
        image,
        image2,
        image3,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      socket.emit("ErrorM", json.message);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      socket.emit("ErrorM", "ok");
      console.log("this is the data of the");
      // red("/login");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };
  return { register, isLoading, error };
};
