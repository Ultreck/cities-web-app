'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Ban, Trash2 } from 'lucide-react';

interface BlockedUser {
  id: string;
  name: string;
  avatar: string;
  blockedDate: string;
  reason: string;
}

const mockBlockedUsers: BlockedUser[] = [
  {
    id: '1',
    name: 'Spam User 1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    blockedDate: '2 weeks ago',
    reason: 'Spam and harassment',
  },
  {
    id: '2',
    name: 'Inappropriate User',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    blockedDate: '1 month ago',
    reason: 'Inappropriate content',
  },
  {
    id: '3',
    name: 'Scammer Account',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    blockedDate: '3 weeks ago',
    reason: 'Suspicious activity',
  },
];

export default function BlockedUsers() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(mockBlockedUsers);

  const handleUnblock = (userId: string) => {
    setBlockedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blocked Users</h1>
        <p className="text-gray-600">
          Manage users you have blocked. You can unblock them at any time.
        </p>
      </div>

      {/* Blocked Users List */}
      {blockedUsers.length > 0 ? (
        <div className="space-y-3">
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">
                    Blocked {user.blockedDate} • {user.reason}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnblock(user.id)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Unblock
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <Ban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Blocked Users</h3>
          <p className="text-gray-600">
            You haven&apos;t blocked any users. Users you block will appear here.
          </p>
        </div>
      )}

      {/* Block Info */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h3 className="font-semibold text-blue-900 mb-2">About Blocking</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Blocked users cannot see your profile or send you messages</li>
          <li>You won&apos;t see posts or comments from blocked users</li>
          <li>Blocking is private - the other user won&apos;t be notified</li>
          <li>You can unblock users at any time from this page</li>
        </ul>
      </div>
    </div>
  );
}