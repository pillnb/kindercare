import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetSequences() {
  try {
    // Update sequence untuk User table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"));`;
    
    // Update sequence untuk Child table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Child"', 'id'), (SELECT MAX(id) FROM "Child"));`;
    
    // Update sequence untuk Material table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Material"', 'id'), (SELECT MAX(id) FROM "Material"));`;
    
    // Update sequence untuk MaterialProgress table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"MaterialProgress"', 'id'), (SELECT MAX(id) FROM "MaterialProgress"));`;
    
    // Update sequence untuk Tip table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Tip"', 'id'), (SELECT MAX(id) FROM "Tip"));`;
    
    // Update sequence untuk Webinar table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Webinar"', 'id'), (SELECT MAX(id) FROM "Webinar"));`;
    
    // Update sequence untuk WebinarRegistration table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"WebinarRegistration"', 'id'), (SELECT MAX(id) FROM "WebinarRegistration"));`;
    
    // Update sequence untuk Doctor table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"Doctor"', 'id'), (SELECT MAX(id) FROM "Doctor"));`;
    
    // Update sequence untuk DailyProgress table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"dailyprogress"', 'id'), (SELECT MAX(id) FROM "dailyprogress"));`;
    
    // Update sequence untuk Faq table
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('"faqs"', 'id'), (SELECT MAX(id) FROM "faqs"));`;
    
    console.log('✅ All sequences have been reset successfully!');
  } catch (error) {
    console.error('❌ Error resetting sequences:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetSequences();
