'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Heart, Calendar, User } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onContact?: () => void;
  // New props from backend data
  images?: string[];
  currency?: string;
  rentType?: string;
  user?: {
    first_name?: string;
    last_name?: string;
    profile_pic?: string;
    phone_number?: string;
  };
  createdAt?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  image,
  price,
  location,
  bedrooms = 0,
  bathrooms = 0,
  description,
  isFavorite = false,
  onFavorite,
  onContact,
  // New props with defaults
  images = [],
  currency = 'N',
  rentType = 'rent',
  user,
  createdAt
}) => {
  // Format price with currency and rent type
  // const formattedPrice = `${currency} ${price}`;
  const formattedPrice = price;
  const formattedRentType = rentType ? `/${rentType}` : '';

  // Format date if available
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-property.jpg';
          }}
        />
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white"
            onClick={onFavorite}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formattedPrice}{formattedRentType}
        </div>

        {/* Image Count Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            +{images.length - 1} more
          </div>
        )}

        {/* Rent Type Badge */}
        {rentType && rentType !== 'rent' && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
            {rentType}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and User Info */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg flex-1 mr-2 line-clamp-2">
            {title}
          </h3>
          {user && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{user.first_name} {user.last_name}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="truncate">{location}</span>
        </div>

        {/* Features - Only show if we have data */}
        {(bedrooms > 0 || bathrooms > 0) && (
          <div className="flex gap-4 mb-4 text-sm text-gray-600">
            {bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
            )}
            {bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Posted Date */}
        {createdAt && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Calendar className="w-3 h-3" />
            <span>Posted {formatDate(createdAt)}</span>
          </div>
        )}

        {/* Action Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onContact}
        >
          {user ? 'Contact Owner' : 'View Details'}
        </Button>

        {/* Phone Number (if available) */}
        {user?.phone_number && (
          <div className="mt-2 text-center">
            <a 
              href={`tel:${user.phone_number}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              📞 {user.phone_number}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};