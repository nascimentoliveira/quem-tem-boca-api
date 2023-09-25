import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { UserConflitResponseDTO } from '../dto/responses/conflit-user.dto';
import { InternalServerErrorDTO } from '../dto/responses/internal-server-error.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { UnauthorizedResponseDTO } from '../dto/responses/unauthorized.dto';
import { UserUnprocessableEntityResponseDTO } from './dto/unprocessable-user.dto';
import { ForbiddenResponseDTO } from '../dto/responses/forbidden.dto';
import { NotFoundResponseDTO } from 'src/dto/responses/notFound.dto';
import { AuthGuard } from '../guards/auth.guard';
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
  ApiConflictResponse,
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
 * Users Controller
 *
 * The Users Controller handles HTTP requests related to user management, such as
 * user registration, retrieval, updating, and deletion. It interacts with the
 * Users Service to perform these operations.
 */
@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  /**
   * Constructor for UsersController.
   *
   * @param usersService - The service responsible for handling user-related operations.
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Register a new user.
   *
   * @param newUserData - Data required to create a new user account.
   * @returns The newly registered user.
   */
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiBody({
    type: CreateUserDTO,
    description: 'Data required to create a new user account.',
  })
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
  create(@Body() newUserData: CreateUserDTO) {
    return this.usersService.create(plainToClass(CreateUserDTO, newUserData));
  }

  /**
   * Get a list of all users.
   *
   * @returns A list of user profiles.
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({
    description: 'List of users returned successfully.',
    type: [UserResponseDTO],
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
    return this.usersService.findAll();
  }

  /**
   * Get a specific user by their ID.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns The user profile.
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific user.' })
  @ApiOkResponse({
    description: 'User returned successfully.',
    type: UserResponseDTO,
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
    return this.usersService.findOne(+id);
  }

  /**
   * Edit an existing user's profile.
   *
   * @param id - The unique identifier of the user to update.
   * @param updateUserData - Data required to update an existing user account.
   * @returns The updated user profile.
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit an existing user.' })
  @ApiBody({
    type: UpdateUserDTO,
    description: 'Data required to update an existing user account.',
  })
  @ApiOkResponse({
    description: 'User successfully edited.',
    type: UserResponseDTO,
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
    type: UserUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserData: UpdateUserDTO) {
    return this.usersService.update(
      +id,
      plainToClass(UpdateUserDTO, updateUserData),
    );
  }

  /**
   * Delete an existing user's profile.
   *
   * @param id - The unique identifier of the user to delete.
   * @param request - The HTTP request object containing user information.
   * @returns The deleted user profile.
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiOkResponse({
    description: 'User successfully deleted.',
    type: UserResponseDTO,
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
    return this.usersService.remove(+id, request.user);
  }
}
