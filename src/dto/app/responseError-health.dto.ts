import { ApiProperty } from '@nestjs/swagger';

/**
 * Health Error Response DTO
 *
 * This DTO represents a response indicating that the application or database is unhealthy.
 */
export class HealthErrorResponseDTO {
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
   * Status indicating an unhealthy state.
   * @example 'unhealthy'
   */
  @ApiProperty({
    type: String,
    example: 'unhealthy',
    description: 'Status indicating an unhealthy state.',
  })
  readonly status: string;

  /**
   * Status indicating database disconnection.
   * @example 'disconnected'
   */
  @ApiProperty({
    type: String,
    example: 'disconnected',
    description: 'Status indicating database disconnection.',
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
