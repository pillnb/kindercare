// src/app/api/profile/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        full_name: true,
        email: true,
        phone: true,
        profession: true,
        learning_preferences: true,
        personalization_result: true, // Ambil judul materi hasil personalisasi
        children: {
          select: {
            full_name: true,
            gender: true,
            birth_date: true,
            education_level: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    let childResponse = null;
    const childFromDb = user.children[0];

    if (childFromDb) {
      const age = calculateAge(new Date(childFromDb.birth_date));
      childResponse = {
        full_name: childFromDb.full_name,
        gender: childFromDb.gender,
        age: age,
        education_level: childFromDb.education_level
      };
    }
    
    return NextResponse.json({
      user: {
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        profession: user.profession,
        personalization: user.personalization_result || 'Belum ada hasil personalisasi',
      },
      child: childResponse,
    });

  } catch (error) {
    console.error('API Error fetching profile data:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak ditemukan.' }, { status: 401 });
    }
    const session = JSON.parse(sessionCookie);
    const userId = session?.id;
    if (!userId || typeof userId !== 'number') {
      return NextResponse.json({ error: 'Unauthorized: Sesi tidak valid.' }, { status: 401 });
    }

    const body = await req.json();
    const { user: userData, child: childData } = body;

    if (!userData?.full_name || !childData?.full_name) {
        return NextResponse.json({ error: 'Nama lengkap pengguna dan anak tidak boleh kosong.' }, { status: 400 });
    }

    const existingChild = await prisma.child.findFirst({
        where: { user_id: userId },
        select: { id: true }
    });

    if (!existingChild) {
        return NextResponse.json({ error: 'Data anak tidak ditemukan untuk pengguna ini.' }, { status: 404 });
    }

    // Siapkan data anak yang akan diupdate
    const childUpdateData: { full_name: string; gender?: 'male' | 'female'; birth_date?: Date } = {
      full_name: childData.full_name,
    };

    if (childData.gender) {
      childUpdateData.gender = childData.gender;
    }

    if (childData.age !== undefined) {
      const ageNum = parseInt(childData.age);
      if (!isNaN(ageNum)) {
        const currentYear = new Date().getFullYear();
        childUpdateData.birth_date = new Date(currentYear - ageNum, 0, 1);
      }
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          full_name: userData.full_name,
          profession: userData.profession,
          phone: userData.phone,
        },
      }),
      prisma.child.update({
        where: { id: existingChild.id },
        data: childUpdateData,
      }),
    ]);

    return NextResponse.json({ message: 'Profil berhasil diperbarui.' });

  } catch (error) {
    console.error('API Error updating profile data:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server saat memperbarui profil.' }, { status: 500 });
  }
}