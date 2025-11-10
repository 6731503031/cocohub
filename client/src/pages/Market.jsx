import React, { useEffect, useState, useMemo, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

export default function Market(){
  const [products, setProducts] = useState([]);
  const { debouncedQuery } = useContext(SearchContext);

  useEffect(()=>{
    let mounted = true;
    fetchProducts()
      .then(list => {
        if (!mounted) return;
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch(err => {
        console.error(err);
        setProducts([]);
      });
    return () => { mounted = false; };
  },[]);

  const available = useMemo(() => products.filter(p => p.isAvailable !== false), [products]);

  const filtered = useMemo(() => {
    const q = debouncedQuery?.trim().toLowerCase() || "";
    if (!q) return available;
    return available.filter(p => {
      const text = [p.name, p.category, p.producer, p.description].join(" ").toLowerCase();
      return text.includes(q);
    });
  }, [available, debouncedQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">ผลิตภัณฑ์จากมะพร้าว</h1>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">ไม่พบผลลัพธ์ (No results found)</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}