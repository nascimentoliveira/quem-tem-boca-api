import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { UserConflitResponseDTO } from '../dto/responses/conflit-user.dto';
import { InternalServerErrorDTO } from '../dto/responses/internal-server-error.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { UnauthorizedResponseDTO } from '../dto/responses/unauthorized.dto';
import { UserUnprocessableEntityResponseDTO } from './dto/unprocessable-user.dto';
import { ForbiddenResponseDTO } from '../dto/responses/forbidden.dto';
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
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user.' })
  @ApiCreatedResponse({
    description: 'User successfully registered.',
    type: UserResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Invalid data for user registration.',
    type: UserConflitResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: UserUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  create(@Body() newUserData: CreateUserDto) {
    return this.usersService.create(plainToClass(CreateUserDto, newUserData));
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({
    description: 'List of users returned successfully.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
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
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific user.' })
  @ApiOkResponse({
    description: 'User returned successfully.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit an existing user.' })
  @ApiOkResponse({
    description: 'User successfully edited.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
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
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserData: UpdateUserDto) {
    return this.usersService.update(
      +id,
      plainToClass(UpdateUserDto, updateUserData),
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiOkResponse({
    description: 'User successfully deleted.',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing access token.',
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
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
