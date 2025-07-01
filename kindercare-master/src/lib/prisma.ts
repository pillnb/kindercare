import { PrismaClient } from '@prisma/client';

// Ini adalah trik untuk mencegah pembuatan koneksi baru setiap kali ada hot-reload di development
declare global {
  let prisma: PrismaClient | undefined;
}

const prisma = (global as typeof globalThis & { prisma?: PrismaClient }).prisma || new PrismaClient({
  // Konfigurasi yang lebih sesuai untuk production/Vercel
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'minimal',
});

if (process.env.NODE_ENV !== 'production') {
  (global as typeof globalThis & { prisma?: PrismaClient }).prisma = prisma;
}

export default prisma;