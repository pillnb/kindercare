import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ 
        error: 'Token dan password baru wajib diisi' 
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        error: 'Password minimal 6 karakter' 
      }, { status: 400 });
    }

    // Cari token reset yang valid
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetToken) {
      return NextResponse.json({ 
        error: 'Token tidak valid' 
      }, { status: 400 });
    }

    if (resetToken.used) {
      return NextResponse.json({ 
        error: 'Token sudah digunakan' 
      }, { status: 400 });
    }

    if (new Date() > resetToken.expires_at) {
      return NextResponse.json({ 
        error: 'Token sudah kedaluwarsa' 
      }, { status: 400 });
    }

    // Hash password baru
    const hashedPassword = await hash(newPassword, 12);

    // Update password user dan tandai token sebagai digunakan
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.user_id },
        data: { password: hashedPassword }
      }),
      prisma.passwordResetToken.update({
        where: { token },
        data: { used: true }
      })
    ]);

    return NextResponse.json({ 
      message: 'Password berhasil direset' 
    });

  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan pada server' 
    }, { status: 500 });
  }
}
