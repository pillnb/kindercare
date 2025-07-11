import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;

  if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized: Tidak ada sesi ditemukan.' }, { status: 401 });
  }

  const session = JSON.parse(sessionCookie);
  const userId = session?.id;

  if (!userId || typeof userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { seconds } = body;

    if (typeof seconds !== 'number' || seconds <= 0) {
      return NextResponse.json({ success: true, message: "Tidak ada waktu untuk dicatat (detik <= 0)." });
    }

    // Konversi detik ke menit, bulatkan ke atas jika perlu
    const minutesToAdd = Math.ceil(seconds / 60);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Lakukan UPSERT ke tabel dailyProgress
    await prisma.dailyProgress.upsert({
      where: {
        user_id_date: {
          user_id: userId,
          date: today,
        },
      },
      update: {
        learning_minutes: {
          increment: minutesToAdd, // Tambahkan menit yang baru dihabiskan
        },
      },
      create: {
        user_id: userId,
        date: today,
        learning_minutes: minutesToAdd,
      },
    });

    return NextResponse.json({ success: true, message: `${minutesToAdd} menit ditambahkan.` });
  } catch (error) {
    console.error('Gagal update waktu belajar:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
