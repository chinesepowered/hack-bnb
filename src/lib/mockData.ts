export interface PropertyData {
  id: number;
  owner: string;
  name: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  pricePerNight: string; // in BNB
  rating: number;
  reviewCount: number;
  totalBookings: number;
  category: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinedYear: number;
  };
}

export const CATEGORIES = [
  { name: "All", icon: "grid" },
  { name: "Beachfront", icon: "waves" },
  { name: "Mountain", icon: "mountain" },
  { name: "City", icon: "building" },
  { name: "Tropical", icon: "palmtree" },
  { name: "Countryside", icon: "trees" },
  { name: "Unique", icon: "sparkles" },
  { name: "Luxury", icon: "crown" },
];

export const MOCK_PROPERTIES: PropertyData[] = [
  {
    id: 1,
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    name: "Luxury Beachfront Villa",
    location: "Bali, Indonesia",
    description:
      "Stunning 4-bedroom villa with private pool, direct beach access, and panoramic ocean views. Perfect for families and groups seeking a tropical paradise escape. Features include an infinity pool overlooking the Indian Ocean, outdoor rain shower, fully equipped gourmet kitchen, and a dedicated staff including a private chef. Wake up to the sound of waves and enjoy breathtaking sunsets from your private terrace.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    pricePerNight: "0.05",
    rating: 4.9,
    reviewCount: 47,
    totalBookings: 128,
    category: "Beachfront",
    amenities: [
      "Private Pool",
      "Ocean View",
      "WiFi",
      "Kitchen",
      "Air Conditioning",
      "Private Chef",
      "Gym",
      "Beach Access",
    ],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    host: {
      name: "Made Wijaya",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2021,
    },
  },
  {
    id: 2,
    owner: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    name: "Modern Tokyo Apartment",
    location: "Shibuya, Tokyo, Japan",
    description:
      "Sleek and modern apartment in the heart of Shibuya. Walking distance to major attractions, excellent public transit access, and fully equipped kitchen. Floor-to-ceiling windows offer stunning city views. The apartment features smart home technology, a washer/dryer, and a workspace perfect for remote work. Explore nearby Harajuku, Omotesando, and Yoyogi Park.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    ],
    pricePerNight: "0.03",
    rating: 4.8,
    reviewCount: 92,
    totalBookings: 245,
    category: "City",
    amenities: [
      "WiFi",
      "Kitchen",
      "Washer",
      "Workspace",
      "Air Conditioning",
      "Smart TV",
      "City View",
    ],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    host: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2020,
    },
  },
  {
    id: 3,
    owner: "0x9876543210fedcba9876543210fedcba98765432",
    name: "Alpine Swiss Chalet",
    location: "Zermatt, Switzerland",
    description:
      "Cozy wooden chalet with breathtaking Matterhorn views. Features fireplace, hot tub, ski-in/ski-out access, and traditional Swiss charm. After a day on the slopes, warm up by the roaring fireplace or soak in the outdoor hot tub while gazing at snow-capped peaks. The chalet includes a sauna, boot warmers, and a fully stocked wine cellar.",
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    pricePerNight: "0.08",
    rating: 4.95,
    reviewCount: 31,
    totalBookings: 76,
    category: "Mountain",
    amenities: [
      "Hot Tub",
      "Fireplace",
      "WiFi",
      "Kitchen",
      "Ski-in/Ski-out",
      "Sauna",
      "Mountain View",
      "Parking",
    ],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      name: "Hans Mueller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2019,
    },
  },
  {
    id: 4,
    owner: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    name: "SoHo Designer Loft",
    location: "New York City, USA",
    description:
      "Industrial-chic loft in SoHo with exposed brick, high ceilings, and curated art collection. Steps from galleries, restaurants, and nightlife. This 1,500 sq ft space features original hardwood floors, a chef's kitchen with marble countertops, and floor-to-ceiling windows flooding the space with natural light. Perfect base for exploring Manhattan.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
    pricePerNight: "0.06",
    rating: 4.7,
    reviewCount: 63,
    totalBookings: 189,
    category: "City",
    amenities: [
      "WiFi",
      "Kitchen",
      "Washer",
      "Workspace",
      "Air Conditioning",
      "Doorman",
      "Elevator",
      "Art Collection",
    ],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      isSuperhost: false,
      joinedYear: 2022,
    },
  },
  {
    id: 5,
    owner: "0xcafebabecafebabecafebabecafebabecafebabe",
    name: "Santorini Cave House",
    location: "Oia, Santorini, Greece",
    description:
      "Iconic cave house carved into the caldera cliff with infinity pool, sunset views, and traditional Cycladic architecture. A once-in-a-lifetime stay. The whitewashed interior features hand-carved niches, luxury bedding, and a private terrace with unobstructed views of the famous Santorini sunset. Includes daily breakfast and concierge service.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      "https://images.unsplash.com/photo-1602343168117-bb8bbe693f0c?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    pricePerNight: "0.07",
    rating: 4.92,
    reviewCount: 54,
    totalBookings: 112,
    category: "Unique",
    amenities: [
      "Infinity Pool",
      "Sunset View",
      "WiFi",
      "Breakfast",
      "Concierge",
      "Air Conditioning",
      "Terrace",
    ],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Dimitris Papadopoulos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2020,
    },
  },
  {
    id: 6,
    owner: "0xfeedface0feedface0feedface0feedface0feed",
    name: "Treehouse Retreat",
    location: "Monteverde, Costa Rica",
    description:
      "Eco-luxury treehouse nestled in the cloud forest canopy. Wake up to howler monkeys, enjoy outdoor rain shower, and explore nature trails. This sustainable retreat is built from reclaimed materials and powered by solar energy. Features a hanging bridge entrance, open-air living space, and a stargazing deck perfect for watching tropical wildlife.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&q=80",
    ],
    pricePerNight: "0.04",
    rating: 4.85,
    reviewCount: 38,
    totalBookings: 89,
    category: "Tropical",
    amenities: [
      "Nature Trails",
      "WiFi",
      "Outdoor Shower",
      "Solar Power",
      "Breakfast",
      "Bird Watching",
      "Stargazing Deck",
    ],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Carlos Rivera",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2021,
    },
  },
  {
    id: 7,
    owner: "0xbaadf00dbaadf00dbaadf00dbaadf00dbaadf00d",
    name: "Tuscan Wine Estate",
    location: "Chianti, Tuscany, Italy",
    description:
      "Historic 16th-century farmhouse surrounded by rolling vineyards and olive groves. Private wine cellar, cooking classes, and breathtaking Tuscan views. The estate has been lovingly restored with original stone walls, terracotta floors, and antique furnishings. Enjoy farm-to-table meals prepared with ingredients from the property's gardens.",
    image:
      "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    pricePerNight: "0.09",
    rating: 4.97,
    reviewCount: 28,
    totalBookings: 64,
    category: "Countryside",
    amenities: [
      "Wine Cellar",
      "Pool",
      "WiFi",
      "Kitchen",
      "Cooking Classes",
      "Garden",
      "Fireplace",
      "Parking",
    ],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    host: {
      name: "Lucia Bianchi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
      isSuperhost: true,
      joinedYear: 2019,
    },
  },
  {
    id: 8,
    owner: "0x0123456789abcdef0123456789abcdef01234567",
    name: "Dubai Marina Penthouse",
    location: "Dubai Marina, UAE",
    description:
      "Ultra-luxury penthouse with panoramic views of Palm Jumeirah and the Arabian Gulf. Private elevator, rooftop jacuzzi, and world-class amenities. This 3,000 sq ft residence features Italian marble floors, a Bulthaup kitchen, B&O sound system, and floor-to-ceiling windows showcasing Dubai's spectacular skyline. Access to private beach club included.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    pricePerNight: "0.15",
    rating: 4.88,
    reviewCount: 19,
    totalBookings: 42,
    category: "Luxury",
    amenities: [
      "Rooftop Jacuzzi",
      "Private Elevator",
      "WiFi",
      "Kitchen",
      "Gym",
      "Beach Club",
      "Concierge",
      "City View",
    ],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    host: {
      name: "Ahmed Al-Rashid",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80",
      isSuperhost: false,
      joinedYear: 2023,
    },
  },
];

export const MOCK_REVIEWS = [
  {
    reviewer: "0xabc...def",
    rating: 5,
    comment:
      "Absolutely incredible! The villa exceeded all expectations. The private pool was amazing and the staff was so attentive. Will definitely come back!",
    timestamp: Date.now() / 1000 - 86400 * 3,
    name: "Alex M.",
  },
  {
    reviewer: "0x123...789",
    rating: 5,
    comment:
      "Best stay ever. The location is perfect, the views are breathtaking, and the amenities are top-notch. Highly recommend!",
    timestamp: Date.now() / 1000 - 86400 * 10,
    name: "Jordan K.",
  },
  {
    reviewer: "0xdef...abc",
    rating: 4,
    comment:
      "Great property with beautiful views. Kitchen was well-equipped and the beds were super comfortable. Only minor issue was WiFi speed.",
    timestamp: Date.now() / 1000 - 86400 * 21,
    name: "Sam L.",
  },
  {
    reviewer: "0x456...012",
    rating: 5,
    comment:
      "A dream come true! Every detail was perfect. The host went above and beyond to make our stay special. The onchain booking process was seamless too!",
    timestamp: Date.now() / 1000 - 86400 * 35,
    name: "Taylor R.",
  },
];
