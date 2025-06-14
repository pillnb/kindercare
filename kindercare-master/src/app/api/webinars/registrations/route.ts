import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Untuk keperluan testing: hardcode userId sementara
async function getUserIdFromReq(_req: NextRequest): Promise<number | null> {
  return 1; // Ganti dengan user ID yang valid dari tabel users di database kamu
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromReq(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { webinar_id } = await req.json();
  if (typeof webinar_id !== "number") {
    return NextResponse.json({ message: "webinar_id required" }, { status: 400 });
  }

  try {
    const existing = await prisma.webinarRegistration.findFirst({
      where: { user_id: userId, webinar_id },
    });

    if (existing) {
      return NextResponse.json({ message: "Already registered" }, { status: 409 });
    }

    await prisma.webinarRegistration.create({
      data: { user_id: userId, webinar_id },
    });

    return NextResponse.json({ message: "Registered successfully" });
  } catch (e) {
    console.error("POST Error:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = await getUserIdFromReq(req);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const regs = await prisma.webinarRegistration.findMany({
      where: { user_id: userId },
      include: { webinar: true },
      orderBy: { registered_at: "desc" },
    });

    const result = regs.map((r) => ({
      id: r.id.toString(),
      webinarId: r.webinar.id,
      title: r.webinar.title,
      speaker: r.webinar.speaker,
      job_speaker: r.webinar.job_speaker,
      date: r.webinar.date.toISOString(),
      lokasi: r.webinar.lokasi,
      bannerImageSrc: null,
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("GET Error:", e);
    return NextResponse.json({ message: "Failed to fetch registrations" }, { status: 500 });
  }
}