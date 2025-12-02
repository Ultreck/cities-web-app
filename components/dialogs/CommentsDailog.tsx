"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardDescription, CardTitle } from "../ui/card";
import { commentsData } from "@/lib/helper";
import { IoIosArrowBack } from "react-icons/io";
import { ScrollArea } from "../ui/scroll-area";
import { MdFavorite } from "react-icons/md";
import { Button } from "../ui/button";
import { Eye, Share2, ThumbsUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { Input } from "../ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { CommentType, RePostType } from "@/types/type-props";
import PostMedia from "../PostMedia";
import clientApi from "@/apis/clientApi";
import { FaRegComments } from "react-icons/fa6";

const CommentsDailog = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: RePostType;
}) => {
  const [postComments, setPostComments] = useState("");
  const [commentsDatas, setCommentsDatas] = useState<CommentType[] | []>([]);
  const [replyComments, setreplyComments] = useState("");
  const [isLiked, setIsLiked] = useState(post.Post.isLike);
  const [likes, setLikes] = useState(post.Post.reactionscount);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [commentIndex, setCommentIndex] = useState<string | undefined>("");

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));
  };

  const handleShare = () => {
    //   if (onShare) onShare(post.id);
    // alert(`Sharing: ${post.title}`);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const handleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostComments(e.target.value);
    console.log(e.target.value);
  };

  function formatPostTime(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const handlePostComments = () => {
    const data = {
      content: postComments,
      post_id: post.post_id,
    };
    const response = clientApi.post(`/post/comment`, data);
    response
      .then((res) => {
        if (res.data.status) {
          setPostComments("");
          fetchPostComments();
        }
        console.log("Respose for the comment flow", res);
      })
      .catch((err) => {
        console.log("Error occurred..", err);
      });
  };

  const fetchPostComments = useCallback(async () => {
    try {
      const res = await clientApi.get(
        `/post/comments/?post_id=${post.post_id}`
      );
      console.log(res.data.comments);
      setCommentsDatas(res.data.comments);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  }, [post.post_id]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments, postComments]);

  const handleReplyChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setreplyComments(e.target.value);
    console.log(e.target.value);
  };
  const handleReplyComment = async (id: string, post_id: string) => {
    console.log(id, replyComments, post_id);
    const data = {
      content: replyComments,
      post_id: post_id,
      comment_id: id,
    };
    const res = await clientApi.post(`/post/comment/reply`, data);
    console.log(res.data);
    setreplyComments("");
    setIsReply(!isReply)
    fetchPostComments();
  };

  console.log({commentsDatas});
  

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[600px] w-full bg-gray-100">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-1 ">
              <button className="text" onClick={() => setIsOpen(false)}>
                <IoIosArrowBack />
              </button>
              Comments({post.Post.commentcount})
            </DialogTitle>
            <DialogDescription>
              View and add comments on this post.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <div className="text">
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <Avatar>
                    <AvatarImage
                      src={post?.User?.profile_pic}
                      alt={post.User.first_name}
                    />
                    <AvatarFallback>
                      {post?.User?.first_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-base">
                        {post?.User?.first_name + " " + post?.User?.last_name}
                      </CardTitle>
                      {/* {post.sponsored && (
                        <Badge variant="secondary" className="text-xs">
                          Sponsored
                        </Badge>
                      )} */}
                    </div>
                    <CardDescription className="flex items-center gap-2 mb-2">
                      {post?.User?.user_name} •{" "}
                      {formatPostTime(post.createdAt)}
                    </CardDescription>
                  </div>
                </div>
              </div>
              <div>
                {/* <h3 className="font-semibold mb-2">{post.Post.title}</h3> */}
                <p className="text-sm text-muted-foreground mb-2">
                  {post.Post.content}
                </p>
              </div>

              {post.Post.Media.length > 0 && (
                <PostMedia
                  mediaItems={post.Post.Media}
                  className="max-h-[230px]"
                />
              )}

              <div className="flex items-center justify-between py-2 border-t">
                <Button
                  variant={isLiked ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-2 transition-all"
                  onClick={handleLike}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="hidden sm:inline">
                    {formatNumber(likes)}
                  </span>
                </Button>
                <p className="text">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <HiMiniUserGroup className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {formatNumber(post.Post.commentcount)}
                    </span>
                  </Button>
                </p>

                {/* <CommentsDailog post={post}>
                </CommentsDailog> */}

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {formatNumber(post.Post.rePostCount)}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span className="">{formatNumber(post.Post.views)}</span>
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[270px] bg-white w-full rounded-md p-4">
               <div className="bg-gray-100 rounded-3xl px-3 py-2 mb-8 flex items-center justify-between gap-4">
                      <textarea
                        value={postComments}
                        onChange={handleChanges}
                        placeholder="Add your comment here..."
                        className="flex-1 bg-transparent text-sm placeholder:text-gray-500 resize-none outline-none min-h-[24px]"
                        rows={1}
                      />
                      <Button
                        onClick={handlePostComments}
                        disabled={!postComments.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 whitespace-nowrap shrink-0"
                      >
                        Send
                      </Button>
                    </div>
              {/* <div className="text relative">
                <Input
                  type="text"
                  name="comment"
                  id="comment"
                  value={postComments}
                  className="h-12 "
                  placeholder="Add your comment here..."
                  onChange={handleChanges}
                />
                <button
                  onClick={handlePostComments}
                  className="text absolute right-0 top-0 hover:bg-blue-500 flex justify-center items-center h-full w-12 bg-blue-600 rounded-br-lg rounded-tr-lg"
                >
                  <RiSendPlaneFill className="text-white" size={20} />
                </button>
              </div> */}
              {commentsDatas.map((co) => (
                <div key={co.unique_id}>
                  <div className="flex gap-3 my-5 flex-1">
                    <Avatar>
                      <AvatarImage
                        src={co.User.profile_pic}
                        alt={co.User.first_name}
                      />
                      <AvatarFallback>
                        {co.User.first_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-base">
                          {co.User.first_name}
                        </CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        {co.User.user_name} • {formatPostTime(co.createdAt)}
                      </CardDescription>
                      <div className="text flex justify-between">
                        <div className="text">
                          <p className="text">{co?.content}</p>
                        </div>
                        <MdFavorite size={20} />
                      </div>
                      <div className="text flex items-center w-full ">
                        <Button
                          variant={"ghost"}
                          size="sm"
                          className="flex items-center gap-2 transition-all"
                          onClick={handleLike}
                        >
                          <ThumbsUp
                            className={`w-4 h-4 ${
                              co.isLike ? "text-blue-600" : ""
                            }`}
                          />
                          <span className="hidden sm:inline">
                            {co.reactionCount}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => {
                            setIsReply(!isReply);
                            setCommentIndex(co.unique_id);
                          }}
                        >
                          <FaRegComments className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {co.replyCount}
                          </span>
                        </Button>
                        {isReply && commentIndex === co.unique_id && (
                          // <div className="text relative w-full">
                          //   <Input
                          //     type="text"
                          //     name="reply"
                          //     id="reply"
                          //     value={replyComments}
                          //     className="h-10 "
                          //     placeholder="Add your comment here..."
                          //     onChange={handleReplyChanges}
                          //   />
                          //   <button
                          //     onClick={() => {
                          //       handleReplyComment(co.unique_id, post.post_id);
                          //     }}
                          //     className="text absolute right-0 top-0 hover:bg-blue-500 flex justify-center items-center h-full w-12 bg-blue-600 rounded-br-lg rounded-tr-lg"
                          //   >
                          //     <RiSendPlaneFill
                          //       className="text-white"
                          //       size={20}
                          //     />
                          //   </button>
                          // </div>
                             <div className="bg-gray-100 rounded-3xl px-3 py-2 mb-8 flex items-center justify-between gap-4 w-full">
                      <textarea
                        value={replyComments}
                        onChange={handleReplyChanges}
                        placeholder="Add your comment here..."
                        className="flex-1 bg-transparent text-sm placeholder:text-gray-500 resize-none outline-none min-h-[24px]"
                        rows={1}
                      />
                      <Button
                        onClick={()=>handleReplyComment(co.unique_id, post.post_id)}
                        disabled={!replyComments.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 whitespace-nowrap shrink-0"
                      >
                        Reply
                      </Button>
                    </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {co.length > 0 &&
                    co.replies.map((rep) => (
                      <div key={rep.id} className="text ml-10">
                        <div className="flex gap-3 my-5 flex-1">
                          <Avatar>
                            <AvatarImage src={rep.avatar} alt={rep.author} />
                            <AvatarFallback>
                              {rep.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-base">
                                {rep.author}
                              </CardTitle>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                              {rep.username} • {rep.time}
                            </CardDescription>
                            <div className="text flex justify-between">
                              <p className="text">{rep?.content}</p>
                              <MdFavorite size={20} />
                            </div>
                          </div>
                        </div>
                        {rep.replies.length > 0 &&
                          rep.replies.map((subrep) => (
                            <div key={subrep.id} className="text ml-10">
                              <div className="flex gap-3 my-5 flex-1">
                                <Avatar>
                                  <AvatarImage
                                    src={subrep.avatar}
                                    alt={subrep.author}
                                  />
                                  <AvatarFallback>
                                    {subrep.author.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <CardTitle className="text-base">
                                      {subrep.author}
                                    </CardTitle>
                                  </div>
                                  <CardDescription className="flex items-center gap-2">
                                    {subrep.username} • {subrep.time}
                                  </CardDescription>
                                  <div className="text flex justify-between">
                                    <p className="text">{subrep?.content}</p>
                                    <MdFavorite size={20} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentsDailog;