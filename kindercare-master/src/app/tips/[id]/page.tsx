"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Loader2, Heart, Bookmark, Send, Volume2 } from 'lucide-react';
import { BottomNavbar } from "@/components/BottomNavbar";

interface Tip {
  id: number;
  title: string | null;
  content: string | null;
  image_url: string | null;
}

export default function TipDetailPage() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;

    const fetchTip = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/tips/${params.id}`);
        if (!res.ok) {
          throw new Error(`Gagal memuat halaman, silakan coba lagi`);
        }
        const data = await res.json();
        setTip(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTip();
  }, [params.id]);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <main className="max-w-md w-full bg-white pb-32 pt-6 relative">
        {/* =================== BAGIAN YANG DIPERBAIKI =================== */}
        <div className="flex items-center px-4 mb-4">
          <button onClick={() => router.back()} className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Tips Komunikasi</h1>
        </div>
        {/* ============================================================= */}
        
        <div className="px-4">
            {isLoading ? (
            <div className="flex flex-col items-center justify-center h-80">
                <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                <p className="mt-2 text-gray-600">Memuat...</p>
            </div>
            ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
            ) : tip ? (
            <>
                <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-lg mb-6">
                    <Image
                        src={tip.image_url || '/image/tips/default-tip.png'}
                        alt={tip.title || 'Gambar Tip'}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                    {tip.title}
                </h1>
                <div className="flex items-center gap-5 text-gray-500 mb-6 border-b border-gray-200 pb-4">
                    <button className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors"><Heart className="w-5 h-5" /> 785</button>
                    <button className="flex items-center gap-1.5 text-sm hover:text-blue-500 transition-colors"><Send className="w-5 h-5" /> 1k+</button>
                    <div className="flex-grow" />
                    <button className="hover:text-yellow-500 transition-colors"><Bookmark className="w-5 h-5" /></button>
                    <button className="hover:text-green-500 transition-colors"><Volume2 className="w-5 h-5" /></button>
                </div>
                <article className="prose prose-sm max-w-none text-gray-800 leading-relaxed text-justify whitespace-pre-line">
                {tip.content}
                </article>
            </>
            ) : (
                <p className="text-center text-gray-500 py-10">Tip tidak ditemukan.</p>
            )}
        </div>
      </main>
      <BottomNavbar />
    </div>
  );
}