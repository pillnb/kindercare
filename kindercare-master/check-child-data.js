const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkChildData() {
  try {
    // Ambil semua data user dengan children mereka
    const users = await prisma.user.findMany({
      include: {
        children: {
          select: {
            id: true,
            full_name: true,
            age: true,
            birth_date: true,
            gender: true
          }
        }
      }
    });

    console.log('=== Data Users dan Children ===');
    users.forEach(user => {
      console.log(`\nUser: ${user.full_name} (ID: ${user.id})`);
      console.log(`Email: ${user.email}`);
      console.log(`Personalization Result: ${user.personalization_result || 'None'}`);
      console.log('Children:');
      
      if (user.children.length === 0) {
        console.log('  - No children found');
      } else {
        user.children.forEach(child => {
          console.log(`  - ${child.full_name} (ID: ${child.id})`);
          console.log(`    Age: ${child.age}`);
          console.log(`    Birth Date: ${child.birth_date}`);
          console.log(`    Gender: ${child.gender}`);
        });
      }
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkChildData();
