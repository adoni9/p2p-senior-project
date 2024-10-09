import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { setAdmin } from "../features/admin/adminSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export const useSignInA = () => {
  const red = useNavigate();
  const dispatch2 = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signinA = async (email, password) => {
    console.log("the email", email);
    console.log("the email", password);
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${API_BASE_URL}/api/Admin/LoginAdmin`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      //dispatch({ type: "LOGIN", payload: json });
      dispatch2(setAdmin([json]));
      //save the user on local storage
      localStorage.setItem("admin", JSON.stringify(json));
      red("/Admin");
    } else {
      console.log("not log in");
    }
  };
  return { signinA, isLoading, error };
};
