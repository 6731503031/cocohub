import { useEffect, useState } from "react";

export default function Dashboard(){
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/dashboard/users")
      .then(r=>r.json())
      .then(setUsers)
      .catch(console.error);
  },[]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-coconut-green">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">Users: {users.length}</div>
        <div className="bg-white p-4 rounded-xl shadow">Widget 2</div>
        <div className="bg-white p-4 rounded-xl shadow">Widget 3</div>
      </div>
    </div>
  );
}
