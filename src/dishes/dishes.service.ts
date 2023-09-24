import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { DishResponseDTO } from './dto/response-dish.dto';
import { DishesRepository } from './dishes.repository';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
/**
 * Dishes Service
 *
 * This service provides methods for creating, retrieving, updating, and deleting dishes.
 * It ensures that the operations are performed within the context of a specific establishment.
 */
@Injectable()
export class DishesService {
  /**
   * Constructor of the DishesService class.
   *
   * @param dishesRepository - The repository for managing dish data.
   * @param establishmentsService - The service for managing establishment data.
   */
  constructor(
    private readonly dishesRepository: DishesRepository,
    private readonly establishmentsService: EstablishmentsService,
  ) {}

  /**
   * Create a new dish for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param newDishData - Data required to create a new dish.
   * @returns The created dish.
   * @throws {NotFoundException} if the establishment with the given ID is not found.
   */
  async create(
    establishmentId: number,
    newDishData: CreateDishDTO,
  ): Promise<DishResponseDTO> {
    await this.establishmentsService.findOne(establishmentId);
    return await this.dishesRepository.create(establishmentId, newDishData);
  }

  /**
   * Get all dishes for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of dishes for the establishment.
   * @throws {NotFoundException} if the establishment with the given ID is not found.
   */
  async findAll(establishmentId: number): Promise<DishResponseDTO[]> {
    await this.establishmentsService.findOne(establishmentId);
    return await this.dishesRepository.findAll(establishmentId);
  }

  /**
   * Get a specific dish by ID for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish.
   * @returns The retrieved dish.
   * @throws {NotFoundException} if the dish or establishment with the given IDs is not found.
   */
  async findOne(
    establishmentId: number,
    dishId: number,
  ): Promise<DishResponseDTO> {
    await this.establishmentsService.findOne(establishmentId);
    const dish: DishResponseDTO = await this.dishesRepository.findOne(
      establishmentId,
      dishId,
    );
    if (!dish) {
      throw new NotFoundException('Dish not found!');
    }
    return dish;
  }

  /**
   * Update an existing dish by ID for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish to update.
   * @param updateDishData - Data required to update the dish.
   * @returns The updated dish.
   * @throws {NotFoundException} if the dish or establishment with the given IDs is not found.
   */
  async update(
    establishmentId: number,
    dishId: number,
    updateDishData: UpdateDishDTO,
  ): Promise<DishResponseDTO> {
    await this.findOne(establishmentId, dishId);
    return await this.dishesRepository.update(dishId, updateDishData);
  }

  /**
   * Delete an existing dish by ID for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish to delete.
   * @param user - The user object containing user information, including admin status.
   * @returns The deleted dish.
   * @throws {NotFoundException} if the dish or establishment with the given IDs is not found.
   * @throws {ForbiddenException} if the user does not have permission to delete the dish.
   */
  async remove(
    establishmentId: number,
    dishId: number,
    user: LoggedInUser,
  ): Promise<DishResponseDTO> {
    if (!user.isAdmin) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esse recurso.',
      );
    }
    await this.findOne(establishmentId, dishId);
    return await this.dishesRepository.remove(dishId);
  }
}
