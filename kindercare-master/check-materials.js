const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllMaterials() {
  try {
    const materials = await prisma.material.findMany({
      select: {
        id: true,
        title: true,
        content: true
      },
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log(`📚 Total materi yang ditemukan: ${materials.length}`);
    console.log('\n📝 Daftar semua materi:');
    
    materials.forEach((material, index) => {
      console.log(`${index + 1}. ID: ${material.id} - ${material.title}`);
      console.log(`   Konten ada: ${material.content ? 'Ya' : 'Tidak'}`);
      if (material.content) {
        console.log(`   Panjang konten: ${material.content.length} karakter`);
      }
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error saat mengecek materi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllMaterials();
