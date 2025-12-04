"use client";

import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import {
  currentUser,
  initialCommunities,
  initialEvents,
  initialJobs,
} from "@/lib/helper";
import { PostCard } from "../PostCard";
import Link from "next/link";
import usePostHook from "@/hooks/use-post-hook";
import CreatePostDrawer from "../Drawers/CreatePostDrawer";
import { Button } from "../ui/button";
import { PostCardSkeleton, PostCardSkeletonNoMedia } from "@/lib/skeleton";

const DashboardCity = () => {
  const {posts, handlePostLikes, handleRepost, isFetchingPosts} = usePostHook();
  const [open, setOpen] = useState(false);

//   const searchData = [
//     ...posts.map((p) => ({ ...p, type: "post" })),
//     ...communities.map((c) => ({ ...c, type: "community" })),
//     ...initialJobs.map((j) => ({ ...j, type: "job" })),
//   ];
  const handleSearch = (item: { type: string }) => {
    console.log("Selected:", item);
    // Navigate to the appropriate tab based on item type
    // if (item.type === "community") {
    //   //   setActiveTab("community");
    // } else if (item.type === "job") {
    //   //   setActiveTab("forsale");
    // }
  };

  const handleLike = (postId: string, liked: boolean) => {
    // setPosts((prev) =>
    //   prev.map((post) =>
    //     post.id === postId
    //       ? {
    //           ...post,
    //           likedByUser: liked,
    //           likes: liked ? post.likes + 1 : post.likes - 1,
    //         }
    //       : post
    //   )
    // );
  };
  if (isFetchingPosts) {
    return (
       <div className="px-3 sm:px-0">
      <div className="text flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold py-3 ">Dashboard</h2>
        <Button
          onClick={()=>setOpen(true)}
          className="text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 cursor-pointer"
        >
          Add Post
        </Button>
      </div>
        <div className="space-y-8">
          {/* Mobile Search */}
          <div className="md:hidden mb-4">
            {/* <SearchBar
              placeholder="Search..."
              data={searchData}
              onSearch={handleSearch}
            /> */}
          </div>

          {/* Posts Feed */}
              <div className="space-y-4">
        <PostCardSkeleton />
        <PostCardSkeletonNoMedia />
        <PostCardSkeleton />
        <PostCardSkeletonNoMedia />
      </div>
        </div>
    </div>
    );
  }

  return (
    <div className="px-3 sm:px-0">
      <div className="text flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold py-3 ">Dashboard</h2>
        <Button
          onClick={()=>setOpen(true)}
          className="text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 cursor-pointer"
        >
          Add Post
        </Button>
      </div>
        <div className="space-y-8">
          {/* Mobile Search */}
          <div className="md:hidden mb-4">
            {/* <SearchBar
              placeholder="Search..."
              data={searchData}
              onSearch={handleSearch}
            /> */}
          </div>

          {/* Posts Feed */}
          {posts.map((post) => (
            <PostCard key={post.unique_id} handleRepost={handleRepost} post={post} handlePostLikes={handlePostLikes} />
          ))}
        </div>

        <CreatePostDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default DashboardCity;