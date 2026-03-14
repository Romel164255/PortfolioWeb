import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import projectsRoutes from "./routes/projects.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
    credentials: true,
  })
);

/* ---------- ROUTES ---------- */
app.use("/api", authRoutes);
app.use("/api/comments", commentsRoutes);

app.use("/api/projects", projectsRoutes);

/* ---------- VISIT TRACKING ---------- */
app.post("/api/track-visit", async (req, res) => {
  try {
    await pool.query(`INSERT INTO visitors DEFAULT VALUES`);
    res.json({ message: "Visit stored" });
  } catch {
    res.status(500).json({ error: "Failed to store visit" });
  }
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});