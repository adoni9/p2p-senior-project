const {
  UserCreate,
  GetUser,
  GetOneUserById,
  DeleteUser,
  LoginUser,
  UpdateOneUser,
  GetUserExcept,
  GetOneUserByEmail,
  GetCustomer,
  GetOneUserById2,
  deleteUser,
} = require("../Controller/UserController");

const express = require("express");
const router = express.Router();
router.route("/GetUser").get(GetUser);
router.route("/GetOneUserByEmail").post(GetOneUserByEmail);
router.route("/UserCreate/:id").post(UserCreate);
router.route("/LoginUser").post(LoginUser);
router.route("/GetOneUserById/:id").get(GetOneUserById);
router.route("/GetOneUserById2/:id").get(GetOneUserById2);
router.route("/GetUserExcept/:id").get(GetUserExcept);
router.route("/GetCustomer").get(GetCustomer);
router.route("/DeleteUser/:id").delete(DeleteUser);
router.route("/UpdateOneUser/:id").patch(UpdateOneUser);
module.exports = router;
