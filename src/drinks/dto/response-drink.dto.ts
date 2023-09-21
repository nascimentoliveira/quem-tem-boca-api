import { ApiProperty } from '@nestjs/swagger';

/**
 * Drink Response DTO
 *
 * This DTO represents a drink's information when retrieved as a response.
 * It includes the drink's ID, name, optional description, image URL, price,
 * creation date, and last update date.
 *
 * @example
 * {
 *   id: 1,
 *   name: 'Soda',
 *   description: 'Refreshing beverage',
 *   imageUrl: 'https://example.com/drink.jpg',
 *   price: 250,
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class DrinkResponseDTO {
  /**
   * The unique identifier for the drink.
   * @example 1
   */
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier for the drink.',
  })
  readonly id: number;

  /**
   * The name of the drink.
   * @example 'Soda'
   */
  @ApiProperty({
    type: String,
    example: 'Soda',
    description: 'The name of the drink.',
  })
  readonly name: string;

  /**
   * A description of the drink (optional).
   * @example 'Refreshing beverage'
   */
  @ApiProperty({
    type: String,
    example: 'Refreshing beverage',
    description: 'A description of the drink (optional).',
    required: false,
  })
  readonly description?: string;

  /**
   * The URL of the drink's image.
   * @example 'https://example.com/drink.jpg'
   */
  @ApiProperty({
    type: String,
    example: 'https://example.com/drink.jpg',
    description: "The URL of the drink's image.",
  })
  readonly imageUrl: string;

  /**
   * The price of the drink (in cents).
   * @example 250
   */
  @ApiProperty({
    type: Number,
    example: 250,
    description: 'The price of the drink (in cents).',
  })
  readonly price: number;

  /**
   * The date and time when the drink was created.
   * @example '2023-09-20T12:00:00Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-09-20T12:00:00Z',
    description: 'The date and time when the drink was created.',
  })
  readonly createdAt: string | Date;

  /**
   * The date and time when the drink was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-09-20T14:30:00Z',
    description: 'The date and time when the drink was last updated.',
  })
  readonly updatedAt: string | Date;
}
