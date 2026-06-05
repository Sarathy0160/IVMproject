const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String, // admin / manager
});

module.exports = mongoose.model("User", userSchema);