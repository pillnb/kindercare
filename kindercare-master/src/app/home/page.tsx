"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  MessageSquareText,
  Book,
  Lightbulb,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { BottomNavbar } from "@/components/BottomNavbar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [progress, setProgress] = useState<number>(46);
  const [tips, setTips] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   setProgress(46)
  //   fetch("/api/tips").then(res => res.json()).then(setTips)
  //   fetch("/api/webinars").then(res => res.json()).then(setWebinars)
  // }, [])

  return (
    <div className="flex justify-center">
      <main className="max-w-md bg-white px-4 py-4 pb-28 font-sans space-y-6">
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
              <span className="text-pink-500 font-medium">Progres saya</span>
            </div>
            <div className="text-2xl font-bold">
              46min <span className="text-gray-400 text-sm">/ 60min</span>
            </div>
            <Progress value={progress} className="h-2 mt-2" />
          </div>
        </div>

        {/* Navigasi fitur */}
        <div className="grid grid-cols-4 gap-3 text-center mt-4 text-xs">
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
            onClick={() => router.push("/tanya")}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white rounded-xl shadow-md p-3">
              <MessageCircle className="text-green-500 w-5 h-5" />
            </div>
            <span>Tanya</span>
          </div>
        </div>

        {/* CTA lanjutkan */}
        <div className="relative rounded-2xl bg-gradient-to-r from-pink-400 to-pink-300 px-4 py-4 text-white">
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
          />
        </div>

        {/* Tips Komunikasi */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold">Tips Komunikasi</h3>
          <div className="grid grid-cols-2 gap-4">
            {tips.map((tip: unknown) => (
              <div
                key={tip.id}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <div className="p-2 text-sm font-medium">{tip.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Webinar */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold">Webinar Terdekat</h3>
          <div className="grid grid-cols-2 gap-4">
            {webinars.map((webinar: unknown) => (
              <div
                key={webinar.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <p className="text-sm font-semibold">{webinar.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(webinar.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
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
        </section>

        <BottomNavbar />
      </main>
    </div>
  );
}