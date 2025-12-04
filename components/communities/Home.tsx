'use client';


import { Search} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockProducts, mockCommunities } from "@/lib/mockData";
import { useRouter } from "next/navigation";
// import BottomNav from "@/components/BottomNav";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search marketplace"
              className="pl-10 bg-gray-100 border-0 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Featured Product */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Listings</h2>
          {mockProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push("/product")}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900">{product.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                {/* Seller Info */}
                <div className="flex items-center gap-3 pt-2 border-t">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {product.seller.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.seller.connections.toLocaleString()}+ connections
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Communities Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Popular Communities</h2>
            <button
              onClick={() => router.push("/community")}
              className="text-blue-600 text-sm font-semibold hover:text-blue-700"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {mockCommunities.slice(0, 5).map((community) => (
              <div
                key={community.id}
                onClick={() => router.push("/community")}
                className="bg-white rounded-lg p-4 flex items-center justify-between hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <img
                      src={community.avatar}
                      alt={community.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {community.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{community.name}</p>
                    <p className="text-sm text-gray-500">
                      {community.comments.toLocaleString()} comments
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 ml-2">{community.lastMessage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Ready to sell?</h3>
          <p className="text-blue-100 mb-4">
            List your products and connect with thousands of buyers in your community.
          </p>
          <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
            Start Selling
          </Button>
        </section>
      </div>

      {/* Bottom Navigation */}
      {/* <BottomNav /> */}
    </div>
  );
}

