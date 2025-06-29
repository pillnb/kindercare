import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Data awal untuk tips komunikasi
const tipsData = [
  {
    title: 'Ketika Anak Bertanya "Mengapa Perempuan Bisa Hamil?"',
    content: `Sangat alami anak-anak ingin tahu tentang "mengapa laki-laki berbeda dengan perempuan?" atau "mengapa perempuan bisa hamil?" Ketika anak mulai bertanya tentang hal tersebut, Anda sebagai orangtua harus siap menjawabnya sebagai bagian dari pendidikan seks untuk anak.\n\nTerkadang, anak dan temannya juga suka tertawa geli saat melihat "area privat" satu sama lain atau berbagi candaan "jorok". Mengutip Healthy Children, itu juga bagian dari rasa penasaran alamiah dari anak tentang seksualitas.`,
    category: 'Komunikasi Lanjutan',
    image_url: '/image/tips/when-child-asks-about-pregnancy.png'
  },
  {
    title: 'Mengenalkan Istilah-Istilah pada Alat Kelamin',
    content: 'Gunakan nama-nama yang benar untuk organ seksual (penis, vagina) sejak dini. Ini membantu menghilangkan tabu dan memudahkan anak untuk berbicara secara terbuka jika mereka mengalami sesuatu yang tidak nyaman. Hindari menggunakan nama samaran yang dapat membingungkan.',
    category: 'Perkenalan',
    image_url: '/image/tips/introducing-terms-for-genitals.png'
  },
  {
    title: 'Cerita Tentang Sentuhan Aman dan Tidak Aman',
    content: 'Gunakan cerita atau boneka untuk menjelaskan konsep sentuhan yang baik (pelukan dari orang tua) dan sentuhan yang buruk (sentuhan di area pribadi oleh orang lain). Ini membantu anak memahami batasan tanpa merasa takut.',
    category: 'Cerita',
    image_url: '/image/tips/safe-and-unsafe-touch.png'
  },
  {
    title: 'Cara Menjelaskan Perbedaan Tubuh Laki-laki dan Perempuan',
    content: 'Jelaskan dengan sederhana dan faktual. Anda bisa mengatakan, "Tubuh laki-laki dan perempuan berbeda agar nanti saat dewasa bisa menjadi ayah dan ibu." Fokus pada fungsi biologis secara umum tanpa detail yang rumit untuk anak usia dini.',
    category: 'Perkenalan',
    image_url: '/image/tips/explaining-body-differences.png'
  }
];

export async function GET() {
  try {
    console.log("Memulai proses setup data Tips...");

    await prisma.$transaction(async (tx) => {
      console.log("Menghapus data Tips lama...");
      await tx.tip.deleteMany();
      
      console.log("Memasukkan data Tips baru...");
      await tx.tip.createMany({
        data: tipsData,
        skipDuplicates: true,
      });
      console.log(`${tipsData.length} data Tips berhasil dimasukkan.`);
    });
    
    return NextResponse.json({ message: 'Setup data Tips berhasil dilaksanakan.' });

  } catch (error) {
    console.error("Gagal melakukan setup data Tips:", error);
    return new NextResponse('Terjadi kesalahan pada server saat setup data.', { status: 500 });
  }
}