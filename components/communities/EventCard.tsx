// components/EventCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  description: string;
  onAttend: (id: string) => void;
}

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  price,
  image,
  description,
  onAttend
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      {/* Event Image */}
      <div className="h-48 bg-gray-200 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-event.jpg';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900 shadow-sm">
            {price}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{date}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => onAttend(id)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
          >
            Attend Event
          </Button>
        </div>
      </div>
    </div>
  );
}