import { NextResponse, NextRequest } from 'next/server'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const BASE_URL = url.origin

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: 'Email tidak ditemukan' },
        { status: 404 }
      )
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 })
    }

    const res = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        personalization_completed: user.personalization_completed,
      },
    })

    res.cookies.set(
      'session',
      JSON.stringify({
        id: user.id,
        name: user.full_name,
        email: user.email,
      }),
      {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 hari
      }
    )

    const payload = { 
      userId: user.id,
      seconds: 0
    };
    const updateStreakRes = await fetch(`${BASE_URL}/api/progress/update-time`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    if (!updateStreakRes.ok) throw new Error("Gagal memuat Update streak. Mohon login ulang.")

    return res
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 })
  }
}