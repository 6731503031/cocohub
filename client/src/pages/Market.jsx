import { useEffect, useState } from "react";

export default function Market(){
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch("https://effective-goggles-x5pv5w6w59jw2vp94-4000.app.github.dev/products")
      .then(r=>r.json())
      .then(setProducts)
      .catch(console.error);
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-coconut-green mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p=>(
          <div key={p.id} className="bg-white rounded-2xl shadow p-4 flex flex-col card-hover">
            <img src={p.image || '/placeholder.jpg'} alt={p.name} className="w-full h-44 object-cover rounded-xl"/>
            <div className="mt-3 flex-1">
              <h3 className="text-lg font-semibold text-forest">{p.name}</h3>
              <p className="text-gray-600 mt-1">{p.description}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-green-700 font-bold">฿{p.price}</span>
              <a className="bg-coconut-green text-white px-3 py-2 rounded-lg" href={p.contact || '#'} target="_blank" rel="noreferrer">Contact Seller</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
