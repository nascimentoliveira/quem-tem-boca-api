import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';

/**
 * Establishments Repository
 *
 * This repository handles database operations related to establishments, such as
 * creating, retrieving, updating, and deleting establishments. It uses the Prisma
 * service to interact with the database.
 */
@Injectable()
export class EstablishmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new establishment in the database.
   *
   * @param newEstablishmentData The data for creating the establishment.
   * @returns The created establishment.
   */
  async create(
    newEstablishmentData: CreateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.create({
      data: newEstablishmentData,
    });
  }

  /**
   * Retrieve all establishments from the database.
   *
   * @returns An array of establishments.
   */
  async findAll(): Promise<EstablishmentResponseDTO[]> {
    return this.prisma.establishment.findMany();
  }

  /**
   * Retrieve an establishment by ID from the database.
   *
   * @param id The unique identifier of the establishment.
   * @returns The retrieved establishment.
   */
  async findOne(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.findUnique({
      where: { id },
    });
  }

  /**
   * Retrieve an establishment with its menu by ID from the database.
   *
   * @param id The unique identifier of the establishment.
   * @returns The retrieved establishment with its menu.
   */
  async findWithMenu(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.findUnique({
      where: { id },
      include: {
        dishes: true,
        drinks: true,
      },
    });
  }

  /**
   * Update an establishment by ID in the database.
   *
   * @param id The unique identifier of the establishment to update.
   * @param updateEstablishmentData The data for updating the establishment.
   * @returns The updated establishment.
   */
  async update(
    id: number,
    updateEstablishmentData: UpdateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.update({
      where: {
        id,
      },
      data: updateEstablishmentData,
    });
  }

  /**
   * Remove an establishment by ID from the database.
   *
   * @param id The unique identifier of the establishment to remove.
   * @returns The removed establishment.
   */
  async remove(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.delete({
      where: { id },
    });
  }
}
