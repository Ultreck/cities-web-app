"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, MapPin } from "lucide-react";
import { CreatePostModal, PostData } from "./CreatePostModal";
import { PropertyCard } from "./PropertyCard";
import { useGetAllRents } from "@/apis/communityMutation";
import { RentPostingModal } from "../modals/RentPostingModal";
import { CommunityProps, RentItemProps } from "@/types/type-props";

interface Property {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  images?: string[];
  currency?: string;
  rentType?: string;
  user?: { [key: string]: unknown };
}

export default function Rent({
  community,
  hasJoined,
}: {
  community: CommunityProps;
  hasJoined: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>("");
  const [favoriteProperties, setFavoriteProperties] = useState<Set<string>>(
    new Set()
  );
  const [localProperties, setLocalProperties] = useState<Property[]>([]);
  const { data: allRentData, isLoading: rentDataLoading } = useGetAllRents(
    community?.unique_id
  );

  console.log({ allRentData });
  // Transform API data to Property format
  const apiProperties: Property[] =
    allRentData?.map((property: RentItemProps) => ({
      id: property.unique_id,
      title: property.name || "Untitled Property",
      image: property.media?.[0]?.media || "/default-property.jpg",
      images:
        property.media?.map(
          (media: {
            media: string;
            is_pdf: boolean;
            is_image: boolean;
            is_video: boolean;
          }) => media.media
        ) || [],
      price: `${property.currency || ""} ${property.price || "0"}`.trim(),
      location: property.location || "Location not specified",
      bedrooms: 0, // You might want to add this field to your API
      bathrooms: 0, // You might want to add this field to your API
      description: `Available for ${property.rent_type || "rent"}`,
      currency: property.currency,
      rentType: property.rent_type,
      user: property.user,
    })) || [];

  // Combine API properties with locally created properties
  const allProperties = [...apiProperties, ...localProperties];

  const handleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favoriteProperties);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavoriteProperties(newFavorites);
  };

  const handleCreateProperty = (data: PostData) => {
    const newProperty: Property = {
      id: String(Date.now()), // Temporary ID for local properties
      title: data.title,
      image: "/default-property.jpg",
      price: data.salary || "Contact for price",
      location: data.location || "TBD",
      bedrooms: 2, // Default values
      bathrooms: 1, // Default values
      description: data.description,
    };
    setLocalProperties((prev) => [newProperty, ...prev]);
    setIsModalOpen(false);
  };

  const filteredProperties = allProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Skeleton loading component
  const PropertyCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Home className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No rental properties yet
        </h3>
        <p className="text-gray-600 mb-6">
          There are currently no rental properties listed in this community. Be
          the first to post a property for rent!
        </p>
        {hasJoined && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Post first property
          </Button>
        )}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-600">
          No properties match your search for &ldquo;
          <span className="font-medium">{searchQuery}</span>&rdquo;. Try
          different keywords.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rental Properties</h1>
        {hasJoined && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Post new property
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search properties by title, location, or description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // console.log('This is inside the search input:',e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {/* Loading State */}
      {rentDataLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty State - No properties at all */}
      {!rentDataLoading && allProperties.length === 0 && <EmptyState />}

      {/* Properties Grid - When data is loaded and we have properties */}
      {!rentDataLoading && allProperties.length > 0 && (
        <>
          {filteredProperties.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  isFavorite={favoriteProperties.has(property.id)}
                  onFavorite={() => handleFavorite(property.id)}
                  onContact={() => console.log("Contact:", property.title)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Property Modal */}
      <RentPostingModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        communityId={community?.unique_id}
      />
      {/* <CreatePostModal
        isOpen={isModalOpen}
        title="Post new property"
        description="List a property for rent in the community"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProperty}
        type="property"
      /> */}
    </div>
  );
}
