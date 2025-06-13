import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { full_name, email, phone, password, profession } = body

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        phone,
        profession,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ success: true, id: user.id }, { status: 201 })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
