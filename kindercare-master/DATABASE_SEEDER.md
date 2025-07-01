# Database Seeder Documentation

## Seeder yang Telah Dibuat

File seeder telah dibuat di `prisma/seed.ts` dan berhasil mengembalikan data dari CSV yang Anda berikan.

## Data yang Di-restore:

### 1. **Users** (9 users)
- ID 1: bunda1 - dengan personalization_result: "Teman yang baik dan aman di internet"
- ID 3: Super Admin (role: admin)
- ID 6: salwa - dengan personalization_result: "Kenali Bagian Tubuhmu"  
- ID 11: Vaskya Nabiladasdas - dengan personalization_result: "Kenali Bagian Tubuhmu"
- ID 12: darrell - dengan personalization_result: "Perbedaan Anak Laki-laki dan Perempuan"
- ID 16: bibi - dengan personalization_result: "Kenali Bagian Tubuhmu"
- ID 19: kola - dengan personalization_result: "Perasaan yang Berbeda"
- ID 21: mommy - belum ada personalization_result
- Dan lainnya...

### 2. **Materials** (9 materi pembelajaran)
- Kenali Bagian Tubuhmu (keselamatan_pribadi, usia 4-5)
- Tubuhku adalah Milikku (keselamatan_pribadi, usia 4-5)
- Perbedaan Anak Laki-laki dan Perempuan (pubertas, usia 4-5)
- Aturan Sentuhan Aman (keselamatan_pribadi, usia 6-7)
- Dan lainnya...

### 3. **Children** (7 anak)
- Data anak yang terhubung dengan user mereka

### 4. **Material Progress** (12 progress records)
- Status pembelajaran anak-anak dengan berbagai materi

### 5. **Tips** (4 tips)
- Tips komunikasi dan edukasi untuk orang tua

### 6. **Webinars** (1 webinar)
- Webinar tentang pentingnya edukasi seksual

### 7. **FAQs** (8 FAQ)
- Pertanyaan umum seputar pendidikan seksual anak

### 8. **Webinar Registrations** (2 registrations)
- Pendaftaran webinar oleh user

### 9. **Daily Progress** (10 records)
- Progres harian pembelajaran user

### 10. **Doctors** (1 doctor)
- Data psikolog untuk konsultasi

## Fitur Personalization Result

**Penting:** Seeder telah disesuaikan dengan implementasi terbaru yang menyimpan `personalization_result` (judul materi) di database:

- Users yang sudah menyelesaikan personalization memiliki `personalization_result` berupa judul materi yang sesuai dengan kategori `learning_preferences` mereka
- Contoh: User dengan preference "keselamatan_pribadi" mendapat result "Kenali Bagian Tubuhmu"

## Cara Menjalankan Seeder

```bash
# Install dependencies jika belum
npm install bcrypt @types/bcrypt tsx

# Jalankan seeder
npm run db:seed
```

## Password Default

Semua user memiliki password default:
- User biasa: `password123`
- Admin: `admin123`

## Status Seeder

✅ **Berhasil dijalankan** - Semua data telah berhasil di-restore ke database dengan schema terbaru yang mendukung field `personalization_result`.

## File yang Terlibat

1. `prisma/seed.ts` - File seeder utama
2. `package.json` - Script `db:seed` ditambahkan
3. Data CSV yang dijadikan referensi untuk restore data
