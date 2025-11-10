import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const {
    id, name, image, images, price = 0, rating = 0, producer
  } = product || {};
  const src = image || (Array.isArray(images) ? images[0] : null) || "/placeholder.jpg";
  const priceText = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(price || 0));

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
      style={{ width: 418, maxWidth: '100%' }}
    >
      {/* fixed image area 418x200 */}
      <div className="w-full overflow-hidden bg-gray-100" style={{ width: '100%', height: 200 }}>
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.jpg'; }}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block', backgroundColor: '#f3f4f6' }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-forest line-clamp-2">{name}</h3>
          <div className="text-green-700 font-bold">{priceText}</div>
        </div>

        <div className="flex items-center justify-between">
          <StarRating rating={Number(rating || 0)} size={16} />
          <div className="text-sm text-gray-500">{producer}</div>
        </div>

        <div className="mt-3">
          <Link to={`/product/${id}`} className="inline-block w-full text-center bg-coconut-green text-white px-3 py-2 rounded-lg">
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </article>
  );
}