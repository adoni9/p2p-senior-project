const Car = require("../Model/Car");
const House = require("../Model/House");
const Electronics = require("../Model/Electronics");
const Other = require("../Model/Other");
const Cart = require("../Model/Cart");
const axios = require("axios");
//GetAllItems

const GetAllItems = async (req, res) => {
  const { location } = req.body;
  const userLocation = location;

  let notytimeout;
  let slat;
  let slon;

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        userLocation
      )}&key=9ddcd8b5269349368ef7069e700d9e77`
    );
    //console.log("Abebe", response.json);
    const data = await response.json();
    if (!response.ok) {
      console.log("the error response is", data);
      return res.status(200).json({ message: "No Internet Connection" });
    }

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      slat = lat;
      slon = lng;
      console.log("slat", slat);
      console.log("slon", slon);
    } else {
      console.log("No results found");
    }
  } catch (error) {
    return res.status(400).json({ message: "No Internet Connection" });
  }

  async function getCityFromCoordinates(lat, lon) {
    const apiKey = "9ddcd8b5269349368ef7069e700d9e77";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const components = results[0].components;

        // Check for city-level information
        if (components.city) {
          return components.city;
        }

        // Check for administrative levels that may represent the city
        if (
          components.state &&
          components.state.toLowerCase() === "addis ababa"
        ) {
          return "Addis Ababa";
        }
        if (
          components.region &&
          components.region.toLowerCase() === "addis ababa"
        ) {
          return "Addis Ababa";
        }

        // Check other possible fields
        if (components.town) {
          return components.town;
        }
        if (components.village) {
          return components.village;
        }
        if (components.county) {
          return components.county;
        }
        if (components.state_district) {
          return components.state_district;
        }
        if (components.state) {
          return components.state;
        }
        if (components.region) {
          return components.region;
        }
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Example usage:
  const latitude = slat;
  const longitude = slon;

  getCityFromCoordinates(latitude, longitude).then(async (city) => {
    console.log(city); // Outputs "Addis Ababa" for Kolfe Keranio, Addis Ababa
    if (city == "North Wollo Zone") {
      const Houses = await House.find({ location: "Addis Ababa" });
      const Electronicss = await Electronics.find({ location: "Addis Ababa" });
      const Cars = await Car.find({ location: "Addis Ababa" });
      const Others = await Other.find({ location: "Addis Ababa" });
      // Combine the arrays
      const combinedArray = [...Houses, ...Cars, ...Electronicss, ...Others];

      // Sort the combined array from latest to earliest
      combinedArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Send the sorted array as a JSON response
      return res.status(200).json(combinedArray);
    }
    if (city == "Arerti") {
      const Houses = await House.find({ location: "Addis Ababa" });
      const Cars = await Car.find({ location: "Addis Ababa" });
      const Electronicss = await Electronics.find({ location: "Addis Ababa" });
      const Others = await Other.find({ location: "Addis Ababa" });
      // Combine the arrays
      const combinedArray = [...Houses, ...Cars, ...Electronicss, ...Others];

      // Sort the combined array from latest to earliest
      combinedArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Send the sorted array as a JSON response
      return res.status(200).json(combinedArray);
    }
    const Houses = await House.find({ location: city });
    const Cars = await Car.find({ location: city });
    const Electronicss = await Electronics.find({ location: city });
    const Others = await Other.find({ location: city });
    // Combine the arrays
    const combinedArray = [...Houses, ...Cars, ...Electronicss, ...Others];

    // Sort the combined array from latest to earliest
    combinedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Send the sorted array as a JSON response
    res.status(200).json(combinedArray);
  });
};
const GetAllItemsUser = async (req, res) => {
  const userId = req.User._id;
  const advert = await Car.find({ userId: userId });
  const advert2 = await House.find({ userId: userId });
  const advert3 = await Electronics.find({ userId: userId });
  const advert4 = await Other.find({ userId: userId });
  // Combine the arrays
  const combinedArray = [...advert, ...advert2, ...advert3, ...advert4];

  // Sort the combined array from latest to earliest
  combinedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Send the sorted array as a JSON response
  res.status(200).json(combinedArray);
};
// handle delete
const deleteItem = async (req, res) => {
  const { category } = req.body;
  const { id } = req.params;
  let Carts;
  if (category == "car") {
    Carts = await Car.findOneAndDelete({ _id: id });
    const myC = await Cart.findOne({ itemId: id });
    if (myC) await Cart.findOneAndDelete({ _id: myC._id });
  }
  if (category == "house") {
    Carts = await House.findOneAndDelete({ _id: id });
    const myC = await Cart.findOne({ itemId: id });
    if (myC) await Cart.findOneAndDelete({ _id: myC._id });
  }
  if (category == "electronics") {
    Carts = await Electronics.findOneAndDelete({ _id: id });
    const myC = await Cart.findOne({ itemId: id });
    if (myC) await Cart.findOneAndDelete({ _id: myC._id });
  }
  if (category == "other") {
    Carts = await Other.findOneAndDelete({ _id: id });
    const myC = await Cart.findOne({ itemId: id });
    if (myC) await Cart.findOneAndDelete({ _id: myC._id });
  }
  res.status(200).json(Carts);
};
module.exports = {
  GetAllItems,
  GetAllItemsUser,
  deleteItem,
};
