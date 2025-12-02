"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CgPlayListAdd } from "react-icons/cg";

type CategoryType = "All" | "Declutter" | "Rent" | "Property" | "Market";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  location: string;
  timeAgo: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "A lot of fresh tomatoes, very cheap",
    price: "₦20,000",
    category: "Declutter",
    location: "Surulere",
    timeAgo: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1592921570552-8662ab95f201?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "A bunch of shoes",
    price: "₦20,000",
    category: "Declutter",
    location: "Apapa",
    timeAgo: "2 days ago",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Fresh vegetables from farm",
    price: "₦20,000",
    category: "Market",
    location: "Festac",
    timeAgo: "3 days ago",
    image:
      "https://images.unsplash.com/photo-1599599810694-b5ac4dd33e2b?w=400&h=300&fit=crop",
  },
];

const categories: CategoryType[] = [
  "All",
  "Declutter",
  "Rent",
  "Property",
  "Market",
];

export default function Marketplace() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="mb-4">
            <div className="text flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Marketplace
              </h1>
              <Link href="/n/markets/create-product">
                <Button className="bg-blue-500 hover:bg-blue-600">
                 <CgPlayListAdd /> Create Product
                </Button>
              </Link>
            </div>

            {/* <button className="text-slate-600 hover:text-slate-900">
              <MoreVertical size={24} />
            </button> */}
          </div>

          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {selectedCategory === "All" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Newest</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {selectedCategory !== "All" && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {selectedCategory} Items
            </h2>
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-slate-500 text-lg">
                  No items found in this category
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => router.push("/n/markets/create-product")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/n/markets/${product.id}`)}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="relative overflow-hidden bg-slate-200 h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-lg font-bold text-slate-900 mb-3">{product.price}</p>

        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{product.timeAgo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
