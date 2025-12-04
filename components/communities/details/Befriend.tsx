import { useState } from 'react';
import { Upload, ChevronDown } from 'lucide-react';
import { useGetBefriends } from '@/apis/userMutation';

interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'John',
    age: 29,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '2',
    name: 'Sarah',
    age: 32,
    image: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '3',
    name: 'Deborah',
    age: 29,
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '4',
    name: 'Tasha',
    age: 32,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '5',
    name: 'Michael',
    age: 30,
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '6',
    name: 'Amanda',
    age: 28,
    image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '7',
    name: 'David',
    age: 31,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=400&h=500&fit=crop',
  },
  {
    id: '8',
    name: 'Nicole',
    age: 27,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=500&fit=crop',
  },
];

export default function Befriend() {
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(4);

  const { data: friends, isLoading: friendsLoading } = useGetBefriends();

  console.log({friends});

  const handleConnect = (id: string) => {
    const newConnected = new Set(connectedIds);
    if (newConnected.has(id)) {
      newConnected.delete(id);
    } else {
      newConnected.add(id);
    }
    setConnectedIds(newConnected);
  };

  const visibleProfiles = mockProfiles.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Let&apos;s hang out</h1>
          <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <Upload className="w-5 h-5" />
            <span className="font-medium text-gray-900">Upload</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleProfiles.map((profile) => (
            <div
              key={profile.id}
              className="group relative h-60 lg:h-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
                <h2 className="font-bold text-white mb-4">
                  {profile.name}, {profile.age}
                </h2>
                <button
                  onClick={() => handleConnect(profile.id)}
                  className={`px-4 py-1 rounded-full font-medium border transition-all ${
                    connectedIds.has(profile.id)
                      ? 'bg-white text-gray-900 border-white'
                      : 'border-white text-white hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {connectedIds.has(profile.id) ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayCount < mockProfiles.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setDisplayCount(displayCount + 4)}
              className="flex items-center gap-2 px-6 py-1 border-2 border-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">More</span>
              <ChevronDown className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}