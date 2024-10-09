import { useContext } from "react";
import { UserContext2 } from "../Context/UserContext2";
export const useUserContext2 = () => {
  const context = useContext(UserContext2);

  if (!context) {
    throw Error("useUserContext2 must be inside in usercontext provider");
  }
  return context;
};
