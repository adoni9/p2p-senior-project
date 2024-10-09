import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaCheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold mb-2">
        Your Application has been submitted successfully
      </h1>
      <p className="text-gray-600">Thank you!</p>
    </div>
  );
};

export default SuccessMessage;
