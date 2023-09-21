import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { EstablishmentsRepository } from './establishments.repository';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(
    private readonly establishmentsRepository: EstablishmentsRepository,
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
    newEstablishmentData: CreateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    try {
      return await this.establishmentsRepository.create(newEstablishmentData);
    } catch (error) {
      this.throwException(error);
    }
  }

  async findAll(): Promise<EstablishmentResponseDTO[]> {
    try {
      return await this.establishmentsRepository.findAll();
    } catch (error) {
      this.throwException(error);
    }
  }

  async findOne(id: number): Promise<EstablishmentResponseDTO> {
    try {
      const establishment: EstablishmentResponseDTO =
        await this.establishmentsRepository.findOne(id);
      if (!establishment) {
        throw new NotFoundException('Estabelecimento não encontrado!');
      }
      return establishment;
    } catch (error) {
      this.throwException(error);
    }
  }

  async update(
    id: number,
    updateEstablishmentData: UpdateEstablishmentDTO,
  ): Promise<EstablishmentResponseDTO> {
    try {
      await this.findOne(id);
      return await this.establishmentsRepository.update(
        id,
        updateEstablishmentData,
      );
    } catch (error) {
      this.throwException(error);
    }
  }

  async remove(id: number): Promise<EstablishmentResponseDTO> {
    try {
      await this.findOne(id);
      return await this.establishmentsRepository.remove(id);
    } catch (error) {
      this.throwException(error);
    }
  }
}
