import { dbPromise } from "../index.js";

export async function getAllVarieties() {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM varieties");
  return rows;
}

export async function getVarietyById(id) {
  const db = await dbPromise;
  const row = await db.get("SELECT * FROM varieties WHERE id = ?", [id]);
  return row;
}
