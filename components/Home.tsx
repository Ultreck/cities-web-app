"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Users,
  ShoppingBag,
  Gift,
  Search,
  Bell,
  MessageSquare,
  MapPin,
  Share2,
  MessageCircle,
  TrendingUp,
  Calendar,
  Briefcase,
  Building2,
  User,
  Settings,
  ChevronRight,
  DollarSign,
  Send,
  Clock,
  Eye,
  ThumbsUp,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample data
  const communities = [
    {
      id: 1,
      name: "Lekki Community",
      members: "35k",
      image: "🏘️",
      status: "Public",
    },
    {
      id: 2,
      name: "Victoria Island",
      members: "235k",
      image: "🌆",
      status: "Public",
    },
    { id: 3, name: "Ikeja", members: "134k", image: "🏙️", status: "Public" },
    { id: 4, name: "Festac", members: "2.19k", image: "🏢", status: "Public" },
  ];

  const posts = [
    {
      id: 1,
      author: "David Adeleke",
      username: "@davido",
      avatar: "👤",
      time: "14 mins ago",
      title: "Could North Korea handle a Covid-19 outbreak?",
      content:
        "So far, the country claims to have no cases of Covid-19 - but that has...",
      likes: "2.5k",
      comments: "420",
      shares: "345",
      views: "45",
    },
    {
      id: 2,
      author: "Peter Okoye",
      username: "@peterp",
      avatar: "👨",
      time: "28 mins ago",
      title: "Disturbing Letter About Life in COVID-19 Ward in...",
      content:
        "Earlier this week, British medical journal The Lancet published a...",
      likes: "2.5k",
      comments: "420",
      shares: "345",
      views: "45",
    },
    {
      id: 3,
      author: "MTN Nigeria",
      username: "@mtnng",
      avatar: "📱",
      time: "1 hour ago",
      title: "Buy the MTN 5G smartphone",
      content:
        "Buy the MTN 5G smartphone and stand a chance to win a Sony headphone",
      likes: "2.5k",
      comments: "420",
      shares: "345",
      views: "45",
      sponsored: true,
    },
  ];

  const events = [
    {
      id: 1,
      name: "NIGHT OF MERCY 14 - AMOS FENWA",
      date: "Sat, Jan 18 • 10:00pm",
      location: "Lekki",
      price: "From $5.00",
      organizer: "Clan Africa",
    },
    {
      id: 2,
      name: "Election Night Watch Party",
      date: "Sat, Jan 18 • 10:00pm",
      location: "Lekki",
      price: "From $5.00",
      organizer: "WorQulture",
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "The Tonic Technologies LTD",
      location: "Lekki",
      salary: "N100k a month",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Full-stack Software Developer",
      company: "WorQulture",
      location: "Lagos",
      salary: "N350k a month",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Administrative/Front Desk Officer",
      company: "Clan Africa",
      location: "Lekki",
      salary: "N150k a month",
      type: "Full-time",
    },
  ];

  const properties = [
    {
      id: 1,
      title: "6 bedroom duplex",
      location: "Lekki",
      price: "N6,000,000 /month",
      type: "For rent",
      image: "🏠",
    },
    {
      id: 2,
      title: "Suny apartment",
      location: "Los Angeles",
      price: "$233 /per day",
      type: "For rent",
      image: "🏢",
    },
  ];

  const providers = [
    { name: "Most Famous Supermarket", type: "Supermarket", location: "Lekki" },
    { name: "Shoprite", type: "Supermarket", location: "Lagos" },
    { name: "Burger kings", type: "Eatery", location: "Lekki" },
    { name: "The place", type: "Hotel", location: "Lekki" },
    { name: "Cravings", type: "Eatery", location: "Amuwo Odofin" },
  ];

  const NavItem = ({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {icon}
      <span className="font-medium hidden lg:inline">{label}</span>
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
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search communities, posts, people..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarFallback>DA</AvatarFallback>
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
              icon={<Home/>}
              label="Home"
              active={activeTab === "home"}
              onClick={() => {
                setActiveTab("home");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={<Users/>}
              label="Community"
              active={activeTab === "community"}
              onClick={() => {
                setActiveTab("community");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={<ShoppingBag/>}
              label="For Sale"
              active={activeTab === "forsale"}
              onClick={() => {
                setActiveTab("forsale");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={<Gift />}
              label="Rewards"
              active={activeTab === "rewards"}
              onClick={() => {
                setActiveTab("rewards");
                setMobileMenuOpen(false);
              }}
            />

            <div className="pt-6 mt-6 border-t space-y-2">
              <NavItem
                onClick={() => {
                  setActiveTab("profile");
                  setMobileMenuOpen(false);
                }}
                icon={<User />}
                label="Profile"
                active={activeTab === "profile"}
              />
              <NavItem
                onClick={() => {
                  setActiveTab("settings");
                  setMobileMenuOpen(false);
                }}
                icon={<Settings />}
                label="Settings"
                active={activeTab === "settings"}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 grid lg:grid-cols-3 gap-6 min-w-0">
            <div className="lg:col-span-2">
            {activeTab === "home" && (
              <div className="">
                {/* Feed */}
                <div className="space-y-4">
                  {/* Search on mobile */}
                  <div className="md:hidden mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Search..." className="pl-10 w-full" />
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="What is going on in your community?"
                          className="flex-1"
                        />
                        <Button>Post</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts Feed */}
                  {posts.map((post) => (
                    <Card
                      key={post.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <Avatar>
                              <AvatarFallback>{post.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">
                                  {post.author}
                                </CardTitle>
                                {post.sponsored && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Sponsored
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="flex items-center gap-2">
                                {post.username} • {post.time}
                              </CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {post.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {post.likes}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {post.comments}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {post.shares}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {post.views}
                            </span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "community" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-3xl font-bold">Communities</h2>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
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
                              <Button size="sm">Join</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

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
                        {events.map((event) => (
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
                                <Clock className="w-4 h-4 text-muted-foreground" />
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
                        {jobs.map((job) => (
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
                        {properties.map((property) => (
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

                  <TabsContent value="events" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {events.map((event) => (
                        <Card
                          key={event.id}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardHeader>
                            <CardTitle className="text-base line-clamp-2">
                              {event.name}
                            </CardTitle>
                            <CardDescription>{event.organizer}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
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
                  </TabsContent>

                  <TabsContent value="jobs" className="mt-6">
                    <div className="space-y-3">
                      {jobs.map((job) => (
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
                                  <Badge variant="secondary">{job.type}</Badge>
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
                  </TabsContent>

                  <TabsContent value="rent" className="mt-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {properties.map((property) => (
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
                  </TabsContent>

                  <TabsContent value="providers" className="mt-6">
                    <div className="space-y-3">
                      {providers.map((provider, idx) => (
                        <Card
                          key={idx}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1">
                                  {provider.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  <Badge variant="outline">
                                    {provider.type}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {provider.location}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  Directions
                                </Button>
                                <Button size="sm">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Chat
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Refer a Friend",
                      points: "+100 pts",
                      icon: UserPlus,
                    },
                    {
                      title: "Post Daily",
                      points: "+10 pts",
                      icon: MessageCircle,
                    },
                    { title: "Join Community", points: "+50 pts", icon: Users },
                    {
                      title: "Attend Event",
                      points: "+75 pts",
                      icon: Calendar,
                    },
                    {
                      title: "Complete Profile",
                      points: "+25 pts",
                      icon: User,
                    },
                    { title: "Share Post", points: "+5 pts", icon: Share2 },
                  ].map((reward, idx) => (
                    <Card
                      key={idx}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <reward.icon className="w-6 h-6 text-primary" />
                          </div>
                          <Badge variant="secondary">{reward.points}</Badge>
                        </div>
                        <h3 className="font-semibold">{reward.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Redeem Rewards</CardTitle>
                    <CardDescription>
                      Use your points to get exclusive benefits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        name: "N1,000 Airtime",
                        cost: "500 pts",
                        available: true,
                      },
                      {
                        name: "Premium Badge",
                        cost: "1,000 pts",
                        available: true,
                      },
                      {
                        name: "Event Ticket",
                        cost: "2,000 pts",
                        available: true,
                      },
                      {
                        name: "N5,000 Transfer",
                        cost: "2,500 pts",
                        available: false,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.cost}
                          </div>
                        </div>
                        <Button size="sm" disabled={!item.available}>
                          {item.available ? "Redeem" : "Locked"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
            </div>

              {/* Right Sidebar */}
                <div className="hidden lg:block space-y-4">
                  {/* Balance Card */}
                  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="text-lg">Balance</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Ledger balance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">N247,034</div>
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
                          <Button size="sm" variant="outline">
                            Join
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
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="space-y-2 pb-3 border-b last:border-0 last:pb-0"
                        >
                          <div className="font-medium text-sm line-clamp-2">
                            {event.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
