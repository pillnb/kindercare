import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import type { Material } from "@prisma/client";

const prisma = new PrismaClient();

const getRelevantAgeRanges = (age: number | null): string[] => {
  if (age === null || age === undefined) {
    return []; // Jika umur null/undefined, tangani sesuai kebutuhan
  }
  if (age >= 4 && age <= 5) {
    return ["4-5"];
  } else if (age >= 6 && age <= 7) {
    return ["6-7"];
  } else if (age >= 8) {
    return ["8+"];
  }
  return []; 
};

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) {
        return NextResponse.json({ error: 'Unauthorized: Tidak ada sesi ditemukan.' }, { status: 401 });
    }
    const session = JSON.parse(sessionCookie);
    const userId = session?.id;
    if (!userId || typeof userId !== 'number') {
        return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
    }
    // --- AKHIR PENGAMBILAN userId DARI SESI ---

    const child = await prisma.child.findFirst({
      where: { user_id: userId }, // <<< GUNAKAN userId DARI SESI DI SINI
      select: { age: true }
    });

    if (!child || child.age === null || child.age === undefined) {
      return NextResponse.json({ error: "Umur anak belum diisi" }, { status: 400 });
    }

    const umur = child.age;
    const relevantAgeRanges = getRelevantAgeRanges(umur);

    let materi: Material[] = []; // ✅ Fix: Tambahkan tipe data eksplisit

    if (relevantAgeRanges.length > 0) { // Hanya fetch materi jika ada rentang usia yang relevan
      materi = await prisma.material.findMany({
        where: {
          recommended_age_range: { // <<< FILTER BERDASARKAN age_range
            in: relevantAgeRanges,
          },
        },
      });
<<<<<<< HEAD
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
=======
    } 
>>>>>>> 0932f27b6c1d0089126c4e6d66ed8a09fff7be1c

    return NextResponse.json({ umur, materi });

  } catch (error) {
    console.error("MATERIALS ERROR:", error);
    return NextResponse.json({ error: "Gagal mengambil data materi" }, { status: 500 });
  }
}
