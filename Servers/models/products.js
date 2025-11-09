import { dbPromise } from "../index.js";

export async function getAllProducts() {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM products");
  return rows;
}

export async function getProductById(id) {
  const db = await dbPromise;
  const row = await db.get("SELECT * FROM products WHERE id = ?", [id]);
  return row;
}
