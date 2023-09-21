import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { DishResponseDTO } from './dto/response-dish.dto';
import { DishesRepository } from './dishes.repository';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DishesService {
  constructor(
    private readonly dishesRepository: DishesRepository,
    private readonly establishmentsService: EstablishmentsService,
  ) {}

  private throwException(error: HttpException): void {
    const knownExceptions = [NotFoundException] as const;

    if (knownExceptions.some((exception) => error instanceof exception)) {
      throw error;
    }

    throw new InternalServerErrorException(
      'Ocorreu um erro interno do servidor. ' +
        'Por favor, verifique os parâmetros ou tente novamente mais tarde.',
    );
  }

  async create(
    establishmentId: number,
    newDishData: CreateDishDTO,
  ): Promise<DishResponseDTO> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      return await this.dishesRepository.create(establishmentId, newDishData);
    } catch (error) {
      this.throwException(error);
    }
  }

  async findAll(establishmentId: number): Promise<DishResponseDTO[]> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      return await this.dishesRepository.findAll(establishmentId);
    } catch (error) {
      this.throwException(error);
    }
  }

  async findOne(
    establishmentId: number,
    dishId: number,
  ): Promise<DishResponseDTO> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      const dish: DishResponseDTO = await this.dishesRepository.findOne(
        establishmentId,
        dishId,
      );
      if (!dish) {
        throw new NotFoundException('Bebida não encontrada!');
      }
      return dish;
    } catch (error) {
      this.throwException(error);
    }
  }

  async update(
    establishmentId: number,
    dishId: number,
    updateDishData: UpdateDishDTO,
  ): Promise<DishResponseDTO> {
    try {
      await this.findOne(establishmentId, dishId);
      return await this.dishesRepository.update(dishId, updateDishData);
    } catch (error) {
      this.throwException(error);
    }
  }

  async remove(
    establishmentId: number,
    dishId: number,
  ): Promise<DishResponseDTO> {
    try {
      await this.findOne(establishmentId, dishId);
      return await this.dishesRepository.remove(dishId);
    } catch (error) {
      this.throwException(error);
    }
  }
}
