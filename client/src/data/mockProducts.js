const mockProducts = [
  {
    id: "P001",
    name: "Coconut Water 1L",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ntCGDIRwxPHPBVExumUD_bslRvhpf8XHbQ&s",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ntCGDIRwxPHPBVExumUD_bslRvhpf8XHbQ&s",
      "https://i.imgur.com/8Km9tLL.jpg"
    ],
    description: "น้ำมะพร้าวสด ขนาด 1 ลิตร บรรจุสุญญากาศ เก็บความสดชื่นและแร่ธาตุจากมะพร้าวแท้ เหมาะสำหรับดื่มสดและเป็นเครื่องดื่มเพื่อสุขภาพ",
    price: 45.00,
    rating: 4.5,
    producer: "CocoFresh",
    producerLocation: "จังหวัดชุมพร",
    ingredients: ["น้ำมะพร้าวสด 100%"],
    usage: ["เขย่าก่อนดื่ม", "เก็บในตู้เย็นหลังเปิดบรรจุภัณฑ์"],
    certifications: ["อย.", "GMP"],
    contact: "https://line.me/R/ti/p/@cocofresh",
    isAvailable: true,
    category: "เครื่องดื่ม"
  },
  {
    id: "P002",
    name: "Coconut Oil 500ml",
    image: "https://medias.watsons.co.th/publishing/WTCTH-BP_264904-front-zoom.jpg",
    images: [
      "https://medias.watsons.co.th/publishing/WTCTH-BP_264904-front-zoom.jpg",
      "https://i.imgur.com/5QT6X7s.jpg"
    ],
    description: "น้ำมันมะพร้าวบริสุทธิ์ 500ml เหมาะสำหรับทำอาหารและการบำรุงผิว ผสมนำมันไม่ขม กลิ่นมะพร้าวธรรมชาติ",
    price: 250.00,
    rating: 4.7,
    producer: "PureCoco",
    producerLocation: "จังหวัดกระบี่",
    ingredients: ["น้ำมันมะพร้าวสกัดเย็น 100%"],
    usage: ["ใช้ปรุงอาหาร", "ทาผิวเป็นมอยส์เจอไรเซอร์"],
    certifications: ["HACCP", "GMP"],
    contact: "mailto:info@purecoco.example",
    isAvailable: true,
    category: "น้ำมัน/สารสกัด"
  },
  {
    id: "P003",
    name: "Nam Hom Coconut",
    image: "https://copracoconuts.com/cdn/shop/articles/Untitled_design-5.png?v=1690970291&width=1100",
    images: [
      "https://copracoconuts.com/cdn/shop/articles/Untitled_design-5.png?v=1690970291&width=1100",
      "https://i.imgur.com/FYQ7ZqZ.jpg"
    ],
    description: "มะพร้าวพันธุ์น้ำหอม คุณภาพดี ให้รสหวานหอม เหมาะสำหรับการบริโภคสดและผลิตภัณฑ์แปรรูป",
    price: 120.00,
    rating: 4.3,
    producer: "NamHom Farm",
    producerLocation: "จังหวัดนครศรีธรรมราช",
    ingredients: ["มะพร้าวน้ำหอม 100%"],
    usage: ["บริโภคสด", "นำไปแปรรูปอาหารหวาน"],
    certifications: ["OTOP"],
    contact: "https://facebook.com/namhomfarm",
    isAvailable: true,
    category: "ผลสด"
  },
  {
    id: "P004",
    name: "Maphorao Thong",
    image: "https://i.ytimg.com/vi/g3j3By69B9w/hq720.jpg",
    images: [
      "https://i.ytimg.com/vi/g3j3By69B9w/hq720.jpg",
      "https://i.imgur.com/3G3z0bK.jpg"
    ],
    description: "มะพร้าวพันธุ์มะโพธิ์ทอง ผลขนาดกลางถึงใหญ่ เนื้อแน่น เหมาะสำหรับการผลิตน้ำมันและเนื้อมะพร้าวแปรรูป",
    price: 95.00,
    rating: 4.1,
    producer: "Maphorao Co.",
    producerLocation: "จังหวัดสุราษฎร์ธานี",
    ingredients: ["มะพร้าวพันธุ์มะโพธิ์ทอง"],
    usage: ["แปรรูปเป็นน้ำมัน", "ใช้ปรุงอาหาร"],
    certifications: [],
    contact: "tel:+66000000000",
    isAvailable: true,
    category: "ผลสด"
  }
];

export default mockProducts;