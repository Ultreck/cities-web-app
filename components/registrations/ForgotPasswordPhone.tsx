"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import img from "../../assets/images/image 3.png";
import { resetPasswordSchema } from "@/lib/formSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import clientApi from "@/apis/clientApi";
import { toast } from "react-toastify";
import CountrySelect from "./CountrySelect";

export type ResetPasswordProps = z.infer<typeof resetPasswordSchema>;
export default function ForgotPasswordPhone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<ResetPasswordProps>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      phone_number: "",
      country_code: "",
    },
  });

  const onSubmit = async (data: ResetPasswordProps) => {
    try {
      setLoading(true);
      const res = await clientApi.post(`/user/forgot_password`, data);

      console.log(res);

      if (res.data.status) {
        setLoading(false);
        toast.success(res.data.message || "✅ Details taken!");
        window.localStorage.setItem("userPhoneNumber", data.phone_number);
        window.localStorage.setItem("userCountryCode", data.country_code);
        setTimeout(() => {
          router.push("/security-question");
          form.reset();
        }, 2000);
      } else {
        setLoading(false);
        toast.error(
          res.data.message || "❌ Invalid credentials, please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("❌ invalid credentials, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center">
        <div className="text-center w-full h-full text-white">
          <div className="w-full h-full relative">
            <Image
              src={img}
              alt="Modern building"
              fill
              className="object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Reset your PIN
            </h1>
            <p className="text-gray-600">
              Enter your account&apos;s phone number, a reset token will be sent for
              verification
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <div className="text flex gap-2">
                          <CountrySelect form={form} />
                          <Input
                            className="h-11"
                            placeholder="070*******25"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Login Button */}
              <Button
                className="bg-[#3561D3] cursor-pointer hover:bg-[#3561D3] w-full h-14 "
                type="submit"
                disabled={loading}
              >
                {loading && <Loader className="animate-spin" />}

                {loading ? "Submitting..." : "Login"}
              </Button>
            </form>
          </Form>
          {/* Phone Number */}
        </div>
      </div>
    </div>
  );
}