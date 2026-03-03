import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
    credentials: true,
  })
);

/* ---------- ROUTES ---------- */
app.use("/api", authRoutes);
app.use("/api/comments", commentsRoutes);

/* ---------- VISIT TRACKING ---------- */
app.post("/api/track-visit", async (req, res) => {
  try {
    await pool.query(`INSERT INTO visitors DEFAULT VALUES`);
    res.json({ message: "Visit stored" });
  } catch (err) {
    res.status(500).json({ error: "Failed to store visit" });
  }
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});