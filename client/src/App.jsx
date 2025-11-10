import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Varieties from "./pages/Varieties";
import Market from "./pages/Market";
import News from "./pages/์News";
import PriceTracker from "./pages/PriceTracker";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/market" element={<Market />} />
          <Route path="/news" element={<News />} />
          <Route path="/price-tracker" element={<PriceTracker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
