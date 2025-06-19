"use client";

import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { statistics, materi } from "@/data/ProgressData";
import Image from "next/image";
import React from "react";

export type Statistics = {
  title: string;
  value: number | string;
  icon: string;
};

export type Materi = {
  title: string;
  description: string;
};

export default function ProgressPage() {
  const router = useRouter();
  const progress = 76.67;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white pb-28 relative">
        {/* Navigation Bar */}
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Progress</h1>
          </div>
        </div>

        <div className="container mx-auto px-8">
          {/* Progress */}
          <div className="bg-white text-black rounded-xl p-4 shadow-md mt-10">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Pembelajaran hari ini</span>
              <span className="text-pink-500 font-medium">Ganti target</span>
            </div>
            <div className="text-2xl font-bold">
              46min <span className="text-gray-400 text-sm">/ 60min</span>
            </div>
            <Progress value={progress} className="h-2 mt-2" />
          </div>

          {/* Statistik */}
          <div className="mt-4">
            <h3 className="font-bold">Statistik</h3>
            <hr className="my-4" />
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {statistics.map((statistic) => (
                <React.Fragment key={statistic.title}>
                  {StatisticsItem(statistic)}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Materi */}
          <div className="mt-4">
            <h3 className="font-bold">Materi Terselesaikan</h3>
            <hr className="my-4" />
            <div className="space-y-4">
              {materi.map((m) => (
                <React.Fragment key={m.title}>{MateriItem(m)}</React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const StatisticsItem = (data: Statistics) => {
  return (
    <div className="p-[2px] rounded-[10px] bg-gradient-to-r from-[#FD649B] to-[#FFC8DD]">
      <div
        key={data.title}
        className="flex flex-col rounded-[8px] px-4 py-2 bg-white w-full h-full"
      >
        <div className="flex gap-2">
          <Image src={data.icon} alt={data.title} width={24} height={24} />
          <span className="text-lg font-semibold">{data.value}</span>
        </div>
        <span className="text-xs text-[#797C7B] font-medium">{data.title}</span>
      </div>
    </div>
  );
};

const MateriItem = (materi: Materi) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-black">{materi.title}</h2>
        <span className="text-xs text-[#797C7B]">{materi.description}</span>
      </div>
      <Image
        src="/icon/finished-task.svg"
        alt="finished-task"
        width={24}
        height={24}
      />
    </div>
  );
};
