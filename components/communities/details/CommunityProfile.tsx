'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommunityHeader } from './CommunityHeader';
import { MemberCard } from './MemberCard';
import { useSelector } from 'react-redux';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  joinDate: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Community Manager',
    bio: 'Passionate about building communities and connecting people.',
    joinDate: '2 years ago',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Event Organizer',
    bio: 'Love organizing events and bringing people together.',
    joinDate: '1 year ago',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'Developer',
    bio: 'Tech enthusiast and community contributor.',
    joinDate: '6 months ago',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Designer',
    bio: 'Creative designer passionate about UX/UI.',
    joinDate: '3 months ago',
  },
];

export default function CommunityProfile({children, setActiveTab, activeTab, community, hasJoined}: {children: React.ReactNode, setActiveTab: React.Dispatch<React.SetStateAction<string>>, activeTab: string, community: any, hasJoined: boolean}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingMembers, setFollowingMembers] = useState<Set<string>>(new Set());
     const user = useSelector((state: any) => state.user.details);
 console.log({'User in main component':user});

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMemberFollow = (memberId: string) => {
    const newFollowing = new Set(followingMembers);
    if (newFollowing.has(memberId)) {
      newFollowing.delete(memberId);
    } else {
      newFollowing.add(memberId);
    }
    setFollowingMembers(newFollowing);
  };

  return (
    <div className="space-y-4 bg-white">
      {/* Community Header */}
      <CommunityHeader
        name={`${community?.name} Community`}
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop"
        members={2450}
        views={5000}
  likes={3000}
  dislikes={500}
  comments={1000}
  setActiveTab={setActiveTab}
  activeTab={activeTab}
  hasJoined={hasJoined}
  community={community}
        // description="A vibrant community dedicated to celebrating Latin culture, traditions, and fostering connections among members."
        // isFollowing={isFollowing}
        // onFollow={handleFollow}
      />

      <div className=''>
        {children}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Members</h2>
            <Button variant="outline" size="sm">
              View All ({mockMembers.length})
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* {mockMembers.map((member) => (
              <MemberCard
                key={member.id}
                {...member}
                isFollowing={followingMembers.has(member.id)}
                onFollow={() => handleMemberFollow(member.id)}
                onMessage={() => console.log('Message', member.name)}
              />
            ))} */}
            {community?.users.map((member) => (
              <MemberCard
                key={member.unique_id}
                {...member}
                isFollowing={followingMembers.has(member.unique_id)}
                onFollow={() => handleMemberFollow(member.unique_id)}
                onMessage={() => console.log('Message', member.name)}
                isLoggedInUser={user?.unique_id===member.unique_id}
              />
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Community</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Latin Community is a welcoming space for individuals who share a passion for Latin culture, traditions, and heritage. We celebrate the rich diversity of Latin American countries and foster meaningful connections among our members.
              </p>
              <p>
                Our community organizes regular events, workshops, and social gatherings to promote cultural exchange and community engagement. Whether you&apos;re interested in language learning, cultural celebrations, or simply connecting with like-minded individuals, you&apos;ll find a home here.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6">What We Offer</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Cultural events and celebrations</li>
                <li>Language learning opportunities</li>
                <li>Networking and social gatherings</li>
                <li>Job opportunities and career development</li>
                <li>Housing and rental listings</li>
                <li>Local business directory</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Rules</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Be Respectful</h3>
                <p>Treat all members with respect and dignity. Harassment, discrimination, and hate speech are not tolerated.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Keep It Relevant</h3>
                <p>Keep discussions and posts relevant to the community. Off-topic content may be removed.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. No Spam or Advertising</h3>
                <p>Avoid excessive self-promotion or spam. Approved business partners may advertise with community moderator approval.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Protect Privacy</h3>
                <p>Do not share personal information of other members without consent.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Report Issues</h3>
                <p>If you encounter inappropriate behavior, please report it to the community moderators.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}