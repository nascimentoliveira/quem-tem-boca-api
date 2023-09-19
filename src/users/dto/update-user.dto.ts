import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import {
  IsNotEmpty,
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
  @IsNotEmpty({ message: '"nome" não pode estar vazio' })
  @IsString({ message: '"nome" deve ser uma string' })
  @Length(3, 32, {
    message: 'O campo "nome" deve ter entre 3 e 32 caracteres.',
  })
  @ApiProperty({
    type: String,
    example: 'Jonh Doe',
    description: `The user's name.`,
  })
  readonly username: string;

  /**
   * The user's password (plaintext).
   * @example '123paS$word/'
   */
  @IsNotEmpty({ message: '"senha" não pode estar vazio' })
  @IsStrongPassword({}, { message: '"senha" deve ser uma senha forte' })
  @ApiProperty({
    type: String,
    example: '123paS$word*/',
    description: `The user's password.`,
  })
  readonly password: string;
}
