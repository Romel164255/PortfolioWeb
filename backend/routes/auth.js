import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool } from "../db.js";

dotenv.config();
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

/* ---------- LOGIN ---------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== ADMIN_EMAIL)
    return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, passwordHash);
  if (!valid)
    return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });

  res.json({ accessToken });
});

/* ---------- REFRESH ---------- */
router.post("/refresh", (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const newToken = jwt.sign({ email: decoded.email }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken: newToken });
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
});

/* ---------- ADMIN DASHBOARD ---------- */
router.get("/admin", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    jwt.verify(token, process.env.ACCESS_SECRET);

    const visitorResult = await pool.query(
      `SELECT COUNT(*) FROM visitors`
    );

    const messagesResult = await pool.query(`
      SELECT id, name, message, user_id, parent_id, created_at
      FROM comments
      ORDER BY created_at DESC
    `);

    res.json({
      totalVisitors: visitorResult.rows[0].count,
      totalMessages: messagesResult.rowCount,
      messages: messagesResult.rows,
    });

  } catch {
    res.status(403).json({ error: "Invalid or expired token" });
  }
});

export default router;