"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Newspaper, Upload, User } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/feed", label: "Feed", icon: Newspaper },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Navbar({ desktop = false }: { desktop?: boolean }) {
  const pathname = usePathname();

  if (desktop) {
    return (
      <div className="grid gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                active ? "bg-white text-black" : "bg-white/5 text-white"
              }`}
            >
              <Icon size={18} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="glass px-2 py-2">
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center rounded-2xl py-2 text-[11px] ${
                active ? "text-white" : "text-zinc-500"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-0 rounded-2xl bg-white/5"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                />
              )}

              <div
                className={`relative z-10 mb-1 rounded-xl p-2 ${
                  active ? "bg-white text-black" : "bg-white/5 text-white"
                }`}
              >
                <Icon size={18} />
              </div>
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}