'use client';

import AuthPageWrapper from "@/components/auth/AuthPageWrapper";
import { Button } from "@/components/ui/button";
import { User, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountTypeSelection() {
const router = useRouter();

  return (
    <AuthPageWrapper>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose account
          </h1>
          <p className="text-lg text-gray-600">
            Choose the account type that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Individual Account Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Individual Account
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Perfect for personal use and individual professionals. Get started
              with your personal account today.
            </p>
            <Button
              onClick={() => router.push("/register/individual")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-full"
            >
              Create Individual Account
            </Button>
          </div>

          {/* Business Account Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <Building2 className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Business Account
            </h2>
            <p className="text-gray-600 text-center mb-8">
              For companies and organizations. Create a business account to
              manage your team and operations.
            </p>
            <Button
              onClick={() => router.push("/register/business")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg rounded-full"
            >
              Create Business Account
            </Button>
          </div>
        </div>

        {/* <div className="text-center mt-12">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div> */}
      </div>
    </div>
    </AuthPageWrapper>
  );
}
