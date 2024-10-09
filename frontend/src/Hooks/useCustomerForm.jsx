import { useState } from "react";
import { io } from "socket.io-client";
import { useUserContextC } from "../Hooks/useUserContextC";
import { Navigate, useNavigate } from "react-router-dom";
export const useCustomerForm = () => {
  let socket = io("https://mainkaju.onrender.com");
  const red = useNavigate();
  let { customer, dispatch } = useUserContextC();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [who, setWho] = useState(null);
  customer = customer[0];
  let token = customer ? "Bearer " + customer.token : "";
  const CustomerForm = async (typeOfProblem, department) => {
    console.log("dep", department);
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/Book/BookCreate", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        typeOfProblem,
        department,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      setWho(null);
      console.log("not alright");
    }
    if (response.ok) {
      //dispatch2({ type: "CREATE_TASK", payload: json });
      setIsLoading(false);
      setWho(json);
      setError(null);
      console.log("alright");
      //red("/Dashboard");
      //save the user on local storage
      //localStorage.setItem('user')
    }
  };

  return { CustomerForm, isLoading, error, who };
};
