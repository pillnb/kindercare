const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sleekMaterials = [
  {
    id: 1,
    content: `[JUDUL]Mengenal Bagian Tubuhmu

[SUBJUDUL]Kenapa Ini Penting?

Setiap bagian tubuh kita memiliki fungsi yang luar biasa! Dari mata yang bisa melihat keindahan dunia, hingga tangan yang bisa memeluk orang terkasih. Yuk, kita pelajari lebih dalam tentang tubuh kita yang menakjubkan.

[HIGHLIGHT]Tubuhmu adalah milikmu! Kamu yang menentukan siapa yang boleh menyentuhnya dan siapa yang tidak.

[SUBJUDUL]Bagian Tubuh Kita

[LIST]Kepala dan Wajah: Tempat otak pintar kita bekerja, mata untuk melihat, hidung untuk mencium, dan mulut untuk berbicara
[LIST]Lengan dan Tangan: Untuk memeluk, menulis, bermain, dan melakukan aktivitas seru
[LIST]Tubuh (Dada dan Perut): Tempat jantung dan organ penting lainnya bekerja
[LIST]Kaki: Untuk berjalan, berlari, melompat, dan bermain

[SUBJUDUL]Bagian Pribadi - Area Spesial

[PENTING]Bagian pribadi adalah area yang biasanya ditutup oleh pakaian dalam. Ini adalah area yang sangat spesial dan hanya boleh disentuh oleh dirimu sendiri.

[INFO]Pengecualian: Orang tua atau dokter boleh menyentuh bagian pribadi hanya saat membantu membersihkan atau memeriksa kesehatan, dan kamu harus tahu alasannya.

[HIGHLIGHT]Ingat: Jika ada yang menyentuh bagian pribadimu dan membuatmu tidak nyaman, segera bilang "TIDAK" dan lapor ke orang dewasa yang kamu percaya!`
  },
  {
    id: 2,
    content: `[JUDUL]Perbedaan Anak Laki-laki dan Perempuan

[SUBJUDUL]Kita Semua Istimewa!

Setiap orang terlahir unik dan istimewa dengan caranya masing-masing. Anak laki-laki dan perempuan memiliki beberapa perbedaan, tapi yang terpenting adalah kita semua berharga dan pantas dihormati.

[HIGHLIGHT]Perbedaan itu indah! Yang membuat kita spesial bukan hanya fisik, tapi juga kepribadian, bakat, dan mimpi kita.

[SUBJUDUL]Perbedaan Fisik

[LIST]Anak laki-laki memiliki penis dan testis sebagai bagian pribadinya
[LIST]Anak perempuan memiliki vagina sebagai bagian pribadinya
[LIST]Saat dewasa nanti, tubuh akan mengalami perubahan yang berbeda

[SUBJUDUL]Yang Sama Pentingnya

[INFO]Baik laki-laki maupun perempuan bisa menjadi apa saja: dokter, guru, pilot, chef, atau profesi lainnya!

[LIST]Semua anak berhak merasa aman dan dilindungi
[LIST]Semua anak boleh mengekspresikan perasaan mereka
[LIST]Semua anak pantas dihormati dan disayangi
[LIST]Semua anak boleh bermain dengan mainan apa saja yang mereka suka

[PENTING]Yang terpenting bukan jenis kelaminmu, tapi bagaimana kamu menjadi orang yang baik, peduli, dan bahagia!`
  },
  {
    id: 3,
    content: `[JUDUL]Aturan Sentuhan Aman

[SUBJUDUL]Mengenal Jenis Sentuhan

Sentuhan adalah cara kita berkomunikasi dengan orang lain. Ada sentuhan yang membuat kita senang dan nyaman, tapi ada juga yang membuat kita tidak nyaman. Yuk belajar membedakannya!

[HIGHLIGHT]Tubuhmu punya "alarm" alami! Jika sentuhan membuat perutmu terasa aneh atau tidak nyaman, itu tandanya ada yang tidak beres.

[SUBJUDUL]Sentuhan yang Aman dan Nyaman

[LIST]Pelukan hangat dari orang tua atau keluarga
[LIST]Salaman atau tepuk tangan saat bertemu teman
[LIST]Sentuhan lembut saat diobati ketika terluka
[LIST]High-five dengan teman setelah bermain

[SUBJUDUL]Sentuhan yang Tidak Aman

[PENTING]Jika ada yang menyentuh bagian pribadimu tanpa alasan kesehatan yang jelas

[PENTING]Sentuhan yang membuatmu takut, sedih, atau bingung

[PENTING]Sentuhan sambil bilang "ini rahasia, jangan bilang siapa-siapa"

[SUBJUDUL]Apa yang Harus Dilakukan?

[INFO]Jika ada sentuhan yang membuatmu tidak nyaman:

[LIST]Katakan "TIDAK!" dengan tegas jika kamu merasa tidak nyaman
[LIST]Pergi dari tempat itu secepat mungkin jika bisa
[LIST]Ceritakan segera ke orang dewasa yang kamu percaya
[LIST]Ingat: Kamu tidak akan dimarahi karena menceritakan hal ini

[HIGHLIGHT]Kamu selalu punya hak untuk mengatakan "TIDAK" pada sentuhan yang membuatmu tidak nyaman, bahkan dari orang yang kamu kenal!`
  },
  {
    id: 4,
    content: `[JUDUL]Siapa yang Bisa Dipercaya

[SUBJUDUL]Mengenal Orang-orang di Sekitar Kita

Dalam hidup, kita bertemu banyak orang. Ada yang bisa kita percaya sepenuhnya, ada yang boleh kita percaya dalam situasi tertentu, dan ada yang harus kita waspadai. Yuk belajar mengenalinya!

[HIGHLIGHT]Orang yang benar-benar peduli padamu tidak akan pernah memintamu menyimpan rahasia yang membuatmu takut atau tidak nyaman.

[SUBJUDUL]Orang yang Bisa Dipercaya Sepenuhnya

[LIST]Orang tua atau wali yang merawatmu
[LIST]Kakek, nenek, atau keluarga dekat yang kamu kenal baik
[LIST]Guru di sekolah yang sudah dikenal orang tuamu
[LIST]Dokter keluarga yang sudah dipercaya orang tuamu

[SUBJUDUL]Orang yang Perlu Hati-hati

[INFO]Bahkan dengan orang yang kita kenal, tetap penting untuk waspada jika:

[LIST]Mereka meminta kamu menyimpan rahasia tentang sentuhan
[LIST]Mereka memberikan hadiah dengan syarat aneh
[LIST]Mereka memintamu melakukan sesuatu yang membuatmu tidak nyaman
[LIST]Mereka mengajakmu pergi tanpa izin orang tua

[SUBJUDUL]Tanda-tanda Orang yang Baik

[PENTING]Orang dewasa yang baik akan:

[LIST]Menghormati kata "TIDAK" darimu
[LIST]Tidak memaksamu melakukan sesuatu yang tidak kamu mau
[LIST]Tidak marah jika kamu bercerita ke orang tua
[LIST]Tidak meminta kamu menyimpan rahasia yang aneh

[HIGHLIGHT]Ingat: Jika ada yang membuatmu bingung atau takut, selalu ceritakan ke orang tua atau guru. Mereka ada untuk melindungimu!`
  },
  {
    id: 5,
    content: `[JUDUL]Perasaan yang Berbeda

[SUBJUDUL]Dunia Emosi Kita

Perasaan itu seperti warna-warni pelangi! Ada yang cerah dan menyenangkan, ada yang gelap dan membuat sedih. Semua perasaan itu normal dan boleh kita rasakan. Yang penting adalah bagaimana kita menghadapinya.

[HIGHLIGHT]Tidak ada perasaan yang "salah". Semua emosi punya tempatnya dan mengajari kita sesuatu!

[SUBJUDUL]Perasaan Positif

[LIST]Senang: Saat bermain dengan teman atau mendapat pujian
[LIST]Bangga: Ketika berhasil melakukan sesuatu dengan baik
[LIST]Sayang: Perasaan hangat terhadap keluarga dan teman
[LIST]Excited: Saat menantikan sesuatu yang menyenangkan

[SUBJUDUL]Perasaan yang Menantang

[INFO]Perasaan ini tidak menyenangkan, tapi normal untuk dirasakan:

[LIST]Sedih: Saat kehilangan sesuatu atau seseorang yang disayang
[LIST]Marah: Ketika merasa diperlakukan tidak adil
[LIST]Takut: Saat menghadapi sesuatu yang tidak diketahui
[LIST]Bingung: Ketika tidak mengerti apa yang terjadi

[SUBJUDUL]Cara Menghadapi Perasaan

[PENTING]Yang bisa kamu lakukan saat merasa tidak nyaman:

[LIST]Ceritakan perasaanmu ke orang yang kamu percaya
[LIST]Gambar atau tulis tentang apa yang kamu rasakan
[LIST]Lakukan aktivitas yang membuatmu tenang (menggambar, bernyanyi)
[LIST]Minta pelukan dari orang yang kamu sayang

[HIGHLIGHT]Perasaan tidak nyaman karena sentuhan atau perlakuan orang lain HARUS segera diceritakan ke orang dewasa yang dipercaya!

[INFO]Ingat: Berbagi perasaan membuat beban terasa lebih ringan dan membantu orang lain memahami kita lebih baik.`
  }
];

async function updateSleekContent() {
  console.log('🎨 Memperbarui konten materi dengan gaya sleek dan modern...');
  
  try {
    for (const material of sleekMaterials) {
      await prisma.material.update({
        where: { id: material.id },
        data: { content: material.content }
      });
      
      console.log(`✅ Berhasil memperbarui materi ID ${material.id}`);
    }
    
    console.log('🎉 Semua konten berhasil diperbarui dengan gaya sleek dan modern!');
    console.log('📝 Tag baru yang tersedia:');
    console.log('   [JUDUL] - Judul utama dengan border dan background');
    console.log('   [SUBJUDUL] - Subjudul dengan bullet point');
    console.log('   [LIST] - Item list dengan background gradient');
    console.log('   [HIGHLIGHT] - Highlight penting dengan ikon lampu');
    console.log('   [INFO] - Informasi dengan warna biru');
    console.log('   [PENTING] - Peringatan penting dengan warna merah');
    
  } catch (error) {
    console.error('❌ Error saat memperbarui konten:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSleekContent();
