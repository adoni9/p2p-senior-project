const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
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

//static
userSchema.statics.SignUp = async function (
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
) {
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use");
  }

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  const users = await this.create({
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password: hash,
    bankAccount,
    image,
    image2,
    image3,
  });
  return users;
};

//Static LOgin Method

userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All files are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email ");
  }
  const match = await bcryptjs.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password ");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
