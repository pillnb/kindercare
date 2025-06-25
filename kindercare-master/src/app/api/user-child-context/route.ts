import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
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

    const child = await prisma.child.findFirst({
      where: { user_id: userId },
      select: { id: true } // Hanya perlu ID child
    });

    if (!child) {
      // Jika user tidak memiliki child, kembalikan 404
      // Halaman frontend akan menangani ini dengan menampilkan pesan error
      return NextResponse.json({ error: 'Tidak ada data anak yang terhubung.' }, { status: 404 });
    }

    return NextResponse.json({ userId: userId, childId: child.id });

  } catch (error) {
    console.error('Error fetching user-child context:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}