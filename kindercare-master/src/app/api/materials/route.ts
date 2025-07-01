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
    
    // 1. Ambil data user dan child-nya
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        children: {
          take: 1,
          select: { id: true, age: true, birth_date: true, full_name: true }
        }
      }
    });

    if (!user || !user.children || user.children.length === 0) {
      return NextResponse.json({ error: "User atau data anak tidak ditemukan." }, { status: 404 });
    }
    
    const child = user.children[0];

    // Hitung umur berdasarkan birth_date jika age null
    let umur = child.age;
    if (umur === null || umur === undefined) {
      if (child.birth_date) {
        const today = new Date();
        const birthDate = new Date(child.birth_date);
        umur = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          umur--;
        }
      } else {
        return NextResponse.json({ error: "Umur anak belum diisi dan tanggal lahir tidak tersedia" }, { status: 400 });
      }
    }

    const childId = child.id;
    const personalizationResult = user.personalization_result;

    let recommendedMaterial: (Material & { isCompleted?: boolean }) | null = null;
    let otherMaterials: (Material & { isCompleted?: boolean })[] = [];

    // 2. Ambil materi rekomendasi jika ada
    if (personalizationResult) {
      const material = await prisma.material.findFirst({
        where: { title: personalizationResult }
      });
      if (material) {
        recommendedMaterial = material;
      }
    }

    // 3. Ambil materi lain berdasarkan umur
    const relevantAgeRanges = getRelevantAgeRanges(umur);
    if (relevantAgeRanges.length > 0) {
      otherMaterials = await prisma.material.findMany({
        where: {
          recommended_age_range: {
            in: relevantAgeRanges,
          },
          // Pastikan tidak mengambil materi rekomendasi lagi jika sudah ada
          ...(recommendedMaterial && { 
            NOT: {
              id: recommendedMaterial.id
            }
          })
        },
      });
    }

    // 4. Cek status 'completed' untuk semua materi
    const allMaterialIds = [
      ...(recommendedMaterial ? [recommendedMaterial.id] : []),
      ...otherMaterials.map(m => m.id)
    ];

    if (allMaterialIds.length > 0) {
        const completedProgressRecords = await prisma.materialProgress.findMany({
            where: {
                user_id: userId,
                child_id: childId,
                material_id: { in: allMaterialIds },
                status: 'completed',
            },
            select: {
                material_id: true,
            },
        });
        const completedMaterialIds = new Set(completedProgressRecords.map(p => p.material_id));

        // Tambahkan flag isCompleted
        if (recommendedMaterial) {
          recommendedMaterial.isCompleted = completedMaterialIds.has(recommendedMaterial.id);
        }
        otherMaterials = otherMaterials.map(mat => ({
          ...mat,
          isCompleted: completedMaterialIds.has(mat.id),
        }));
    }

    // 5. Kirim response
    return NextResponse.json({
      umur: umur,
      recommendedMaterial: recommendedMaterial,
      materials: otherMaterials,
    });

  } catch (error) {
    console.error("Error di /api/materials:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
