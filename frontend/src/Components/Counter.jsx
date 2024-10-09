import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Counter = ({ productId, price, onQuantityChange }) => {
  const [count, setCount] = useState(1);
  const dispatch2 = useDispatch();
  const todo = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    onQuantityChange(count + 1, (count + 1) * price);
    console.log("count is", count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
      setTotalPrice((count - 1) * price);
      onQuantityChange(count - 1, (count - 1) * price);
      console.log("count is", count - 1);
    }
  };
  useEffect(() => {
    onQuantityChange(count, count * price);
  }, []);

  return (
    <div className="text-center">
      <div className="inline-block  border-black rounded-full p-2 m-4">
        <button
          onClick={decrement}
          className="w-7 h-7 rounded-full border-2 border-black"
        >
          -
        </button>
        <span className="mx-4 ">{count}</span>
        <button
          onClick={increment}
          className="w-7 h-7 rounded-full border-2 border-black"
        >
          +
        </button>
      </div>

      <p>Total Price:{count * price}</p>
    </div>
  );
};

export default Counter;
