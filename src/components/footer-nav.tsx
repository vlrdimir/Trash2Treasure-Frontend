"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, User, History, Camera, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useWebcamStore } from "@/hooks/use-webcam-store";

const navItemsLeft = [
  { href: "/dashboard", icon: Home, label: "Beranda" },
  { href: "/history", icon: History, label: "Riwayat" },
];

const navItemsRight = [
  { href: "/chat", icon: Bot, label: "AI Chat" },
  { href: "/profile", icon: User, label: "Profil" },
];

export function FooterNav() {
  const pathname = usePathname();
  const { triggerCapture } = useWebcamStore();
  const isScanPage = pathname === "/scan";

  const NavLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "relative flex flex-col items-center gap-1 rounded-md p-2 transition-colors",
          isActive ? "text-white" : "text-gray-400 hover:text-white",
        )}
      >
        {isActive && (
          <motion.div
            layoutId="active-nav-indicator"
            className="absolute inset-0 rounded-md bg-gray-700"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <Icon className="relative h-6 w-6" />
        <span className="relative text-xs">{label}</span>
      </Link>
    );
  };

  return (
    <footer className="fixed right-0 bottom-0 left-0 z-50 h-20">
      <div className="relative mx-auto h-full max-w-md">
        <div className="absolute right-0 bottom-0 left-0 h-16 rounded-t-2xl border-t border-gray-800 bg-black/80 backdrop-blur-lg">
          <nav className="flex h-full items-center justify-around px-2">
            <div className="flex w-2/5 justify-around">
              {navItemsLeft.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
            <div className="w-1/5" />
            <div className="flex w-2/5 justify-around">
              {navItemsRight.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
          </nav>
        </div>
        {isScanPage ? (
          <button
            onClick={triggerCapture}
            className="absolute top-0 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-black bg-white text-black"
          >
            <Camera className="h-8 w-8" />
          </button>
        ) : (
          <Link
            href="/scan"
            className="absolute top-0 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-black bg-white text-black"
          >
            <ScanLine className="h-8 w-8" />
          </Link>
        )}
      </div>
    </footer>
  );
}
