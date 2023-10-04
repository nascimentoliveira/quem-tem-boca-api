import { PrismaService } from '../prisma/prisma.service';
import { seedDrinks } from './dink.seed';
import { seedDishes } from './dish.seed';
import { seedEstablishments } from './establishment.seed';
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
  await seedEstablishments(prisma);
  await seedDishes(prisma);
  await seedDrinks(prisma);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error seeding:', error);
});
