"use client";

import { useEffect, useState } from "react";
import {
  Book,
  Lightbulb,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { BottomNavbar } from "@/components/BottomNavbar";
import { useRouter } from "next/navigation";

type DailyProgress = {
  current: number;
  target: number;
};
type Tip = { id: number; title: string; content?: string; imageSrc?: string; };
type Webinar = { id: number; title: string; date: string; speaker?: string; speakerImageSrc?: string; };

export default function HomePage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const router = useRouter();
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);

  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingTips, setIsLoadingTips] = useState(true);
  const [isLoadingWebinars, setIsLoadingWebinars] = useState(true);

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
        const tipsWithImages = data.map(tip => ({
          ...tip,
          imageSrc: (tip as Tip & { image_url?: string }).image_url || "/image/tips/default-tip.png"
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
        const webinarsWithSpeakerImages = data.map((webinar, index) => ({
          ...webinar,
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
  }, []);

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

        {/* Tips Komunikasi */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold px-4">Tips Komunikasi</h3>
          {isLoadingTips ? (
            <div className="py-4 text-center text-sm text-gray-500">Memuat tips...</div>
          ) : tips.length > 0 ? (
            <div className="flex space-x-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
              {tips.map((tip: Tip) => (
                <div
                  key={tip.id}
                  onClick={() => router.push(`/tips/${tip.id}`)}
                  className="flex-none w-[170px] bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                >
                   <div 
                     className="relative w-full h-[90px] overflow-hidden bg-gray-100 bg-cover bg-center"
                     style={{
                       backgroundImage: `url(${tip.imageSrc || "/image/tips/default-tip.png"})`
                     }}
                   >
                      <Image
                        src={tip.imageSrc || '/image/tips/default-tip.png'}
                        alt={tip.title}
                        fill
                        className="object-cover transition-opacity duration-300"
                        unoptimized={true}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          const parent = target.parentElement;
                          if (parent) parent.style.backgroundImage = "none";
                        }}
                        onError={() => {
                          console.log('Home tips image failed to load:', tip.imageSrc);
                        }}
                      />
                   </div>
                  <div className="p-3 h-[65px] flex items-start">
                    <h4 className="text-sm font-medium text-gray-800 leading-[1.3] line-clamp-2 w-full break-words">
                      {tip.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm px-4">Tidak ada tips yang tersedia.</p>
          )}
        </section>

        {/* Webinar */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold px-4">Webinar Terdekat</h3>
          {isLoadingWebinars ? (
            <div className="py-4 text-center text-sm text-gray-500">Memuat webinar...</div>
          ) : webinars.length > 0 ? (
            <div className="flex space-x-3 overflow-x-auto pb-4 px-4 scrollbar-hide">
              {webinars.map((webinar: Webinar) => (
                <div
                  key={webinar.id}
                  onClick={() => router.push(`/webinar/${webinar.id}`)}
                  className="flex-none w-[140px] bg-white rounded-xl shadow-sm p-3 text-center border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="relative w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
                    <Image
                      src={webinar.speakerImageSrc || "/image/webinar/img-speaker-1.jpg"}
                      alt={webinar.speaker || 'Speaker'}
                      fill
                      className="object-cover"
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = '/image/webinar/img-speaker-1.jpg'; 
                      }}
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 min-h-[30px] mb-1">
                    {webinar.title}
                  </h4>
                  <p className="text-xs text-gray-500">
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
            <p className="text-center text-gray-500 text-sm px-4">Tidak ada webinar terdekat.</p>
          )}
        </section>

        <BottomNavbar />
      </main>
    </div>
  );
}