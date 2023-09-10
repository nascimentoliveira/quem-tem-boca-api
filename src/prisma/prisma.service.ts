import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma Service
 *
 * This service extends the PrismaClient and implements the OnModuleInit interface.
 * It handles database connections and provides a method to enable shutdown hooks for closing connections.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Initializes the database connection when the module is initialized.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Enables shutdown hooks for gracefully closing the database connection when the application is shutting down.
   *
   * @param app - The INestApplication instance.
   */
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
      await this.$disconnect();
    });
  }
}
