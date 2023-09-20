import { PartialType } from '@nestjs/swagger';
import { CreateDishDTO } from './create-dish.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

/**
 * Update Dish DTO
 *
 * This DTO represents the data used to update an existing dish.
 * It includes the dish's name, optional description, image URL, price,
 * and the identifier of the establishment to which it belongs.
 *
 * @example
 * {
 *   name: 'Pizza Margherita',
 *   description: 'Classic Italian pizza',
 *   imageUrl: 'https://example.com/pizza.jpg',
 *   price: 4999,
 *   establishmentId: 1,
 * }
 */
export class UpdateDishDto extends PartialType(CreateDishDTO) {
  /**
   * The name of the dish.
   * @example 'Pizza Margherita'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Pizza Margherita',
    description: 'The name of the dish.',
    required: false,
  })
  readonly name?: string;

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
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/pizza.jpg',
    description: "The URL of the dish's image.",
    required: false,
  })
  readonly imageUrl?: string;

  /**
   * The price of the dish (in cents).
   * @example 4999
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 4999,
    description: 'The price of the dish (in cents).',
    required: false,
  })
  readonly price?: number;

  /**
   * The identifier of the establishment to which the dish belongs.
   * @example 1
   */
  @IsOptional()
  @IsInt()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The identifier of the establishment to which the dish belongs.',
    required: false,
  })
  readonly establishmentId?: number;
}
