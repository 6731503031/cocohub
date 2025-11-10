// Servers/routes/product.js
import express from "express";
import db from "../db.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const router = express.Router();

// helper to open DB (adjust path if your DB is elsewhere)
async function openDb() {
  const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "cocohub.db");
  return open({ filename: dbPath, driver: sqlite3.Database });
}

router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Cannot fetch products" });
    } else {
      res.json(rows);
    }
  });
});

export default router;
