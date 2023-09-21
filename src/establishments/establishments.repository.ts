import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newEstablishmentData: CreateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.create({
      data: newEstablishmentData,
    });
  }

  async findAll(): Promise<EstablishmentResponseDTO[]> {
    return this.prisma.establishment.findMany();
  }

  async findOne(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.findUnique({
      where: { id },
    });
  }

  async findWithMenu(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.findUnique({
      where: { id },
      include: {
        dishes: true,
        drinks: true,
      },
    });
  }

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

  async remove(id: number): Promise<EstablishmentResponseDTO> {
    return this.prisma.establishment.delete({
      where: { id },
    });
  }
}
