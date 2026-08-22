export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  tag?: string;
  inStock: boolean;
  colors?: string[];
}

export const categories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Footwear",
  "Home & Living",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    id: "1",
    name: "Retro Mechanical Keyboard",
    price: 129.99,
    originalPrice: 179.99,
    description:
      "Cherry MX switches with custom brutalist keycaps. Typewriter-inspired design with modern performance. Hot-swappable switches, RGB backlighting, and USB-C connectivity.",
    category: "Electronics",
    rating: 5,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop&q=80",
    ],
    tag: "HOT",
    inStock: true,
    colors: ["#1a1a1a", "#f5f5dc", "#ff3e00"],
  },
  {
    id: "2",
    name: "Brutalist Canvas Sneakers",
    price: 89.99,
    description:
      "Hand-painted geometric patterns on premium canvas. Vulcanized rubber sole with extra grip. Limited edition run of 500 pairs.",
    category: "Footwear",
    rating: 4,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80",
    ],
    tag: "LIMITED",
    inStock: true,
    colors: ["#000000", "#ffffff", "#ff3d3d"],
  },
  {
    id: "3",
    name: "Concrete Desk Lamp",
    price: 64.99,
    originalPrice: 84.99,
    description:
      "Poured concrete base with exposed Edison bulb. Industrial design meets warm ambient lighting. Adjustable arm with 360° rotation.",
    category: "Home & Living",
    rating: 4,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Oversized Graphic Tee",
    price: 44.99,
    description:
      "100% organic cotton with bold screen-printed graphics. Boxy fit, dropped shoulders. Designed by underground street artists.",
    category: "Clothing",
    rating: 5,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop&q=80",
    ],
    tag: "BESTSELLER",
    inStock: true,
    colors: ["#1a1a1a", "#ffffff", "#ff6d43"],
  },
  {
    id: "5",
    name: "Industrial Bluetooth Speaker",
    price: 199.99,
    description:
      "Raw aluminum enclosure with exposed screws. 40W output, deep bass. 24-hour battery life. IPX5 water resistant.",
    category: "Electronics",
    rating: 5,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop&q=80",
    ],
    tag: "NEW",
    inStock: true,
  },
  {
    id: "6",
    name: "Minimalist Leather Wallet",
    price: 59.99,
    originalPrice: 79.99,
    description:
      "Full-grain vegetable-tanned leather. Slim profile with RFID blocking. Ages beautifully with use. Holds 8 cards + cash.",
    category: "Accessories",
    rating: 4,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
    colors: ["#8B4513", "#1a1a1a", "#D2691E"],
  },
  {
    id: "7",
    name: "Geometric Wall Clock",
    price: 49.99,
    description:
      "Laser-cut steel with powder coating. Silent quartz movement. 12-inch diameter. Brutalist-inspired angular design.",
    category: "Home & Living",
    rating: 3,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Deconstructed Hoodie",
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Heavyweight 400gsm cotton. Raw-edge seams, exposed stitching. Oversized hood with asymmetric zipper. Avant-garde streetwear.",
    category: "Clothing",
    rating: 4,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&h=800&fit=crop&q=80",
    ],
    tag: "SALE",
    inStock: true,
    colors: ["#1a1a1a", "#4a4a4a", "#d4d4d4"],
  },
  {
    id: "9",
    name: "USB-C Hub Station",
    price: 79.99,
    description:
      "10-in-1 docking station. Aluminum body, zero-flex design. 100W power delivery pass-through. Dual 4K HDMI output.",
    category: "Electronics",
    rating: 4,
    reviewCount: 523,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "10",
    name: "Brutalist Chain Necklace",
    price: 34.99,
    description:
      "Chunky stainless steel links with matte black finish. Adjustable length 18-22 inches. Hypoallergenic. Statement piece.",
    category: "Accessories",
    rating: 5,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80",
    ],
    tag: "TRENDING",
    inStock: true,
  },
  {
    id: "11",
    name: "High-Top Combat Boots",
    price: 149.99,
    description:
      "Full-grain leather with chunky Vibram sole. Side zip for easy on/off. Steel shank for support. Break-in time: 1 week.",
    category: "Footwear",
    rating: 5,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=800&h=800&fit=crop&q=80",
    ],
    tag: "PREMIUM",
    inStock: true,
    colors: ["#1a1a1a", "#8B4513"],
  },
  {
    id: "12",
    name: "Concrete Planter Set",
    price: 39.99,
    description:
      "Set of 3 hand-poured concrete planters. Geometric shapes with drainage holes. Perfect for succulents and air plants.",
    category: "Home & Living",
    rating: 4,
    reviewCount: 134,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "13",
    name: "Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 299.99,
    description:
      "40mm beryllium drivers. Active noise cancellation with transparency mode. 30-hour battery. Folding design with hard case.",
    category: "Electronics",
    rating: 5,
    reviewCount: 891,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop&q=80",
    ],
    tag: "TOP RATED",
    inStock: true,
    colors: ["#1a1a1a", "#c0c0c0", "#ff3e00"],
  },
  {
    id: "14",
    name: "Cargo Utility Pants",
    price: 69.99,
    description:
      "Ripstop cotton with 8 pockets. Relaxed tapered fit. Adjustable ankle cuffs. Built for function, designed for style.",
    category: "Clothing",
    rating: 4,
    reviewCount: 201,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
    colors: ["#1a1a1a", "#556B2F", "#D2B48C"],
  },
  {
    id: "15",
    name: "Architectural Sunglasses",
    price: 119.99,
    description:
      "Titanium frame with angular geometry. Polarized CR-39 lenses. UV400 protection. Comes with brutalist concrete case.",
    category: "Accessories",
    rating: 4,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop&q=80",
    ],
    tag: "NEW",
    inStock: true,
  },
  {
    id: "16",
    name: "Wireless Charging Pad",
    price: 44.99,
    description:
      "15W Qi fast charging. Terrazzo-finish surface. LED status ring. Compatible with all Qi devices. Ultra-slim 8mm profile.",
    category: "Electronics",
    rating: 3,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "17",
    name: "Platform Chelsea Boots",
    price: 134.99,
    originalPrice: 169.99,
    description:
      "Chunky 2-inch platform sole. Elastic side panels. Vegan leather upper. Pull-tab for easy entry. Cloud-cushion insole.",
    category: "Footwear",
    rating: 4,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=800&h=800&fit=crop&q=80",
    ],
    tag: "SALE",
    inStock: true,
    colors: ["#1a1a1a", "#8B0000"],
  },
  {
    id: "18",
    name: "Raw Edge Denim Jacket",
    price: 99.99,
    description:
      "14oz selvedge denim. Unfinished hems and cuffs. Copper hardware. Will develop unique fades over time. Made in Japan.",
    category: "Clothing",
    rating: 5,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop&q=80",
    ],
    tag: "ARTISAN",
    inStock: true,
    colors: ["#191970", "#1a1a1a"],
  },
  {
    id: "19",
    name: "Modular Shelf System",
    price: 189.99,
    description:
      "Powder-coated steel with birch plywood shelves. Expandable modular design. Tool-free assembly. Holds 50lbs per shelf.",
    category: "Home & Living",
    rating: 4,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=800&fit=crop&q=80",
    ],
    inStock: true,
  },
  {
    id: "20",
    name: "Digital Art Watch",
    price: 159.99,
    description:
      "E-ink display with generative art watch faces. 30-day battery life. Titanium case. 5ATM water resistance. Always-on display.",
    category: "Accessories",
    rating: 5,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop&q=80",
    ],
    tag: "EXCLUSIVE",
    inStock: true,
    colors: ["#1a1a1a", "#c0c0c0"],
  },
];

export const reviews: Review[] = [
  { id: "r1", productId: "1", author: "Alex K.", avatar: "AK", rating: 5, date: "2026-08-10", title: "Best keyboard I've ever owned", text: "The build quality is insane. Cherry MX switches feel incredible, and the brutalist aesthetic makes it a conversation starter. Hot-swap feature is a game changer.", helpful: 24 },
  { id: "r2", productId: "1", author: "Sam P.", avatar: "SP", rating: 5, date: "2026-07-28", title: "Worth every penny", text: "USB-C, hot-swap, RGB — it has everything. The retro design fits perfectly on my desk. Typing on this is pure joy.", helpful: 18 },
  { id: "r3", productId: "1", author: "Jordan M.", avatar: "JM", rating: 4, date: "2026-07-15", title: "Great but heavy", text: "Solid keyboard with amazing build quality. Only downside is it's quite heavy, not ideal for travel. But for a desk setup? Perfect.", helpful: 11 },
  { id: "r4", productId: "2", author: "Taylor R.", avatar: "TR", rating: 5, date: "2026-08-05", title: "Unique design", text: "Everyone asks where I got these. The hand-painted patterns are beautiful and each pair is slightly different. True limited edition feel.", helpful: 15 },
  { id: "r5", productId: "2", author: "Casey W.", avatar: "CW", rating: 4, date: "2026-07-20", title: "Comfortable and stylish", text: "Great sneakers for everyday wear. The vulcanized sole has excellent grip. Took a day to break in but now they're super comfy.", helpful: 9 },
  { id: "r6", productId: "4", author: "Riley J.", avatar: "RJ", rating: 5, date: "2026-08-12", title: "Best tee I own", text: "The organic cotton is so soft and the oversized fit is perfect. The graphic print hasn't faded after 20 washes. Ordering more.", helpful: 32 },
  { id: "r7", productId: "4", author: "Morgan L.", avatar: "ML", rating: 5, date: "2026-07-30", title: "Street art on a shirt", text: "Love that these are designed by actual street artists. Feels authentic and the quality is premium. Worth the price.", helpful: 21 },
  { id: "r8", productId: "5", author: "Drew H.", avatar: "DH", rating: 5, date: "2026-08-08", title: "Incredible sound", text: "40W output is no joke. This little speaker fills my entire apartment with rich, deep bass. Battery lasts forever too.", helpful: 19 },
  { id: "r9", productId: "13", author: "Blake T.", avatar: "BT", rating: 5, date: "2026-08-14", title: "ANC is mind-blowing", text: "Best noise cancellation I've experienced. 30-hour battery means I charge once a week. The folding design is super practical for commuting.", helpful: 45 },
  { id: "r10", productId: "13", author: "Avery N.", avatar: "AN", rating: 5, date: "2026-08-01", title: "Audiophile approved", text: "Beryllium drivers deliver clarity I've never heard in wireless headphones. Transparency mode is so natural. These replaced my wired setup.", helpful: 38 },
  { id: "r11", productId: "13", author: "Quinn D.", avatar: "QD", rating: 4, date: "2026-07-18", title: "Almost perfect", text: "Sound quality is top-tier and ANC is excellent. Only wish the ear cups were slightly larger for big ears. Otherwise, best headphones I've owned.", helpful: 22 },
  { id: "r12", productId: "11", author: "Parker S.", avatar: "PS", rating: 5, date: "2026-08-09", title: "Built like a tank", text: "These boots are indestructible. After the break-in period, they're incredibly comfortable. The Vibram sole grips everything.", helpful: 16 },
  { id: "r13", productId: "6", author: "Jamie C.", avatar: "JC", rating: 4, date: "2026-07-25", title: "Ages beautifully", text: "The vegetable-tanned leather develops a gorgeous patina. Slim enough for front pocket. RFID blocking gives peace of mind.", helpful: 14 },
  { id: "r14", productId: "8", author: "Chris B.", avatar: "CB", rating: 4, date: "2026-08-11", title: "Avant-garde streetwear", text: "The raw-edge seams and exposed stitching give this hoodie so much character. Heavy cotton feels luxurious. Runs oversized — size down.", helpful: 12 },
  { id: "r15", productId: "20", author: "Robin F.", avatar: "RF", rating: 5, date: "2026-08-13", title: "Art on your wrist", text: "The generative art faces are mesmerizing — each one unique. E-ink display is easy on the eyes. 30-day battery is not an exaggeration.", helpful: 27 },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function filterProducts(params: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sort?: string;
}): Product[] {
  let filtered = [...products];

  if (params.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }
  if (params.minRating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= params.minRating!);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  switch (params.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filtered;
}
