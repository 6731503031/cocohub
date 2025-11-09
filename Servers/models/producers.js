import { dbPromise } from "../index.js";

export async function getAllProducers() {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM producers");
  return rows;
}

export async function getProducerById(id) {
  const db = await dbPromise;
  const row = await db.get("SELECT * FROM producers WHERE id = ?", [id]);
  return row;
}
