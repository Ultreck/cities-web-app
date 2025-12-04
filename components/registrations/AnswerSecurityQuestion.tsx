'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import img from "../../assets/images/image 2.png"

export default function AnswerSecurityQuestion() {
  const router = useRouter();
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle security question answer
    console.log("Security question answer:", answer);
    router.push("/enter-new-password");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center ">
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
            onClick={() => router.push("/forgot-password")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Answer security question
            </h1>
            <p className="text-gray-600">
              Answer the following security question correctly to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Question */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                What is your mother&apos;s maiden name?
              </label>
              <Input
                type="text"
                placeholder="Aisha"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="bg-gray-100 border-gray-200"
                required
              />
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-full font-semibold"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}