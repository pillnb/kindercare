import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.materialProgress.deleteMany();
  await prisma.webinarRegistration.deleteMany();
  await prisma.dailyProgress.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();
  await prisma.material.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.webinar.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.doctor.deleteMany();

  // Seed Doctors
  await prisma.doctor.createMany({
    data: [
      {
        id: 1,
        full_name: "Prilly Latuconsina, S. Psi.",
        profession: "psikolog",
        is_active: true,
      }
    ]
  });

  // Seed Materials
  await prisma.material.createMany({
    data: [
      {
        id: 1,
        title: "Kenali Bagian Tubuhmu",
        description: "Mengenalkan bagian-bagian tubuh kepada anak.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: 15,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/kenali-bagian-tubuhmu.png",
        content: `# Kenali Bagian Tubuhmu

## Halo Adik-adik! 👋

Hari ini kita akan belajar tentang tubuh kita yang luar biasa! Tubuh kita seperti rumah yang sangat istimewa.

## Bagian-Bagian Tubuh Kita

### Kepala 👤
- **Mata**: Untuk melihat dunia yang indah
- **Hidung**: Untuk mencium bau yang harum
- **Mulut**: Untuk berbicara dan makan
- **Telinga**: Untuk mendengar suara

### Tubuh Bagian Tengah 🫁
- **Dada**: Tempat jantung kita berdetak
- **Perut**: Tempat makanan dicerna
- **Punggung**: Yang membantu kita berdiri tegak

### Tangan dan Kaki 🤲
- **Tangan**: Untuk memegang dan memeluk
- **Kaki**: Untuk berjalan dan berlari

## Bagian Pribadi Kita 🔒

Ada bagian tubuh yang sangat **istimewa** dan **pribadi**:
- Area yang tertutup oleh pakaian dalam
- Bagian ini **HANYA MILIK KITA**
- Tidak boleh disentuh orang lain

## Ingat Selalu! ⭐
> "Tubuhku adalah milikku. Aku yang mengatur siapa boleh menyentuh dan siapa yang tidak."

## Mari Berlatih! 🎯
Tunjukkan bagian tubuhmu dan sebutkan namanya dengan benar!`,
        category: "keselamatan_pribadi"
      },
      {
        id: 2,
        title: "Tubuhku adalah Milikku",
        description: "Mengajarkan bahwa tubuh anak milik mereka sendiri.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: 20,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/tubuhku-adalah-milikku.png",
        content: `# Tubuhku adalah Milikku

## Tubuhmu Istimewa! ✨

Tahukah kamu? Tubuhmu adalah **hadiah paling berharga** yang kamu miliki!

## Aturan Penting Tubuhku 📜

### Tubuhku Milikku 🏠
- Seperti rumah yang memiliki pemilik
- **Kamu** adalah pemilik tubuhmu
- Kamu yang **memutuskan** siapa yang boleh menyentuh

### Siapa yang Boleh Menyentuh? 👨‍👩‍👧‍👦
**Sentuhan yang BAIK:**
- Pelukan dari Papa dan Mama
- Ciuman sayang di pipi
- Dokter saat memeriksa (dengan Papa/Mama)

**Yang TIDAK BOLEH:**
- Orang asing menyentuh area pribadi
- Sentuhan yang membuat tidak nyaman
- Sentuhan yang membuat takut

## Perasaanmu Penting! 💝

### Kalau Merasa Tidak Nyaman:
1. **Katakan "TIDAK"** dengan tegas
2. **Lari** mencari Papa/Mama
3. **Ceritakan** apa yang terjadi

### Ingat Kata Ajaib: 🗣️
> **"STOP! Aku tidak suka!"**

## Latihan Berkata "TIDAK" 💪

Mari berlatih mengucapkan:
- "Tidak, terima kasih!"
- "Aku tidak mau!"
- "Tolong berhenti!"

## Pesan Penting ⭐
Kamu **TIDAK PERNAH SALAH** jika menolak sentuhan yang tidak nyaman. Papa dan Mama akan selalu bangga padamu!`,
        category: "keselamatan_pribadi"
      },
      {
        id: 3,
        title: "Perbedaan Anak Laki-laki dan Perempuan",
        description: "Penjelasan dasar tentang perbedaan jenis kelamin.",
        recommended_age_range: "4-5",
        estimated_duration_minutes: 15,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/perbedaan-anak-laki-laki-dan-perempuan.png",
        content: `# Perbedaan Anak Laki-laki dan Perempuan

## Kita Semua Istimewa! 🌈

Setiap orang diciptakan **unik** dan **istimewa** dengan caranya masing-masing.

## Perbedaan yang Terlihat 👁️

### Anak Laki-laki 👦
- Biasanya memiliki rambut pendek
- Suara cenderung lebih berat saat dewasa
- Tubuh biasanya lebih besar dan kuat

### Anak Perempuan 👧
- Bisa memiliki rambut panjang atau pendek
- Suara cenderung lebih halus
- Tubuh biasanya lebih lembut

## Perbedaan Biologis 🧬

### Alat Kelamin
- **Laki-laki**: Memiliki penis
- **Perempuan**: Memiliki vagina
- Ini adalah perbedaan **ALAMI** dari Tuhan

### Fungsi Tubuh
- Kelak saat dewasa, perempuan bisa hamil
- Laki-laki akan menjadi ayah
- Keduanya **SAMA PENTING** untuk kehidupan

## Yang Sama dari Kita ❤️

Meskipun berbeda, kita memiliki:
- **Perasaan** yang sama
- **Hak** yang sama untuk dihormati
- **Kemampuan** belajar yang sama
- **Mimpi** yang sama pentingnya

## Menghormati Perbedaan 🤝

### Aturan Penting:
1. **Tidak** mengolok-olok perbedaan
2. **Menghormati** privasi masing-masing
3. **Berteman** tanpa membeda-bedakan
4. **Melaporkan** jika ada yang tidak sopan

## Ingat! ⭐
> "Berbeda itu indah, saling menghormati itu wajib!"

Baik laki-laki maupun perempuan, semuanya **berharga** dan **istimewa**!`,
        category: "pubertas"
      },
      {
        id: 4,
        title: "Aturan Sentuhan Aman",
        description: "Mengenalkan zona aman dan tak aman.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: 25,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/aturan-sentuhan-aman.png",
        content: `# Aturan Sentuhan Aman

## Belajar Tentang Sentuhan! 🤗

Tidak semua sentuhan itu sama. Ada sentuhan yang **aman** dan ada yang **tidak aman**.

## Jenis-Jenis Sentuhan 👐

### Sentuhan Aman ✅
Sentuhan yang membuat kita **nyaman** dan **bahagia**:
- Pelukan dari keluarga
- Ciuman sayang di pipi
- Jabat tangan dengan teman
- High-five saat bermain
- Pijatan saat sakit dari Mama/Papa

### Sentuhan Tidak Aman ❌
Sentuhan yang membuat kita **tidak nyaman**:
- Menyentuh area pribadi tanpa alasan medis
- Sentuhan yang menyakitkan
- Sentuhan yang membuat takut
- Sentuhan yang dirahasiakan

## Area Pribadi Tubuh 🔒

### Zona Merah (DILARANG!) 🚫
- Area yang tertutup pakaian dalam
- **Hanya** dokter boleh periksa (dengan Papa/Mama)
- **Tidak boleh** disentuh orang lain

### Zona Kuning (HATI-HATI!) ⚠️
- Dada, paha, punggung
- Boleh disentuh **hanya** oleh keluarga terdekat
- Untuk keperluan merawat (mandi, ganti baju)

### Zona Hijau (AMAN) ✅
- Tangan, bahu, kepala
- Boleh untuk jabat tangan atau pelukan sopan

## Aturan Penting! 📋

### Jika Ada Sentuhan Tidak Nyaman:
1. **Katakan "TIDAK"** dengan keras
2. **Pergi** dari tempat itu
3. **Ceritakan** pada orang dewasa terpercaya
4. **Jangan** menyimpan rahasia buruk

### Kata-Kata Penting:
> **"Tubuhku milikku, aku yang memutuskan!"**

## Latihan Berkata "TIDAK" 💪

Mari berlatih mengucapkan dengan tegas:
- "Tidak, aku tidak mau!"
- "Jangan sentuh aku!"
- "Aku akan melapor!"

## Orang Dewasa Terpercaya 👨‍👩‍👧‍👦

Siapa saja yang bisa kamu percaya:
- **Papa dan Mama**
- **Guru** di sekolah
- **Kakek dan Nenek**
- **Polisi** jika dalam bahaya

## Ingat Selalu! ⭐
Tidak ada yang boleh menyentuh area pribadimu **tanpa alasan penting** dan **tanpa seizinmu**. Kamu berhak merasa **aman** dan **nyaman**!

## Memahami Sentuhan 🤗

Tidak semua sentuhan itu sama. Mari kita pelajari perbedaannya!

## Jenis-Jenis Sentuhan 👋

### Sentuhan AMAN dan BAIK ✅
- **Pelukan hangat** dari keluarga
- **Jabat tangan** saat berkenalan
- **Tepuk pundak** untuk menyemangati
- **Periksa dokter** (dengan izin orangtua)

### Sentuhan TIDAK AMAN ❌
- Menyentuh **area pribadi** tanpa alasan medis
- Sentuhan yang membuat **takut** atau **malu**
- Sentuhan yang **dirahasiakan**
- Sentuhan yang membuat **tidak nyaman**

## Zona Tubuh Kita 🗺️

### Zona HIJAU (Aman) 🟢
- Tangan untuk jabat tangan
- Pundak untuk tepuk semangat
- Kepala untuk usap sayang

### Zona KUNING (Hati-hati) 🟡
- Hanya keluarga terdekat
- Dengan izin dan alasan jelas
- Misalnya: membantu mandi (orangtua)

### Zona MERAH (Bahaya) 🔴
- **Area yang tertutup pakaian dalam**
- **TIDAK BOLEH** disentuh sembarangan
- Hanya dokter dengan orangtua saat sakit

## Cara Merespons Sentuhan 🚨

### Jika Sentuhan TIDAK NYAMAN:
1. **Katakan "STOP!"** dengan keras
2. **Pergi** dari tempat itu segera
3. **Ceritakan** pada orangtua/guru
4. **Jangan menyalahkan** diri sendiri

### Kata-kata Ampuh: 🗣️
- "Jangan sentuh aku!"
- "Aku akan lapor Papa/Mama!"
- "Aku tidak suka!"

## Orang yang Bisa Dipercaya 👨‍👩‍👧‍👦

### Daftar Orang Aman:
- **Papa dan Mama**
- **Kakek dan Nenek**
- **Guru** di sekolah
- **Dokter** (dengan orangtua)

## Rahasia Buruk vs Rahasia Baik 🤫

### Rahasia BAIK:
- Hadiah kejutan untuk Mama
- Rencana ulang tahun teman

### Rahasia BURUK:
- "Jangan bilang Papa/Mama"
- "Ini rahasia kita berdua"
- Sentuhan yang tidak nyaman

## Ingat Selalu! ⭐
> "Tidak ada rahasia tentang tubuhmu yang tidak boleh diceritakan pada Papa/Mama!"

Kamu **PEMBERANI** jika berani berkata "TIDAK" dan melapor!`,
        category: "keselamatan_pribadi"
      },
      {
        id: 5,
        title: "Siapa yang Bisa Dipercaya?",
        description: "Mengajarkan cara memilih orang dewasa yang dipercaya.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: 20,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/siapa-yang-bisa-dipercaya.png",
        content: `# Siapa yang Bisa Dipercaya?

## Mengenal Orang di Sekitar Kita 👥

Dalam hidup, kita bertemu banyak orang. Mari belajar mengenali siapa yang bisa dipercaya!

## Lingkaran Kepercayaan 🔵

### Lingkaran DALAM (Paling Dipercaya) 💙
- **Papa dan Mama**
- **Kakek dan Nenek**
- **Kakak/Adik**
- **Pengasuh tetap** yang sudah lama

### Lingkaran TENGAH (Cukup Dipercaya) 💚
- **Guru** di sekolah
- **Teman dekat** keluarga
- **Tetangga** yang kenal lama
- **Dokter** keluarga

### Lingkaran LUAR (Hati-hati) 💛
- **Orang baru** yang belum kenal
- **Kenalan** Papa/Mama
- **Teman** yang baru bertemu

## Ciri-ciri Orang yang Bisa Dipercaya ✅

### Mereka:
- **Tidak pernah** minta menyimpan rahasia buruk
- **Mendengarkan** saat kamu bicara
- **Melindungi** saat kamu dalam bahaya
- **Tidak marah** saat kamu bertanya
- **Mendukung** kamu berkata jujur

## Tanda Bahaya dari Orang Dewasa ⚠️

### Waspada jika mereka:
- Bilang **"Jangan cerita Papa/Mama"**
- Memberi **hadiah** tanpa alasan
- Minta kamu **menyendiri** bersamanya
- Berbicara tentang **hal-hal aneh**
- Membuat kamu merasa **takut** atau **malu**

## Tes Orang Dipercaya 🧪

### Tanya pada diri sendiri:
1. Apakah Papa/Mama kenal dia?
2. Apakah dia baik pada Papa/Mama?
3. Apakah aku merasa aman bersamanya?
4. Apakah dia tidak pernah minta simpan rahasia?

**Jika jawabnya TIDAK, hati-hati!**

## Cara Meminta Bantuan 🆘

### Langkah-langkah:
1. **Pilih** orang dari lingkaran dalam
2. **Ceritakan** dengan jujur apa yang terjadi
3. **Jangan takut** akan marah
4. **Percaya** mereka akan membantu

### Jika Orang Pertama Tidak Percaya:
- **Coba lagi** dengan orang lain
- **Tetap cerita** sampai ada yang percaya
- **Kamu tidak salah** jika berkata jujur

## Nomor Darurat 📞

Catat dan hafal:
- **Nomor Papa/Mama**
- **Nomor Kakek/Nenek**
- **Nomor darurat: 112**

## Pesan Penting ⭐
> "Orang dewasa yang baik tidak akan pernah marah jika kamu berkata jujur tentang hal yang membuatmu tidak nyaman."

Percayalah pada **instingmu**. Jika merasa tidak aman, **segera pergi** dan **cari bantuan**!`,
        category: "hubungan_sosial"
      },
      {
        id: 6,
        title: "Rahasia Baik vs Rahasia Buruk",
        description: "Bedakan rahasia yang aman & yang berbahaya.",
        recommended_age_range: "6-7",
        estimated_duration_minutes: 18,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/rahasia-baik-vs-rahasia-buruk.png",
        content: `# Rahasia Baik vs Rahasia Buruk

## Dunia Rahasia 🤫

Rahasia itu ada yang baik dan ada yang buruk. Mari belajar membedakannya!

## Rahasia BAIK (Boleh Disimpan) ✅

### Ciri-cirinya:
- **Menyenangkan** dan membuat bahagia
- **Tidak merugikan** siapa pun
- **Sementara** saja (akan diceritakan nanti)
- **Membuat orang senang** saat tahu

### Contoh Rahasia Baik:
- 🎁 **Hadiah kejutan** untuk ulang tahun Mama
- 🎉 **Pesta kejutan** untuk Papa
- 🍰 **Kue** yang sedang dibuat untuk keluarga
- 📝 **Nilai bagus** yang mau dikasih tau nanti

## Rahasia BURUK (TIDAK Boleh Disimpan) ❌

### Ciri-cirinya:
- Membuat **takut** atau **tidak nyaman**
- Ada **ancaman** jika cerita
- Tentang **tubuh** atau sentuhan aneh
- Membuat **malu** atau **bingung**

### Contoh Rahasia Buruk:
- 🚫 "Jangan bilang Papa/Mama kita main ini"
- 🚫 "Ini rahasia kita berdua saja"
- 🚫 Sentuhan yang membuat tidak nyaman
- 🚫 "Kalau cerita, nanti kamu dimarahi"

## Cara Membedakan 🤔

### Tanya pada diri sendiri:
1. **Apakah** rahasia ini membuatku senang?
2. **Apakah** tidak ada yang dirugikan?
3. **Apakah** boleh Papa/Mama tahu suatu saat?
4. **Apakah** tidak ada ancaman?

**Jika ada jawaban TIDAK = Rahasia BURUK!**

## Yang Harus Dilakukan 📝

### Untuk Rahasia BAIK:
- Simpan sampai **waktu yang tepat**
- Tetap **senang** dan tidak stress
- Ceritakan saat **waktunya tiba**

### Untuk Rahasia BURUK:
- **LANGSUNG** ceritakan Papa/Mama
- **Jangan takut** dimarahi
- **Kamu tidak salah** menceritakannya
- **Terus coba** sampai ada yang percaya

## Orang Dewasa yang Baik 👨‍👩‍👧

### Mereka TIDAK AKAN:
- Minta simpan **rahasia tentang tubuh**
- **Mengancam** jika kamu cerita
- Bilang Papa/Mama akan **marah**
- Membuat kamu **takut** atau **malu**

### Mereka AKAN:
- **Mengerti** jika kamu cerita Papa/Mama
- **Mendukung** kejujuranmu
- **Melindungi** kamu dari bahaya

## Latihan Mengatakan "TIDAK" 💪

### Kalimat yang bisa dipakai:
- "Aku akan cerita Papa/Mama"
- "Aku tidak mau simpan rahasia ini"
- "Papa/Mama bilang tidak boleh simpan rahasia"
- "Aku tidak nyaman dengan ini"

## Ingat Selalu! ⭐
> "Tidak ada rahasia tentang tubuhmu yang harus disimpan dari Papa/Mama. Mereka adalah pelindungmu!"

## Zona Aman untuk Bercerita 🏠

Tempat aman untuk cerita:
- **Rumah** saat tenang
- **Kamar** Papa/Mama
- **Mobil** saat perjalanan
- **Waktu tidur** saat dipeluk

**Kamu PEMBERANI** jika berani menceritakan rahasia buruk! Papa/Mama akan **bangga** padamu!`,
        category: "keselamatan_pribadi"
      },
      {
        id: 7,
        title: "Tubuhku Mulai Berubah",
        description: "Pengantar tentang masa pubertas.",
        recommended_age_range: "8+",
        estimated_duration_minutes: 30,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/tubuhku-mulai-berubah.png",
        content: `# Tubuhku Mulai Berubah

## Selamat Datang di Masa Pertumbuhan! 🌱

Saat kamu bertambah besar, tubuhmu akan mengalami perubahan yang **alami** dan **normal**. Ini namanya **pubertas**!

## Apa itu Pubertas? 🤔

### Pengertian:
- **Masa peralihan** dari anak-anak ke remaja
- **Proses alami** yang dialami semua orang
- **Waktu tubuh** bersiap menjadi dewasa
- **Berbeda timing** untuk setiap orang

### Kapan Terjadi?
- **Perempuan**: Biasanya 8-13 tahun
- **Laki-laki**: Biasanya 9-14 tahun
- **Setiap orang berbeda** - itu normal!

## Perubahan pada Anak Perempuan 👧➡️👩

### Perubahan Fisik:
- **Tinggi badan** bertambah cepat
- **Payudara** mulai tumbuh
- **Pinggul** melebar
- **Rambut** tumbuh di area pribadi
- **Suara** sedikit berubah
- **Menstruasi** dimulai

### Perubahan Emosi:
- **Mood** naik turun
- **Lebih sensitif** terhadap perasaan
- **Mulai tertarik** pada penampilan
- **Ingin lebih mandiri**

## Perubahan pada Anak Laki-laki 👦➡️👨

### Perubahan Fisik:
- **Tinggi badan** bertambah drastis
- **Suara** menjadi berat (kadang pecah)
- **Otot** mulai terbentuk
- **Rambut** tumbuh di wajah dan tubuh
- **Bahu** melebar
- **Mimpi basah** bisa terjadi

### Perubahan Emosi:
- **Mood** berubah-ubah
- **Lebih mudah marah**
- **Ingin dihormati** seperti dewasa
- **Mulai tertarik** pada lawan jenis

## Hal Normal yang Terjadi ✅

### Jangan Khawatir Jika:
- Pertumbuhan **tidak sama** dengan teman
- **Jerawat** mulai muncul
- **Bau badan** lebih kuat
- **Perasaan campur aduk**
- **Ingin sendiri** kadang-kadang

## Cara Merawat Tubuh 🧼

### Kebersihan Harian:
- **Mandi** setiap hari
- **Sikat gigi** 2x sehari
- **Cuci rambut** teratur
- **Ganti pakaian dalam** setiap hari
- **Gunakan deodoran** jika perlu

### Nutrisi Penting:
- **Makan teratur** 3x sehari
- **Banyak sayur** dan buah
- **Minum air** yang cukup
- **Kurangi junk food**
- **Cukup istirahat**

## Mengatasi Perubahan Emosi 💭

### Tips Sehat:
- **Bicara** dengan orangtua tentang perasaan
- **Olahraga** untuk melepas stress
- **Tulis diary** untuk mengekspresikan diri
- **Hobi positif** untuk mengalihkan pikiran
- **Tidur cukup** 8-9 jam

## Pentingnya Komunikasi 💬

### Dengan Siapa Bicara:
- **Papa dan Mama** - mereka mengerti
- **Kakak** yang sudah pernah mengalami
- **Dokter** jika ada kekhawatiran
- **Guru** yang dipercaya

### Topik yang Boleh Dibahas:
- Perubahan yang kamu rasakan
- Kekhawatiran tentang tubuh
- Perasaan yang membingungkan
- Pertanyaan tentang masa depan

## Mitos vs Fakta 🔍

### ❌ MITOS:
- "Pubertas dini itu berbahaya"
- "Harus sama dengan teman"
- "Tidak boleh cerita siapa-siapa"

### ✅ FAKTA:
- Pubertas timing berbeda-beda normal
- Setiap orang unik
- Komunikasi terbuka itu sehat

## Pesan Penting ⭐
> "Pubertas adalah **hadiah** dari Tuhan yang menandakan kamu sedang tumbuh menjadi dewasa. Nikmati prosesnya dan jangan takut bertanya!"

## Ingat Selalu! 🌟
- **Perubahan itu NORMAL**
- **Kamu tetap berharga** seperti dulu
- **Papa/Mama siap** membantu
- **Masa depan** penuh dengan hal baik!

Selamat menyambut **diri baru** yang lebih dewasa! 🎉`,
        category: "pubertas"
      },
      {
        id: 8,
        title: "Perasaan yang Berbeda",
        description: "Mengenalkan emosi baru saat bertumbuh.",
        recommended_age_range: "8+",
        estimated_duration_minutes: 25,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/perasaan-yang-berbeda.png",
        content: `# Perasaan yang Berbeda

## Dunia Emosi yang Berubah 🎭

Saat bertumbuh besar, kamu akan merasakan **emosi baru** yang mungkin membingungkan. Itu normal dan wajar!

## Jenis-Jenis Perasaan Baru 🌈

### Perasaan tentang Diri Sendiri 🪞
- **Malu** dengan perubahan tubuh
- **Bangga** dengan pencapaian
- **Bingung** dengan identitas
- **Percaya diri** atau sebaliknya
- **Ingin dihargai** sebagai dewasa

### Perasaan terhadap Orang Lain 👥
- **Tertarik** pada teman tertentu
- **Iri** dengan pencapaian teman
- **Empati** yang lebih dalam
- **Ingin diterima** kelompok
- **Butuh ruang pribadi**

### Perasaan tentang Masa Depan 🔮
- **Excited** tentang tumbuh dewasa
- **Takut** akan tanggung jawab
- **Penasaran** tentang cinta
- **Khawatir** tentang perubahan

## Mengapa Perasaan Berubah? 🧠

### Perubahan Hormon:
- **Hormon** mempengaruhi mood
- **Naik turun** emosi itu normal
- **Otak** sedang berkembang
- **Kimia tubuh** berubah

### Perubahan Sosial:
- **Teman** mulai penting
- **Keluarga** terasa berbeda
- **Sekolah** jadi lebih serius
- **Tanggung jawab** bertambah

## Emosi yang Sering Muncul 😊😢😡

### Kebahagiaan Intens 😄
- **Senang berlebihan** saat dapat sesuatu
- **Excited** dengan hal kecil
- **Euforia** saat bersama teman

### Kesedihan Mendalam 😢
- **Sedih** tanpa alasan jelas
- **Merasa sendiri** meski dikelilingi orang
- **Kecewa** berlebihan

### Kemarahan Tiba-tiba 😡
- **Marah** pada hal sepele
- **Frustrasi** dengan orangtua
- **Kesal** dengan diri sendiri

### Kebingungan 😵‍💫
- **Tidak tahu** apa yang diinginkan
- **Bingung** dengan perasaan
- **Ragu** dengan keputusan

## Cara Mengelola Emosi 🛠️

### Teknik Dasar:
1. **Napas dalam** 5 detik, tahan, buang 5 detik
2. **Hitung sampai 10** sebelum bereaksi
3. **Pergi sejenak** dari situasi
4. **Minum air** untuk menenangkan diri

### Aktivitas Penyalur:
- **Olahraga** untuk melepas stress
- **Musik** untuk menenangkan
- **Menggambar** untuk ekspresikan perasaan
- **Menulis** di diary
- **Bicara** dengan orang terpercaya

## Kapan Harus Minta Bantuan? 🆘

### Tanda-tanda Perlu Bantuan:
- **Sedih terus-menerus** lebih dari 2 minggu
- **Tidak mau** bertemu teman/keluarga
- **Nilai** turun drastis
- **Tidak bisa tidur** atau tidur terus
- **Menyakiti diri** sendiri

### Kepada Siapa?
- **Papa/Mama** sebagai prioritas
- **Guru** yang dipercaya
- **Psikolog** jika diperlukan
- **Teman dekat** untuk support

## Tips Menghadapi Hari Buruk 🌧️➡️🌤️

### Yang Bisa Dilakukan:
1. **Akui** perasaanmu valid
2. **Jangan menyalahkan** diri sendiri
3. **Lakukan hal kecil** yang menyenangkan
4. **Ingat** bahwa perasaan akan berlalu
5. **Cerita** pada orang yang peduli

### Yang Tidak Boleh:
- **Menyakiti** diri sendiri atau orang lain
- **Menyimpan** emosi sendirian terus
- **Membandingkan** dengan orang lain
- **Putus asa** dan menyerah

## Membangun Emotional Intelligence 🧠💝

### Langkah-langkah:
1. **Kenali** emosi yang sedang dirasakan
2. **Pahami** mengapa emosi itu muncul
3. **Terima** bahwa semua emosi valid
4. **Pilih** respons yang tepat
5. **Belajar** dari setiap pengalaman

## Perasaan dalam Persahabatan 👫

### Yang Normal:
- **Jealous** saat teman dekat dengan orang lain
- **Senang berlebihan** saat diterima kelompok
- **Sedih** saat bertengkar
- **Bangga** dengan pencapaian teman

### Cara Sehat:
- **Komunikasi** terbuka dan jujur
- **Respect** boundaries teman
- **Support** satu sama lain
- **Maaf** jika salah

## Pesan untuk Orangtua 👨‍👩‍👧‍👦

### Yang Anak Butuhkan:
- **Pengertian** saat mood swing
- **Ruang** untuk mengekspresikan perasaan
- **Support** tanpa judgment
- **Konsistensi** dalam aturan dan kasih sayang

## Ingat Selalu! ⭐
> "Perasaanmu **VALID** dan **NORMAL**. Kamu tidak sendirian dalam menghadapi perubahan ini. Setiap emosi adalah bagian dari proses tumbuh dewasa yang indah."

## Afirmasi Positif 🌟
- "Aku **belajar** memahami diriku"
- "Setiap hari aku **tumbuh** jadi lebih bijak"
- "Perasaanku **penting** dan **berharga**"
- "Aku **tidak sendirian** dalam perjalanan ini"

Ingat, **tumbuh dewasa** adalah petualangan yang penuh warna! 🌈`,
        category: "emosi"
      },
      {
        id: 9,
        title: "Teman yang baik dan aman di internet",
        description: "Edukasi berteman aman secara online.",
        recommended_age_range: "8+",
        estimated_duration_minutes: 35,
        created_at: new Date("2025-06-27T20:13:51.823Z"),
        image_url: "/image/materi/teman-yang-baik-dan-aman-di-internet.png",
        content: `# Teman yang Baik dan Aman di Internet

## Dunia Digital yang Luas 🌐

Internet membuka dunia baru untuk berteman, tapi kita harus **pintar** dan **hati-hati**!

## Jenis Teman Online 👥

### Teman NYATA di Internet 👫
- **Teman sekolah** yang chatting
- **Keluarga** yang jauh
- **Teman lama** yang pindah
- Orang yang **sudah pernah** bertemu langsung

### Teman BARU di Internet 🆕
- Orang yang **belum pernah** ketemu
- **Gamer** yang main bareng
- Teman dari **media sosial**
- Member **komunitas online**

## Ciri Teman Online yang AMAN ✅

### Mereka:
- **Tidak pernah** minta foto pribadi
- **Tidak bertanya** alamat rumah/sekolah
- **Tidak minta** nomor telepon
- **Tidak ajak** ketemu sendirian
- **Sopan** dalam berbicara
- **Respek** saat kamu bilang "tidak"

## Tanda BAHAYA Teman Online ⚠️

### Waspada jika mereka:
- **Terlalu cepat** bilang sayang/cinta
- **Minta foto** tanpa baju
- **Bertanya detail** tentang keluarga
- **Ajak ketemu** di tempat sepi
- **Minta simpan** rahasia dari orangtua
- **Kirim gambar** tidak pantas
- **Marah** jika kamu tidak mau sesuatu

## Aturan Emas Berteman Online 🏆

### DO (BOLEH):
1. **Ceritakan** Papa/Mama tentang teman online
2. **Block** jika ada yang aneh
3. **Screenshot** percakapan penting
4. **Berteman** dalam grup, bukan personal
5. **Jaga privasi** informasi pribadi

### DON'T (JANGAN):
1. **Kasih** foto, alamat, atau nomor HP
2. **Ketemu sendirian** tanpa orangtua
3. **Kirim** foto pribadi atau tidak pantas
4. **Simpan rahasia** dari Papa/Mama
5. **Percaya** semua yang mereka bilang

## Platform yang Umum Digunakan 📱

### Media Sosial:
- **Instagram**: Hati-hati DM dari stranger
- **TikTok**: Jangan follow back sembarangan
- **WhatsApp**: Cek nomor yang tidak dikenal
- **Discord**: Awas chat pribadi dari unknown

### Gaming:
- **Roblox**: Jangan kasih info pribadi di chat
- **Mobile Legends**: Waspada invite voice call
- **Among Us**: Main bareng teman yang dikenal

## Cara Mengenali Predator Online 🕵️

### Mereka Biasanya:
- **Pura-pura** jadi anak muda
- **Sangat perhatian** dan pengertian
- **Cepat** bilang "spesial" atau "istimewa"
- **Isolasi** dari keluarga/teman lain
- **Grooming** dengan hadiah virtual

### Teknik yang Dipakai:
1. **Love bombing** - kasih sayang berlebihan
2. **Guilt tripping** - buat kamu merasa bersalah
3. **Secret keeping** - minta simpan rahasia
4. **Normalization** - buat hal aneh jadi normal

## Tips Keamanan Cyber 🔒

### Password & Privacy:
- **Password** kuat dan unik
- **Akun private** untuk sosmed
- **Two-factor** authentication
- **Logout** setelah pakai device umum

### Sharing Content:
- **Pikir 2x** sebelum posting
- **Jangan tag** lokasi real-time
- **Setting** siapa yang bisa lihat post
- **Delete** konten yang tidak pantas

## Cyberbullying dan Cara Menghadapinya 😤

### Bentuk Cyberbullying:
- **Trolling** dan komentar jahat
- **Sharing** foto/video tanpa izin
- **Spreading** rumor online
- **Excluding** dari grup

### Langkah Menghadapi:
1. **Jangan balas** dengan emosi
2. **Screenshot** sebagai bukti
3. **Block** dan report
4. **Cerita** Papa/Mama atau guru
5. **Ingat** ini bukan salahmu

## Etika Berteman Online 🤝

### Be a Good Digital Citizen:
- **Treat others** seperti mau diperlakukan
- **Think before you type**
- **Respect** perbedaan pendapat
- **Help** teman yang di-bully
- **Don't** spread hoax atau gosip

## Red Flags dalam Conversation 🚩

### Hati-hati jika ada yang bilang:
- "Kamu lebih dewasa dari usiamu"
- "Jangan bilang orangtua dulu"
- "Aku mengerti kamu lebih dari mereka"
- "Kita punya hubungan spesial"
- "Ini normal untuk anak seusiamu"

## Cara Lapor Konten Tidak Pantas 📢

### Di Platform:
- **Report button** di setiap platform
- **Block user** yang bermasalah
- **Screenshot** evidence

### Ke Orangtua/Otoritas:
- **Tunjukkan** chat/konten bermasalah
- **Jelaskan** kenapa kamu tidak nyaman
- **Minta bantuan** untuk langkah selanjutnya

## Membangun Friendship Sehat Online 💝

### Karakteristik:
- **Mutual respect** dan pengertian
- **Boundaries** yang jelas
- **Support** satu sama lain
- **Fun** tanpa drama
- **Growth** bersama-sama

## Digital Detox 📵

### Kapan Perlu Break:
- **Terlalu stres** dengan drama online
- **Nilai** turun karena kebanyakan online
- **Susah tidur** karena mikirin sosmed
- **Mood** tergantung likes/comments

### Cara Detox:
- **Set timer** untuk screen time
- **No gadget** 1 jam sebelum tidur
- **Aktivitas offline** yang menyenangkan
- **Quality time** dengan keluarga

## Pesan untuk Orangtua 👨‍👩‍👧‍👦

### Yang Perlu Dilakukan:
- **Open communication** tentang aktivitas online
- **Edukasi** tentang cyber safety
- **Monitor** tanpa invasi privacy
- **Trust but verify** aktivitas anak

## Emergency Contacts 🆘

### Jika Terjadi Sesuatu:
- **Papa/Mama** - prioritas utama
- **Guru** yang dipercaya
- **Polisi Cyber**: 112
- **Hotline anak**: 129

## Ingat Selalu! ⭐
> "Internet adalah **alat yang hebat** untuk belajar dan berteman, tapi **keamananmu** lebih penting dari segalanya. Selalu **cerita** Papa/Mama tentang pengalaman onlinemu!"

## Digital Golden Rules 🌟
1. **Real friends** tidak minta yang aneh-aneh
2. **Your safety** > someone's feelings
3. **When in doubt**, ask trusted adults
4. **Privacy** adalah hakmu
5. **Block & report** lebih baik daripada menyesal

Jadilah **digital native** yang **smart** dan **safe**! 🚀`,
        category: "digital"
      }
    ]
  });

  // Seed Tips
  await prisma.tip.createMany({
    data: [
      {
        id: 5,
        title: "Ketika Anak Bertanya \"Mengapa Perempuan Bisa Hamil?\"",
        content: "Sangat alami anak-anak ingin tahu tentang \"mengapa laki-laki berbeda dengan perempuan?\" atau \"mengapa perempuan bisa hamil?\" Ketika anak mulai bertanya tentang hal tersebut, Anda sebagai orangtua harus siap menjawabnya sebagai bagian dari pendidikan seks untuk anak.\n\nTerkadang, anak dan temannya juga suka tertawa geli saat melihat \"area privat\" satu sama lain atau berbagi candaan \"jorok\". Mengutip Healthy Children, itu juga bagian dari rasa penasaran alamiah dari anak tentang seksualitas.",
        category: "Komunikasi Lanjutan",
        image_url: "/image/tips/when-child-asks-about-pregnancy.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 6,
        title: "Mengenalkan Istilah-Istilah pada Alat Kelamin",
        content: "Gunakan nama-nama yang benar untuk organ seksual (penis, vagina) sejak dini. Ini membantu menghilangkan tabu dan memudahkan anak untuk berbicara secara terbuka jika mereka mengalami sesuatu yang tidak nyaman. Hindari menggunakan nama samaran yang dapat membingungkan.",
        category: "Perkenalan",
        image_url: "/image/tips/introducing-terms-for-genitals.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 7,
        title: "Cerita Tentang Sentuhan Aman dan Tidak Aman",
        content: "Gunakan cerita atau boneka untuk menjelaskan konsep sentuhan yang baik (pelukan dari orang tua) dan sentuhan yang buruk (sentuhan di area pribadi oleh orang lain). Ini membantu anak memahami batasan tanpa merasa takut.",
        category: "Cerita",
        image_url: "/image/tips/safe-and-unsafe-touch.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      },
      {
        id: 8,
        title: "Cara Menjelaskan Perbedaan Tubuh Laki-laki dan Perempuan",
        content: "Jelaskan dengan sederhana dan faktual. Anda bisa mengatakan, \"Tubuh laki-laki dan perempuan berbeda agar nanti saat dewasa bisa menjadi ayah dan ibu.\" Fokus pada fungsi biologis secara umum tanpa detail yang rumit untuk anak usia dini.",
        category: "Perkenalan",
        image_url: "/image/tips/explaining-body-differences.png",
        created_at: new Date("2025-06-29T16:59:31.186Z")
      }
    ]
  });

  // Seed Webinars
  await prisma.webinar.createMany({
    data: [
      {
        id: 1,
        title: "Webinar Pentingnya Edukasi Seksual",
        speaker: "Prilly Latuconsina, S. Psi.",
        date: new Date("2025-08-01T09:00:00.000Z"),
        description: "Banyaknya kasus kekerasan seksual pada anak...",
        created_at: new Date("2025-06-27T20:13:52.077Z"),
        lokasi: "Online via Zoom",
        job_speaker: "Psikolog Anak"
      }
    ]
  });

  // Seed FAQs
  await prisma.faq.createMany({
    data: [
      {
        id: 9,
        question: "Hal apa saja yang perlu disampaikan saat memberikan pendidikan seksual pada anak?",
        answer: "Poin-poin penting yang perlu disampaikan adalah:\n1. Pengenalan nama-nama bagian tubuh dengan benar.\n2. Konsep \"sentuhan baik\" dan \"sentuhan buruk\".\n3. Batasan tubuh pribadi (area yang tidak boleh disentuh orang lain).\n4. Siapa saja orang dewasa yang bisa dipercaya untuk melapor jika ada sentuhan tidak nyaman.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 10,
        question: "Di umur keberapa anak harus diajarkan pendidikan seks?",
        answer: "Pendidikan ini bisa dimulai sedini mungkin, bahkan sejak usia 2-3 tahun, dengan bahasa yang disesuaikan tingkat pemahaman anak. Semakin dini, semakin baik untuk membangun fondasi kesadaran tubuh.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 11,
        question: "Apakah normal jika anak kecil menyentuh area pribadinya?",
        answer: "Ya, ini adalah bagian normal dari eksplorasi tubuh anak. Selama dilakukan di tempat pribadi dan tidak berlebihan, ini adalah perilaku wajar. Orang tua bisa mengajarkan tentang batasan dan privasi dengan cara yang positif.",
        category: "Informasi umum",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 12,
        question: "Bagaimana cara memulai percakapan tentang pubertas dengan anak?",
        answer: "Mulailah secara santai dan bertahap. Gunakan buku atau video sebagai pemicu percakapan. Normalisasikan perubahan yang akan terjadi dan pastikan anak tahu bahwa mereka bisa bertanya apa saja kepada Anda.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 13,
        question: "Bagaimana cara mengajarkan pendidikan seks sejak dini kepada anak? Supaya tidak terjadi kekerasan seksual pada anak?",
        answer: "Gunakan buku cerita bergambar, lagu, atau permainan peran. Hindari menakut-nakuti. Fokus pada pemberdayaan anak untuk berani berkata \"tidak\" pada sentuhan yang membuat mereka tidak nyaman dan segera memberitahu orang tua.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 14,
        question: "Pendidikan seks kepada anak itu penting, tapi orangtua sering kesulitan. Bagaimana mengajarakan pendidikan seksual kepada anak dengan cara yang kreatif?",
        answer: "Anda bisa menggunakan media seperti video animasi edukatif yang ramah anak, membuat poster bersama tentang bagian tubuh, atau menggunakan boneka untuk mensimulasikan situasi sosial yang aman dan tidak aman.",
        category: "Komunikasi",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 15,
        question: "Bagaimana cara melindungi anak dari konten negatif di internet?",
        answer: "Gunakan fitur \"safe search\" pada browser, aktifkan mode terbatas di YouTube, dan gunakan aplikasi kontrol orang tua. Yang terpenting adalah membangun komunikasi terbuka agar anak berani melapor jika menemukan sesuatu yang tidak nyaman.",
        category: "Keamanan Digital",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      },
      {
        id: 16,
        question: "Apa itu \"grooming\" online dan bagaimana cara mencegahnya?",
        answer: "Grooming adalah ketika orang dewasa membangun hubungan emosional dengan anak secara online untuk tujuan eksploitasi. Ajarkan anak untuk tidak pernah membagikan informasi pribadi, tidak menerima permintaan pertemanan dari orang asing, dan tidak pernah setuju untuk bertemu dengan orang yang hanya dikenal secara online.",
        category: "Keamanan Digital",
        createdAt: new Date("2025-06-28T13:22:23.344Z")
      }
    ]
  });

  // Seed Users dengan personalization_result yang sesuai
  const users = [
    {
      id: 1,
      full_name: "bunda1",
      email: "bunda1@gmail.com",
      phone: "081234567890",
      password: await bcrypt.hash("password123", 10),
      profession: "pns",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-28T12:20:52.785Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "20-26",
      learning_preferences: ["digital", "hubungan_sosial", "emosi"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Teman yang baik dan aman di internet" // Sesuai kategori digital
    },
    {
      id: 2,
      full_name: "Darrell Valentino Developer",
      email: "5026nihbos@gmail.com",
      phone: "082121012323",
      password: await bcrypt.hash("password123", 10),
      profession: "Profesor Luar Angkasa",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-27T20:13:51.562Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      personalization_completed: false
    },
    {
      id: 3,
      full_name: "Super Admin",
      email: "admin@kindercare.com",
      phone: "081234567890",
      password: await bcrypt.hash("admin123", 10),
      profession: "Admin Nih B055",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-27T20:13:51.562Z"),
      role: "admin" as const,
      daily_target_minutes: 60,
      personalization_completed: true
    },
    {
      id: 6,
      full_name: "salwa",
      email: "salwa@gmail.com", 
      phone: "082326130006",
      password: await bcrypt.hash("password123", 10),
      profession: "Pegawai Swasta",
      created_at: new Date("2025-06-27T20:13:51.562Z"),
      updated_at: new Date("2025-06-28T10:59:42.276Z"),
      role: "user" as const,
      daily_target_minutes: 30,
      age_range: "20-26",
      learning_preferences: ["keselamatan_pribadi", "pubertas", "hubungan_sosial"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 11,
      full_name: "Vaskya Nabiladasdas",
      email: "pillnb1@gmail.com",
      phone: "97312837198371",
      password: await bcrypt.hash("password123", 10),
      profession: "anosdjasd",
      created_at: new Date("2025-06-27T20:43:58.933Z"),
      updated_at: new Date("2025-06-27T20:44:16.070Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      age_range: "20-26",
      learning_preferences: ["keselamatan_pribadi", "pubertas"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 12,
      full_name: "darrell",
      email: "darrell@gmail.com",
      phone: "0231231723612",
      password: await bcrypt.hash("password123", 10),
      profession: "dasdada",
      created_at: new Date("2025-06-27T20:48:26.036Z"),
      updated_at: new Date("2025-06-27T20:48:52.058Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      age_range: "20-26",
      learning_preferences: ["pubertas", "keselamatan_pribadi"],
      family_value_orientation: "konservatif" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Perbedaan Anak Laki-laki dan Perempuan" // Sesuai kategori pubertas
    },
    {
      id: 16,
      full_name: "bibi",
      email: "bibi@gmail.com",
      phone: "081234567891",
      password: await bcrypt.hash("password123", 10),
      profession: "guru",
      created_at: new Date("2025-06-28T12:03:34.032Z"),
      updated_at: new Date("2025-06-28T12:18:41.588Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "27-32",
      learning_preferences: ["keselamatan_pribadi", "pubertas", "hubungan_sosial"],
      family_value_orientation: "terbuka" as const,
      wants_religious_content: true,
      personalization_completed: true,
      personalization_result: "Kenali Bagian Tubuhmu" // Sesuai kategori keselamatan_pribadi
    },
    {
      id: 19,
      full_name: "kola",
      email: "kola@gmail.com",
      phone: "1234567890",
      password: await bcrypt.hash("password123", 10),
      profession: "dokter",
      created_at: new Date("2025-06-28T12:23:49.772Z"),
      updated_at: new Date("2025-06-28T12:33:03.441Z"),
      role: "user" as const,
      daily_target_minutes: 15,
      age_range: "20-26",
      learning_preferences: ["emosi", "hubungan_sosial", "keselamatan_pribadi"],
      family_value_orientation: "moderat" as const,
      wants_religious_content: false,
      personalization_completed: true,
      personalization_result: "Perasaan yang Berbeda" // Sesuai kategori emosi
    },
    {
      id: 21,
      full_name: "mommy",
      email: "mommy@gmail.com",
      phone: "000000000000000",
      password: await bcrypt.hash("password123", 10),
      profession: "mommy",
      created_at: new Date("2025-06-30T06:36:06.768Z"),
      updated_at: new Date("2025-06-30T06:36:06.768Z"),
      role: "user" as const,
      daily_target_minutes: 60,
      personalization_completed: false
    }
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // Seed Children
  const children = [
    {
      id: 1,
      user_id: 1,
      full_name: "Ani",
      gender: "male" as const,
      birth_date: new Date("2018-05-01T00:00:00.000Z"),
      age: 8,
      education_level: "TK B",
      has_special_needs: false
    },
    {
      id: 11,
      user_id: 6,
      full_name: "Anak Pengguna",
      gender: "male" as const,
      birth_date: new Date("2025-06-28T10:32:15.792Z"),
      age: 4,
      has_special_needs: false
    },
    {
      id: 7,
      user_id: 11,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-27T20:44:16.026Z"),
      age: 6,
      has_special_needs: false
    },
    {
      id: 8,
      user_id: 12,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-27T20:48:51.985Z"),
      age: 8,
      has_special_needs: false
    },
    {
      id: 14,
      user_id: 16,
      full_name: "A",
      gender: "female" as const,
      birth_date: new Date("2020-06-27T00:00:00.000Z"),
      age: 4,
      education_level: "TK B",
      has_special_needs: false
    },
    {
      id: 16,
      user_id: 19,
      full_name: "Anak Pengguna",
      gender: "female" as const,
      birth_date: new Date("2025-06-28T12:24:17.162Z"),
      age: 6,
      has_special_needs: true
    },
    {
      id: 18,
      user_id: 21,
      full_name: "austin",
      gender: "male" as const,
      birth_date: new Date("2020-12-31T17:00:00.000Z"),
      age: 4,
      has_special_needs: false
    }
  ];

  for (const child of children) {
    await prisma.child.create({ data: child });
  }

  // Seed Material Progress
  const materialProgress = [
    {
      id: 6,
      user_id: 6,
      child_id: 11,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T11:28:33.172Z"),
      last_accessed: new Date("2025-06-29T14:19:53.013Z")
    },
    {
      id: 10,
      user_id: 6,
      child_id: 11,
      material_id: 2,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-28T11:28:54.765Z")
    },
    {
      id: 12,
      user_id: 6,
      child_id: 11,
      material_id: 3,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-28T11:29:17.311Z")
    },
    {
      id: 18,
      user_id: 16,
      child_id: 14,
      material_id: 2,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:16:49.418Z"),
      last_accessed: new Date("2025-06-29T09:30:12.474Z")
    },
    {
      id: 20,
      user_id: 1,
      child_id: 1,
      material_id: 9,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:21:37.078Z"),
      last_accessed: new Date("2025-06-28T12:21:36.277Z")
    },
    {
      id: 22,
      user_id: 19,
      child_id: 16,
      material_id: 4,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:24:51.170Z"),
      last_accessed: new Date("2025-06-28T15:15:36.219Z")
    },
    {
      id: 24,
      user_id: 19,
      child_id: 16,
      material_id: 5,
      status: "completed" as const,
      completed_at: new Date("2025-06-28T12:31:24.025Z"),
      last_accessed: new Date("2025-06-28T12:31:23.105Z")
    },
    {
      id: 30,
      user_id: 1,
      child_id: 1,
      material_id: 8,
      status: "completed" as const,
      completed_at: new Date("2025-06-29T14:14:56.971Z"),
      last_accessed: new Date("2025-06-30T13:56:29.890Z")
    },
    {
      id: 34,
      user_id: 21,
      child_id: 18,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T03:20:43.779Z"),
      last_accessed: new Date("2025-06-30T03:20:42.532Z")
    },
    {
      id: 36,
      user_id: 21,
      child_id: 18,
      material_id: 2,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T03:21:05.680Z"),
      last_accessed: new Date("2025-06-30T03:21:05.653Z")
    },
    {
      id: 40,
      user_id: 21,
      child_id: 18,
      material_id: 3,
      status: "in_progress" as const,
      last_accessed: new Date("2025-06-30T03:21:30.089Z")
    },
    {
      id: 44,
      user_id: 16,
      child_id: 14,
      material_id: 1,
      status: "completed" as const,
      completed_at: new Date("2025-06-30T13:53:19.511Z"),
      last_accessed: new Date("2025-06-30T13:53:14.790Z")
    }
  ];

  for (const progress of materialProgress) {
    await prisma.materialProgress.create({ data: progress });
  }

  // Seed Webinar Registrations
  await prisma.webinarRegistration.createMany({
    data: [
      {
        id: 1,
        user_id: 6,
        webinar_id: 1,
        registered_at: new Date("2025-06-28T11:32:30.497Z")
      },
      {
        id: 3,
        user_id: 19,
        webinar_id: 1,
        registered_at: new Date("2025-06-28T12:32:37.871Z")
      }
    ]
  });

  // Seed Daily Progress
  await prisma.dailyProgress.createMany({
    data: [
      {
        id: 1,
        user_id: 6,
        date: new Date("2025-06-27"),
        learning_minutes: 6
      },
      {
        id: 7,
        user_id: 16,
        date: new Date("2025-06-27"),
        learning_minutes: 3
      },
      {
        id: 9,
        user_id: 1,
        date: new Date("2025-06-27"),
        learning_minutes: 1
      },
      {
        id: 10,
        user_id: 19,
        date: new Date("2025-06-27"),
        learning_minutes: 4
      },
      {
        id: 13,
        user_id: 16,
        date: new Date("2025-06-28"),
        learning_minutes: 3
      },
      {
        id: 14,
        user_id: 1,
        date: new Date("2025-06-28"),
        learning_minutes: 1
      },
      {
        id: 15,
        user_id: 6,
        date: new Date("2025-06-28"),
        learning_minutes: 3
      },
      {
        id: 16,
        user_id: 21,
        date: new Date("2025-06-29"),
        learning_minutes: 6
      },
      {
        id: 22,
        user_id: 16,
        date: new Date("2025-06-29"),
        learning_minutes: 2
      },
      {
        id: 23,
        user_id: 1,
        date: new Date("2025-06-29"),
        learning_minutes: 3
      }
    ]
  });

  // Reset all sequences to prevent ID conflicts
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Child"', 'id'), (SELECT MAX(id) FROM "Child"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Material"', 'id'), (SELECT MAX(id) FROM "Material"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"MaterialProgress"', 'id'), (SELECT MAX(id) FROM "MaterialProgress"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Tip"', 'id'), (SELECT MAX(id) FROM "Tip"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Webinar"', 'id'), (SELECT MAX(id) FROM "Webinar"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"WebinarRegistration"', 'id'), (SELECT MAX(id) FROM "WebinarRegistration"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Doctor"', 'id'), (SELECT MAX(id) FROM "Doctor"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"dailyprogress"', 'id'), (SELECT MAX(id) FROM "dailyprogress"));`;
  await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"faqs"', 'id'), (SELECT MAX(id) FROM "faqs"));`;

  console.log('✅ Database seeded successfully!');
  console.log('✅ All sequences have been reset!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
