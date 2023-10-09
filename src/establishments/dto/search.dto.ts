import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

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
  @MinLength(3)
  @ApiProperty({
    type: String,
    example: 'Pizza',
    description:
      'Search term for names of establishments, name or description of dishes, and drinks',
  })
  readonly query: string;
}
