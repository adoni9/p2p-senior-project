const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const Applicant_userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter first Name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter last Name"],
    },
    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },
    mobileMoney: {
      type: String,
      required: [true, "Please enter phone number"],
    },
    location: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
    },
    password: {
      type: String,
      required: [true, "Please Add password"],
    },
    image: {
      type: String,
      default: " ",
    },
    image2: {
      type: String,
      default: " ",
    },
    image3: {
      type: String,
      default: " ",
    },

    status: {
      type: String,
      default: "New",
    },
    try: {
      type: Number,
      default: 2,
    },
    deposite: {
      type: Number,
      default: 0,
    },
    bankAccount: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("Applicant_userSchema", Applicant_userSchema);

module.exports = User;
