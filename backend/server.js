// server.js
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";           // <--- added
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();  // <--- added

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(cookieParser());

// ✅ Dynamic CORS (read from .env)
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","), // multiple allowed origins
    credentials: true,
  })
);

// ---------- ROUTES ----------
app.use("/api", authRoutes);

// ---------- SERVE FRONTEND ----------
app.use(express.static(path.join(__dirname, "frontend/dist"))); // frontend build folder

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
