import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const socket = io("https://mainkaju.onrender.com");
const WithdrawalForm = ({ user }) => {
  const storedUser = localStorage.getItem("user");
  user = storedUser;
  let token = storedUser.token;
  console.log("the token is ", storedUser);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    bank: "cbe",
    amount: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data for API post
    const postData = {
      fullname: formData.fullname,
      email: formData.email,
      bank: formData.bank,
      amount: formData.amount,
      accountNumber: formData.accountNumber,
    };

    // You can now post the `postData` to your API endpoint
    const response = await fetch(`${API_BASE_URL}/api/payment/withdraw`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json", authorization: token },
    });
    if (response.ok) {
      socket.emit("fetchWithdraw", "ok");
      alert("Your Withdrawal Request has been summited Sucessfully");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullname" className="block font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bank" className="block font-bold mb-2">
            Bank:
          </label>
          <select
            id="bank"
            name="bank"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.bank}
            onChange={handleChange}
          >
            <option value="cbe">Tele Birr</option>
            <option value="cbe">Commercial Bank of Ethiopia</option>
            <option value="abissiniya">Abissiniya Bank</option>
            <option value="awash">Awash Bank</option>
            <option value="bunna">Bunna International Bank</option>
            <option value="dashen">Dashen Bank</option>
            <option value="abbay">Abbay Bank</option>
            <option value="tsedey">Tsedey Bank</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-bold mb-2">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="accountNumber" className="block font-bold mb-2">
            Account Number:
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;
