const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allMaterials = [
  {
    id: 1,
    content: `[JUDUL]Kenali Bagian Tubuhmu

Tubuh kita adalah anugerah yang luar biasa! Setiap hari, tubuh kita bekerja keras untuk membantu kita bermain, belajar, dan melakukan hal-hal menyenangkan. Mari kita kenali lebih dekat bagian-bagian tubuh kita dan pelajari cara menjaganya dengan baik.

[SUBJUDUL]Kenapa Ini Penting?

Mengenal tubuh kita sendiri adalah langkah pertama untuk hidup sehat dan aman. Ketika kita memahami tubuh kita, kita bisa lebih baik dalam menjaga kesehatan, mengenali ketika ada yang tidak beres, dan yang paling penting, memahami batasan pribadi kita.

Setiap bagian tubuh memiliki fungsi yang istimewa. Mata kita bisa melihat warna-warni dunia, telinga mendengar musik indah, dan tangan kita bisa memeluk orang terkasih. Semua bagian ini bekerja sama untuk membuat kita menjadi diri kita yang unik.

[HIGHLIGHT]Tubuhmu adalah milikmu! Kamu yang menentukan siapa yang boleh menyentuhnya dan siapa yang tidak.

[SUBJUDUL]Bagian Tubuh Kita

Tubuh kita terdiri dari banyak bagian yang masing-masing punya tugas khusus. Ada bagian yang bisa kita tunjukkan dengan bebas kepada orang lain, dan ada bagian yang lebih pribadi.

[LIST]Kepala dan Wajah: Tempat otak pintar kita bekerja, mata untuk melihat, hidung untuk mencium, dan mulut untuk berbicara
[LIST]Lengan dan Tangan: Untuk memeluk, menulis, bermain, dan melakukan aktivitas seru
[LIST]Tubuh (Dada dan Perut): Tempat jantung dan organ penting lainnya bekerja dengan rajin
[LIST]Kaki: Untuk berjalan, berlari, melompat, dan bermain

Semua bagian ini bekerja sama seperti sebuah tim yang hebat. Jantung memompa darah, paru-paru membantu kita bernapas, dan otak mengatur semuanya seperti seorang kapten yang bijak.

[SUBJUDUL]Bagian Pribadi - Area Spesial

Ada bagian tubuh yang sangat spesial dan pribadi. Bagian ini biasanya ditutup oleh pakaian dalam dan hanya boleh dilihat atau disentuh oleh diri kita sendiri. Ini seperti ruang rahasia pribadi yang hanya milik kita.

[PENTING]Bagian pribadi adalah area yang biasanya ditutup oleh pakaian dalam. Ini adalah area yang sangat spesial dan hanya boleh disentuh oleh dirimu sendiri.

Terkadang, orang dewasa yang kita percaya seperti orang tua atau dokter mungkin perlu membantu kita dengan bagian pribadi ini. Tapi mereka harus selalu menjelaskan mengapa mereka perlu melakukannya, dan kita harus merasa nyaman dengan alasan tersebut.

[INFO]Pengecualian: Orang tua atau dokter boleh menyentuh bagian pribadi hanya saat membantu membersihkan atau memeriksa kesehatan, dan kamu harus tahu alasannya.

[HIGHLIGHT]Ingat: Jika ada yang menyentuh bagian pribadimu dan membuatmu tidak nyaman, segera bilang "TIDAK" dan lapor ke orang dewasa yang kamu percaya!

Tubuh kita juga memiliki "sistem alarm" alami. Ketika ada sesuatu yang tidak beres atau membuat kita tidak nyaman, tubuh kita akan memberikan sinyal. Misalnya, perut terasa aneh, jantung berdebar kencang, atau kita merasa takut. Ini adalah cara tubuh kita melindungi diri.`
  },
  {
    id: 2,
    content: `[JUDUL]Tubuhku adalah Milikku

Setiap orang memiliki tubuh yang unik dan istimewa. Tubuhmu adalah rumah untuk jiwamu, tempat yang paling berharga yang harus kamu jaga dan lindungi. Tidak ada orang lain yang boleh menentukan apa yang terjadi pada tubuhmu tanpa persetujuanmu.

[SUBJUDUL]Apa Artinya "Tubuhku adalah Milikku"?

Ini adalah konsep yang sangat penting untuk dipahami. Artinya, kamu memiliki kontrol penuh atas tubuhmu sendiri. Kamu berhak memutuskan siapa yang boleh menyentuhmu, kapan, dan bagaimana caranya.

Bayangkan tubuhmu seperti rumah pribadi yang hanya milikmu. Sama seperti rumah yang memiliki pintu dan kunci, tubuhmu juga memiliki batasan-batasan yang harus dihormati oleh orang lain. Kamu adalah pemilik rumah itu, jadi kamu yang memutuskan siapa yang boleh masuk dan siapa yang tidak.

[HIGHLIGHT]Kamu adalah boss dari tubuhmu sendiri! Tidak ada orang lain yang boleh membuat keputusan tentang tubuhmu tanpa izinmu.

[SUBJUDUL]Hak-Hak Tubuhmu

Sebagai pemilik tubuhmu, kamu memiliki beberapa hak yang sangat penting dan tidak boleh dilanggar oleh siapa pun.

[LIST]Hak untuk mengatakan "TIDAK" jika tidak mau disentuh
[LIST]Hak untuk merasa aman dan nyaman dengan tubuhmu
[LIST]Hak untuk meminta bantuan jika ada yang membuatmu tidak nyaman
[LIST]Hak untuk tahu alasan jika ada yang perlu menyentuh tubuhmu

Hak-hak ini berlaku untuk semua orang, tidak peduli siapa mereka. Bahkan jika itu adalah orang yang kamu kenal atau sayangi, mereka tetap harus menghormati hak-hakmu.

[SUBJUDUL]Batasan yang Sehat

Setiap orang perlu memahami konsep batasan pribadi. Batasan ini seperti garis tak terlihat yang melindungi ruang pribadimu. Ada batasan fisik dan batasan emosional.

Batasan fisik berkaitan dengan siapa yang boleh menyentuh tubuhmu dan bagaimana caranya. Batasan emosional berkaitan dengan bagaimana orang lain berbicara denganmu dan memperlakukanmu.

[INFO]Contoh batasan yang sehat:

[LIST]Tidak semua orang boleh memelukmu jika kamu tidak mau
[LIST]Bagian pribadi tubuhmu hanya boleh disentuh untuk alasan kesehatan
[LIST]Tidak ada yang boleh memaksamu melakukan sesuatu yang membuatmu takut
[LIST]Kamu boleh minta waktu sendiri jika butuh ruang pribadi

[PENTING]Ingat: Batasan yang sehat bukan berarti kamu tidak ramah. Ini artinya kamu pintar menjaga diri sendiri!

[SUBJUDUL]Kapan Harus Berkata "TIDAK"

Ada kalanya kamu perlu berkata "TIDAK" dengan tegas untuk melindungi dirimu. Ini bukan hal yang kasar atau tidak sopan - ini adalah cara kamu menjaga keamanan dirimu sendiri.

Kamu boleh dan harus berkata "TIDAK" jika ada yang memintamu melakukan sesuatu yang membuatmu tidak nyaman, takut, atau bingung. Perasaanmu adalah panduan yang baik untuk mengetahui kapan harus menolak.

[HIGHLIGHT]Kata "TIDAK" adalah kata yang sangat powerful! Jangan takut menggunakannya untuk melindungi dirimu.

Orang dewasa yang baik akan selalu menghormati kata "TIDAK" darimu. Jika ada yang marah atau mencoba memaksamu setelah kamu berkata "TIDAK", itu adalah tanda bahaya dan kamu harus segera mencari bantuan.`
  }
];

// Akan ditambahkan sisa materinya
const additionalMaterials = [
  { id: 3, title: "Perbedaan Anak Laki-laki dan Perempuan" },
  { id: 4, title: "Aturan Sentuhan Aman" },
  { id: 5, title: "Siapa yang Bisa Dipercaya?" },
  { id: 6, title: "Rahasia Baik vs Rahasia Buruk" },
  { id: 7, title: "Tubuhku Mulai Berubah" },
  { id: 8, title: "Perasaan yang Berbeda" },
  { id: 9, title: "Teman yang baik dan aman di internet" }
];

async function updateFirstTwoMaterials() {
  console.log('📝 Memperbarui konten 2 materi pertama...');
  
  try {
    for (const material of allMaterials) {
      await prisma.material.update({
        where: { id: material.id },
        data: { content: material.content }
      });
      
      console.log(`✅ Berhasil memperbarui materi ID ${material.id}`);
    }
    
    console.log('\n🎉 2 materi pertama berhasil diperbarui!');
    console.log('📝 Selanjutnya saya akan buat script terpisah untuk materi 3-9');
    
  } catch (error) {
    console.error('❌ Error saat memperbarui konten:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateFirstTwoMaterials();
