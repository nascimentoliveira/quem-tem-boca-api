import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

/**
 * Update User DTO
 *
 * This DTO represents the data required to update a user's information.
 * It includes the user's username and password (plaintext) for updating.
 *
 * @example
 * {
 *   username: 'Jonh Doe',
 *   password: '123paS$word/',
 * }
 */

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  /**
   * The user's name.
   * @example 'Jonh Doe'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 32)
  @ApiProperty({
    type: String,
    example: 'Jonh Doe',
    description: "The user's name.",
  })
  readonly username?: string;

  /**
   * The user's password (plaintext).
   * @example '123paS$word/'
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
    example: '123paS$word*/',
    description: "The user's password.",
  })
  readonly password?: string;
}
