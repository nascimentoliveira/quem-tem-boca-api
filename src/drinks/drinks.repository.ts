import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DrinkResponseDTO } from './dto/response-drink.dto';
import { CreateDrinkDTO } from './dto/create-drink.dto';
import { UpdateDrinkDTO } from './dto/update-drink.dto';

@Injectable()
export class DrinksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    establishmentId: number,
    newDrinkData: CreateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.create({
      data: { ...newDrinkData, establishmentId },
    });
  }

  async findAll(establishmentId: number): Promise<DrinkResponseDTO[]> {
    return this.prisma.drink.findMany({
      where: { establishmentId },
    });
  }

  async findOne(
    establishmentId: number,
    id: number,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.findUnique({
      where: { establishmentId, id },
    });
  }

  async update(
    id: number,
    updateDrinkData: UpdateDrinkDTO,
  ): Promise<DrinkResponseDTO> {
    return this.prisma.drink.update({
      where: {
        id,
      },
      data: updateDrinkData,
    });
  }

  async remove(id: number): Promise<DrinkResponseDTO> {
    return this.prisma.drink.delete({
      where: { id },
    });
  }
}
