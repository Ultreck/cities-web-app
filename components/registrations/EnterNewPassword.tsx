"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import img from "../../assets/images/image 1.png";
import useFormHook from "@/hooks/use-form-hook";
import clientApi from "@/apis/clientApi";
import { toast } from "react-toastify";

export default function EnterNewPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { otpPhoneNumber, countryCode } = useFormHook();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone_number: otpPhoneNumber || "",
    otp: "",
    country_code: countryCode || "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      phone_number: otpPhoneNumber,
      otp: formData.otp,
      country_code: countryCode,
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await clientApi.patch(`/user/reset_password`, payload);

      console.log(res);
      if (res.data.status) {
        setLoading(false);
        toast.success(res.data.message || "✅ Password changed successfully!");
        setTimeout(() => {
          router.push("/password-changed");
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
    <div className="min-h-screen bg-white flex">
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => router.push("/security-question")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Enter new PIN
            </h1>
            <p className="text-gray-600">
              An OTP has been sent to{" "}
              <span className="font-semibold">{otpPhoneNumber}</span>, enter
              token and new password below to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* OTP */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                OTP
              </label>
              <Input
                type="text"
                name="otp"
                placeholder="123456"
                value={formData.otp}
                onChange={handleChange}
                className="bg-gray-100 border-gray-200"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                New PIN
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-200 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm new PIN
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="••••••"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="bg-gray-100 border-gray-200 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Change PIN Button */}
            <Button
              className="bg-[#3561D3] cursor-pointer hover:bg-[#3561D3] w-full h-14 "
              type="submit"
              disabled={loading}
            >
              {loading && <Loader className="animate-spin" />}

              {loading ? "Submitting..." : "Change PIN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
