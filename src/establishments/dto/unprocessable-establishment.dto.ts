import { ApiProperty } from '@nestjs/swagger';

export class EstablishmentUnprocessableEntityResponseDTO {
  /**
   * The HTTP status code indicating an Unprocessable Entity error.
   * @example 422
   */
  @ApiProperty({
    type: Number,
    example: 422,
    description:
      'The HTTP status code indicating an Unprocessable Entity error.',
  })
  readonly statusCode: number;

  /**
   * An array of error messages describing why the request was unprocessable.
   * @example ['name is required', 'phone is required']
   */
  @ApiProperty({
    type: [String],
    example: ['name is required', 'phone is required'],
    description:
      'An array of error messages describing why the request was unprocessable.',
  })
  readonly message: string[];

  /**
   * The error message indicating an Unprocessable Entity error.
   * @example 'Unprocessable Entity'
   */
  @ApiProperty({
    type: String,
    example: 'Unprocessable Entity',
    description: 'The error message indicating an Unprocessable Entity error.',
  })
  readonly error: string;
}
