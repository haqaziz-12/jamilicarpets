// ===== Product Data =====
// This will be replaced by the admin panel / D1 database in production
// For now, it serves as the static data source

const COLLECTIONS = {
  classic: {
    name: 'Classic Collection',
    description: 'Time-honored Afghan designs featuring deep reds, traditional geometric motifs, and the rich heritage of Khal Mohammadi and Kazak patterns. These carpets carry the soul of Afghan carpet-making in every knot.'
  },
  contemporary: {
    name: 'Afghan Contemporary Collection',
    description: 'Modern interpretations of classic Afghan patterns. Softer palettes, simplified motifs, and contemporary color combinations that bridge the gap between traditional craftsmanship and modern interior design.'
  },
  mamluk: {
    name: 'Mamluk Collection',
    description: 'Inspired by the grand Mamluk dynasty carpets of the 15th and 16th centuries. Intricate geometric medallions, complex color palettes, and breathtaking symmetry that transforms any space into a gallery.'
  },
  kilim: {
    name: 'Kilim Collection',
    description: 'Flat-woven masterpieces — no pile, bold patterns, and vibrant colors. Lightweight and versatile, Kilims work beautifully as floor coverings, wall hangings, or decorative throws in any setting.'
  },
  geometric: {
    name: 'Geometric Collection',
    description: 'Bold geometric patterns with sharp lines, striking symmetry, and powerful tribal symbolism. A celebration of the geometric artistry that has defined Afghan and Central Asian carpet design for centuries.'
  }
};

const PRODUCTS = [
  // Classic Collection
  { id: 'classic-1', name: 'Khal Mohammadi Royal', collection: 'classic', size: "6' x 9' (183 x 274 cm)", quality: 'Super Fine', origin: 'Kabul, Afghanistan', pile: '3mm', colors: ['red'], featured: true, description: 'A deep red hand-knotted masterpiece featuring traditional Afghan geometric motifs. The Khal Mohammadi style is one of Afghanistan\'s most iconic carpet designs, known for its rich color and exceptional durability.' },
  { id: 'classic-2', name: 'Kazak Heritage', collection: 'classic', size: "5' x 7' (152 x 213 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '4mm', colors: ['red', 'gold'], featured: false, description: 'Classic Kazak design with bold geometric patterns in warm earth tones. Hand-knotted with premium Ghazni wool using natural plant-based dyes.' },
  { id: 'classic-3', name: 'Chobi Ziegler', collection: 'classic', size: "8' x 10' (244 x 305 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '2mm', colors: ['cream', 'gold'], featured: true, description: 'Soft, natural-toned carpet with elegant and subtle designs. The Chobi Ziegler style combines traditional Afghan weaving with softer, more muted color palettes perfect for modern interiors.' },
  { id: 'classic-4', name: 'Aqcha Traditional', collection: 'classic', size: "4' x 6' (122 x 183 cm)", quality: 'Standard', origin: 'Kabul, Afghanistan', pile: '3mm', colors: ['green', 'gold'], featured: false, description: 'Classic Afghan Aqcha design with symmetrical patterns in olive and gold tones. A versatile carpet that works in both traditional and contemporary settings.' },

  // Afghan Contemporary Collection
  { id: 'contemporary-1', name: 'Modern Mazar', collection: 'contemporary', size: "6' x 9' (183 x 274 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '2mm', colors: ['neutral', 'blue'], featured: true, description: 'A contemporary interpretation of traditional Afghan patterns with a muted, modern color palette. Perfect for minimalist and modern interior spaces.' },
  { id: 'contemporary-2', name: 'Silk Road Modern', collection: 'contemporary', size: "8' x 11' (244 x 335 cm)", quality: 'Super Fine', origin: 'Kabul, Afghanistan', pile: '1mm', colors: ['neutral', 'gold'], featured: false, description: 'Inspired by the ancient Silk Road trade routes, this contemporary carpet blends traditional motifs with a refined, understated color scheme.' },
  { id: 'contemporary-3', name: 'Kabul Contemporary', collection: 'contemporary', size: "5' x 8' (152 x 244 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '2mm', colors: ['blue', 'neutral'], featured: false, description: 'A modern take on classic Kabul carpet designs, featuring simplified geometric patterns in contemporary blue and neutral tones.' },

  // Mamluk Collection
  { id: 'mamluk-1', name: 'Mamluk Medallion', collection: 'mamluk', size: "6' x 9' (183 x 274 cm)", quality: 'Super Fine', origin: 'Kabul, Afghanistan', pile: '2mm', colors: ['red', 'blue', 'gold'], featured: true, description: 'Inspired by 15th-century Mamluk dynasty carpets, this piece features an intricate central medallion surrounded by complex geometric borders. A true showpiece for any space.' },
  { id: 'mamluk-2', name: 'Mamluk Star', collection: 'mamluk', size: "8' x 10' (244 x 305 cm)", quality: 'Super Fine', origin: 'Kabul, Afghanistan', pile: '2mm', colors: ['blue', 'gold'], featured: false, description: 'A stunning Mamluk design featuring star-shaped medallions and intricate geometric interplay. The complex color palette uses natural dyes to achieve extraordinary depth.' },
  { id: 'mamluk-3', name: 'Cairo Mamluk', collection: 'mamluk', size: "4' x 6' (122 x 183 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '3mm', colors: ['red', 'gold'], featured: false, description: 'A smaller Mamluk-inspired carpet with the signature complex geometry and rich color palette. Perfect for entryways, studies, or as a wall hanging.' },

  // Kilim Collection
  { id: 'kilim-1', name: 'Kilim Tribal', collection: 'kilim', size: "5' x 7' (152 x 213 cm)", quality: 'Standard', origin: 'Kabul, Afghanistan', pile: '1mm', colors: ['red', 'multi'], featured: true, description: 'Flat-woven Kilim with bold tribal patterns and vibrant colors. No pile — lightweight, versatile, and perfect for layering or as a wall hanging.' },
  { id: 'kilim-2', name: 'Kilim Geometric', collection: 'kilim', size: "6' x 9' (183 x 274 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '1mm', colors: ['multi'], featured: false, description: 'A geometric Kilim with sharp lines and striking color combinations. The flat-weave technique creates a crisp, graphic look that works in modern and traditional spaces.' },
  { id: 'kilim-3', name: 'Kilim Runner', collection: 'kilim', size: "3' x 10' (91 x 305 cm)", quality: 'Standard', origin: 'Kabul, Afghanistan', pile: '1mm', colors: ['red', 'gold'], featured: false, description: 'A long, narrow Kilim runner perfect for hallways and corridors. Bold tribal patterns in warm red and gold tones.' },

  // Geometric Collection
  { id: 'geometric-1', name: 'Tribal Geometry', collection: 'geometric', size: "6' x 9' (183 x 274 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '3mm', colors: ['red', 'blue'], featured: true, description: 'Bold geometric patterns with sharp lines and striking symmetry. A celebration of tribal artistry that makes a powerful statement in any room.' },
  { id: 'geometric-2', name: 'Diamond Pattern', collection: 'geometric', size: "5' x 7' (152 x 213 cm)", quality: 'Fine', origin: 'Kabul, Afghanistan', pile: '4mm', colors: ['blue', 'gold'], featured: false, description: 'A geometric carpet featuring repeated diamond motifs in deep blue and gold. The precise symmetry showcases the skill of our master weavers.' },
  { id: 'geometric-3', name: 'Hexagon Tribal', collection: 'geometric', size: "8' x 10' (244 x 305 cm)", quality: 'Super Fine', origin: 'Kabul, Afghanistan', pile: '3mm', colors: ['multi'], featured: false, description: 'An intricate hexagonal geometric pattern with multi-color natural dye palette. A stunning centerpiece for large living spaces.' }
];
