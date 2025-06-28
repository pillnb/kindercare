// src/app/api/logout/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.json({ message: 'Logout berhasil' });

  // Hapus cookie sesi dengan mengatur maxAge ke 0 atau tanggal kedaluwarsa di masa lalu
  res.cookies.set('session', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
  });

  return res;
}