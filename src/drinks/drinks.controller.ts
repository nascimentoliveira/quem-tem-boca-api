import { plainToClass } from 'class-transformer';
import { DrinksService } from './drinks.service';
import { CreateDrinkDTO } from './dto/create-drink.dto';
import { UpdateDrinkDTO } from './dto/update-drink.dto';
import { DrinkResponseDTO } from './dto/response-drink.dto';
import { DrinkUnprocessableEntityResponseDTO } from './dto/unprocessable-drink.dto';
import { InternalServerErrorDTO } from 'src/dto/responses/internal-server-error.dto';
import { UnauthorizedResponseDTO } from 'src/dto/responses/unauthorized.dto';
import { ForbiddenResponseDTO } from 'src/dto/responses/forbidden.dto';
import { NotFoundResponseDTO } from 'src/dto/responses/notFound.dto';
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
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

/**
 * Drinks Controller
 *
 * This controller handles HTTP requests related to drinks, such as
 * creating, retrieving, updating, and deleting drinks.
 */
@ApiTags('Drinks')
@Controller('api/establishments/:establishmentId/drinks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DrinksController {
  /**
   * Constructor for DrinksController.
   *
   * @param drinksService - The service responsible for handling drink-related operations.
   */
  constructor(private readonly drinksService: DrinksService) {}

  /**
   * Register a new drink.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param newDrinkData - Data required to create a new drink.
   * @returns The created drink.
   */
  @ApiOperation({ summary: 'Register a new drink.' })
  @ApiBody({
    type: CreateDrinkDTO,
    description: 'Data required to create a new drink.',
  })
  @ApiCreatedResponse({
    description: 'Drink successfully registered.',
    type: DrinkResponseDTO,
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
    type: DrinkUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  create(
    @Param('establishmentId') establishmentId: string,
    @Body() newDrinkData: CreateDrinkDTO,
  ) {
    return this.drinksService.create(
      +establishmentId,
      plainToClass(CreateDrinkDTO, newDrinkData),
    );
  }

  /**
   * Get all drinks for a specific establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of drinks for the establishment.
   */
  @ApiOperation({ summary: 'Get all drinks.' })
  @ApiOkResponse({
    description: 'List of drinks returned successfully.',
    type: [DrinkResponseDTO],
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
  @Get()
  findAll(@Param('establishmentId') establishmentId: string) {
    return this.drinksService.findAll(+establishmentId);
  }

  /**
   * Get a specific drink by ID within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @returns The drink if found.
   */
  @ApiOperation({ summary: 'Get a specific drink.' })
  @ApiOkResponse({
    description: 'Drink returned successfully.',
    type: DrinkResponseDTO,
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
  findOne(
    @Param('establishmentId') establishmentId: string,
    @Param('id') drinkId: string,
  ) {
    return this.drinksService.findOne(+establishmentId, +drinkId);
  }

  /**
   * Edit an existing drink within an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @param updateDrinkData - Data required to update an existing drink.
   * @returns The updated drink.
   */
  @ApiOperation({ summary: 'Edit an existing drink.' })
  @ApiBody({
    type: UpdateDrinkDTO,
    description: 'Data required to update an existing drink.',
  })
  @ApiOkResponse({
    description: 'Drink successfully edited.',
    type: DrinkResponseDTO,
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
    type: DrinkUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Put(':id')
  update(
    @Param('establishmentId') establishmentId: string,
    @Param('id') drinkId: string,
    @Body() updateDrinkData: UpdateDrinkDTO,
  ) {
    return this.drinksService.update(
      +establishmentId,
      +drinkId,
      plainToClass(UpdateDrinkDTO, updateDrinkData),
    );
  }

  /**
   * Delete an existing drink.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param drinkId - The unique identifier of the drink.
   * @param request - The request object containing user information.
   * @returns The deleted drink.
   */
  @ApiOperation({ summary: 'Delete an existing drink.' })
  @ApiOkResponse({
    description: 'Drink successfully deleted.',
    type: DrinkResponseDTO,
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
  remove(
    @Param('establishmentId') establishmentId: string,
    @Param('id') drinkId: string,
    @Req() request: Request,
  ) {
    return this.drinksService.remove(+establishmentId, +drinkId, request.user);
  }
}
