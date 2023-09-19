import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Request Recovery DTO
 *
 * This DTO represents the data required to initiate a password recovery request.
 * It includes the user's email address.
 */
export class RequestRecoveryDTO {
  /**
   * The user's email address.
   * @example 'john.doe@email.com'
   * @description The email address associated with the user's account. It will be used for sending a password recovery email.
   */
  @IsNotEmpty({ message: 'O campo "e-mail" não pode estar vazio.' })
  @IsEmail(
    {},
    { message: 'O campo "e-mail" deve ser um endereço de e-mail válido.' },
  )
  @ApiProperty({
    type: String,
    example: 'jonh.doe@email.com',
    description: `The user's email address.`,
  })
  readonly email: string;
}
