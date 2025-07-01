import { Prisma } from "@prisma/client"; // 1. Import Prisma
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    // 2. Deklarasikan whereClause dengan tipe yang benar dari Prisma
    const whereClause: Prisma.TipWhereInput = {};

    // 3. Jika ada kategori, tambahkan ke dalam whereClause
    if (category) {
      whereClause.category = category;
    }
    
    const tips = await prisma.tip.findMany({
      where: whereClause, // Sekarang ini sudah type-safe dan tidak akan error
      orderBy: { created_at: "desc" },
    });
    
    return NextResponse.json(tips);
  } catch (err) {
    console.error("TIPS ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch tips" }, { status: 500 });
  }
}