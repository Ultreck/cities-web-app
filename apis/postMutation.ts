import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
 const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
 const bearerToken =`Bearer ${token}`


export const useCreatePostMutation = () => {
   const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload: FormData) => {
         return axios.post(baseUrl+"/post/create", payload,{headers:{
    "Content-Type": "multipart/form-data", "Authorization":bearerToken
  }});
    },
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