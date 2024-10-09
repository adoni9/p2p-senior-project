import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { updateTech, setTech } from "../features/tech/techSlice";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
const socket = io("https://mainkaju.onrender.com");
const PictureUploader = ({ user4, data, data2, data3, data4 }) => {
  const dispatch2 = useDispatch();
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); // Store the actual file objects
  let token = user4 ? "Bearer " + user4.tk : "";
  console.log("the token ", token);
  if (token == "Bearer " + undefined) {
    token = user4 ? "Bearer " + user4.token : "";
  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 8) {
      alert("You can only upload a maximum of 8 images.");
      return;
    }

    // Save both the preview URL and actual file object
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Also remove the file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("the data", data);
    const formData = new FormData();
    if (data.category == "house") {
      formData.append("Llimit", data.Llimit);
      formData.append("Ulimit", data.Ulimit);
      formData.append("type", data.type);
      formData.append("For", data.For);
      formData.append("price", data.price);
      formData.append("area", data.area);
      formData.append("bedRoom", data.bedRoom);
      formData.append("bathRoom", data.bathRoom);
      formData.append("category", data.category);
      formData.append("description", data.description);
    }
    if (data.category == "car") {
      console.log("in the car");
      formData.append("Llimit", data2.Llimit);
      formData.append("Ulimit", data2.Ulimit);
      formData.append("type", data2.type);
      formData.append("For", data2.For);
      formData.append("price", data2.price);
      formData.append("transmission", data2.transmission);
      formData.append("brand", data2.brand);
      formData.append("fuel", data2.fuel);
      formData.append("category", data2.category);
      formData.append("description", data2.description);
      formData.append("licence", data2.licence);
      formData.append("year", data2.year);
      formData.append("model", data2.model);
    }
    if (data.category == "electronics") {
      console.log("in the electronics");
      formData.append("brand", data3.brand);
      formData.append("price", data3.price);
      formData.append("Llimit", data3.Llimit);
      formData.append("Ulimit", data3.Ulimit);
      formData.append("title", data3.title);
      formData.append("category", data3.category);
      formData.append("description", data3.description);
    }
    if (data.category == "other") {
      console.log("in the electronics");
      formData.append("price", data4.price);
      formData.append("Llimit", data4.Llimit);
      formData.append("Ulimit", data4.Ulimit);
      formData.append("title", data4.title);
      formData.append("category", data4.category);
      formData.append("description", data4.description);
    }

    imageFiles.forEach((file) => {
      formData.append("testImages", file); // Append each file under the key 'images'
    });

    try {
      if (data.category == "house") {
        const response = await fetch(`${API_BASE_URL}/api/house/houseCreate`, {
          headers: { authorization: token },
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          socket.emit("insertItems", "ok");
          alert("Images uploaded successfully");
          const json = await response.json();
          console.log("the house", json);
        } else {
          alert("Failed to upload images");
        }
      }
      if (data.category == "car") {
        const response = await fetch(`${API_BASE_URL}/api/car/carCreate`, {
          headers: { authorization: token },
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          socket.emit("insertItems", "ok");
          alert("Images uploaded successfully");
          const json = await response.json();
          console.log("the house", json);
        } else {
          alert("Failed to upload images");
        }
      }
      if (data.category == "electronics") {
        const response = await fetch(
          `${API_BASE_URL}/api/electronics/electronicsCreate`,
          {
            headers: { authorization: token },
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          socket.emit("insertItems", "ok");
          alert("Images uploaded successfully");
          const json = await response.json();
          console.log("the house", json);
        } else {
          alert("Failed to upload images");
        }
      }
      if (data.category == "other") {
        const response = await fetch(`${API_BASE_URL}/api/other/OtherCreate`, {
          headers: { authorization: token },
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          socket.emit("insertItems", "ok");
          alert("Images uploaded successfully");
          const json = await response.json();
          console.log("the other", json);
        }
      }
    } catch (error) {
      console.log("Error uploading images", error);
      alert("Error uploading images ", error);
    }
  };
  console.log("buna", imageFiles);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {images.map((image, index) => (
            <div key={index} style={{ position: "relative", margin: "5px" }}>
              <img
                src={image}
                alt={`Uploaded ${index}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                type="button"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button type="submit">Upload Images</button>
      </form>
    </div>
  );
};

export default PictureUploader;
