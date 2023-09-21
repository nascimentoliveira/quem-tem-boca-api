import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DishResponseDTO } from './dto/response-dish.dto';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    establishmentId: number,
    newDishData: CreateDishDTO,
  ): Promise<DishResponseDTO> {
    return this.prisma.dish.create({
      data: { ...newDishData, establishmentId },
    });
  }

  async findAll(establishmentId: number): Promise<DishResponseDTO[]> {
    return this.prisma.dish.findMany({
      where: { establishmentId },
    });
  }

  async findOne(establishmentId: number, id: number): Promise<DishResponseDTO> {
    return this.prisma.dish.findUnique({
      where: { establishmentId, id },
    });
  }

  async update(
    id: number,
    updateDishData: UpdateDishDTO,
  ): Promise<DishResponseDTO> {
    return this.prisma.dish.update({
      where: {
        id,
      },
      data: updateDishData,
    });
  }

  async remove(id: number): Promise<DishResponseDTO> {
    return this.prisma.dish.delete({
      where: { id },
    });
  }
}
