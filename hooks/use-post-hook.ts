"use client";

import clientApi from "@/apis/clientApi";
import { useGetPosts } from "@/apis/postMutation";
import { RePostType } from "@/types/type-props";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const usePostHook = () => {
  const [posts, setPosts] = useState<RePostType[]>([]);
  const [trigger, setTrigger] = useState(false);
  const {data, isLoading:isFetchingPosts} = useGetPosts()

  const fetchPosts = useCallback(async () => {
    try {
      const res = await clientApi.get(`/post/`);
      setPosts(res.data.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, []);

  useEffect(() => {
    // fetchPosts();
    if (data?.data) {
      setPosts(data.data);
    }
    // const response = clientApi.get(`/post/`);
    // response
    //   .then((res) => {
    //     console.log(res.data.data);

    //     setPosts(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [data]);

  const handleRepost = async (id: string, aud: string) => {
    const data = {
      post_id: id,
      audience: aud,
    };
    console.log(data, id, aud);

    try {
      const res = await clientApi.post(`/post/repost`, data);
      console.log("Reposted:", res.data);
      toast.success("Content reposted!")
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.post_id === id
            ? {
                ...p,
                Post: {
                  ...p.Post,
                  rePostCount: p.Post.rePostCount
                    ? p.Post.rePostCount - 1
                    : p.Post.rePostCount + 1,
                },
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };
  const handlePostLikes = async (id: string) => {
    try {
      const res = await clientApi.post(`/post/react`, { post_id: id });
      console.log("Liked Post:", res.data);
      setTrigger((prev) => !prev);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.post_id === id
            ? {
                ...p,
                Post: {
                  ...p.Post,
                  isLiked: !p.Post.isLike,
                  reactions_count: p.Post.isLike
                    ? p.Post.reactionscount - 1
                    : p.Post.reactionscount + 1,
                },
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  return {
    handlePostLikes,
    posts,
    // refetch: fetchPosts,
    isFetchingPosts,
    handleRepost,
  };
};

export default usePostHook;
