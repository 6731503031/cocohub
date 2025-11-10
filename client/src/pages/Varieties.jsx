import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchVarieties } from "../api";
import { SearchContext } from "../SearchContext";

export default function Varieties(){
  const [items, setItems] = useState([]);
  const { debouncedQuery } = useContext(SearchContext);

  useEffect(()=>{
    let mounted = true;
    fetchVarieties()
      .then(list => { if (!mounted) return; setItems(Array.isArray(list) ? list : []); })
      .catch(err => { console.error(err); setItems([]); });
    return () => { mounted = false; };
  },[]);

  const filtered = useMemo(() => {
    const q = (debouncedQuery || "").trim().toLowerCase();
    if (!q) return items;
    return items.filter(i => {
      const text = [i.name, i.description, i.origin, i.region].filter(Boolean).join(" ").toLowerCase();
      return text.includes(q);
    });
  }, [items, debouncedQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">Varieties</h1>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-600">ไม่มีสินค้าแนะนำ</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(v => {
            const src = v.image || (Array.isArray(v.images) ? v.images[0] : null) || "/placeholder.jpg";
            return (
              <article key={v.id} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
                <div className="w-full overflow-hidden bg-gray-100" style={{ width: '100%', height: 200 }}>
                  <img
                    src={src}
                    alt={v.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.jpg'; }}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', backgroundColor: '#f3f4f6' }}
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-forest line-clamp-2">{v.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{v.description || ""}</p>

                  <div className="mt-3 flex gap-2">
                    <Link to={`/variety/${v.id}`} className="inline-block text-sm px-3 py-2 bg-coconut-green text-white rounded-lg">ดูรายละเอียด</Link>
                    {/* optional: link to related products */}
                    <Link to={`/market?variety=${encodeURIComponent(v.name)}`} className="inline-block text-sm px-3 py-2 border rounded-lg text-forest">ดูสินค้า</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}