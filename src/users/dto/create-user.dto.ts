import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

/**
 * Create User DTO
 *
 * This DTO represents the data required to create a new user.
 * It includes the user's name, email address, and password (plaintext).
 *
 * @example
 * {
 *   username: 'Jonh Doe',
 *   email: 'jonh.doe@email.com',
 *   password: '123paS$word/',
 * }
 */

export class CreateUserDTO {
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
   * The user's email address.
   * @example 'jonh.doe@email.com'
   */
  @IsNotEmpty({ message: '"e-mail" não pode estar vazio' })
  @IsEmail({}, { message: '"e-mail" deve ser um endereço de e-mail válido' })
  @ApiProperty({
    type: String,
    example: 'jonh.doe@email.com',
    description: `The user's email address.`,
  })
  readonly email: string;

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
