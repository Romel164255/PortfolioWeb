// server.js
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";  // <--- ADD THIS
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(cookieParser());

// ✅ Add CORS here before routes
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL (Vite dev server)
    credentials: true,               // allow cookies
  })
);

// ---------- ROUTES ----------
app.use("/api", authRoutes);

// ---------- START SERVER ----------
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
