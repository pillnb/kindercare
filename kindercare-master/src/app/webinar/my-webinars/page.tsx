"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  User,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface WebinarItem {
  id: number; 
  webinarId: number;
  bannerImageSrc?: string; 
  title: string;
  speaker: string;
  date: string;
  lokasi?: string; 
  job_speaker?: string;
}

export default function WebinarPage() {
  const router = useRouter();
  const [webinars, setWebinars] = useState<WebinarItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [webinarToDeleteId, setWebinarToDeleteId] = useState<number | null>(null); 
  
  const [deleteStatusMessage, setDeleteStatusMessage] = useState<string | null>(null);
  const [showDeleteResultMessage, setShowDeleteResultMessage] = useState(false);

  useEffect(() => {
    const fetchWebinars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/webinars/registrations");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setWebinars(data);
      // } catch (err: any) { // PERBAIKAN: Memperbaiki blok catch
      //   console.error("Failed to fetch webinars:", err);
      //   setError(err.message || "Gagal memuat webinar. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const handleConfirmDelete = async () => {
    if (webinarToDeleteId === null) return; 

    setShowDeleteConfirmModal(false); 

    try {
      const res = await fetch(`/api/webinars/registrations/${webinarToDeleteId}`, {
        method: "DELETE",
      });

      const data = await res.json(); 

      if (!res.ok) {
        if (res.status === 401) {
          setDeleteStatusMessage(data.message || "Anda tidak memiliki otorisasi.");
        } else if (res.status === 404) {
          setDeleteStatusMessage(data.message || "Pendaftaran tidak ditemukan.");
        } else if (res.status === 400) {
          setDeleteStatusMessage(data.message || "Permintaan tidak valid.");
        } else {
          setDeleteStatusMessage(data.message || "Gagal membatalkan pendaftaran.");
        }
      } else {
        setDeleteStatusMessage(data.message || "Pendaftaran webinar berhasil dibatalkan.");
        setWebinars((prev) => prev.filter((item) => item.id !== webinarToDeleteId));
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      setDeleteStatusMessage("Terjadi kesalahan jaringan saat membatalkan pendaftaran.");
    } finally {
      setWebinarToDeleteId(null); 
      setShowDeleteResultMessage(true); 
    }
  };
  
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white pb-28 relative">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-5 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Webinar Saya</h1>
          </div>
        </div>

        {/* Konten */}
        <div className="px-4 py-6 space-y-6">
          {/* Daftar Webinar */}
          <section>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                  <p className="ml-2 text-gray-600">Memuat webinar...</p>
                </div>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : webinars.length > 0 ? (
                webinars.map((webinar) => (
                  <div
                    key={webinar.id} 
                    className="flex items-center bg-white rounded-2xl shadow-md px-4 py-3"
                  >
                    {/* Gambar Webinar */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                      <Image
                        src={
                          webinar.bannerImageSrc || // PERBAIKAN: Menggunakan bannerImageSrc
                          "/image/webinar/img-webinar-page.png" 
                        }
                        alt={webinar.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info Webinar */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">
                        {webinar.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {webinar.speaker}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CalendarDays className="w-3.5 h-3.5 mr-1" />
                        {new Date(webinar.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Tombol Hapus */}
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => {
                          setWebinarToDeleteId(webinar.id); 
                          setShowDeleteConfirmModal(true); 
                        }}
                        className="text-xs font-medium text-pink-600 border border-pink-300 px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Tidak ada webinar mendatang yang Anda daftar.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Modal Konfirmasi Hapus */}
        {showDeleteConfirmModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className="text-sm text-gray-800 mb-4">
                Apakah Anda yakin untuk membatalkan mengikuti webinar?
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirmModal(false);
                    setWebinarToDeleteId(null); 
                  }}
                  className="px-4 py-1 text-sm border border-pink-500 text-pink-500 rounded-full"
                >
                  Tidak
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-1 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-600"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Hasil Penghapusan (Sukses/Gagal) */}
        {showDeleteResultMessage && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className={`text-sm mb-4 ${deleteStatusMessage?.includes('berhasil') ? 'text-grey-600' : 'text-grey'}`}>
                {deleteStatusMessage}
              </p>
              <button
                onClick={() => setShowDeleteResultMessage(false)}
                className="px-4 py-1 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-500"
              >
                Oke
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}