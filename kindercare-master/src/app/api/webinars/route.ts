  import { NextResponse } from "next/server"
  import prisma from "@/lib/prisma"

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