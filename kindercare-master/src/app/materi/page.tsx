'use client'

import { useEffect, useState } from 'react'

type Materi = {
  id: number;
  title: string;
  description?: string;
}

export default function MateriPage() {
  const [umur, setUmur] = useState<number | null>(null)
  const [materiList, setMateriList] = useState<Materi[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const res = await fetch('/api/materials')
        const data = await res.json()
        setUmur(data.umur)
        setMateriList(data.materi)
      } catch (err) {
        console.error('Gagal fetch materi:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMateri()
  }, [])

  if (loading) {
    return <div className="p-4 text-gray-500">Memuat materi...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-pink-600">Materi</h1>
      <p className="text-gray-600">Umur {umur} Tahun</p>
      <p className="mb-4 text-sm text-gray-500">Materi yang dapat Anda ajarkan kepada anak berusia {umur} tahun.</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Detail Materi</h2>

      <ul className="space-y-4">
        {materiList.map((materi) => (
          <li key={materi.id} className="bg-blue-50 p-3 rounded-md shadow-sm">
            <div className="text-blue-700 font-medium">{materi.title}</div>
            <p className="text-sm text-gray-600">{materi.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
