"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  Eye,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { StaticImageData } from "next/image";
import { HiOutlineShare } from "react-icons/hi2";
import CommentsDailog from "./dialogs/CommentsDailog";
import { AiOutlineComment } from "react-icons/ai";
import RepostDialog from "./dialogs/RepostDialog";
import Link from "next/link";
import { RePostType } from "@/types/type-props";
import PostMedia from "./PostMedia";
import { useRouter } from "next/navigation";

export interface Post {
  id: number;
  author: string;
  username: string;
  avatar: StaticImageData;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  sponsored: boolean;
  likedByUser: boolean;
  image?: StaticImageData;
}

interface PostCardProps {
  post: RePostType;
  onLike?: (id: number, liked: boolean) => void;
  onComment?: (id: number) => void;
  onShare?: (id: number) => void;
  handlePostLikes?: (id: string) => void;
  handleRepost: (id: string, aud: string) => void;

}

export function PostCard({ post, handlePostLikes, handleRepost }: PostCardProps) {
   const router = useRouter();
  const [showComments, setShowComments] = useState(false);

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    // if (onShare) onShare(post.id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };
  
  function formatPostTime(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }


  const goToProfile = () => {
    router.push(`/n/profile/${post.User.unique_id}`);
  }
  
  return (
    <div className="bg-white border rounded-2xl border-gray-200 p-4 flex gap-4 hover:bg-gray-50 transition-colors">
      {/* Header */}
      <div className="relative h-14">
           <Avatar onClick={goToProfile} className="w-14 h-14 flex-shrink-0 cursor-pointer">
          <AvatarImage
            src={post?.User?.profile_pic}
            alt={post.User.first_name}
          />
          <AvatarFallback>
            {post?.User?.first_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
           <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 border-2 border-white cursor-pointer hover:bg-red-600 transition-colors">
            <span className="text-white text-xs font-bold flex items-center justify-center w-3 h-3">+</span>
          </div>
      </div>
      <div className="flex-1">
        <div className="mb-3">
          <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 flex-wrap">
              <span className="font-bold text-gray-900">
              {post?.User?.first_name}
            </span>
            <span className="text-gray-500">
              @{post?.User?.user_name || "username"}
            </span>
          </div>
            <span className="text-gray-500 text-sm">
              {formatPostTime(post.createdAt)}
            </span>
          </div>
        </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-gray-900 text-base leading-normal">{post.Post.content}</p>
      </div>

      {/* Media */}
      {post.Post.Media.length > 0 && (
        <div className="mb-3 rounded-2xl overflow-hidden border border-gray-200">
          <PostMedia mediaItems={post.Post.Media} />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center gap-4 pt-3 border-b border-gray-200 pb-3 text-gray-500 text-sm">
        <CommentsDailog post={post}>
          <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span>{formatNumber(post.Post.commentcount)}</span>
          </div>
        </CommentsDailog>
        
        <Link
          href={`#`}
          className="flex items-center gap-2 hover:text-green-500"
        >
          <Share2 className="w-4 h-4" />
          <span>{formatNumber(post.Post.rePostCount)}</span>
        </Link>
        
        <Link
          href={`/n/${post.post_id}/post-engagement?type=likes`}
          className="flex items-center gap-2 hover:text-red-500"
        >
          <Heart className="w-4 h-4" />
          <span>{formatNumber(post.Post.reactionscount)}</span>
        </Link>
        
        <Link
          href={`/n/${post.post_id}/post-engagement?type=views`}
          className="flex items-center gap-2 hover:text-blue-500"
        >
          <Eye className="w-4 h-4" />
          <span>{formatNumber(post.Post.views)}</span>
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3 text-gray-500">
        <CommentsDailog post={post}>
          <button 
            className="flex items-center gap-2 group hover:text-blue-500"
            onClick={handleComment}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover:bg-blue-100">
              <MessageCircle className="w-4 h-4" />
            </div>
          </button>
        </CommentsDailog>
        
        <RepostDialog id={post.post_id} onRepost={handleRepost}>
          <button 
            className="flex items-center gap-2 group hover:text-green-500"
            onClick={handleShare}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover:bg-green-100">
              <Share2 className="w-4 h-4" />
            </div>
          </button>
        </RepostDialog>
        
        <button
          className="flex items-center gap-2 group hover:text-red-500"
          onClick={() => handlePostLikes && handlePostLikes(post.post_id)}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover:bg-red-100">
            <Heart className={`w-4 h-4 ${post.Post.isLike ? "fill-red-500 text-red-500" : ""}`} />
          </div>
        </button>
        
        <button className="flex items-center gap-2 group hover:text-blue-500">
          <div className="flex items-center justify-center w-8 h-8 rounded-full group-hover:bg-blue-100">
            <Eye className="w-4 h-4" />
          </div>
        </button>
      </div>
      </div>
    </div>
  );
}