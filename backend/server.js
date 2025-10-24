import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
// path and fileURLToPath are no longer needed
import authRoutes from "./routes/auth.js"; // This assumes routes is a sibling folder to server.js

dotenv.config();

const app = express();

// __dirname fix is no longer needed

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
    credentials: true,
  })
);

// ---------- API ROUTES ONLY (Vercel handles the frontend) ----------
app.use("/api", authRoutes);

// The frontend serving logic is correctly removed

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});