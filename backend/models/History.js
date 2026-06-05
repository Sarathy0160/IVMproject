const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  productName: String,
  action: String,
  details: String,

  date: {
    type: Date,
    default: Date.now
  }
});

// ⏰ Auto delete after 24 hours
HistorySchema.index({ date: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("History", HistorySchema);