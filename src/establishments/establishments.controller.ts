import { plainToClass } from 'class-transformer';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDTO } from './dto/create-establishment.dto';
import { UpdateEstablishmentDTO } from './dto/update-establishment.dto';
import { EstablishmentResponseDTO } from './dto/response-establishment.dto';
import { EstablishmentWithMenuResponseDTO } from './dto/response-establishmentWithMenu.dto';
import { EstablishmentUnprocessableEntityResponseDTO } from './dto/unprocessable-establishment.dto';
import { NotFoundResponseDTO } from 'src/dto/responses/notFound.dto';
import { InternalServerErrorDTO } from 'src/dto/responses/internal-server-error.dto';
import { ForbiddenResponseDTO } from 'src/dto/responses/forbidden.dto';
import { UnauthorizedResponseDTO } from 'src/dto/responses/unauthorized.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { SearchDto } from './dto/search.dto';

/**
 * Establishments Controller
 *
 * This controller handles HTTP requests related to establishments, such as creating,
 * retrieving, updating, and deleting establishments.
 */
@ApiTags('Establishments')
@Controller('api/establishments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class EstablishmentsController {
  /**
   * Constructor for EstablishmentsController.
   *
   * @param drinksSerestablishmentsServicevice - The service responsible for handling establishment-related operations.
   */
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  /**
   * Register a new establishment.
   *
   * @param newEstablishmentData - Data required to create a new establishment.
   * @returns The created establishment.
   */
  @ApiOperation({ summary: 'Register a new establishment.' })
  @ApiBody({
    type: CreateEstablishmentDTO,
    description: 'Data required to create a new establishment.',
  })
  @ApiCreatedResponse({
    description: 'Establishment successfully registered.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
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

  /**
   * Get all establishments.
   *
   * @returns List of establishments returned successfully.
   */
  @ApiOperation({ summary: 'Get all establishments.' })
  @ApiOkResponse({
    description: 'List of establishments returned successfully.',
    type: [EstablishmentResponseDTO],
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get()
  findAll() {
    return this.establishmentsService.findAll();
  }

  /**
   * Search for establishmentsby name, dishes and drinks by name or description.
   *
   * This endpoint allows users to search for establishments, dishes, and drinks based on a provided query.
   *
   * @param search - The search criteria, including the query to search for.
   * @returns  A list of establishments that match the search criteria.
   *
   * @throws {UnauthorizedException} Throws an exception if the user's authentication credentials are invalid or missing.
   * @throws {InternalServerErrorException} Throws an exception if an internal server error occurs.
   */
  @ApiOperation({
    summary:
      'Search for establishments by name, dishes and drinks by name or description',
  })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Search term for establishments, dishes and drinks',
  })
  @ApiOkResponse({
    description: 'Search results returned successfully.',
    type: EstablishmentWithMenuResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get('search')
  searchByName(@Query() search: SearchDto) {
    return this.establishmentsService.searchByName(search);
  }

  /**
   * Get a specific establishment by ID.
   *
   * @param id - The unique identifier of the establishment.
   * @returns The retrieved establishment.
   */
  @ApiOperation({ summary: 'Get a specific establishment.' })
  @ApiOkResponse({
    description: 'Establishment returned successfully.',
    type: EstablishmentResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
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

  /**
   * Get a specific establishment with menu details by ID.
   *
   * @param id - The unique identifier of the establishment.
   * @returns Establishment information retrieved successfully, including details about dishes and drinks.
   */
  @ApiOperation({ summary: 'Get a specific establishment with menu details.' })
  @ApiOkResponse({
    description:
      'Establishment information retrieved successfully, including details about dishes and drinks.',
    type: EstablishmentWithMenuResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing authentication credentials.',
    type: UnauthorizedResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found.',
    type: NotFoundResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Get(':id/menu')
  findWithMenu(@Param('id') id: string) {
    return this.establishmentsService.findWithMenu(+id);
  }

  /**
   * Edit an existing establishment by ID.
   *
   * @param id - The unique identifier of the establishment to update.
   * @param updateEstablishmentData - Data required to update an existing establishment.
   * @returns The updated establishment.
   */
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

  /**
   * Delete an existing establishment by ID.
   *
   * @param id - The unique identifier of the establishment to delete.
   * @param request - The request object containing user information.
   * @returns The deleted establishment.
   */
  @ApiOperation({ summary: 'Delete an existing establishment.' })
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
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.establishmentsService.remove(+id, request.user);
  }
}
