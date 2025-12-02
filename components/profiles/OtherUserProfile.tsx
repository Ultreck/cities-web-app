"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Users,
  Edit,
  Mail,
  Phone,
  MessageCircle,
  Share2,
  DollarSign,
  UserPlus,
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
  Pencil,
  Ban,
  Camera,
  Search,
  Plus,
  Loader2,
} from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import usePostHook from "@/hooks/use-post-hook";
import { PostCard } from "../PostCard";
import CommunityGrid from "../communities/CommunityGrid";
import { PostCardSkeleton, PostCardSkeletonNoMedia } from "@/lib/skeleton";
import { useRouter } from "next/navigation";
import { useFollowFriendMutation, useGetOtherUser, useGetOtherUserCommunities, useGetOtherUserMedia, useGetOtherUserPosts, } from "@/apis/userMutation";
import { toast } from "react-toastify";

// Profile Header Skeleton Component
const ProfileHeaderSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
    {/* Cover Image Skeleton */}
    <div className="relative h-48 bg-gray-300">
      {/* Back and More Buttons */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-gray-400 rounded-full p-2 w-10 h-10"></div>
        <div className="bg-gray-400 rounded-full p-2 w-10 h-10"></div>
      </div>

      {/* Avatar Skeleton */}
      <div className="absolute -bottom-12 right-6">
        <div className="w-32 h-32 border-4 border-white rounded-full bg-gray-400"></div>
      </div>
    </div>

    {/* Profile Content Skeleton */}
    <CardContent className="pt-16 pb-6 px-6">
      <div className="flex justify-between items-center gap-8 mb-4">
        <div className="flex-1">
          <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-full w-24"></div>
      </div>

      <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>

      <div className="mb-4 flex items-center gap-4">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-300 rounded-full w-28"></div>
        ))}
      </div>
    </CardContent>
  </div>
);

export function OtherUserProfile({ slug }: { slug: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { handlePostLikes, handleRepost} = usePostHook();
  const router = useRouter();
  const {data:user, isLoading} = useGetOtherUser(slug)
  const {data, isLoading:isGettingUserPosts} = useGetOtherUserPosts(slug)
  const {data:mediaData, isLoading:isGettingUserMedia} = useGetOtherUserMedia(slug)
  const {data:communityData, isLoading:isGettingUserCommunities} = useGetOtherUserCommunities(slug)
  const {mutateAsync:followFriend, isPending} = useFollowFriendMutation()
  const posts = data?.data || []
  console.log({otherUser:user})
  
  const filteredCommunities = communityData ? communityData.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  console.log("User details:", user);

  const [activeTab, setActiveTab] = useState<"posts" | "community" | "media">("posts");
  
  const tabs = [
    { id: "posts" as const, count: posts?.length, label: posts && posts.length > 1 ? "Posts" : "Post" },
    { id: "community" as const, count: communityData?.length, label: communityData?.length > 1 ? "Communities" : "Community" },
    { id: "media" as const, count: mediaData?.length, label: mediaData?.length > 1 ? "Media" : "Medium" },
  ];
  
  const handleFollow=async()=>{
try {
  await followFriend({friend_id:slug})
} catch (error) {
  toast.error(error.response.message || "There is an error following this user, please try again.");
}
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
          <img
            src={user?.coverImage?.media || "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1200"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          
          {/* Back and More Buttons */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button onClick={() => router.back()} className="bg-blue-700 hover:bg-blue-600 text-white rounded-full p-2 transition-colors cursor-pointer">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Avatar positioned over cover */}
          <div className="absolute -bottom-12 right-6">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={user?.profile_pic || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200'} alt={user?.first_name} className="w-full h-full object-cover object-top" />
                <AvatarFallback className="text-4xl bg-gray-300">
                  {user?.first_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
                <div className="absolute top-2 right-2 bg-green-500 rounded-full border border-white z-20">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <CardContent className="pt-16 pb-6 px-6">
          <div className="flex justify-between items-center gap-8 mb-4">
            <div>
              <h2 className="text-lg md:text-4xl font-bold text-gray-900">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-sm text-gray-600">@{user?.user_name}</p>
            </div>
          {user?.follow ? <Button className="rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 cursor-pointer">Following</Button>  :<Button
            onClick={handleFollow}
              className="rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
             {isPending? <Loader2 size={18} className="animate-spin" /> : <span className="flex items-center"> <Plus className="w-4 h-4"/>
             Follow</span> }
            </Button>}
          </div>

          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{user?.state}, {user?.country}</span>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div>
              <span className="font-bold">{user?.followers}</span>
              <span className="ml-2">{user?.followers>1?"Followers":"Follower"}</span>
            </div>
            <div>
              <span className="font-bold">{user?.following}</span>
              <span className="ml-2">Following</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <p className="text-gray-700 leading-relaxed">{user?.bio_info || "No bio available"}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full px-6 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300">
              <MessageCircle className="w-5 h-5 mr-1" />
              Message
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2"
            >
              <Share2 className="w-5 h-5 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2"
            >
              <DollarSign className="w-5 h-5 mr-1" />
              Pay
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 py-2"
            >
              <Ban className="w-5 h-5 mr-1" />
              Block
            </Button>
          </div>
        </CardContent>
      </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 font-semibold text-center transition cursor-pointer ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="font-bold">{tab.count}</span>
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "posts" && (
            <>
            {isGettingUserPosts?
                    <div className="space-y-4">
                    <PostCardSkeleton />
                    <PostCardSkeletonNoMedia />
                    <PostCardSkeleton />
                    <PostCardSkeletonNoMedia />
                  </div>:
            <div className="space-y-6">
              {posts.map((post) => (
            <PostCard key={post.unique_id} handleRepost={handleRepost} post={post} handlePostLikes={handlePostLikes} />
          ))}
            </div>
                  }
            </>
          )}

          {activeTab === "community" && (
            <div>
              <div className="relative w-2/3 my-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search Community"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-100 border-0 rounded-full"
                />
              </div>
              {isGettingUserCommunities ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                      <div className="w-full h-32 bg-gray-300 rounded-lg mb-3"></div>
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredCommunities.length > 0 ? (
                <CommunityGrid filteredCommunities={filteredCommunities} />
              ) : (
                <p className="text-center text-gray-500 min-h-60 flex items-center justify-center">
                  <p>No communities found.</p>
                </p>
              )}
            </div>
          )}

          {activeTab === "media" && (
            <>
            {isGettingUserMedia?
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, id) => (
                <div
                  key={id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-200 animate-pulse"
                ></div>
              ))}
            </div>:
            <div>
              {mediaData.length === 0 ? (
                <p className="text-center text-gray-500">No media available.</p>
              ) : (
             <div className="grid grid-cols-3 gap-2">
              {mediaData?.map((item, id) => (
                <div
                  key={id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src={item.media || "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                    alt={`post-${id}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
              )}
            </div>
            }
            </>
          )}
        </div>
      </div>
    </div>
  );
}