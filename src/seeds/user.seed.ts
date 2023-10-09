import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { faker } from '@faker-js/faker';

/**
 * Seed Users
 *
 * This function seeds the database with dummy user data.
 *
 * @param prisma - The PrismaService instance for interacting with the database.
 */
export async function seedUsers(prisma: PrismaService) {
  const encryptionService = new EncryptionService();

  const fakeFirstName: string = faker.person.firstName();

  const usersData = [
    {
      email: encryptionService.encryptEmail(
        faker.internet.email({ firstName: fakeFirstName }),
      ),
      username: fakeFirstName,
      password: encryptionService.encryptPassword(faker.internet.password()),
    },
    {
      email: encryptionService.encryptEmail('jonh.doe@example.com'),
      username: 'Jonh Doe',
      password: encryptionService.encryptPassword('password123'),
    },
  ];

  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }
}
