"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Loader2, Heart, Send, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { BottomNavbar } from "@/components/BottomNavbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Tip {
  id: number;
  title: string | null;
  category: string | null;
  image_url: string | null;
}

const categories = ["Perkenalan", "Komunikasi Lanjutan", "Cerita"];

export default function TipsPage() {
  const router = useRouter();
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Komunikasi Lanjutan");

  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/tips");
        if (!res.ok) throw new Error("Gagal mengambil data tips.");
        const data: Tip[] = await res.json();
        setTips(data);
        setFilteredTips(data.filter(tip => tip.category === activeCategory));
      } catch (err) {
        setError("Gagal memuat halaman, silakan coba lagi");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTips();
  }, [activeCategory]);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setFilteredTips(tips.filter(tip => tip.category === category));
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      <main className="w-full max-w-md bg-white pb-28 relative">
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
            <div className="flex items-center px-4 mb-4">
              <button onClick={() => router.back()} className="mr-4">
                  <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">Tips Komunikasi</h1>
            </div>
        </div>
        
        <div className="px-4 py-6 space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  variant="default"
                  disabled={isLoading}
                  className={cn(
                    "rounded-full text-xs px-3 py-2 h-auto font-medium shadow-none whitespace-nowrap flex-shrink-0 transition-all duration-200",
                    activeCategory === category
                      ? "bg-pink-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : filteredTips.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">Tidak ada tips untuk kategori ini</p>
                <p className="text-gray-400 text-sm">Coba pilih kategori lain</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredTips.map((tip) => (
                  <li key={tip.id}>
                    <Link href={`/tips/${tip.id}`} className="block group">
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-md">
                        <div 
                          className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${tip.image_url || "/image/tips/default-tip.png"})`
                          }}
                        >
                          {/* Overlay untuk memastikan gambar dimuat dengan baik */}
                          <Image
                            src={tip.image_url || "/image/tips/default-tip.png"}
                            alt={tip.title || "Gambar Tip"}
                            fill
                            className="object-cover transition-opacity duration-300"
                            unoptimized={true}
                            onLoad={(e) => {
                              // Sembunyikan background image ketika Next.js image berhasil dimuat
                              const target = e.target as HTMLImageElement;
                              const parent = target.parentElement;
                              if (parent) parent.style.backgroundImage = "none";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 text-sm leading-5 mb-3 line-clamp-2 min-h-[40px]">
                            {tip.title}
                          </h3>
                          <div className="flex items-center justify-between text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1.5 text-xs">
                                <Heart className="w-4 h-4" /> 785
                              </span>
                              <span className="flex items-center gap-1.5 text-xs">
                                <Send className="w-4 h-4" /> 1k+
                              </span>
                            </div>
                            <Bookmark className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>

        <BottomNavbar />
      </main>
    </div>
  );
}