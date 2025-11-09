-- ตาราง Varieties (สายพันธุ์มะพร้าว)
CREATE TABLE IF NOT EXISTS varieties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    cultivation TEXT,
    taste TEXT,
    processing TEXT,
    image TEXT
);

INSERT INTO varieties (name, description, cultivation, taste, processing, image) VALUES
('Nam Hom Coconut', 'Aromatic Thai coconut', 'Thailand, Northeast', 'Sweet, Fragrant', 'Oil, Water, Desserts', 'images/namhom.jpg'),
('Maphrao Thong', 'Golden coconut', 'Central Thailand', 'Nutty, Rich', 'Oil, Desserts', 'images/maphraothong.jpg');

-- ตาราง Products (Market)
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    image TEXT
);

INSERT INTO products (name, description, price, image) VALUES
('Coconut Water 1L', 'Fresh coconut water', 40.0, 'images/coconutwater.jpg'),
('Coconut Oil 500ml', 'Pure coconut oil', 150.0, 'images/coconutoil.jpg');

-- ตาราง News & Research
CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    date TEXT
);

INSERT INTO news (title, content, date) VALUES
('New Coconut Variety Released', 'Researchers have released a new coconut variety with higher yield.', '2025-10-01'),
('Coconut Market Trends', 'Analysis of coconut prices and market demand.', '2025-11-01');

-- ตาราง Dashboard (Admin / User simplified)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    role TEXT,
    email TEXT
);

INSERT INTO users (username, role, email) VALUES
('admin', 'admin', 'admin@example.com'),
('farmer1', 'user', 'farmer1@example.com');
