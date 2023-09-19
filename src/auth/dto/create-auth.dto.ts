import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Create Authentication DTO
 *
 * This DTO represents the data required to create user authentication.
 * It includes the user's email address and password (plaintext).
 */

export class CreateAuthDTO {
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
  @ApiProperty({
    type: String,
    example: '123paS$word*/',
    description: `The user's password.`,
  })
  readonly password: string;
}
