"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CalendarIcon, ChevronLeft, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import img from "../../assets/images/image 3.png";
import { userFormSchema } from "@/lib/formSchemas";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import useParamHook from "@/hooks/use-param-hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clientApi from "@/apis/clientApi";
import { toast } from "react-toastify";
import CountrySelect from "./CountrySelect";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import IndividualCountrySelect from "./IndividualCountrySelect";

export type userSchemaProps = z.infer<typeof userFormSchema>;
export default function IndividualRegistration() {
  const params = useSearchParams();
  const referralCode = params.get("ref") || "ABC123";
  console.log(referralCode);

  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [month, setMonth] = useState<Date>(new Date());
  const { router } = useParamHook();
  const form = useForm<userSchemaProps>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      pin: "",
      reffer_by: referralCode || "",
      country_code: "",
      date_of_birth: new Date(),
      phone_number: "",
    },
  });

  const onSubmit = async (data: userSchemaProps) => {
    try {
      setLoading(true);
      const rawData = { ...data, phone_number: Number(data.phone_number) };
      console.log(rawData);

      const res = await clientApi.post(`/user/register/individual`, rawData);

      setLoading(false);
      console.log(res);

      if (res.data.status) {
        toast.success(res.data.message || "✅ User registered successfully!");
        window.localStorage.setItem("userPhoneNumber", data.phone_number);
        window.localStorage.setItem("userEmail", data.email);
        setTimeout(() => {
          router.push("/verify");
          form.reset();
        }, 2000);
      } else {
        toast.error(
          res.data.message || "❌ Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center">
        <div className="text-center w-full h-full text-white">
          <div className="w-full h-full">
            <img
              src={img.src}
              alt="Modern building"
              className="w-full h-full object-fit shadow-2xl"
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
              Create your free account
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="Doe" {...field} />
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <div className="text flex gap-2">
                        <IndividualCountrySelect form={form} />
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
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal h-11",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          month={month}
                          onMonthChange={setMonth}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="py-6 w-full">
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Male", "Female", "Others"].map((gen, index) => (
                            <SelectItem key={index} value={gen.toLowerCase()}>
                              {gen}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
