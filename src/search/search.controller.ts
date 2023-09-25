import { SearchService } from './search.service';
import { EstablishmentWithMenuResponseDTO } from 'src/establishments/dto/response-establishmentWithMenu.dto';
import { UnauthorizedResponseDTO } from 'src/dto/responses/unauthorized.dto';
import { InternalServerErrorDTO } from 'src/dto/responses/internal-server-error.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SearchDto } from './dto/search.dto';
import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * Search Controller
 *
 * This controller handles search operations for establishments, dishes, and drinks by name.
 * It utilizes the SearchService to perform search queries and return search results.
 */
@ApiTags('Search')
@Controller('api/search')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SearchController {
  /**
   * Constructor for the SearchController.
   *
   * @param searchService An instance of the SearchService for performing search operations.
   */
  constructor(private readonly searchService: SearchService) {}

  /**
   * Search for establishments, dishes, and drinks by name.
   *
   * This endpoint allows users to search for establishments, dishes, and drinks based on a provided name.
   *
   * @param search - The search criteria, including the name to search for.
   * @returns  A list of establishments that match the search criteria.
   *
   * @throws {UnauthorizedException} Throws an exception if the user's authentication credentials are invalid or missing.
   * @throws {InternalServerErrorException} Throws an exception if an internal server error occurs.
   */
  @ApiOperation({
    summary: 'Search for establishments, dishes, and drinks by name',
  })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Search term for names of establishments, dishes and drinks',
  })
  @ApiOkResponse({
    description: 'Search results returned successfully.',
    type: EstablishmentWithMenuResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get()
  searchByName(@Query() search: SearchDto) {
    return this.searchService.searchByName(search);
  }
}
