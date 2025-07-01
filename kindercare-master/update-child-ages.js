const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateChildAges() {
  try {
    console.log('=== Updating Child Ages ===');
    
    // Ambil semua anak yang agenya null
    const childrenWithNullAge = await prisma.child.findMany({
      where: {
        age: null
      },
      select: {
        id: true,
        full_name: true,
        birth_date: true,
        age: true
      }
    });

    console.log(`Found ${childrenWithNullAge.length} children with null age`);

    for (const child of childrenWithNullAge) {
      if (child.birth_date) {
        const today = new Date();
        const birthDate = new Date(child.birth_date);
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }

        // Update age di database
        await prisma.child.update({
          where: { id: child.id },
          data: { age: calculatedAge }
        });

        console.log(`Updated ${child.full_name} (ID: ${child.id}): age set to ${calculatedAge}`);
      } else {
        console.log(`Skipped ${child.full_name} (ID: ${child.id}): no birth_date`);
      }
    }

    console.log('=== Update completed ===');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateChildAges();
