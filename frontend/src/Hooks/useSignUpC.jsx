import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContextC } from "../Hooks/useUserContextC";
export const useSignUpC = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const red = useNavigate();
  const { customer, dispatch2 } = useUserContextC();
  const signupC = async (phonenumber) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/Customer/CustomerCreate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phonenumber,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      localStorage.setItem("customer", JSON.stringify(json));
      dispatch2({ type: "LOGIN", payload: json });
      red("/Dashboard");
    }
  };
  return { signupC, isLoading, error };
};
