import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DishResponseDTO } from './dto/response-dish.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

/**
 * Dishes Repository
 *
 * This repository handles database operations related to dishes, such as
 * creating, retrieving, updating, and deleting dishes. It uses the Prisma
 * service to interact with the database.
 */
@Injectable()
export class DishesRepository {
  /**
   * Constructor of the DishesRepository class.
   * @param prisma - The Prisma service for database interaction.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Defines a set of fields to sanitize in dish responses.
   */
  private sanitizedDish = {
    id: true,
    name: true,
    description: true,
    imageUrl: true,
    price: true,
    createdAt: true,
    updatedAt: true,
  };

  /**
   * Create a new dish.
   *
   * @param establishmentId - The unique identifier of the establishment where the dish will be created.
   * @param newDishData - Data required to create a new dish.
   * @returns The newly created dish.
   */
  async create(
    establishmentId: number,
    newDishData: CreateDishDTO,
  ): Promise<DishResponseDTO> {
    return this.prisma.dish.create({
      data: { ...newDishData, establishmentId },
      select: this.sanitizedDish,
    });
  }

  /**
   * Get all dishes in an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of dishes in the establishment.
   */
  async findAll(establishmentId: number): Promise<DishResponseDTO[]> {
    return this.prisma.dish.findMany({
      where: { establishmentId },
      select: this.sanitizedDish,
    });
  }

  /**
   * Get a specific dish by ID.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param id - The unique identifier of the dish to retrieve.
   * @returns The dish information.
   */
  async findOne(establishmentId: number, id: number): Promise<DishResponseDTO> {
    return this.prisma.dish.findUnique({
      where: { establishmentId, id },
      select: this.sanitizedDish,
    });
  }

  /**
   * Update an existing dish by ID.
   *
   * @param id - The unique identifier of the dish to update.
   * @param updateDishData - Data required to update an existing dish.
   * @returns The updated dish.
   */
  async update(
    id: number,
    updateDishData: UpdateDishDTO,
  ): Promise<DishResponseDTO> {
    return this.prisma.dish.update({
      where: { id },
      data: updateDishData,
      select: this.sanitizedDish,
    });
  }

  /**
   * Delete an existing dish by ID.
   *
   * @param id - The unique identifier of the dish to delete.
   * @returns The deleted dish.
   */
  async remove(id: number): Promise<DishResponseDTO> {
    return this.prisma.dish.delete({
      where: { id },
      select: this.sanitizedDish,
    });
  }
}
