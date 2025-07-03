# Fitur Forgot Password - KinderCare

## Overview
Fitur ini memungkinkan pengguna untuk mereset password mereka melalui email ketika lupa password.

## Flow Reset Password

1. **Request Reset Password**
   - User mengklik "Forgot password?" di halaman login
   - User diarahkan ke `/lupa-password`
   - User memasukkan email dan klik "Kirim Link Reset"
   - Sistem generate token unik dan menyimpannya ke database
   - Sistem mengirim email dengan link reset ke user
   - User melihat halaman konfirmasi

2. **Reset Password**
   - User mengklik link reset di email
   - User diarahkan ke `/reset-password?token=xxx`
   - Sistem validasi token (ada, belum digunakan, belum expired)
   - User memasukkan password baru dan konfirmasi
   - Sistem update password dan tandai token sebagai used
   - User diarahkan kembali ke login

## API Endpoints

### POST `/api/forgot-password`
Request reset password token

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Jika email terdaftar, tautan reset password telah dikirim"
}
```

### POST `/api/reset-password`
Reset password dengan token

**Body:**
```json
{
  "token": "reset-token",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password berhasil direset"
}
```

## Database Schema

```sql
CREATE TABLE "password_reset_tokens" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "used" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "user_id" INTEGER NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE
);
```

## Security Features

1. **Token Expiration**: Token berlaku selama 15 menit
2. **One-time Use**: Token hanya bisa digunakan sekali
3. **Token Cleanup**: Token lama dihapus ketika generate token baru
4. **Email Validation**: Tidak memberikan informasi apakah email terdaftar atau tidak
5. **Password Requirements**: Minimum 6 karakter

## Email Service

Menggunakan Nodemailer dengan konfigurasi:
- Development: Ethereal Email (fake SMTP untuk testing)
- Production: Gmail SMTP atau service email lainnya

**Environment Variables:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=KinderCare <noreply@kindercare.com>
```

## File Structure

```
src/
├── app/
│   ├── lupa-password/
│   │   └── page.tsx              # Halaman request reset password
│   ├── reset-password/
│   │   └── page.tsx              # Halaman reset password dengan token
│   └── api/
│       ├── forgot-password/
│       │   └── route.ts          # API endpoint untuk request reset
│       └── reset-password/
│           └── route.ts          # API endpoint untuk reset password
├── lib/
│   └── email.ts                  # Email service helper
└── prisma/
    └── schema.prisma             # Database schema
```

## UI/UX Features

### Halaman Lupa Password (`/lupa-password`)
- Form input email dengan validasi
- Loading state saat mengirim
- Success state dengan instruksi cek email
- Tombol "Kirim Ulang Email"
- Link kembali ke login

### Halaman Reset Password (`/reset-password`)
- Validasi token di URL
- Form password baru dengan konfirmasi
- Show/hide password toggle
- Password strength indicator
- Error handling untuk token invalid/expired
- Success state setelah reset berhasil

### Email Template
- Responsive HTML email
- Branded dengan desain KinderCare
- Clear CTA button untuk reset
- Token expiration warning
- Security notice

## Testing

1. **Manual Testing:**
   - Test forgot password flow end-to-end
   - Test dengan email yang tidak terdaftar
   - Test dengan token yang expired
   - Test dengan token yang sudah digunakan

2. **Console Logging:**
   - Reset token dan URL di-log ke console untuk development
   - Email delivery status di-log

## Production Deployment

1. **Email Configuration:**
   - Setup Gmail App Password atau SMTP service
   - Configure environment variables
   - Test email delivery

2. **Security:**
   - Ensure HTTPS untuk reset links
   - Rate limiting pada endpoints
   - Monitor untuk abuse

## Possible Improvements

1. **Enhanced Security:**
   - Rate limiting per IP/email
   - CAPTCHA pada form
   - 2FA integration

2. **User Experience:**
   - Email verification sebelum reset
   - Password strength meter
   - Recent password history check

3. **Monitoring:**
   - Email delivery tracking
   - Reset attempt analytics
   - Failed attempt alerts
