import { useEffect, useState } from "react";

export default function Varieties(){
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/varieties")
      .then(r=>r.json())
      .then(setItems)
      .catch(console.error);
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">Varieties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(v=>(
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
    </div>
  );
}
