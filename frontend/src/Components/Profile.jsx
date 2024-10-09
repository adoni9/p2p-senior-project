import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaTransgenderAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import PictureUploader from "./muke";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logOut } from "../features/tech/techSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { IoIosClose } from "react-icons/io";
import { removeProduct, setProduct } from "../features/product/productSlice";
const UserProfile = ({ user4 }) => {
  console.log("the profile is ", user4);
  const dispatch2 = useDispatch();
  let token = user4 ? "Bearer " + user4.tk : "";
  console.log("the token ", token);
  if (token == "Bearer " + undefined) {
    token = user4 ? "Bearer " + user4.token : "";
  }
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [Next1, setNext1] = useState(false);
  const [Next2, setNext2] = useState(false);
  const [createAD, setCreateAD] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [switchCategory, setSwitchCategory] = useState("");
  const [saleOrRent, setSaleOrRent] = useState("");
  const [autoOrManual, setAutoOrManual] = useState("");
  const [fuelT, setFuelT] = useState("");
  const [license, setLicense] = useState("");
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [propertyType2, setPropertyType2] = useState("audi");
  const [propertyType3, setPropertyType3] = useState("tv");
  const [price, setPrice] = useState("");
  const [Llimit, setLlimit] = useState("");
  const [Ulimit, setUlimit] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [carType, setCarType] = useState("");
  const [area, setArea] = useState("");
  const [bedRoom, setBedrooms] = useState("");
  const [bathRoom, setBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const handleMouseEnter = () => {
    // Show choices when hovering over "My Advertisement"
    // You can implement this behavior using CSS or a state variable
  };
  const fetchAdvert = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/GetAllItems/GetAllItemsUser`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", authorization: token },
      }
    );
    if (response.ok) {
      const json = await response.json();
      setSelectedProduct(true);
      console.log("the json is", json);
      dispatch2(setProduct(json));
      setItems(json);
    }
  };
  const todo = useSelector((state) => state.product.product);
  const handleMouseLeave = () => {
    // Hide choices when cursor leaves "My Advertisement"
    // You can implement this behavior using CSS or a state variable
  };
  const closeModal = () => {
    setSelectedProduct(false);
    setCreateAD(false);
    setNext1(false);
    setSelectedCategory(false);
  };
  const createAdvert = () => {
    setCreateAD(true);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const next1 = () => {
    setSelectedProduct(false);
    // setCreateAD(false);
    setNext1(true);
    switch (selectedCategory) {
      case "electronics":
        return setSwitchCategory("electronics");
      case "other":
        return setSwitchCategory("other");
      case "car":
        return setSwitchCategory("car");
      case "house":
        return setSwitchCategory("house");
    }
  };
  const next2 = () => {
    console.log("in ghe");
    setSelectedProduct(false);
    setCreateAD(false);
    setNext1(false);
    setSelectedCategory(false);
    setNext2(true);
  };
  const handleSaleOrRentChange = (e) => {
    setSaleOrRent(e.target.value);
  };
  const handleAutoOrManualChange = (e) => {
    setAutoOrManual(e.target.value);
  };
  const handleFuel = (e) => {
    setFuelT(e.target.value);
  };
  const red = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    dispatch2(logOut([]));
    red("/login");
  };
  const handleLicense = (e) => {
    setLicense(e.target.value);
  };
  const handleCarType = (e) => {
    setCarType(e.target.value);
  };
  //handle delete
  const handleDelete = async (id, category) => {
    const response = await fetch(
      `${API_BASE_URL}/api/GetAllItems/deleteItem/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ category: category }),
      }
    );
    if (response.ok) {
      const _id = id;
      dispatch2(removeProduct(_id));
      socket.emit("insertItems", "ok");
      console.log("arabsa");
    }
  };
  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    setPropertyType2(e.target.value);
    setPropertyType3(e.target.value);
  };
  const data = {
    area: area,
    price: price,
    category: switchCategory,
    For: saleOrRent,
    type: propertyType,
    bedRoom: bedRoom,
    bathRoom: bathRoom,
    description: description,
    Llimit: Llimit,
    Ulimit: Ulimit,
  };
  const data2 = {
    price: price,
    category: switchCategory,
    For: saleOrRent,
    type: carType,
    brand: propertyType2,
    transmission: autoOrManual,
    description: description,
    fuel: fuelT,
    licence: license,
    year: year,
    model: model,
    Llimit: Llimit,
    Ulimit: Ulimit,
  };
  const data3 = {
    price: price,
    category: switchCategory,
    brand: propertyType3,
    description: description,
    title: title,
    Llimit: Llimit,
    Ulimit: Ulimit,
  };
  const data4 = {
    price: price,
    category: switchCategory,
    description: description,
    title: title,
    Llimit: Llimit,
    Ulimit: Ulimit,
  };

  return (
    <div className="profile-container border-2 h-[430px] w-[500px] bg-slate-100">
      {selectedProduct &&
        (todo.length > 0 ? (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <strong className="ml-44 text-2xl">Your Ads</strong>
            {todo.map((r) => (
              <div className="flex ml-5">
                <img src={r.image} className="h-24 w-24 " />
                <div>
                  <div className="flex space-x-16 ">
                    <p className="text-4xl ml-5">{r.category}</p>
                    <button
                      className="text-[15px] text-white bg-red-500 w-16 rounded-md"
                      onClick={() => handleDelete(r._id, r.category)}
                    >
                      Delete
                    </button>
                  </div>

                  <p className="ml-3 mt-1 text-[12px]">
                    {formatDistanceToNow(new Date(r.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <p className="ml-24 mt-16">No items to display</p>
          </div>
        ))}
      {createAD && (
        <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
          <div className="ml-[450px]  ">
            <button onClick={closeModal} className="mt-2  text-3xl">
              <IoIosClose className="text-4xl]" />
            </button>
          </div>
          <strong className="ml-44 text-2xl">Pick Ad Type</strong>
          <div className="text-[15px] ml-40">
            <div>
              <label>
                <input
                  type="radio"
                  value="house"
                  checked={selectedCategory === "house"}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                House for Sale/Rent
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="car"
                  checked={selectedCategory === "car"}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                Car
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="other"
                  checked={selectedCategory === "other"}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                Other Item
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="electronics"
                  checked={selectedCategory === "electronics"}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                Electronics
              </label>
            </div>
            <button
              className=" bg-yellow-400  hover:bg-yellow-300 text-2xl border-2 rounded-lg w-24 font-semibold ml-10 "
              onClick={next1}
            >
              Next
            </button>
            <div>Selected category: {selectedCategory}</div>
          </div>
        </div>
      )}
      {Next2 && (
        <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
          <PictureUploader
            user4={user4}
            data={data}
            data2={data2}
            data3={data3}
            data4={data4}
          />
        </div>
      )}
      {Next1 &&
        (switchCategory == "house" ? (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <div className="text-[15px] ml-32 space-y-1">
              <strong className="ml-20">House Ad</strong>
              <div className="flex flex-col">
                <label className="">
                  <input
                    type="radio"
                    value="sale"
                    checked={saleOrRent === "sale"}
                    onChange={handleSaleOrRentChange}
                  />
                  For Sale
                </label>
                <label>
                  <input
                    type="radio"
                    value="rent"
                    checked={saleOrRent === "rent"}
                    onChange={handleSaleOrRentChange}
                  />
                  For Rent
                </label>
              </div>
              <div>
                <label>
                  <select
                    value={propertyType}
                    onChange={handlePropertyTypeChange}
                  >
                    <option value="apartment">Apartment</option>
                    <option value="condominium">Condominium</option>
                    <option value="house">House (G+)</option>
                    <option value="office-shop">Office-Shop</option>
                    <option value="building">Building</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="land">Land</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (Birr)"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={Llimit}
                    onChange={(e) => setLlimit(e.target.value)}
                    placeholder="minimum Quantity"
                  />
                </label>
                <label>
                  <input
                    type="number"
                    value={Ulimit}
                    onChange={(e) => setUlimit(e.target.value)}
                    placeholder="maximum Quantity"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Are(SqKm)"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={bedRoom}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="Number of Bedrooms"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={bathRoom}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="Number of Bathrooms"
                  />
                </label>
              </div>
              <div className="flex">
                <label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="placeholder:font-bold"
                  />
                </label>
                <button
                  className=" bg-yellow-400  hover:bg-yellow-300 h-10 text-2xl border-2 rounded-lg w-24 font-semibold ml-10 "
                  onClick={next2}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : switchCategory == "car" ? (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <div className="text-[15px] ml-32 space-y-1">
              <strong className="ml-20">Car Ad</strong>
              <div className="flex flex-col">
                <p>Car Or Bajaj</p>
                <label className="">
                  <input
                    type="radio"
                    value="car"
                    checked={carType === "car"}
                    onChange={handleCarType}
                  />
                  Car
                </label>
                <label>
                  <input
                    type="radio"
                    value="bajaj"
                    checked={carType === "bajaj"}
                    onChange={handleCarType}
                  />
                  Bajaj
                </label>
              </div>
              <div className="flex flex-col">
                <p>For Sale or For Rent</p>
                <label className="">
                  <input
                    type="radio"
                    value="sale"
                    checked={saleOrRent === "sale"}
                    onChange={handleSaleOrRentChange}
                  />
                  For Sale
                </label>
                <label>
                  <input
                    type="radio"
                    value="rent"
                    checked={saleOrRent === "rent"}
                    onChange={handleSaleOrRentChange}
                  />
                  For Rent
                </label>
              </div>
              <p>Transmission</p>
              <div className="flex flex-col">
                <label className="">
                  <input
                    type="radio"
                    value="automatic"
                    checked={autoOrManual === "automatic"}
                    onChange={handleAutoOrManualChange}
                  />
                  Automatic
                </label>
                <label>
                  <input
                    type="radio"
                    value="manual"
                    checked={autoOrManual === "manual"}
                    onChange={handleAutoOrManualChange}
                  />
                  Manual
                </label>
              </div>
              <p>Fuel Type</p>
              <div className="flex flex-col">
                <label className="">
                  <input
                    type="radio"
                    value="benzene"
                    checked={fuelT === "benzene"}
                    onChange={handleFuel}
                  />
                  Benzene
                </label>
                <label>
                  <input
                    type="radio"
                    value="diesel"
                    checked={fuelT === "diesel"}
                    onChange={handleFuel}
                  />
                  Diesel
                </label>
                <label>
                  <input
                    type="radio"
                    value="electric"
                    checked={fuelT === "electric"}
                    onChange={handleFuel}
                  />
                  Electric
                </label>
              </div>
              <div className="flex flex-col">
                <p>Does the car have a license plate</p>
                <label className="">
                  <input
                    type="radio"
                    value="yes"
                    checked={license === "yes"}
                    onChange={handleLicense}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={saleOrRent === "no"}
                    onChange={handleLicense}
                  />
                  No
                </label>
              </div>
              {carType == "car" ? (
                <div>
                  <label>
                    <select
                      value={propertyType2}
                      onChange={handlePropertyTypeChange}
                    >
                      <option value="audi">Audi</option>
                      <option value="bmw">BMW</option>
                      <option value="jeep">Jeep</option>
                      <option value="ford">Ford</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="suzuki">Suzuki</option>
                      <option value="toyota">Toyota</option>
                    </select>
                  </label>
                </div>
              ) : (
                ""
              )}
              <div>
                <label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (Birr)"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={Llimit}
                    onChange={(e) => setLlimit(e.target.value)}
                    placeholder="minimum Quantity"
                  />
                </label>
                <label>
                  <input
                    type="number"
                    value={Ulimit}
                    onChange={(e) => setUlimit(e.target.value)}
                    placeholder="maximum Quantity"
                  />
                </label>
              </div>

              <div>
                <label>
                  <input
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year of make"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                  />
                </label>
              </div>

              <div className="flex">
                <label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="placeholder:font-bold"
                  />
                </label>
                <button
                  className=" bg-yellow-400  hover:bg-yellow-300 h-10 text-2xl border-2 rounded-lg w-24 font-semibold ml-10 "
                  onClick={next2}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : switchCategory == "electronics" ? (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <div className="text-[15px] ml-32 space-y-1">
              <strong className="ml-20">Electronics Ad</strong>

              <div>
                <label>
                  <select
                    value={propertyType3}
                    onChange={handlePropertyTypeChange}
                  >
                    <option value="tv">Tv</option>
                    <option value="pes">PlayStation</option>
                    <option value="cell">CellPhone</option>
                    <option value="speaker">Speaker</option>
                    <option value="building">Tablet</option>
                    <option value="computer">Computer</option>
                    <option value="refrigerators">Refrigerators</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (Birr)"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="number"
                    value={Llimit}
                    onChange={(e) => setLlimit(e.target.value)}
                    placeholder="minimum Quantity"
                  />
                </label>
                <label>
                  <input
                    type="number"
                    value={Ulimit}
                    onChange={(e) => setUlimit(e.target.value)}
                    placeholder="maximum Quantity"
                  />
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                  />
                </label>
              </div>

              <div className="flex">
                <label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="placeholder:font-bold"
                  />
                </label>
                <button
                  className=" bg-yellow-400  hover:bg-yellow-300 h-10 text-2xl border-2 rounded-lg w-24 font-semibold ml-10 "
                  onClick={next2}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : switchCategory == "other" ? (
          <div className="absolute space-y-3  bg-slate-100   h-[430px]  w-[500px]  overflow-y-scroll overflow-x-hidden">
            <div className="ml-[450px]  ">
              <button onClick={closeModal} className="mt-2  text-3xl">
                <IoIosClose className="text-4xl]" />
              </button>
            </div>
            <div className="text-[15px] ml-32 space-y-1">
              <strong className="ml-20">Other Ad</strong>
              <div>
                <label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price (Birr)"
                  />
                </label>
                <div>
                  <label>
                    <input
                      type="number"
                      value={Llimit}
                      onChange={(e) => setLlimit(e.target.value)}
                      placeholder="minimum Quantity"
                    />
                  </label>
                  <label>
                    <input
                      type="number"
                      value={Ulimit}
                      onChange={(e) => setUlimit(e.target.value)}
                      placeholder="maximum Quantity"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                  />
                </label>
              </div>

              <div className="flex">
                <label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="placeholder:font-bold"
                  />
                </label>
                <button
                  className=" bg-yellow-400  hover:bg-yellow-300 h-10 text-2xl border-2 rounded-lg w-24 font-semibold ml-10 "
                  onClick={next2}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        ))}
      {user4 && (
        <div>
          <div className="justify-center items-center ml-52 mt-3 flex">
            <img src={user4.image} className="w-20 h-20 rounded-full" />
            <div
              className="bg-red-500 hover:bg-red-400 ml-12 text-[12px] border-2 font-bold text-white"
              onClick={handleSignOut}
            >
              <button>SignOut</button>
            </div>
          </div>
          <div className="text-[15px] ml-10">
            <h2 className="ml-[161px] mb-6">Update Profile</h2>
            <div className="flex">
              <FaUserCircle />
              <p className="mt-[-12px] ml-3">FirstName: {user4.firstname}</p>
            </div>
            <div className="flex">
              <FaUserCircle />
              <p className="mt-[-12px] ml-3">LastName: {user4.lastname}</p>
            </div>
            <div className="flex">
              <FaTransgenderAlt />
              <p className="mt-[-12px] ml-3">Gender: {user4.gender}</p>
            </div>
            <div className="flex">
              <BsFillTelephoneFill />
              <p className="mt-[-12px] ml-3">
                PhoneNumber: {user4.phonenumber}
              </p>
            </div>
            <div className="flex">
              <MdEmail />
              <p className="mt-[-12px] ml-3">Email: {user4.email}</p>
            </div>
          </div>
        </div>
      )}

      <div
        className="advertisement flex ml-5 mt-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <RiAdvertisementLine />
        <button
          className="text-2xl hover:bg-yellow-300 bg-yellow-400 border-2 rounded-lg w-60 "
          onClick={fetchAdvert}
        >
          My Advertisement
        </button>
      </div>
      <div className="choices flex ml-5 mt-4">
        <IoIosAddCircleOutline />
        <button
          className=" bg-yellow-400  hover:bg-yellow-300 text-2xl border-2 rounded-lg w-60 "
          onClick={createAdvert}
        >
          Create Ad
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
