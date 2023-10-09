import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { EstablishmentsRepository } from './establishments.repository';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EstablishmentWithMenuResponseDTO } from './dto/response-establishmentWithMenu.dto';
import { SearchDto } from './dto/search.dto';

/**
 * Establishments Service
 *
 * This service handles operations related to establishments, such as
 * creating, retrieving, updating, and deleting establishments. It interacts
 * with the data repository for establishments.
 */
@Injectable()
export class EstablishmentsService {
  /**
   * Constructor of the EstablishmentsService class.
   *
   * @param establishmentsRepository - The repository for managing establishment data.
   */
  constructor(
    private readonly establishmentsRepository: EstablishmentsRepository,
  ) {}

  /**
   * Create a new establishment.
   *
   * @param newEstablishmentData The data for creating the establishment.
   * @returns The created establishment.
   */
  async create(
    newEstablishmentData: CreateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    return await this.establishmentsRepository.create(newEstablishmentData);
  }

  /**
   * Retrieve all establishments.
   *
   * @returns An array of establishments.
   */
  async findAll(): Promise<EstablishmentResponseDTO[]> {
    return await this.establishmentsRepository.findAll();
  }

  /**
   * Retrieve an establishment by ID.
   *
   * @param id The unique identifier of the establishment.
   * @returns The retrieved establishment.
   * @throws {NotFoundException} if the establishment is not found.
   */
  async findOne(id: number): Promise<EstablishmentResponseDTO> {
    const establishment: EstablishmentResponseDTO =
      await this.establishmentsRepository.findOne(id);
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado!');
    }
    return establishment;
  }

  /**
   * Retrieve an establishment with its menu by ID.
   *
   * @param id The unique identifier of the establishment.
   * @returns The retrieved establishment with its menu.
   * @throws {NotFoundException} if the establishment is not found.
   */
  async findWithMenu(id: number): Promise<EstablishmentWithMenuResponseDTO> {
    const establishment: EstablishmentWithMenuResponseDTO =
      await this.establishmentsRepository.findWithMenu(id);
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado!');
    }
    return establishment;
  }

  /**
   * Search for establishments by name, dishes and drinks by name or description.
   *
   * This function performs a search for establishments, dishes, and drinks based on a provided query.
   * It retrieves establishments from the database and filters the results based on certain criteria.
   *
   * @param search - The search criteria including the query to search for.
   * @returns  A list of establishments that match the search criteria.
   */
  async searchByName(
    search: SearchDto,
  ): Promise<EstablishmentWithMenuResponseDTO[]> {
    const { query } = search;
    const establishments: EstablishmentWithMenuResponseDTO[] =
      await this.establishmentsRepository.search(query);
    const filteredEstablishments: EstablishmentWithMenuResponseDTO[] =
      establishments.filter((establishment) => {
        return (
          establishment.name.toLowerCase().includes(query.toLowerCase()) ||
          establishment.dishes.length > 0 ||
          establishment.drinks.length > 0
        );
      });
    return filteredEstablishments;
  }

  /**
   * Update an establishment by ID.
   *
   * @param id The unique identifier of the establishment to update.
   * @param updateEstablishmentData The data for updating the establishment.
   * @returns The updated establishment.
   * @throws {NotFoundException} if the establishment is not found.
   */
  async update(
    id: number,
    updateEstablishmentData: UpdateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    await this.findOne(id);
    return await this.establishmentsRepository.update(
      id,
      updateEstablishmentData,
    );
  }

  /**
   * Remove an establishment by ID.
   *
   * @param id The unique identifier of the establishment to remove.
   * @param user The user performing the removal.
   * @returns The removed establishment.
   * @throws {NotFoundException} if the establishment is not found.
   * @throws {ForbiddenException} if the user does not have permission.
   */
  async remove(
    id: number,
    user: LoggedInUser,
  ): Promise<EstablishmentResponseDTO> {
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    await this.findOne(id);
    return await this.establishmentsRepository.remove(id);
  }
}
