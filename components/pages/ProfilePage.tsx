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
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { RePostType } from "@/types/type-props";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { ProfileUpdateDialog } from "../dialogs/ProfileUpdateDialog";
import usePostHook from "@/hooks/use-post-hook";
import { PostCard } from "../PostCard";
import CommunityGrid from "../communities/CommunityGrid";
import { mockCommunityCards } from "@/lib/mockData";
import { useChangeCoverImageMutation, useChangeProfileImageMutation } from "@/apis/auth";
import { useGetUserCommunities, useGetUserMedia, useGetUserPosts } from "@/apis/postMutation";
import { PostCardSkeleton, PostCardSkeletonNoMedia } from "@/lib/skeleton";

interface User {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone_number: string;
  location: string;
  bio_info: string;
  joinDate: string;
  connections: string;
  posts: number;
  communities: number;
  media: number;
  avatar: string;
}

interface Post {
  id: string;
  image: string | StaticImageData;
  title?: string;
}

interface ProfilePageProps {
  user?: User;
  posts?: RePostType[];
}

export function ProfilePage() {
  const [open, setOpen] = useState(false);
  const {details:user, isLoading} = useSelector((state: { [key: string]: unknown }) => state.user);
    const [searchQuery, setSearchQuery] = useState("");
  const [editedUser, setEditedUser] = useState<User>(user || {} as User);
  const { handlePostLikes, handleRepost} = usePostHook();
  const {mutateAsync: changeCoverImage, isPending:isCoverImagePending} = useChangeCoverImageMutation()
  const {mutateAsync: changeProfileImage, isPending:isProfileImagePending} = useChangeProfileImageMutation()

  const {data, isLoading:isGettingUserPosts} = useGetUserPosts()
  const {data:mediaData, isLoading:isGettingUserMedia} = useGetUserMedia()
  const {data:communityData, isLoading:isGettingUserCommunities} = useGetUserCommunities()
const posts = data?.data || []
  console.log({mediaData})
  
  // Image states
  const [profileImage, setProfileImage] = useState(
    user?.profile_pic || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200'
  );
  const [coverImage, setCoverImage] = useState(
    user?.coverImage?.media || "https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1200"
  );

    const filteredCommunities = communityData ? communityData.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  // Refs for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  console.log("User details:", user);
  console.log("User phone:", user.phone_number);

  const [activeTab, setActiveTab] = useState<"posts" | "community" | "media">("posts");
  
  const tabs = [
    { id: "posts" as const, count: posts?.length, label: posts && posts.length > 1 ? "Posts" : "Post" },
    { id: "community" as const, count: communityData?.length, label: communityData?.length > 1 ? "Communities" : "Community" },
    { id: "media" as const, count: mediaData?.length, label: mediaData?.length > 1 ? "Media" : "Medium" },
  ];

  // Handle profile image upload
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result as string);
        
        // Upload to server
        await uploadImageToServer(file, 'profile');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = async () => {
        setCoverImage(reader.result as string);
        
        // Upload to server
        await uploadImageToServer(file, 'cover');
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to server
  const uploadImageToServer = async (file: File, type: 'profile' | 'cover') => {
    try {
      const formData = new FormData();
      formData.append('media', file);
      console.log({file});
      

if (type==='profile') {
  await changeProfileImage(formData)
}else{
  await changeCoverImage(formData)
}
      
      // Replace with your actual API endpoint
      /*
      const response = await fetch('/api/user/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      console.log('Upload successful:', data);
      
      // Update Redux store or local state with the new image URL
      if (type === 'profile') {
        // dispatch(updateProfilePic(data.imageUrl));
      } else {
        // dispatch(updateCoverImage(data.imageUrl));
      }
      */
      
      console.log(`Uploading ${type} image:`, file.name);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          
          {/* Hidden file input for cover */}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
          />
          
          {/* Back and More Buttons */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button 
              onClick={() => coverInputRef.current?.click()}
              className="bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-3 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Camera className="size-5" />
              <span className="text-sm font-semibold">Update Cover Photo</span>
            </button>
          </div>

          {/* Avatar positioned over cover */}
          <div className="absolute -bottom-12 right-6">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={profileImage} alt={user?.first_name} className="w-full h-full object-cover object-top" />
                <AvatarFallback className="text-4xl bg-gray-300">
                  {user?.first_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              {/* Hidden file input for profile */}
              <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
              
              {true && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full border border-white z-20">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              )}
              <button
                onClick={() => profileInputRef.current?.click()}
                className="hidden absolute inset-0 transition-all duration-500 group-hover:flex items-center justify-center bg-gray-600/40 rounded-full p-1 border-2 border-white cursor-pointer"
              >
                <Camera className="size-6 text-white" />
              </button>
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
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="rounded-full border border-gray-400 cursor-pointer"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{user?.state}, {user?.country}</span>
          </div>

          <div className="mb-4 flex items-center gap-4">
            {/* <p className="text-lg font-semibold text-blue-600">
              {user?.connections} connections
            </p> */}
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
            {filteredCommunities.length > 0 ? <CommunityGrid filteredCommunities={filteredCommunities} /> : <p className="text-center text-gray-500 min-h-60 flex items-center justify-center"><p>No communities found.</p></p>}
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
      
      <ProfileUpdateDialog open={open} setOpen={setOpen} />
    </div>
  );
}