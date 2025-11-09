const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchVarieties() {
  const res = await fetch(`${API_BASE}/varieties`);
  if (!res.ok) throw new Error("Failed to fetch varieties");
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProducers() {
  const res = await fetch(`${API_URL}/producers`);
  return res.json();
}
