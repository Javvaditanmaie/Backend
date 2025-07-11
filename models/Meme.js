// models/Meme.js
import mongoose from "mongoose";

const memeSchema = new mongoose.Schema(
  {
    url: String,
    userId: String, 
  createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", memeSchema);

export default Meme;
