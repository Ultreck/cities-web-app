'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users, Globe, User } from 'lucide-react';
import { useGetDiasporaUsers } from '@/apis/communityMutation';

interface DiasporaUser {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  description: string;
  about: string;
  profilePic: string;
  age: number | null;
  isConnected?: boolean;
}

export default function Diaspora({ community }: { community: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());
  const { data: diasporaUsers, isLoading: diasporaUserLoading } = useGetDiasporaUsers(community?.unique_id);

  // Transform API data to DiasporaUser format
  const diasporaProfiles: DiasporaUser[] = diasporaUsers?.map((user: any) => ({
    id: user.unique_id,
    name: `${user.user?.first_name || ''} ${user.user?.last_name || ''}`.trim() || 'Unknown User',
    location: user.reside_country || user.user?.country || 'Unknown Location',
    country: user.reside_country || user.user?.country || 'Unknown',
    image: user.media?.is_image ? user.media.media : (user.user?.profile_pic || '/default-avatar.jpg'),
    description: user.about || 'No description available',
    about: user.about || 'No information provided',
    profilePic: user.user?.profile_pic || '/default-avatar.jpg',
    age: user.user?.age || null
  })) || [];

  const handleConnect = (userId: string) => {
    const newConnected = new Set(connectedUsers);
    if (newConnected.has(userId)) {
      newConnected.delete(userId);
    } else {
      newConnected.add(userId);
    }
    setConnectedUsers(newConnected);
  };

  const filteredUsers = diasporaProfiles.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.about.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Skeleton loading component
  const UserCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Globe className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No diaspora members yet</h3>
        <p className="text-gray-600 mb-6">
          There are currently no diaspora members to display. Check back later to connect with people from around the world.
        </p>
      </div>
    </div>
  );

  // No search results state
  const NoSearchResults = () => (
    <div className="text-center py-8">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No members found</h3>
        <p className="text-gray-600">
          No diaspora members match your search for&dqote;<span className="font-medium">{searchQuery}</span>". Try different keywords.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Diaspora Network</h1>
        <p className="text-gray-600">
          Connect with diaspora members around the world and expand your network globally.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search diaspora members by name, location, or description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {diasporaUserLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty State - No users at all */}
      {!diasporaUserLoading && diasporaProfiles.length === 0 && <EmptyState />}

      {/* Users Grid - When data is loaded and we have users */}
      {!diasporaUserLoading && diasporaProfiles.length > 0 && (
        <>
          {filteredUsers.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden relative">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-avatar.jpg';
                      }}
                    />
                    {user.country && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {user.country}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                    {user.age && (
                      <p className="text-sm text-gray-500 mb-2">{user.age} years old</p>
                    )}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.about}</p>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{user.location}</span>
                      </div>
                      {user.country && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>From {user.country}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        connectedUsers.has(user.id)
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                      onClick={() => handleConnect(user.id)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {connectedUsers.has(user.id) ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Stats Section - Only show when we have data */}
      {!diasporaUserLoading && diasporaProfiles.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Network Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{diasporaProfiles.length}</div>
              <div className="text-sm text-gray-600">Diaspora Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Array.from(new Set(diasporaProfiles.map(user => user.country))).length}
              </div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{connectedUsers.size}</div>
              <div className="text-sm text-gray-600">Your Connections</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}