import { PrismaService } from '../prisma/prisma.service';
import { seedUsers } from './user.seed';

/**
 * Main Function
 *
 * This is the main entry point of the seeding script. It connects to the database using the PrismaService,
 * seeds the database with dummy data, and then disconnects from the database.
 */
async function main() {
  const prisma = new PrismaService();
  await seedUsers(prisma);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error seeding:', error);
});
