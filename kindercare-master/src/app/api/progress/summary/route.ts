import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type DailyProgressDate = { date: Date; }
type CompletedMaterialItem = { material: { title: string; description: string | null; }; }

// --- Fungsi calculateStreak tetap sama ---
const calculateStreak = (dates: Date[]): number => {
  if (dates.length === 0) return 0;
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sortedDates = dates.map(d => new Date(d.setHours(0,0,0,0))).sort((a, b) => b.getTime() - a.getTime()); 
  
  if (sortedDates.length > 0) {
    const firstDate = sortedDates[0]; 
    if (firstDate.getTime() === today.getTime()) {
      streak = 1;
    } else if (firstDate.getTime() === yesterday.getTime()) {
      streak = 1; 
    } else {
      return 0; 
    }

    let lastDateInStreak = firstDate;
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = sortedDates[i];
      const expectedPreviousDate = new Date(lastDateInStreak);
      expectedPreviousDate.setDate(lastDateInStreak.getDate() - 1);
      
      if (currentDate.getTime() === expectedPreviousDate.getTime()) {
        streak++;
        lastDateInStreak = currentDate;
      } else if (currentDate.getTime() < expectedPreviousDate.getTime()) {
        break; 
      }
    }
  }
  return streak;
};
// --- Akhir fungsi calculateStreak ---

// --- FUNGSI HELPER BARU: Menentukan rentang usia materi yang relevan ---
const getRelevantAgeRanges = (age: number | null): string[] => {
  if (age === null || age === undefined) {
    return []; // Atau tangani sesuai kebutuhan: misalnya kembalikan semua rentang atau default
  }
  if (age >= 4 && age <= 5) {
    return ["4-5"];
  } else if (age >= 6 && age <= 7) {
    return ["6-7"];
  } else if (age >= 8) {
    return ["8+"];
  }
  return []; // Jika umur di luar rentang yang didefinisikan
};
// --- AKHIR FUNGSI HELPER BARU ---


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

    // Ambil daily_target_minutes dari User DAN age dari Child ---
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        daily_target_minutes: true, 
        children: { 
            select: { id: true, age: true, birth_date: true } // <<< Ambil age dan birth_date dari Child
        }
      } 
    });

    if (!user) { 
        return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 });
    }

    const dailyTargetMinutes = user.daily_target_minutes || 60; 

    const child = user.children?.[0]; 
    if (!child) { 
        return NextResponse.json({
            dailyProgress: {
                current: 0,
                target: dailyTargetMinutes, // Gunakan target dari user
            },
            statistics: [
                { title: 'Runtutan Hari', value: 0, icon: '/icon/fire.svg' },
                { title: 'Pembelajaran Hari Ini', value: `0 min`, icon: '/icon/lightning.svg' },
                { title: 'Webinar Diikuti', value: 0, icon: '/icon/webinar.svg' },
                { title: 'Materi Terselesaikan', value: 0, icon: '/icon/book.svg' },
            ],
            completedMaterials: [], // Daftar materi terselesaikan kosong
        });
    }
    const childId = child.id;
    const childAge = child.age; // <<< Ambil usia anak

    // --- Gunakan fungsi helper untuk mendapatkan rentang usia materi yang relevan ---
    const relevantAgeRanges = getRelevantAgeRanges(childAge);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      dailyProgressToday,
      allDailyProgressDates,
      webinarCount,
      rawCompletedMaterialCount,
      completedMaterialRecords,
    ] = await Promise.all([
      prisma.dailyProgress.findFirst({ where: { user_id: userId, date: today } }),
      prisma.dailyProgress.findMany({ where: { user_id: userId }, orderBy: { date: 'desc' }, select: { date: true } }),
      prisma.webinarRegistration.count({ where: { user_id: userId } }),

      // --- PERUBAHAN UTAMA: Tambahkan filter age_range ke query MaterialProgress ---
      prisma.materialProgress.count({ 
        where: { 
          user_id: userId, 
          child_id: childId, 
          status: 'completed',
          material: { // <<< FILTER BERDASARKAN RELASI KE MATERIAL
            recommended_age_range: {
              in: relevantAgeRanges // <<< HANYA MATERI DENGAN RENTANG USIA INI
            }
          }
        } 
      }),
      
      prisma.materialProgress.findMany({
        where: { 
          user_id: userId, 
          child_id: childId, 
          status: 'completed',
          material: { // <<< FILTER BERDASARKAN RELASI KE MATERIAL
            recommended_age_range: {
              in: relevantAgeRanges // <<< HANYA MATERI DENGAN RENTANG USIA INI
            }
          }
        },
        include: { material: { select: { title: true, description: true } } },
        orderBy: { completed_at: 'desc' },
        take: 5
      }),
    ]);
    
    const completedMaterialCount = rawCompletedMaterialCount; 
    const todayMinutes = dailyProgressToday?.learning_minutes || 0;
    const streak = calculateStreak(allDailyProgressDates.map((p: DailyProgressDate) => p.date));
    const completedMaterialsList = completedMaterialRecords.map((item: CompletedMaterialItem) => ({
      title: item.material.title,
      description: item.material.description,
    }));

    const responseData = {
      dailyProgress: {
        current: todayMinutes,
        target: dailyTargetMinutes,
      },
      statistics: [
        { title: 'Runtutan Hari', value: streak, icon: '/icon/fire.svg' },
        { title: 'Pembelajaran Hari Ini', value: `${todayMinutes} min`, icon: '/icon/lightning.svg' },
        { title: 'Webinar Diikuti', value: webinarCount, icon: '/icon/webinar.svg' },
        { title: 'Materi Terselesaikan', value: completedMaterialCount, icon: '/icon/book.svg' },
      ],
      completedMaterials: completedMaterialsList,
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Gagal mengambil ringkasan progress:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}