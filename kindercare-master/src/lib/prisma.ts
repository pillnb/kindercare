import { PrismaClient } from '@prisma/client';

// Ini adalah trik untuk mencegah pembuatan koneksi baru setiap kali ada hot-reload di development
declare global {
  // @ts-ignore
  let prisma: PrismaClient | undefined;
}

// @ts-ignore
const prisma = global.prisma || new PrismaClient({
  // Opsi log ini opsional, tapi berguna untuk debugging query
  log: ['query', 'info', 'warn', 'error'], 
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  global.prisma = prisma;
}

export default prisma;