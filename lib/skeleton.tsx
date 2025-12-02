"use client";

export function PostCardSkeleton() {
  return (
    <div className="bg-white border rounded-2xl border-gray-200 p-4 flex gap-4 hover:bg-gray-50 transition-colors animate-pulse">
      {/* Header Skeleton */}
      <div className="relative h-14">
        <div className="w-14 h-14 flex-shrink-0 bg-gray-300 rounded-full"></div>
        <div className="absolute -bottom-1 -right-1 bg-gray-300 rounded-full p-1 border-2 border-white w-6 h-6"></div>
      </div>
      
      <div className="flex-1 space-y-3">
        {/* User info and time skeleton */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Media skeleton */}
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-200">
          <div className="w-full h-64 bg-gray-300"></div>
        </div>

        {/* Engagement Stats skeleton */}
        <div className="flex items-center gap-4 pt-3 border-b border-gray-200 pb-3 text-gray-500 text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
          ))}
        </div>

        {/* Action Buttons skeleton */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// You can also create a variant with no media for posts without images
export function PostCardSkeletonNoMedia() {
  return (
    <div className="bg-white border rounded-2xl border-gray-200 p-4 flex gap-4 hover:bg-gray-50 transition-colors animate-pulse">
      {/* Header Skeleton */}
      <div className="relative h-14">
        <div className="w-14 h-14 flex-shrink-0 bg-gray-300 rounded-full"></div>
        <div className="absolute -bottom-1 -right-1 bg-gray-300 rounded-full p-1 border-2 border-white w-6 h-6"></div>
      </div>
      
      <div className="flex-1 space-y-3">
        {/* User info and time skeleton */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Engagement Stats skeleton */}
        <div className="flex items-center gap-4 pt-3 border-b border-gray-200 pb-3 text-gray-500 text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
          ))}
        </div>

        {/* Action Buttons skeleton */}
        <div className="flex items-center justify-between mt-3 text-gray-500">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
