import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";
const socket = io("https://mainkaju.onrender.com");
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const signup = async (
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password,
    otp,
    testImage,
    testImage2,
    testImage3
  ) => {
    setIsLoading(true);
    setError(null);
    let formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("gender", gender);
    formdata.append("mobileMoney", mobileMoney);
    formdata.append("email", email);
    formdata.append("otp", otp);
    formdata.append("password", password);
    formdata.append("testImages", testImage);
    formdata.append("testImages", testImage2);
    formdata.append("testImages", testImage3);
    const response = await fetch(
      `${API_BASE_URL}/api/Applicants/ApplicantCreate`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      console.log("the json.email", json);
      socket.emit("isLoading", json.email);
      socket.emit("MyObject", json.applicants);
      // red("/login");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };
  return { signup, isLoading, error };
};
