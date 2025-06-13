"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { full_name, email, phone, password, confirmPassword, profession } =
      formData;

    if (!full_name || !email || !phone || !password || !confirmPassword) {
      setError("Semua field wajib diisi");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          phone,
          password,
          profession,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || "Gagal mendaftar");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setIsLoading(false);
      setError("Terjadi kesalahan saat mendaftar");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
      <Card className="w-full max-w-sm p-0 border-0 shadow-none">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-left text-xl font-bold text-black mb-1">
          Daftar dengan Email
        </h1>
        <p className="text-left text-sm text-gray-500 mb-6">
          Selamat datang! Silakan isi kolom berikut dengan benar ya.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-1">
            <Label
              htmlFor="full_name"
              className="text-pink-500 font-semibold text-sm"
            >
              Nama Lengkap
            </Label>
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
              placeholder="Masukkan Nama Lengkap"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="text-pink-500 font-semibold text-sm"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Masukkan Email"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="phone"
              className="text-pink-500 font-semibold text-sm"
            >
              Nomor WhatsApp
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Masukkan Nomor HP"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="profession"
              className="text-pink-500 font-semibold text-sm"
            >
              Profesi
            </Label>
            <Input
              id="profession"
              type="text"
              value={formData.profession}
              onChange={(e) => updateField("profession", e.target.value)}
              placeholder="Misal: Ibu rumah tangga / PNS / dll"
            />
          </div>

          <div className="space-y-1 relative">
            <Label
              htmlFor="password"
              className="text-pink-500 font-semibold text-sm"
            >
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute top-8 right-0 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="space-y-1 relative">
            <Label
              htmlFor="confirmPassword"
              className="text-pink-500 font-semibold text-sm"
            >
              Konfirmasi Password
            </Label>
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="••••••"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute top-8 right-0 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF8A9D] text-white font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Daftar"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
