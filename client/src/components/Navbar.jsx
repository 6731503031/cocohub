import { useState, useRef, useEffect, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../SearchContext";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const { query, setQuery } = useContext(SearchContext);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    if (open) {
      // focus first link for keyboard accessibility
      const first = menuRef.current?.querySelector("a,button,input");
      first?.focus();
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open]);

  const navItems = [
    { to: "/", label: "หน้าแรก" },
    { to: "/market", label: "ผลิตภัณฑ์จากมะพร้าว" },
    { to: "/varieties", label: "ฐานข้อมูลสายพันธุ์" },
    { to: "/news", label: "ข่าว/บทความ/งานวิจัย" },
    { to: "/price-tracker", label: "กราฟราคากลาง" },
    { to: "/dashboard", label: "แดชบอร์ด" },
  ];

  function isActive(to){
    if(to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  }

  return (
    <>
      <header className="bg-coconut-green text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button aria-label="Open menu" onClick={()=>setOpen(true)} className="p-2 rounded-md hover:bg-white/10">
              <HiMenu className="w-6 h-6"/>
            </button>
            <Link to="/" className="text-lg font-bold flex items-center gap-2">
              <span className="text-coconut-cream">🌴</span>
              <span className="hidden sm:inline">CocoHub</span>
            </Link>
          </div>

          {/* Search - global */}
          <div className="flex-1 px-4">
            <input
              aria-label="Search"
              placeholder="ค้นหา สินค้า, บทความ, สายพันธุ์..."
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              className="w-full max-w-lg mx-auto px-3 py-2 rounded-lg text-black"
            />
          </div>

          <div className="hidden sm:flex gap-3">
            <Link to="/login" className="bg-white text-coconut-green px-3 py-1 rounded-lg font-medium">Login</Link>
            <Link to="/register" className="text-white px-3 py-1 border border-white rounded-lg">Register</Link>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div className={`fixed inset-0 z-40 transition-all ${open ? "visible" : "pointer-events-none"}`}>
        <div onClick={()=>setOpen(false)} className={`absolute inset-0 bg-black/30 ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-200`} aria-hidden="true" />
        <aside
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 top-0 bottom-0 bg-ivory-1 shadow-lg transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-out w-[80vw] max-w-[320px] md:w-[320px]`}
        >
          <div className="p-4 flex items-center justify-between">
            <h2 className="font-bold text-lg text-coconut-green">Menu</h2>
            <button aria-label="Close menu" onClick={()=>setOpen(false)} className="p-1 rounded-full hover:bg-gray-200">
              <HiX />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={()=>setOpen(false)}
                className={`py-2 px-3 rounded ${isActive(item.to) ? "bg-coconut-cream text-forest" : "hover:bg-gray-100"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}