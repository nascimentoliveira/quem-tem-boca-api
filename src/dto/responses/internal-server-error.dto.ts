import { ApiProperty } from '@nestjs/swagger';

/**
 * Internal Server Error DTO
 *
 * This DTO represents a response indicating an internal server error.
 */
export class InternalServerErrorDTO {
  /**
   * The HTTP status code indicating an internal server error.
   * @example 500
   */
  @ApiProperty({
    type: Number,
    example: 500,
    description: 'The HTTP status code indicating an internal server error.',
  })
  readonly statusCode: number;

  /**
   * An error message describing the internal server error.
   * @example 'An internal server error has occurred. Please check the parameters or try again later.'
   */
  @ApiProperty({
    type: String,
    example:
      'An internal server error has occurred. Please check the parameters or try again later.',
    description: 'An error message describing the internal server error.',
  })
  readonly message: string;

  /**
   * The error type indicating an internal server error.
   * @example 'Internal Server Error'
   */
  @ApiProperty({
    type: String,
    example: 'Internal Server Error',
    description: 'The error type indicating an internal server error.',
  })
  readonly error: string;
}
