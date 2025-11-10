// ...existing code...
import { useEffect, useState, useMemo, useContext } from "react";
import { SearchContext } from "../SearchContext";
import { fetchNews } from "../api";

export default function News(){
  const [list, setList] = useState([]);
  const { debouncedQuery } = useContext(SearchContext);

  useEffect(()=>{
    fetchNews().then(setList).catch(console.error);
  },[]);

  const filtered = useMemo(() => {
    const q = debouncedQuery?.trim().toLowerCase() || "";
    if(!q) return list;
    return list.filter(n => {
      const text = [n.title, n.author, n.tags, n.content].join(" ").toLowerCase();
      return text.includes(q);
    });
  }, [list, debouncedQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">News & Research</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">ไม่พบผลลัพธ์ (No results found)</div>
        ) : filtered.map(n=>(
          <article key={n.id} className="bg-white p-4 rounded-xl shadow card-hover">
            <h3 className="text-xl font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{n.content}</p>
            <div className="text-xs text-neutral-1 mt-2">{n.date}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
// ...existing code...