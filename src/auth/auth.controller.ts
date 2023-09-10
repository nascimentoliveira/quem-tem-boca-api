import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthResponseDTO } from './dto/response-auth.dto';
import { AuthUnprocessableEntityResponseDTO } from './dto/unprossessable-auth.dto';
import { AuthUnauthorizedResponseDTO } from './dto/unauthoruzed-auth.dto';
import { InternalServerErrorDTO } from '../dto/responses/internal-server-error.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login.' })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'User not registered or invalid password.',
    type: AuthUnauthorizedResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid or incomplete data.',
    type: AuthUnprocessableEntityResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: InternalServerErrorDTO,
  })
  @Post()
  async create(@Body() body: CreateAuthDto) {
    return this.authService.create(body);
  }
}
