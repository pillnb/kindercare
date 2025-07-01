import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      full_name,
      email,
      phone,
      password,
      profession,
      // Perubahan: Terima child_age (umur) bukan child_birth_date (tanggal lahir)
      child_name,
      child_gender,
      child_age,
    } = body;

    // Validasi data utama user
    if (!full_name || !email || !password) {
      return NextResponse.json({ error: 'Data user tidak lengkap' }, { status: 400 });
    }

    // Validasi data anak yang wajib
    // Pastikan child_age adalah angka yang valid
    const ageNum = parseInt(child_age);
    if (!child_name || !child_gender || isNaN(ageNum) || ageNum < 0) {
      return NextResponse.json({ error: 'Data anak tidak lengkap atau umur tidak valid' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        full_name,
        email,
        phone,
        profession,
        password: hashedPassword,
      },
    });

    // Hitung perkiraan tanggal lahir berdasarkan umur
    const currentYear = new Date().getFullYear();
    // Kita akan set tanggal lahir ke 1 Januari pada tahun (tahun sekarang - umur)
    const approximateBirthDate = new Date(currentYear - ageNum, 0, 1); // Bulan 0 adalah Januari

    // Setelah user dibuat, buat record anak dan hubungkan dengan user_id
    await prisma.child.create({
      data: {
        user_id: newUser.id,
        full_name: child_name,
        gender: child_gender, // Pastikan ini sesuai dengan enum Gender di Prisma ('male' atau 'female')
        birth_date: approximateBirthDate, // Gunakan tanggal lahir yang dihitung
      },
    });

    return NextResponse.json({ success: true, id: newUser.id, message: 'Registrasi berhasil' }, { status: 201 });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}