"use client"

import { useState, useEffect, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import Link from "next/link"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setError("Token tidak ditemukan")
    } else {
      setTokenValid(true)
    }
  }, [token])

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Semua field wajib diisi")
      return
    }

    if (formData.newPassword.length < 6) {
      setError("Password minimal 6 karakter")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          newPassword: formData.newPassword 
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan")
        return
      }

      setIsSuccess(true)
    } catch {
      setError("Terjadi kesalahan jaringan")
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
        <Card className="w-full max-w-sm p-0 border-0 shadow-none">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            
            <h1 className="text-xl font-bold text-black">Link Tidak Valid</h1>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              Link reset password tidak valid atau sudah kedaluwarsa. 
              Silakan minta link reset password yang baru.
            </p>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => router.push('/lupa-password')}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90"
              >
                Minta Link Baru
              </Button>
              
              <Button 
                onClick={() => router.push('/login')}
                variant="outline"
                className="w-full h-12 rounded-full border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 font-semibold"
              >
                Kembali ke Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
        <Card className="w-full max-w-sm p-0 border-0 shadow-none">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            
            <h1 className="text-xl font-bold text-black">Password Berhasil Direset!</h1>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              Password Anda telah berhasil diubah. 
              Silakan login dengan password baru Anda.
            </p>

            <div className="pt-4">
              <Button 
                onClick={() => router.push('/login')}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90"
              >
                Login Sekarang
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
      <Card className="w-full max-w-sm p-0 border-0 shadow-none">
        <h1 className="text-left text-xl font-bold text-black mb-1">
          Reset Password
        </h1>
        <p className="text-left text-sm text-gray-500 mb-6">
          Masukkan password baru untuk akun Anda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="space-y-1 relative">
            <Label htmlFor="newPassword" className="text-pink-500 font-semibold text-sm">
              Password Baru
            </Label>
            <Input 
              id="newPassword" 
              type={showPassword ? "text" : "password"}
              value={formData.newPassword} 
              onChange={(e) => updateField("newPassword", e.target.value)}
              placeholder="Masukkan password baru"
              className="h-12 pr-10"
            />
            <button 
              type="button" 
              className="absolute top-8 right-3 text-gray-500" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-1 relative">
            <Label htmlFor="confirmPassword" className="text-pink-500 font-semibold text-sm">
              Konfirmasi Password
            </Label>
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword} 
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="Konfirmasi password baru"
              className="h-12 pr-10"
            />
            <button 
              type="button" 
              className="absolute top-8 right-3 text-gray-500" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {formData.newPassword && formData.newPassword.length < 6 && (
            <p className="text-xs text-gray-500">Password minimal 6 karakter</p>
          )}

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="text-center">
            <Link 
              href="/login" 
              className="text-sm text-pink-500 font-semibold hover:underline"
            >
              Kembali ke Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6 text-pink-500" />
          <span className="text-gray-600">Memuat...</span>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
