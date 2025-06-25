import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized: Tidak ada sesi ditemukan.' }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie);
    const userId = session?.id;

    if (!userId || typeof userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
    }

    const body = await req.json();
    const { targetMinutes } = body;

    if (typeof targetMinutes !== 'number' || ![15, 30, 60].includes(targetMinutes)) {
      return NextResponse.json({ error: 'Target menit tidak valid. Pilih 15, 30, atau 60.' }, { status: 400 });
    }

    // --- PERBAIKAN DI SINI: Update model User, bukan Child ---
    await prisma.user.update({
      where: { id: userId }, // Kita update user yang sedang login
      data: { daily_target_minutes: targetMinutes },
    });
    // --- Tidak perlu lagi mencari child di sini ---

    return NextResponse.json({ message: 'Target harian berhasil diperbarui.' });

  } catch (error) {
    console.error('Error saat memperbarui target harian:', error);
    // Meskipun tidak muncul di UI, error ini tetap penting untuk debugging
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}