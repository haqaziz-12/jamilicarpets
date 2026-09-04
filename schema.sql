-- ===== Jamili Carpets — D1 Database Schema =====
-- Run this in Cloudflare D1 to create the database tables

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  collection TEXT NOT NULL,
  size TEXT NOT NULL,
  quality TEXT NOT NULL,
  origin TEXT NOT NULL,
  pile TEXT NOT NULL,
  description TEXT NOT NULL,
  colors TEXT DEFAULT '[]',
  img_front TEXT DEFAULT '',
  img_back TEXT DEFAULT '',
  img_detail TEXT DEFAULT '',
  featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Inquiries (quote requests) table
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  country TEXT DEFAULT '',
  product TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Messages (contact form) table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Insert default admin user (CHANGE PASSWORD IMMEDIATELY)
INSERT OR IGNORE INTO admin_users (username, password) VALUES ('admin', 'jamili2026');

-- Insert sample products
INSERT OR IGNORE INTO products (id, name, collection, size, quality, origin, pile, description, colors, featured) VALUES
('classic-1', 'Khal Mohammadi Royal', 'classic', "6' x 9' (183 x 274 cm)", 'Super Fine', 'Kabul, Afghanistan', '3mm', 'A deep red hand-knotted masterpiece featuring traditional Afghan geometric motifs.', '["red"]', 1),
('classic-2', 'Kazak Heritage', 'classic', "5' x 7' (152 x 213 cm)", 'Fine', 'Kabul, Afghanistan', '4mm', 'Classic Kazak design with bold geometric patterns in warm earth tones.', '["red","gold"]', 0),
('classic-3', 'Chobi Ziegler', 'classic', "8' x 10' (244 x 305 cm)", 'Fine', 'Kabul, Afghanistan', '2mm', 'Soft, natural-toned carpet with elegant and subtle designs.', '["cream","gold"]', 1),
('classic-4', 'Aqcha Traditional', 'classic', "4' x 6' (122 x 183 cm)", 'Standard', 'Kabul, Afghanistan', '3mm', 'Classic Afghan Aqcha design with symmetrical patterns in olive and gold tones.', '["green","gold"]', 0),
('contemporary-1', 'Modern Mazar', 'contemporary', "6' x 9' (183 x 274 cm)", 'Fine', 'Kabul, Afghanistan', '2mm', 'A contemporary interpretation of traditional Afghan patterns with a muted, modern color palette.', '["neutral","blue"]', 1),
('contemporary-2', 'Silk Road Modern', 'contemporary', "8' x 11' (244 x 335 cm)", 'Super Fine', 'Kabul, Afghanistan', '1mm', 'Inspired by the ancient Silk Road trade routes, this contemporary carpet blends traditional motifs with a refined, understated color scheme.', '["neutral","gold"]', 0),
('contemporary-3', 'Kabul Contemporary', 'contemporary', "5' x 8' (152 x 244 cm)", 'Fine', 'Kabul, Afghanistan', '2mm', 'A modern take on classic Kabul carpet designs, featuring simplified geometric patterns in contemporary blue and neutral tones.', '["blue","neutral"]', 0),
('mamluk-1', 'Mamluk Medallion', 'mamluk', "6' x 9' (183 x 274 cm)", 'Super Fine', 'Kabul, Afghanistan', '2mm', 'Inspired by 15th-century Mamluk dynasty carpets, this piece features an intricate central medallion surrounded by complex geometric borders.', '["red","blue","gold"]', 1),
('mamluk-2', 'Mamluk Star', 'mamluk', "8' x 10' (244 x 305 cm)", 'Super Fine', 'Kabul, Afghanistan', '2mm', 'A stunning Mamluk design featuring star-shaped medallions and intricate geometric interplay.', '["blue","gold"]', 0),
('mamluk-3', 'Cairo Mamluk', 'mamluk', "4' x 6' (122 x 183 cm)", 'Fine', 'Kabul, Afghanistan', '3mm', 'A smaller Mamluk-inspired carpet with the signature complex geometry and rich color palette.', '["red","gold"]', 0),
('kilim-1', 'Kilim Tribal', 'kilim', "5' x 7' (152 x 213 cm)", 'Standard', 'Kabul, Afghanistan', '1mm', 'Flat-woven Kilim with bold tribal patterns and vibrant colors.', '["red","multi"]', 1),
('kilim-2', 'Kilim Geometric', 'kilim', "6' x 9' (183 x 274 cm)", 'Fine', 'Kabul, Afghanistan', '1mm', 'A geometric Kilim with sharp lines and striking color combinations.', '["multi"]', 0),
('kilim-3', 'Kilim Runner', 'kilim', "3' x 10' (91 x 305 cm)", 'Standard', 'Kabul, Afghanistan', '1mm', 'A long, narrow Kilim runner perfect for hallways and corridors.', '["red","gold"]', 0),
('geometric-1', 'Tribal Geometry', 'geometric', "6' x 9' (183 x 274 cm)", 'Fine', 'Kabul, Afghanistan', '3mm', 'Bold geometric patterns with sharp lines and striking symmetry.', '["red","blue"]', 1),
('geometric-2', 'Diamond Pattern', 'geometric', "5' x 7' (152 x 213 cm)", 'Fine', 'Kabul, Afghanistan', '4mm', 'A geometric carpet featuring repeated diamond motifs in deep blue and gold.', '["blue","gold"]', 0),
('geometric-3', 'Hexagon Tribal', 'geometric', "8' x 10' (244 x 305 cm)", 'Super Fine', 'Kabul, Afghanistan', '3mm', 'An intricate hexagonal geometric pattern with multi-color natural dye palette.', '["multi"]', 0);
