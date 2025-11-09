import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PriceTracker(){
  const [data, setData] = useState(null);

  useEffect(()=>{
    fetch("https://effective-goggles-x5pv5w6w59jw2vp94-4000.app.github.dev/market")
      .then(r=>r.json())
      .then(rows=>{
        // assume rows like [{product_name, price_per_kg, date}, ...]
        // group by product_name -> create labels & series (example for first product)
        const grouped = {};
        rows.forEach(r=>{
          if(!grouped[r.product_name]) grouped[r.product_name] = [];
          grouped[r.product_name].push({ date: r.date, price: r.price_per_kg });
        });
        // build simple dataset for first product found
        const names = Object.keys(grouped);
        if(names.length === 0) { setData({labels:[], datasets:[]}); return; }
        const first = grouped[names[0]].sort((a,b)=> a.date.localeCompare(b.date));
        setData({
          labels: first.map(f=>f.date),
          datasets: [{ label: names[0], data: first.map(f=>f.price), borderColor: '#759544', backgroundColor: 'rgba(117,149,68,0.08)' }]
        });
      })
      .catch(console.error);
  },[]);

  if(!data) return <div className="p-6">Loading chart...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-coconut-green mb-4">Market Price Tracker</h1>
      <div className="bg-white p-4 rounded-xl shadow-soft-lg">
        <Line data={data} />
      </div>
    </div>
  );
}
