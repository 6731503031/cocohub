// Servers/routes/market.js
import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM market_prices", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Cannot fetch market data" });
    } else {
      res.json(rows);
    }
  });
});

export default router;
