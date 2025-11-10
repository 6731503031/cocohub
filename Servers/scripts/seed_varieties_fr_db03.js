import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

async function openDb() {
  const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "cocohub.db");
  return open({ filename: dbPath, driver: sqlite3.Database });
}

async function ensureColumn(db, table, column, def = "TEXT") {
  const infos = await db.all(`PRAGMA table_info(${table})`);
  if (!infos.find(i => i.name === column)) {
    await db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`);
    console.log(`Added column ${column} to ${table}`);
  }
}

async function upsertVariety(db, v) {
  // find by name (fallback)
  const existing = await db.get("SELECT rowid, * FROM varieties WHERE name = ?", v.name);
  const plantingJson = JSON.stringify(v.planting_sites || []);
  if (existing) {
    await db.run(
      `UPDATE varieties SET
        description = ?,
        region = ?,
        upstream = ?,
        midstream = ?,
        downstream = ?,
        botanical_traits = ?,
        planting_sites = ?
      WHERE rowid = ?`,
      v.description, v.region, v.upstream, v.midstream, v.downstream, v.botanical_traits, plantingJson, existing.rowid
    );
    console.log("Updated variety:", v.name);
  } else {
    await db.run(
      `INSERT INTO varieties (name, description, region, upstream, midstream, downstream, botanical_traits, planting_sites)
       VALUES (?,?,?,?,?,?,?,?)`,
      v.name, v.description, v.region, v.upstream, v.midstream, v.downstream, v.botanical_traits, plantingJson
    );
    console.log("Inserted variety:", v.name);
  }
}

async function main() {
  const db = await openDb();

  // ensure columns exist
  await ensureColumn(db, "varieties", "region", "TEXT");
  await ensureColumn(db, "varieties", "upstream", "TEXT");
  await ensureColumn(db, "varieties", "midstream", "TEXT");
  await ensureColumn(db, "varieties", "downstream", "TEXT");
  await ensureColumn(db, "varieties", "botanical_traits", "TEXT");
  await ensureColumn(db, "varieties", "planting_sites", "TEXT"); // store JSON

  // sample FR-DB03 entries
  const samples = [
    {
      name: "Nam Hom (น้ำหอม)",
      description: "มะพร้าวพันธุ์น้ำหอม ให้รสและกลิ่นหอม เหมาะสำหรับบริโภคสดและแปรรูป",
      region: "ภาคใต้ (นครศรีธรรมราช)",
      upstream: "การปลูกต้นกล้า คัดเลือกดินร่วน ระบายน้ำดี ผสมน้ำหมัก",
      midstream: "การเก็บเกี่ยวและคัดเกรด ผลิตภัณฑ์สดและแช่เย็น",
      downstream: "แปรรูปเป็นน้ํามะพร้าว เครื่องดื่ม และของหวาน",
      botanical_traits: "ต้นสูงปานกลาง ใบยาว โคนกะลามีเนื้อหนา เนื้อขาวรสหวาน",
      planting_sites: [
        { name: "NamHom Farm - Block A", lat: 8.430, lng: 99.963, note: "พื้นที่ทดลอง organics" },
        { name: "NamHom Farm - Block B", lat: 8.435, lng: 99.958, note: "พื้นที่ผลิตเชิงพาณิชย์" }
      ]
    },
    {
      name: "Maphorao Thong (มะโพธิ์ทอง)",
      description: "มะพร้าวพันธุ์มะโพธิ์ทอง เหมาะสำหรับผลิตน้ำมันและแปรรูป",
      region: "ภาคใต้ (สุราษฎร์ธานี)",
      upstream: "ปลูกบนเนินเล็ก ระบายน้ำดี ใช้ปุ๋ยอินทรีย์เสริม",
      midstream: "การเก็บเกี่ยวแบบแมนนวลและเครื่องจักรสำหรับผลขนาดใหญ่",
      downstream: "ผลิตน้ำมันมะพร้าวและเนื้อมะพร้าวอบแห้ง",
      botanical_traits: "ผลขนาดกลาง-ใหญ่ เนื้อแน่น เปลือกหนา ทนแล้งปานกลาง",
      planting_sites: [
        { name: "Maphorao Estate", lat: 9.150, lng: 99.300, note: "แปลงใหญ่เชิงพาณิชย์" }
      ]
    },
    {
      name: "Coconut Water (น้ำมะพร้าวสำหรับเครื่องดื่ม)",
      description: "สายพันธุ์คัดสำหรับการผลิตน้ำมะพร้าวบรรจุขวด",
      region: "หลากหลายภูมิภาค",
      upstream: "แปลงปลูกเพื่อให้ผลน้ำเยอะ คัดพันธุ์และการให้น้ำ",
      midstream: "เก็บผลอ่อนและแช่เย็นทันทีเพื่อรักษาคุณภาพ",
      downstream: "บรรจุขวด แปรรูปเป็นเครื่องดื่มพร้อมดื่ม",
      botanical_traits: "ให้ผลน้ำมาก ผลขนาดเล็กถึงกลาง เปลือกบาง",
      planting_sites: [
        { name: "CocoFresh Planting 1", lat: 8.103, lng: 99.955, note: "โรงเรือนทดลอง" }
      ]
    }
  ];

  for (const v of samples) {
    await upsertVariety(db, v);
  }

  await db.close();
  console.log("Seeding complete.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});