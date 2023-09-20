import { ApiProperty } from '@nestjs/swagger';

/**
 * User Response DTO
 *
 * This DTO represents a user's information when retrieved as a response.
 * It includes the user's ID, username, creation date, and last update date.
 *
 * @example
 * {
 *   id: 0,
 *   username: 'Jonh Doe',
 *   createdAt: '2023-06-11T14:21:50.640Z',
 *   updatedAt: '2023-06-11T14:21:50.640Z',
 * }
 */
export class UserResponseDTO {
  /**
   * The user's ID.
   * @example 1
   */
  @ApiProperty({
    type: Number,
    example: 1,
    description: "The user's id.",
  })
  readonly id: number;

  /**
   * The user's name.
   * @example 'Jonh Doe'
   */
  @ApiProperty({
    type: String,
    example: 'Jonh',
    description: "The user's name.",
  })
  readonly username: string;

  /**
   * The date and time when the user was created.
   * @example '2023-06-11T14:21:50.640Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-06-11T14:21:50.640Z',
    description: 'The date and time when the user was created.',
  })
  readonly createdAt: string | Date;

  /**
   * The date and time when the user was last updated.
   * @example '2023-06-11T14:21:50.640Z'
   */
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-06-11T14:21:50.640Z',
    description: 'The date and time when the user was last updated.',
  })
  readonly updatedAt: string | Date;
}
