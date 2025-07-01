import { PrismaClient } from '@prisma/client';

// Ini adalah trik untuk mencegah pembuatan koneksi baru setiap kali ada hot-reload di development
declare global {
  let prisma: PrismaClient | undefined;
}

const prisma = (global as any).prisma || new PrismaClient({
  // Opsi log ini opsional, tapi berguna untuk debugging query
  log: ['query', 'info', 'warn', 'error'], 
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== 'production') {
  (global as any).prisma = prisma;
}

export default prisma;