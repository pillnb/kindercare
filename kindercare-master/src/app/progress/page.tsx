"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Statistics = { title: string; value: number | string };
type Materi = { title: string; description: string | null };
type ProgressData = {
  dailyProgress: { current: number; target: number };
  statistics: Statistics[];
  completedMaterials: Materi[];
};

const statisticsIcons: Record<string, string> = {
  "Runtutan Hari": "/icon/streak.svg",
  "Pembelajaran Hari Ini": "/icon/learning.svg",
  "Webinar Diikuti": "/icon/webinar.svg",
  "Materi Terselesaikan": "/icon/lesson.svg",
};

export default function ProgressPage() {
  const router = useRouter();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTargetModal, setShowTargetModal] = useState(false); // State untuk kontrol modal
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null); // State untuk target yang dipilih di modal

  const fetchProgressData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/progress/summary");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || res.statusText);
      }
      const data = await res.json();
      setProgressData(data);
      setSelectedTarget(data.dailyProgress.target); // Set target yang sudah ada sebagai default
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan tidak diketahui");
      setProgressData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  // Fungsi untuk menampilkan modal
  const handleShowTargetModal = () => {
    setShowTargetModal(true);
  };

  // Fungsi untuk menyembunyikan modal
  const handleCloseTargetModal = () => {
    setShowTargetModal(false);
    setSelectedTarget(progressData?.dailyProgress.target || 60); // Reset ke target saat ini jika batal
  };

  // Fungsi saat target dipilih di modal
  const handleSelectTarget = (target: number) => {
    setSelectedTarget(target);
  };

  // Fungsi saat tombol OK di modal diklik
  const handleSaveTarget = async () => {
    if (selectedTarget === null) return; // Tidak ada target dipilih

    setIsLoading(true); // Tampilkan loading saat menyimpan
    try {
      const res = await fetch("/api/progress/set-daily-target", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetMinutes: selectedTarget }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || res.statusText);
      }

      await fetchProgressData(); // Ambil data terbaru setelah berhasil update
      setShowTargetModal(false); // Tutup modal
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memperbarui target.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return <div className="flex justify-center items-center min-h-screen">Memuat progress...</div>;
  if (error)
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (!progressData)
    return <div className="flex justify-center items-center min-h-screen">Tidak ada data progress.</div>;

  const progressValue =
    (progressData.dailyProgress.current / progressData.dailyProgress.target) * 100;
  const clampedProgressValue = Math.min(progressValue, 100);

  // Logika untuk menampilkan sisa/tercapai
  const remainingMinutes = progressData.dailyProgress.target - progressData.dailyProgress.current;
  const progressText = remainingMinutes <= 0 
    ? "Target Tercapai!" 
    : `Sisa ${remainingMinutes} min`;
    
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white pb-28 relative">
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Progress</h1>
          </div>
        </div>

        <div className="container mx-auto px-8">
          <div className="bg-white text-black rounded-xl p-4 shadow-md mt-10">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Pembelajaran hari ini</span>
              {/* <<< TAMBAHKAN onClick DI SINI */}
              <span 
                className="text-pink-500 font-medium cursor-pointer" 
                onClick={handleShowTargetModal}
              >
                Ganti target
              </span>
            </div>
            <div className="text-2xl font-bold">
              {progressData.dailyProgress.current}min{" "}
              <span className="text-gray-400 text-sm">
                / {progressData.dailyProgress.target}min
              </span>
              <span className="text-sm ml-2" style={{ color: remainingMinutes <= 0 ? 'green' : 'orange' }}>
                ({progressText})
              </span>
            </div>
            <Progress value={clampedProgressValue} className="h-2 mt-2" />
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Statistik</h3>
            <hr className="my-4" />
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {progressData.statistics.map((statistic) => (
                <StatisticsItem key={statistic.title} {...statistic} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Materi Terselesaikan</h3>
            <hr className="my-4" />
            <div className="space-y-4">
              {progressData.completedMaterials.length > 0 ? (
                progressData.completedMaterials.map((m, i) => (
                  <MateriItem key={`${m.title}-${i}`} {...m} />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">Belum ada materi yang diselesaikan.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL GANTI TARGET HARIAN --- */}
      {showTargetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">Ganti Target Harian</h2>
            <div className="flex flex-col gap-3 mb-6">
              {[60, 30, 15].map((target) => (
                <button
                  key={target}
                  className={`py-3 px-6 rounded-full text-lg font-semibold flex justify-center items-center gap-2 ${
                    selectedTarget === target
                      ? "bg-pink-500 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                  onClick={() => handleSelectTarget(target)}
                >
                  <span role="img" aria-label="smiley">😊</span> {target} Menit
                  {selectedTarget === target && <span className="ml-2 text-white">✅</span>}
                </button>
              ))}
            </div>
            <div className="flex justify-around gap-4">
              <button
                className="flex-1 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold"
                onClick={handleCloseTargetModal}
              >
                Batal
              </button>
              <button
                className="flex-1 py-3 rounded-full bg-pink-500 text-white font-semibold"
                onClick={handleSaveTarget}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- AKHIR MODAL --- */}
    </div>
  );
}

const StatisticsItem = ({ title, value }: Statistics) => {
  const iconSrc = statisticsIcons[title] || "/icon/default.svg";

  return (
    <div className="p-[2px] rounded-[10px] bg-gradient-to-r from-[#FD649B] to-[#FFC8DD]">
      <div className="flex flex-col rounded-[8px] px-4 py-2 bg-white w-full h-full">
        <div className="flex gap-2 items-center">
          <Image src={iconSrc} alt={title} width={24} height={24} />
          <span className="text-lg font-semibold">{value}</span>
        </div>
        <span className="text-xs text-[#797C7B] font-medium">{title}</span>
      </div>
    </div>
  );
};

const MateriItem = ({ title, description }: Materi) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-black">{title}</h2>
        <span className="text-xs text-[#797C7B]">{description}</span>
      </div>
      <Image src="/icon/finished-task.svg" alt="finished-task" width={24} height={24} />
    </div>
  );
};
