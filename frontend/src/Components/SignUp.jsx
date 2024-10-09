import { useEffect, useRef, useState } from "react";
import { useSignUp } from "../Hooks/useSignUp";
import { FaIdCard } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiGenderFemaleDuotone } from "react-icons/pi";
import { FaTools } from "react-icons/fa";
import hiloe5 from "../assets/kj4.jpg";
import SuccessMessage from "./Thankyou";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";
const socket = io("https://mainkaju.onrender.com");
const SignUp = () => {
  const { signup, isLoading, error } = useSignUp();
  const [email, setEmail] = useState("");
  const [error2, setError2] = useState(null);
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [mobileMoney, setPhonenumber] = useState("");
  const [testImage, settestImage] = useState(null);
  const [testImage2, settestImage2] = useState(null);
  const [testImage3, settestImage3] = useState(null);
  const [genError, setgenError] = useState("");
  const [imError, setimError] = useState("");
  const [imError2, setim2Error] = useState("");
  const [imError3, setim3Error] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [View, setView] = useState(false);
  const [View2, setView2] = useState(true);
  const [otp, setOtp] = useState("");
  const GenderOption = ["Male", "Female"];
  const red = useNavigate();
  useEffect(() => {
    if (gender !== "" || gender !== "Gender") {
      setgenError("");
    }
  }, [gender]);
  useEffect(() => {
    if (testImage) {
      setimError("");
    }
  }, [testImage]);
  useEffect(() => {
    if (testImage2) {
      setim2Error("");
    }
  }, [testImage2]);
  useEffect(() => {
    if (testImage3) {
      setim3Error("");
    }
  }, [testImage3]);
  //Generate OTP
  const generateOtp = async (e) => {
    e.preventDefault();
    setError2("");

    if (gender == "" || gender == "Gender") {
      setgenError("Gender is Required");
      return;
    }
    if (!testImage) {
      setimError("Profile Photo is Required");
      return;
    }
    if (!testImage2) {
      setim2Error("Front side of Id is Required");
      return;
    }
    if (!testImage3) {
      setim3Error("Back side of Id is Required");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/Applicants/GenerateOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        mobileMoney: mobileMoney,
        password: password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError2(json.message);

      console.log(json.message);
      return;
    }

    setIsOtpSent(true);
  };
  const handleSumit = async (e) => {
    e.preventDefault();

    await signup(
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      password,
      otp,
      testImage,
      testImage2,
      testImage3
    );
  };
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("the is opt", isOtpSent);
  }, [isOtpSent]);
  useEffect(() => {
    socket.on("isLoading", (msg) => {
      console.log("the email", email);
      if (msg == email) {
        setView(true);
        setView2(false);
        console.log("in loading ", msg);
      }
    });
    return () => {
      socket.off("isLoading");
    };
  }, [socket, email]);
  const redirectSignin = () => {
    red("/login");
  };

  ///
  return (
    <div>
      {View2 && (
        <div className=" mt-12 bg-slate-100   h-[790px] w-[700px] ml-[320px] absolute bg-opacity-50 backdrop-filter backdrop-blur-sm border-[1px] border-black ">
          {!isOtpSent ? (
            <div className="absolute ml-7">
              <form onSubmit={generateOtp} className="to-blue-100">
                <div className=" flex flex-col justify-center ml-[260px] mb-6 mt-5">
                  <h3 className=" font-bold text-3xl ">Sign Up</h3>
                </div>

                <div className=" flex   justify-center items-center space-y-3   ">
                  <div className="flex flex-col space-y-5 ml-16 ">
                    <div className="flex">
                      <input
                        required
                        placeholder="Firstname"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        className="bg-transparent border-black   h-[35px] w-[300px]  border-2 block  focus:  rounded-2xl   px-4   "
                        id="myInput"
                      />
                      <FaUser className=" mt-2 absolute ml-[270px]" />
                    </div>
                    <div className="flex">
                      <input
                        required
                        placeholder="Lastname"
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        className="bg-transparent   h-[35px] w-[300px]  border-2 border-black block  focus:  rounded-2xl   px-4  "
                      />
                      <FaUser className=" mt-2 absolute ml-[270px]" />
                    </div>

                    <div className="flex">
                      <input
                        required
                        placeholder="PhoneNumber"
                        type="text"
                        onChange={(e) => setPhonenumber(e.target.value)}
                        value={mobileMoney}
                        className="bg-transparent border-black   h-[35px] w-[300px]  border-2 block  focus:  rounded-2xl   px-4  "
                      />
                      <AiFillPhone className=" mt-2 absolute ml-[270px]" />
                    </div>

                    <div className="flex">
                      <input
                        required
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="bg-transparent border-black   h-[35px] w-[300px]  border-2 block  focus:  rounded-2xl   px-4  "
                      />
                      <MdEmail className=" mt-2 absolute ml-[270px]" />
                    </div>
                    <div className="flex">
                      <input
                        required
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="bg-transparent border-black  h-[35px] w-[300px]  border-2 block  focus:  rounded-2xl   px-4  "
                      />
                      <RiLockPasswordFill className=" mt-2 absolute ml-[270px]" />
                    </div>
                    <div>
                      <div className="flex">
                        <select
                          required
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="bg-transparent border-black  h-[35px] w-[300px]  border-2 block    rounded-2xl px-4 "
                        >
                          <option className="px-3">Gender</option>
                          {GenderOption.map((option) => (
                            <option className="bg-gray-400 px-3" key={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <PiGenderFemaleDuotone className=" mt-2 absolute ml-[270px]" />
                      </div>
                      <div className="bg-red-500 ml-10 w-52 mt-2 rounded-sm">
                        {genError && <div className="ml-2  ">{genError}</div>}
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex flex-col space-y-3 ml-10">
           
              </div> */}
                </div>
                <div className="flex space-x-12 ml-16 mt-3">
                  <div className="ml-[-50px] sm:ml-auto">
                    <div className="bg-transparent cursor-pointer w-24 h-24 rounded-full border-2 border-green-300 ">
                      <label htmlFor="fileInput" className="">
                        {testImage ? (
                          <img
                            src={URL.createObjectURL(testImage)}
                            alt=""
                            className="cursor-pointer w-[92px] h-[92px] rounded-full "
                          />
                        ) : (
                          <IoMdPersonAdd className="text-[60px] ml-3 mt-3  cursor-pointer overflow-hidden hover:text-[75px]" />
                        )}
                      </label>

                      <input
                        id="fileInput"
                        placeholder="Avatar"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => settestImage(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="bg-green-400 mt-3 w-24 rounded-lg">
                      <label className="text-[12px] font-bold  ml-1">
                        Upload Profile
                      </label>
                      <div className="text-[13px] font-bold  ml-6">
                        <label>Photo</label>
                      </div>
                    </div>
                    <div className="bg-red-500   mt-2 rounded-md">
                      {imError && <div className="ml-4  ">{imError}</div>}
                    </div>
                  </div>
                  <div className="">
                    <div className="bg-transparent cursor-pointer w-24 h-24 rounded-full border-2 border-green-400 ml-3">
                      <label htmlFor="fileInput2">
                        {testImage2 ? (
                          <img
                            src={URL.createObjectURL(testImage2)}
                            alt=""
                            className="cursor-pointer w-[92px] h-[92px] rounded-full "
                          />
                        ) : (
                          <FaIdCard className="text-[60px]  ml-4 mt-4  cursor-pointer overflow-hidden hover:text-[75px]" />
                        )}
                      </label>
                      <input
                        id="fileInput2"
                        placeholder="National Id"
                        name="file"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => settestImage2(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="bg-green-400 mt-3 w-28 rounded-lg">
                      <label className="text-[12px] font-bold  ml-1">
                        Upload Front Side
                      </label>
                      <div className="text-[12px] font-bold  ml-4">
                        <label>Of National Id</label>
                      </div>
                    </div>
                    <div className="bg-red-500   mt-2 rounded-sm">
                      {imError2 && <div className="ml-4  ">{imError2}</div>}
                    </div>
                  </div>
                  <div>
                    <div className="bg-transparent cursor-pointer w-24 h-24 rounded-full border-2 border-green-400">
                      <label htmlFor="fileInput3">
                        {testImage3 ? (
                          <img
                            src={URL.createObjectURL(testImage3)}
                            alt=""
                            className="cursor-pointer w-[92px] h-[92px] rounded-full "
                          />
                        ) : (
                          <FaIdCard className="text-[60px] ml-4 mt-4  cursor-pointer overflow-hidden hover:text-[75px]" />
                        )}
                      </label>
                      <input
                        id="fileInput3"
                        placeholder="National Id"
                        name="file"
                        type="file"
                        ref={inputRef}
                        onChange={(e) => settestImage3(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="bg-green-400 mt-3 w-28 rounded-lg">
                      <label className="text-[12px] font-bold  ml-1">
                        Upload Back Side
                      </label>
                      <div className="text-[12px] font-bold  ml-4">
                        <label>Of National Id</label>
                      </div>
                    </div>
                    <div className="bg-red-500   mt-2 rounded-md">
                      {imError3 && <div className="ml-4  ">{imError3}</div>}
                    </div>
                  </div>
                </div>
                <div className="  justify-center mt-8 ml-36">
                  <button
                    disabled={false}
                    className="bg-gradient-to-b hover: h-[48px] w-96 hover:w-[420px] border-2 border-black  from-green-500 rounded-3xl font-bold hover:to-purple-800 transition delay-200"
                  >
                    Apply
                  </button>
                  <div className="bg-red-500 ml-28 w-56 mt-2 rounded-md">
                    {error && <div className="ml-2  ">{error}</div>}
                    {error2 && <div className="ml-5  ">{error2}</div>}
                  </div>
                </div>
              </form>
              <button className="ml-60 " onClick={redirectSignin}>
                already have an account?
              </button>
            </div>
          ) : (
            <div className="mt-56 ml-48">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="bg-transparent  h-[55px] w-[300px]  border-2 block  focus:  px-28   "
              />
              <div className="ml-12 mt-3">
                <button
                  onClick={handleSumit}
                  className="bg-green-400 hover: h-[48px] w-48 border-2  from-white rounded-3xl font-bold hover:bg-yellow-400 transition delay-200"
                >
                  Verify OTP
                </button>
              </div>

              <div className="bg-red-500 ml-10 w-56 mt-2 rounded-md">
                {error && <div className="ml-5  ">{error}</div>}
                {error2 && <div className="ml-5  ">{error2}</div>}
              </div>
            </div>
          )}
        </div>
      )}
      {View && (
        <div>
          <SuccessMessage />
        </div>
      )}
      {/* <img className="object-fill w-screen h-full" src={hiloe5} alt="" /> */}
      {/* <div className="object-fill w-screen h-full bg-blue-950"> </div> */}
    </div>
  );
};
export default SignUp;
