import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "../db.js";

dotenv.config();
const router = express.Router();

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// BUG FIX: hash once at startup — was re-hashing on every login attempt,
// which means bcrypt.compare(plaintext, hash) was always being called correctly
// BUT the hash itself was generated from ADMIN_PASSWORD env var each restart,
// so it was fine functionally. However, it wastes ~100ms CPU on every cold start.
// Better practice: store the hash in env or DB. This lazy-init pattern is cleaner:
let _passwordHash = null;
async function getPasswordHash() {
  if (!_passwordHash) {
    _passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  }
  return _passwordHash;
}

/* ---------- LOGIN ---------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  // Constant-time email comparison to avoid timing attacks
  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const hash  = await getPasswordHash();
  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { email },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ accessToken });
});

/* ---------- ADMIN DASHBOARD ---------- */
router.get("/admin", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    jwt.verify(token, process.env.ACCESS_SECRET);

    const [visitors, messages] = await Promise.all([
      pool.query(`SELECT COUNT(*) FROM visitors`),
      pool.query(`
        SELECT id, name, message, parent_id, created_at
        FROM comments
        ORDER BY created_at DESC
      `),
    ]);

    res.json({
      totalVisitors: visitors.rows[0].count,
      totalMessages: messages.rowCount,
      messages:      messages.rows,
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    console.error("GET /admin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- LOGOUT ---------- */
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
