import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSignUpA = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const signupA = async (
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password,
    testImage
  ) => {
    setIsLoading(true);
    setError(null);
    let formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("gender", gender);
    formdata.append("phonenumber", phonenumber);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("testImage", testImage);
    const response = await fetch(`${API_BASE_URL}/api/Admin/AdminCreate`, {
      method: "POST",
      body: formdata,
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      red("/LoginA");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };
  return { signupA, isLoading, error };
};
