import { PrismaClient, Material } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const userId = 1;

    const child = await prisma.child.findFirst({
      where: { user_id: userId },
    });

    if (!child || child.age === null || child.age === undefined) {
      return NextResponse.json({ error: "Umur anak belum diisi" }, { status: 400 });
    }

    const umur = child.age;

    let materi: Material[] = []; // ✅ Fix: Tambahkan tipe data eksplisit

    if (umur >= 4 && umur <= 5) {
      materi = await prisma.material.findMany({
        where: {
          title: {
            in: [
              "Kenali Bagian Tubuhmu",
              "Tubuhku adalah Milikku",
              "Perbedaan Anak Laki-laki dan Perempuan",
            ],
          },
        },
      });
    } else if (umur >= 6 && umur <= 7) {
      materi = await prisma.material.findMany({
        where: {
          title: {
            in: [
              "Aturan Sentuhan Aman",
              "Siapa yang Bisa Dipercaya?",
              "Rahasia Baik vs Rahasia Buruk",
            ],
          },
        },
      });
    } else if (umur >= 8) {
      materi = await prisma.material.findMany({
        where: {
          title: {
            in: [
              "Tubuhku Mulai Berubah",
              "Perasaan yang Berbeda",
              "Teman yang baik dan aman di internet",
            ],
          },
        },
      });
    }

    return NextResponse.json({ umur, materi });

  } catch (error) {
    console.error("MATERIALS ERROR:", error);
    return NextResponse.json({ error: "Gagal mengambil data materi" }, { status: 500 });
  }
}
