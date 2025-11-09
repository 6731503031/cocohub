// Servers/routes/dashboard.js
import express from "express";
import db from "../db.js";

const router = express.Router();


// route หลักของ dashboard
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Coconut Dashboard API",
    endpoints: ["/dashboard/users"],
  });
});

// ตัวอย่างดึงข้อมูลผู้ประกอบการ (users)
router.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Cannot fetch users" });
    } else {
      res.json(rows);
    }
  });
});

export default router;
