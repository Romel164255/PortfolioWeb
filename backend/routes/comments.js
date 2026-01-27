import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET comments
router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM comments ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// POST comment
router.post("/", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const result = await pool.query(
    "INSERT INTO comments (name, message) VALUES ($1, $2) RETURNING *",
    [name, message]
  );

  res.status(201).json(result.rows[0]);
});

export default router;
