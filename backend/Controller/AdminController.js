const Admin = require("../Model/Admin");
const jwt = require("jsonwebtoken");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//Sign Up
const AdminCreate = async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password,
  } = req.body;
  const image1 = req.file;
  if (image1 === undefined) {
    return res.status(400).json({ message: "insert image" });
  }

  const image2 = image1.path;

  try {
    const admins = await Admin.SignUp(
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      password,
      image2
    );

    res.status(200).json({
      firstname,
      lastname,
      gender,
      phonenumber,
      email,
      image2,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admins = await Admin.Login(email, password);
    const _id = admins._id;
    const firstname = admins.firstname;
    const lastname = admins.lastname;
    const image = admins.image;
    const phonenumber = admins.phonenumber;
    const gender = admins.gender;

    //token
    const token = createToken(admins._id);
    res.status(200).json({
      gender,
      firstname,
      lastname,
      image: image,
      email,
      token,
      phonenumber,
      _id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetAdmin = async (req, res) => {
  const cv = await Admin.find({});
  res.status(200).json(cv);
};
const RechargeBalance = async (req, res) => {
  const { amountt } = req.body;
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function generateRandomNumberWithAmount(min, max, amount) {
    const randomNumber = generateRandomNumber(min, max);
    return {
      number: randomNumber,
      amount: randomNumber * amount,
    };
  }
  const randomData = generateRandomNumberWithAmount(1, 10, amountt);
  console.log(randomData.number); // The generated random number
  console.log(randomData.amount); // The associated amount of money
  res.status(200).json(randomData);
};
const GetOneAdminById = async (req, res) => {
  const { id } = req.params;
  const cv = await Admin.findById(id);
  res.status(200).json(cv);
};
module.exports = {
  AdminCreate,
  GetAdmin,
  GetOneAdminById,
  LoginAdmin,
  RechargeBalance,
};
