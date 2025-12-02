// src/api/index.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientApi from "./clientApi";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
 const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
 const bearerToken =`Bearer ${token}`

// Registration
export const useIndividualSignupMutation = () => {
  return useMutation({
    mutationFn: (payload) => clientApi.post(`/user/register/individual`, payload),
  });
};


export const useUpdateUserMutation = () => {
   const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload: any) => clientApi.patch('/user', payload),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["profile"]})
    }
  });
};
// export const useUpdateSocialLinksMutation = () => {
//   const queryClient=useQueryClient()
//   return useMutation({
//     mutationFn: (payload) => clientApi.patch(`/c/me/update-social-links`, payload),
//     onSuccess:()=>{
//       queryClient.invalidateQueries({queryKey: ["profile"]})
//     }
//   });
// };

// export const useResendOtpMutation = () => {
//   return useMutation({
//     mutationFn: async (payload) => {
//       return clientApi.post("/users/me/resend-otp", payload);
//     }
//   });
// };
// export const useChangePasswordMutation = () => {
//   const queryClient=useQueryClient()
//   return useMutation({
//     mutationFn: async (payload) => {
//       return clientApi.post("/users/me/upate-password", payload);
//     },
// onSuccess:()=>{
//   queryClient.invalidateQueries({queryKey: ["profile"]})
// }
//   });
// };
// export const useResetPasswordMutation = () => {
//   return useMutation({
//     mutationFn: async (payload) => {
//       return clientApi.post("/users/me/reset-password", payload);
//     },
//   });
// };

// export const useForgotPasswordMutation = () => {
//   return useMutation({
//     mutationFn: async (payload) => {
//       return clientApi.post("/users/me/forgot-password-email", payload);
//     }
//   });
// };

// export const useVerifyEmailMutation = () => {
//   return useMutation({
//     mutationFn: (payload) => clientApi.post("/users/me/verify", payload),
//     onSuccess: (data) => {
//       // localStorage.setItem("auth_token", data.token);
//     }
//   });
// };
// export const useVerifyResetOtpMutation = () => {
//   return useMutation({
//     mutationFn: (payload) => clientApi.post("/users/me/verify-OTP", payload),
//   });
// };


export const useChangeProfileImageMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: async (payload:any) => {
      return axios.patch(baseUrl+"/user/editprofile/profile_pic", payload,{headers:{
    "Content-Type": "multipart/form-data", "Authorization":bearerToken
  }});
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["profile"]})
    }
  });
};

export const useChangeCoverImageMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: async (payload:any) => {
      return axios.patch(baseUrl+"/user/editprofile/cover_img", payload,{headers:{
    "Content-Type": "multipart/form-data", "Authorization":bearerToken
  }});
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["profile"]})
    }
  });
};


// Login
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload) => clientApi.post("/user/login/", payload),
    onSuccess: (data) => {
      // localStorage.setItem("auth_token", data.token);
    }
  });
};

// Profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await clientApi.get("/user");
   return response?.data
    },
    enabled: !!localStorage.getItem("auth_token"),
    staleTime: 5 * 60 * 1000,
  });
};
export const useGetAllCreators = () => {
  return useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const res = await clientApi.get("/c");
  return res.data.creators
    },
  });
};


export const useGetNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => {
      return clientApi.get("/users/me/get-notification");
    },
  });
};

export const useDeleteMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (id) => {
     return clientApi.delete(`/users/me/delete-notification/${id}`)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["notifications"]})
}
  });
}

export const useMarkMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: () => {
     return clientApi.put(`/users/me/markAsRead`)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["notifications"]})
}
  });
}

export const useMarkTransactionMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: () => {
     return clientApi.put(`/users/me/markTransactionsAsViewed`)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["profile"]})
}
  });
}


export const useCreateWalletMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload) => {
     return clientApi.post("/users/me/create-wallet", payload)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["profile"]})
}
  });
}

export const useFundWalletMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload) => {
     return clientApi.post("/users/me/fund-wallet", payload)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["profile"]})
}
  });
}
export const useWithdrawFromWalletMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: (payload) => {
     return clientApi.post("/users/me/withdraw", payload)
    },
onSuccess:()=>{
  queryClient.invalidateQueries({queryKey: ["profile"]})
}
  });
}