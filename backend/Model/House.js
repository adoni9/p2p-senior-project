const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const houseSchema = new mongoose.Schema(
  {
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    category: {
      type: String,
      required: [true, "Please enter category"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please enter userId"],
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Please enter type"],
      enum: [
        "apartment",
        "condominium",
        "G+",
        "office-shop",
        "building",
        "warehouse",
        "land",
      ],
    },
    For: {
      type: String,
      required: [true, "Please enter For"],
      enum: ["sale", "rent"],
    },
    price: {
      type: Number,
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
    area: {
      type: String,
      required: [true, "Please enter area"],
    },

    bedRoom: {
      type: String,
      required: [true, "Please enter bedRoom"],
    },
    bathRoom: {
      type: String,
      required: [true, "Please enter bathRoom"],
    },
    description: {
      type: String,
      required: [true, "Please description"],
    },
    image: {
      type: String,
      default: " ",
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

const House = mongoose.model("house", houseSchema);
module.exports = House;
