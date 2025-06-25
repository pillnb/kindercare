"use client"; // <<< Pastikan ini ada dan tidak dikomentari

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react'; // <<< Tambahkan useCallback
import Image from "next/image";

// Definisikan tipe data materi
type Materi = {
  id: number;
  title: string;
  content?: string;
};

// Definisikan tipe data untuk user/child context
type UserChildContext = {
  userId: number;
  childId: number;
};

function slugify(text: string | null | undefined): string {
  if (!text) return '';
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();
}

export default function MateriDetailPage() {
  const params = useParams();
  const materialId = Array.isArray(params.id) ? params.id[0] : (params.id || null);

  const [materi, setMateri] = useState<Materi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userChildContext, setUserChildContext] = useState<UserChildContext | null>(null); 
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasCompleted = useRef(false);
  const timeSpentRef = useRef(0);
  

  // --- PERBAIKAN DI SINI: Deklarasi fetchMateriAndContext di scope komponen, bungkus dengan useCallback ---
  const fetchMateriAndContext = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!materialId) { 
        setError("ID Materi tidak valid.");
        setIsLoading(false);
        return;
      }

      const contextRes = await fetch('/api/user-child-context');
      if (!contextRes.ok) throw new Error("Gagal memuat konteks user/anak. Mohon login ulang.");
      const contextData: UserChildContext = await contextRes.json();
      setUserChildContext(contextData);

      const materiRes = await fetch(`/api/materials/${materialId}`);
      if (!materiRes.ok) throw new Error("Gagal memuat detail materi.");
      const materiData: Materi = await materiRes.json();
      setMateri(materiData);

      if (contextData.childId && materialId) {
          await fetch('/api/progress/start-material', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  childId: contextData.childId, 
                  materialId: parseInt(materialId) 
              }),
          });
      }
      
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Terjadi kesalahan tidak diketahui.";
      setError(errorMessage);
      setUserChildContext(null); 
      setMateri(null); 
    } finally {
      setIsLoading(false);
    }
  }, [materialId]); // materialId adalah dependency untuk fetchMateriAndContext


  // useEffect untuk mengambil data materi & memulai progress (sekarang hanya memanggil fungsi di atas)
  useEffect(() => {
    if (!materialId) { 
      setError("ID Materi tidak valid.");
      setIsLoading(false);
      return;
    }
    fetchMateriAndContext(); // Panggil fungsi yang sudah dideklarasikan di atas
  }, [materialId, fetchMateriAndContext]); // Tambahkan fetchMateriAndContext ke dependency array


  // useEffect untuk timer real-time
  useEffect(() => {
    if (!userChildContext || !materialId) return; 

    // >>> PERBAIKAN DI SINI: Deklarasi timer di scope yang benar <<<
    let timer: NodeJS.Timeout | undefined; // Deklarasikan timer di sini
    
    const sendTimeData = async () => {
      if (timeSpentRef.current > 0) {
        try {
          const payload = { 
            userId: userChildContext.userId, 
            childId: userChildContext.childId, 
            materialId: parseInt(materialId), 
            seconds: timeSpentRef.current 
          };
          // Menggunakan navigator.sendBeacon untuk mengirim data saat halaman ditutup lebih andal
          navigator.sendBeacon('/api/progress/update-time', JSON.stringify(payload));
          timeSpentRef.current = 0; // Reset setelah dikirim
        } catch (e) {
          console.error("Failed to send time data via sendBeacon:", e);
        }
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer); // Pastikan timer ada sebelum di-clear
      } else {
        timer = setInterval(() => { timeSpentRef.current += 1; }, 1000);
      }
    };
    
    timer = setInterval(() => { timeSpentRef.current += 1; }, 1000); // Mulai timer
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', sendTimeData);

    return () => {
      if (timer) clearInterval(timer); // Pastikan timer ada sebelum di-clear saat cleanup
      sendTimeData(); 
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendTimeData);
    };
  }, [userChildContext, materialId]); 

  // useEffect untuk scroll
  useEffect(() => {
    if (!materi || !bottomRef.current || !materialId || !userChildContext) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCompleted.current) {
          hasCompleted.current = true;
          fetch('/api/progress/complete-material', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                childId: userChildContext.childId, 
                materialId: parseInt(materialId) 
            }),
          })
          .then(res => {
            if(!res.ok) console.error("API complete-material gagal", res);
            else console.log("API complete-material BERHASIL.");
          })
          .catch(error => console.error("FATAL ERROR saat fetch complete-material:", error));
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [materi, materialId, userChildContext]); 

  // Tampilkan loading/error jika konteks belum ada
  if (isLoading || !userChildContext) return <div className="p-4 text-center">Memuat materi dan konteks user...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!materi) return <div className="p-4 text-center">Materi tidak ditemukan.</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-600">{materi.title}</h1>
      <Image
        src={`/image/materi/${slugify(materi.title)}.png`}
        alt={materi.title || 'Gambar Materi'}
        width={700} height={400}
        className="my-4 w-full max-w-md mx-auto rounded-lg shadow-md object-cover"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/700x400/fecdd3/4c0519?text=Gambar+Materi'; }}
        priority
      />
      <p className="text-gray-700 leading-relaxed text-justify">{materi.content}</p>
      <div ref={bottomRef} style={{ height: '50px' }} />
    </div>
  );
}