export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  seller: Seller;
  rating?: number;
  reviews?: number;
  isSaved?: boolean;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  connections: number;
  phone?: string;
  bio?: string;
  location?: string;
  posts?: Post[];
}

export interface Community {
  id: string;
  name: string;
  avatar: string;
  description: string;
  members: number;
  comments: number;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface Post {
  unique_id: string;
  image: string;
  likes?: number;
  comments?: number;
}

export interface CommunityCard {
  id: string;
  name: string;
  description: string;
  users: Record<string, any>[];
  conversationCount: number;
}

export interface LocationView {
  id: string;
  name: string;
  image: string;
  stats: {
    community: string;
    connection: string;
    trends: string;
  };
  communities: Array<{
    name: string;
    count: string;
  }>;
}

export type UserProfile = {
  unique_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  gender: "male" | "female" | string;
  state: string;
  city: string;
  question: string | null;
  answer: string | null;
  business_name: string | null;
  business_account_type: boolean;
  business_sector: string;
  business_category: string;
  social_media: string;
  social_media_username: string;
  date_of_birth: string; // ISO string (e.g., "1995-02-13T23:00:00.000Z")
  user_name: string;
  verification_code: string | null;
  country_code: string;
  is_verify: boolean;
  country_of_origin: string | null;
  bio_info: string | null;
  is_disable: boolean;
  refferal_code: string;
  profile_pic: string;
  is_disactivated: boolean;
  disactivated_pin: string | null;
  device_token: string | null;
  first_login: boolean;
  createdAt: string;
  updatedAt: string;
  reffer_by: string | null;
  totalReferrals: number;
  following: number;
  followers: number;
  profilePicture: {
    media: string;
    user_id: string;
    unique_id: string;
    type: "profile_pic" | string;
  };
  coverImage: {
    media: string;
    user_id: string;
    unique_id: string;
    type: "cover_img" | string;
  };
};

export interface UserType {
  unique_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  business_name: string | null;
  business_account_type: boolean;
  social_media_username: string;
  user_name: string;
  profile_pic: string;
  follow: number;
}

export interface MediaType {
  unique_id: string;
  type: string;
  media: string;
  user_id: string | null;
  User: UserType | null;
  is_video: boolean;
  createdAt: string;
  updatedAt: string;
  post_id: string;
}

export interface ReactionType {
  unique_id: string;
  user_id: string;
  User: UserType | null;
  type: string;
  createdAt: string;
  updatedAt: string;
  post_id: string;
  comment_id: string | null;
}

export interface PostType {
  unique_id: string;
  content: string;
  rePostCount: number;
  User: UserType;
  community_id: string;
  user_id: string | null;
  heading: string | null;
  createdAt: string;
  updatedAt: string;
  commentcount: number;
  mediacount: number;
  reactionscount: number;
  isLike: number;
  views: number;
  isView: number;
  Media: MediaType[];
  Reactions: ReactionType[];
}

export interface RePostType {
  unique_id: string;
  user_id: string;
  id?: string;
  User: UserType;
  reposter_id: string | null;
  IsRePost: boolean;
  audience: "public" | "private" | string;
  isTrend: boolean;
  createdAt: string;
  updatedAt: string;
  post_id: string;
  Post: PostType;
}

export interface CommentType {
  unique_id: string;
  comment: string | null;
  user_id: string;
  User: {
    unique_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    country: string;
    business_name: string | null;
    business_account_type: boolean;
    social_media_username: string;
    user_name: string;
    profile_pic: string;
    follow: number;
  };
  content: string;
  commentCount: number;
  reactionCount: number;
  createdAt: string;
  updatedAt: string;
  post_id: string;
  comment_id: string | null;
  isLike: number;
  replyCount: number;
}


