"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email wajib diisi")
      return
    }

    if (!isValidEmail(email)) {
      setError("Format email tidak valid")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
        <Card className="w-full max-w-sm p-0 border-0 shadow-none">
          <div className="flex items-center mb-6">
            <button 
              type="button" 
              onClick={() => router.push('/login')} 
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            
            <h1 className="text-xl font-bold text-black">Email Terkirim!</h1>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              Kami telah mengirimkan link reset password ke email <strong>{email}</strong>. 
              Silakan cek email Anda dan ikuti instruksi untuk mereset password.
            </p>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => router.push('/login')}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90"
              >
                Kembali ke Login
              </Button>
              
              <Button 
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                }}
                variant="outline"
                className="w-full h-12 rounded-full border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 font-semibold"
              >
                Kirim Ulang Email
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
          Lupa Password?
        </h1>
        <p className="text-left text-sm text-gray-500 mb-6">
          Masukkan email Anda untuk menerima link reset password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="space-y-1">
            <Label htmlFor="email" className="text-pink-500 font-semibold text-sm">
              Email
            </Label>
            <Input 
              id="email" 
              type="email" 
              autoComplete="email" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="Masukkan alamat email Anda"
              className="h-12"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            "Kirim Link Reset"
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
