import { ApiProperty } from '@nestjs/swagger';

/**
 * Forbidden Response DTO
 *
 * This DTO represents a response indicating that access is forbidden due to an invalid or expired token.
 */
export class ForbiddenResponseDTO {
  /**
   * The HTTP status code indicating a forbidden access.
   * @example 403
   */
  @ApiProperty({
    type: Number,
    example: 403,
    description: 'The HTTP status code indicating a forbidden access.',
  })
  readonly statusCode: number;

  /**
   * An error message indicating the reason for the forbidden access.
   * @example 'Invalid or expired token. Please log into your account again!'
   */
  @ApiProperty({
    type: String,
    example:
      'Acesso negado a este recurso. Campo "Authorization" não encontrado no cabeçalho.',
    description:
      'An error message indicating the reason for the forbidden access.',
  })
  readonly message: string;

  /**
   * The error type indicating a forbidden access.
   * @example 'Forbidden'
   */
  @ApiProperty({
    type: String,
    example: 'Forbidden',
    description: 'The error type indicating a forbidden access.',
  })
  readonly error: string;
}
