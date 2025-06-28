// src/app/profile/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaQuestionCircle, FaCog, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { BottomNavbar } from "@/components/BottomNavbar";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Tipe data untuk profil
type ProfileData = {
  user: {
    full_name: string;
    email: string;
    phone: string;
    profession: string;
    personalization: string;
  };
  child: {
    full_name: string;
    gender: 'male' | 'female';
    age: number;
  } | null;
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          throw new Error("Gagal mengambil data profil. Mohon login ulang.");
        }
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        const errorMessage = (err as Error).message || "Terjadi kesalahan tidak diketahui.";
        setError(errorMessage);
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    try {
      const res = await fetch("/api/logout", {
        method: "GET",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        throw new Error("Gagal logout. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Logout Error:", err);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <p className="ml-2 text-gray-600">Memuat data profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 p-4 text-center">
        Error: {error}
      </div>
    );
  }

  if (!profileData || !profileData.user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Data profil tidak ditemukan.
      </div>
    );
  }

  const { user, child } = profileData;
  const childName = child?.full_name || 'Nama Anak';
  const childGender = child?.gender === 'female' ? 'Perempuan' : 'Laki-laki';
  const childAge = child?.age ? `${child.age} Tahun` : 'Umur belum diisi';

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white relative pb-28"> 
        <div className="px-4 py-4 space-y-6">

            {/* Header Asli Profile Page */}
            <div className="bg-gradient-to-br from-pink-400 to-pink-300 text-white p-5 rounded-3xl flex justify-between items-center shadow-md">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-inner">
                        <FaUser className="text-pink-400" size={40} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{user.full_name}</h2>
                        <p className="text-sm opacity-90">{user.email}</p>
                        <p className="text-sm opacity-90">{user.phone}</p>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <FaBell size={24} color="#FFF" />
                </div>
            </div>

            {/* Kartu Data Summary */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200">
                <h3 className="text-base font-bold mb-4 text-gray-800">Data Summary</h3>
                <div className="flex flex-col">
                    <div className="py-3">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Nama Lengkap</span>
                        <span className="block text-sm text-gray-900">{user.full_name}</span>
                    </div>
                    <div className="py-3 border-t border-pink-500">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Personalisasi</span>
                        <span className="block text-sm text-gray-900">{user.personalization}</span>
                    </div>
                    <div className="py-3 border-t border-pink-500">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Profesi</span>
                        <span className="block text-sm text-gray-900">{user.profession}</span>
                    </div>
                    <div className="py-3 border-t border-pink-500">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Nama Anak</span>
                        <span className="block text-sm text-gray-900">{childName}</span>
                    </div>
                    <div className="py-3 border-t border-pink-500">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Jenis Kelamin</span>
                        <span className="block text-sm text-gray-900">{childGender}</span>
                    </div>
                    <div className="py-3 border-t border-pink-500">
                        <span className="block font-bold text-xs text-gray-600 mb-1">Umur</span>
                        <span className="block text-sm text-gray-900">{childAge}</span>
                    </div>
                </div>
            </div>

            {/* Menu Pengaturan */}
            <div className="bg-white rounded-3xl shadow-md border border-gray-200">
                <div className="flex items-center p-5 border-b border-pink-500 cursor-pointer hover:bg-gray-50 transition-colors"
                     onClick={() => router.push('/account-settings')}>
                    <FaUser size={20} className="text-gray-600 mr-4" />
                    <span className="flex-grow text-xs text-gray-900 font-medium">Pengaturan Akun</span>
                    <FaChevronRight size={16} className="text-gray-400" />
                </div>
                <div className="flex items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors text-red-600"
                     onClick={() => setShowLogoutModal(true)}>
                    <FaSignOutAlt size={20} className="mr-4" />
                    <span className="flex-grow font-bold text-sm">Keluar</span>
                </div>
            </div>

        </div>
        <BottomNavbar />
      </main>
      
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-lg">
            <p className="text-sm text-gray-800 mb-6">Apakah Anda yakin ingin keluar?</p>
            <div className="flex justify-center space-x-3">
              <button onClick={() => setShowLogoutModal(false)} className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded-full">Batal</button>
              <button onClick={handleLogout} className="px-4 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">Keluar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}