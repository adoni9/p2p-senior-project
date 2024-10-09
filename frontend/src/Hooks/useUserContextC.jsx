import { useContext } from "react";
import { UserContextC } from "../Context/UserContextC";
export const useUserContextC = () => {
  const context = useContext(UserContextC);

  if (!context) {
    throw Error("useUserContextC must be inside in usercontextC provider");
  }
  return context;
};
