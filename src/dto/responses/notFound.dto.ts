import { ApiProperty } from '@nestjs/swagger';

/**
 * Not Found Response DTO
 *
 * This DTO represents a response indicating that a resource was not found.
 */
export class NotFoundResponseDTO {
  /**
   * The HTTP status code indicating a resource not found.
   * @example 404
   */
  @ApiProperty({
    type: Number,
    example: 404,
    description: 'The HTTP status code indicating a resource not found.',
  })
  readonly statusCode: number;

  /**
   * An error message indicating that the resource was not found.
   * @example 'Resource not found!'
   */
  @ApiProperty({
    type: String,
    example: 'Resource not found!',
    description: 'An error message indicating that the resource was not found.',
  })
  readonly message: string;

  /**
   * The error type indicating a not found error.
   * @example 'Not Found'
   */
  @ApiProperty({
    type: String,
    example: 'Not Found',
    description: 'The error type indicating a not found error.',
  })
  readonly error: string;
}
