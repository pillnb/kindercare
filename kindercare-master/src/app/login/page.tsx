"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError("Email dan password wajib diisi")
      return
    }

    if (!isValidEmail(formData.email)) {
      setError("Format email tidak valid")
      return
    }

    setIsLoading(true)
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    setIsLoading(false)

    if (!res.ok) {
      setError(data.error || "Login gagal")
      return
    }

    setDialogOpen(true)
    
    setTimeout(() => {
      if (data.user?.role === "admin") {
        router.push("/admin")
      } else if (data.user?.personalization_completed === false) {
        router.push("/survey");
      } else {
        router.push("/home")
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 py-12 bg-white">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Login Berhasil!</DialogTitle>
            <DialogDescription>
              Mohon tunggu, sedang mengarahkan...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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

        <h1 className="text-left text-xl font-bold text-black mb-1">Log in to KinderCare</h1>
        <p className="text-left text-sm text-gray-500 mb-6">Selamat datang kembali! Masuk dengan akun Anda.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-1">
            <Label htmlFor="email" className="text-pink-500 font-semibold text-sm">Email</Label>
            <Input
              id="email"
              type="text"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Masukkan Alamat Email"
            />
          </div>

          <div className="space-y-1 relative">
            <Label htmlFor="password" className="text-pink-500 font-semibold text-sm">Password</Label>
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
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-right text-sm text-pink-500 font-medium">
            <Link href="/lupa-password">Forgot password?</Link>
          </div>

          <Button
            type="submit"
            disabled={!formData.email || !formData.password || isLoading}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F857A6] to-[#FF5858] text-white font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Masuk"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Belum punya akun? {" "}
            <Link href="/signup" className="text-pink-500 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}