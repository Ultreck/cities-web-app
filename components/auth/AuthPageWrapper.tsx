// components/auth/AuthPageWrapper.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AuthPageWrapperProps {
  children: React.ReactNode;
}

export default function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  const { user, isLoading, useRedirectIfAuthenticated } = useAuth();
  
  // This will handle the redirect
  useRedirectIfAuthenticated();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If user is authenticated, don't show the auth page (will redirect)
  if (user) {
    return null;
  }

  return <>{children}</>;
}