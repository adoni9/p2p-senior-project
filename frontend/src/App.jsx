import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import PictureUploader from "./Components/muke";
// import { io } from "socket.io-client";
import Login from "./Components/LogIn";
// import LoginC from "./Components/LogInC";
import LoginA from "./Components/LogInA";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// import Dashboard from "./Components/Dashboard";
// import Dashboard2 from "./Components/DashBoard2";
// import Chat from "./Components/Chat";
import Admin from "./Components/Admin";
import AdminChat from "./Components/AdminChat";
// import Home from "./Components/Home";
// import FrontPage from "./Components/FrontPage";
// import ChatTech from "./Components/ChatTech";
import SignUpA from "./Components/SignUpA";
// import SignUpC from "./Components/SignUpC";
// import Transition from "./Components/Transition";
// import Transition2 from "./Components/Transition2";
import { useEffect, useState } from "react";
import { setTech, addTech } from "./features/tech/techSlice";
import { setAdmin } from "./features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import New from "./Components/New";
import { io } from "socket.io-client";
import Products from "./Components/Products";
// const socket = io("https://mainkaju.onrender.com");
function App() {
  //const todo2 = useSelector((state) => state.tech.tech);
  const todo = useSelector((state) => state.admin.admin);
  const [user, setUser] = useState();
  const [admin, setAdmin2] = useState();
  const dispatch2 = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      featch(user._id);
    } else {
      const storedUser = localStorage.getItem("user");
      console.log("not found2U", storedUser);
    }
    if (storedAdmin) {
      //setIsLoggedIn(true);
      const admin = JSON.parse(storedAdmin);
      setAdmin2(admin);
      featch2(admin._id);

      //socket.emit("newUser", user.email);
    } else {
      console.log("not found2");
    }
  }, []);
  //user
  const featch = async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/api/user/GetOneUserById/${id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("can not log");
    }
    if (response.ok) {
      dispatch2(setTech(json));
      console.log("the my user is ", json);
      //save the user on local storage
      // localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  //admin
  const featch2 = async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/GetOneAdminById/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("can not log");
    }
    if (response.ok) {
      dispatch2(setAdmin([json]));
      //save the user on local storage
      // localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  return (
    <div>
      <BrowserRouter>
        {/* <center>
          <NavBar />
        </center> */}
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LoginA" element={<LoginA />} />
          <Route path="/AdminChat" element={<AdminChat />} />
          <Route path="/Admin" element={<Admin user3={admin || todo[0]} />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpA" element={<SignUpA />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Products user3={user} />} />
          <Route path="/Products" element={<Products user3={user} />} />
          <Route path="/New" element={<New />} />
          <Route path="/PictureUploader" element={<PictureUploader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
