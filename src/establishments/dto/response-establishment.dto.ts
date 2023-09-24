import { ApiProperty } from '@nestjs/swagger';

/**
 * Establishment Response DTO
 *
 * This DTO represents establishment information when retrieved as a response.
 * It includes the establishment's ID, name, phone (in Brazilian format),
 * address, opening, closing,description, minTicket, minServiceTime,
 * maxServiceTime, avatarUrl, bannerUrl, creation date, and last update date.
 *
 * @example
 * {
 *   id: 1,
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
 *   createdAt: '2023-09-20T12:00:00Z',
 *   updatedAt: '2023-09-20T14:30:00Z',
 * }
 */
export class EstablishmentResponseDTO {
  /**
   * The unique identifier for the establishment.
   * @example 1
   */
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The unique identifier for the establishment.',
  })
  readonly id: number;

  /**
   * The name of the establishment.
   * @example 'Restaurant XYZ'
   */
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
  @ApiProperty({
    type: String,
    example: '123 Main Street',
    description: 'The address of the establishment.',
  })
  readonly address: string;

  /**
   * The opening time of the establishment.
   * @example '14:00'
   */
  @ApiProperty({
    type: String,
    example: '14:00',
    description: 'The opening time of the establishment.',
  })
  readonly opening: string;

  /**
   * The closing time of the establishment.
   * @example '22:00'
   */
  @ApiProperty({
    type: String,
    example: '22:00',
    description: 'The closing time of the establishment.',
  })
  readonly closing: string;

  /**
   * A description of the establishment.
   * @example 'Fast food'
   */
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
  @ApiProperty({
    type: Number,
    example: 60,
    description: 'The minimum service time in minutes for the establishment.',
  })
  readonly minServiceTime: number;

  /**
   * The maximum service time in minutes for the establishment.
   * Must be less than or equal to 180 minutes (3 hours).
   * @example 80
   */
  @ApiProperty({
    type: Number,
    example: 80,
    description: 'The maximum service time in minutes for the establishment.',
  })
  readonly maxServiceTime: number;

  /**
   * The URL of the establishment's avatar image.
   * @example 'https://example.com/avatar.jpg'
   */
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
  @ApiProperty({
    type: String,
    example: 'https://example.com/banner.jpg',
    description: "The URL of the establishment's banner image.",
  })
  readonly bannerUrl: string;

  /**
   * The date and time when the establishment was created.
   * @example '2023-09-20T12:00:00Z'
   */
  @ApiProperty({
    type: Date,
    example: '2023-09-20T12:00:00Z',
    description: 'The date and time when the establishment was created.',
  })
  readonly createdAt: string | Date;

  /**
   * The date and time when the establishment was last updated.
   * @example '2023-09-20T14:30:00Z'
   */
  @ApiProperty({
    type: Date,
    example: '2023-09-20T14:30:00Z',
    description: 'The date and time when the establishment was last updated.',
  })
  readonly updatedAt: string | Date;
}
