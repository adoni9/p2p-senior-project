import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChat, addChat } from "../features/chat/chatSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSendMessage = () => {
  const dispatch2 = useDispatch();
  const red = useNavigate();
  //const { user, dispatch } = useUserContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const sendMessage = async (Sender_id, Receiver_id, Message, image) => {
    setIsLoading(true);
    setError(null);
    if (Receiver_id !== "") {
      const response = await fetch(`${API_BASE_URL}/api/Chat/ChatCreate`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ Sender_id, Receiver_id, Message, image }),
      });
      const json = await response.json();
      if (response.ok) {
        // setIsLoading(false);
        //dispatchChat({ type: "CREATE_CHAT", payload: json });
        dispatch2(setChat(json));
        //red("/Home");
        //save the user on local storage
        //localStorage.setItem("user", JSON.stringify(json));
      }
    }
  };
  return { sendMessage, isLoading, error };
};
