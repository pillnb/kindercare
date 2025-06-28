"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, GraduationCap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/materi", icon: Book, label: "Materi" },
  { href: "/webinar", icon: GraduationCap, label: "Webinar" },
  { href: "/faq", icon: MessageCircle, label: "Tanya" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50 bg-white shadow-xl rounded-full px-6 py-2 flex justify-between items-center border border-gray-200">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center text-xs font-medium transition text-gray-500",
                active && "text-pink-500"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
