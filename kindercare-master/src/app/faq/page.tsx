"use client";

import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BottomNavbar } from "@/components/BottomNavbar";

// --- PERUBAHAN DI SINI: Menambahkan pemisah baris (\n) pada data ---
const faqData = [
  // Kategori: Informasi Umum
  {
    id: 1,
    question: 'Hal apa saja yang perlu disampaikan saat memberikan pendidikan seksual pada anak?',
    answer: `Poin-poin penting yang perlu disampaikan adalah:
1. Pengenalan nama-nama bagian tubuh dengan benar.
2. Konsep "sentuhan baik" dan "sentuhan buruk".
3. Batasan tubuh pribadi (area yang tidak boleh disentuh orang lain).
4. Siapa saja orang dewasa yang bisa dipercaya untuk melapor jika ada sentuhan tidak nyaman.`,
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
    question: 'Apakah normal jika anak kecil menyentuh area pribadinya?',
    answer: 'Ya, ini adalah bagian normal dari eksplorasi tubuh anak. Selama dilakukan di tempat pribadi dan tidak berlebihan, ini adalah perilaku wajar. Orang tua bisa mengajarkan tentang batasan dan privasi dengan cara yang positif.',
    category: 'Informasi umum'
  },
  
  // Kategori: Komunikasi
  {
    id: 4,
    question: 'Bagaimana cara memulai percakapan tentang pubertas dengan anak?',
    answer: 'Mulailah secara santai dan bertahap. Gunakan buku atau video sebagai pemicu percakapan. Normalisasikan perubahan yang akan terjadi dan pastikan anak tahu bahwa mereka bisa bertanya apa saja kepada Anda.',
    category: 'Komunikasi'
  },
  {
    id: 5,
    question: 'Bagaimana cara mengajarkan pendidikan seks sejak dini kepada anak? Supaya tidak terjadi kekerasan seksual pada anak?',
    answer: 'Gunakan buku cerita bergambar, lagu, atau permainan peran. Hindari menakut-nakuti. Fokus pada pemberdayaan anak untuk berani berkata "tidak" pada sentuhan yang membuat mereka tidak nyaman dan segera memberitahu orang tua.',
    category: 'Komunikasi'
  },
  {
    id: 6,
    question: 'Pendidikan seks kepada anak itu penting, tapi orangtua sering kesulitan. Bagaimana mengajarakan pendidikan seksual kepada anak dengan cara yang kreatif?',
    answer: 'Anda bisa menggunakan media seperti video animasi edukatif yang ramah anak, membuat poster bersama tentang bagian tubuh, atau menggunakan boneka untuk mensimulasikan situasi sosial yang aman dan tidak aman.',
    category: 'Komunikasi'
  },

  // Kategori: Keamanan Digital
  {
    id: 7,
    question: 'Bagaimana cara melindungi anak dari konten negatif di internet?',
    answer: 'Gunakan fitur "safe search" pada browser, aktifkan mode terbatas di YouTube, dan gunakan aplikasi kontrol orang tua. Yang terpenting adalah membangun komunikasi terbuka agar anak berani melapor jika menemukan sesuatu yang tidak nyaman.',
    category: 'Keamanan Digital'
  },
  {
    id: 8,
    question: 'Apa itu "grooming" online dan bagaimana cara mencegahnya?',
    answer: 'Grooming adalah ketika orang dewasa membangun hubungan emosional dengan anak secara online untuk tujuan eksploitasi. Ajarkan anak untuk tidak pernah membagikan informasi pribadi, tidak menerima permintaan pertemanan dari orang asing, dan tidak pernah setuju untuk bertemu dengan orang yang hanya dikenal secara online.',
    category: 'Keamanan Digital'
  }
];
// --- AKHIR PERUBAHAN DATA ---


const categories = ["Informasi umum", "Komunikasi", "Keamanan Digital"];

export default function FaqPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Informasi umum");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(
    (faq) => faq.category === activeCategory
  );

  const handleToggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setOpenFaqId(null); 
  }

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white min-h-screen">
        <main className="pb-24">
          <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
            <div className="flex items-center px-4 mb-4">
              <button onClick={() => router.back()} className="mr-4">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">Tanya Jawab</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Sering Ditanyakan</h2>

            <div className="flex justify-between gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  variant="default"
                  className={cn(
                    "flex-1 rounded-full text-sm px-3 py-1 h-auto font-normal shadow-none transition-all",
                    activeCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() => handleToggleFaq(faq.id)}
                    className="w-full flex justify-between items-center text-left cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  >
                    <p className="text-gray-800 font-medium text-sm pr-4">{faq.question}</p>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0",
                        openFaqId === faq.id && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaqId === faq.id && (
                    <div className="px-2 pt-2 pb-1">
                      {/* --- PERUBAHAN DI SINI: Menggunakan `whitespace-pre-line` --- */}
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <BottomNavbar />
      </div>
    </div>
  );
}