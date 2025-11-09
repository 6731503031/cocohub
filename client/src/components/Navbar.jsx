import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Navbar(){
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-coconut-green text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button onClick={()=>setOpen(true)} className="p-2 rounded-md hover:bg-coconut-bark-40/30">
              <HiMenu className="w-6 h-6"/>
            </button>
            <Link to="/" className="text-lg font-bold flex items-center gap-2">
              <span className="text-coconut-cream">🌴</span>
              <span className="hidden sm:inline">CocoHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/varieties" className="hover:underline">Varieties</Link>
            <Link to="/market" className="hover:underline">Market</Link>
            <Link to="/price-tracker" className="hover:underline">Market Price</Link>
            <Link to="/news" className="hover:underline">News</Link>
          </nav>

          <div className="hidden sm:flex gap-3">
            <Link to="/login" className="bg-white text-coconut-green px-3 py-1 rounded-lg font-medium">Login</Link>
            <Link to="/register" className="text-white px-3 py-1 border border-white rounded-lg">Register</Link>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div className={`fixed inset-0 z-40 transition-all ${open ? "visible" : "pointer-events-none"}`}>
        <div onClick={()=>setOpen(false)} className={`absolute inset-0 bg-black/30 ${open ? "opacity-100" : "opacity-0"} transition`} />
        <aside className={`absolute left-0 top-0 bottom-0 w-64 bg-ivory-1 shadow-lg transform ${open ? "translate-x-0" : "-translate-x-full"} transition`}>
          <div className="p-4 flex items-center justify-between">
            <h2 className="font-bold text-lg text-coconut-green">Menu</h2>
            <button onClick={()=>setOpen(false)} className="p-1 rounded-full hover:bg-gray-200">
              <HiX />
            </button>
          </div>
          <nav className="flex flex-col gap-3 p-4">
            <Link to="/" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">Home</Link>
            <Link to="/varieties" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">Varieties</Link>
            <Link to="/market" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">Market</Link>
            <Link to="/price-tracker" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">Market Price</Link>
            <Link to="/news" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">News</Link>
            <Link to="/dashboard" onClick={()=>setOpen(false)} className="py-2 px-3 rounded hover:bg-gray-100">Dashboard</Link>
          </nav>
        </aside>
      </div>
    </>
  );
}
