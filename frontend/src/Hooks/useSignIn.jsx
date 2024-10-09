import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { setTech, addTech } from "../features/tech/techSlice";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export const useSignIn = () => {
  const red = useNavigate();
  //const { user, dispatch } = useUserContext();
  const dispatch2 = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/api/user/Loginuser`, {
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
      // const convert = [json];
      //dispatch({ type: "LOGIN", payload: json });
      console.log("json", json);
      dispatch2(setTech([json]));
      red("/");
      //save the user on local storage
      localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  return { signin, isLoading, error };
};
