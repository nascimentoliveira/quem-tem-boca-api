import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { EstablishmentsRepository } from './establishments.repository';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

/**
 * Establishments Service
 *
 * This service handles operations related to establishments, such as
 * creating, retrieving, updating, and deleting establishments. It interacts
 * with the data repository for establishments.
 */
@Injectable()
export class EstablishmentsService {
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
   * @throws NotFoundException if the establishment is not found.
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
   * @throws NotFoundException if the establishment is not found.
   */
  async findWithMenu(id: number): Promise<EstablishmentResponseDTO> {
    const establishment: EstablishmentResponseDTO =
      await this.establishmentsRepository.findWithMenu(id);
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado!');
    }
    return establishment;
  }

  /**
   * Update an establishment by ID.
   *
   * @param id The unique identifier of the establishment to update.
   * @param updateEstablishmentData The data for updating the establishment.
   * @returns The updated establishment.
   * @throws NotFoundException if the establishment is not found.
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
   * @throws NotFoundException if the establishment is not found.
   * @throws ForbiddenException if the user does not have permission.
   */
  async remove(
    id: number,
    user: InternalUser,
  ): Promise<EstablishmentResponseDTO> {
    await this.findOne(id);
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    return await this.establishmentsRepository.remove(id);
  }
}
