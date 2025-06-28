"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  MessageSquareText,
  Book,
  Lightbulb,
  CalendarDays,
  MessageCircle,
  User, // User icon tetap diimpor karena digunakan di BottomNavbar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { BottomNavbar } from "@/components/BottomNavbar";
import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input"; // Tidak perlu import Input karena search bar dihapus

type DailyProgress = {
  current: number;
  target: number;
};
type Tip = { id: number; title: string; content?: string; imageSrc?: string; };
type Webinar = { id: number; title: string; date: string; speaker?: string; speakerImageSrc?: string; };

// Helper function to slugify text for image paths
function slugify(text: string | null | undefined): string {
  if (!text) return '';
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();
}

export default function HomePage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const router = useRouter();
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);

  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingTips, setIsLoadingTips] = useState(true);
  const [isLoadingWebinars, setIsLoadingWebinars] = useState(true);

  // Menggabungkan semua pengambilan data ke dalam satu useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      // Ambil data Daily Progress
      setIsLoadingProgress(true);
      try {
        const res = await fetch("/api/progress/summary");
        if (!res.ok) throw new Error("Gagal mengambil data progres");
        const data = await res.json();
        setDailyProgress(data.dailyProgress);
      } catch (error) {
        console.error("Error fetching progress data for home page:", error);
        setDailyProgress({ current: 0, target: 60 });
      } finally {
        setIsLoadingProgress(false);
      }

      // Ambil data Tips
      setIsLoadingTips(true);
      try {
        const res = await fetch("/api/tips");
        if (!res.ok) throw new Error("Gagal mengambil data tips");
        const data: Tip[] = await res.json();
        // Menambahkan placeholder imageSrc untuk tips jika tidak ada dari API
        const tipsWithImages = data.map(tip => ({
          ...tip,
          // Sesuaikan jalur gambar ini jika Anda memiliki gambar tips yang sesuai
          imageSrc: `/image/tips/${slugify(tip.title)}.png`
        }));
        setTips(tipsWithImages);
      } catch (error) {
        console.error("Error fetching tips data for home page:", error);
        setTips([]);
      } finally {
        setIsLoadingTips(false);
      }

      // Ambil data Webinars
      setIsLoadingWebinars(true);
      try {
        const res = await fetch("/api/webinars");
        if (!res.ok) throw new Error("Gagal mengambil data webinar");
        const data: Webinar[] = await res.json();
        // Menambahkan placeholder speakerImageSrc untuk webinar jika tidak ada dari API
        const webinarsWithSpeakerImages = data.map((webinar, index) => ({
          ...webinar,
          // Sesuaikan jalur gambar speaker ini jika Anda memilikinya
          speakerImageSrc: `/image/webinar/img-speaker-${(index % 3) + 1}.jpg`
        }));
        setWebinars(webinarsWithSpeakerImages);
      } catch (error) {
        console.error("Error fetching webinars data for home page:", error);
        setWebinars([]);
      } finally {
        setIsLoadingWebinars(false);
      }
    };

    fetchAllData();
  }, []); // Dependensi kosong agar useEffect hanya berjalan sekali saat komponen di-mount

  const currentMinutes = dailyProgress?.current ?? 0;
  const targetMinutes = dailyProgress?.target ?? 60;

  const progressValue = (currentMinutes / targetMinutes) * 100;
  const clampedProgressValue = Math.min(progressValue, 100);

  const remainingMinutes = targetMinutes - currentMinutes;
  const progressText = remainingMinutes <= 0
    ? "Target Tercapai!"
    : `Sisa ${remainingMinutes} min`;

  return (
    <div className="flex justify-center">
      <main className="max-w-md w-full bg-white px-4 py-4 pb-28 space-y-6">
        {/* Header */}
        <div className="rounded-b-3xl bg-gradient-to-br from-pink-400 to-pink-300 text-white px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">👋 Halo Bunda</h2>
              <p className="text-sm leading-snug mt-1">
                Apa kabar hari ini? Semoga senang gembira dengan si kecil ya.
              </p>
            </div>
            <div className="flex gap-4">
              <MessageSquareText className="w-5 h-5" />
              <Bell className="w-5 h-5" />
            </div>
          </div>

          {/* Progres */}
          <div className="bg-white text-black rounded-xl p-4 shadow-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Pembelajaran hari ini</span>
              <button onClick={() => router.push('/progress')} className="text-pink-500 font-medium">Progres saya</button>
            </div>
            {isLoadingProgress ? (
              <div className="py-4 text-center text-sm text-gray-500">Memuat progres...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {currentMinutes}min{" "}
                  <span className="text-gray-400 text-sm">/ {targetMinutes}min</span>
                  <span className="text-sm ml-2" style={{ color: remainingMinutes <= 0 ? 'green' : 'orange' }}>
                    ({progressText})
                  </span>
                </div>
                <Progress value={clampedProgressValue} className="h-2 mt-2" />
              </>
            )}
          </div>
        </div>

        {/* Bilah Pencarian (Dihapus) */}
        {/* Kode untuk bilah pencarian ada di sini sebelumnya */}

        {/* Navigasi fitur */}
        <div className="grid grid-cols-4 gap-3 text-center text-xs mt-4 px-4">
          <div
            onClick={() => router.push("/materi")}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white rounded-xl shadow-md p-3">
              <Book className="text-pink-500 w-5 h-5" />
            </div>
            <span>Materi</span>
          </div>
          <div
            onClick={() => router.push("/tips")}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white rounded-xl shadow-md p-3">
              <Lightbulb className="text-yellow-500 w-5 h-5" />
            </div>
            <span>Tips</span>
          </div>
          <div
            onClick={() => router.push("/webinar")}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white rounded-xl shadow-md p-3">
              <CalendarDays className="text-purple-500 w-5 h-5" />
            </div>
            <span>Webinar</span>
          </div>
          <div
            onClick={() => router.push("/faq")}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white rounded-xl shadow-md p-3">
              <MessageCircle className="text-green-500 w-5 h-5" />
            </div>
            <span>Tanya</span>
          </div>
        </div>

        {/* CTA lanjutkan */}
        <div className="relative rounded-2xl bg-gradient-to-r from-pink-400 to-pink-300 px-4 py-4 text-white mx-4">
          <p className="text-sm font-medium z-10 relative">
            Lanjutkan Progres Belajar
          </p>

          {/* Gambar sebagai elemen absolut */}
          <Image
            src="/image/home/character.png"
            alt="Lanjutkan"
            width={75}
            height={75}
            className="absolute right-2 bottom-0 z-0"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Tips Komunikasi */}
        <section className="space-y-2 px-4">
          <h3 className="text-base font-semibold">Tips Komunikasi</h3>
          {isLoadingTips ? (
            <div className="py-4 text-center text-sm text-gray-500">Memuat tips...</div>
          ) : tips.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
              {tips.map((tip: Tip) => (
                <div
                  key={tip.id}
                  className="flex-none w-[180px] bg-white rounded-lg shadow-md overflow-hidden"
                >
                   <div className="relative w-full h-[100px] overflow-hidden rounded-t-lg">
                      <Image
                        src={tip.imageSrc || '/image/tips/default-tip.png'}
                        alt={tip.title}
                        layout="fill"
                        objectFit="cover"
                        onError={(e) => { e.currentTarget.src = '/image/tips/default-tip.png'; }}
                      />
                   </div>
                  <div className="p-2 text-sm font-medium text-gray-800 line-clamp-2">
                    {tip.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">Tidak ada tips yang tersedia.</p>
          )}
        </section>

        {/* Webinar */}
        <section className="space-y-2 px-4">
          <h3 className="text-base font-semibold">Webinar Terdekat</h3>
          {isLoadingWebinars ? (
            <div className="py-4 text-center text-sm text-gray-500">Memuat webinar...</div>
          ) : webinars.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
              {webinars.map((webinar: Webinar) => (
                <div
                  key={webinar.id}
                  className="flex-none w-[150px] bg-white rounded-lg shadow-md p-3 text-center"
                >
                  <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                    <Image
                      src={webinar.speakerImageSrc || "/image/webinar/img-speaker-1.jpg"}
                      alt={webinar.speaker || 'Speaker'}
                      layout="fill"
                      objectFit="cover"
                      onError={(e) => { e.currentTarget.src = '/image/webinar/img-speaker-1.jpg'; }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">{webinar.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(webinar.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    <br />
                    {new Date(webinar.date).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm">Tidak ada webinar terdekat.</p>
          )}
        </section>

        <BottomNavbar />
      </main>
      {/* Custom CSS for hide-scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}