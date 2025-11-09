import { useEffect, useState } from "react";

export default function News(){
  const [list, setList] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/news")
      .then(r=>r.json())
      .then(setList)
      .catch(console.error);
  },[]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">News & Research</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map(n=>(
          <article key={n.id} className="bg-white p-4 rounded-xl shadow card-hover">
            <h3 className="text-xl font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{n.content}</p>
            <div className="text-xs text-neutral-1 mt-2">{n.date}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
