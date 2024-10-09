const {
  GetOneOther,
  OtherCreate,
  GetAllOther,
  rateOther,
} = require("../Controller/OtherController");

const multer = require("multer");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });

const upload2 = upload.fields([{ name: "testImages", maxCount: 5 }]);
const express = require("express");
const router = express.Router();
router.route("/GetAllOther").get(GetAllOther);
router.route("/GetOneOther/:id").get(GetOneOther);
router.route("/rateOther/:id").post(AuthenticationUser, rateOther);
router.route("/OtherCreate").post(AuthenticationUser, upload2, OtherCreate);
module.exports = router;
