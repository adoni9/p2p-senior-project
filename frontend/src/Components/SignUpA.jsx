import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSignUpA } from "../Hooks/useSignUpA";
import { FaUser } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import hiloe5 from "../assets/admin4.jpg";
const SignUpA = () => {
  const { signupA, isLoading, error } = useSignUpA();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [testImage, settestImage] = useState(null);
  const GenderOption = ["Male", "Female"];
  const handleSumit = async (e) => {
    e.preventDefault();
    await signupA(
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      testImage
    );
  };

  return (
    <div>
      <div className=" mt-12   h-[700px] w-[700px] ml-[300px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border-[1px] border-white">
        <div className="absolute ">
          <form onSubmit={handleSumit} className="to-blue-100">
            <div className=" flex flex-col justify-center ml-[290px] mb-6 mt-5">
              <h3 className=" font-bold text-3xl text-white">Sign Up</h3>
            </div>

            <div className=" flex   justify-center items-center space-y-3   ">
              <div className="flex flex-col space-y-5 ml-40 ">
                <div className="flex"></div>
                <div className="flex">
                  <input
                    placeholder="Firstname"
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white "
                    id="myInput"
                  />
                  <FaUser className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <input
                    placeholder="Lastname"
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <FaUser className="text-white mt-2 absolute ml-[270px]" />
                </div>

                <div className="flex">
                  <input
                    placeholder="PhoneNumber"
                    type="text"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    value={phonenumber}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <AiFillPhone className="text-white mt-2 absolute ml-[270px]" />
                </div>

                <div className="flex">
                  <input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <MdEmail className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="bg-transparent  h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-white  rounded-2xl   px-4 placeholder-white text-white"
                  />
                  <RiLockPasswordFill className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-transparent  h-[35px] w-[300px]  border-2 block focus:outline-none   rounded-2xl px-4 text-white"
                  >
                    <option className="px-3">Gender</option>
                    {GenderOption.map((option) => (
                      <option className="bg-gray-400 px-3" key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <PiGenderFemaleDuotone className="text-white mt-2 absolute ml-[270px]" />
                </div>
                <div className="flex">
                  <label
                    htmlFor="customFile"
                    className="absolute text-[14px] ml-9 mt-3 text-white cursor-pointer"
                  >
                    Upload Photo
                  </label>
                  <input
                    placeholder="Avatar"
                    name="file"
                    type="file"
                    onChange={(e) => settestImage(e.target.files[0])}
                    className="file:bg-gradient-to-b file:from-orange-500 file:to-blue-500 file:px-6 file:py-3 files-5 file:border-none

file:rounded-full

file:text-transparent

file:cursor-pointer

file:shadow-lg file shadow-blue-600/50
      focus:outline-none   px-4 text-white"
                  />
                </div>
              </div>

              {/* <div className="flex flex-col space-y-3 ml-10">
           
              </div> */}
            </div>
            <div className=" flex flex-row justify-center mt-8 ml-40">
              <button className="bg-gradient-to-b hover:text-white h-[48px] w-96 border-2  from-white rounded-3xl font-bold hover:to-purple-800 transition delay-200">
                Sign Up
              </button>
              {error && <div>{error}</div>}
            </div>
          </form>
        </div>
      </div>

      <img className="object-fill w-full h-full" src={hiloe5} alt="" />
    </div>
  );
};
export default SignUpA;
