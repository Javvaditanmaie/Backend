const mongoose = require("mongoose");

const MemeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meme", MemeSchema);
