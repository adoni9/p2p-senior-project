import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const StarRatingH = ({ user, id, category }) => {
  const totalStars = 5;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const todo = useSelector((state) => state.tech.tech);
  user = todo[0];
  let token = user ? "Bearer " + user.tk : "";
  console.log("the token ", token);
  if (token == "Bearer " + undefined) {
    token = user ? "Bearer " + user.token : "";
    console.log("the second token ", token);
  }

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const toastify = () => {
    toast.error("Please LognIn First", {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex + 1);
  };
  const postComment = async () => {
    console.log("the rating is ", rating);
    if (user == undefined) {
      toastify();
      console.log("toast");
      return;
    }
    if (category == "house") {
      const response = await fetch(
        `${API_BASE_URL}/api/House/rateHouse/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ rating: rating, comment: comment }),
          headers: { "Content-Type": "application/json", authorization: token },
        }
      );
      if (response.ok) {
        const json = await response.json();
        // setJson(json);
        console.log("the json is", json);
      }
    }

    if (category == "car") {
      const response = await fetch(`${API_BASE_URL}/api/car/ratecar/${id}`, {
        method: "POST",
        body: JSON.stringify({ rating: rating, comment: comment }),
        headers: { "Content-Type": "application/json", authorization: token },
      });
      if (response.ok) {
        const json = await response.json();
        // setJson(json);
        console.log("the json is", json);
      }
    }

    if (category == "electronics") {
      const response = await fetch(
        `${API_BASE_URL}/api/electronics/rateelectronics/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ rating: rating, comment: comment }),
          headers: { "Content-Type": "application/json", authorization: token },
        }
      );
      if (response.ok) {
        const json = await response.json();
        // setJson(json);
        console.log("the json is", json);
      }
    }

    if (category == "other") {
      const response = await fetch(
        `${API_BASE_URL}/api/other/rateother/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ rating: rating, comment: comment }),
          headers: { "Content-Type": "application/json", authorization: token },
        }
      );
      if (response.ok) {
        const json = await response.json();
        // setJson(json);
        console.log("the json is", json);
      }
    }
  };
  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderStar = (index) => {
    const isFull =
      index < rating || (index === rating - 0.5 && rating % 1 !== 0);
    const isHover =
      index < hoverRating ||
      (index === hoverRating - 0.5 && hoverRating % 1 !== 0);

    const starColor = isFull || isHover ? "text-yellow-500" : "text-gray-300";

    return (
      <span
        key={index}
        className={`text-2xl cursor-pointer ${starColor}`}
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleStarLeave}
      >
        {isFull ? "\u2605" : isHover ? "\u2605" : "\u2606"}
      </span>
    );
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
      <div className="flex mt-3">
        <textarea
          placeholder="Add your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="ml-4 mt-3">
          <button
            onClick={postComment}
            className="border-2 bg-blue-500 rounded-md text-white w-16 hover:bg-blue-400"
          >
            Post
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default StarRatingH;
