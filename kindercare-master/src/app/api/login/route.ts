import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
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
        maxAge: 60 * 60 * 24,
      }
    )

    return res
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 })
  }
}
