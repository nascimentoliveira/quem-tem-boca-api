import { ApiProperty } from '@nestjs/swagger';

/**
 * Unprocessable Entity Authentication Response DTO
 *
 * This DTO represents the response data when an authentication request cannot be processed due to validation errors.
 * It includes the HTTP status code, an array of error messages, and an error description.
 */

export class RecoveryUnprocessableEntityResponseDTO {
  /**
   * The HTTP status code indicating an Unprocessable Entity error.
   * @example 422
   */
  @ApiProperty({
    type: Number,
    example: 422,
    description:
      'The HTTP status code indicating an Unprocessable Entity error.',
  })
  readonly statusCode: number;

  /**
   * An array of error messages describing why the request was unprocessable.
   * @example [ 'email should not be empty', 'email must be an email' ]
   */
  @ApiProperty({
    type: [String],
    example: [
      'O campo "e-mail" não pode estar vazio.',
      'O campo "e-mail" deve ser um endereço de e-mail válido.',
    ],
    description:
      'An array of error messages describing why the request was unprocessable.',
  })
  readonly message: string[];

  /**
   * The error message indicating an Unprocessable Entity error.
   * @example 'Unprocessable Entity'
   */
  @ApiProperty({
    type: String,
    example: 'Unprocessable Entity',
    description: 'The error message indicating an Unprocessable Entity error.',
  })
  readonly error: string;
}
