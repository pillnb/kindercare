"use client";

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from 'react';

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

// Fungsi slugify
function slugify(text: string | null | undefined): string {
  if (!text) return '';
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();
}

// Komponen untuk memproses dan menampilkan markdown content
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const trimmedLine = lines[i].trim();
    
    if (!trimmedLine) {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }
    
    // H1 - Main heading
    if (trimmedLine.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold text-pink-600 mt-6 mb-4">
          {trimmedLine.substring(2)}
        </h1>
      );
      i++;
      continue;
    }
    
    // H2 - Section heading
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-semibold text-gray-800 mt-5 mb-3">
          {trimmedLine.substring(3)}
        </h2>
      );
      i++;
      continue;
    }
    
    // H3 - Subsection heading
    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-gray-700 mt-4 mb-2">
          {trimmedLine.substring(4)}
        </h3>
      );
      i++;
      continue;
    }
    
    // Blockquote
    if (trimmedLine.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-pink-300 pl-4 italic text-gray-700 bg-pink-50 py-2 rounded-r-md">
          {processInlineFormatting(trimmedLine.substring(2))}
        </blockquote>
      );
      i++;
      continue;
    }
    
    // Unordered list items - group consecutive items
    if (trimmedLine.startsWith('- ')) {
      const listItems: string[] = [];
      let currentIndex = i;
      
      while (currentIndex < lines.length && lines[currentIndex].trim().startsWith('- ')) {
        listItems.push(lines[currentIndex].trim().substring(2));
        currentIndex++;
      }
      
      elements.push(
        <ul key={i} className="list-disc list-inside text-gray-700 ml-4 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx}>{processInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      i = currentIndex;
      continue;
    }
    
    // Numbered list items - group consecutive items
    if (/^\d+\. /.test(trimmedLine)) {
      const listItems: string[] = [];
      let currentIndex = i;
      
      while (currentIndex < lines.length && /^\d+\. /.test(lines[currentIndex].trim())) {
        const match = lines[currentIndex].trim().match(/^\d+\. (.+)/);
        listItems.push(match ? match[1] : lines[currentIndex].trim());
        currentIndex++;
      }
      
      elements.push(
        <ol key={i} className="list-decimal list-inside text-gray-700 ml-4 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx}>{processInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      i = currentIndex;
      continue;
    }
    
    // Regular paragraph with emoji and bold support
    elements.push(
      <p key={i} className="text-gray-700 leading-relaxed">
        {processInlineFormatting(trimmedLine)}
      </p>
    );
    i++;
  }
  
  // Process inline formatting function
  function processInlineFormatting(text: string): (string | React.ReactElement)[] {
    // Handle **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);
    
    return parts.map((part, partIndex) => {
      if (partIndex % 2 === 1) {
        return <strong key={partIndex} className="font-semibold text-gray-800">{part}</strong>;
      }
      return part;
    });
  }
  
  return (
    <div className="space-y-4">
      {elements}
    </div>
  );
}

export default function MateriDetailPage() {
  const params = useParams();
  const router = useRouter();
  const materialId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  const [materi, setMateri] = useState<Materi | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userChildContext, setUserChildContext] = useState<UserChildContext | null>(null); 
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasCompleted = useRef(false);
  const timeSpentRef = useRef(0);
  
  // Deklarasi fetchMateriAndContext di scope komponen, bungkus dengan useCallback
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
  }, [materialId]);

  // useEffect untuk mengambil data materi & memulai progress
  useEffect(() => {
    if (!materialId) { 
      setError("ID Materi tidak valid.");
      setIsLoading(false);
      return;
    }
    fetchMateriAndContext();
  }, [materialId, fetchMateriAndContext]);

  // useEffect untuk timer real-time
  useEffect(() => {
    if (!userChildContext || !materialId) return; 

    let timer: NodeJS.Timeout | undefined;
    
    const sendTimeData = async () => {
      if (timeSpentRef.current > 0) {
        try {
          const payload = { 
            userId: userChildContext.userId, 
            childId: userChildContext.childId, 
            materialId: parseInt(materialId), 
            seconds: timeSpentRef.current 
          };
          navigator.sendBeacon('/api/progress/update-time', JSON.stringify(payload));
          timeSpentRef.current = 0;
        } catch (e) {
          console.error("Failed to send time data via sendBeacon:", e);
        }
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
      } else {
        timer = setInterval(() => { timeSpentRef.current += 1; }, 1000);
      }
    };
    
    timer = setInterval(() => { timeSpentRef.current += 1; }, 1000);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', sendTimeData);

    return () => {
      if (timer) clearInterval(timer);
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
          const payload = {
            childId: userChildContext.childId,
            materialId: parseInt(materialId)
          };
          fetch('/api/progress/complete-material', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
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
  if (isLoading || !userChildContext) return (
    <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="ml-2 text-gray-600">Memuat materi...</p>
    </div>
  );
  if (error) return (<div className="p-4 text-center text-red-500">Error: {error}</div>);
  if (!materi) return (<div className="p-4 text-center">Materi tidak ditemukan.</div>);

  return (
    <div className="flex justify-center min-h-screen bg-[#F8F8F8]">
      <main className="max-w-md w-full bg-white pb-32 pt-6 px-4 relative">
        {/* Header */}
        <div className="flex items-center px-2 mb-4">
          <button onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-xl font-bold text-pink-600 truncate">
            {materi?.title}
          </h1>
        </div>
        
        {/* Gambar Materi */}
        <div className="flex justify-center mb-6">
          <Image
            src={`/image/materi/${slugify(materi.title)}.png`}
            alt={materi.title || 'Gambar Materi'}
            width={700} 
            height={400}
            className="w-full max-w-md mx-auto rounded-lg shadow-md object-cover"
            onError={(e) => { 
              e.currentTarget.src = 'https://placehold.co/700x400/fecdd3/4c0519?text=Gambar+Materi'; 
            }}
            priority
          />
        </div>
        
        {/* Konten Materi */}
        <div className="px-2">
          {materi.content ? (
            <MarkdownContent content={materi.content} />
          ) : (
            <p className="text-gray-500 text-center">Konten materi belum tersedia.</p>
          )}
        </div>
        
        {/* Bottom observer untuk complete material */}
        <div ref={bottomRef} style={{ height: '50px' }} />
      </main>
    </div>
  );
}


