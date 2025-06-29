// src/app/api/change-password/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { compare, hash } from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak ditemukan.' }, { status: 401 });
    }
    const session = JSON.parse(sessionCookie);
    const userId = session?.id;
    if (!userId || typeof userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Semua field password wajib diisi.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    const isPasswordCorrect = await compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      // Ini adalah respons error yang akan kita tangkap di frontend
      return NextResponse.json({ error: 'Password saat ini salah.' }, { status: 403 });
    }
    
    const hashedNewPassword = await hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: 'Password berhasil diperbarui.' });

  } catch (error) {
    console.error('API Error changing password:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}