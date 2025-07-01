# Fix: PostgreSQL Sequence Issue

## Masalah
Setelah menjalankan seeder yang menggunakan ID eksplisit, aplikasi mengalami error saat registrasi user baru:

```
REGISTER ERROR: Error [PrismaClientKnownRequestError]: 
Invalid `prisma.user.create()` invocation:
Unique constraint failed on the fields: (`id`)
code: 'P2002'
```

## Penyebab
Ketika seeder menginsert data dengan ID eksplisit (misalnya `id: 1, id: 6, id: 11`), PostgreSQL sequence untuk auto-increment tidak ter-update secara otomatis. Sequence masih menunjuk ke nilai awal (biasanya 1), padahal ID tersebut sudah digunakan.

## Solusi yang Diimplementasikan

### 1. Reset Manual Sequences
Dibuat script untuk mereset semua sequences:

```sql
SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"));
SELECT setval(pg_get_serial_sequence('"Child"', 'id'), (SELECT MAX(id) FROM "Child"));
-- dst untuk semua table
```

### 2. Update Seeder
File `prisma/seed.ts` telah diupdate untuk secara otomatis mereset sequences setelah seeding:

```typescript
// Reset all sequences to prevent ID conflicts
await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"));`;
await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Child"', 'id'), (SELECT MAX(id) FROM "Child"));`;
// ... untuk semua table lainnya
```

## Testing
Setelah fix, registrasi user baru berhasil dengan ID yang benar:
- User pertama: ID 22 ✅
- User kedua: ID 23 ✅

## Tables yang Diperbaiki
- User
- Child  
- Material
- MaterialProgress
- Tip
- Webinar
- WebinarRegistration
- Doctor
- DailyProgress (dailyprogress)
- Faq (faqs)

## Status
✅ **RESOLVED** - Auto-increment ID sekarang bekerja dengan benar untuk semua table.

## Catatan untuk Development
Ketika menggunakan seeder dengan ID eksplisit di PostgreSQL, selalu reset sequences setelahnya untuk menghindari konflik ID di masa depan.
