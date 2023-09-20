import { ApiProperty } from '@nestjs/swagger';

/**
 * Dish Unprocessable Entity Response DTO
 *
 * This DTO represents a response for an Unprocessable Entity error related to a dish.
 * It includes properties such as the HTTP status code, an array of error messages,
 * and an error message indicating an Unprocessable Entity error.
 *
 * @example
 * {
 *   statusCode: 422,
 *   message: ['name is required.', 'price must be a positive number.'],
 *   error: 'Unprocessable Entity',
 * }
 */
export class DishUnprocessableEntityResponseDTO {
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
   * @example ['name is required.', 'price must be a positive number.']
   */
  @ApiProperty({
    type: [String],
    example: ['name is required.', 'price must be a positive number.'],
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
