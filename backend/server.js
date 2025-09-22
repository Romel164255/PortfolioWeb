import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(cookieParser());

// ✅ Dynamic CORS (read from .env)
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","), 
    credentials: true,
  })
);

// ---------- API ROUTES ----------
app.use("/api", authRoutes);

// ---------- SERVE FRONTEND ----------
const buildPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
