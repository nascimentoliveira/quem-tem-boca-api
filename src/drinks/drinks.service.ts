import { CreateDrinkDTO } from './dto/create-drink.dto';
import { UpdateDrinkDTO } from './dto/update-drink.dto';
import { DrinkResponseDTO } from './dto/response-drink.dto';
import { DrinksRepository } from './drinks.repository';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

/**
 * Drinks Service
 *
 * This service handles operations related to drinks within an establishment,
 * such as creating, retrieving, updating, and deleting drinks.
 */
@Injectable()
export class DrinksService {
  /**
   * Constructor of the DrinksService class.
   *
   * @param drinksRepository - The repository for managing drink data.
   * @param establishmentsService - The service for managing establishment data.
   */
  constructor(
    private readonly drinksRepository: DrinksRepository,
    private readonly establishmentsService: EstablishmentsService,
  ) {}

  /**
   * Create a new drink for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param newDrinkData - Data required to create a new drink.
   * @returns The created drink.
   * @throws {NotFoundException} if the drink or establishment with the given IDs is not found.
   */
  async create(
    establishmentId: number,
    newDrinkData: CreateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    await this.establishmentsService.findOne(establishmentId);
    return await this.drinksRepository.create(establishmentId, newDrinkData);
  }

  /**
   * Get all drinks for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of drinks for the establishment.
   * @throws {NotFoundException} if the drink or establishment with the given IDs is not found.
   */
  async findAll(establishmentId: number): Promise<DrinkResponseDTO[]> {
    await this.establishmentsService.findOne(establishmentId);
    return await this.drinksRepository.findAll(establishmentId);
  }

  /**
   * Get a specific drink by ID within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @returns The drink if found.
   * @throws {NotFoundException} if the drink or establishment with the given IDs is not found.
   */
  async findOne(
    establishmentId: number,
    drinkId: number,
  ): Promise<DrinkResponseDTO> {
    await this.establishmentsService.findOne(establishmentId);
    const drink: DrinkResponseDTO = await this.drinksRepository.findOne(
      establishmentId,
      drinkId,
    );
    if (!drink) {
      throw new NotFoundException('Bebida não encontrada!');
    }
    return drink;
  }

  /**
   * Update an existing drink within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @param updateDrinkData - Data required to update an existing drink.
   * @returns The updated drink.
   * @throws {NotFoundException} if the drink or establishment with the given IDs is not found.
   */
  async update(
    establishmentId: number,
    drinkId: number,
    updateDrinkData: UpdateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    await this.findOne(establishmentId, drinkId);
    return await this.drinksRepository.update(drinkId, updateDrinkData);
  }

  /**
   * Remove an existing drink within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @param user - The logged-in user information.
   * @returns The removed drink.
   * @throws {ForbiddenException} if the user is not authorized to delete the drink.
   * @throws {NotFoundException} if the drink or establishment with the given IDs is not found.
   */
  async remove(
    establishmentId: number,
    drinkId: number,
    user: LoggedInUser,
  ): Promise<DrinkResponseDTO> {
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    await this.findOne(establishmentId, drinkId);
    return await this.drinksRepository.remove(drinkId);
  }
}
