'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';
import { CreatePostModal, PostData } from './CreatePostModal';
import { EventCard } from '../EventCard';
import { useGetEvents } from '@/apis/communityMutation';
import { EventCreatingModal } from '../modals/EventCreatingModal';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  description: string;
  from?: string;
  to?: string;
  currency?: string;
}

export default function Events({ community, hasJoined }: { community: any, hasJoined:boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [localEvents, setLocalEvents] = useState<Event[]>([]);
  const { data: eventData, isLoading } = useGetEvents(community?.unique_id);

  // Transform API data to Event format
  const apiEvents: Event[] = eventData?.map((event: any) => {
    const { date: formattedDate, time: formattedTime } = formatEventDateTime(event.from, event.to);
    
    return {
      id: event.unique_id,
      title: event.name || 'Untitled Event',
      date: formattedDate,
      time: formattedTime,
      location: event.location || 'Location not specified',
      price: event.amount ? `${event.currency || ''} ${event.amount}`.trim() : 'Free',
      image: event.company_logo || 'https://media.istockphoto.com/id/2159341791/photo/multicultural-business-professionals-celebrating-success.jpg?s=612x612&w=0&k=20&c=wLFEi3qelwH1lqva0Hug4jhtckwrnofl0bnEihn2U4Q=',
      description: event.about || 'No description provided',
      from: event.from,
      to: event.to,
      currency: event.currency
    };
  }) || [];

  // Combine API events with locally created events
  const allEvents = [...apiEvents, ...localEvents];

  const handleCreateEvent = (data: PostData) => {
    const newEvent: Event = {
      id: String(Date.now()), // Temporary ID for local events
      title: data.title,
      date: 'Just added',
      time: 'TBD',
      location: data.location || 'TBD',
      price: data.salary || 'Free',
      image: '/default-event.jpg',
      description: data.description,
    };
    setLocalEvents(prev => [newEvent, ...prev]);
    setIsModalOpen(false);
  };

  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format event date and time from API data
  function formatEventDateTime(from: string, to: string): { date: string; time: string } {
    if (!from) return { date: 'Date TBD', time: 'Time TBD' };

    try {
      // Check if it's ISO format (like "2025-10-30T09:00:00.000")
      if (from.includes('T')) {
        const fromDate = new Date(from);
        const toDate = to ? new Date(to) : null;
        
        const date = fromDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const fromTime = fromDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        if (toDate) {
          const toTime = toDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          return { date, time: `${fromTime} - ${toTime}` };
        }

        return { date, time: fromTime };
      } else {
        // Handle custom format (like "29, Jun 9:00 AM")
        // Just return the raw strings for display
        return {
          date: from.split(' ').slice(0, 2).join(' '), // Take first two parts for date
          time: to ? `${from.split(' ').slice(2).join(' ')} - ${to.split(' ').slice(2).join(' ')}` : from.split(' ').slice(2).join(' ')
        };
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      return { date: 'Invalid date', time: 'Invalid time' };
    }
  }

  // Skeleton loading component
  const EventCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
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
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
        <p className="text-gray-600 mb-6">
          There are currently no events in this community. Be the first to create an event and bring people together!
        </p>
    {hasJoined  &&  <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Create first event
        </Button>}
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-600">
          No events match your search for "<span className="font-medium">{searchQuery}</span>". Try different keywords.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
      {hasJoined &&  <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Create event
        </Button>}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search events by title, location, or description..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Empty State - No events at all */}
      {!isLoading && allEvents.length === 0 && <EmptyState />}

      {/* Events Grid - When data is loaded and we have events */}
      {!isLoading && allEvents.length > 0 && (
        <>
          {filteredEvents.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onAttend={() => console.log('Attending:', event.title)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Event Modal */}
      <EventCreatingModal open={isModalOpen} setOpen={setIsModalOpen} communityId={community?.unique_id} />
      {/* <CreatePostModal
        isOpen={isModalOpen}
        title="Create new event"
        description="Create an event for the community to attend"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEvent}
        type="event"
      /> */}
    </div>
  );
}