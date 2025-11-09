import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// แปลง import.meta.url เป็น __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path ของ database
const DBSOURCE = path.join(__dirname, "cocohub.db");

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to SQLite database at", DBSOURCE);
  }
});

export default db;
