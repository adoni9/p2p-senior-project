const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, default: 0 },
  comment: { type: String },
});

const otherSchema = new mongoose.Schema(
  {
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userid"],
      ref: "User",
    },
    userEmail: {
      type: String,
      required: [true, "Please enter userEmail"],
      ref: "User",
    },

    price: {
      type: String,
      required: [true, "Please enter price"],
    },
    Llimit: {
      type: Number,
      required: [true, "Please enter Llimit"],
    },
    Ulimit: {
      type: Number,
      required: [true, "Please enter Ulimit"],
    },
    location: {
      type: String,
      required: [true, "Please enter location"],
    },

    title: {
      type: String,
      required: [true, "Please enter model"],
    },
    description: {
      type: String,
      required: [true, "Please description"],
    },
    image: {
      type: String,
      required: [true, "Please image"],
    },
    image2: {
      type: String,
      default: " ",
    },
    image3: {
      type: String,
      default: " ",
    },
    image4: {
      type: String,
      default: " ",
    },
    image5: {
      type: String,
      default: " ",
    },
    image6: {
      type: String,
      default: " ",
    },
    image7: {
      type: String,
      default: " ",
    },
    image8: {
      type: String,
      default: " ",
    },
    image9: {
      type: String,
      default: " ",
    },
    image10: {
      type: String,
      default: " ",
    },
  },
  { timestamps: true }
);

const other = mongoose.model("other", otherSchema);
module.exports = other;
