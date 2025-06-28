// src/app/api/faq/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(faqs);

  } catch (error) {
    console.error('FAQ_API_ERROR:', error);
    return new NextResponse(
      'Tidak dapat memuat FaQ. Periksa koneksi internet Anda.',
      { status: 500 }
    );
  }
}