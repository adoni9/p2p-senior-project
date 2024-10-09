const Applicant = require("../Model/Applicants");
const Admin = require("../Model/Admin");
const User = require("../Model/User");
const Notify = require("../Model/Notify");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
let otpStore = {}; // Temporary store for OTPs
const io = require("socket.io-client");
const socket = io("https://mainkaju.onrender.com");
//Sign Up
const notifyCreat = async (req, res) => {
  const { category, image, owner, buyerName, buyerLocation, tPrice } = req.body;

  // Apply to the user

  try {
    const notify = await Notify.create({
      ownerId: owner,
      category,
      image,
      buyerName,
      buyerLocation,
      tPrice,
    });

    res.status(200).json(notify);
  } catch (error) {
    res.status(400).json({ message: error.message });
    //console.log("error", error);
  }
};

const deleteNotify = async (req, res) => {
  const { id } = req.params;
  const { email, email2, password } = req.body;
  const update = await Applicant.findOneAndDelete({ _id: id });
  const result = await Admin.findOne({ email });
  const numberOfworks = result.numberOfworks + 1;
  const final = await Admin.findByIdAndUpdate(
    {
      _id: result._id,
    },
    { numberOfworks }
  );

  const result2 = await Applicant.find({});
  res.status(200).json(result2);
};
//
const getNotify = async (req, res) => {
  const { id } = req.params;
  console.log("");
  const result2 = await Notify.find({ ownerId: id });
  const result3 = result2.reverse();
  res.status(200).json(result3);
};

module.exports = {
  notifyCreat,
  deleteNotify,
  getNotify,
};
