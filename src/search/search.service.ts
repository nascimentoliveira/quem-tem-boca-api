import { Injectable } from '@nestjs/common';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import { EstablishmentWithMenuResponseDTO } from 'src/establishments/dto/response-establishmentWithMenu.dto';
import { SearchDto } from './dto/search.dto';

/**
 * Search Service
 *
 * This service provides functionality to perform searches for establishments, dishes, and drinks
 * based on the provided search criteria. It utilizes the EstablishmentsService to execute the search
 * operations.
 */
@Injectable()
export class SearchService {
  /**
   * Constructor for the SearchService.
   *
   * @param establishmentsService An instance of the EstablishmentsService for searching establishments.
   */
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  /**
   * Search for establishments, dishes, and drinks by name.
   *
   * This function performs a search for establishments, dishes, and drinks based on a provided name.
   *
   * @param search - The search criteria, including the name to search for.
   * @returns A list of establishments that match the search criteria.
   */
  async searchByName(
    search: SearchDto,
  ): Promise<EstablishmentWithMenuResponseDTO[]> {
    const { name } = search;
    return await this.establishmentsService.searchByName(name);
  }
}
