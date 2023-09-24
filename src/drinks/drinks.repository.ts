import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DrinkResponseDTO } from './dto/response-drink.dto';
import { CreateDrinkDTO } from './dto/create-drink.dto';
import { UpdateDrinkDTO } from './dto/update-drink.dto';

/**
 * Drinks Repository
 *
 * This repository handles database operations related to drinks, such as
 * creating, retrieving, updating, and deleting drinks. It uses the Prisma
 * service to interact with the database.
 */
@Injectable()
export class DrinksRepository {
  /**
   * Constructor of the DrinksRepository class.
   *
   * @param prisma - The Prisma service for database interactions.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Defines a set of fields to sanitize in drink responses.
   */
  private sanitizedDrink = {
    id: true,
    name: true,
    description: true,
    imageUrl: true,
    price: true,
    createdAt: true,
    updatedAt: true,
  };

  /**
   * Create a new drink.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param newDrinkData - Data required to create a new drink.
   * @returns The created drink.
   */
  async create(
    establishmentId: number,
    newDrinkData: CreateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.create({
      data: { ...newDrinkData, establishmentId },
      select: this.sanitizedDrink,
    });
  }

  /**
   * Get all drinks for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of drinks for the establishment.
   */
  async findAll(establishmentId: number): Promise<DrinkResponseDTO[]> {
    return this.prisma.drink.findMany({
      where: { establishmentId },
      select: this.sanitizedDrink,
    });
  }

  /**
   * Get a specific drink by ID within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param id - The unique identifier of the drink.
   * @returns The drink if found.
   */
  async findOne(
    establishmentId: number,
    id: number,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.findUnique({
      where: { establishmentId, id },
      select: this.sanitizedDrink,
    });
  }

  /**
   * Update an existing drink within an establishment.
   *
   * @param id - The unique identifier of the drink.
   * @param updateDrinkData - Data required to update an existing drink.
   * @returns The updated drink.
   */
  async update(
    id: number,
    updateDrinkData: UpdateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.update({
      where: { id },
      data: updateDrinkData,
      select: this.sanitizedDrink,
    });
  }

  /**
   * Remove an existing drink.
   *
   * @param id - The unique identifier of the drink.
   * @returns The removed drink.
   */
  async remove(id: number): Promise<DrinkResponseDTO> {
    return this.prisma.drink.delete({
      where: { id },
      select: this.sanitizedDrink,
    });
  }
}
