"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#AEE2FF] via-[#D6A4FF] to-[#ECA1FF] flex items-start justify-center px-6 pt-14 pb-10">
      <div className="w-full max-w-sm space-y-10">
        {/* Logo */}
        <div className="w-full flex justify-center mb-4">
          <Image
            src="/image/logo.png"
            alt="Family illustration"
            width={256}
            height={256}
            priority
          />
        </div>

        {/* Heading */}
        <h1 className="text-white text-2xl font-bold leading-snug text-left tracking-tight">
          Selamat Datang <br /> Ayah Bunda
        </h1>

        {/* Description */}
        <p className="text-white text-lg leading-relaxed text-left">
          Pendidikan adalah paspor untuk masa depan, karena hari esok adalah
          milik mereka yang mempersiapkannya hari ini.
        </p>

        <div className="space-y-4">
          {/* Masuk Akun */}
          <Button
            onClick={() => router.push("/login")}
            className="w-full h-11 rounded-full bg-white text-pink-500 text-[0.95rem] font-semibold shadow-md hover:bg-gray-100"
          >
            Masuk Akun
          </Button>

          {/* Buat Akun */}
          <Button
            onClick={() => router.push("/signup")}
            className="w-full h-11 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white text-[0.95rem] font-semibold shadow-md hover:opacity-90"
          >
            Buat Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
