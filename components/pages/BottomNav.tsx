import { Gift, Home, ShoppingBag, User, Wallet } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Badge } from "../ui/badge";

const BottomNav = () => {
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
      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all relative ${
        active
          ? "bg-blue-600 text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="w-4 h-4"/>
      <span className="font-medium text-xs">{label}</span>
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
    <div className="w-full sticky w-full md:hidden bottom-0 lg:border-r h-full pt-10">
      <aside
        className={`
             fixed lg:sticky bottom-0 w-full items-center flex justify-between border-t bg-background z-40
              p-4 space-y-2
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

        {/* <div className="flex space-y-2">
          {[
            { label: "Profile", href: "/n/profile", icon: User },
            { label: "Settings", href: "/n/settings", icon: Settings },
          ].map((sub) => (
            <NavItem
              key={sub.label}
              badge={""}
              icon={sub.icon}
              label={sub.label}
              href={sub.href}
              active={pathname === sub.href}
            />
          ))}
        </div> */}
      </aside>
    </div>
  );
};
export default BottomNav;