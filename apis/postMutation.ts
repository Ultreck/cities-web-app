import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";


export const useCreatePostMutation = () => {
   const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => clientApi.post('/post/create', payload),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["posts"]})
    }
  });
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await clientApi.get("/post/");
   return response?.data
    },
  });
};


export const useGetUserPosts = () => {
  return useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      const response = await clientApi.get("/user/posts");
   return response?.data
    },
  });
};

export const useGetUserMedia = () => {
  return useQuery({
    queryKey: ["user-media"],
    queryFn: async () => {
      const response = await clientApi.get("/user/medias");
   return response?.data?.data
    },
  });
};

export const useGetUserCommunities = () => {
  return useQuery({
    queryKey: ["user-communities"],
    queryFn: async () => {
      const response = await clientApi.get("/user/communities");
   return response?.data?.data
    },
  });
};