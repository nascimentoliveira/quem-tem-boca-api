import { ApiProperty } from '@nestjs/swagger';

/**
 * Response DTO for Unprocessable Entity errors related to user operations.
 * This DTO is returned when a user request cannot be processed due to validation errors.
 *
 * @example
 * {
 *   statusCode: 422,
 *   message: ['username should not be empty', 'email must be an email'],
 *   error: 'Unprocessable Entity',
 * }
 */

export class UserUnprocessableEntityResponseDTO {
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
   * @example [ 'username should not be empty', 'email must be an email', 'password is not strong enough']
   */
  @ApiProperty({
    type: [String],
    example: [
      'username should not be empty',
      'email must be an email',
      'password is not strong enough',
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
