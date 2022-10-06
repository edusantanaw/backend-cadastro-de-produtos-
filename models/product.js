const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const Product = new mongoose.model(
  "Product",
  new Schema({
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
    },
    quantity:{
      type: Number,
      default: 0
    }
  })
);

module.exports = Product;
