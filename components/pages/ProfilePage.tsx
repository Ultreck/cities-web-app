"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Users,
  Edit,
  Mail,
  Phone,
  MessageCircle,
  Share2,
  DollarSign,
  UserPlus,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { RePostType } from "@/types/type-props";

interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  connections: string;
  posts: number;
  communities: number;
  media: number;
  avatar: string;
}

interface Post {
  id: string;
  image: string | StaticImageData;
  title?: string;
}

interface ProfilePageProps {
  user?: User;
  posts?: RePostType[];
}

export function ProfilePage({ user, posts = [] }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user || {} as User);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedUser(user || {} as User);
    setIsEditing(false);
  };

    const [activeTab, setActiveTab] = useState<"posts" | "community" | "media">("posts");
  
    const tabs = [
      { id: "posts" as const, label: "Posts" },
      { id: "community" as const, label: "Community" },
      { id: "media" as const, label: "Media" },
    ];

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-4xl">
                  {user?.avatar}
                </AvatarFallback>
              </Avatar>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Username</Label>
                      <Input
                        value={editedUser.username}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={editedUser.phone}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Location</Label>
                      <Input
                        value={editedUser.location}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Bio</Label>
                      <Textarea
                        value={editedUser.bio}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, bio: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-3xl font-bold">{user?.name}</h2>
                    <p className="text-muted-foreground">{user?.username}</p>
                  </div>

                  <p className="text-sm">{user?.bio}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {user?.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Joined {user?.joinDate}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {user?.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">{user?.connections}</span>
                    <span className="text-muted-foreground">connections</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pay
                    </Button>
                    <Button variant="outline">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{user?.posts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{user?.communities}</div>
            <div className="text-sm text-muted-foreground">Communities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{user?.media}</div>
            <div className="text-sm text-muted-foreground">Media</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
       {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 font-semibold text-center transition ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "posts" && (
              <div className="grid grid-cols-3 gap-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition"
                  >
                    {/* <Image
                      src={post.image}
                      alt={`post-${post.id}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "community" && (
              <div className="text-center py-8 text-gray-500">
                <p>No community posts yet</p>
              </div>
            )}

            {activeTab === "media" && (
              <div className="text-center py-8 text-gray-500">
                <p>No media yet</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}