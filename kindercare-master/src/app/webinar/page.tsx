"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, List, ChevronRight, User, CalendarDays, Loader2 } from "lucide-react"; // Import Loader2
import { useRouter } from "next/navigation";
import Image from "next/image";

// Definisi interface untuk item webinar
interface WebinarItem {
  id: number;
  imageSrc?: string; // imageSrc opsional, dan akan memiliki fallback
  title: string;
  speaker: string;
  date: string; // Akan di-parse ke Date object
}

export default function WebinarPage() {
  const router = useRouter();
  const [webinars, setWebinars] = useState<WebinarItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error

  useEffect(() => {
    const fetchWebinars = async () => {
      setIsLoading(true); // Mulai loading
      setError(null); // Reset error
      try {
        const res = await fetch("/api/webinars");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setWebinars(data);
      } catch (err) {
        console.error("Failed to fetch webinars:", err);
        setError("Gagal memuat webinar. Silakan coba lagi."); // Set pesan error
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white pb-28 relative">
        {/* Header Gradien Pink */}
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Webinar</h1>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="px-4 py-6 space-y-6">
          {/* Search/Filter Bar (Webinar saya) */}
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 flex items-center p-3 cursor-pointer"
            onClick={() => router.push("/webinar/my-webinars")} 
          >
            <List className="text-gray-500 mr-3 w-5 h-5" />
            <span className="flex-grow text-gray-700">Webinar saya</span>
            <ChevronRight className="text-gray-500 w-5 h-5" />
          </div>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Webinar Mendatang</h2>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                  <p className="ml-2 text-gray-600">Memuat webinar...</p>
                </div>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : webinars.length > 0 ? (
                webinars.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden p-4"
                  >
                    {/* Gambar Webinar */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 mr-4 overflow-hidden">
                      <Image
                        src={webinar.imageSrc || "/image/webinar/img-webinar-page.png"}
                        alt={webinar.title}
                        width={80}
                        height={80}
                        objectFit="cover"
                        priority={false} 
                      />
                    </div>

                    {/* Detail Webinar */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-base text-gray-800 mb-1 text-base">
                        {webinar.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs mb-1">
                        <User className="w-3 h-3 mr-1" />
                        <span>{webinar.speaker}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span>
                          {new Date(webinar.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Tombol Detail */}
                    <button
                      onClick={() => router.push(`/webinar/${webinar.id}`)} 
                      className="ml-4 px-4 py-2 text-sm font-medium text-pink-500 border border-pink-500 rounded-full hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                    >
                      Detail
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada webinar mendatang.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}