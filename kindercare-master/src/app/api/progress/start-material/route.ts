// Path: src/app/api/progress/start-material/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
//   const userId = 1; // Harusnya dinamis dari sesi login

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

    // Perintah 'upsert' dengan sintaks yang benar
    await prisma.materialProgress.upsert({
      where: {
        // --- INI PERBAIKAN UTAMA ---
        // Ini adalah cara yang benar untuk mencari berdasarkan @@unique di Prisma
        // dengan menggabungkan nama kolom. Prisma secara otomatis membuat identifier ini.
        user_id_child_id_material_id: {
          user_id: userId,
          child_id: childId,
          material_id: materialId,
        }
      },
      update: {
        last_accessed: new Date(),
      },
      create: {
        user_id: userId,
        child_id: childId,
        material_id: materialId,
        status: 'in_progress', // status default dari skema juga bisa diandalkan
        last_accessed: new Date(),
      },
    });

    return NextResponse.json({ message: 'Progress start berhasil dicatat' });
  } catch (error) {
    console.error('Error saat mencatat progress start:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server saat start' }, { status: 500 });
  }
}
