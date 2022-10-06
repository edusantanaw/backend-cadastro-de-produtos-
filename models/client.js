const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const Cliente = mongoose.model(
  "Cliente",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requide: true,
    },
    cpf:{
      type: Number
    },
    address: {
      type: Object
    },
    picture:{
      type: Object
    },    
    paymentMethod: {
      type: Object,
    },
    credits:{
      type: Number,
      default: 0
    },
    password: {
        type: String,
        required: true
    },
    admin:{
      type: Boolean,
      default: false
    },
    purchasedProducts: []
  })
);

module.exports = Cliente;
