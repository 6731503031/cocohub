// Servers/routes/news.js
import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM news", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Cannot fetch news" });
    } else {
      res.json(rows);
    }
  });
});

export default router;
