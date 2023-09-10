import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

/**
 * Application Service
 *
 * This service provides application-level functionality, including health checks for the application and database connectivity.
 */
@Injectable()
export class AppService {
  /**
   * Constructor for the AppService.
   *
   * @param prisma An instance of the PrismaService for database operations.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Check the health of the application and database connectivity.
   *
   * @returns An object containing health status information, including application name, status, database connectivity, and timestamp.
   * @throws {HttpException} with a status code of 500 (Internal Server Error) if database connectivity fails.
   */
  async checkHealth() {
    try {
      await this.prisma.$connect();
      return {
        description: 'Quem-Tem-Boca-API',
        status: 'healthy',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new HttpException(
        {
          description: 'Quem-Tem-Boca-API',
          status: 'unhealthy',
          database: 'disconnected',
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
