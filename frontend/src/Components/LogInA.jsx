import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSignInA } from "../Hooks/useSignInA";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import hiloe5 from "../assets/admin2.jpg";
//import { useUserContext } from "../Hooks/useUserContext";
const LoginA = () => {
  const [email, setEmail] = useState("");
  const [viewr, setViewer] = useState(null);
  const [password, setPassword] = useState("");
  const { signinA, isLoading, error, image, name } = useSignInA();

  const handleSumit = async (e) => {
    e.preventDefault();
    await signinA(email, password);

    if (image) setViewer(true);
  };

  return (
    <div>
      <div className=" mt-44 border-black  bg-slate-50  h-[500px] w-[700px] ml-[310px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border-[1px] ">
        <div className="absolute">
          <form onSubmit={handleSumit}>
            <div className=" flex flex-col justify-center ml-[290px] mb-6 mt-12">
              <h3 className=" font-bold text-3xl ">Log In</h3>
            </div>

            <div className="flex flex-col space-y-5 ml-48 ">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="bg-transparent border-black  h-[35px] w-[300px]  border-b-2 block  focus:  rounded-2xl   px-4   "
                />
                <MdEmail className=" mt-2 absolute ml-[270px]" />
              </div>
              <div className="flex">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  className="bg-transparent border-black   h-[35px] w-[300px]  border-b-2 block  focus:  rounded-2xl   px-4   "
                />
                <RiLockPasswordFill className=" mt-2 absolute ml-[270px]" />
              </div>
              <button
                disabled={isLoading}
                className="bg-gradient-to-b hover:text-black h-[35px] w-[300px] border-2  from-blue-600 rounded-3xl font-bold hover:to-purple-500 transition delay-200 border-black "
              >
                Log In
              </button>
              {error && <div>{error}</div>}
            </div>
          </form>
        </div>
      </div>
      {/* <img className="object-fill w-full h-full" src={hiloe5} alt="" /> */}
    </div>
  );
};
export default LoginA;
