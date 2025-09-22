// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config(); // load .env variables

const router = express.Router();

// Temporary in-memory user store (replace with DB later)
let adminUser = {
  email: process.env.ADMIN_EMAIL,
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10), // hashed
};

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if email matches
  if (email !== adminUser.email) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // check password
  const validPass = await bcrypt.compare(password, adminUser.passwordHash);
  if (!validPass) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // issue access + refresh tokens
  const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // send tokens as HttpOnly cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // set true in production (https)
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.json({ message: "Login successful" });
});

// ---------------- PROTECTED ROUTE ----------------
router.get("/admin", (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    res.json({ message: `Welcome Admin: ${decoded.email}` });
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

const logout = async () => {
  try {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    alert("Logged out!");
    // redirect to login page
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed", err);
  }
};
let visitCount = 0;

router.get("/admin", (req, res) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    visitCount++; // increase visits each time admin page is accessed

    res.json({
      message: `Welcome Admin: ${decoded.email}`,
      visits: visitCount,
      note: "This resets when you restart the server (use DB for permanent storage)",
    });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});


export default router;
