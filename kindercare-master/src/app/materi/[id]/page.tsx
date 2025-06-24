import { notFound } from 'next/navigation'

type Materi = {
  id: number
  title: string
  content?: string
}

// Gantilah ini dengan URL base kamu di production nanti
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Fungsi untuk membuat slug dari title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // hapus simbol aneh
    .replace(/\s+/g, '-')     // ganti spasi dengan -
    .replace(/--+/g, '-')     // hindari double dash
    .trim()
}

export default async function MateriDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${BASE_URL}/api/materials/${params.id}`, {
    cache: 'no-store',
  })

  if (!res.ok) return notFound()

  const materi: Materi = await res.json()

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-600">{materi.title}</h1>

      {materi.title && (
        <img
          src={`/image/materi/${slugify(materi.title)}.png`}
          alt={materi.title}
          className="my-4 w-full max-w-md mx-auto rounded-lg shadow-md"
        />
      )}

      <p className="text-gray-700 leading-relaxed text-justify">{materi.content}</p>
    </div>
  )
}
