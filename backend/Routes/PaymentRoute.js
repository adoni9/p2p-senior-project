const {
  checkPlatformBalance,
  preAuthorizePayment,
  capturePayment,
  payoutToSeller,
  transferToSeller,
  verifyPayment,
  rechargeBalance,
  merchantPayment,
  UpdateDeposit,
  withdraw,
  GetAllWithdraw,
  cancelPayment,
  deleteWithdraw
} = require("../Controller/PaymentController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const express = require("express");
const router = express.Router();
router.get("/checkPlatformBalance", checkPlatformBalance);
router.post("/preAuthorizePayment", AuthenticationUser, preAuthorizePayment);
router.post("/CancelPayment", AuthenticationUser, cancelPayment);
router.post("/merchantPayment", merchantPayment);
router.patch("/UpdateDeposit", UpdateDeposit);
router.post("/capturePayment/:id", capturePayment);
router.get("/payoutToSeller", payoutToSeller);
router.post("/transferToSeller", transferToSeller);
router.post("/verifyPayment", verifyPayment);
router.post("/withdraw", withdraw);
router.get("/GetAllWithdraw", GetAllWithdraw);
router.route("/deleteWithdraw/:id").delete(deleteWithdraw);
router.post("/rechargeBalance", AuthenticationUser, rechargeBalance);
module.exports = router;
