"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFormHook from "@/hooks/use-form-hook";
import { useEffect, useState } from "react";
import { ChevronLeft, Loader } from "lucide-react";
import useParamHook from "@/hooks/use-param-hook";
import clientApi from "@/apis/clientApi";
import { toast } from "react-toastify";
import { SlSettings } from "react-icons/sl";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  identity: z.string().nonempty("User identity is required"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  city: z.string().nonempty("City is required"),
  social_media: z
    .string()
    .nonempty("Social media handle is required")
    .optional(),
  user_name: z
    .string()
    .nonempty("Username is required")
    .regex(/^\S+$/, "Username cannot contain spaces"),
  social_media_username: z
    .string()
    .nonempty("Social media username is required")
    .optional(),
});

export default function FinishSetup() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { otpPhoneNumber, otpEmail } = useFormHook();
  const { handleSearchParams } = useParamHook();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: otpPhoneNumber || "",
      state: "",
      country: "Nigeria",
      city: "",
      social_media: "",
      social_media_username: "",
      user_name: "",
    },
  });

  const { states, cities, handleGetCities } = useFormHook({
    cc: "NG",
    sc: form.getValues("state"),
  });

  const stateCode = form.watch("state");
  console.log(isVerified);

  useEffect(() => {
    const data = {
      identity: otpEmail,
      user_name: form.watch("user_name"),
    };
    const timeInterval = setTimeout(() =>{
      if (form.watch("user_name")) {
        setIsVerified(true);
        const response = clientApi.post(`/user/register/username_suggestion`, data);
        response
          .then((res) => {
            toast.success(res.data.message);
            setIsVerified(false);
            console.log(res);
          })
          .catch((err) => {
            setIsVerified(false);
            console.log(err);
          });
      }
    }, 2000);
    return () => clearTimeout(timeInterval);
  }, [form.watch("user_name")]);

  useEffect(() => {
    if (otpPhoneNumber) {
      form.setValue("identity", otpPhoneNumber);
    }
  }, [otpPhoneNumber, form]);

  useEffect(() => {
    if (stateCode) {
      handleGetCities(stateCode);
    }
  }, [stateCode]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setisLoading(true);
    const stateName = states.find((v) => v.stateCode === values.state);
    const dataValue = {
      ...values,
      state: stateName?.name,
    };
    const res = await clientApi.post(
      `/user/register/complete_registration`,
      dataValue
    );
    
    if (res.data.status) {
      setisLoading(false);
      toast.success(res.data.message || "Account setup is successful");
      handleSearchParams("lagos Account setup is successful", "is_success");
      form.reset();
      router.push('/login');
    } else {
      toast.error(res.data.message || "Account setup is successful");
      setisLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Finish setting up your account
            </h1>
            <p className="text-gray-600">
              Provide the following information to finish setting up your
              account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Country */}
              <div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          className="h-11 bg-gray-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* State & City */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 w-full py-6">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states?.map((state) => (
                            <SelectItem
                              key={state.stateCode}
                              value={state.stateCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 w-full py-6">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities?.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Social Media Handle & Username */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="social_media"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram handle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 w-full py-6">
                            <SelectValue placeholder="Select handle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem> */}
                          <SelectItem value="instagram">Instagram</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-center mr-1">
                        Username{" "}
                        {isVerified && (
                          <span className="text-blue-500 flex items-center gap-1">
                            <SlSettings size={18} className="animate-spin" />
                            Verifying...
                          </span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-11 w-full py-6"
                          placeholder="John"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* mCity Username */}
              <div>
                <FormField
                  control={form.control}
                  name="social_media_username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Socia media username </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-11 w-full py-6"
                          placeholder="jdoe2020"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full h-12 bg-[#3561D3] hover:bg-blue-500"
                disabled={isLoading}
              >
                {isLoading && <Loader className="animate-spin" />}

                {isLoading ? "Submitting..." : "Continue"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
