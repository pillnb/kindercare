"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recommendation = searchParams.get('recommendation');

  const recommendationText = recommendation 
    ? `“${recommendation}”`
    : "topik yang sesuai untuk Anda.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
      <div className="mb-8">
        <Image
          src="/image/logo.png"
          alt="Ilustrasi Keluarga"
          width={256}
          height={256}
        />
      </div>
      <h1 className="text-3xl font-bold text-pink-500 mb-6">
        KinderCare
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Halo, Bunda!</h2>
      <p className="text-gray-600 mb-10 max-w-xs leading-relaxed">
        Konten yang cocok untuk bunda saat ini adalah: {recommendationText}
      </p>
      <Button
        onClick={() => router.push('/home')}
        className="bg-pink-500 text-white hover:bg-pink-600 w-full max-w-xs h-12 text-lg rounded-full shadow-lg"
      >
        BERIKUTNYA
      </Button>
      <p className="text-xs text-gray-400 mt-6 absolute bottom-10">
        *personalisasi konten dapat diubah di laman pengaturan
      </p>
    </div>
  );
}

// Gunakan Suspense untuk menangani komponen yang memakai useSearchParams
export default function SurveyResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultContent />
        </Suspense>
    )
}