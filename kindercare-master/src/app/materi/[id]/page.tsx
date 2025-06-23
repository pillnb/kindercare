import { notFound } from 'next/navigation'

const materiData: Record<string, { title: string, content: string, image?: string }> = {
  'pengenalan-bagian-tubuh': {
    title: 'Pengenalan Bagian Tubuh',
    content: 'Ini adalah materi tentang bagian-bagian tubuh manusia untuk anak-anak.',
    image: '/image/materi/badan-anak.png', // contoh path, pastikan file gambarnya ada
  },
  'masa-pubertas': {
    title: 'Masa Pubertas',
    content: 'Penjelasan ringan mengenai perubahan saat masa pubertas.',
  },
  'privasi-dan-etika': {
    title: 'Pentingnya Privasi dan Etika',
    content: 'Ajarkan anak untuk menghargai privasi orang lain dan sopan santun.',
  },
  'hubungan-pertemanan': {
    title: 'Hubungan Pertemanan',
    content: 'Bagaimana cara berteman yang sehat dan saling menghormati.',
  }
}

export default function MateriDetail({ params }: { params: { id: string } }) {
  const materi = materiData[params.id]

  if (!materi) return notFound()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-pink-600">{materi.title}</h1>
      {materi.image && <img src={materi.image} alt={materi.title} className="my-4 rounded-lg shadow-md" />}
      <p className="text-gray-700">{materi.content}</p>
    </div>
  )
}
