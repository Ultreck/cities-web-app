"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import {
  Home,
  User,
  ShoppingBag,
  Gift,
  Wallet,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { label: "Home", icon: Home, href: "/n" },
    { label: "Community", icon: User, href: "/n/communities" },
    { label: "Market", icon: ShoppingBag, href: "/n/markets" },
    { label: "Wallet", icon: Wallet, href: "/n/wallets" },
    { label: "Rewards", icon: Gift, href: "/n/rewards" },
    // { label: "Rewards", icon: Gift, href: "/n/rewards" },
  ];
  const NavItem = ({
    icon: Icon,
    label,
    active,
    badge,
    href,
  }: {
    icon: LucideIcon;
    label: string;
    active: boolean;
    badge: number;
    href: string;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
        active
          ? "bg-blue-600 text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium hidden lg:inline">{label}</span>
      {badge > 0 && (
        <Badge
          variant="destructive"
          className="absolute top-1 left-8 lg:left-auto lg:right-2 h-5 min-w-5 flex items-center justify-center p-1"
        >
          {badge > 99 ? "99+" : badge}
        </Badge>
      )}
    </Link>
  );
  return (
    <div className="w-full sticky top-0 lg:border-r h-full pt-10">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      <aside
        className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-background z-40
             p-4 space-y-2
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 
          `}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            badge={0}
            icon={item.icon}
            href={item.href}
            label={item.label}
            active={pathname === item.href}
          />
        ))}

        <div className="pt-6 mt-6 border-t space-y-2">
          {[
            { label: "Profile", href: "/n/profile", icon: User },
            { label: "Settings", href: "/n/settings", icon: Settings },
          ].map((sub) => (
            <NavItem
              key={sub.label}
              badge={0}
              icon={sub.icon}
              label={sub.label}
              href={sub.href}
              active={pathname === sub.href}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SideNavbar;