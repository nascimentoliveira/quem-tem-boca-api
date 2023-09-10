import { ApiProperty } from '@nestjs/swagger';

/**
 * Unauthorized Response DTO
 *
 * This DTO represents a response indicating that access is unauthorized, typically due to missing or invalid authentication credentials.
 */
export class UnauthorizedResponseDTO {
  /**
   * The HTTP status code indicating an unauthorized access.
   * @example 401
   */
  @ApiProperty({
    type: Number,
    example: 401,
    description: 'The HTTP status code indicating an unauthorized access.',
  })
  readonly statusCode: number;

  /**
   * An error message indicating the reason for unauthorized access.
   * @example `Unexpected header format! Field 'Authorization' not found.`
   */
  @ApiProperty({
    type: String,
    example: `Unexpected header format! Field 'Authorization' not found.`,
    description:
      'An error message indicating the reason for unauthorized access.',
  })
  readonly message: string;

  /**
   * The error type indicating an unauthorized access.
   * @example 'Unauthorized'
   */
  @ApiProperty({
    type: String,
    example: 'Unauthorized',
    description: 'The error type indicating an unauthorized access.',
  })
  readonly error: string;
}
