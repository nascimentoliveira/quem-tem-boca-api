import { PartialType } from '@nestjs/swagger';
import { CreateDrinkDTO } from './create-drink.dto';
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
 * Update Drink DTO
 *
 * This DTO represents the data required to update an existing drink.
 * It includes the drink's name (optional), description (optional), image URL (optional),
 * price (optional), and the identifier of the establishment to which the drink belongs (optional).
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
export class UpdateDrinkDto extends PartialType(CreateDrinkDTO) {
  /**
   * The name of the drink.
   * @example 'Soda'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Soda',
    description: 'The name of the drink.',
    required: false,
  })
  readonly name?: string;

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
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/drink.jpg',
    description: "The URL of the drink's image.",
    required: false,
  })
  readonly imageUrl?: string;

  /**
   * The price of the drink (in cents).
   * @example 250
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 250,
    description: 'The price of the drink (in cents).',
    required: false,
  })
  readonly price?: number;

  /**
   * The identifier of the establishment to which the drink belongs.
   * @example 1
   */
  @IsOptional()
  @IsInt()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The identifier of the establishment to which the drink belongs.',
    required: false,
  })
  readonly establishmentId?: number;
}
