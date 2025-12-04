'use client';

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityCard } from "@/types/type-props";
import Link from "next/link";

export default function CommunityGrid({filteredCommunities, isLoading}:{filteredCommunities:CommunityCard[], isLoading:boolean}) {

  // Skeleton component
  const CommunitySkeleton = () => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col animate-pulse">
      {/* Title skeleton */}
      <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Member avatars skeleton */}
      <div className="flex -space-x-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
      </div>

      {/* Conversation count skeleton */}
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>

      {/* Button skeleton */}
      <div className="h-9 bg-gray-200 rounded w-full"></div>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Location Header */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Communities in Lagos</h2>
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              Change location
            </button>
          </div> */}
        </div>
      </div>

      {/* Communities Grid */}
      <div className="mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            // Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <CommunitySkeleton key={index} />
            ))
          ) : (
            // Show actual communities when not loading
            filteredCommunities?.map((community) => (
              <div
                key={community.unique_id}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer flex flex-col"
              >
                <h3 className="font-bold text-gray-900 mb-2">{community.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{community.description}</p>

                {/* Member Avatars */}
                <div className="flex -space-x-2 mb-3">
                  {community?.users?.slice(0, 3).map((user, index) => (
                    <img
                      key={index}
                      src={user.profile_pic}
                      alt={`member-${index}`}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  {community.conversationCount} conversation
                </p>
                <Link className="w-full" href={`/n/communities/${community?.unique_id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    View
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Show empty state if no communities found */}
        {!isLoading && (!filteredCommunities || filteredCommunities.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No communities found</div>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      {/* <BottomNav /> */}
    </div>
  );
}