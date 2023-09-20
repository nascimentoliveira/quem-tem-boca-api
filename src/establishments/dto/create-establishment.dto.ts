import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
  Min,
  Max,
  IsUrl,
  Validate,
  Matches,
} from 'class-validator';

/**
 * Custom validation function to check if maxServiceTime is greater than minServiceTime.
 * @param value - The value of maxServiceTime to be validated.
 * @param object - The object containing the minServiceTime value.
 * @returns True if maxServiceTime is greater than minServiceTime, otherwise false.
 */
function IsMaxServiceTimeValid(value: number, { object }) {
  const minServiceTime = object.minServiceTime;
  if (value > minServiceTime) {
    return true;
  }
  return false;
}

/**
 * Create Establishment DTO
 *
 * This DTO represents the data required to create a new establishment.
 * It includes details such as the establishment's name, contact information,
 * operating hours, description, and other attributes.
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
export class CreateEstablishmentDTO {
  /**
   * The name of the establishment.
   * @example 'Restaurant XYZ'
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Restaurant XYZ',
    description: 'The name of the establishment.',
  })
  readonly name: string;

  /**
   * The phone number of the establishment (in Brazilian format).
   * @example '12-34567-8901'
   */
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  @ApiProperty({
    type: String,
    example: '12-34567-8901',
    description: 'The phone number of the establishment (in Brazilian format).',
  })
  readonly phone: string;

  /**
   * The address of the establishment.
   * @example '123 Main Street'
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '123 Main Street',
    description: 'The address of the establishment.',
  })
  readonly address: string;

  /**
   * The opening time of the establishment (string).
   * @example '14:00'
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Use HH:mm format.',
  })
  @ApiProperty({
    type: String,
    example: '08:00',
    description: 'The opening time of the establishment (string).',
  })
  readonly opening: string | Date;

  /**
   * The closing time of the establishment (date or string).
   * @example '22:00'
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Invalid time format. Use HH:mm format.',
  })
  @ApiProperty({
    type: String,
    example: '22:00',
    description: 'The closing time of the establishment (string).',
  })
  readonly closing: string;

  /**
   * A description of the establishment.
   * @example 'Fast food'
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Fast food',
    description: 'A description of the establishment.',
  })
  readonly description: string;

  /**
   * The minimum ticket amount for the establishment.
   * @example 10
   */
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'The minimum ticket amount for the establishment.',
  })
  readonly minTicket: number;

  /**
   * The minimum service time in minutes for the establishment.
   * @example 60
   */
  @IsInt()
  @Min(0)
  @ApiProperty({
    type: Number,
    example: 60,
    description: 'The minimum service time in minutes for the establishment.',
  })
  readonly minServiceTime: number;

  /**
   * The maximum service time in minutes for the establishment.
   * Custom validation is applied to ensure it is greater than minServiceTime.
   * Must be less than or equal to 180 minutes (3 hours).
   * @example 80
   */
  @IsInt()
  @Validate(IsMaxServiceTimeValid, {
    message: 'maxServiceTime must be greater than minServiceTime',
  })
  @Max(180)
  @ApiProperty({
    type: Number,
    example: 80,
    description:
      'The maximum service time in minutes for the establishment (optional). ' +
      'Must be less than or equal to 180 minutes (3 hours).',
  })
  readonly maxServiceTime: number;

  /**
   * The URL of the establishment's avatar image.
   * @example 'https://example.com/avatar.jpg'
   */
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/avatar.jpg',
    description: "The URL of the establishment's avatar image.",
  })
  readonly avatarUrl: string;

  /**
   * The URL of the establishment's banner image.
   * @example 'https://example.com/banner.jpg'
   */
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://example.com/banner.jpg',
    description: "The URL of the establishment's banner image.",
  })
  readonly bannerUrl: string;
}
