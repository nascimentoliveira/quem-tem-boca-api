import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
  IsNotEmpty,
} from 'class-validator';

/**
 * Create Dish DTO
 *
 * This DTO represents the data required to create a new dish.
 * It includes the dish's name, optional description, image URL
 * and price (in cents).
 *
 * @example
 * {
 *   name: 'Pizza Margherita',
 *   description: 'Classic Italian pizza',
 *   imageUrl: 'https://example.com/pizza.jpg',
 *   price: 4999,
 * }
 */
export class CreateDishDTO {
  /**
   * The name of the dish.
   * @example 'Pizza Margherita'
   */
  @IsString()
  @IsNotEmpty()
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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  @IsUrl()
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
  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 4999,
    description: 'The price of the dish (in cents).',
  })
  readonly price: number;
}
