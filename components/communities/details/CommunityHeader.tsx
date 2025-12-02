// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Heart, Share2, MoreVertical } from 'lucide-react';

// interface CommunityHeaderProps {
//   name: string;
//   image: string;
//   members: number;
//   followers: number;
//   description: string;
//   isFollowing?: boolean;
//   onFollow?: () => void;
// }

// export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
//   name,
//   image,
//   members,
//   followers,
//   description,
//   isFollowing = false,
//   onFollow,
// }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//       {/* Hero Image */}
//       <div className="relative h-64 bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/20" />
//       </div>

//       {/* Content */}
//       <div className="px-6 py-6">
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">{name}</h2>
//             <p className="text-gray-600 text-sm mb-4">{description}</p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" size="icon">
//               <Share2 className="w-4 h-4" />
//             </Button>
//             <Button variant="outline" size="icon">
//               <MoreVertical className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-900">{members.toLocaleString()}</div>
//             <div className="text-xs text-gray-600">Members</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-900">{followers.toLocaleString()}</div>
//             <div className="text-xs text-gray-600">Followers</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-gray-900">95%</div>
//             <div className="text-xs text-gray-600">Active</div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <Button
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//             onClick={onFollow}
//           >
//             <Heart className="w-4 h-4 mr-2" />
//             {isFollowing ? 'Following' : 'Follow'}
//           </Button>
//           <Button variant="outline" className="flex-1">
//             View All Members
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };



'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, Plus, Play, Globe, Eye, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useJoinCommunityMutation } from '@/apis/communityMutation';

interface CommunityHeaderProps {
  name: string;
  image: string;
  members: number;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  isPublic?: boolean;
  memberAvatars?: string[];
  onBack?: () => void;
  onUpload?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  activeTab?: string;
  hasJoined?: boolean;
  community?: any;
}

export const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  name,
  image,
  members=7000,
  views=5000,
  likes=3000,
  dislikes=500,
  comments=1000,
  isPublic = true,
  setActiveTab=() => {},
  activeTab='',
  hasJoined=false,
  community,
  memberAvatars = [
            'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
            'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100',
          ],
  onBack,
  onUpload,
  onPrev,
  onNext,
}) => {
    const router = useRouter();

    const {mutateAsync:joinCommunity, isPending} = useJoinCommunityMutation();
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}m`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num?.toString();
  };

  const handleJoin = async() => {
    // Handle join community logic here
    const payload={community_id: community.unique_id}
    try {
      await joinCommunity(payload);
    } catch (error) {
      console.error('Error joining community:', error);
    }
  }

  return (
    <div>
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-0 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">{name}</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 h-auto text-sm"
          onClick={onUpload}
        >
          <Plus className="w-4 h-4 mr-1" />
          Upload
        </Button>
      </div>

      <div className="relative bg-black">
        <img
          src={image}
          alt={name}
          className="w-full h-[240px] object-cover"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Play className="w-8 h-8 text-black fill-black ml-1" />
          </div>
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 rounded-full px-6 text-sm font-medium"
            onClick={onPrev}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 rounded-full px-6 text-sm font-medium"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span className="font-medium">
                {isPublic ? 'Public' : 'Private'}
              </span>
            </div>
            <span className="text-gray-600">·</span>
            <span className="font-semibold">{formatNumber(members)} members</span>
          </div>
         {hasJoined && <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(views)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4" />
              <span>{formatNumber(likes)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsDown className="w-4 h-4" />
              <span>{dislikes}</span>
            </div>
          </div>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {community?.users?.slice(0, 4).map((user, index) => (
              <Avatar
                key={index}
                className="w-9 h-9 border-2 border-white -ml-2 first:ml-0"
              >
                <AvatarImage src={user.profile_pic} alt={`Member ${index + 1}`} />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
            ))}
            {community?.users?.length > 4 && (
              <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-medium -ml-2 border-2 border-white">
                +{community?.users?.length - 4}
              </div>
            )}
          </div>
         {hasJoined ? <Button onClick={()=>setActiveTab('comments')} className={`${activeTab === 'comments' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-gray-900'} cursor-pointer transition-all rounded-full px-6 h-9 text-sm font-medium`}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {formatNumber(comments)} Comments
          </Button> :<Button disabled={isPending} onClick={handleJoin} className={` bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-all rounded-full px-6 h-9 text-sm font-medium`}>
            {isPending ? "Joining..." : "Join"}
          </Button> } 
        </div>
      </div>
    </div>
  );
};
