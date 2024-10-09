const {
  ChatCreate,
  GetChat,
  DeleteChat,
  deleteCT,
} = require("../Controller/ChatController");

const express = require("express");
const router = express.Router();
router.route("/GetChat").post(GetChat);
//router.route("/GetOneTech").get(AuthenticationTech, GetOneTech);
router.route("/ChatCreate").post(ChatCreate);
router.route("DeleteChat/:id").delete(DeleteChat);
router.route("/:id").delete(deleteCT);

module.exports = router;
