import { ApiProperty } from '@nestjs/swagger';

/**
 * User Conflict Response DTO
 *
 * This DTO represents a response indicating a conflict, typically when trying to create a user with an existing email.
 */
export class UserConflitResponseDTO {
  /**
   * The HTTP status code indicating a conflict.
   * @example 409
   */
  @ApiProperty({
    type: Number,
    example: 409,
    description: 'The HTTP status code indicating a conflict.',
  })
  readonly statusCode: number;

  /**
   * An error message describing the conflict.
   * @example 'User with the provided email already exists.'
   */
  @ApiProperty({
    type: String,
    example: 'Já existe um usuário com o e-mail fornecido.',
    description: 'An error message describing the conflict.',
  })
  readonly message: string;

  /**
   * The error type indicating a conflict.
   * @example 'Conflict'
   */
  @ApiProperty({
    type: String,
    example: 'Conflict',
    description: 'The error type indicating a conflict.',
  })
  readonly error: string;
}
