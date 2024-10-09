const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
  {
    Sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Message: {
      type: String,
      required: [true, "Please enter message"],
    },
    image: {
      type: String,
      required: [true, "Please enter profile"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Chat", chatSchema);
//static Sign Up
