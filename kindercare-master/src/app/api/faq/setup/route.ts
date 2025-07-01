import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Data FAQ Lengkap
const faqData = [
  // Kategori: Informasi Umum
  {
    id: 1,
    question: 'Hal apa saja yang perlu disampaikan saat memberikan pendidikan seksual pada anak?',
    answer: `Poin-poin penting yang perlu disampaikan adalah:
1. Pengenalan nama-nama bagian tubuh dengan benar.
2. Konsep "sentuhan baik" dan "sentuhan buruk".
3. Batasan tubuh pribadi (area yang tidak boleh disentuh orang lain).
4. Siapa saja orang dewasa yang bisa dipercaya untuk melapor jika ada sentuhan tidak nyaman.`,
    category: 'Informasi umum'
  },
  {
    id: 2,
    question: 'Di umur keberapa anak harus diajarkan pendidikan seks?',
    answer: 'Pendidikan ini bisa dimulai sedini mungkin, bahkan sejak usia 2-3 tahun, dengan bahasa yang disesuaikan tingkat pemahaman anak. Semakin dini, semakin baik untuk membangun fondasi kesadaran tubuh.',
    category: 'Informasi umum'
  },
  {
    id: 3,
    question: 'Apakah normal jika anak kecil menyentuh area pribadinya?',
    answer: 'Ya, ini adalah bagian normal dari eksplorasi tubuh anak. Selama dilakukan di tempat pribadi dan tidak berlebihan, ini adalah perilaku wajar. Orang tua bisa mengajarkan tentang batasan dan privasi dengan cara yang positif.',
    category: 'Informasi umum'
  },
  
  // Kategori: Komunikasi
  {
    id: 4,
    question: 'Bagaimana cara memulai percakapan tentang pubertas dengan anak?',
    answer: 'Mulailah secara santai dan bertahap. Gunakan buku atau video sebagai pemicu percakapan. Normalisasikan perubahan yang akan terjadi dan pastikan anak tahu bahwa mereka bisa bertanya apa saja kepada Anda.',
    category: 'Komunikasi'
  },
  {
    id: 5,
    question: 'Bagaimana cara mengajarkan pendidikan seks sejak dini kepada anak? Supaya tidak terjadi kekerasan seksual pada anak?',
    answer: 'Gunakan buku cerita bergambar, lagu, atau permainan peran. Hindari menakut-nakuti. Fokus pada pemberdayaan anak untuk berani berkata "tidak" pada sentuhan yang membuat mereka tidak nyaman dan segera memberitahu orang tua.',
    category: 'Komunikasi'
  },
  {
    id: 6,
    question: 'Pendidikan seks kepada anak itu penting, tapi orangtua sering kesulitan. Bagaimana mengajarakan pendidikan seksual kepada anak dengan cara yang kreatif?',
    answer: 'Anda bisa menggunakan media seperti video animasi edukatif yang ramah anak, membuat poster bersama tentang bagian tubuh, atau menggunakan boneka untuk mensimulasikan situasi sosial yang aman dan tidak aman.',
    category: 'Komunikasi'
  },

  // Kategori: Keamanan Digital
  {
    id: 7,
    question: 'Bagaimana cara melindungi anak dari konten negatif di internet?',
    answer: 'Gunakan fitur "safe search" pada browser, aktifkan mode terbatas di YouTube, dan gunakan aplikasi kontrol orang tua. Yang terpenting adalah membangun komunikasi terbuka agar anak berani melapor jika menemukan sesuatu yang tidak nyaman.',
    category: 'Keamanan Digital'
  },
  {
    id: 8,
    question: 'Apa itu "grooming" online dan bagaimana cara mencegahnya?',
    answer: 'Grooming adalah ketika orang dewasa membangun hubungan emosional dengan anak secara online untuk tujuan eksploitasi. Ajarkan anak untuk tidak pernah membagikan informasi pribadi, tidak menerima permintaan pertemanan dari orang asing, dan tidak pernah setuju untuk bertemu dengan orang yang hanya dikenal secara online.',
    category: 'Keamanan Digital'
  }
];


export async function GET() {
  try {
    console.log("Memulai proses setup data FAQ...");

    // Menggunakan transaksi untuk memastikan semua operasi berhasil atau tidak sama sekali
    await prisma.$transaction(async (tx) => {
      console.log("Menghapus data FAQ lama...");
      await (tx as import('@prisma/client').PrismaClient).faq.deleteMany();
      console.log("Data FAQ lama berhasil dihapus.");

      // Memasukkan data baru tanpa menyertakan ID agar database bisa mengaturnya
      console.log("Memasukkan data FAQ baru...");
      await (tx as import('@prisma/client').PrismaClient).faq.createMany({
        data: faqData.map((faq) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...rest } = faq;
          return rest;
        }), // Menghapus properti 'id' sebelum memasukkan data
        skipDuplicates: true,
      });
      console.log(`${faqData.length} data FAQ berhasil dimasukkan.`);
    });
    
    return NextResponse.json({ message: 'Setup data FAQ berhasil dilaksanakan.' });

  } catch (error) {
    console.error("Gagal melakukan setup data FAQ:", error);
    return new NextResponse('Terjadi kesalahan pada server saat setup data.', { status: 500 });
  }
}