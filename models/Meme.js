// models/Meme.js
import mongoose from "mongoose";

const memeSchema = new mongoose.Schema(
  {
    url: String,
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", memeSchema);

export default Meme;
