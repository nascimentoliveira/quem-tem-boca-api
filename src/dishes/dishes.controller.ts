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

@ApiTags('Dishes')
@Controller('api/establishments/:establishmentId/dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @ApiOperation({ summary: 'Register a new dish.' })
  @ApiBody({
    type: CreateDishDTO,
    description: 'Data required to create a new dish.',
  })
  @ApiCreatedResponse({
    description: 'Dish successfully registered.',
    type: DishResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: DishUnprocessableEntityResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Resource not found.',
    type: NotFoundResponseDTO,
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

  @ApiOperation({ summary: 'Get all dishes.' })
  @ApiOkResponse({
    description: 'List of dishes returned successfully.',
    type: [DishResponseDTO],
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
  findAll(@Param('establishmentId') establishmentId: string) {
    return this.dishesService.findAll(+establishmentId);
  }

  @ApiOperation({ summary: 'Get a specific dish.' })
  @ApiOkResponse({
    description: 'Dish returned successfully.',
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
  @Get(':id')
  findOne(
    @Param('establishmentId') establishmentId: string,
    @Param('id') dishId: string,
  ) {
    return this.dishesService.findOne(+establishmentId, +dishId);
  }

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
  ) {
    return this.dishesService.remove(+establishmentId, +dishId);
  }
}
