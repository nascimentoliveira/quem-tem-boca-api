import { plainToClass } from 'class-transformer';
import { DishesService } from './dishes.service';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { DishResponseDTO } from './dto/response-dish.dto';
import { DishUnprocessableEntityResponseDTO } from './dto/unprocessable-dish.dto';
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
 * Dishes Controller
 *
 * This controller handles requests related to dishes, such as creating, retrieving, updating, and deleting dishes.
 * It ensures that the operations are performed within the context of a specific establishment.
 */
@ApiTags('Dishes')
@Controller('api/establishments/:establishmentId/dishes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DishesController {
  /**
   * Constructor for DishesController.
   *
   * @param dishesService - The service responsible for handling dish-related operations.
   */
  constructor(private readonly dishesService: DishesService) {}

  /**
   * Register a new dish.
   *
   * @param establishmentId - The unique identifier of the establishment where the dish will be registered.
   * @param newDishData - Data required to create a new dish.
   * @returns The newly registered dish.
   */
  @ApiOperation({ summary: 'Register a new dish.' })
  @ApiBody({
    type: CreateDishDTO,
    description: 'Data required to create a new dish.',
  })
  @ApiCreatedResponse({
    description: 'Dish successfully registered.',
    type: DishResponseDTO,
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
    type: DishUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  create(
    @Param('establishmentId') establishmentId: string,
    @Body() newDishData: CreateDishDTO,
  ) {
    return this.dishesService.create(
      +establishmentId,
      plainToClass(CreateDishDTO, newDishData),
    );
  }

  /**
   * Get all dishes in an establishment.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @returns A list of dishes in the establishment.
   */
  @ApiOperation({ summary: 'Get all dishes.' })
  @ApiOkResponse({
    description: 'List of dishes returned successfully.',
    type: [DishResponseDTO],
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
    return this.dishesService.findAll(+establishmentId);
  }

  /**
   * Get a specific dish by ID.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish to retrieve.
   * @returns The dish information.
   */
  @ApiOperation({ summary: 'Get a specific dish.' })
  @ApiOkResponse({
    description: 'Dish returned successfully.',
    type: DishResponseDTO,
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
    @Param('id') dishId: string,
  ) {
    return this.dishesService.findOne(+establishmentId, +dishId);
  }

  /**
   * Edit an existing dish by ID.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish to edit.
   * @param updateDishData - Data required to update an existing dish.
   * @returns The edited dish.
   */
  @ApiOperation({ summary: 'Edit an existing dish.' })
  @ApiBody({
    type: UpdateDishDTO,
    description: 'Data required to update an existing dish.',
  })
  @ApiOkResponse({
    description: 'Dish successfully edited.',
    type: DishResponseDTO,
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
    type: DishUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Put(':id')
  update(
    @Param('establishmentId') establishmentId: string,
    @Param('id') dishId: string,
    @Body() updateDishData: UpdateDishDTO,
  ) {
    return this.dishesService.update(
      +establishmentId,
      +dishId,
      plainToClass(UpdateDishDTO, updateDishData),
    );
  }

  /**
   * Delete an existing dish by ID.
   *
   * @param establishmentId - The unique identifier of the establishment.
   * @param dishId - The unique identifier of the dish to delete.
   * @param request - The request object containing user information.
   * @returns The deleted dish.
   */
  @ApiOperation({ summary: 'Delete an existing dish' })
  @ApiOkResponse({
    description: 'Dish successfully deleted.',
    type: DishResponseDTO,
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
    @Param('id') dishId: string,
    @Req() request: Request,
  ) {
    return this.dishesService.remove(+establishmentId, +dishId, request.user);
  }
}
