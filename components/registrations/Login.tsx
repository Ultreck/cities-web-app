"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import img from "../../assets/images/image 1.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/formSchemas";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import CountrySelect from "./CountrySelect";
import clientApi from "@/apis/clientApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/tokenSlice";
import LoginCountrySelect from "./LoginCountrySelect";

export type UserLoginProps = z.infer<typeof loginSchema>;
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useForm<UserLoginProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: "",
      pin: "",
      country_code: "",
    },
  });

  const onSubmit = async (data: UserLoginProps) => {
    console.log("Login data:", {...data, phone_number: Number(data.phone_number)});
    try {
      setLoading(true);
      const res = await clientApi.post(`/user/login/`, {...data, phone_number: Number(data.phone_number)});

      console.log(res);
      const token = res.data.token;
        Cookies.set("auth_token", token, { expires: 7 });
        localStorage.setItem("auth_token", token);
        dispatch(setToken({ token}));

      if (res.data.status) {
        setLoading(false);
        toast.success(res.data.message || "✅ User logined successfully!");
        setTimeout(() => {
          router.push("/n");
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
    <div className="min-h-screen bg-white flex ">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center">
        <div className="text-center w-full h-full text-white">
          <div className="w-full h-full">
            <img
              src={img.src}
              alt="Modern building"
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Phone Number */}
              <div>
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <div className="text flex gap-2">
                          <LoginCountrySelect form={form} />
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

              {/* Password */}
              <div>
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flext justify-between">
                        Password{" "}
                        <button
                          onClick={() => {
                            passwordType === "password"
                              ? setPasswordType("text")
                              : setPasswordType("password");
                          }}
                          className="text cursor-pointer  "
                        >
                          {passwordType === "password" ? (
                            <span className="text flex items-center gap-1">
                              <PiEyeThin size={20} /> Show
                            </span>
                          ) : (
                            <span className="text flex items-center gap-1">
                              <PiEyeSlashThin size={20} /> Hide
                            </span>
                          )}
                        </button>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-11"
                          type={passwordType}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Keep me logged in
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
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

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New user?{" "}
              <button
                onClick={() => router.push("/register/individual")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up here
              </button>
            </p>
            <p className="text-gray-500 text-sm mt-2">or</p>
            <button
              onClick={() => router.push("/register/business")}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-2"
            >
              Create a business page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
