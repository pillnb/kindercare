// Lokasi File: src/app/api/tips/[id]/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const tip = await prisma.tip.findUnique({
      where: { id },
    });

    if (!tip) {
      return NextResponse.json({ error: 'Tip tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(tip);
  } catch (error) {
    console.error(`Gagal mengambil tip dengan ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Gagal memuat detail tip.' }, { status: 500 });
  }
}