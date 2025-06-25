"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import { BottomNavbar } from "@/components/BottomNavbar";

type Materi = {
  id: number;
  title: string;
  content?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export default function MateriDetailPage() {
  const [materi, setMateri] = useState<Materi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchMateri = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/api/materials/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setMateri(data);
      } catch (err) {
        console.error("Gagal mengambil materi:", err);
        setError("Gagal memuat materi. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMateri();
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 10 &&
        !hasScrolledToBottom &&
        materi
      ) {
        setHasScrolledToBottom(true);

        const opened = JSON.parse(localStorage.getItem("openedMateri") || "[]");
        if (!opened.includes(materi.id)) {
          const updated = [...opened, materi.id];
          localStorage.setItem("openedMateri", JSON.stringify(updated));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolledToBottom, materi]);

  return (
    <div className="flex justify-center min-h-screen bg-[#F8F8F8]">
      <main className="max-w-md w-full bg-white pb-32 pt-6 px-4 relative">
        <div className="flex items-center px-2 mb-4">
          <button onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold text-pink-600">
            {materi?.title}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
            <p className="ml-2 text-gray-600">Memuat materi...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : materi ? (
          <>
            <div className="flex justify-center mb-4">
              <Image
                src={`/image/materi/${slugify(materi.title)}.png`}
                alt={materi.title}
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed text-justify px-1">
              {materi.content}
            </p>
          </>
        ) : null}
      </main>
    </div>
  );
}
