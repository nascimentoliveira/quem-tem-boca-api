import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Search DTO (Data Transfer Object)
 *
 * This DTO is used to validate and transfer search parameters for searching establishments, dishes, and drinks by name.
 */
export class SearchDto {
  /**
   * Name to search for.
   *
   * @example 'pizza'
   * @type {string}
   * @memberof SearchDto
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Pizza',
    description: 'Search term for names of establishments, dishes, and drinks',
  })
  readonly name: string;
}
