const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },

   brand: {
    type: String,
    required: true
  },
  
  category: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model("Product", ProductSchema);