// Script untuk memperbarui konten materi dengan format yang lebih menarik
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const materiContents = {
  1: `[JUDUL]Mengenal Bagian Tubuhmu
Hai adik-adik! Hari ini kita akan belajar tentang tubuh kita yang sangat istimewa. Tubuh kita adalah rumah untuk jiwa kita, jadi kita harus menjaganya dengan baik!

[SUBJUDUL]Mengapa Kita Perlu Mengenal Tubuh Kita?
Mengenal tubuh kita sangat penting agar kita bisa:
[LIST]Menjaga kesehatan dengan baik
[LIST]Mengetahui bagian mana yang boleh disentuh orang lain
[LIST]Mengetahui bagian mana yang tidak boleh disentuh orang lain
[LIST]Memberitahu orang dewasa jika ada yang tidak nyaman

[SUBJUDUL]Bagian-Bagian Tubuh Kita
Mari kita kenali bagian-bagian tubuh kita:

[LIST]Kepala: Tempat otak kita yang pintar berada
[LIST]Mata: Untuk melihat dunia yang indah
[LIST]Telinga: Untuk mendengar suara-suara di sekitar kita
[LIST]Hidung: Untuk mencium bau yang wangi
[LIST]Mulut: Untuk berbicara dan makan
[LIST]Tangan: Untuk bermain dan membantu orang lain
[LIST]Kaki: Untuk berlari, melompat, dan berjalan

[SUBJUDUL]Bagian Pribadi Tubuh Kita
Ada beberapa bagian tubuh yang sangat spesial dan pribadi:
[LIST]Bagian yang tertutup pakaian dalam
[LIST]Hanya kita sendiri yang boleh menyentuh bagian ini
[LIST]Atau orang tua/pengasuh saat membantu kita mandi atau ke toilet
[LIST]Jika ada orang lain yang menyentuh, segera bilang "TIDAK!" dan lapor ke orang dewasa yang kita percaya

[SUBJUDUL]Ingat Selalu!
Tubuh kita adalah milik kita sendiri. Kita berhak untuk merasa aman dan nyaman. Kalau ada yang membuat kita tidak nyaman, jangan takut untuk bercerita kepada orang yang kita percaya!`,

  2: `[JUDUL]Perbedaan Anak Laki-laki dan Perempuan
Halo teman-teman! Hari ini kita akan belajar tentang perbedaan antara anak laki-laki dan perempuan. Semua perbedaan ini adalah hal yang normal dan indah!

[SUBJUDUL]Apa yang Membuat Kita Berbeda?
Allah menciptakan manusia dengan dua jenis kelamin yang berbeda:
[LIST]Anak laki-laki
[LIST]Anak perempuan

Kedua jenis kelamin ini sama-sama istimewa dan berharga!

[SUBJUDUL]Perbedaan Fisik
Ada beberapa perbedaan fisik antara laki-laki dan perempuan:
[LIST]Bentuk tubuh yang sedikit berbeda
[LIST]Suara yang berbeda (laki-laki cenderung lebih berat, perempuan lebih tinggi)
[LIST]Bagian pribadi yang berbeda
[LIST]Cara tubuh berkembang saat dewasa nanti

[SUBJUDUL]Tapi Ingat...
Meskipun ada perbedaan fisik, yang penting adalah:
[LIST]Semua anak sama-sama pintar
[LIST]Semua anak bisa bermain bersama
[LIST]Semua anak punya hak yang sama
[LIST]Semua anak bisa meraih cita-cita mereka

[SUBJUDUL]Menghormati Perbedaan
Kita harus selalu menghormati teman-teman kita:
[LIST]Tidak mengejek perbedaan fisik
[LIST]Bermain dengan baik bersama semua teman
[LIST]Membantu teman yang membutuhkan
[LIST]Selalu bersikap sopan dan ramah

Ingat, perbedaan adalah anugerah yang membuat dunia ini menjadi tempat yang indah dan beragam!`,

  3: `[JUDUL]Aturan Sentuhan Aman
Hai sayang! Hari ini kita akan belajar tentang sentuhan. Ada sentuhan yang baik dan ada sentuhan yang tidak baik. Mari kita pelajari bersama!

[SUBJUDUL]Apa itu Sentuhan Aman?
Sentuhan aman adalah sentuhan yang membuat kita merasa:
[LIST]Nyaman dan senang
[LIST]Aman dan terlindungi
[LIST]Dicintai dan disayangi
[LIST]Tidak takut atau khawatir

[SUBJUDUL]Contoh Sentuhan Aman
Berikut ini adalah contoh sentuhan yang aman dan baik:
[LIST]Pelukan dari mama dan papa
[LIST]Cipika-cipiki dengan keluarga
[LIST]Salaman dengan guru atau teman
[LIST]Elus-elus di kepala oleh orang yang kita sayang
[LIST]High-five dengan teman saat bermain

[SUBJUDUL]Sentuhan yang Tidak Aman
Ada juga sentuhan yang tidak aman dan harus kita hindari:
[LIST]Sentuhan di bagian pribadi tubuh kita
[LIST]Sentuhan yang membuat kita tidak nyaman
[LIST]Sentuhan yang dilakukan sembunyi-sembunyi
[LIST]Sentuhan yang disertai ancaman atau hadiah rahasia

[SUBJUDUL]Aturan Penting Sentuhan Aman
Mari kita ingat aturan-aturan penting ini:
[LIST]Tubuh kita adalah milik kita sendiri
[LIST]Kita boleh bilang "TIDAK!" jika ada sentuhan yang tidak nyaman
[LIST]Tidak ada rahasia dalam sentuhan
[LIST]Selalu cerita ke orang dewasa yang kita percaya jika ada yang aneh

[SUBJUDUL]Jika Ada Sentuhan yang Tidak Aman
Kalau ada yang menyentuh kita dengan cara yang tidak aman:
[LIST]Segera bilang "TIDAK!" dengan keras
[LIST]Lari dan cari bantuan
[LIST]Ceritakan ke mama, papa, atau guru
[LIST]Ingat: ini bukan salah kita!

Kita semua berhak merasa aman dan nyaman. Jangan pernah takut untuk bercerita!`,

  4: `[JUDUL]Siapa yang Bisa Dipercaya?
Halo anak pintar! Hari ini kita akan belajar tentang orang-orang yang bisa kita percaya. Ini sangat penting untuk menjaga keamanan kita!

[SUBJUDUL]Mengapa Kita Perlu Orang yang Dipercaya?
Kita semua butuh orang yang bisa kita percaya untuk:
[LIST]Membantu saat kita dalam kesulitan
[LIST]Mendengarkan cerita kita
[LIST]Melindungi kita dari bahaya
[LIST]Memberikan nasihat yang baik

[SUBJUDUL]Orang-Orang yang Biasanya Bisa Dipercaya
Biasanya, orang-orang ini bisa kita percaya:
[LIST]Papa dan Mama
[LIST]Kakek dan Nenek
[LIST]Om dan Tante terdekat
[LIST]Guru di sekolah
[LIST]Perawat atau dokter
[LIST]Polisi yang bertugas

[SUBJUDUL]Ciri-Ciri Orang yang Bisa Dipercaya
Orang yang bisa dipercaya biasanya:
[LIST]Selalu peduli dengan perasaan kita
[LIST]Tidak pernah menyuruh kita menyimpan rahasia yang aneh
[LIST]Menghormati tubuh dan privasi kita
[LIST]Selalu mau mendengarkan keluhan kita
[LIST]Tidak pernah mengancam atau membuat kita takut

[SUBJUDUL]Kapan Harus Waspada?
Kita harus waspada jika ada orang yang:
[LIST]Menyuruh kita menyimpan rahasia
[LIST]Memberikan hadiah dengan syarat aneh
[LIST]Menyentuh tubuh kita dengan cara yang tidak nyaman
[LIST]Mengajak kita pergi tanpa izin orang tua
[LIST]Membuat kita merasa takut atau tidak nyaman

[SUBJUDUL]Tips Memilih Orang yang Dipercaya
Untuk memilih orang yang bisa dipercaya:
[LIST]Pilih orang yang sudah lama kita kenal
[LIST]Pilih orang yang juga dipercaya oleh papa mama
[LIST]Pastikan mereka selalu berbuat baik kepada kita
[LIST]Jika ragu, tanya dulu ke papa mama

Ingat, kita boleh memilih siapa yang ingin kita percayai. Kalau ada yang membuat kita tidak nyaman, jangan ragu untuk bercerita!`,

  5: `[JUDUL]Perasaan yang Berbeda
Hai teman-teman! Kita semua punya perasaan, dan semua perasaan itu normal. Mari kita belajar tentang berbagai perasaan yang bisa kita rasakan!

[SUBJUDUL]Apa itu Perasaan?
Perasaan adalah hal yang kita rasakan di dalam hati kita. Perasaan bisa berubah-ubah, dan itu normal!

[SUBJUDUL]Perasaan yang Menyenangkan
Ada banyak perasaan yang membuat kita senang:
[LIST]Bahagia: Saat kita bermain dengan teman
[LIST]Senang: Saat mendapat hadiah atau pujian
[LIST]Bangga: Saat berhasil mengerjakan sesuatu
[LIST]Sayang: Saat bersama keluarga
[LIST]Tenang: Saat beristirahat dengan nyaman

[SUBJUDUL]Perasaan yang Kurang Menyenangkan
Kadang kita juga merasakan hal yang kurang menyenangkan:
[LIST]Sedih: Saat kehilangan sesuatu yang kita sayang
[LIST]Marah: Saat ada yang tidak adil
[LIST]Takut: Saat menghadapi hal yang menakutkan
[LIST]Khawatir: Saat memikirkan hal yang belum terjadi
[LIST]Kecewa: Saat harapan kita tidak terwujud

[SUBJUDUL]Semua Perasaan itu Normal!
Yang penting untuk diingat:
[LIST]Semua perasaan itu wajar dan normal
[LIST]Tidak ada perasaan yang salah
[LIST]Kita boleh merasakan apa saja
[LIST]Yang penting adalah bagaimana kita mengungkapkannya

[SUBJUDUL]Cara Mengungkapkan Perasaan yang Baik
Kita bisa mengungkapkan perasaan dengan cara:
[LIST]Bercerita kepada orang yang kita percaya
[LIST]Menggambar atau menulis tentang perasaan kita
[LIST]Bermain atau berolahraga untuk mengeluarkan energi
[LIST]Menangis jika kita sedih (itu tidak apa-apa!)
[LIST]Meminta pelukan saat kita butuh kenyamanan

[SUBJUDUL]Perasaan Tidak Nyaman di Tubuh
Kadang kita merasakan hal aneh di tubuh kita:
[LIST]Perut terasa aneh saat gugup
[LIST]Jantung berdebar saat takut
[LIST]Badan gemetar saat marah
[LIST]Kepala pusing saat sedih

Jika kita merasa tidak nyaman karena ada orang yang menyentuh kita dengan cara yang aneh, segera cerita kepada orang dewasa yang kita percaya!

Ingat, perasaan kita sangat berharga. Jangan pernah biarkan orang lain membuat kita merasa tidak nyaman!`
};

async function updateMaterialContents() {
  try {
    console.log('Memulai pembaruan konten materi...');
    
    for (const [materialId, content] of Object.entries(materiContents)) {
      const id = parseInt(materialId);
      
      await prisma.material.update({
        where: { id },
        data: { content }
      });
      
      console.log(`✓ Berhasil memperbarui materi ID ${id}`);
    }
    
    console.log('\n🎉 Semua konten materi berhasil diperbarui!');
    console.log('Konten sekarang menggunakan format tag yang menarik dan ramah anak.');
    
  } catch (error) {
    console.error('❌ Error saat memperbarui konten:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMaterialContents();
