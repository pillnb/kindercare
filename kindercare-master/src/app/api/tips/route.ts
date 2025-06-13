import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tips = await prisma.tip.findMany({
      orderBy: { created_at: "desc" },
      take: 4,
    })
    return NextResponse.json(tips)
  } catch (err) {
    console.error("TIPS ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch tips" }, { status: 500 })
  }
}