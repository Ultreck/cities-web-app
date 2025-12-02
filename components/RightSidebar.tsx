import React, { useEffect, useState } from "react";
import {
  currentUser,
  initialCommunities,
  initialEvents,
  initialJobs,
} from "@/lib/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  Eye,
  FileText,
  Heart,
  MapPin,
  Send,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import clientApi from "@/apis/clientApi";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/userSlice";
import Link from "next/link";
import { useGetProfile } from "@/apis/auth";
import { useGetAllCommunities } from "@/apis/communityMutation";
import { useJoinCommunityMutation } from '@/apis/communityMutation';

const RightSidebar = () => {
  const [communities, setCommunities] = useState(initialCommunities);
  const { data, isLoading } = useGetProfile();
  const { data: realCommunities, isLoading: communitiesLoading } = useGetAllCommunities();
  const { mutateAsync: joinCommunity, isPending: joinPending } = useJoinCommunityMutation();
  const dispatch = useDispatch();

  console.log("Profile data:", data);
  console.log("Real communities:", realCommunities);

  useEffect(() => {
    if (data) {
      dispatch(setUser({ details: data.user }));
    }
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading, data]);

  // Handle join community
  const handleJoinCommunity = async (communityId: string) => {
    const payload = { community_id: communityId };
    try {
      await joinCommunity(payload);
      // Update the local state to reflect the join status
      if (realCommunities) {
        setCommunities(prev => 
          prev.map(comm => 
            comm.unique_id === communityId 
              ? { ...comm, isMember: 1, members: comm.members + 1 }
              : comm
          )
        );
      }
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  // Use real communities if available, otherwise use initial ones
  const displayCommunities = realCommunities ? realCommunities.slice(0, 3) : communities.slice(0, 3);

  return (
    <div>
      <div className="hidden sticky top-0 lg:block space-y-4">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Balance</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Ledger balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              ₦{currentUser.balance.toLocaleString()}
            </div>
            <div className="text-sm text-primary-foreground/80 mb-4">
              +₦0.00 last 7 days
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link className="w-full" href="/n/wallets/transfers">
                <Button className="w-full" variant="secondary" size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Transfer
                </Button>
              </Link>
              <Link className="w-full" href="/n/wallets/">
                <Button className="w-full" variant="secondary" size="sm">
                  <Wallet className="w-4 h-4 mr-2" />
                  wallet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Trending Communities */}
       <Card>
  <CardHeader>
    <CardTitle className="text-lg flex items-center gap-2">
      <TrendingUp className="w-5 h-5" />
      Trending Communities
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {communitiesLoading ? (
      // Loading skeletons for communities
      [...Array(3)].map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {/* Avatar skeleton */}
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              {/* Name skeleton */}
              <Skeleton className="h-3 w-24" />
              {/* Members count skeleton */}
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          {/* Button skeleton */}
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      ))
    ) : displayCommunities.length > 0 ? (
      // Actual content when loaded
      <>
        {displayCommunities.map((community) => (
          <div
            key={community.unique_id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {/* Community icon/avatar - using first letter of name as fallback */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {community.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="font-medium text-sm">
                  {community.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {community.members} members
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant={community.isMember ? "outline" : "secondary"}
              onClick={() => handleJoinCommunity(community.unique_id)}
              disabled={joinPending}
              className={`${
                community.isMember
                  ? "bg-gray-100 text-black hover:bg-slate-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {joinPending ? "..." : community.isMember ? "Joined" : "Join"}
            </Button>
          </div>
        ))}
        
        {/* View All Communities Link */}
        <div className="pt-2 border-t border-gray-100">
          <Link href="/n/communities">
            <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View all communities
            </Button>
          </Link>
        </div>
      </>
    ) : (
      // Empty state when no communities
      <div className="text-center py-4">
        <div className="text-muted-foreground text-sm">No communities found</div>
      </div>
    )}
  </CardContent>
</Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="space-y-2 pb-3 border-b last:border-0 last:pb-0"
              >
                <div className="font-medium text-sm line-clamp-2">
                  {event.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {event.location}
                </div>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white py-3 w-full"
                >
                  Get Ticket
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Create and Share
              </h4>
              <p className="text-slate-600">
                Create beautiful posts with multiple images. Control who can
                see your content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Eye size={20} className="text-purple-600" />
                Track Engagement
              </h4>
              <p className="text-slate-600">
                See who viewed and liked your posts. Connect with engaged
                users.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <ShoppingBag size={20} className="text-green-600" />
                Marketplace
              </h4>
              <p className="text-slate-600">
                Browse products and list your own items for sale with detailed
                descriptions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Heart size={20} className="text-red-600" />
                Community
              </h4>
              <p className="text-slate-600">
                Connect with users, like posts, and build meaningful
                relationships.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RightSidebar;