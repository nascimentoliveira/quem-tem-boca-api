import { ApiProperty } from '@nestjs/swagger';

/**
 * Dish Response DTO
 *
 * This DTO represents a dish's information when retrieved as a response.
 * It includes the dish's ID, name, optional description, image URL, price,
 * establishment identifier, creation date, and last update date.
 *
 * @example
 * {
 *   id: 1,
 *   name: 'Pizza Margherita',
 *   description: 'Classic Italian pizza',
 *   imageUrl: 'https://example.com/pizza.jpg',
 *   price: 4999,
 *   establishmentId: 1,
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class DishResponseDTO {
  /**
   * The unique identifier for the dish.
   * @example 1
   */
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier for the dish.',
  })
  readonly id: number;

  /**
   * The name of the dish.
   * @example 'Pizza Margherita'
   */
  @ApiProperty({
    type: String,
    example: 'Pizza Margherita',
    description: 'The name of the dish.',
  })
  readonly name: string;

  /**
   * A description of the dish (optional).
   * @example 'Classic Italian pizza'
   */
  @ApiProperty({
    type: String,
    example: 'Classic Italian pizza',
    description: 'A description of the dish.',
    required: false,
  })
  readonly description?: string;

  /**
   * The URL of the dish's image.
   * @example 'https://example.com/pizza.jpg'
   */
  @ApiProperty({
    type: String,
    example: 'https://example.com/pizza.jpg',
    description: "The URL of the dish's image.",
  })
  readonly imageUrl: string;

  /**
   * The price of the dish (in cents).
   * @example 4999
   */
  @ApiProperty({
    type: Number,
    example: 4999,
    description: 'The price of the dish (in cents).',
  })
  readonly price: number;

  /**
   * The identifier of the establishment to which the dish belongs.
   * @example 1
   */
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The identifier of the establishment to which the dish belongs.',
  })
  readonly establishmentId: number;

  /**
   * The date and time when the dish was created.
   * @example '2023-09-20T12:00:00Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-09-20T12:00:00Z',
    description: 'The date and time when the dish was created.',
  })
  readonly createdAt: string | Date;

  /**
   * The date and time when the dish was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-09-20T14:30:00Z',
    description: 'The date and time when the dish was last updated.',
  })
  readonly updatedAt: string | Date;
}
