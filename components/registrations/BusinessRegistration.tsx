"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import img from "../../assets/images/image 2.png";

import clientApi from "@/apis/clientApi";
import { businessFormSchema } from "@/lib/formSchemas";
import useParamHook from "@/hooks/use-param-hook";
import { ChevronLeft, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

export type userSchemaProps = z.infer<typeof businessFormSchema>;
// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export default function BusinessRegistration() {
  const [loading, setLoading] = useState(false);
  const { router } = useParamHook();
  const form = useForm<userSchemaProps>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      business_name: "",
      business_sector: "finance",
      business_category: "registered",
      email: "",
      password: "4040",
      country_code: "+234",
      phone_number: '9044633743',
      reffer_by: "1234567890",
    },
  });

  const onSubmit = async (data: userSchemaProps) => {
    // setLoading(true);
       setLoading(true);
       console.log(data);
       const res = await clientApi.post(`/user/register/business`, data);
       setLoading(false);
       if (res.status) {
      toast.success("Registration successful!");
      // setLoading(false);
      console.log(res);
    }
  };

  return (
    <div className="max-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center">
        <div className="text-center h-full w-full text-white">
          <div className="w-full h-full">
            <img
              src={img.src}
              alt="Business meeting"
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Create your business account today!
            </h1>
            <p className="text-gray-600">
              Do you already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email field */}
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business name</FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business sector</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Information and technology(It)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country code </FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="100234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="070*******25"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business category</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="registered"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <Button
            className="bg-[#3561D3] cursor-pointer hover:bg-[#3561D3] w-full h-14 "
            type="submit"
            disabled={loading}
          >
            {loading && <Loader className="animate-spin" />}

            {loading ? "Submitting..." : "Submit"}
          </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
