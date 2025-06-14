"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Calendar, Clock, Loader2 } from "lucide-react";
import Image from "next/image";

interface Webinar {
  id: string;
  title: string;
  speaker: string;
  job_speaker: string;
  date: string;
  lokasi: string;
  description: string;
  bannerImageSrc?: string;
  speakerImageSrc?: string;
}

export default function DetailWebinarPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);
  const [alreadyRegisteredMessage, setAlreadyRegisteredMessage] = useState<string | null>(null);


  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("ID webinar tidak ditemukan.");
      return;
    }

    const fetchWebinarDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/webinars/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Webinar tidak ditemukan.");
          }
          throw new Error(`Gagal memuat detail webinar. Status: ${res.status}`);
        }
        const data: Webinar = await res.json();
        setWebinar(data);
      // } catch (e: any) { // Tangkap error dengan tipe any
      //   setError(e.message || "Gagal memuat detail webinar.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebinarDetail();
  }, [id]);

  const formatDateString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Tanggal tidak valid";
    }
  };

  const formatTimeString = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    } catch {
      return "Waktu tidak tersedia";
    }
  };

  const handleRegister = async () => {
  if (!id) return;
  setIsSubmitting(true);
  setSubmitError(null); 
  setShowErrorModal(false); 
  setShowSuccessModal(false); 
  setShowConfirmModal(false); 
  setAlreadyRegisteredMessage(null);
  setShowAlreadyRegisteredModal(false);
  try {
    const res = await fetch("/api/webinars/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ webinar_id: Number(id) }),
    });

    const data = await res.json(); 
    if (res.status === 409) {
      setAlreadyRegisteredMessage("Anda sudah terdaftar pada webinar ini.");
      setShowAlreadyRegisteredModal(true);
      return; 
    }

    if (!res.ok) {
      setSubmitError(data.error || "Gagal mendaftar webinar. Silakan coba lagi.");
      setShowErrorModal(true); 
      return;
    }
    setShowSuccessModal(true);
  // } catch (err: any) { 
  //   console.error("Registration error:", err);
  //   setSubmitError("Terjadi kesalahan tak terduga saat mendaftar. Coba lagi nanti.");
  //   setShowErrorModal(true); 
  } finally {
    setIsSubmitting(false);
  }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
        <p className="ml-3 text-gray-600">Memuat detail webinar...</p>
      </div>
    );
  }

  if (error) { // Ini untuk error saat fetch detail webinar
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-4">Webinar tidak ditemukan.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white pb-6">
        <div className="relative bg-white py-3 px-4 flex items-center shadow-sm">
          <button onClick={() => router.back()} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Detail</h1>
        </div>

        <Image
          src={webinar.bannerImageSrc || "/image/webinar/img-webinar.jpg"}
          alt="Webinar Banner"
          width={400}
          height={300}
          className="w-full object-cover h-52 rounded-2"
          priority
        />

        <div className="px-4 py-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">{webinar.title}</h2>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-pink-500" />
            <span>{webinar.lokasi}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-pink-500" />
            <span>{formatDateString(webinar.date)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-pink-500" />
            <span>{formatTimeString(webinar.date)} – Selesai</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Detail Acara</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {webinar.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Speaker</h3>
            <div className="flex items-center bg-white rounded-xl shadow border p-3">
              <Image
                src={webinar.speakerImageSrc || "/image/webinar/img-speaker-1.jpg"}
                alt={webinar.speaker}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover flex-shrink-0 mr-3"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{webinar.speaker}</p>
                <p className="text-xs text-gray-500">{webinar.job_speaker}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center pt-6">
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-6 py-2 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 transition"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>

        {/* Modal Konfirmasi */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className="text-sm text-gray-800 mb-4">Apakah Anda ingin mendaftar webinar ini?</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-1 text-sm border border-pink-500 text-pink-500 rounded-full"
                >
                  Tidak
                </button>
                <button
                  onClick={handleRegister}
                  className="px-4 py-1 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                  ) : null}
                  Ya
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Sukses */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className="text-sm text-gray-800 mb-4">Berhasil melakukan pendaftaran webinar</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-4 py-1 text-sm border border-pink-500 text-pink-500 rounded-full"
                >
                  Tutup
                </button>
                <button
                  onClick={() => router.push("/webinar/my-webinars")}
                  className="px-4 py-1 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-600"
                >
                  Webinar saya
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Error (baru ditambahkan) */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className="text-sm text-red-600 mb-4">{submitError || "Terjadi kesalahan."}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Oke
              </button>
            </div>
          </div>
        )}
        {/* Modal "Anda Sudah Terdaftar" */}
        {showAlreadyRegisteredModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 text-center">
              <p className="text-sm text-gray-800 mb-4">
                {alreadyRegisteredMessage || "Anda sudah terdaftar pada webinar ini."}
              </p>
              <button
                onClick={() => setShowAlreadyRegisteredModal(false)}
                className="px-4 py-1 text-sm bg-pink-500 text-white rounded-full hover:bg-pink-600"
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