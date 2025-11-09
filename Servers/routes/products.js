// Servers/routes/product.js
import express from "express";
import db from "../db.js";

const router = express.Router();

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
