import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const webinars = await prisma.webinar.findMany({
      orderBy: { date: "asc" },
      take: 4,
    })
    return NextResponse.json(webinars)
  } catch (err) {
    console.error("WEBINAR ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch webinars" }, { status: 500 })
  }
}