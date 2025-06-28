// src/app/account-settings/page.tsx

"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { FaUser, FaSave, FaTimes } from 'react-icons/fa';
import { BottomNavbar } from "@/components/BottomNavbar";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

type UserData = {
  full_name: string;
  email: string;
  phone: string;
  profession: string;
  personalization: string;
};

type ChildData = {
  full_name: string;
  gender: 'male' | 'female';
  age: number;
  education_level: string;
} | null;

type ProfileData = {
  user: UserData;
  child: ChildData;
};

const EditRow = ({ label, name, value, onChange, type = 'text' }: { label: string, name: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, type?: string }) => (
    <div className='py-2'>
        <label htmlFor={name} className="block font-bold text-xs text-gray-600 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-pink-500 focus:border-pink-500"
        />
    </div>
);

const InfoRowWithSeparator = ({ label, value }: { label: string; value: string; }) => (
  <>
    <div className="py-3">
        <span className="block font-bold text-xs text-gray-600 mb-1">{label}</span>
        <span className="block text-sm text-gray-900">{value}</span>
    </div>
    <div className="h-[1px] bg-pink-500"></div>
  </>
);

const LastInfoRow = ({ label, value }: { label: string; value: string; }) => (
    <div className="py-3">
        <span className="block font-bold text-xs text-gray-600 mb-1">{label}</span>
        <span className="block text-sm text-gray-900">{value}</span>
    </div>
);


export default function PengaturanAkunPage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Gagal mengambil data profil.");
        const data = await res.json();
        setProfileData(data);
        setFormData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, category: 'user' | 'child') => {
    const { name, value } = e.target;
    if (formData) {
        setFormData((prev) => prev ? {
            ...prev,
            [category]: {
                ...prev[category],
                [name]: value,
            },
        } : null);
    }
  };

  const handleRadioChange = (value: string) => {
    if (formData) {
        setFormData((prev) => {
            if (!prev) return null;
            // Pastikan child tidak null sebelum menyebar propertinya
            const childData = prev.child ? { ...prev.child, gender: value as 'male' | 'female' } : null;
            return {
                ...prev,
                child: childData,
            };
        });
    }
  };
  
  const handleSave = async () => {
    if (!formData || !profileData) return;

    if (JSON.stringify(formData) === JSON.stringify(profileData)) {
      toast.info("Tidak ada perubahan untuk disimpan.");
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
        const res = await fetch('/api/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Gagal menyimpan data.');
        
        setProfileData(formData);
        setIsEditing(false);
        toast.success("Data berhasil diperbarui!");
    } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        toast.error(errorMessage);
    } finally {
        setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (error && !profileData) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!profileData || !formData) {
    return <div className="p-4 text-center text-gray-500">Data tidak ditemukan.</div>;
  }
  
  const { user, child } = isEditing ? formData : profileData;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="max-w-md w-full bg-white relative pb-28">
        <div className="relative bg-pink-400 bg-gradient-to-br from-pink-400 to-pink-300 text-white pt-6 pb-16 rounded-b-3xl shadow-md">
          <div className="flex items-center px-4 mb-4">
            <button onClick={() => router.back()} className="mr-4">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Pengaturan Akun</h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] flex flex-col items-center">
            <div className="w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
              <FaUser className="text-pink-400" size={50} />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4 mt-[45px]">
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-full flex items-center gap-2">
                    <FaTimes /> Batal
                </button>
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 text-sm bg-green-500 text-white rounded-full flex items-center gap-2">
                    {isSaving ? <Loader2 className='animate-spin' /> : <FaSave />}
                    Simpan
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm bg-pink-500 text-white rounded-full">
                Edit Data
              </button>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200">
            <h2 className="text-base font-bold mb-2">Data Orang Tua</h2>
            <div className="flex flex-col">
              {isEditing ? (
                <>
                  <EditRow label="Nama Lengkap" name="full_name" value={formData.user.full_name} onChange={(e) => handleInputChange(e, 'user')} />
                  <div className="h-[1px] bg-pink-500 my-1"></div>
                  <EditRow label="Profesi" name="profession" value={formData.user.profession || ''} onChange={(e) => handleInputChange(e, 'user')} />
                  <div className="h-[1px] bg-pink-500 my-1"></div>
                  <EditRow label="Handphone" name="phone" value={formData.user.phone || ''} onChange={(e) => handleInputChange(e, 'user')} />
                  <div className="h-[1px] bg-pink-500 my-1"></div>
                  <LastInfoRow label="Email" value={user.email} />
                </>
              ) : (
                <>
                  <InfoRowWithSeparator label="Nama Lengkap" value={user.full_name} />
                  <InfoRowWithSeparator label="Profesi" value={user.profession || 'Belum diisi'} />
                  <InfoRowWithSeparator label="Handphone" value={user.phone || 'Belum diisi'} />
                  <LastInfoRow label="Email" value={user.email} />
                </>
              )}
            </div>
          </div>

          {child && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200">
              <h2 className="text-base font-bold mb-2">Data Anak</h2>
              <div className="flex flex-col">
                {isEditing ? (
                  <>
                    <EditRow label="Nama Lengkap Anak" name="full_name" value={formData.child?.full_name || ''} onChange={(e) => handleInputChange(e, 'child')} />
                    <div className="h-[1px] bg-pink-500 my-1"></div>
                    <div className='py-2'>
                        <label className="block font-bold text-xs text-gray-600 mb-1">Jenis Kelamin</label>
                        <RadioGroup value={formData.child?.gender} onValueChange={handleRadioChange} className="flex gap-4 pt-1">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Laki-laki</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Perempuan</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="h-[1px] bg-pink-500 my-1"></div>
                    <EditRow label="Umur Anak (Tahun)" name="age" value={formData.child?.age?.toString() ?? ''} onChange={(e) => handleInputChange(e, 'child')} type="number" />
                  </>
                ) : (
                  <>
                    <InfoRowWithSeparator label="Nama Lengkap" value={child.full_name} />
                    <InfoRowWithSeparator label="Jenis Kelamin" value={child.gender === 'female' ? 'Perempuan' : 'Laki-laki'} />
                    <InfoRowWithSeparator label="Umur" value={`${child.age} Tahun`} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavbar />
    </div>
  );
}