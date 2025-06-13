"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000) // 2 detik splash
    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FF6AB4] to-[#FFA3A3]">
        <Image
          src="/image/landing/logoandtext.png"
          alt="KinderCare Logo"
          width={240}
          height={240}
          priority
          className="w-48 h-48 mb-6 animate-pulse"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#FF6AB4] to-[#FFA3A3]">
      <Image
        src="/image/landing/logoandtext.png"
        alt="KinderCare Logo"
        width={240}
        height={240}
        priority
        className="w-48 h-48 mb-6"
      />

      <Button
        onClick={() => router.push("/welcome")}
        className="bg-white text-[#EF5A5A] font-semibold text-lg px-10 py-6 rounded-xl shadow-md hover:bg-pink-100"
      >
        Mulai
      </Button>
    </div>
  )
} 
