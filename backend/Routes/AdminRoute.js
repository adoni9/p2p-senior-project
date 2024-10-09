const {
  AdminCreate,
  GetAdmin,
  LoginAdmin,
  RechargeBalance,
  GetOneAdminById,
} = require("../Controller/AdminController");

const multer = require("multer");
const { storage } = require("../MiddleWare/cloudinary");
const upload = multer({ storage });
const upload2 = upload.single("testImage");

const express = require("express");
const router = express.Router();
router.route("/GetAdmin").get(GetAdmin);
//router.route("/GetOneTech").get(AuthenticationTech, GetOneTech);
router.route("/AdminCreate").post(upload2, AdminCreate);
router.route("/LoginAdmin").post(LoginAdmin);
router.route("/RechargeBalance").post(RechargeBalance);
router.route("/GetOneAdminById/:id").get(GetOneAdminById);
//   router.route("/:id").patch(upload, UpdateTech);
//   router.route("/:id").get(GetOneTech).delete(DeleteTech).patch(UpdateTech);

module.exports = router;
