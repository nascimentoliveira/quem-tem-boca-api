import { ApiProperty } from '@nestjs/swagger';

/**
 * Recovery Response DTO
 *
 * This DTO represents the response data after a password recovery request is initiated.
 * It includes a message indicating the outcome of the recovery request.
 */
export class ResponseRecoveryDTO {
  /**
   * A message indicating the outcome of the password recovery request.
   * @example "If john.doe@email.com is registered, a recovery email will be sent."
   * @description The message provides information about whether a recovery email will be sent based on the provided email's registration status.
   */
  @ApiProperty({
    type: String,
    example:
      "Se 'john.doe@email.com' estiver cadastrado, um e-mail de recuperação será enviado.",
    description:
      'A message indicating the outcome of the password recovery request.',
  })
  readonly message: string;
}
