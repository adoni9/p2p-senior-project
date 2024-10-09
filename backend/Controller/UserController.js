const User = require("../Model/User");
const Admin = require("../Model/Admin");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Car = require("../Model/Car");
const House = require("../Model/House");
const Other = require("../Model/Other");
const Electronics = require("../Model/Electronics");
const Cart = require("../Model/Cart");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const UserCreate = async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password,
    bankAccount,
    image,
    image2,
    image3,
  } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "africadish9@gmail.com",
      pass: "jhrpmzwkhvapckpt",
    },
  });

  const mailOptions = {
    from: "africadish9@gmail.com",
    to: email,
    subject: "You Can Start A Job",
    text: `You have been registered! Your Email and password is ${email} and ${password}`,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error("Failed to send Email"));
        } else {
          resolve();
        }
      });
    });

    const techs = await User.SignUp(
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      password,
      bankAccount,
      image,
      image2,
      image3
    );

    res.status(200).json({
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      bankAccount,
      image,
      image2,
      image3,
    });
    //const update = await Applicant.findOneAndDelete({ _id: id });
  } catch (err) {
    console.log("Failed to send Email:", err);
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const techs = await User.Login(email, password);
    const _id = techs._id;
    const firstname = techs.firstname;
    const lastname = techs.lastname;
    const image = techs.image;
    const phonenumber = techs.mobileMoney;
    const email1 = techs.email;
    const gender = techs.gender;
    const location = techs.location;
    const deposite = techs.deposite;
    //token
    const token = createToken(_id);
    res.status(200).json({
      gender,
      firstname,
      lastname,
      image: image,
      email1,
      phonenumber,
      _id,
      token: token,
      deposite,
      location,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetUser = async (req, res) => {
  const cv = await User.find({});
  res.status(200).json(cv);
};
//get all user except
const GetUserExcept = async (req, res) => {
  const { id } = req.params;
  const cv = await User.find({ _id: { $ne: id } });
  const ad = await Admin.find({});
  const combinedArray = [...cv, ...ad];
  res.status(200).json(combinedArray);
};
// Get one(if Super Admin is Available for the future)
const GetOneUserById = async (req, res) => {
  const { id } = req.params;
  const cv = await User.find({ _id: id });
  console.log("");
  res.status(200).json(cv);
};
const GetOneUserByEmail = async (req, res) => {
  const { custEmail } = req.body;
  const cv = await User.find({ email: custEmail });
  res.status(200).json(cv);
};
//update one
const GetCustomer = async (req, res) => {
  const cv = await User.find({});
  res.status(200).json(cv);
};
const UpdateOneUser = async (req, res) => {
  const { location } = req.body;

  const { id } = req.params;
  const updated = await User.findByIdAndUpdate(
    { _id: id },
    { location: location },
    { new: true }
  );
  const updated_2 = await User.findById(id);
  res.status(200).json(updated_2);
};

//Delete

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  let result = await User.findOneAndDelete({ _id: id });
  // Delete all cars with the given userId
  await Car.deleteMany({ userId: id });

  // Delete all Electronics with the given userId
  await Electronics.deleteMany({ userId: id });

  await Other.deleteMany({ userId: id });

  // Delete all houses with the given userId
  await House.deleteMany({ userId: id });

  await Cart.deleteMany({ userId: id });

  result = await User.find({});
  res.status(200).json(result);
};

module.exports = {
  GetCustomer,
  UserCreate,
  GetUser,
  GetOneUserById,
  DeleteUser,
  LoginUser,
  UpdateOneUser,
  GetUserExcept,
  GetOneUserByEmail,
  DeleteUser,
};
