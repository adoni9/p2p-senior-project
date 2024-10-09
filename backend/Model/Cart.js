const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    status: {
      type: String,
      default: "unpaid",
    },
    money: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userId"],
      ref: "User",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter itemId"],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
