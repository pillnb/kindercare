import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params
  const id = parseInt(idParam)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
  }

  const materi = await prisma.material.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      image_url: true,
      content: true,
    },
  })

  if (!materi) {
    return NextResponse.json({ error: 'Materi tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(materi)
}
