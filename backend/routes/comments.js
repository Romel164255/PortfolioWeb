import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ---------- GET COMMENTS ---------- */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, message, parent_id, user_id, created_at
      FROM comments
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /comments error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

/* ---------- POST COMMENT ---------- */
router.post("/", async (req, res) => {
  const { name, message, parent_id = null, user_id = null } = req.body;

  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name and message are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comments (name, message, parent_id, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name.trim(), message.trim(), parent_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /comments error:", err);
    res.status(500).json({ error: "Failed to save comment" });
  }
});

export default router;
