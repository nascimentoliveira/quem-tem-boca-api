import { ApiProperty } from '@nestjs/swagger';

/**
 * Health Ok Response DTO
 *
 * This DTO represents a response indicating that the application and database are healthy.
 */
export class HealthOkResponseDTO {
  /**
   * Description of the application.
   * @example 'Quem-Tem-Boca-API'
   */
  @ApiProperty({
    type: String,
    example: 'Quem-Tem-Boca-API',
    description: 'Description of the application.',
  })
  readonly description: string;

  /**
   * Status of the application's health.
   * @example 'healthy'
   */
  @ApiProperty({
    type: String,
    example: 'healthy',
    description: "Status of the application's health.",
  })
  readonly status: string;

  /**
   * Status of the database connectivity.
   * @example 'connected'
   */
  @ApiProperty({
    type: String,
    example: 'connected',
    description: 'Status of the database connectivity.',
  })
  readonly database: string;

  /**
   * Timestamp when the health check was performed.
   * @example '2023-06-11T15:31:41.220Z'
   */
  @ApiProperty({
    type: String,
    example: '2023-06-11T15:31:41.220Z',
    description: 'Timestamp when the health check was performed.',
  })
  readonly timestamp: string;
}
