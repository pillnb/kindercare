import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const idStr = pathSegments[pathSegments.length - 1];
  const regId = Number(idStr);

  if (isNaN(regId) || regId <= 0) {
    return NextResponse.json({ message: "Invalid registration ID" }, { status: 400 });
  }

  try {
    const reg = await prisma.webinarRegistration.findUnique({
      where: { id: regId },
    });

    if (!reg) {
      return NextResponse.json({ message: "Pendaftaran tidak ditemukan." }, { status: 404 });
    }

    await prisma.webinarRegistration.delete({ where: { id: regId } });

    return NextResponse.json({ message: "Pendaftaran webinar berhasil dibatalkan." });
  } catch (e) {
    console.error("DELETE Error:", e);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat membatalkan pendaftaran." },
      { status: 500 }
    );
  }
}
