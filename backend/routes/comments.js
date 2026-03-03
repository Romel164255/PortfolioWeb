import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ---------- GET COMMENTS ---------- */
router.get("/", async (req, res) => {
  const result = await pool.query(`
    SELECT id, name, message, parent_id, user_id, created_at
    FROM comments
    ORDER BY created_at DESC
  `);

  res.json(result.rows);
});

/* ---------- POST COMMENT ---------- */
router.post("/", async (req, res) => {
  const { name, message, parent_id = null, user_id = null } = req.body;

  const result = await pool.query(
    `
    INSERT INTO comments (name, message, parent_id, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, message, parent_id, user_id]
  );

  res.json(result.rows[0]);
});

export default router;