"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/welcome")
    }, 2000) // Delay splash 2 detik
    return () => clearTimeout(timeout)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 text-white text-2xl font-bold">
      KinderCare
    </main>
  )
}
