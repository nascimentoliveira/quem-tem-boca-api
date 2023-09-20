import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
  Min,
  IsInt,
} from 'class-validator';

/**
 * Create Drink DTO
 *
 * This DTO represents the data required to create a new drink.
 * It includes the drink's name, optional description, image URL, price,
 * and the identifier of the establishment to which the drink belongs.
 *
 * @example
 * {
 *   name: 'Soda',
 *   description: 'Refreshing beverage',
 *   imageUrl: 'https://example.com/drink.jpg',
 *   price: 250,
 *   establishmentId: 1,
 * }
 */
export class CreateDrinkDTO {
  /**
   * The name of the drink.
   * @example 'Soda'
   */
  @IsString()
  @IsNotEmpty()
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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
  @IsString()
  @IsUrl()
  @IsNotEmpty()
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
  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 250,
    description: 'The price of the drink (in cents).',
  })
  readonly price: number;

  /**
   * The identifier of the establishment to which the drink belongs.
   * @example 1
   */
  @IsInt()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The identifier of the establishment to which the drink belongs.',
  })
  readonly establishmentId: number;
}
