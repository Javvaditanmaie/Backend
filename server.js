import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Meme from "./models/Meme.js"; 

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API is running ");
});

// POST meme
app.post("/api/memes", async (req, res) => {
  try {
    const { url, userId } = req.body;
    const meme = new Meme({ url ,userId});
    await meme.save();
    res.json({ success: true, meme });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving meme", error: err });
  }
});

// GET memes
app.get("/api/memes", async (req, res) => {
  try {
    const { userId } = req.query;
    const memes = await Meme.find({ userId }).sort({ createdAt: -1 });
    res.json({ memes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching memes", error: err });
  }
});
app.delete("/api/memes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Meme.findByIdAndDelete(id);
    res.json({ success: true, message: "Meme deleted successfully" });
  } catch (error) {
    console.error("Error deleting meme:", error);
    res.status(500).json({ success: false, error: "Failed to delete meme" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
