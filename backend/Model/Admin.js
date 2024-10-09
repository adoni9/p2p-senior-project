const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const adminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter first Name A"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter last Name"],
    },
    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },
    phonenumber: {
      type: String,
      required: [true, "Please enter phone number"],
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
  },
  { timestamps: true }
);
//static
adminSchema.statics.SignUp = async function (
  firstname,
  lastname,
  gender,
  phonenumber,
  email,
  password,
  image
) {
  if (!email) throw Error("email required");
  if (!password) throw Error("passwoed  required");
  if (!firstname) throw Error("firstname required");
  if (!lastname) throw Error("lastname required");
  if (!gender) throw Error("genderare required");
  if (!phonenumber) throw Error("phone required");
  if (image === undefined) throw Error("image required");
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
  const admins = await this.create({
    firstname,
    lastname,
    gender,
    phonenumber,
    email,
    password: hash,
    image,
  });
  return admins;
};

//Static LOgin Method

adminSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All files are required");
  }
  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("Incorrect email ");
  }
  const match = await bcryptjs.compare(password, admin.password);
  if (!match) {
    throw Error("Incorrect password ");
  }
  return admin;
};
module.exports = mongoose.model("Admin", adminSchema);
