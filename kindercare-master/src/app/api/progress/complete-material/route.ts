import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
//   const userId = 1;

  try {
    // --- MULAI BAGIAN UBAHAN 2: Baca userId dari cookie ---
    const sessionCookie = req.cookies.get('session')?.value;

    if (!sessionCookie) {
        return NextResponse.json({ error: 'Unauthorized: Tidak ada sesi ditemukan.' }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie);
    const userId = session?.id;

    if (!userId || typeof userId !== 'number') {
        return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
    }
    // --- AKHIR BAGIAN UBAHAN 2 ---
    const body = await req.json();
    const { childId, materialId } = body;

    if (!childId || !materialId) {
      return NextResponse.json({ error: 'childId dan materialId dibutuhkan' }, { status: 400 });
    }
    
    // HANYA UPDATE STATUS, TIDAK ADA LAGI TRANSAKSI ATAU PENAMBAHAN WAKTU
    await prisma.materialProgress.updateMany({
      where: {
        user_id: userId,
        child_id: childId,
        material_id: materialId,
        status: 'in_progress'
      },
      data: {
        status: 'completed',
        completed_at: new Date(),
      },
    });

    return NextResponse.json({ message: 'Materi berhasil diselesaikan' });
  } catch (error) {
    console.error('Gagal menyelesaikan materi (simple):', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
