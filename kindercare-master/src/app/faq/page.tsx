"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react"; // Impor ikon ChevronDown
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- DATA FAQ DENGAN JAWABAN ---
const faqData = [
  {
    id: 1,
    question: 'Hal apa saja yang perlu disampaikan saat memberikan pendidikan seksual pada anak?',
    answer: 'Poin-poin penting yang perlu disampaikan adalah: 1. Pengenalan nama-nama bagian tubuh dengan benar. 2. Konsep "sentuhan baik" dan "sentuhan buruk". 3. Batasan tubuh pribadi (area yang tidak boleh disentuh orang lain). 4. Siapa saja orang dewasa yang bisa dipercaya untuk melapor jika ada sentuhan tidak nyaman.',
    category: 'Informasi umum'
  },
  {
    id: 2,
    question: 'Di umur keberapa anak harus diajarkan pendidikan seks?',
    answer: 'Pendidikan ini bisa dimulai sedini mungkin, bahkan sejak usia 2-3 tahun, dengan bahasa yang disesuaikan tingkat pemahaman anak. Semakin dini, semakin baik untuk membangun fondasi kesadaran tubuh.',
    category: 'Informasi umum'
  },
  {
    id: 3,
    question: 'Bagaimana cara mengajarkan pendidikan seks sejak dini kepada anak? Supaya tidak terjadi kekerasan seksual pada anak?',
    answer: 'Gunakan buku cerita bergambar, lagu, atau permainan peran. Hindari menakut-nakuti. Fokus pada pemberdayaan anak untuk berani berkata "tidak" pada sentuhan yang membuat mereka tidak nyaman dan segera memberitahu orang tua.',
    category: 'Komunikasi'
  },
  {
    id: 4,
    question: 'Pendidikan seks kepada anak itu penting, tapi orangtua sering kesulitan. Bagaimana mengajarakan pendidikan seksual kepada anak dengan cara yang kreatif?',
    answer: 'Anda bisa menggunakan media seperti video animasi edukatif yang ramah anak, membuat poster bersama tentang bagian tubuh, atau menggunakan boneka untuk mensimulasikan situasi sosial yang aman dan tidak aman.',
    category: 'Komunikasi'
  }
];
// --- AKHIR DARI DATA FAQ ---

export default function FaqPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Informasi umum");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null); // State untuk melacak FAQ yang terbuka
  const categories = ["Informasi umum", "Komunikasi"];

  // Filter data FAQ berdasarkan kategori yang aktif
  const filteredFaqs = faqData.filter(
    (faq) => faq.category === activeCategory
  );

  // Fungsi untuk membuka/menutup jawaban
  const handleToggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <main className="max-w-md w-full bg-white pb-28 relative">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Tanya Jawab</h1>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="px-4 py-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Sering Ditanyakan</h2>

          {/* Filter Kategori */}
          <div className="flex gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant="default"
                className={cn(
                  "rounded-full text-sm px-4 py-1 h-auto font-normal shadow-none",
                  activeCategory === category
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Daftar Pertanyaan (Accordion) */}
          <div className="space-y-2 pt-2">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 pb-2">
                  <div
                    onClick={() => handleToggleFaq(faq.id)}
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  >
                    <p className="text-gray-800 font-medium text-sm pr-4">{faq.question}</p>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-300",
                        openFaqId === faq.id && "rotate-180" // Efek rotasi
                      )}
                    />
                  </div>
                  {/* Bagian Jawaban yang bisa muncul/hilang */}
                  {openFaqId === faq.id && (
                    <div className="px-2 pt-2 pb-1">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm mt-8">
                Tidak ada pertanyaan di kategori ini.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}