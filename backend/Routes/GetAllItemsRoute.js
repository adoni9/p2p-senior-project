const {
  GetAllItems,
  GetAllItemsUser,
  deleteItem,
} = require("../Controller/GetAllItemController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const express = require("express");
const router = express.Router();
router.route("/GetAllItems").post(GetAllItems);
router.route("/deleteItem/:id").delete(deleteItem);
router.route("/GetAllItemsUser").get(AuthenticationUser, GetAllItemsUser);
module.exports = router;
