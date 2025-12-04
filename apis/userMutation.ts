import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";


export const useFollowFriendMutation = () => {
   const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload: {friend_id:string}) => clientApi.post('/user/follow/friend', payload),
    onSuccess:(_,payload)=>{
      queryClient.invalidateQueries({queryKey: ["other-user",payload.friend_id]})
       queryClient.invalidateQueries({queryKey: ["single-community"]});
    }
  });
};

// export const useGetAllCommunities = () => {
//   return useQuery({
//     queryKey: ["communities"],
//     queryFn: async () => {
//       const response = await clientApi.get("/communities/all");
//    return response?.data?.data
//     },
//   });
// };

export const useGetOtherUser = (id:string) => {
  return useQuery({
    queryKey: ["other-user", id],
    queryFn: async () => {
      const response = await clientApi.get(`/user/otheruser/?id=${id}`);
   return response?.data?.user
    },
  });
};
export const useGetBefriends = () => {
  return useQuery({
    queryKey: ["befriends"],
    queryFn: async () => {
      const response = await clientApi.get(`/user/befriend`);
   return response?.data?.data
    },
  });
};

export const useGetOtherUserMedia = (id:string) => {
  return useQuery({
    queryKey: ["other-user-media", id],
    queryFn: async () => {
      const response = await clientApi.get(`/user/otheruser/media?id=${id}`);
   return response?.data?.data
    },
  });
};


export const useGetOtherUserPosts = (id:string) => {
  return useQuery({
    queryKey: ["other-user-posts", id],
    queryFn: async () => {
      const response = await clientApi.get(`/user/otheruser/post?id=${id}`);
   return response?.data
    },
  });
};

export const useGetOtherUserCommunities = (id:string) => {
  return useQuery({
    queryKey: ["other-user-communities", id],
    queryFn: async () => {
      const response = await clientApi.get(`/user/otheruser/communities?id=${id}`);
   return response?.data?.data
    },
  });
};