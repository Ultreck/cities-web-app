import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";
import { CreateCommunityProps } from "@/components/communities/modals/CreateCommunityModal";
import { EventCreatingProps } from "@/components/communities/modals/EventCreatingModal";
import { JobPostingProps } from "@/components/communities/modals/JobPostingModal";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
 const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
 const bearerToken =`Bearer ${token}`


export const useCreateCommunityMutation = () => {
   const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateCommunityProps) => clientApi.post('/communities/create', payload),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["communities"]})
    }
  });
};

export const useGetAllCommunities = () => {
  return useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const response = await clientApi.get("/communities/all");
   return response?.data?.data
    },
  });
};


export const useGetSingleCommunity = (id:string) => {
  return useQuery({
    queryKey: ["single-community",id],
    queryFn: async () => {
      const response = await clientApi.get(`/communities/?community_id=${id}`);
   return response?.data?.data
    },
  });
};

export const useGetDiasporaUsers = (id:string) => {
  return useQuery({
    queryKey: ["disaporals",id],
    queryFn: async () => {
      const response = await clientApi.get(`/communities/diaspora?community_id=${id}`);
   return response?.data?.data
    },
  });
};

export const useGetJobs = (id:string) => {
  return useQuery({
    queryKey: ["jobs",id],
    queryFn: async () => {
      const response = await clientApi.get(`/communities/job?community_id=${id}`);
   return response?.data?.data
    },
  });
};
export const useGetEvents = (id:string) => {
  return useQuery({
    queryKey: ["events",id],
    queryFn: async () => {
      const response = await clientApi.get(`/communities/event?community_id=${id}`);
   return response?.data?.data
    },
  });
};
export const useGetAllRents = (id:string) => {
  return useQuery({
    queryKey: ["rents",id],
    queryFn: async () => {
      const response = await clientApi.get(`/communities/rent?community_id=${id}`);
   return response?.data?.data
    },
  });
};


export const useJoinCommunityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { community_id: string }) =>
      clientApi.post('/communities/join', payload),

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["single-community", payload.community_id]
      });
    }
  });
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EventCreatingProps) =>
      clientApi.post('/communities/event', payload),

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["single-community", payload.community_id]
      });
    }
  });
};
export const usePostJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JobPostingProps) =>
      clientApi.post('/communities/job', payload),

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["single-community", payload.community_id]
      });
    }
  });
};
export const useCreateRentPropertyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) =>{
      // clientApi.post('/communities/rent', payload)
            return axios.post(baseUrl+"/communities/rent", payload,{headers:{
    "Content-Type": "multipart/form-data", "Authorization":bearerToken
  }});
    },

    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["single-community"]
      });
    }
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