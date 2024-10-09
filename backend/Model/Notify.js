const mongoose = require("mongoose");
const notifytSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userId"],
      ref: "User",
    },
    image: {
      type: String,
      default: "",
    },
    buyerName: {
      type: String,
      default: "",
    },
    buyerLocation: {
      type: String,
      default: "",
    },
    tPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Notify = mongoose.model("notify", notifytSchema);
module.exports = Notify;
