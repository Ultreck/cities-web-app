"use client";

import BottomNav from "@/components/pages/BottomNav";
import Header from "@/components/pages/Header";
import SideNavbar from "@/components/pages/SideNavbar";
import RightSidebar from "@/components/RightSidebar";
import { PaymentProvider } from "@/components/wallets/PaymentContext";
import React from "react";
import { useRequireAuth } from "@/hooks/useAuth";

const LoginedLayout = ({ children }: { children: React.ReactNode }) => {
  // const { user, isLoading } = useRequireAuth();

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

  // // Don't render anything if not authenticated (will redirect)
  // if (!user) {
  //   return null;
  // }

  return (
    <div className="text">
      <PaymentProvider>
        <div className="text sticky top-0 z-50">
          <Header />
        </div>
        <div className="text flex ">
          <div className="text fixed bg-white lg:w-1/5">
            <SideNavbar />
          </div>
          <div className="text w-full lg:w-4/5 lg:px-7 lg:my-10 lg:ml-[20%]">
         <div className="grid lg:grid-cols-3 gap-6 h-screen overflow-hidden">
  <div className="lg:col-span-2 overflow-y-auto custom-scroll">
    {children}
  </div>

  <div className="overflow-y-auto custom-scroll">
    <RightSidebar />
  </div>
</div>
          </div>
        </div>
        <div className="text sticky top-0 z-50">
          <BottomNav />
        </div>
      </PaymentProvider>
    </div>
  );
};

export default LoginedLayout;
