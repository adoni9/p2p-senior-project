import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { GiMaterialsScience } from "react-icons/gi";
import { FaCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import UserProfile from "./Profile";
import { TiMessages } from "react-icons/ti";
import { GiSandsOfTime } from "react-icons/gi";
import Counter from "./Counter";
import WithdrawalForm from "./withDraw";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import StarRatingH from "./New";
import ChatTech from "./ChatTech";
import ChatTechAd from "./ChatTechAd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiUserAdd } from "react-icons/ti";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { FaCar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { FaHouseDamage } from "react-icons/fa";
import { MdEditLocationAlt } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { updateTech, setTech } from "../features/tech/techSlice";
import { updateCart, addCartt, removeCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { ImLocation } from "react-icons/im";
const socket = io("https://mainkaju.onrender.com");
const Products = ({ user3 }) => {
  const dispatch2 = useDispatch();
  const todo = useSelector((state) => state.tech.tech);
  console.log("the toddo is ", todo);
  console.log("the user3 is is ", user3);
  const myCarts = useSelector((state) => state.cart.cart);
  //dispatch2(setTech(todo));
  const toastify = () => {
    toast.error("Please LognIn First", {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  const toastify2 = (Llimit, Ulimit) => {
    toast.error(`You must buy atleast ${Llimit} atmost ${Ulimit}`, {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [array3, setArray3] = useState([]);
  const [notify, setNotify] = useState(0);
  const [Json, setJson] = useState(null);
  let user = todo;
  user = user[0];
  let token = user ? "Bearer " + user.tk : "";
  console.log("the token ", token);
  if (token == "Bearer " + undefined) {
    token = user3 ? "Bearer " + user3.token : "";
  }
  let Lastname = user ? user.lastname : "";
  let Gender = user ? user.gender : "";
  let Phonenumber = user ? user.phonenumber : "";
  const [Email, setEmail] = useState(user ? user.email : "");
  const _idRef = useRef("");
  const tokenRef = useRef("");
  let _id = user3 ? user3._id : "";
  _idRef.current = _id;
  tokenRef.current = token;
  console.log("the user3 id is ", _id);
  // useEffect(() => {
  //   setId(user ? user._id : "");
  //   setLoading(false); // Data is loaded, set loading to false
  // }, [user]);

  const Location = user ? user.location : "";
  const profile = user ? user.image : "";
  const Firstname = user ? user.firstname : "";
  const Deposite = user ? user.deposite : "";
  const Id = user ? user.id : "";
  //critical
  let user4;

  const [choice, setChoice] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocationName] = useState("");
  const [error2, setError2] = useState("");
  const [query, setQuery] = useState("");
  const [disp, setdisplay] = useState("visible");
  const [disp2, setdisplay2] = useState("hidden");
  const [disp3, setdisplay3] = useState("visible");
  const [disp8, setdisplay8] = useState("hidden");
  const [disp12, setdisplay12] = useState("visible");
  const [suggestions, setSuggestions] = useState([]);
  const [senderId, setSenderId] = useState("");
  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setTransactionType(""); // Reset transaction type when property type changes
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };
  const red = useNavigate();

  //fetch Products
  const Product = async () => {
    if (!location) {
      return; // Exit early if location is not set
    }
    const response = await fetch(
      `${API_BASE_URL}/api/GetAllItems/GetAllItems`,
      {
        method: "POST",
        body: JSON.stringify({ location: location }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const json = await response.json();
      setJson(json);
      console.log("the json is", json);
    }
  };
  const GPS = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          try {
            const apiKey = "3f6fbb502a5f47d4b45b5b3673b4e788";
            const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`;
            const response = await axios.get(geocodeUrl);
            const { results } = response.data;
            const address = results[0].formatted;
            setLocationName(address);
          } catch (error) {
            setError2("Error retrieving location name.");
          }
        },
        (error) => {
          setError2(error.message);
        }
      );
    } else {
      setError2("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    GPS();
    const interval = setInterval(() => {
      GPS();
    }, 2 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    response2();
    socket.emit("locationChange", "change");
    dispatch2(
      updateTech({
        id: Id,
        firstname: Firstname,
        lastname: Lastname,
        gender: Gender,
        phonenumber: Phonenumber,
        deposit: Deposite,
        email: Email,
        image: profile,
        location: location,
        _id: _idRef.current,
      })
    );
  }, [location]);
  //useeffect for product
  useEffect(() => {
    Product();
    getAllCarts();
  }, [location, user]);
  const response2 = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/${_idRef.current}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location: location }),
    });
  };
  const getAllCarts = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Cart/GetAllCart`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: token },
    });
    if (response.ok) {
      const json = await response.json();
      setCartNumber(json.length);
      console.log("the my length is ", json.length);
      // setCart(json);
      for (const pro of json) {
        dispatch2(
          addCartt({
            status: pro.status,
            money: pro.money,
            itemId: pro.itemId,
            userId: pro.userId,
          })
        );
      }

      console.log("the length", json);
    }
  };
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    fetchSuggestions(inputValue);
  };
  const handleChoiceChange = async (event) => {
    setQuery(event);
    setdisplay("hidden");
    setdisplay2("hidden");
    setdisplay3("visible");
    setLocationName(event);
    const response2 = fetch(`${API_BASE_URL}/api/user/${_idRef.current}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event }),
    });

    let slat;
    let slon;
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          event
        )}&key=d8ef50e3e7d946cfa6c0e208e47dddb3`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        slat = lat;
        slon = lng;
        setLatitude(slat);
        setLongitude(slon);
        console.log("slat", slat);
        console.log("slon", slon);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const makeVisible = () => {
    setdisplay2("visible");
    setdisplay3("hidden");
    setdisplay("hidden");
  };

  const fetchSuggestions = async (inputValue) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&limit=5`;
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      setError("Error fetching suggestions.");
    }
  };

  // Handle search text change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchChangeH = (event) => {
    setSearchText("house");
  };
  const handleSearchChangeA = (event) => {
    setSearchText("");
  };
  const handleSearchChangeC = (event) => {
    setSearchText("car");
  };
  const handleSearchChangeE = (event) => {
    setSearchText("electronics");
  };
  const handleSearchChangeO = (event) => {
    setSearchText("other");
  };
  // Filter customers based on search criteria
  let filteredCustomers;
  if (Json) {
    filteredCustomers = Json.filter((customer) => {
      const {
        model,
        brand,
        location,
        type,
        category,
        price,
        description,
        title,
      } = customer;
      const searchRegex = new RegExp(searchText, "i");

      // Check if model, brand, location, and type are not undefined before accessing them
      const modelMatch = model && model.match(searchRegex);
      const brandMatch = brand && brand.match(searchRegex);
      const locationMatch = location && location.match(searchRegex);
      const typeMatch = type && type.match(searchRegex);
      const categoryMatch = category && category.match(searchRegex);
      const descriptionMatch = description && description.match(searchRegex);
      const titleMatch = title && title.match(searchRegex);
      //const priceMatch = price && price.match(searchRegex);

      // Additional logic to match broader category terms to specific terms
      const categoryToSpecificMap = {
        electronics: [
          "TV",
          "phone",
          "computer",
          "tablet",
          "pes" || "playstation" || "ps",
          "Refrigerators",
        ],
        car: ["Toyota", "Honda", "Ford", "BMW", "Audi", "Suzuki", "Jeep"],
        // Add more mappings as needed
      };
      const isMatchInSpecificCategories = Object.keys(
        categoryToSpecificMap
      ).some(
        (categoryKey) =>
          categoryKey.match(searchRegex) &&
          categoryToSpecificMap[categoryKey].some((specificTerm) =>
            specificTerm.match(searchRegex)
          )
      );
      // Additional logic to match "other" category
      let otherMatch = false;
      if (category && category.toLowerCase() === "other") {
        const itemDetails = [model, brand, location, type, price]
          .join(" ")
          .toLowerCase();
        otherMatch = itemDetails.match(searchRegex);
      }

      return (
        searchText === "" ||
        (modelMatch || "").length > 0 ||
        (brandMatch || "").length > 0 ||
        (locationMatch || "").length > 0 ||
        (typeMatch || "").length > 0 ||
        (categoryMatch || "").length > 0 ||
        (descriptionMatch || "").length > 0 ||
        (titleMatch || "").length > 0 ||
        isMatchInSpecificCategories ||
        otherMatch
      );
    });
  }
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratedUsers, setRatedUsers] = useState([]);
  const [seller, setSeller] = useState("");
  const [Carts, setCartDetail] = useState([]);
  const [cartLoading, setCartLoading] = useState("");
  const [Users, setUsers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartNumber, setCartNumber] = useState(0);
  const [cart, setCart] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [viewDeposit, setViewDeposit] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [viewChat2, setViewChat2] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [itemId, setItemId] = useState("");
  const [money, setMoney] = useState("");
  const [chatNumber, setChatNumber] = useState(0);
  const [handleProfile, setHandleProfile] = useState(false);
  const [viewDepositeType, setViewDepositeType] = useState(false);
  const [viewithDrawType, setViewithDrawType] = useState(false);
  const [viewithDrawType2, setViewithDrawType2] = useState(false);

  const openModal = async (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Start with the first image
    await fetchUserDetails(product.ratings, product.userId);
  };
  const openDeposite = () => {};
  const closeModal = () => {
    setSelectedProduct(null);
    setCartVisible(false);
    setViewDeposit(false);
    setViewChat(false);
    setViewChat2(false);
    setViewithDrawType(false);
    setViewithDrawType2(false);
    setdisplay8("hidden");
  };
  const addCart = async (id, category) => {
    if (user == undefined) {
      toastify();
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/Cart/CartCreate/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({ category }),
    });
    if (response.ok) {
      const json = await response.json();
      setCartNumber(json.length);
      console.log("the json is", json);
    }
    await getAllCarts();
  };
  //handle onQuantityChange

  //handle buy
  const HandleBuy = (id, Llimit, Ulimit, Iid) => {
    if (totalQuantity < Llimit || totalQuantity > Ulimit) {
      toastify2(Llimit, Ulimit);
      return;
    }

    setOwnerId(id);
    setItemId(Iid);
    setViewChat(true);
    setCartVisible(false);
  };
  //handle chat
  const HandleChat = () => {
    setViewChat2(true);
  };
  const StarRating = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const renderStar = (index) => {
      if (index < fullStars) {
        return (
          <span key={index} className="text-yellow-500 text-2xl">
            &#9733;
          </span>
        ); // Full star
      } else if (hasHalfStar && index === fullStars) {
        return (
          <span key={index} className="text-yellow-500 text-2xl">
            &#9733;&#189;
          </span>
        ); // Half star
      } else {
        return (
          <span key={index} className="text-gray-300 text-2xl">
            &#9733;
          </span>
        ); // Empty star
      }
    };

    return (
      <div>
        {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
      </div>
    );
  };
  const images = selectedProduct
    ? [
        selectedProduct.image,
        selectedProduct.image2,
        selectedProduct.image3,
        selectedProduct.image4,
        // Add more images as needed
      ].filter(Boolean) // Filter out undefined images
    : [];

  // Navigate to the next image
  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Navigate to the previous image
  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };
  //get All Cart
  const fetchCartDetails = async (carts) => {
    console.log("the view", carts);
    setCartVisible(true);
    const myCart = [];
    const response = await fetch(`${API_BASE_URL}/api/cart/filterCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carts),
    });
    if (response.ok) {
      const cart = await response.json();
      console.log("the cart is ", cart);
      setCartDetail(cart);
      setCartLoading(cart);
    } else {
      console.log("i cant");
    }

    console.log("the cart", myCart);
    const myUser = [];
    for (const user of carts) {
      const response = await fetch(
        `${API_BASE_URL}/api/user/GetOneUserById/${user.userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", authorization: token },
        }
      );
      if (response.ok) {
        const User = await response.json();
        myUser.push(User);
      }
    }
    setUsers(myUser);
  };

  const fetchUserDetails = async (userIds, userId) => {
    const users = [];
    const Seller = [];
    const usersComment = [];
    for (const userId of userIds) {
      const response = await fetch(
        `${API_BASE_URL}/api/user/GetOneUserById/${userId.userId}`
      );
      if (response.ok) {
        let user = await response.json();
        user = user[0];
        users.push({
          userName: user.firstname,
          comment: userId.comment,
          rating: userId.rating,
          image: user.image,
        });

        console.log("my user is ", user);
      }
    }
    setRatedUsers(users);
    //
    const response = await fetch(
      `${API_BASE_URL}/api/user/GetOneUserById/${userId}`
    );
    if (response.ok) {
      let user = await response.json();
      user = user[0];
      setSeller(user);
    }
  };
  const handlesignup = () => {
    red("/signup");
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const handleQuantityChange = (Q, P) => {
    setTotalPrice(P);
    setTotalQuantity(Q);
    console.log("quantity is", Q);
    console.log("price is", P);
  };
  const HandlePayment = async () => {
    const paymentData = {
      money: money,
      return_url: "https://mainkajufrontend.onrender.com",
    };
    const response = await fetch(
      `${API_BASE_URL}/api/payment/rechargeBalance`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(paymentData),
      }
    );
    if (response.ok) {
      const payment = await response.json();
      const checkouturl = payment.Detail.checkout_url;
      const money = payment.balance;
      dispatch2(
        updateTech({
          id: Id,
          firstname: Firstname,
          lastname: Lastname,
          gender: Gender,
          phonenumber: Phonenumber,
          deposit: money,
          email: Email,
          image: profile,
          location: location,
          _id: _idRef.current,
        })
      );
      checkouturl && window.location.replace(checkouturl);
    }
  };
  const HandleDeposite = () => {
    if (user == undefined) {
      toastify();
      return;
    }
    setViewDeposit(true);
  };
  console.log("the other id value is ", _id);
  useEffect(() => {
    socket.on("receive_message2", (msg) => {
      console.log("msg", msg);
      console.log("msg id is", _idRef.current);
      console.log("first Mane is", Firstname);
      if (msg.Receiver_id == _idRef.current) {
        setSenderId(msg.Sender_id);
        console.log("msg.Sender_id", msg.Sender_id);
        setChatNumber((prev) => prev + 1);
      }
    });
    return () => {
      socket.off("receive_message2");
    };
  }, [socket, _idRef]);
  const getNotify = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/Notify/getNotify/${_idRef.current}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    if (response.ok) {
      const payment = await response.json();
      setArray3(payment);
      setNotify(array3.length);
      console.log("The notification is ", payment);
    }
  };
  useEffect(() => {
    socket.on("MyNotify", (msg) => {
      console.log("msg", msg);
      console.log("the msg id is", _id);
      const { file, owner } = msg;
      if (owner === _idRef.current) {
        getNotify();
      }
    });
    return () => {
      socket.off("MyNotify");
    };
  }, [socket, _idRef]);
  useEffect(() => {
    socket.on("insertItems", (msg) => {
      console.log("i am in the table");
      Product();
    });
    return () => {
      socket.off("insertItems");
    };
  }, [socket]);
  const handleChoiceChange8 = () => {
    setdisplay8("visible");
    setdisplay12("visible");
  };
  const handleRedirect = () => {
    red("/signupa");
  };
  const goToHome = () => {
    red("/login");
  };
  const handleRedirectLog = () => {
    red("/logina");
  };
  const HandleDelete = async (itemId) => {
    const response = await fetch(
      `${API_BASE_URL}/api/cart/deleteCart/${itemId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const json = await response.json();
      dispatch2(removeCart(itemId));
    }
  };
  const handleReport = () => {
    setViewithDrawType2(true);
  };
  return (
    <div className={""} product={Product}>
      <div className=" flex  fixed bg-blue-900  top-0 left-0 w-full  z-10">
        <div className="flex ml-3  w-[500px] mt-3 ">
          <div className="text-white w-20 h-36">
            <ImLocation className=" text-[40px]    font-bold text-white " />
            <h3>ይህ የGPS </h3>
            <h3>ግምታዊ</h3>
            <h3>አድራሻዎት</h3>
            <h3 className="ml-4">ነው</h3>
          </div>
          <div className="w-40 mt-4  text-white text-[15px] ">{location}</div>
        </div>
        <div className="text-[15px]" onClick={handleRedirect}>
          signup
        </div>
        <div className="text-[15px]" onClick={handleRedirectLog}>
          signIn
        </div>
        <div className="ml-2 mb-11 mt-10 flex">
          <IoSearchSharp className="text-2xl  mt-3 text-white" />
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search"
            className="rounded-lg focus:outline-none px-2 w-36 h-11 ml-3"
          />
        </div>

        <div className="mt-10 ml-10  w-14 h-14  rounded-xl border-green-400 cursor-pointer">
          {/* "absolute text-[19px] ml-6 mt-3 text-red-600 flex" */}
          <div
            className={
              array3.length == 0
                ? "hidden"
                : "absolute text-[19px] ml-5 mt-1 text-red-600 flex"
            }
          >
            <FaCircle />
          </div>
          <div
            className="absolute text-white ml-6 mt-1  text-[14px] font-bold  "
            onClick={handleChoiceChange8}
          >
            {array3.length == 0 ? null : array3.length}
          </div>

          <div>
            {" "}
            <IoMdNotifications className={"ml-3 mt-3 text-white text-2xl "} />
          </div>
        </div>
        <div
          className={
            "bg-gray-100 w-96 h-[450px] absolute mt-24 ml-[576px] rounded-lg overflow-y-scroll  border-2 " +
            disp8
          }
        >
          <div className={"mt-5 ml-28 text-2xl " + disp12}>Notifications</div>
          <div className="ml-80">
            <button onClick={closeModal} className="mt-2  text-2xl">
              <IoIosClose className="text-4xl]" />
            </button>
          </div>
          {array3.map((d, index) => (
            <div
              className={
                "w-80 cursor-pointer ml-3  hover:bg-yellow-400 mt-8 rounded-lg " +
                disp12
              }
              key={index}
            >
              <div className="mt-3  ">
                <p>From{" " + d.buyerLocation}</p>
                <p>{d.buyerName + " "} wants to buy</p>
                <p>and has paid{" " + d.tPrice + " birr "} for it</p>
                {d.category} <img src={d.image} alt="" className="w-20 h-20" />
                <p className="">
                  {formatDistanceToNow(new Date(d.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-10 ml-14 cursor-pointer  text-white"
          onClick={() => setChoice(true)}
        >
          <div className="flex mt-2">
            <strong className="text-[20px] ">{Deposite}</strong>
            <p className="mt-1 ml-1">ETB</p>
          </div>
        </div>
        <div className="mt-12 ml-10 cursor-pointer" onClick={HandleDeposite}>
          <div className="w-20 h-10 border-2 bg-orange-500">
            <p className="ml-2 mt-1 text-white">Deposit</p>
          </div>
          <ToastContainer />
        </div>
        <div className="ml-14">
          {chatNumber != 0 ? (
            <div className="mt-14 absolute  ml-2 bg-yellow-400 w-5 h-5 rounded-full">
              <strong className="ml-1 mt-[-3px]" onClick={HandleChat}>
                {chatNumber}
              </strong>
            </div>
          ) : (
            ""
          )}

          <TiMessages className="text-[40px] text-white mt-12" />
        </div>

        <div className="mt-14 ml-10 cursor-pointer flex">
          {cartNumber != 0 ? (
            <div className="mt-1 absolute  ml-14 bg-yellow-400 w-5 h-5 rounded-full">
              <strong
                className="ml-1 mt-[-3px]"
                onClick={async () => await fetchCartDetails(myCarts)}
              >
                {cartNumber}
              </strong>
            </div>
          ) : (
            ""
          )}
          {user ? (
            <div className="ml-[9px]"></div>
          ) : (
            <div className=" text-4xl hover:text-black hover:bg-white text-white w-14 h-9 border-2 rounded-md  mt-[-5px]">
              <div className="mt-[-16px]">
                <button className="text-[15px] ml-1" onClick={goToHome}>
                  SignIn
                </button>
              </div>
            </div>
          )}
          {user ? (
            <GiSandsOfTime className="ml-6 text-white text-4xl mt-[-3px] mr-6" />
          ) : (
            ""
          )}
          <div className="ml-5 text-4xl text-white w-12 h-12 rounded-full border-2 mt-[-8px]">
            {user ? (
              <strong
                className="ml-[9px]"
                onClick={() => setHandleProfile(!handleProfile)}
              >
                {Firstname.charAt(0).toUpperCase()}
              </strong>
            ) : (
              <TiUserAdd className="ml-1 mt-1" onClick={handlesignup} />
            )}
          </div>
        </div>

        <div className="mt-6">
          {" "}
          <div className={"ml-[50px] text-white " + disp3}>
            <MdEditLocationAlt
              onClick={makeVisible}
              className=" text-[40px] text-white   hover:text-pink-600  font-bold cursor-pointer"
            />
            <h3>አድራሻዎትን </h3>
            <h3 className="ml-2">ያስተካክሉ</h3>
          </div>
        </div>

        <div className=" w-[100px]">
          <div className=" ">
            <div className={disp2}>
              <div className="flex mr-10">
                <input
                  type="text"
                  onChange={handleInputChange}
                  onFocus={() => setdisplay("visible")}
                  value={query}
                  placeholder="Location"
                  className="bg-transparent   h-[35px] w-[300px]  border-2 block focus:outline-none focus:border-black  rounded-2xl   px-4 placeholder-black "
                />
                <ImLocation className=" mt-2 absolute ml-[230px] text-green-500" />
              </div>
            </div>

            <ul id="mylist" className={disp}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleChoiceChange(suggestion.display_name)}
                  className=" "
                >
                  <div className="flex text-white">
                    <ImLocation className="text-2xl p-1 text-white " />
                    {suggestion.display_name}
                  </div>
                </li>
              ))}
            </ul>
            {/* {error && <p>Error: {error}</p>} */}
          </div>
        </div>
      </div>
      {handleProfile && (
        <div className="absolute bg-slate-50 text-4xl ml-[700px]  h-[430px] mt-[-14px] w-[500px]">
          <UserProfile user4={user.tk == undefined ? user3 : user} />
        </div>
      )}
      <div
        className=" w-screen h-24   bg-slate-200 mt-[-110px]   fixed "
        onClick={() => setChoice(false)}
      >
        <div className="flex  ml-80  mt-5">
          <div>
            <div
              className="ml-[78px]  mt-3 absolute cursor-pointer"
              onClick={handleSearchChangeH}
            >
              <FaHouseDamage className="text-[20px]  " />
            </div>
            <div className="absolute ml-[63px]  mt-12">Houses</div>
            <div className="w-12 h-12 rounded-full bg-purple-400 ml-16"></div>
          </div>
          <div>
            <div
              className="ml-[78px]  mt-3 absolute cursor-pointer"
              onClick={handleSearchChangeC}
            >
              <FaCar className="text-[20px]  " />
            </div>
            <div className="absolute ml-[72px]  mt-12">Cars</div>
            <div className="w-12 h-12 rounded-full bg-blue-300 ml-16"></div>
          </div>
          <div>
            <div
              className="ml-[78px]  mt-3 absolute cursor-pointer"
              onClick={handleSearchChangeE}
            >
              <FaComputer className="text-[20px]  " />
            </div>
            <div className="absolute ml-[56px]  mt-12">Electronics</div>
            <div className="w-12 h-12 rounded-full bg-orange-400 ml-16"></div>
          </div>

          <div>
            <div
              className="ml-[78px]  mt-3 absolute cursor-pointer"
              onClick={handleSearchChangeO}
            >
              <BsCart4 className="text-[20px]  " />
            </div>
            <div className="absolute ml-[65px]  mt-12">Others</div>
            <div className="w-12 h-12 rounded-full bg-cyan-400 ml-16"></div>
          </div>
          <div>
            <div
              className="ml-[78px]  mt-3 absolute"
              onClick={handleSearchChangeA}
            >
              <MdOutlineWork className="text-[20px]  " />
            </div>
            <div className="absolute ml-[80px]  mt-12">All</div>
            <div className="w-12 h-12 rounded-full bg-green-400 ml-16"></div>
          </div>
          <div className="ml-36 animate-pulse cursor-pointer">
            <div
              className="ml-[78px]  mt-3 absolute  flex"
              onClick={handleReport}
            >
              <MdWifiCalling3 className="text-[20px] text-white ml-16  " />
            </div>

            <div className="w-12 h-12 rounded-full bg-blue-500 ml-32"></div>
          </div>
        </div>
      </div>

      <div className="mt-64 flex flex-wrap  space-x-6 space-y-3  ">
        {filteredCustomers ? (
          filteredCustomers.length > 0 ? (
            filteredCustomers.map((item, index) => (
              <div
                key={index}
                className="border-4 border-cyan-700 ml-2"
                onClick={() => openModal(item)}
              >
                <img
                  src={item.image}
                  alt="Product image"
                  className="w-56 h-64 cursor-pointer hover:w-60 hover:h-72"
                />

                {item.category == "car" ? (
                  <div className="ml-16 mt-1">
                    <p className="flex">
                      <ImLocation className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {item.location}
                    </p>
                    <p className="flex">
                      <FaCar className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {" " + item.type}
                    </p>
                    <p>
                      {item.year + " "}
                      {item.brand + " "}
                      {item.model}
                    </p>
                    <p>
                      {item.price + " "}Birr-{"For" + " " + item.For}
                    </p>
                  </div>
                ) : item.category == "house" ? (
                  <div className="ml-16 mt-1">
                    <p className="flex">
                      <ImLocation className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {item.location}
                    </p>
                    <p className="flex">
                      <FaHouseDamage className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {" " + item.type}
                    </p>
                    <p>
                      {item.price + " "}Birr-{"For" + " " + item.For}
                    </p>
                  </div>
                ) : item.category == "electronics" ? (
                  <div className="ml-16 mt-1">
                    <p className="flex">
                      <ImLocation className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {item.location}
                    </p>
                    <p className="flex">
                      <FaComputer className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {" " + item.brand}
                    </p>
                    <div>
                      {item.price + " "}Birr
                      {item.title}
                    </div>
                  </div>
                ) : item.category == "other" ? (
                  <div className="ml-16 mt-1">
                    <p className="flex">
                      <ImLocation className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {item.location}
                    </p>
                    <p className="flex">
                      <GiMaterialsScience className=" text-[15px] mt-1   font-bold text-blue-900 " />
                      {" " + item.title}
                    </p>
                    <div>{item.price + " "}Birr</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          ) : (
            <p>No items to display</p>
          )
        ) : (
          <p className="ml-[600px] mt-40 font-bold text-2xl">Loading...</p>
        )}
        {selectedProduct && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 mt-40 flex h-[500px]">
              <button onClick={handlePrevImage}>
                <FcPrevious />
              </button>
              <img
                src={images[currentImageIndex]}
                alt="Product image"
                className="w-96 h-[450px]"
              />

              <button onClick={handleNextImage}>
                <FcNext />
              </button>
              <div>
                {" "}
                <div className="bg-blue-900 mt-[-10px] h-16 flex">
                  <div className="ml-3 mt-2">
                    <img
                      src={seller.image}
                      alt="Product image"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="ml-2 mt-2">
                    <strong className="text-white">{seller.firstname}</strong>
                  </div>
                  <div className="ml-96">
                    <button
                      onClick={closeModal}
                      className="mt-2 text-white text-2xl"
                    >
                      <IoIosClose className="text-4xl]" />
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h2 className="ml-5 mt-2  ">
                      <StarRating rating={selectedProduct.averageRating} />
                      <p className="text-[15px] ">
                        Trades:{" " + 1 + " "}Trades
                      </p>
                      <strong className="text-2xl flex  mt-2">
                        <p className="text-[15px] mt-2 mr-2">Br</p>

                        {selectedProduct.price}
                      </strong>{" "}
                    </h2>
                    <div className="flex ml-5">
                      <p className="text-slate-600 mr-3">Limit</p>
                      {selectedProduct.Llimit + " - " + selectedProduct.Ulimit}
                    </div>
                    <p className="text-slate-600 mr-3 mt-3 ml-5"></p>
                  </div>
                  <div className="ml-64 max-h-64 w-64 ">
                    <div className="mt-5 ml-[-20px] overflow-y-scroll overflow-x-scroll">
                      {selectedProduct.description}
                    </div>
                  </div>
                </div>
                <div className="w-80 ml-12 ">
                  <button
                    onClick={async () =>
                      await addCart(
                        selectedProduct._id,
                        selectedProduct.category
                      )
                    }
                    className="mt-4 bg-blue-500 text-white px-4 py-2 w-80 rounded-md"
                  >
                    Add To Buy
                  </button>

                  <div className="">
                    <ToastContainer />
                  </div>
                </div>
                <div>
                  <ul className="ml-5 max-h-40 overflow-y-scroll">
                    {ratedUsers.map((user, index) => (
                      <li key={index} className="">
                        <StarRating rating={user.rating} />

                        <div className="flex">
                          <img
                            src={user.image}
                            alt="userImage"
                            className="w-7 h-7 rounded-full"
                          />
                          <strong className="ml-3 text-[14px]">
                            {user.userName}
                          </strong>
                        </div>
                        <p className="text-[14px]">{user.comment}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="ml-5">
                    <StarRatingH
                      user={user3}
                      id={selectedProduct._id}
                      category={selectedProduct.category}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {viewithDrawType2 && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="ml-[180px] mt-[-260px]">
              <button onClick={closeModal} className="mt-2 ml-10  ">
                <IoIosClose className="text-4xl" />
              </button>
            </div>

            <div className=" ml-[-900px]">
              <ChatTechAd
                user={user ? (user.tk == undefined ? user3 : user) : ""}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {viewDeposit && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-600 p-4 mt-40  h-[500px] w-[950px]">
              <div className="ml-[880px]">
                <button
                  onClick={closeModal}
                  className="mt-2 text-white text-2xl"
                >
                  <IoIosClose className="text-4xl]" />
                </button>
              </div>
              <div className="ml-32">
                <div className="border-b-4 border-b-green-500 text-white h-14 w-[650px]">
                  <strong className="">DEPOSIT METHODS</strong>
                </div>
              </div>
              <div className="ml-32">
                <div className="border-b-2 border-b-green-500 text-white h-10 mt-5 flex space-x-1 w-[650px]">
                  <div
                    className="border-2 border-slate-600 bg-slate-500 w-64 cursor-pointer"
                    onClick={() => setViewDepositeType(!viewDepositeType)}
                  >
                    <strong className="">DEPOSIT</strong>
                  </div>
                  <div
                    className="border-2 w-64 border-slate-600 bg-slate-500 cursor-pointer"
                    onClick={() => setViewithDrawType(!viewithDrawType)}
                  >
                    <strong className="">WITHDRAW</strong>
                  </div>
                  <div className="border-2 w-64 border-slate-600 bg-slate-500 cursor-pointer">
                    <strong className="">HISTORY</strong>
                  </div>
                </div>
                <div className="flex">
                  {viewDepositeType && (
                    <div className="">
                      <form>
                        <input
                          placeholder="Amount"
                          className="mt-2 px-2"
                          type="number"
                          value={money}
                          onChange={(e) => setMoney(e.target.value)}
                        />
                      </form>
                      <button
                        className="border-2 bg-orange-500 rounded-lg text-white w-16 mt-3"
                        onClick={HandlePayment}
                      >
                        Pay
                      </button>
                    </div>
                  )}
                  {viewithDrawType && (
                    <div className="border-r-indigo-200 w-[900px] h-80 ml-[-120px] relative overflow-hidden overflow-y-auto">
                      <div className="ml-[1100px] text-white  mt-20  ">
                        <button
                          onClick={closeModal}
                          className="mt-2 text-white "
                        >
                          <IoIosClose className="text-4xl" />
                        </button>
                      </div>
                      <div className="hidden">
                        <ChatTechAd
                          user={user.tk == undefined ? user3 : user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="">
                        <WithdrawalForm
                          user={user3}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {viewChat && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50  items-center justify-center ">
            <div className=" w-[1200px] h-full   p-4 mt-10    overflow-y-scroll overflow-x-hidden">
              <div className="ml-[1100px] text-white  mt-20  ">
                <button onClick={closeModal} className="mt-2 text-white ">
                  <IoIosClose className="text-4xl" />
                </button>
              </div>
              <div className="mt-[-90px]">
                <ChatTech
                  user={user.tk == undefined ? user3 : user}
                  owner={ownerId}
                  itemId={itemId}
                  className=""
                  tPrice={totalPrice}
                />
              </div>
            </div>
          </div>
        )}
        {viewChat2 && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full h-full  ml-[-200px] p-4 mt-40    overflow-y-scroll ">
              <div className="ml-[1120px]   mt-20  ">
                <button onClick={closeModal} className="mt-2  ">
                  <IoIosClose className="text-4xl" />
                </button>
              </div>
              <div className="mt-[-90px]">
                <ChatTech
                  user={user.tk == undefined ? user3 : user}
                  owner={senderId}
                  tPrice={totalPrice}
                  itemId={itemId}
                />
              </div>
            </div>
          </div>
        )}
        {cartVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 mt-40  h-[500px] w-[550px]  overflow-y-scroll overflow-x-hidden">
              <div className="ml-[470px] ">
                <button onClick={closeModal} className="mt-2 text-blue-500">
                  <IoIosClose className="text-4xl]" />
                </button>
              </div>
              <strong className="mb-5">Your Active Engagements</strong>
              {cartLoading ? (
                myCarts.length > 0 ? (
                  Carts.map((items, index) => (
                    <div key={index} className="w-[600px] flex">
                      <div>
                        <div className="flex">
                          <img
                            src={items.image}
                            alt="Product image"
                            className="w-36 h-[150px] mt-5"
                          />
                          {items.category == "car" ? (
                            <div className="ml-1 mt-5 flex  w-[365px]">
                              <div className=" ">
                                <p className="flex ml-6">
                                  <FaCar className=" text-[15px] mt-1   font-bold text-blue-900 " />
                                  {" " + items.type}
                                </p>
                                <p className="ml-6">
                                  {items.brand + " "}
                                  {items.model}
                                </p>
                                <div className="">
                                  <Counter
                                    productId={items._id}
                                    price={items.price}
                                    onQuantityChange={handleQuantityChange}
                                  />
                                </div>
                              </div>

                              <div className="mt-8 flex space-x-5  text-white px-4 py-2 w-16 h-12 ml-10   rounded-md">
                                <button
                                  onClick={() =>
                                    HandleBuy(
                                      items.userId,
                                      items.Llimit,
                                      items.Ulimit,
                                      items._id
                                    )
                                  }
                                  className="bg-blue-500 hover:bg-blue-400"
                                >
                                  Buy
                                </button>
                                <button
                                  onClick={() => HandleDelete(items._id)}
                                  className="bg-red-500 hover:bg-red-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : items.category == "house" ? (
                            <div className="ml-1 flex mt-5  w-[365px]">
                              <div className="">
                                <p className="flex ml-6">
                                  <FaHouseDamage className=" text-[15px] mt-1   font-bold text-blue-900 " />
                                  {" " + items.type}
                                </p>

                                <div className="">
                                  <Counter
                                    productId={items._id}
                                    price={items.price}
                                    onQuantityChange={handleQuantityChange}
                                  />
                                </div>
                              </div>
                              <div className="mt-8 flex space-x-5  text-white px-4 py-2 w-16 h-12 ml-10   rounded-md">
                                <button
                                  onClick={() =>
                                    HandleBuy(
                                      items.userId,
                                      items.Llimit,
                                      items.Ulimit,
                                      items._id
                                    )
                                  }
                                  className="bg-blue-500 hover:bg-blue-400"
                                >
                                  Buy
                                </button>
                                <button
                                  onClick={() => HandleDelete(items._id)}
                                  className="bg-red-500 hover:bg-red-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : items.category == "electronics" ? (
                            <div className="ml-1 flex mt-5  w-[365px]">
                              <div className="">
                                <p className="flex ml-6">
                                  <FaComputer className=" text-[15px] mt-1   font-bold text-blue-900 " />
                                  {" " + items.brand}
                                </p>

                                <div className="">
                                  <Counter
                                    productId={items._id}
                                    price={items.price}
                                    onQuantityChange={handleQuantityChange}
                                  />
                                </div>
                              </div>
                              <div className="mt-8 flex space-x-5  text-white px-4 py-2 w-16 h-12 ml-10   rounded-md">
                                <button
                                  onClick={() =>
                                    HandleBuy(
                                      items.userId,
                                      items.Llimit,
                                      items.Ulimit,
                                      items._id
                                    )
                                  }
                                  className="bg-blue-500 hover:bg-blue-400"
                                >
                                  Buy
                                </button>
                                <button
                                  onClick={() => HandleDelete(items._id)}
                                  className="bg-red-500 hover:bg-red-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : items.category == "other" ? (
                            <div className="ml-1 flex mt-5  w-[365px]">
                              <div className="">
                                <p className="flex ml-6">
                                  <GiMaterialsScience className=" text-[15px] mt-1   font-bold text-blue-900 " />
                                  {" " + items.title}
                                </p>

                                <div className="">
                                  <Counter
                                    productId={items._id}
                                    price={items.price}
                                    onQuantityChange={handleQuantityChange}
                                  />
                                </div>
                              </div>
                              <div className="mt-8 flex space-x-5  text-white px-4 py-2 w-16 h-12 ml-10   rounded-md">
                                <button
                                  onClick={() =>
                                    HandleBuy(
                                      items.userId,
                                      items.Llimit,
                                      items.Ulimit,
                                      items._id
                                    )
                                  }
                                  className="bg-blue-500 hover:bg-blue-400"
                                >
                                  Buy
                                </button>
                                <button
                                  onClick={() => HandleDelete(items._id)}
                                  className="bg-red-500 hover:bg-red-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items to display</p>
                )
              ) : (
                <p>Loading</p>
              )}
              <div className="mt-20">
                <div className="flex justify-between">
                  <p className="text-2xl">Total Price</p>
                  <h3>
                    <h3>Total Price: ${totalPrice}</h3>
                  </h3>
                </div>
                <div>
                  {" "}
                  <div className="w-80 ml-12 ">
                    <div className="">
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
