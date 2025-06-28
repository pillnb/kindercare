"use client";

import { useState, useEffect } from "react"; // Tambahkan useEffect
import { ChevronLeft, ChevronDown, Loader2 } from "lucide-react"; // Tambahkan Loader2
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BottomNavbar } from "@/components/BottomNavbar";

// Definisikan tipe data untuk FAQ
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const categories = ["Informasi umum", "Komunikasi", "Keamanan Digital"];

export default function FaqPage() {
  const router = useRouter();
  
  // State untuk data, loading, dan error
  const [allFaqs, setAllFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("Informasi umum");
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // useEffect untuk mengambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch('/api/faq');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server.');
        }
        const data = await response.json();
        setAllFaqs(data);
      } catch (err) {
        setError('Tidak dapat memuat FaQ. Periksa koneksi internet Anda.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  const filteredFaqs = allFaqs.filter(
    (faq) => faq.category === activeCategory
  );

  const handleToggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setOpenFaqId(null); 
  }

  // Fungsi untuk menampilkan konten berdasarkan state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
          <p className="ml-2 text-gray-600">Memuat FAQ...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 mt-8">{error}</p>;
    }

    if (allFaqs.length === 0) {
      return <p className="text-center text-gray-500 mt-8">FAQ belum tersedia saat ini. Silakan coba lagi nanti.</p>;
    }

    return (
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
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

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

            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  variant="default"
                  className={cn(
                    "rounded-full text-sm px-4 py-1.5 h-auto font-normal shadow-none whitespace-nowrap",
                    activeCategory === category
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {renderContent()}

          </div>
        </main>
        
        <BottomNavbar />

        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}