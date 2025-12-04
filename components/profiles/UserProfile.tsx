"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, MessageCircle, Share2, CreditCard, Ban, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSellerProfile } from "@/lib/mockData";
// import BottomNav from "@/components/BottomNav";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<"posts" | "community" | "media">("posts");
  const seller = mockSellerProfile;

  const tabs = [
    { id: "posts" as const, label: "Posts" },
    { id: "community" as const, label: "Community" },
    { id: "media" as const, label: "Media" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-b from-blue-400 to-blue-600">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          alt="cover"
          fill
          className="object-cover"
        />

        {/* Header Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4 mb-6">
            <Image
              src={seller.avatar}
              alt={seller.name}
              width={80}
              height={80}
              className="rounded-full border-4 border-white object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {seller.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {seller.connections}+ connections
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-6">{seller.bio}</p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className="gap-2"
              size="sm"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              size="sm"
            >
              <CreditCard className="w-4 h-4" />
              Pay
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              size="sm"
            >
              <Ban className="w-4 h-4" />
              Block
            </Button>
          </div>

          {/* Follow Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            + Follow
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-semibold text-center transition ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "posts" && (
              <div className="grid grid-cols-3 gap-2">
                {seller.posts?.map((post, idx) => (
                  <div
                    key={post.image || idx}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition"
                  >
                    <Image
                      src={post.image}
                      alt={`post-${idx}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "community" && (
              <div className="text-center py-8 text-gray-500">
                <p>No community posts yet</p>
              </div>
            )}

            {activeTab === "media" && (
              <div className="text-center py-8 text-gray-500">
                <p>No media yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}