'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, MessageCircle, MoreVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useFollowFriendMutation } from '@/apis/userMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface MemberCardProps {
  unique_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  role: string;
  bio_info: string;
  joinDate: string;
  isFollowing?: boolean;
  follow:number,
  onFollow?: () => void;
  onMessage?: () => void;
  isLoggedInUser?:boolean;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  unique_id,
  first_name,
  last_name,
  profile_pic,
  role,
  bio_info,
  joinDate,
  isFollowing = false,
  isLoggedInUser,
  follow,
  onFollow,
  onMessage,
}) => {

  const {mutateAsync:followFriend, isPending} = useFollowFriendMutation()
   const router = useRouter();

    const handleFollow=async()=>{
  try {
    await followFriend({friend_id:unique_id})
  } catch (error) {
    toast.error(error.response.message || "There is an error following this user, please try again.");
  }
    }

      const goToProfile = () => {
    router.push(`/n/profile/${unique_id}`);
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={profile_pic}
            alt={`${first_name} ${last_name}`}
            className="w-12 h-12 rounded-full object-cover"
            onClick={goToProfile}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{`${first_name} ${last_name}`}</h3>
            <p className="text-xs text-blue-600 font-medium">{role}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{bio_info}</p>

      {/* Join Date */}
      <p className="text-xs text-gray-500 mb-4">Joined {joinDate}</p>

      {/* Actions */}
   {!isLoggedInUser && <div className="flex gap-2">
    <div>
      {follow?<Button
          variant='secondary'
          size="sm"
          className="flex-1 text-xs"
        >
          <Heart className="w-3 h-3 mr-1" />
          Following
        </Button>:   <Button
          variant='default'
          size="sm"
          className="flex-1 text-xs"
          onClick={handleFollow}
          disabled={isPending}
        >
          
          {isPending? <span className="flex items-center"><Loader2 size={18} className="animate-spin" /> wait...</span> : <span className="flex items-center"> <Heart className="w-3 h-3" />
             Follow</span> }
        </Button>}
    </div>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          onClick={onMessage}
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          Message
        </Button>
      </div>}
    </div>
  );
};

