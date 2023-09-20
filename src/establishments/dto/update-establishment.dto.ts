import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEstablishmentDTO } from './create-establishment.dto';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
  Min,
  Max,
  IsUrl,
  IsOptional,
  Matches,
} from 'class-validator';

/**
 * Update Establishment DTO
 *
 * This DTO represents the data required to update an existing establishment's information.
 * It includes optional fields for the establishment's name, phone number, address, opening and closing hours,
 * description, minimum ticket amount, minimum service time, maximum service time, avatar URL, and banner URL.
 *
 * @example
 * {
 *   name: 'Restaurant XYZ',
 *   phone: '12-34567-8901',
 *   address: '123 Main Street',
 *   opening: '14:00',
 *   closing: '22:00',
 *   description: 'Fast food',
 *   minTicket: 10,
 *   minServiceTime: 60,
 *   maxServiceTime: 80,
 *   avatarUrl: 'https://example.com/avatar.jpg',
 *   bannerUrl: 'https://example.com/banner.jpg',
 * }
 */
export class UpdateEstablishmentDTO extends PartialType(
  CreateEstablishmentDTO,
) {
  /**
   * The name of the establishment.
   * @example 'Restaurant XYZ'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Restaurant XYZ',
    description: 'The name of the establishment.',
    required: false,
  })
  readonly name?: string;

  /**
   * The phone number of the establishment (in Brazilian format).
   * @example '12-34567-8901'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @ApiProperty({
    type: String,
    example: '12-34567-8901',
    description: 'The phone number of the establishment (in Brazilian format).',
    required: false,
  })
  readonly phone?: string;

  /**
   * The address of the establishment.
   * @example '123 Main Street'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123 Main Street',
    description: 'The address of the establishment.',
    required: false,
  })
  readonly address?: string;

  /**
   * The opening time of the establishment (date or string).
   * @example '08:00'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Use HH:mm format.',
  })
  @ApiProperty({
    type: String,
    example: '08:00',
    description: 'The opening time of the establishment (string).',
    required: false,
  })
  readonly opening?: string;

  /**
   * The closing time of the establishment (string).
   * @example '22:00'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Use HH:mm format.',
  })
  @ApiProperty({
    type: String,
    example: '22:00',
    description: 'The closing time of the establishment (string).',
    required: false,
  })
  readonly closing?: string;

  /**
   * A description of the establishment.
   * @example 'Fast food'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Fast food',
    description: 'A description of the establishment.',
    required: false,
  })
  readonly description?: string;

  /**
   * The minimum ticket amount for the establishment.
   * @example 10
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'The minimum ticket amount for the establishment.',
    required: false,
  })
  readonly minTicket?: number;

  /**
   * The minimum service time in minutes for the establishment.
   * @example 60
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 60,
    description: 'The minimum service time in minutes for the establishment.',
    required: false,
  })
  readonly minServiceTime?: number;

  /**
   * The maximum service time in minutes for the establishment.
   * Must be less than or equal to 180 minutes (3 hours).
   * @example 80
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(180)
  readonly maxServiceTime?: number;

  /**
   * The URL of the establishment's avatar image.
   * @example 'https://example.com/avatar.jpg'
   */
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    description: "The URL of the establishment's avatar image.",
    required: false,
  })
  readonly avatarUrl?: string;

  /**
   * The URL of the establishment's banner image.
   * @example 'https://example.com/banner.jpg'
   */
  @IsOptional()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/banner.jpg',
    description: "The URL of the establishment's banner image.",
    required: false,
  })
  readonly bannerUrl?: string;
}
