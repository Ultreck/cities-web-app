"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import clientApi from "@/apis/clientApi";
import useFormHook from "@/hooks/use-form-hook";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { otpPhoneNumber } = useFormHook();
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP Verification:", otpCode);
    setLoading(true);

    if (typeof otpCode !== "number" || isNaN(otpCode)) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    const data = {
      identity: otpPhoneNumber,
      otp: String(otpCode),
    };
    console.log(data);

    const response = await clientApi.post(
      "/user/register/account_verification",
      data
    );
    console.log(response.data.status);
    if (response.data.status) {
      router.push("/finish-setup");
      toast.success(response.data.message || "✅ OTP verified successfully!");
    } else {
      setOtp(["", "", "", "", "", ""]);
      toast.error(response.data.message || "Otp verification process failed");
    }
  };
  const handleOTPResent = async () => {
    setIsResending(true);
    const data = {
      identity: otpPhoneNumber,
    };
    console.log(data);

    const response = await clientApi.post(
      "/user/register/resend_verification_code",
      data
    );
    console.log(response.data.status);
    if (response.data.status) {
      setIsResending(false);
      toast.success(response.data.message || "✅ OTP resent successfully!");
    } else {
      toast.error(response.data.message || "Otp resent process failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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
              Verify your account
            </h1>
            <p className="text-gray-600">
              A 6 digit OTP code has been sent to your phone number or email
              address. enter the code below to verify your account
            </p>
            <p className="text-center mt-5">
              Otp sent to{" "}
              <span className="text-black font-semibold">{otpPhoneNumber}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Enter OTP code
              </label>
              <div className="flex gap-1 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <button
                onClick={handleOTPResent}
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {isResending ? (
                  <span className="text flex items-center">
                    <Loader className="animate-spin" /> Resending...
                  </span>
                ) : (
                  <span className="text"> Resent OTP</span>
                )}
              </button>
            </div>

            {/* Verify Button */}
            <Button
              className="bg-[#3561D3] cursor-pointer hover:bg-[#3561D3] w-full h-14 "
              type="submit"
              disabled={loading}
            >
              {loading && <Loader className="animate-spin" />}

              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
