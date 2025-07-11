import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Meme from "./models/Meme.js"; // Add .js extension for ESM

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST meme
app.post("/api/memes", async (req, res) => {
  try {
    const { url } = req.body;
    const meme = new Meme({ url });
    await meme.save();
    res.json({ success: true, meme });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving meme", error: err });
  }
});

// GET memes
app.get("/api/memes", async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.json({ memes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching memes", error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
