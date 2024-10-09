const Applicant = require("../Model/Applicants");
const Admin = require("../Model/Admin");
const User = require("../Model/User");
const validator = require("validator");
const otpGenerator = require("otp-generator");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
let otpStore = {}; // Temporary store for OTPs
const io = require("socket.io-client");

//Sign Up
const ApplicantCreate = async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password,
    bankAccount,
    otp,
  } = req.body;
  const [image, image2, image3] = req.files["testImages"];
  try {
    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
      return res.status(400).send({ message: "OTP not generated or expired" });
    }

    const isOtpValid = await bcryptjs.compare(otp, storedOtpData.otp);
    const isOtpExpired = Date.now() > storedOtpData.otpExpiry;

    if (isOtpExpired) {
      delete otpStore[email];
      return res.status(400).send({ message: "OTP expired" });
    }

    if (!isOtpValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }

    // Apply to the user

    const applicants = await Applicant.create({
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      password,
      bankAccount,
      image: image.path,
      image2: image2.path,
      image3: image3.path,
    });

    //const update = await Applicant.findOneAndDelete({ _id: applicants._id });
    // Clean up the OTP store
    delete otpStore[email];
    res.status(200).json(applicants);
  } catch (error) {
    res.status(400).json({ message: error.message });
    //console.log("error", error);
  }
};

//Generate OTP
const GenerateOtp = async (req, res) => {
  const { email, mobileMoney, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const exists = await User.findOne({ email });
    if (exists) {
      throw Error("email already in use");
    }
    const exists2 = await Applicant.findOne({ email });
    if (exists2) {
      throw Error("email already in use");
    }
    const exists3 = await User.findOne({ mobileMoney });
    if (exists3) {
      throw Error("Phonenumber already in use");
    }
    const exists4 = await Applicant.findOne({ mobileMoney });
    if (exists4) {
      throw Error("Phonenumber already in use");
    }
    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    console.log("the opt is", otp);
    console.log("the email", email);
    const hashedOtp = await bcryptjs.hash(otp, 10);
    // Store OTP and its expiration time in memory
    otpStore[email] = { otp: hashedOtp, otpExpiry: Date.now() + 300000 }; // 5 minutes expiry

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
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      try {
        if (error) {
          throw Error("Failed to send OTP");
        }
        res.status(200).json({ message: "OTP sent successfully" });
        console.log("OTP sent successfully");
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetAllApplicant = async (req, res) => {
  const result = await Applicant.find({});
  res.status(200).json(result);
};
//
const GetApplicant = async (req, res) => {
  const { id } = req.params;

  const result = await Applicant.findById(id);
  res.status(200).json(result);
};
const deleteApplicant = async (req, res) => {
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

module.exports = {
  GetApplicant,
  ApplicantCreate,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
};
