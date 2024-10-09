const {
  CarCreate,
  GetAllCar,
  GetOneCar,
  fetchRating,
  rateCar,
} = require("../Controller/CarController");

const multer = require("multer");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });

const upload2 = upload.fields([{ name: "testImages", maxCount: 5 }]);
const express = require("express");
const router = express.Router();
router.route("/GetAllCar").get(GetAllCar);
router.route("/GetOneCar/:id").get(GetOneCar);
router.route("/fetchRating/:id").get(fetchRating);
router.route("/rateCar/:id").post(AuthenticationUser, rateCar);
router.route("/CarCreate").post(AuthenticationUser, upload2, CarCreate);
module.exports = router;
