"use server";

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Gender, FamilyValueOrientation, Material } from '@prisma/client';

// ==============================================================================
//           ALGORITMA REKOMENDASI PRIBADI KINDERCARE V1.0
// ==============================================================================
async function getRecommendation(formData: FormData): Promise<string> {
  // --- Tahap 1: Kumpulkan Semua Data Input dari Survei ---
  const learningTopics = formData.getAll('learningTopics') as string[];
  const childAge = formData.get('childAge') as string;
  const familyView = formData.get('familyView') as string;
  const childSpecialNeeds = formData.get('childSpecialNeeds') === 'yes';

  // --- Tahap 2: Filter Materi yang Relevan Berdasarkan Usia ---
  const relevantMaterials = await prisma.material.findMany({
    where: {
      recommended_age_range: childAge,
    },
  });

  if (relevantMaterials.length === 0) {
    return "Materi yang sesuai untuk usia ini belum tersedia";
  }

  let bestMatch: Material | null = null;
  let highestScore = -1;

  console.log(`\n--- Menghitung Skor Rekomendasi untuk Anak Usia ${childAge} ---`);

  // --- Tahap 3: Proses Skoring untuk Setiap Materi yang Relevan ---
  for (const material of relevantMaterials) {
    let score = 0;
    let scoreLog = `Materi "${material.title}":`;

    // Aturan #1: Kecocokan Topik (Skor +15)
    if (material.category && learningTopics.includes(material.category)) {
      score += 15;
      scoreLog += ` +15 (Topik Cocok: ${material.category})`;
    }

    // Aturan #2: Prioritas Kritis Keselamatan (Skor +10)
    if (material.category === 'keselamatan_pribadi' && learningTopics.includes('keselamatan_pribadi')) {
        score += 10;
        scoreLog += ` +10 (Prioritas Keselamatan)`;
    }

    // Aturan #3: Penyesuaian Nilai Keluarga
    if (familyView === 'konservatif' && material.category === 'pubertas') {
        score -= 5; // Kurangi skor untuk topik sensitif jika pandangan konservatif
        scoreLog += ` -5 (Nilai Keluarga Konservatif)`;
    }
    if (familyView === 'terbuka' && material.category === 'pubertas') {
        score += 5; // Tambah skor jika pandangan terbuka
        scoreLog += ` +5 (Nilai Keluarga Terbuka)`;
    }
    
    // Aturan #4: Kebutuhan Khusus (Skor +8)
    if (childSpecialNeeds && (material.category === 'emosi' || material.category === 'keselamatan_pribadi')) {
        score += 8;
        scoreLog += ` +8 (Kebutuhan Khusus)`;
    }

    console.log(`${scoreLog} | Total Skor: ${score}`);

    // Cek apakah ini skor tertinggi sejauh ini
    if (score > highestScore) {
      highestScore = score;
      bestMatch = material;
    }
  }

  // --- Tahap 4: Tentukan Hasil Akhir ---
  // Jika tidak ada satu pun topik yang cocok, berikan materi dasar sebagai fallback
  if (!bestMatch || highestScore <= 0) {
    console.log("Tidak ada skor yang cocok, memberikan rekomendasi default...");
    bestMatch = await prisma.material.findFirst({
        where: { recommended_age_range: childAge, category: 'keselamatan_pribadi' }
    }) || relevantMaterials[0]; // Jaring pengaman terakhir
  }

  console.log(`--- Rekomendasi Final: "${bestMatch.title}" (Skor: ${highestScore}) ---\n`);
  return bestMatch.title;
}

// ==============================================================================
//                      FUNGSI SERVER ACTION UTAMA
// ==============================================================================
export async function savePersonalization(formData: FormData) {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session')?.value;
    if (!sessionCookie) throw new Error('Sesi tidak ditemukan.');
    
    const session = JSON.parse(sessionCookie);
    const userId = session?.id;
    if (!userId) throw new Error('ID Pengguna tidak valid.');

    const rawFormData = {
        parentAge: formData.get('parentAge') as string,
        childAge: formData.get('childAge') as string,
        childGender: formData.get('childGender') as Gender,
        childSpecialNeeds: formData.get('childSpecialNeeds') === 'yes',
        learningTopics: formData.getAll('learningTopics') as string[],
        familyView: formData.get('familyView') as FamilyValueOrientation,
        religiousContent: formData.get('religiousContent') === 'yes',
    };

    const ageValue = parseInt(rawFormData.childAge.split('-')[0], 10) || null;
    const existingChild = await prisma.child.findFirst({ where: { user_id: userId } });
    
    if (existingChild) {
        await prisma.child.update({ where: { id: existingChild.id }, data: { age: ageValue, gender: rawFormData.childGender, has_special_needs: rawFormData.childSpecialNeeds } });
    } else {
        await prisma.child.create({ data: { user_id: userId, full_name: "Anak Pengguna", birth_date: new Date(), gender: rawFormData.childGender, age: ageValue, has_special_needs: rawFormData.childSpecialNeeds } });
    }
    await prisma.user.update({ where: { id: userId }, data: { age_range: rawFormData.parentAge, learning_preferences: rawFormData.learningTopics, family_value_orientation: rawFormData.familyView, wants_religious_content: rawFormData.religiousContent, personalization_completed: true } });
    
    const recommendedTitle = await getRecommendation(formData);
    
    redirect(`/survey/result?recommendation=${encodeURIComponent(recommendedTitle)}`);
}