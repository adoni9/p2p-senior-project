const {
  notifyCreat,
  deleteNotify,
  getNotify,
} = require("../Controller/NotifyController");

const express = require("express");
const router = express.Router();
router.route("/notifyCreat").post(notifyCreat);
router.route("/deleteNotify/:id").delete(deleteNotify);
router.route("/getNotify/:id").get(getNotify);
module.exports = router;
