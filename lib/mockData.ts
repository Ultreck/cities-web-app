import {
  Product,
  Community,
  Seller,
  CommunityCard,
  LocationView,
} from "../types/type-props";

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Brand new Chevrolet",
    price: 20000000,
    images: [
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop",
    ],
    description:
      "A sleek and modern Chevrolet with premium interiors and top performance. Perfect for city driving and long trips.",
    seller: {
      id: "seller-1",
      name: "Sarah Woods",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      connections: 1200,
      phone: "+234 123 456 7890",
    },
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    title: "Apple iPhone 15 Pro",
    price: 1300000,
    images: [
      "https://images.unsplash.com/photo-1695048132981-ccf93f5b1fd7?w=500&h=500&fit=crop",
    ],
    description:
      "Latest iPhone with A17 Pro chip, titanium build, and exceptional camera quality.",
    seller: {
      id: "seller-2",
      name: "John Carter",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328b1d49?w=100&h=100&fit=crop",
      connections: 890,
      phone: "+234 801 222 4567",
    },
    rating: 4.9,
    reviews: 340,
  },
  {
    id: "3",
    title: "Nike Air Jordan Sneakers",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1616627987423-6c57cf1a5f08?w=500&h=500&fit=crop",
    ],
    description:
      "Stylish and comfortable Air Jordan sneakers for sports and fashion lovers.",
    seller: {
      id: "seller-3",
      name: "Emily White",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
      connections: 560,
      phone: "+234 902 555 1188",
    },
    rating: 4.7,
    reviews: 210,
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Headphones",
    price: 240000,
    images: [
      "https://images.unsplash.com/photo-1596445836561-9918e04fdbb4?w=500&h=500&fit=crop",
    ],
    description:
      "Noise-cancelling wireless headphones with crystal clear sound and 30-hour battery life.",
    seller: {
      id: "seller-4",
      name: "David Lee",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      connections: 780,
      phone: "+234 811 345 2245",
    },
    rating: 4.8,
    reviews: 95,
  },
  {
    id: "5",
    title: "MacBook Air M3",
    price: 1800000,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    ],
    description:
      "The latest MacBook Air M3 chip for ultra-fast performance and long battery life.",
    seller: {
      id: "seller-5",
      name: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop",
      connections: 1045,
      phone: "+234 701 876 9981",
    },
    rating: 4.9,
    reviews: 410,
  },
  {
    id: "6",
    title: "Samsung QLED 65-inch Smart TV",
    price: 850000,
    images: [
      "https://images.unsplash.com/photo-1611095973518-946be1b8fdf5?w=500&h=500&fit=crop",
    ],
    description:
      "Ultra HD QLED Smart TV with vivid colors, sleek design, and smart connectivity.",
    seller: {
      id: "seller-6",
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop",
      connections: 912,
      phone: "+234 803 445 9921",
    },
    rating: 4.6,
    reviews: 162,
  },
  {
    id: "7",
    title: "Rolex Submariner Watch",
    price: 5000000,
    images: [
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=500&h=500&fit=crop",
    ],
    description:
      "Luxury Rolex watch designed for elegance and durability. A true statement piece.",
    seller: {
      id: "seller-7",
      name: "Alexander Scott",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop",
      connections: 1340,
      phone: "+234 802 678 3345",
    },
    rating: 4.8,
    reviews: 70,
  },
  {
    id: "8",
    title: "Canon EOS R5 Camera",
    price: 2100000,
    images: [
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?w=500&h=500&fit=crop",
    ],
    description:
      "Professional-grade camera with 8K video recording and 45MP full-frame sensor.",
    seller: {
      id: "seller-8",
      name: "Olivia Green",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
      connections: 635,
      phone: "+234 909 112 3399",
    },
    rating: 4.9,
    reviews: 228,
  },
  {
    id: "9",
    title: "Tesla Model 3",
    price: 35000000,
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=500&h=500&fit=crop",
    ],
    description:
      "Electric car with autopilot, premium interiors, and long-range battery performance.",
    seller: {
      id: "seller-9",
      name: "Chris Evans",
      avatar:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop",
      connections: 1580,
      phone: "+234 808 111 7878",
    },
    rating: 4.9,
    reviews: 500,
  },
  {
    id: "10",
    title: "Gucci Leather Handbag",
    price: 600000,
    images: [
      "https://images.unsplash.com/photo-1593032465171-8a34917a319e?w=500&h=500&fit=crop",
    ],
    description:
      "Premium Italian-made Gucci leather handbag perfect for formal and casual outings.",
    seller: {
      id: "seller-10",
      name: "Sophia Turner",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop",
      connections: 1020,
      phone: "+234 706 999 2210",
    },
    rating: 4.7,
    reviews: 85,
  },
];

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Lekki",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Lekki",
    members: 565300,
    comments: 565300,
    lastMessage: "3:03pm",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "2",
    name: "Festac",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Festac",
    members: 234100,
    comments: 234100,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "3",
    name: "Ikorodu",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Ikorodu",
    members: 127900,
    comments: 127900,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "4",
    name: "Ikeja",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Ikeja",
    members: 954200,
    comments: 954200,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "5",
    name: "Badagry",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Badagry",
    members: 9300,
    comments: 9300,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "6",
    name: "Victoria Island",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Victoria Island",
    members: 20004,
    comments: 20004,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "7",
    name: "Lagos Island",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Lagos Island",
    members: 2300500,
    comments: 2300500,
    lastMessage: "3:03pm",
    isOnline: true,
  },
  {
    id: "8",
    name: "Amuwo Odofin",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Connect with people in Amuwo Odofin",
    members: 150000,
    comments: 150000,
    lastMessage: "3:03pm",
    isOnline: true,
  },
];

export const mockCommunityCards: {
  id: string;
  name: string;
  description: string;
  members: string[];
  conversationCount: number;
}[] = [
  {
    id: "1",
    name: "Festac",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "2",
    name: "Lekki",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "3",
    name: "Ajah",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "4",
    name: "Ikorodu",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "5",
    name: "Ikeja",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "6",
    name: "Abule-Egba",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "7",
    name: "Badagry",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
  {
    id: "8",
    name: "V.I",
    description: "Connect with people in lekki",
    members: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
    ],
    conversationCount: 10,
  },
];

export const mockLocationView: LocationView = {
  id: "1",
  name: "Lekki",
  image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  stats: {
    community: "150k",
    connection: "325k",
    trends: "325k",
  },
  communities: [
    { name: "Lekki", count: "150k" },
    { name: "Yaba", count: "250k" },
    { name: "Lagos Island", count: "300k" },
    { name: "Ikorodu", count: "110k" },
    { name: "Ikoyi-Victoria Island", count: "612k" },
  ],
};

export const mockSellerProfile = {
  id: "seller-1",
  name: "David Adeleke",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  connections: 500,
  bio: "Hi! I am David, I really like traveling to really different countries, most often I am looking for flats that have very friendly landlords in a good location.",
  location: "Lagos, Nigeria",
  phone: "+234 123 456 7890",
  posts: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=200&h=200&fit=crop",
    },
    {
      id: "9",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    },
  ],
};
