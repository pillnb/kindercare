"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Book, GraduationCap, MessageCircle, User } from "lucide-react"; // Import User icon
import { cn } from "@/lib/utils";

// Tambahkan item "Profil" ke navItems
const navItems = [
  { href: "/home", icon: Home, label: "Beranda" }, // Ubah link root ke /home untuk konsistensi
  { href: "/materi", icon: Book, label: "Materi" },
  { href: "/webinar", icon: GraduationCap, label: "Webinar" },
  { href: "/faq", icon: MessageCircle, label: "FAQ" },
  { href: "/profile", icon: User, label: "Profil" }, // Item baru
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50 bg-white shadow-xl rounded-full px-6 py-2 flex justify-between items-center border border-gray-200">
        {navItems.map(({ href, icon: Icon, label }) => {
          // Perbarui logika 'active' untuk mencocokkan path yang lebih spesifik
          const active = pathname === href || (href === "/home" && pathname === "/"); // Jika path root, anggap home aktif
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center text-xs font-medium transition text-gray-500 py-2 px-1", // Menambahkan py dan px untuk area klik lebih besar
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