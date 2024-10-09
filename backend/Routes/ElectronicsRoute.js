const {
  GetOneElectronics,
  ElectronicsCreate,
  GetAllElectronics,
  rateElectronics,
} = require("../Controller/ElectronicsController");

const multer = require("multer");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });

const upload2 = upload.fields([{ name: "testImages", maxCount: 5 }]);
const express = require("express");
const router = express.Router();
router.route("/GetAllElectronics").get(GetAllElectronics);
router.route("/GetOneElectronics/:id").get(GetOneElectronics);
router.route("/rateElectronics/:id").post(AuthenticationUser, rateElectronics);
router
  .route("/ElectronicsCreate")
  .post(AuthenticationUser, upload2, ElectronicsCreate);
module.exports = router;
