// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Temporary in-memory user store (replace with DB later)
let adminUser = {
  email: process.env.ADMIN_EMAIL,
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10), // hashed
};

let visitCount = 0;

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const validPass = await bcrypt.compare(password, adminUser.passwordHash);
  if (!validPass) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // issue access + refresh tokens
  const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

  // send tokens as HttpOnly cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod
    sameSite: "None",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

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
      sameSite: "None",
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
      note: "This resets when you restart the server (use DB for permanent storage)",
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
