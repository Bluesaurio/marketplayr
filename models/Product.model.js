const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    platform: {
      type: String,
      trim: true,
      required: true,
    },
    edition: {
      type: String,
      trim: true,
      required: false,
    },
    releaseYear: {
      type: Number,
      trim: true,
      required: false,
    },
    developer: {
      type: String,
      trim: true,
      required: false,
    },
    publisher: {
      type: String,
      trim: true,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      trim: true,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
