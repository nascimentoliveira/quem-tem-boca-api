import { CreateDrinkDTO } from './dto/create-drink.dto';
import { UpdateDrinkDTO } from './dto/update-drink.dto';
import { DrinkResponseDTO } from './dto/response-drink.dto';
import { DrinksRepository } from './drinks.repository';
import { EstablishmentsService } from 'src/establishments/establishments.service';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class DrinksService {
  constructor(
    private readonly drinksRepository: DrinksRepository,
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
    newDrinkData: CreateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      return await this.drinksRepository.create(establishmentId, newDrinkData);
    } catch (error) {
      this.throwException(error);
    }
  }

  async findAll(establishmentId: number): Promise<DrinkResponseDTO[]> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      return await this.drinksRepository.findAll(establishmentId);
    } catch (error) {
      this.throwException(error);
    }
  }

  async findOne(
    establishmentId: number,
    drinkId: number,
  ): Promise<DrinkResponseDTO> {
    try {
      await this.establishmentsService.findOne(establishmentId);
      const drink: DrinkResponseDTO = await this.drinksRepository.findOne(
        establishmentId,
        drinkId,
      );
      if (!drink) {
        throw new NotFoundException('Bebida não encontrada!');
      }
      return drink;
    } catch (error) {
      this.throwException(error);
    }
  }

  async update(
    establishmentId: number,
    drinkId: number,
    updateDrinkData: UpdateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    try {
      await this.findOne(establishmentId, drinkId);
      return await this.drinksRepository.update(drinkId, updateDrinkData);
    } catch (error) {
      this.throwException(error);
    }
  }

  async remove(
    establishmentId: number,
    drinkId: number,
  ): Promise<DrinkResponseDTO> {
    try {
      await this.findOne(establishmentId, drinkId);
      return await this.drinksRepository.remove(drinkId);
    } catch (error) {
      this.throwException(error);
    }
  }
}
