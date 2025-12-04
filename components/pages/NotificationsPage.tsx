"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageCircle,
  UserPlus,
  Share2,
  Calendar,
  CheckCheck,
} from "lucide-react";
import { initialNotifications } from "@/lib/helper";

export type NotificationProps = {
  id: number;
  type: string;
  user: string;
  username: string;
  action: string;
  content?: string | null; // 👈 make this optional or nullable
  time: string;
  read: boolean;
  avatar: string;
};


export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationProps[]>(initialNotifications);


  useEffect(() => {
  setNotifications(initialNotifications);
  }, []);
  
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "share":
        return <Share2 className="w-5 h-5 text-purple-500" />;
      case "community":
        return <Calendar className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev: NotificationProps[]) =>
      prev.map((notif: NotificationProps) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "read":
        return notifications.filter((n) => n.read);
      default:
        return notifications;
    }
  };

  const NotificationItem = ({ notification }: {notification: NotificationProps}) => (
    <Card
      className={`mb-3 cursor-pointer transition-all hover:shadow-md ${
        !notification.read ? "bg-primary/5 border-primary/20" : ""
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="relative">
            <Avatar>
              <AvatarFallback>{notification.avatar}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
              {getIcon(notification.type)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span>{" "}
                  <span className="text-muted-foreground">
                    {notification.action}
                  </span>
                </p>
                {notification.content && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.content}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Notifications</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              You have {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            filterNotifications("all").map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          {filterNotifications("unread").length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No unread notifications</p>
              </CardContent>
            </Card>
          ) : (
            filterNotifications("unread").map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          {filterNotifications("read").length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No read notifications</p>
              </CardContent>
            </Card>
          ) : (
            filterNotifications("read").map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}