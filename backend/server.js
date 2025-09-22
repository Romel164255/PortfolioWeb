// server.js
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

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

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
