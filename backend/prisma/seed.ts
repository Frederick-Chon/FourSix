import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test users
  await prisma.user.createMany({
    data: [
      {
        id: 'user-1',
        email: 'testuser1@example.com',
        password: 'hashedpassword1',
        displayName: 'Test User 1',
      },
      {
        id: 'user-2',
        email: 'testuser2@example.com',
        password: 'hashedpassword2',
        displayName: 'Test User 2',
      },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
