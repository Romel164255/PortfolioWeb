import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Use plain text email/password from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Hash admin password once
const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

// Visit counter (demo)
let visitCount = 0;

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const validPass = await bcrypt.compare(password, passwordHash);
  if (!validPass) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

  // Use secure: false in dev if localhost
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.json({ message: "Login successful" });
});

// ---------------- REFRESH TOKEN ----------------
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.json({ message: "Access token refreshed" });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

// ---------------- PROTECTED ROUTE ----------------
router.get("/admin", (req, res) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    visitCount++;
    res.json({
      message: `Welcome Admin: ${decoded.email}`,
      visits: visitCount,
      note: "This resets when server restarts (use DB for permanent storage)",
    });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

// ---------------- LOGOUT ----------------
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

export default router;
