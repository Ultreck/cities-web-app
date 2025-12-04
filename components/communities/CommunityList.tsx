'use client';

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCommunities } from "@/lib/mockData";
// import BottomNav from "@/components/BottomNav";

export default function CommunityList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = mockCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search Community"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Communities List */}
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {filteredCommunities.map((community) => (
          <div
            key={community.id}
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
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{community.name}</p>
                <p className="text-sm text-gray-500">
                  {community.comments.toLocaleString()} comments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{community.lastMessage}</span>
              {community.unreadCount && (
                <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {community.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      {/* <BottomNav /> */}
    </div>
  );
}

