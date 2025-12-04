'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, ChevronDown } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsSectionProps {
  totalComments: number;
  comments: Comment[];
  sortBy?: 'recent' | 'most_liked';
  onSortChange?: (sortBy: 'recent' | 'most_liked') => void;
  onPostComment?: (content: string) => void;
  onLike?: (commentId: string) => void;
}

const CommentItem: React.FC<{
  comment: Comment;
  isReply?: boolean;
  onLike?: (commentId: string) => void;
}> = ({ comment, isReply = false, onLike }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(comment.id);
  };

  return (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
      <Avatar className="w-10 h-10 shrink-0">
        <AvatarImage src={comment.avatar} alt={comment.author} />
        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{comment.author}</h4>
            <p className="text-sm text-gray-700 break-words">{comment.content}</p>
          </div>
          <button
            onClick={handleLike}
            className="shrink-0 pt-1 transition-transform hover:scale-110"
          >
            <Heart
              className="w-5 h-5 transition-colors"
              fill={liked ? '#ef4444' : 'none'}
              stroke={liked ? '#ef4444' : '#999'}
            />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {comment.likes} likes
        </div>
      </div>
    </div>
  );
};

export const CommentsSection: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [sortBy, setSortBy] = useState<'recent' | 'most_liked'>('most_liked');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'John Doe',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Lorem ipsum dolor sit amet consectetur. Ultricies felis mattis sem.',
      likes: 5,
      timestamp: '2 hours ago',
      replies: [
        {
          id: '1-1',
          author: 'Kunle Peters',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          content: 'Lorem ipsum dolor sit amet consectetur.',
          likes: 5,
          timestamp: '1 hour ago',
        },
        {
          id: '1-2',
          author: 'Peter Quill',
          avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=100',
          content: 'Lorem ipsum dolor sit amet consectetur.',
          likes: 5,
          timestamp: '30 min ago',
        },
      ],
    },
  ]);

  const totalComments = 1252430;

  const handlePost = () => {
    if (inputValue.trim()) {
      handlePostComment(inputValue);
      setInputValue('');
    }
  };

  const handleSortSelect = (newSort: 'recent' | 'most_liked') => {
    setSortBy(newSort);
    setIsDropdownOpen(false);
  };

  const sortLabel = sortBy === 'most_liked' ? 'Most liked' : 'Recent';




  const handlePostComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
      content,
      likes: 0,
      timestamp: 'now',
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleLike = (commentId: string) => {
    console.log('Liked comment:', commentId);
  };


  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="bg-gray-100 rounded-3xl px-3 py-2 mb-8 flex items-center justify-between gap-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What is going on in your community?"
          className="flex-1 bg-transparent text-sm placeholder:text-gray-500 resize-none outline-none min-h-[24px]"
          rows={1}
        />
        <Button
          onClick={handlePost}
          disabled={!inputValue.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 whitespace-nowrap shrink-0"
        >
          Post
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">
          {totalComments.toLocaleString()} Comments
        </h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            {sortLabel}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleSortSelect('most_liked')}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-lg ${
                  sortBy === 'most_liked' ? 'font-semibold bg-blue-50' : ''
                }`}
              >
                Most liked
              </button>
              <button
                onClick={() => handleSortSelect('recent')}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 last:rounded-b-lg ${
                  sortBy === 'recent' ? 'font-semibold bg-blue-50' : ''
                }`}
              >
                Recent
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-0">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              comment={comment}
              onLike={handleLike}
            />
            {comment.replies && comment.replies.length > 0 && (
              <div>
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    isReply={true}
                    onLike={handleLike}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
