import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { EstablishmentUnprocessableEntityResponseDTO } from './dto/unprocessable-establishment.dto';
import { NotFoundResponseDTO } from 'src/dto/responses/notFound.dto';
import { InternalServerErrorDTO } from 'src/dto/responses/internal-server-error.dto';
import { ForbiddenResponseDTO } from 'src/dto/responses/forbidden.dto';
import { UnauthorizedResponseDTO } from 'src/dto/responses/unauthorized.dto';
import { plainToClass } from 'class-transformer';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Establishments')
@Controller('api/establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @ApiOperation({ summary: 'Register a new establishment.' })
  @ApiBody({
    type: CreateEstablishmentDTO,
    description: 'Data required to create a new establishment.',
  })
  @ApiCreatedResponse({
    description: 'Establishment successfully registered.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: EstablishmentUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  create(@Body() newEstablishmentData: CreateEstablishmentDTO) {
    return this.establishmentsService.create(
      plainToClass(CreateEstablishmentDTO, newEstablishmentData),
    );
  }

  @ApiOperation({ summary: 'Get all establishments.' })
  @ApiOkResponse({
    description: 'List of establishments returned successfully.',
    type: [EstablishmentResponseDTO],
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get()
  findAll() {
    return this.establishmentsService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific establishment.' })
  @ApiOkResponse({
    description: 'Establishment returned successfully.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found.',
    type: NotFoundResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edit an existing establishment.' })
  @ApiBody({
    type: UpdateEstablishmentDTO,
    description: 'Data required to update an existing establishment.',
  })
  @ApiOkResponse({
    description: 'Establishment successfully edited.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found.',
    type: NotFoundResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: EstablishmentUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentData: UpdateEstablishmentDTO,
  ) {
    return this.establishmentsService.update(
      +id,
      plainToClass(UpdateEstablishmentDTO, updateEstablishmentData),
    );
  }

  @ApiOperation({ summary: 'Delete an existing establishment' })
  @ApiOkResponse({
    description: 'Establishment successfully deleted.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiForbiddenResponse({
    description: 'Operation not allowed.',
    type: ForbiddenResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found.',
    type: NotFoundResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(+id);
  }
}
