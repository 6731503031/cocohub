import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProducts } from "../api";
import StarRating from "./StarRating";

/**
 * ProductDetail component
 * - Fetches products list and finds product by id param
 * - Displays vertical image gallery, details, ingredients, usage instructions,
 *   certification badges, contact button, related products
 *
 * Expects product shape:
 * {
 *   id, name, images: [], description, price, rating,
 *   producer, producerLocation, ingredients: [], usage: [], certifications: [], isAvailable
 * }
 */
export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts()
      .then((list) => {
        if (!mounted) return;
        setAll(list || []);
        const found = (list || []).find(p => String(p.id) === String(id));
        setProduct(found || null);

        // compute related products (category -> producer -> fallback)
        const computeRelated = (items, current) => {
          if (!current || !Array.isArray(items)) return [];
          const others = items.filter(p => String(p.id) !== String(current.id));
          // try same category first
          const byCategory = others.filter(p => current.category && p.category && p.category === current.category);
          if (byCategory.length > 0) return byCategory.slice(0, 4);
          // then same producer
          const byProducer = others.filter(p => current.producer && p.producer && p.producer === current.producer);
          if (byProducer.length > 0) return byProducer.slice(0, 4);
          // fallback: closest price (optional) or first few
          return others.slice(0, 4);
        };

        setRelated(computeRelated(list || [], found));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-600">กำลังโหลด...</div>;
  if (!product) return (
    <div className="p-6">
      <button onClick={() => nav(-1)} className="mb-4 text-sm text-coconut-green underline">← ย้อนกลับ</button>
      <div className="text-center text-gray-600">Product not found. <Link to="/market" className="text-coconut-green underline">กลับไปที่แคตตาล็อก</Link></div>
    </div>
  );

  const {
    name, images = [], image, description, price = 0, rating = 0,
    producer, producerLocation, ingredients = [], usage = [], certifications = [], contact
  } = product;

  // normalize: accept either `images` (array) or single `image` (string)
  const imagesList = (Array.isArray(images) && images.length > 0)
    ? images
    : (image ? [image] : []);

  const currentRating = Number(product.rating || 0);

  return (
    <div className="p-6">
      <div className="mb-4">
        <button onClick={() => nav(-1)} className="text-sm text-coconut-green underline">← ย้อนกลับ</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: fixed-size image gallery 639x256 px per image */}
        <div className="space-y-3">
          {imagesList.length === 0 ? (
            <div className="w-full mx-auto overflow-hidden bg-gray-100" style={{ width: '100%', maxWidth: 639, height: 256 }}>
              <img src="/placeholder.jpg" alt={name} className="w-full h-full object-cover rounded-xl shadow" loading="lazy" />
            </div>
          ) : (
            imagesList.map((src, idx) => (
              <figure key={idx} className="overflow-hidden rounded-xl shadow mx-auto" style={{ width: '100%', maxWidth: 639, height: 256 }}>
                <img
                  src={src}
                  alt={`${name} ${idx+1}`}
                  className="w-full h-full"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.jpg'; }}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', backgroundColor: '#f3f4f6' }}
                />
              </figure>
            ))
          )}
        </div>

        {/* Right: Product info */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h1 className="text-2xl font-bold text-forest">{name}</h1>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* static (non-editable) rating */}
              <StarRating rating={currentRating} size={20} />
            </div>

            <div className="text-2xl font-bold text-green-700">
              ฿{Number(price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-400">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5 2.5 2.5 0 0112 11.5z" fill="currentColor" />
            </svg>
            <div>
              {producer} {producerLocation ? <span className="text-gray-500">• {producerLocation}</span> : null}
            </div>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">{description}</p>

          {/* Ingredients */}
          {ingredients && ingredients.length > 0 && (
            <section className="mt-4">
              <h3 className="font-semibold text-forest">ส่วนผสม</h3>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </section>
          )}

          {/* Usage instructions */}
          {usage && usage.length > 0 && (
            <section className="mt-4">
              <h3 className="font-semibold text-forest">วิธีใช้ / คำแนะนำ</h3>
              <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-1">
                {usage.map((u, i) => <li key={i}>{u}</li>)}
              </ol>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mt-4">
              <h3 className="font-semibold text-forest">การรับรอง</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {certifications.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" className="text-green-600">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="currentColor"/>
                    </svg>
                    {c}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={contact || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-coconut-green text-white px-4 py-2 rounded-lg text-center"
            >
              ติดต่อผู้ขาย
            </a>

            <button onClick={() => window.print()} className="inline-block border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700">พิมพ์</button>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-forest mb-4">สินค้าแนะนำ</h2>
        {related.length === 0 ? (
          <div className="text-gray-600">ไม่มีสินค้าแนะนำ</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/product/${r.id}`} className="bg-white rounded-xl p-3 shadow hover:shadow-md transition-card">
                <div className="w-full overflow-hidden bg-gray-100" style={{ height: 128 }}>
                  <img
                    src={r.image || r.images?.[0] || '/placeholder.jpg'}
                    alt={r.name}
                    className="w-full h-full rounded-md"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.jpg'; }}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', backgroundColor: '#f3f4f6' }}
                  />
                </div>
                <div className="mt-2">
                  <div className="text-sm font-semibold text-forest">{r.name}</div>
                  <div className="text-sm text-gray-500 mt-1">฿{Number(r.price || 0).toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}