const {
  HouseCreate,
  GetAllHouse,
  GetOneHouse,
  fetchRating,
  rateHouse,
} = require("../Controller/HouseController");

const multer = require("multer");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });

const upload2 = upload.fields([{ name: "testImages", maxCount: 5 }]);
const express = require("express");
const router = express.Router();
router.route("/GetAllHouse").get(GetAllHouse);
router.route("/GetOneHouse/:id").get(GetOneHouse);
router.route("/HouseCreate").post(AuthenticationUser, upload2, HouseCreate);
router.route("/fetchRating/:id").get(fetchRating);
router.route("/rateHouse/:id").post(AuthenticationUser, rateHouse);
module.exports = router;
