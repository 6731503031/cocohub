// ...existing code...
import { useEffect, useState, useMemo, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { fetchVarieties } from "../api";

export default function Varieties(){
  const [items, setItems] = useState([]);
  const { debouncedQuery } = useContext(SearchContext);

  useEffect(()=>{
    fetchVarieties().then(setItems).catch(console.error);
  },[]);

  const filtered = useMemo(() => {
    const q = debouncedQuery?.trim().toLowerCase() || "";
    if(!q) return items;
    return items.filter(v => {
      return [v.name, v.type, v.planting, v.description].join(" ").toLowerCase().includes(q);
    });
  }, [items, debouncedQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">Varieties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">ไม่พบผลลัพธ์ (No results found)</div>
        ) : filtered.map(v=>(
          <article key={v.id} className="bg-white rounded-2xl shadow-soft-lg overflow-hidden card-hover">
            <div className="h-48 w-full overflow-hidden">
              <img src={v.image || '/placeholder.jpg'} alt={v.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-forest">{v.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{v.description}</p>
              <div className="mt-3 text-sm text-neutral-1">
                <div><strong>Planting:</strong> {v.planting}</div>
                <div><strong>Taste:</strong> {v.taste}</div>
                <div><strong>Processing:</strong> {v.processing}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Placeholder map */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-6" style={{height:256}}>
        <div className="flex items-center justify-center h-full text-gray-600 italic">
          * Placeholder Map (Leaflet/Mapbox) — แสดงชั้นข้อมูล (GeoJSON) จุดเพาะปลูก/สายพันธุ์
        </div>
      </div>
    </div>
  );
}
// ...existing code...