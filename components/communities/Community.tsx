"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { initialCommunities } from "@/lib/helper";
import { Badge } from "../ui/badge";
import CommunityList from "./CommunityList";
import CommunityGrid from "./CommunityGrid";
import { Input } from "../ui/input";
import { mockCommunityCards } from "@/lib/mockData";
import { useGetAllCommunities } from "@/apis/communityMutation";
import { CreateCommunityModal } from "./modals/CreateCommunityModal";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [_communities, setCommunities] = useState(initialCommunities);
  const {data:communities, isLoading} = useGetAllCommunities()

  console.log({communities});
  

  const filteredCommunities =communities ? communities?.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  ):[];

  const handleJoinCommunity = (communityId: string) => {
    // setCommunities((prev) =>
    //   prev.map((comm) =>
    //     comm.id === communityId ? { ...comm, joined: !comm.joined } : comm
    //   )
    // );
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="relative w-2/3 mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search Community"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-0 rounded-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold">Communities</h2>
          <Button onClick={()=>setIsModalOpen(true)} >
            <Users className="w-4 h-4 mr-2" />
            Create Community
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            {/* <TabsTrigger value="joined">Joined</TabsTrigger> */}
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="all" className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialCommunities.map((community) => (
                <Card
                  key={community.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <div className="text-4xl">{community.image}</div>
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
                      <Badge variant="secondary">{community.status}</Badge>
                      <Button
                        size="sm"
                        variant={community.joined ? "outline" : "default"}
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        {community.joined ? "Joined" : "Join"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}
          <TabsContent value="all" className="mt-6">
            <CommunityGrid isLoading={isLoading} filteredCommunities={filteredCommunities} />
          </TabsContent>
          <TabsContent value="nearby" className="mt-6">
            <CommunityList />
          </TabsContent>
        </Tabs>
      </div>
      <CreateCommunityModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default Community;