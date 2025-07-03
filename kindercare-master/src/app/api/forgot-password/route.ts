import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 });
    }

    // Cek apakah user dengan email tersebut ada
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Jangan berikan informasi bahwa email tidak ada (untuk keamanan)
      return NextResponse.json({ 
        message: 'Jika email terdaftar, tautan reset password telah dikirim' 
      });
    }

    // Generate token reset yang unik
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit dari sekarang

    // Hapus token reset sebelumnya untuk user ini (jika ada)
    await prisma.passwordResetToken.deleteMany({
      where: { user_id: user.id }
    });

    // Simpan token reset baru
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expires_at: expiresAt,
        user_id: user.id
      }
    });

    // Generate reset link
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    // Coba kirim email
    const emailResult = await sendResetPasswordEmail(email, resetUrl);
    
    if (emailResult.success) {
      console.log('✅ Email reset password berhasil dikirim ke:', email);
    } else {
      // Jika email gagal dikirim, tetap log untuk development
      console.log('⚠️ Email gagal dikirim, menggunakan console log:');
      console.log('=== RESET PASSWORD REQUEST ===');
      console.log(`Email: ${email}`);
      console.log(`Token: ${resetToken}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log(`Token akan kedaluwarsa pada: ${expiresAt}`);
      console.log('================================');
    }
    
    return NextResponse.json({ 
      message: 'Jika email terdaftar, tautan reset password telah dikirim' 
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan pada server' 
    }, { status: 500 });
  }
}
