import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from '../../users/dto/response-user.dto';

/**
 * Authentication Response DTO
 *
 * This DTO represents the response data when a user is successfully authenticated.
 * It includes the user information and an access token.
 */

export class AuthResponseDTO {
  /**
   * User information.
   *
   * @example
   * {
   *   id: 1,
   *   username: 'Jonh Doe',
   *   createdAt: '2023-06-11T14:21:50.640Z',
   *   updatedAt: '2023-06-11T14:21:50.640Z',
   * }
   */
  @ApiProperty({
    type: UserResponseDTO,
    example: {
      id: 1,
      username: 'Jonh Doe',
      createdAt: '2023-06-11T14:21:50.640Z',
      updatedAt: '2023-06-11T14:21:50.640Z',
    },
    description: 'User information',
  })
  readonly user: UserResponseDTO;

  /**
   * Access token.
   * @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyZWRAZ3Jhb2R'
   */
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZyZWRAZ3Jhb2R',
    description: 'Access token',
  })
  readonly accessToken: string;
}
