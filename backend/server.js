import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// --- connect MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/test")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Serve frontend static files (project root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..")));

// Mount auth routes
app.use("/api/auth", authRoutes);

// Fallback to index
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "..", "index.html")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
