import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchVarieties } from "../api";

export default function VarietyDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variety, setVariety] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchVarieties()
      .then((list) => {
        if (!mounted) return;
        const found = (list || []).find((item) => String(item.id) === String(id));
        setVariety(found || null);
      })
      .catch((err) => {
        console.error(err);
        setVariety(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return <div className="p-6 text-center text-gray-600 text-lg">กำลังโหลด...</div>;

  if (!variety)
    return (
      <div className="p-6">
        <button
          onClick={() => nav(-1)}
          className="mb-4 text-base text-coconut-green underline"
        >
          ← ย้อนกลับ
        </button>
        <div className="text-center text-gray-600 text-lg">
          ไม่พบสายพันธุ์ที่ร้องขอ
        </div>
      </div>
    );

  // รูปภาพ
  const images = Array.isArray(variety.images)
    ? variety.images
    : variety.image
    ? [variety.image]
    : [];
  const img = images[0] || "/placeholder.jpg";

  // พื้นที่ปลูก (JSON)
  let plantingSites = [];
  try {
    if (variety.planting_sites) {
      plantingSites = JSON.parse(variety.planting_sites);
      if (!Array.isArray(plantingSites)) plantingSites = [variety.planting_sites];
    }
  } catch {
    plantingSites = [variety.planting_sites];
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => nav(-1)}
          className="text-base text-coconut-green underline"
        >
          ← ย้อนกลับ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* รูปภาพ */}
        <div>
          <div
            className="overflow-hidden rounded-xl shadow mx-auto"
            style={{ width: "100%", maxWidth: 639, height: 320 }}
          >
            <img
              src={img}
              alt={variety.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.jpg";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                backgroundColor: "#f3f4f6",
              }}
            />
          </div>
        </div>

        {/* การ์ดรายละเอียด */}
        <div className="bg-white rounded-2xl p-8 shadow min-h-[400px] flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-forest">{variety.name}</h1>
            <p className="mt-3 text-lg text-gray-700 leading-relaxed">
              {variety.description || "ไม่มีคำอธิบาย"}
            </p>

            <div className="mt-6 space-y-3 text-lg text-gray-800">
              <div>
                <span className="font-semibold text-gray-900">ภูมิภาค:</span>{" "}
                {variety.region || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">สายการผลิตต้นน้ำ:</span>{" "}
                {variety.upstream || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">สายการผลิตกลางน้ำ:</span>{" "}
                {variety.midstream || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">สายการผลิตปลายน้ำ:</span>{" "}
                {variety.downstream || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">ลักษณะทางพฤกษศาสตร์:</span>{" "}
                {variety.botanical_traits || "-"}
              </div>
              <div>
                <span className="font-semibold text-gray-900">พื้นที่ปลูกแนะนำ:</span>{" "}
                {plantingSites.length > 0
                  ? plantingSites.join(", ")
                  : "ไม่มีข้อมูล"}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              to={`/market?variety=${encodeURIComponent(variety.name)}`}
              className="inline-block bg-coconut-green text-white text-lg font-medium px-5 py-3 rounded-lg hover:bg-green-700 transition"
            >
              ดูสินค้าเกี่ยวกับสายพันธุ์นี้
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
