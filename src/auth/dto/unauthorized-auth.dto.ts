import { ApiProperty } from '@nestjs/swagger';

/**
 * Unauthorized Authentication Response DTO
 *
 * This DTO represents the response data when an authentication request is unauthorized.
 * It includes the HTTP status code, an error message, and an error description.
 */

export class AuthUnauthorizedResponseDTO {
  /**
   * The HTTP status code indicating an unauthorized request.
   * @example 401
   */
  @ApiProperty({
    type: Number,
    example: 401,
    description: 'The HTTP status code indicating an unauthorized request.',
  })
  readonly statusCode: number;

  /**
   * An error message indicating why the request is unauthorized.
   * @example 'Email or password are incorrect.'
   */
  @ApiProperty({
    type: String,
    example: 'Email e/ou senha estão incorretos.',
    description: 'An error message indicating why the request is unauthorized.',
  })
  readonly message: string;

  /**
   * The error description indicating the request is unauthorized.
   * @example 'Unauthorized'
   */
  @ApiProperty({
    type: String,
    example: 'Unauthorized',
    description:
      'The error description indicating the request is unauthorized.',
  })
  readonly error: string;
}
