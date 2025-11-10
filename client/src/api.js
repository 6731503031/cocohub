import mockProducts from "./data/mockProducts.js";

const API_URL = import.meta.env.VITE_API_URL
  ? String(import.meta.env.VITE_API_URL).replace(/\/+$/, "")
  : "https://effective-goggles-x5pv5w6w59jw2vp94-4000.app.github.dev"; // ถ้าไม่กำหนดจะใช้ relative paths (เช่น Vite proxy)

async function safeFetch(path, opts = {}) {
  const base = API_URL || "";
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, opts);
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText} ${errText}`);
  }
  return res.json();
}

export async function fetchVarieties() { return safeFetch("/varieties"); }
export async function fetchProducts()  { return safeFetch("/products"); }
export async function fetchProducers() { return safeFetch("/producers"); }
export async function fetchNews()      { return safeFetch("/news"); }
export async function fetchMarket()    { return safeFetch("/market"); }

// NEW: submit product rating
export async function submitProductRating(productId, rating) {
  if (!productId) throw new Error("missing productId");
  const body = JSON.stringify({ rating: Number(rating) });
  // try common endpoints; primary: /products/:id/rating (POST)
  const path = `/products/${productId}/rating`;
  const base = API_URL || "";
  const url = `${base}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Failed to submit rating ${url}: ${res.status} ${res.statusText} ${errText}`);
  }
  return res.json();
}
