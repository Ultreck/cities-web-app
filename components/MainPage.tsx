"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Users,
  ShoppingBag,
  Gift,
  Bell,
  MessageSquare,
  MapPin,
  TrendingUp,
  Calendar,
  Briefcase,
  Building2,
  User,
  Settings,
  Send,
  DollarSign,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  currentUser,
  initialCommunities,
  initialEvents,
  initialJobs,
  initialMessages,
  initialNotifications,
  initialProperties,
} from "@/lib/helper";
import { SearchBar } from "./SearchBar";
import { PostCard } from "./PostCard";
import { NotificationsPage } from "./pages/NotificationsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import usePostHook from "@/hooks/use-post-hook";
import { RePostType } from "@/types/type-props";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/redux/selectors";
// import { NotificationsPage } from "./pages/NotificationsPage";
// import { MessagesPage } from "./pages/MessagesPage";
// import { ProfilePage } from "./ProfilePage";
// import { SettingsPage } from "./SettingsPage";

function MainPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const details = useSelector(selectUserDetails);
  // State management
  // const [posts, setPosts] = useState(initialPosts);

  const [communities, setCommunities] = useState(initialCommunities);
  const [notifications, _setNotifications] = useState(initialNotifications);
  const [messages, _setMessages] = useState(initialMessages);
  const { handlePostLikes, handleRepost, posts } = usePostHook();

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.reduce((sum, msg) => sum + msg.unread, 0);

  // Search data - combine all searchable items
  const searchData = [...posts.map((p) => ({ ...p, type: "post" }))];

  const handleSearch = (item: { type: string }) => {
    console.log("Selected:", item);
    // Navigate to the appropriate tab based on item type
    // if (item.type === "community") {
    //   setActiveTab("community");
    // } else if (item.type === "job") {
    //   setActiveTab("forsale");
    // }
  };

  const handleLike = (postId: string, liked: boolean) => {
    // setPosts((prev) =>
    //   prev.map((post) =>
    //     post.id === postId
    //       ? {
    //           ...post,
    //           likedByUser: liked,
    //           likes: liked ? post.likes + 1 : post.likes - 1,
    //         }
    //       : post
    //   )
    // );
  };

  const handleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((comm) =>
        comm.id === communityId ? { ...comm, joined: !comm.joined } : comm
      )
    );
  };

  interface NavItemProps {
    icon: LucideIcon;
    label: string;
    active: boolean;
    onClick: () => void;
    badge?: number;
  }

  const NavItem = ({ icon: Icon, label, active, onClick, badge }: NavItemProps) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      {/* {icon} */}
      <span className="font-medium hidden lg:inline">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge
          variant="destructive"
          className="absolute top-1 left-8 lg:left-auto lg:right-2 h-5 min-w-5 flex items-center justify-center p-1"
        >
          {badge > 99 ? "99+" : badge}
        </Badge>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              MCity
            </h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            {/* <SearchBar
              placeholder="Search communities, posts, people..."
              data={searchData}
              onSearch={handleSearch}
            /> */}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="w-5 h-5" />
              {unreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </Button>
            <Avatar
              className="w-8 h-8 cursor-pointer"
              onClick={() => setActiveTab("profile")}
            >
              <AvatarFallback>{currentUser.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
          )}

          {/* Sidebar Navigation */}
          <aside
            className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-background z-40
            w-64 p-4 space-y-2
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:w-20 xl:w-64 lg:border-r
          `}
          >
            <NavItem
              icon={Home}
              badge={0}
              label="Home"
              active={activeTab === "home"}
              onClick={() => {
                setActiveTab("home");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              badge={0}
              icon={Users}
              label="Community"
              active={activeTab === "community"}
              onClick={() => {
                setActiveTab("community");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={ShoppingBag}
              label="For Sale"
              badge={0}
              active={activeTab === "forsale"}
              onClick={() => {
                setActiveTab("forsale");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              badge={0}
              icon={Gift}
              label="Rewards"
              active={activeTab === "rewards"}
              onClick={() => {
                setActiveTab("rewards");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={Bell}
              label="Notifications"
              active={activeTab === "notifications"}
              badge={unreadNotifications}
              onClick={() => {
                setActiveTab("notifications");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={MessageSquare}
              label="Messages"
              active={activeTab === "messages"}
              badge={unreadMessages}
              onClick={() => {
                setActiveTab("messages");
                setMobileMenuOpen(false);
              }}
            />

            <div className="pt-6 mt-6 border-t space-y-2">
              <NavItem
                badge={0}
                icon={User}
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => {
                  setActiveTab("profile");
                  setMobileMenuOpen(false);
                }}
              />
              <NavItem
                badge={0}
                icon={Settings}
                label="Settings"
                active={activeTab === "settings"}
                onClick={() => {
                  setActiveTab("settings");
                  setMobileMenuOpen(false);
                }}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Home Tab */}
            {activeTab === "home" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* Mobile Search */}
                  <div className="md:hidden mb-4">
                    {/* <SearchBar
                      placeholder="Search..."
                      data={searchData}
                      onSearch={handleSearch}
                    /> */}
                  </div>

                  {/* Create Post */}
                  {/* <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>{currentUser.avatar}</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="What is going on in your community?"
                          className="flex-1"
                        />
                        <Button>Post</Button>
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* Posts Feed */}
                  {posts.map((post) => (
                    <PostCard
                      key={post.post_id}
                      handlePostLikes={handlePostLikes}
                      handleRepost={handleRepost}
                      post={post}
                      // onLike={handleLike}
                    />
                  ))}
                </div>

                {/* Right Sidebar */}
                <div className="hidden sticky sti top-0 lg:block space-y-4">
                  {/* Balance Card */}
                  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="text-lg">Balance</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Ledger balance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        N{currentUser.balance.toLocaleString()}
                      </div>
                      <div className="text-sm text-primary-foreground/80 mb-4">
                        +N0.00 last 7 days
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" size="sm">
                          <Send className="w-4 h-4 mr-2" />
                          Transfer
                        </Button>
                        <Button variant="secondary" size="sm">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Fund
                        </Button>
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
                      {communities.slice(0, 3).map((community) => (
                        <div
                          key={community.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{community.image}</div>
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
                            variant={community.joined ? "outline" : "default"}
                            onClick={() => handleJoinCommunity(community.id)}
                          >
                            {community.joined ? "Joined" : "Join"}
                          </Button>
                        </div>
                      ))}
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
                          <Button size="sm" className="w-full">
                            Get Ticket
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Community Tab */}
            {activeTab === "community" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl font-bold">Communities</h2>
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Create Community
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="joined">Joined</TabsTrigger>
                    <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {communities.map((community) => (
                        <Card
                          key={community.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex gap-3">
                                <div className="text-4xl">
                                  {community.image}
                                </div>
                                <div>
                                  <CardTitle className="text-lg">
                                    {community.name}
                                  </CardTitle>
                                  <CardDescription>
                                    {community.members} members
                                  </CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">
                                {community.status}
                              </Badge>
                              <Button
                                size="sm"
                                variant={
                                  community.joined ? "outline" : "default"
                                }
                                onClick={() =>
                                  handleJoinCommunity(community.id)
                                }
                              >
                                {community.joined ? "Joined" : "Join"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* For Sale Tab */}
            {activeTab === "forsale" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Marketplace</h2>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full sm:w-auto grid grid-cols-5 sm:flex">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    <TabsTrigger value="rent">Rent</TabsTrigger>
                    <TabsTrigger value="providers">Providers</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6 space-y-6">
                    {/* Events Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Events
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {initialEvents.map((event) => (
                          <Card
                            key={event.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardHeader>
                              <CardTitle className="text-base line-clamp-2">
                                {event.name}
                              </CardTitle>
                              <CardDescription>
                                {event.organizer}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                {event.location}
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t">
                                <span className="font-semibold">
                                  {event.price}
                                </span>
                                <Button size="sm">Get Ticket</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Jobs Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Jobs
                      </h3>
                      <div className="space-y-3">
                        {initialJobs.map((job) => (
                          <Card
                            key={job.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardContent className="pt-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-lg mb-1">
                                    {job.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Building2 className="w-4 h-4" />
                                      {job.company}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {job.location}
                                    </span>
                                    <Badge variant="secondary">
                                      {job.type}
                                    </Badge>
                                  </div>
                                  <div className="mt-2 font-semibold text-primary">
                                    {job.salary}
                                  </div>
                                </div>
                                <Button>Apply</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Properties Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Properties for Rent
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {initialProperties.map((property) => (
                          <Card
                            key={property.id}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardHeader>
                              <div className="text-6xl text-center py-4">
                                {property.image}
                              </div>
                              <CardTitle className="text-base">
                                {property.title}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {property.location}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">
                                  {property.price}
                                </span>
                                <Button size="sm">View</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {/* Rewards Tab */}
            {activeTab === "rewards" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Rewards</h2>

                <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Your Reward Points
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Earn points by engaging with your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-bold mb-4">2,450 pts</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                        <div className="text-sm opacity-90">This Month</div>
                        <div className="text-xl font-bold">+340 pts</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                        <div className="text-sm opacity-90">Rank</div>
                        <div className="text-xl font-bold">#42</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <NotificationsPage  />
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && <MessagesPage messages={messages} />}

            {/* Profile Tab */}
            {/* {activeTab === "profile" && (
              <ProfilePage user={details?? {}} posts={posts} />
            )} */}

            {/* Settings Tab */}
            {activeTab === "settings" && <SettingsPage />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainPage;