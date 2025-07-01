"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBook, FaCheck, FaStar } from "react-icons/fa"; // Tambahkan FaStar
import { BottomNavbar } from "@/components/BottomNavbar";
import { Loader2, ChevronLeft } from "lucide-react";

interface Materi {
  id: number;
  title: string;
  description: string;
  isCompleted?: boolean;
}

export default function MateriPage() {
  const [recommendedMaterial, setRecommendedMaterial] = useState<Materi | null>(null);
  const [materials, setMaterials] = useState<Materi[]>([]);
  const [umurAnak, setUmurAnak] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/materials");
        if (!res.ok) {
            if (res.status === 401) {
                // Redirect ke halaman login jika tidak terautentikasi
                window.location.href = '/login';
            }
            throw new Error(`Gagal mengambil data materi (Status: ${res.status}).`);
        }
        const data = await res.json();
        setRecommendedMaterial(data.recommendedMaterial || null);
        setMaterials(data.materials || []);
        setUmurAnak(data.umur);
      } catch (err) {
        console.error("Gagal mengambil materi:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal memuat materi. Silakan coba lagi.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const renderMaterialItem = (materi: Materi, isRecommended = false) => {
    const isRead = materi.isCompleted;
    return (
      <li key={materi.id}>
        <Link href={`/materi/${materi.id}`} className="block">
          <div
            className={`rounded-xl border p-4 flex items-start justify-between shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md ${
              isRead
                ? "bg-green-50 border-green-200"
                : isRecommended
                ? "bg-yellow-50 border-yellow-200"
                : "bg-white border-[#EAEAEA]"
            }`}
          >
            <div className="flex items-start gap-3">
              {isRecommended ? (
                <FaStar className="text-yellow-500 mt-1 w-4 h-4" />
              ) : (
                <FaBook className="text-blue-600 mt-1 w-4 h-4" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {materi.title}
                </p>
                <p className="text-xs text-gray-500">{materi.description}</p>
              </div>
            </div>
            {isRead && (
              <FaCheck className="text-green-500 mt-1 w-4 h-4" />
            )}
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className="flex justify-center min-h-screen bg-[#F8F8F8]">
      <main className="max-w-md w-full bg-white pb-32 relative">
        {/* Header dengan gradasi pink */}
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-6 rounded-b-3xl px-4">
          {/* Tombol kembali dan Judul */}
          <div className="flex items-center gap-2 mb-4">
            <Link href="/home">
              <ChevronLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-xl font-semibold">Materi</h1>
          </div>

          {/* Info anak */}
          <div className="flex items-center gap-4">
            <Image
              src="/image/materi/badan-anak.png"
              alt="Badan Anak"
              width={60}
              height={60}
              className="rounded-full shadow-md bg-white"
            />
            <div>
              <p className="text-sm font-semibold">Umur {umurAnak ?? "..."} Tahun</p>
              <p className="text-xs max-w-xs">
                Materi yang dapat Anda ajarkan kepada anak berusia {umurAnak ?? "..."} tahun.
              </p>
            </div>
          </div>
        </div>

        {/* Tentang Materi */}
        <section className="px-4 py-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Tentang Materi</h2>
          <p className="text-sm text-gray-600 text-justify">
            Materi ini dirancang untuk membantu anak memahami tubuhnya, perasaan,
            dan interaksi yang aman dengan orang lain. Dengan pendekatan visual dan
            cerita, anak akan lebih mudah mengerti dan mengingat pesan yang disampaikan.
          </p>
        </section>

        {/* List Materi */}
        <section className="px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
              <p className="ml-2 text-gray-600">Memuat materi...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* Materi Rekomendasi */}
              {recommendedMaterial && (
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                    <FaStar className="text-yellow-500 mr-2" /> Rekomendasi Untuk Anda
                  </h2>
                  <ul className="space-y-3">
                    {renderMaterialItem(recommendedMaterial, true)}
                  </ul>
                </div>
              )}

              {/* Materi Sesuai Umur */}
              <div>
                 <h2 className="text-base font-semibold text-gray-800 mb-4">Detail Materi</h2>
                 {materials.length > 0 ? (
                    <ul className="space-y-3">
                      {materials.map((materi) => renderMaterialItem(materi))}
                    </ul>
                 ) : (
                    <p className="text-center text-gray-500 text-sm">Tidak ada materi lain yang tersedia untuk rentang usia ini.</p>
                 )}
              </div>
            </>
          )}
        </section>

        <BottomNavbar />
      </main>
    </div>
  );
}
